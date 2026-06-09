# Resume AI

An AI-powered interactive resume chatbot. Recruiters can ask questions about my background, experience, and skills through a conversational interface powered by Claude.

## Project Structure

```
resume-ai/
├── backend/          # FastAPI + Anthropic API
│   ├── app/
│   │   ├── main.py          # API server & SSE streaming
│   │   ├── config.py        # Environment & app configuration
│   │   └── prompts/
│   │       └── system_prompt.md   # LLM system prompt (resume data)
│   ├── requirements.txt
│   └── .env                 # API keys (not committed)
├── frontend/         # Next.js / TypeScript (Phase 2)
└── README.md
```

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Add your Anthropic API key
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### POST /chat

Send a message and receive a streamed response via SSE.

**Request body:**
```json
{
  "message": "What is Ethan's tech stack?",
  "conversation_history": []
}
```

**SSE event types:**
- `thinking` — model's chain-of-thought reasoning
- `text` — final response tokens
- `done` — stream complete
- `error` — something went wrong