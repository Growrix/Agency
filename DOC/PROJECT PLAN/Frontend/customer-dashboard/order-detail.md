---
document_type: page-spec
route: /dashboard/orders/[id]
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/orders/[id] — Order detail

## Purpose

Full breakdown of a single order: line items, payment + fulfillment status, delivery URLs (when
delivered), and links to related downloads.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton |
| Populated | Owner viewing | Sections: summary, line items, delivery, support thread link |
| Not found | Bad id | 404 page |
| Forbidden | Owner mismatch | 403 inline ("You do not have access to this order") |

## Data sources

- `GET /api/v1/me/orders/[id]` — ownership enforced server-side

## Mutations

None for customer. Admin status updates happen on `/admin/submissions/order/[id]`.

## Mobile

- Line items stack vertically; sticky "Total" remains visible at the bottom

## Accessibility

- Summary section uses `<dl>` for term/definition pairs
- Status badges include text

## E2E

Cover with the dashboard spec — read after a seeded order is created.
