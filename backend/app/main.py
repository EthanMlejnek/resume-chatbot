import json
import logging
from typing import AsyncGenerator

import anthropic
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from starlette.responses import JSONResponse

from app.config import (
    ALLOWED_ORIGINS,
    ANTHROPIC_API_KEY,
    MAX_TOKENS,
    MODEL,
    RATE_LIMIT,
    THINKING_BUDGET,
    load_system_prompt,
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# App & middleware
# ---------------------------------------------------------------------------
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Resume AI", version="1.0.0")
app.state.limiter = limiter

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded. Please wait a moment and try again."},
    )


# ---------------------------------------------------------------------------
# Load system prompt once at startup
# ---------------------------------------------------------------------------
SYSTEM_PROMPT: str = ""


@app.on_event("startup")
async def startup():
    global SYSTEM_PROMPT
    SYSTEM_PROMPT = load_system_prompt()
    logger.info("System prompt loaded (%d chars)", len(SYSTEM_PROMPT))


# ---------------------------------------------------------------------------
# Request / response models
# ---------------------------------------------------------------------------
class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    conversation_history: list[ChatMessage] = []


# ---------------------------------------------------------------------------
# SSE helpers
# ---------------------------------------------------------------------------
def sse_event(event_type: str, content: str = "") -> str:
    """Format a server-sent event."""
    payload = json.dumps({"type": event_type, "content": content})
    return f"data: {payload}\n\n"


# ---------------------------------------------------------------------------
# Streaming generator
# ---------------------------------------------------------------------------
async def stream_chat(request: ChatRequest) -> AsyncGenerator[str, None]:
    """Stream the Anthropic response as SSE events."""

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    # Build the messages array from conversation history + new message
    messages: list[dict] = []
    for msg in request.conversation_history:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": request.message})

    try:
        with client.messages.stream(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            thinking={
                "type": "enabled",
                "budget_tokens": THINKING_BUDGET,
            },
            system=SYSTEM_PROMPT,
            messages=messages,
        ) as stream:
            current_block_type: str | None = None

            for event in stream:
                # -- Block start: detect whether this is a thinking or text block
                if event.type == "content_block_start":
                    block = event.content_block
                    if block.type == "thinking":
                        current_block_type = "thinking"
                    elif block.type == "text":
                        current_block_type = "text"
                    continue

                # -- Deltas: stream content as it arrives
                if event.type == "content_block_delta":
                    delta = event.delta
                    if delta.type == "thinking_delta":
                        yield sse_event("thinking", delta.thinking)
                    elif delta.type == "text_delta":
                        yield sse_event("text", delta.text)
                    continue

                # -- Block stop
                if event.type == "content_block_stop":
                    current_block_type = None
                    continue

        # Signal completion
        yield sse_event("done")

    except anthropic.APIError as e:
        logger.error("Anthropic API error: %s", e)
        yield sse_event("error", f"API error: {e.message}")
    except Exception as e:
        logger.error("Unexpected error: %s", e)
        yield sse_event("error", "An unexpected error occurred.")


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.post("/chat")
@limiter.limit(RATE_LIMIT)
async def chat(request: Request, body: ChatRequest):
    """Stream a chat response with thinking and text events via SSE."""
    return StreamingResponse(
        stream_chat(body),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # Disable proxy buffering (Nginx)
        },
    )


@app.get("/health")
async def health():
    """Simple health check endpoint."""
    return {"status": "ok"}