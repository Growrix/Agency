---
document_type: page-spec
route: /admin/submissions
role: Admin Dashboard
status: active
last_audit_date: 2026-07-01
---

# /admin/submissions — Submissions inbox

## Purpose

Unified inbox of every customer submission (inquiry, appointment, service_request, order,
newsletter, support_thread). Operator triages, assigns, and replies from the detail page.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton |
| Empty | No submissions match filters | "No matches" |
| Populated | Submissions exist | Rows with type/status/customer/created_at |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/admin/submissions?type=&status=&q=&from=&to=&assigned=&limit=&offset=`

## Mutations

None at index. Detail page handles status + notes + assignment via
`/admin/submissions/[type]/[id]`.

## Mobile

- Filter row collapses to a single Sheet; result rows stack with metadata wrapping

## Accessibility

- Type/status filter is a `<fieldset>` with legend
- Each row is a `<Link>` with descriptive accessible name

## E2E

Smoke admin protection only; Phase 5 adds an assert that a contact form submission shows up here
within seconds.
