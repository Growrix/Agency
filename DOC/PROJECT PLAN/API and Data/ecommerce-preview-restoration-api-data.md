# Ecommerce Preview Restoration API and Data Plan

## Purpose
Define API contract updates and data-governance implications for restoring full preview behavior while preserving transactional and paid-delivery integrity.

## Scope
- Public preview endpoint contract update:
  - website-templates-html-preview
  - html-business-profiles
- No schema replacement for transactional ecommerce flows.
- No changes to signed download API contract envelope.

## Current API Baseline
- Preview APIs currently return redacted content with constrained-mode headers/markers.
- Paid download APIs already enforce signed-url issuance and grant redemption.
- Integration tests assert constrained preview behavior and download security behavior in the same suite.

## Contract Update Decision
- Preview contract mode changes from redacted to full-html:
  - Keep endpoint paths unchanged.
  - Keep successful status and text/html content-type.
  - Remove reliance on constrained-preview markers in tests and docs.

## Data Ownership Boundaries
- Public preview HTML is informational and non-transactional.
- Paid assets and fulfillment state remain transactional and private.
- Source-of-truth split remains:
  - Sanity for editorial/catalog content.
  - Supabase/PostgreSQL for transactional commerce data.

## Required API/Test Deltas
1. Update preview API route handlers to bypass preview redaction transform.
2. Adjust preview response header policy to compatibility-safe values for full template rendering.
3. Update integration tests:
  - Remove assertions tied to redaction markers.
  - Keep assertions for noindex/no-store/security baseline where still applicable.
  - Preserve all signed download and rejected-grant assertions.

## Blueprint Alignment
- API standards retained:
  - predictable error behavior
  - authz on protected endpoints
  - idempotency for retry-prone financial/fulfillment mutations
- Preview endpoints remain public-facing and outside transactional auth scope.

## Exit Criteria
- Preview API contract documents full-html mode.
- Integration tests validate new preview mode without weakening paid-delivery checks.
- Data ownership boundaries remain explicit and unchanged.
