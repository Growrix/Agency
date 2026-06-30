---
document_type: page-spec
route: /dashboard/support
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/support — Support

## Purpose

Quick-access surface to start a new support thread or browse open ones. Bridges into the
existing submissions detail view for the actual conversation.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton |
| Empty | No open threads | New-thread form + FAQ links |
| Populated | Active threads | Compact list + open-new-thread CTA |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/me/submissions?type=support_thread`

## Mutations

- Submitting the new-thread form POSTs to `/api/v1/support` (existing endpoint) and on success
  redirects to the matching submission detail route.

## Mobile

- New-thread form is full-width with textarea autosizing

## Accessibility

- Thread list rows are buttons/links with full accessible names
- Form labels are visible (not placeholder-only)

## E2E

Cover with the dashboard spec — open new thread → assert detail route loads.
