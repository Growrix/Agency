---
document_type: page-spec
route: /admin/catalog
role: Admin Dashboard
status: active
last_audit_date: 2026-07-01
---

# /admin/catalog — Catalog studio

## Purpose

Operator surface for managing services, products, and portfolio records. After Phase 4 D2 lands,
this view uses structured forms instead of raw JSON textareas.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton |
| Editing | Operator opens a record | CatalogServiceForm / CatalogProductForm / CatalogPortfolioForm |
| Creating | Operator hits "New" | Same form with `id=draft` and blank defaults |
| Saving | Submit in flight | Disabled submit + spinner |
| Saved | Success | Notice + form remains open with refreshed record |
| Error | Endpoint failure | Inline error from API |

## Data sources

- `GET /api/v1/admin/services`
- `GET /api/v1/admin/products`
- `GET /api/v1/admin/portfolio`

## Mutations

- `POST /api/v1/admin/services` (already accepts full record)
- `POST /api/v1/admin/products`
- `POST /api/v1/admin/portfolio`

## Mobile

- Forms scroll on a single column; sticky submit footer

## Accessibility

- All inputs have visible labels
- Validation errors associate via `aria-describedby`

## E2E

Smoke test: load /admin/catalog, edit a service, save, reload and confirm persistence.
