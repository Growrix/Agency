# Mission And Scope

## Mission
Plan a reusable Stripe billing module for Foundation Core that can be attached to finished frontends without forcing template-specific pricing architecture into the runtime.

## In Scope
- Server-only Stripe client boundary in Foundation Core.
- Auth-protected checkout and billing portal APIs.
- Stripe webhook ingestion with raw-body signature verification.
- Customer, subscription, and invoice mirror persistence.
- Offer resolution contract from template `offer_key` to Stripe price `lookup_key`.
- Diagnostics, health, observability, and release gates for the billing slice.
- Attach contract updates so attached templates know exactly what billing backend surfaces exist.

## Non-Goals
- No custom card form or embedded Stripe Elements baseline.
- No design-system or pricing-page visual planning.
- No template-specific plan env vars such as `STRIPE_PRICE_ID_STARTER` inside Foundation Core.
- No vendor lock-in beyond the Stripe billing module boundary.
- No Cloudflare, CDN, or unrelated infrastructure expansion in this run.

## Key Decision
Foundation Core will standardize on hosted Stripe Checkout plus Stripe Customer Portal. This keeps PCI scope low, avoids client-side payment collection in the baseline, and reduces the number of frontend assumptions the runtime must make.

## API-Ready Contract
The code path should be implementation-ready once these runtime secrets exist per environment:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` remains optional and template-owned because the baseline interaction model does not require Stripe.js on the client.

## Operator Preconditions
API keys alone are not the whole commercial setup. Stripe Dashboard still must contain:
- Products and prices.
- Stable price `lookup_key` values that match template `offer_key` values.
- Customer Portal configuration.
- A webhook endpoint registration for each deployed environment.

Those remain operator-managed dashboard data, not repo-owned plan constants.
