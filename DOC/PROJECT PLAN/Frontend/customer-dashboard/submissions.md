---
document_type: page-spec
route: /dashboard/submissions
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/submissions — Submissions

## Purpose

Index of every submission tied to the customer's email — contact inquiries, service requests,
support threads, orders. Each row links to the detail route.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton rows |
| Empty | No submissions | Empty card with "Contact us" CTA |
| Populated | Submissions exist | Rows grouped by type with `customer_visible_status` badge |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/me/submissions` — server filters out admin-only notes via
  `filterCustomerVisibleNotes`

## Mutations

None. Replies happen on `/dashboard/submissions/[type]/[id]`.

## Mobile

- Type filter pills move into a horizontal scroll bar at narrow widths

## Accessibility

- Type filter is a `<form>` with hidden submit; radio inputs use `aria-label`
- Each row link includes the type and status in its accessible name

## E2E

Cover with the dashboard spec.
