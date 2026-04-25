# FinanceIQ

AI-powered credit card spending analyzer. Upload a CSV of your transactions and get a personalized breakdown of spending categories, recommendations, and warnings — powered by Claude, OpenAI, or Gemini.

## Repos

| Repo | Description |
|------|-------------|
| `financial-analyzer-ui-vitae` (this) | React + Vite frontend — file upload and results dashboard |
| `Financials.AI` | FastAPI backend — parses CSV, calls LLM, returns JSON |

## Setup

Both servers must be running for the app to work.

### 1. Backend

```bash
cd ../Financials.AI
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` and set the provider + API key you want to use:

```env
LLM_PROVIDER=claude        # claude | openai | gemini

ANTHROPIC_API_KEY=sk-...
CLAUDE_MODEL=claude-haiku-4-5

# OPENAI_API_KEY=sk-...
# GEMINI_API_KEY=...
```

Only the key for the chosen provider is required.

```bash
uvicorn main:app --reload
# Runs on http://localhost:8000
```

### 2. Frontend

```bash
npm install
npm run dev
# Runs on http://localhost:5173
```

## Usage

1. Open `http://localhost:5173`
2. Upload a Chase credit card CSV export (drag-drop or click to browse)
3. The backend parses the file, calls the configured LLM, and returns a structured analysis
4. Results display as a dashboard with a summary, category breakdown, recommendations, and warnings
5. Click the **FinanceIQ** logo in the top left to return to the upload screen

### CSV Format

The CSV must be a Chase credit card export with these columns:

```
Transaction Date, Posted Date, Card No., Description, Category, Debit, Credit
```

## LLM Providers

Switch providers by changing `LLM_PROVIDER` in the backend `.env` — no code changes needed.

| Provider | Env var | Default model |
|----------|---------|---------------|
| `claude` | `ANTHROPIC_API_KEY` | `claude-haiku-4-5` |
| `openai` | `OPENAI_API_KEY` | `gpt-4` |
| `gemini` | `GEMINI_API_KEY` | `gemini-2.0-flash` |

> Gemini free tier has strict rate limits.

## Tech Stack

- **React 19** + **Vite 6**
- **Tailwind CSS 4** — utility-class styling, no component library
- **Axios** — CSV multipart upload to backend

## License

This project is for educational and demonstration purposes.
