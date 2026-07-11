# Ecommerce Blueprint Realignment API and Data Plan

## Purpose
Close API and schema gaps so ecommerce behavior is contract-complete against blueprint phases.

## Current State
- Broad API surface exists with many active endpoints.
- Contract completeness and phase parity need explicit closure for inventory, checkout idempotency, payment reconciliation, returns/refunds, and support/account workflows.

## Gap Priorities
1. Contract parity matrix
- Map each blueprint phase endpoint requirement to implemented endpoint and status.
- Mark missing or partial payload fields and status models.

2. Idempotent transactional APIs
- Ensure checkout/payment/refund/webhook routes are idempotent and replay-safe.

3. Ownership and visibility controls
- Ensure /api/v1/me and admin endpoints enforce strict ownership and role boundaries.

4. Data model closure
- Finalize transactional table ownership for orders/items/payments/inventory/downloads/licenses/service requests/messages.
- Reduce ambiguous app_state dependency for critical transactional records.

5. Error and recovery consistency
- Standardize recoverable failure reasons in API responses for checkout and cart flows.

## Reuse Targets
- Existing response envelope and error primitives.
- Existing domain schemas and store adapters.

## Deliverables
- Phase-by-phase API parity table.
- Schema ownership matrix (Sanity vs PostgreSQL).
- Migration and backfill decision ledger.

## Exit Criteria
- Every critical ecommerce behavior has a documented and implemented API contract.
- Transactional entities have explicit durable ownership and migration posture.
