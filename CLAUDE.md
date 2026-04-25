# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A two-repo full-stack app: this repo is the **React frontend**, and the backend lives at `../Financials.AI` (FastAPI + Python). The app accepts credit card CSV exports, sends them to an LLM (Claude/OpenAI/Gemini), and displays structured financial insights.

## Repos

| Repo | Path |
|------|------|
| Frontend (this) | `financial-analyzer-ui-vitae/` |
| Backend | `../Financials.AI/` |

---

## Frontend

### Commands

```bash
npm run dev       # Start Vite dev server (localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

### Stack

- React 19 + Vite 6
- Tailwind CSS 4 (via `@tailwindcss/postcss`) — all styling is Tailwind utility classes; `App.css` is largely vestigial
- Axios for API calls
- No router, no state management library — plain `useState` in `App.jsx`

### Architecture

All meaningful state lives in `App.jsx`:
- `analysis` — holds the backend response (null = show upload form)
- `loading` — toggles loading spinner

The app has three mutually exclusive UI states driven by those two values:
1. `FileUpload` component (drag-drop CSV, Axios POST to backend)
2. Loading spinner (inline JSX in App.jsx)
3. Analysis results (inline JSX in App.jsx — summary, bar chart, recommendations, warnings)

`src/components/FileUpload.jsx` owns the upload logic: file validation, drag-drop events, and the `POST /api/v1/upload/` call. `src/pages/` and `src/components/Result.jsx` are currently unused stubs.

### Expected Backend Response

```json
{
  "analysis": {
    "summary": "string",
    "top_spending_categories": [{ "category": "string", "amount": number }],
    "recommendations": ["string"],
    "warnings": ["string"]
  }
}
```

---

## Backend

### Commands

```bash
cd "../Financials.AI"
pip install -r requirements.txt
uvicorn main:app --reload    # Dev (localhost:8000)
uvicorn main:app             # Production
```

### Stack

- FastAPI + Uvicorn (ASGI)
- pandas for CSV parsing/validation
- `anthropic`, `openai`, `google.genai` — one is active based on `LLM_PROVIDER` env var
- Stateless — no database or persistence

### Architecture

```
api/v1/
├── api_router.py       # Includes all endpoint routers
├── endpoints/
│   ├── upload.py       # POST /api/v1/upload/ — main endpoint
│   └── hello.py        # GET /api/v1/hello/ — health check
├── services/
│   ├── analyze.py      # Orchestrates CSV → LLM → structured response
│   └── llm_provider.py # Provider abstraction: claude | openai | gemini
└── utils/
    └── parser.py       # CSV validation and pandas cleaning
```

Upload flow: `upload.py` → `parser.py` (validate + clean CSV) → `analyze.py` (build prompt + call LLM) → `llm_provider.py` (dispatch to selected provider) → return JSON.

Required CSV columns: `Transaction Date`, `Posted Date`, `Card No.`, `Description`, `Category`, `Debit`, `Credit`.

### Environment Variables

Copy `.env.example` to `.env`:

```
LLM_PROVIDER=claude              # claude | openai | gemini
ANTHROPIC_API_KEY=...
CLAUDE_MODEL=claude-haiku-4-5    # or claude-sonnet-4-6, claude-opus-4-7
OPENAI_API_KEY=...               # optional
GEMINI_API_KEY=...               # optional
GEMINI_MODEL=gemini-2.0-flash
```

CORS is configured in `main.py` to allow `http://localhost:5173` (Vite dev server).
