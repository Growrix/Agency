---
document_type: page-spec
route: /admin/pipeline
role: Admin Dashboard
status: active
last_audit_date: 2026-07-01
---

# /admin/pipeline — Pipeline monitor

## Purpose

Latest inquiries, appointments, and order movement in a single timeline view. Operator triages
to the submissions inbox or order detail from here.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton |
| Empty | No movement | Empty state |
| Populated | Events exist | Grouped lists per channel |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/admin/leads`
- `GET /api/v1/admin/funnel`

## Mutations

None. Triage actions link to `/admin/submissions`.

## Mobile

- Vertical stack; each section collapsible

## Accessibility

- Section headings are H2 with focus targets

## E2E

Smoke admin protection only.
