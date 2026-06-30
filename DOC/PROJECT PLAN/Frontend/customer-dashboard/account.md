---
document_type: page-spec
route: /dashboard/account
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/account — Account

## Purpose

Single page that mounts Clerk's hosted `<UserProfile />` (identity, password, MFA, connected
accounts, sessions, account deletion) and the app-specific `AppPreferencesCard` (phone, marketing
opt-in).

Shipped in Phase 2 (P22).

## States

| State | Trigger | UI |
|---|---|---|
| Loading (preferences) | `/api/v1/me` in-flight | Loading text in AppPreferencesCard |
| Loaded | Both UserProfile and preferences ready | Two stacked cards |
| Error (preferences) | `/api/v1/me` failed | Inline error in preferences card |
| Clerk not configured | Build-time env unset | Fallback "Clerk not configured" card with the preferences card still rendered |

## Data sources

- Clerk hosted UserProfile (no app endpoint)
- `GET /api/v1/me` — drives the AppPreferencesCard initial fill

## Mutations

- Clerk-managed surfaces write to Clerk directly (password change, MFA, etc.)
- `POST /api/v1/me/update` — narrowed to `phone` + `marketing_opt_in` in Phase 2

## Mobile

- Clerk's `<UserProfile />` collapses its own navbar to a header strip
- AppPreferencesCard stays one column; Save button full-width

## Accessibility

- Inherits Clerk's accessibility for the hosted panel
- AppPreferencesCard inputs have visible labels and form validation messages

## E2E

Phase 5 mobile project adds an axe scan + smoke render.
