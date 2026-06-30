---
document_type: page-spec
route: /dashboard/products
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/products — Purchased products

## Purpose

List products the customer has purchased (digital downloads, hybrid, done-for-you) with quick
links to the matching downloads and the source order.

## Audience

Signed-in customer with at least one paid order.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Card grid skeleton |
| Empty | No paid orders | "Nothing purchased yet" card + Browse CTA |
| Populated | One or more paid line items | Product cards (name, tier, fulfillment type, links) |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/me/orders` — joined with line items; client filters to `payment_status: succeeded`
- `GET /api/v1/me/downloads` — used to render the "Download" link per product

## Mutations

- "Download" button opens `/api/v1/downloads/[id]/signed-url` (POST) → followed by anchor click

## Mobile

- Single-column card stack
- Download buttons full-width with 44px height

## Accessibility

- Each card has `aria-labelledby` referencing the product name
- "Download" anchor uses `download` attribute and a visible label

## E2E

Cover in the same dashboard spec — assert a paid product surfaces here and the Download link
triggers a non-401 response.
