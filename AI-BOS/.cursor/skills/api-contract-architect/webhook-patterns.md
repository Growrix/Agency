# Webhook Patterns

## Required flow (B6)

1. Read **raw body** (`request.text()` or buffer)
2. Verify signature with provider library
3. Return `400` on signature failure
4. Parse JSON after verification
5. Idempotent handler by `event.id` or provider event ID
6. Respond `2xx` quickly

## Growrixos webhooks

| Route | Provider | Secret env |
|-------|----------|------------|
| `/api/webhooks/clerk` | Clerk | `CLERK_WEBHOOK_SIGNING_SECRET` |
| `/api/v1/orders/webhook` | Stripe | `STRIPE_WEBHOOK_SECRET` |

## Idempotency

- Store processed event IDs (DB or dedupe table)
- Second delivery → no-op with 200
- Log audit entry per event

## Contract deliverable

For each new webhook document:

- Header names for signature
- Event types handled
- Payload Zod schema per event type
- State transitions triggered
- Failure retry behavior (provider-side)
