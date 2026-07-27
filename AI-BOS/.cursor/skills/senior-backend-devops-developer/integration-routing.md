# Integration Routing

## Rule

Never invent env var names or webhook paths. Source of truth:

1. `web/src/server/config/runtime.ts`
2. `.cursor/brain/integration-catalog.yaml`
3. `@integration-platform/references/<provider>.md`
4. `DOC/knowledge/integration-rules/` stubs (Growrixos)

## Provider → skill

| Provider | Owner | Playbook |
|----------|-------|----------|
| Clerk | `@clerk-nextjs-auth` | `DOC/knowledge/integration-rules/auth/clerk.yaml` |
| Supabase | `@integration-platform` | `supabase.md` |
| Stripe | `@integration-platform` | `stripe.md` |
| Resend | `@integration-platform` | `resend.md` |
| Sanity | `@integration-platform` | `sanity-server.md` |
| Lark | `@integration-platform` | `lark.md` |
| OpenAI | `@integration-platform` | `openai.md` |
| Twilio | `@integration-platform` | `twilio.md` (P2 — planned) |

## Before coding

Run `/integration-plan` or delegate `@api-contract-architect` + `@integration-platform` to materialize:

- Env checklist (required vs optional)
- Route list
- Webhook signature method
- Idempotency strategy

## Missing knowledge

PostHog, Inngest, Pusher, S3 — documented as planned in catalog; report `missing_knowledge` until playbooks exist.
