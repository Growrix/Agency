# Ecommerce Blueprint Realignment Backend Plan

## Purpose
Finalize backend service invariants and lifecycle consistency across cart, checkout, payments, orders, inventory, support, and notifications.

## Current Backend State
- Strong module coverage exists across catalog, cart, orders, downloads, leads, notifications, reviews, and submissions.
- Main gaps are lifecycle strictness, inventory/payment invariants, and full blueprint parity closure.

## Critical Gap Closures
1. Inventory integrity (phase 6)
- Enforce reservation and release semantics that prevent oversell.
- Ensure checkout confirmation cannot bypass reservation failure.

2. Checkout idempotency (phase 8)
- Add/verify idempotency keys on start/confirm mutations.
- Ensure retried requests do not create duplicate order/payment state transitions.

3. Payment and webhook resilience (phase 9)
- Enforce strict signature, replay, and mismatch handling.
- Reconcile webhook outcomes against canonical order state transitions.

4. Order lifecycle parity (phase 10)
- Standardize pending -> paid -> fulfilling -> delivered -> return/refund transitions.
- Preserve append-only audit trail for financial and fulfillment state changes.

5. Reviews and engagement workflows (phase 11/12)
- Verified-purchase linkage for reviews where required.
- Reliable notifications and retry paths for customer/operator communications.

## Reuse Targets
- Existing domain modules and API handlers under web/src/server/domain and web/src/app/api/v1.
- Existing audit logging and rate-limit patterns.

## Deliverables
- Service-invariant checklist mapped to blueprint service docs.
- State transition matrix for order/payment/fulfillment/returns.
- Incident-safe failure handling for critical external integrations.

## Exit Criteria
- Money, inventory, and fulfillment flows are deterministic, idempotent, and auditable.
- Backend behavior maps directly to blueprint service boundaries without undocumented exceptions.
