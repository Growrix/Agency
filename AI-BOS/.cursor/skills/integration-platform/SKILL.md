---
name: integration-platform
description: >-
  Integration platform router — Stripe, Supabase, Resend, Lark, Sanity, OpenAI,
  Twilio playbooks. Env contract from runtime.ts; never invent var names. Load
  one reference playbook at a time.
disable-model-invocation: true
---

# Integration Platform

Router to provider playbooks. One provider per invocation.

## Quick Start

1. Read `.cursor/brain/integration-catalog.yaml`
2. Read `web/src/server/config/runtime.ts` for env names
3. Load **one** playbook from `references/<provider>.md`
4. Materialize env checklist before coding
5. Hand implementation to `@senior-backend-devops-developer`

## Read First (max 5)

1. [references/ai-bos-binding.md](references/ai-bos-binding.md) — **required for Growrixos `web/`** (`PRJ-SAAS-GROWRIXOS-001`)
2. `.cursor/brain/integration-catalog.yaml`
3. `web/src/server/config/runtime.ts`
4. One `references/*.md` playbook for target provider
5. Matching stub in `DOC/knowledge/integration-rules/` (Growrixos)

## Rule

**Never invent env var names.** If missing from runtime.ts, report `missing_knowledge` and propose doc update first.

## Playbooks (lazy load one)

| File | Provider | Priority |
|------|----------|----------|
| `references/stripe.md` | Stripe | P0 |
| `references/supabase.md` | Supabase | P0 |
| `references/resend.md` | Resend | P0 |
| `references/sanity-server.md` | Sanity | P1 |
| `references/lark.md` | Lark | P1 |
| `references/openai.md` | OpenAI | P1 |
| `references/twilio.md` | Twilio | P2 planned |

## Clerk

Clerk is **not** owned here — use `@clerk-nextjs-auth`.

## Handoffs

| To | When |
|----|------|
| `@clerk-nextjs-auth` | Auth / middleware / Clerk webhook |
| `@api-contract-architect` | Webhook/API contract design |
| `@senior-backend-devops-developer` | Implementation |
| `@devops-release-engineer` | Prod env / deploy secrets |
