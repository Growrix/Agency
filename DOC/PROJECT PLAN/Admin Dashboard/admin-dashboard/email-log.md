---
document_type: page-spec
route: /admin/email-log
role: Admin Dashboard
status: active
last_audit_date: 2026-07-01
---

# /admin/email-log — Email log

## Purpose

Surface the audit trail for outbound team-notification emails routed through Resend. Filters
let the operator drill into a specific kind or status. Shipped in Phase 1 E3.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | "Loading…" |
| Empty | No matching entries | Empty state |
| Populated | Entries exist | Rows with status badge, action, kind, subject, recipients, error |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/admin/email-log?kind=&status=&limit=&offset=`

## Mutations

None.

## Mobile

- Filters stack; rows reflow

## Accessibility

- Status badges include text label
- Error messages have role="alert" for status communication

## E2E

Smoke admin protection only. Phase 5 adds: trigger a contact submission, see new
`team_notification.email_*` audit entry surface here.
