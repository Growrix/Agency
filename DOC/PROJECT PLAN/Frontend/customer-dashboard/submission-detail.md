---
document_type: page-spec
route: /dashboard/submissions/[type]/[id]
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/submissions/[type]/[id] — Submission detail

## Purpose

Read the customer-visible conversation thread for one submission, and (if the type allows it)
post a customer reply.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton |
| Populated, reply-capable | type ∈ {service_request, support_thread} | Thread + reply form |
| Populated, read-only | other types | Thread only |
| Not found | Bad type/id | 404 page |
| Forbidden | Owner mismatch | 403 inline |

## Data sources

- `GET /api/v1/me/submissions/[type]/[id]`

## Mutations

- `POST /api/v1/me/submissions/[type]/[id]/notes` — only for reply-capable types. Body
  validated server-side via `isReplyCapableType`.

## Mobile

- Thread items left-aligned for admin, right-aligned for customer for visual differentiation
- Reply input is sticky at the bottom of the viewport

## Accessibility

- Each thread item exposes author + relative timestamp via `aria-label`
- Reply textarea has visible label and counter

## E2E

Cover with the dashboard spec — exercise reply on a `support_thread`.
