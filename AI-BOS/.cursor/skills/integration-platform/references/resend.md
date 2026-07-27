# Resend — Growrixos Playbook

**Env source:** `web/src/server/config/runtime.ts` → `contact.*`

## Required env vars

| Variable | Purpose | Required |
|----------|---------|----------|
| `RESEND_API_KEY` | API authentication | Yes (email flows) |
| `CONTACT_TO_EMAIL` | Inbound routing | Yes |
| `CONTACT_FROM_EMAIL` | Sender | Recommended |
| `CONTACT_FROM_FALLBACK_EMAIL` | Dev fallback | Optional (defaults in runtime) |

## Routes using email

- `/api/v1/contact`, `/api/contact`
- Commerce/notification flows via `domain/commerce-emails.ts`, `domain/contact.ts`

## Rules

- Send from domain services — not route handlers directly
- Handle Resend API errors with typed service errors
- No PII in logs beyond hashed/redacted identifiers

## Repo stub

`DOC/knowledge/integration-rules/email/resend.yaml`
