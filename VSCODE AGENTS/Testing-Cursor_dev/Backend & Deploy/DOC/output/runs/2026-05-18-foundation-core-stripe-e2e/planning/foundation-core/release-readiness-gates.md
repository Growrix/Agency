# Release Readiness Gates

## `blocked`
Use this classification when any core Stripe dependency or contract rule is still missing.

Blocking conditions:
- `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` is not defined for the target environment.
- `/api/billing/checkout`, `/api/billing/portal`, or `/api/webhooks/stripe` is absent.
- Webhook signature verification or raw-body handling is not implemented.
- Idempotent event processing is absent.
- Customer, subscription, and invoice mirroring is absent.
- The template-to-price contract does not define `offer_key` to Stripe `lookup_key` mapping.
- Stripe Dashboard products, prices, or Customer Portal configuration are missing.
- Webhook endpoints are not registered in Stripe for the deployed environment.

## `foundation_ready_template_pending`
Use this classification when Foundation Core is backend-ready but no attached template has finished the pricing attach work yet.

Required evidence:
- Billing env validation exists and rejects incomplete runtime configuration.
- Checkout, portal, and webhook routes pass automated tests.
- Webhook lifecycle events update mirrored billing state.
- Diagnostics and health expose billing readiness.
- `ENV.example`, `README.md`, `RUN.md`, and the attach contract document the Stripe slice.
- Foundation-only smoke succeeds with Stripe test mode.

## `factory_ready`
Use this classification when the reusable backend slice has been proven with at least one attached template.

Required evidence:
- An attached template emits `offer_key` values that match Stripe `lookup_key` values.
- Preview environment uses valid Stripe test secrets and registered preview webhook endpoints.
- Attached-template checkout creation succeeds end-to-end.
- Signed webhook delivery updates mirrored subscription state in preview.
- Portal creation succeeds for an authenticated attached-template user.
- Billing smoke is integrated into the template attach verification path.

## Release Note
"Add API keys and it works" is true only for code-side runtime configuration. Stripe Dashboard catalog setup and webhook registration remain operator prerequisites, but no further architectural or template-specific backend coding should be required once this plan is implemented.
