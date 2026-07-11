# Ecommerce Preview Restoration Backend Plan

## Purpose
Define backend-side contract and service decisions for restoring full preview while preserving paid-delivery security and ecommerce service invariants.

## Scope
- Preview API behavior shift from constrained/redacted to full-html response.
- Preserve paid delivery controls for private assets and licensed downloads.
- Keep shared ecommerce service boundaries and transaction rules aligned with blueprint.

## Service Ownership
- Preview delivery service:
  - Serves public preview HTML from controlled API routes.
  - Remains non-authoritative for paid asset fulfillment.
- Download entitlement service:
  - Remains authoritative for paid asset access via signed grants and redemption checks.

## Current Reuse Targets
- Reuse existing downloads domain and grant token flow:
  - createAuthorizedDownloadUrl
  - consumeAuthorizedDownload
  - verifyDownloadGrantToken
- Reuse existing audit logging and rate-limiting hooks for grant misuse detection.

## Backend Delta Decisions
- Public preview security posture:
  - Accept copy risk for preview HTML as business-approved posture.
- Paid delivery posture:
  - No rollback of grant token, expiry, fingerprint, or rejected-grant logging.
- Contract posture:
  - Preview API response mode changes, but paid API contracts remain unchanged.

## Backend Work Items
1. Remove redaction transform usage from preview API handlers.
2. Ensure preview responses remain stable and cache-safe.
3. Keep download authorization, delivery redemption, and forensic logging untouched.
4. Reconfirm idempotency and ownership checks in order/download flows remain unchanged.

## Risks And Compensating Controls
- Risk:
  - Public preview is easy to copy.
- Compensating controls:
  - Signed paid download grants.
  - Private paid assets.
  - Fingerprint and audit traceability.
  - Rate-limited redemption and abuse monitoring.

## Exit Criteria
- Preview APIs return full HTML.
- Paid fulfillment security controls remain fully active.
- No regression in order/download authorization and audit behavior.
