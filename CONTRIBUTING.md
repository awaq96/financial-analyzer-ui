# Contributing to FinanceIQ (Frontend)

Thanks for your interest in contributing! This is a solo side project, so contributions are welcome but may take time to review.

## Before You Start

Open an [issue](../../issues) before writing code. This avoids duplicate work and lets us agree on the approach before you invest time in a PR.

## Setup

**Frontend**
```bash
git clone https://github.com/<your-fork>/financial-analyzer-ui.git
cd financial-analyzer-ui
npm install
npm run dev
```

**Backend** (required — the frontend is a UI shell with no standalone functionality)
```bash
git clone https://github.com/awaq96/Financials.AI.git
cd Financials.AI
pip install -r requirements.txt
cp .env.example .env  # add your API key for the provider you're testing with
uvicorn main:app --reload
```

## Workflow

1. Fork the repo and create a branch off `main`
2. Name your branch descriptively: `feature/dark-mode`, `fix/drag-drop-safari`
3. Make your changes
4. Open a PR against `main` with a clear description of what changed and why

## What's Welcome

- UI improvements to the upload screen or results dashboard
- Support for displaying new fields if the backend response schema is extended
- Accessibility improvements
- Bug fixes with a clear reproduction case in the PR description

## What to Avoid

- Changing how the analysis response is rendered without a matching backend schema change — the frontend expects `summary`, `top_spending_categories`, `recommendations`, and `warnings` from `POST /api/v1/upload/`
- Adding component libraries or routing frameworks; the current stack (React + Tailwind, no router, no state lib) is intentionally minimal
- Storing or logging CSV data client-side — the project is intentionally stateless

## Code Style

- All styling via Tailwind utility classes — avoid adding custom CSS unless there's no Tailwind equivalent
- Inline SVG icons (see `ICONS` in `App.jsx`) — no icon library needed
- Run `npm run lint` before opening a PR
