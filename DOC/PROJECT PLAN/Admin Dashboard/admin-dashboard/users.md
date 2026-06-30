---
document_type: page-spec
route: /admin/users
role: Admin Dashboard
status: active
last_audit_date: 2026-07-01
---

# /admin/users — Users

## Purpose

Operator surface for role assignment and sign-up completion management. Shipped in Phase 4 D3.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton rows |
| Empty | No users match filters | Empty state |
| Populated | Users exist | Rows with role badge, source (Clerk/Legacy), completion status |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/admin/users?role=&completion=&q=&limit=&offset=`

## Mutations (detail page only)

- `PATCH /api/v1/admin/users/[id]` body `{ role? }` to promote/demote between subscriber, customer, admin
- `PATCH /api/v1/admin/users/[id]` body `{ signup_completed_at: null }` to revoke admission and
  send the user back through `/complete-account`

Both mutations emit audit log entries (`admin.user_role_changed`, `admin.user_signup_revoked`).

## Mobile

- Filter row stacks; each user row uses card layout with stacked metadata

## Accessibility

- Role and completion badges include text (not color-only)
- Detail page destructive action labeled "Revoke admission" with confirm dialog

## E2E

Smoke test: as admin, change a user's role, refresh, confirm persistence; revoke admission;
sign in as that user → land on `/complete-account`.
