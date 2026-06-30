---
document_type: page-spec
route: /dashboard/downloads
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/downloads — Downloads

## Purpose

Comprehensive list of every download entitlement issued to the customer, with state (active,
expired, revoked) and download-count remaining.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton rows |
| Empty | No downloads | Empty card with "Browse digital products" CTA |
| Populated | Entitlements exist | Table-style rows with file label, product, count, state, action |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/me/downloads`

## Mutations

- `POST /api/v1/downloads/[id]/signed-url` — exchanges entitlement for a signed asset URL.
  Triggered by the row "Download" button.

## Mobile

- Each entitlement renders as a card with stacked metadata (label, product, count, state).

## Accessibility

- State badges use icon + label combo, not color-only
- Disabled actions communicate why via `aria-describedby`

## E2E

Cover with the dashboard spec — exercise the signed-URL exchange and confirm `download_count`
increments.
