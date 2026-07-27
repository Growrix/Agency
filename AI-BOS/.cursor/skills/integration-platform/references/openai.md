# OpenAI — Growrixos Playbook

**Env source:** `runtime.ts` → `openAi.*`

## Env vars

| Variable | Purpose | Default |
|----------|---------|---------|
| `OPENAI_API_KEY` | API key | Required for concierge |
| `OPENAI_MODEL` | Model id | `o3-mini` |

## Routes

- `POST /api/v1/ai-concierge`
- `POST/PATCH /api/v1/ai-concierge/[sessionId]`

## Rules

- Rate limit: `abuseProtection.conciergeLimitPerMinute`
- Session state via `domain/conversations.ts`
- Never log full prompts with PII

## Repo stub

`DOC/knowledge/integration-rules/ai/openai.yaml`
