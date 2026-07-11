# Foundation Factory Plan

## Objective
Carry the Stripe module from reusable Foundation runtime ownership to attached-template proof without contaminating templates with backend-specific billing logic.

## Stage 1: Foundation Runtime Completion
- Implement billing routes, repositories, webhook sync, and diagnostics in Foundation Core.
- Verify the module from the Foundation-Core root with Stripe test keys and Stripe CLI forwarding.

## Stage 2: Contract Freeze
- Freeze the billing attach contract around `offer_key` input and hosted checkout output.
- Do not expose template-specific price IDs or hardcoded offer names from Foundation.

## Stage 3: Template Attach
- Wire an attached template pricing CTA to POST `/api/billing/checkout` with a stable `offer_key`.
- Keep CTA copy, offer ordering, and page layout template-owned.

## Stage 4: Combined Smoke
- Authenticate a user.
- Trigger checkout creation from the attached template.
- Confirm the backend returns a valid checkout URL.
- Replay a signed Stripe webhook fixture or CLI-triggered event.
- Confirm the mirrored subscription state updates.
- Trigger portal creation and confirm a valid portal URL is returned.

## Stage 5: Release Classification
- Mark `foundation_ready_template_pending` when Foundation gates pass but no attached template pricing flow is wired.
- Mark `factory_ready` when at least one attached template passes the combined smoke in preview with Stripe test mode.
