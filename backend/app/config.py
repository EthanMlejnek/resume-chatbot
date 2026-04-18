import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# --- API ---
ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
MODEL: str = "claude-sonnet-4-6"
MAX_TOKENS: int = 8000  # max tokens for response
THINKING_BUDGET: int = 5000  # max tokens for extended thinking

# --- Rate Limiting ---
RATE_LIMIT: str = "15/minute"

# --- CORS ---
ALLOWED_ORIGINS: list[str] = [
    "http://localhost:3000",  # Next.js dev server
    # Add your production frontend URL here:
    # "https://resume.yourdomain.com",
]

# --- System Prompt ---
PROMPTS_DIR = Path(__file__).parent / "prompts"


def load_system_prompt() -> str:
    """Load the system prompt from the markdown file."""
    prompt_path = PROMPTS_DIR / "system_prompt.md"
    if not prompt_path.exists():
        raise FileNotFoundError(f"System prompt not found at {prompt_path}")
    return prompt_path.read_text(encoding="utf-8")