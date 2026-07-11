# Implementation Phases

## Phase S1: Contract And Env Upgrade
- Replace the generic billing placeholder with explicit Stripe env validation.
- Retire `BILLING_PROVIDER_SECRET` in favor of `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
- Publish request and response DTOs for checkout and portal creation.

## Phase S2: Checkout And Portal APIs
- Implement `/api/billing/checkout` using authenticated users and template `offer_key` input.
- Resolve prices by Stripe `lookup_key` rather than plan-specific env vars.
- Implement `/api/billing/portal` for self-serve billing management.

## Phase S3: Webhook Mirror
- Implement `/api/webhooks/stripe` with raw-body signature verification.
- Enforce idempotency by Stripe `event.id`.
- Upsert `customers`, `subscriptions`, and `invoices` rows.
- Keep subscription truth owned by Stripe and mirrored into the database only through webhooks.

## Phase S4: Diagnostics And Documentation
- Extend diagnostics and health reporting with billing readiness and recent webhook health.
- Update `ENV.example`, `README.md`, `RUN.md`, and the attach contract.
- Add local Stripe CLI workflow documentation.

## Phase S5: Validation And Factory Attach
- Add unit tests for billing services and repositories.
- Add integration tests for checkout, portal, invalid webhook signatures, duplicate events, and lifecycle event handling.
- Add attached-template smoke that proves a template can emit `offer_key` and receive a checkout URL without runtime-specific patching.
