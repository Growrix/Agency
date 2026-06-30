---
document_type: page-spec
route: /admin/activity
role: Admin Dashboard
status: active
last_audit_date: 2026-07-01
---

# /admin/activity — Activity stream

## Purpose

Recent analytics + audit events feed for monitoring platform health.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton rows |
| Empty | No events recorded yet | Empty state |
| Populated | Events exist | Chronological list with type/actor/route metadata |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/admin/analytics` — aggregate counts + latest 10 record samples
- `GET /api/v1/admin/notifications` — outbound notification log

## Mutations

None.

## Mobile

- Rows stack vertically; metadata wraps to next line

## Accessibility

- Each event row has descriptive accessible name (action + actor + time)

## E2E

Smoke admin protection only.
