# OpenRouter — Growrixos AI Concierge Playbook

**Env source:** `runtime.ts` → `openAi.*` (OpenRouter-backed; legacy OpenAI env names accepted as fallback)

## Env vars

| Variable | Purpose | Default |
|----------|---------|---------|
| `OPENROUTER_API_KEY` | OpenRouter API key | Required for concierge |
| `OPENROUTER_MODEL` | OpenRouter model slug | `mistralai/mistral-nemo` |
| `OPENROUTER_BASE_URL` | Chat Completions API root | `https://openrouter.ai/api/v1` |
| `OPENAI_API_KEY` | Legacy fallback key | Optional |
| `OPENAI_MODEL` | Legacy fallback model | Optional |

## Routes

- `POST /api/v1/ai-concierge`
- `POST/PATCH /api/v1/ai-concierge/[sessionId]`

## Rules

- Provider: OpenRouter OpenAI-compatible Chat Completions
- Default model chosen for low cost + JSON `response_format` support
- Rate limit: `abuseProtection.conciergeLimitPerMinute`
- Session state via `domain/conversations.ts`
- Never log full prompts with PII
- Never commit API keys

## Repo stub

`DOC/knowledge/integration-rules/ai/openai.yaml`
