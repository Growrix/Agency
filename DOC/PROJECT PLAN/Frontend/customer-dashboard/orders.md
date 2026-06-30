---
document_type: page-spec
route: /dashboard/orders
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/orders — Order history

## Purpose

Chronological list of every order the customer placed. Acts as the index into per-order detail.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton rows |
| Empty | No orders | Empty card with Browse CTA |
| Populated | Orders exist | Rows with order_number, date, total, payment_status, fulfillment_status, link |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/me/orders`

## Mutations

None. Detail actions live on `/dashboard/orders/[id]`.

## Mobile

- Status badges wrap below the order number on narrow widths

## Accessibility

- Rows render as `<Link>` with full row clickable; status badges have textual labels
- Table semantics preserved via `<table>` on wide widths

## E2E

Cover with the dashboard spec.
