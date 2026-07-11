# Customer Dashboard Security Plan

## Purpose
Define the security, privacy, and ownership controls for the customer dashboard and all new customer-self-service actions.

## Core Security Scope
- customer dashboard profile data
- orders, downloads, licenses, and appointment records
- support thread messages
- notification center data
- account export/deletion requests
- public chrome + protected-route composition

## Ownership Rules
- Customer may read and update only their own profile and preferences.
- Customer may read only their own orders, downloads, licenses, appointments, notifications, and support requests.
- Customer may create support messages only on their own requests.
- Customer may request appointment changes only for owned appointments.
- Customer may create account requests only for their own account.

## Visibility Rules
- Support messages need explicit visibility classification:
  - `customer_visible`
  - `internal_only`
- Internal notes must never be returned to any `/api/v1/me/**` response.
- Notification payloads must exclude admin-only metadata and secret URLs.

## Protected Surface Rules
- `/dashboard/**` remains auth-required.
- `/dashboard/profile` and `/dashboard/security` route fallbacks remain auth-required.
- Modal actions must be backed by the same auth and ownership checks as route actions.
- Public header/footer on dashboard pages must not weaken cache, auth, or no-store policy.

## Download Controls
- Signed-download URLs remain short-lived and ownership-checked.
- Download detail endpoints may expose entitlement metadata but never raw storage keys.
- Customer issue-report actions must not reveal internal fulfillment or storage details.

## Account Request Controls
- Data export and deletion requests require:
  - authenticated user
  - explicit confirmation
  - immutable audit event
  - admin resolution workflow
- Account deletion must be request-driven, not immediate destructive self-service in this phase.

## Notification Controls
- Notification read/update endpoints must validate owner.
- Bulk notification state changes must not mutate other users’ rows.
- Notification email mirrors must avoid leaking contextual PII into logs.

## Additional Threat Surfaces Introduced
- modal-triggered mutation paths
- customer-visible support conversation history
- profile/preference updates beyond names
- account privacy request flows

## Required Mitigations
- request validation on all new customer endpoints
- ownership guard on all reads and writes
- audit logging for support replies, account requests, appointment requests, and sensitive profile changes
- CSRF-safe mutation handling through existing protected request model
- explicit no-store caching on protected dashboard routes and APIs

## Exit Criteria
- No dashboard response can expose another customer’s data.
- No internal-only support/admin note can leak into customer UI.
- Sensitive dashboard mutations are auditable and ownership-protected.
