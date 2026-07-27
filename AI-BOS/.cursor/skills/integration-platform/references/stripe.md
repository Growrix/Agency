# Stripe — Growrixos Playbook

**Env source:** `web/src/server/config/runtime.ts` → `stripe.*`

## Required env vars

| Variable | Purpose | Required |
|----------|---------|----------|
| `STRIPE_SECRET_KEY` | Server API calls | Yes (commerce) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature | Yes (webhooks) |

## Routes

- `POST /api/v1/orders/webhook` — checkout.session.completed, payment_intent.*, etc.

## Implementation rules

- Webhook: raw body + `stripe.webhooks.constructEvent`
- Idempotent by Stripe `event.id`
- Checkout: use Stripe.js client secret pattern from orders domain
- Never log full payment objects or secrets

## Growrixos addendum

- Order mirror in Supabase/file store via `web/src/server/domain/orders.ts`
- Commerce emails via Resend after payment success

## Repo stub

`DOC/knowledge/integration-rules/payments/stripe.yaml`

## Playbook path

`~/.cursor/skills/integration-platform/references/stripe.md`
