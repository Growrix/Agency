# Lark — Growrixos Playbook

**Env source:** `runtime.ts` → `notifications.*`

## Env vars

| Variable | Purpose |
|----------|---------|
| `LARK_WEBHOOK_URL` | Incoming webhook URL |
| `LARK_SIGNING_SECRET` | Optional signature verification |
| `LEAD_HOT_THRESHOLD` | Hot lead score threshold (default 30) |

## Usage

- Hot lead alerts via `web/src/server/domain/notifications.ts`
- Optional — flows degrade gracefully when URL unset

## Repo stub

`DOC/knowledge/integration-rules/notifications/lark.yaml`
