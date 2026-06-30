---
document_type: role-plan
role: Frontend
parent_artifact: DOC/PROJECT PLAN/auth-account-cart-dashboard-e2e-plan.md
status: active
last_audit_date: 2026-07-01
---

# Account & Profile — Frontend Plan

## Scope

Phase 2 (P22) — mount Clerk's `<UserProfile />` as the identity surface and retire the v1 modal that duplicated fields Clerk now owns.

## Route map

| Route | File | Owner | Purpose |
|---|---|---|---|
| `/dashboard/account` | `web/src/app/dashboard/account/page.tsx` | server | Metadata + `<AccountSurface />` |
| `/dashboard/account` (client) | `web/src/app/dashboard/account/AccountSurface.tsx` | client | Mounts `<UserProfile />` + `<AppPreferencesCard />` |

## Component diff

| Component | Status | Why |
|---|---|---|
| `web/src/components/dashboard/AppPreferencesCard.tsx` | NEW | Inline card for phone + marketing opt-in. No dialog. |
| `web/src/components/dashboard/ProfileSettingsModal.tsx` | DELETED | Replaced by `/dashboard/account`. Only DashboardHeaderControls referenced it. |
| `web/src/components/dashboard/DashboardChrome.tsx` | UPDATED | Adds `Account` nav entry + section meta. |
| `web/src/components/dashboard/DashboardHeaderControls.tsx` | UPDATED | "Profile and preferences" menu item links to `/dashboard/account` instead of opening a dialog. |

## Clerk `<UserProfile />` integration

- Imported as `import { UserProfile } from "@clerk/nextjs"`.
- `routing="hash"` so deep links stay on `/dashboard/account` (avoids needing a catch-all child segment).
- `appearance.elements` map matches our design tokens — card border, primary button colors, navbar styling on inset background. Not a wholesale theme; just enough to blend.
- Wrapped in `isClerkConfiguredClient()` so non-Clerk environments (legacy + integration tests) render a fallback Card instead of crashing.

## App-specific preferences

App-specific fields (phone, marketing opt-in) live in `AppPreferencesCard`, NOT inside `<UserProfile />`. Clerk doesn't own them.

- Reads via `GET /api/v1/me`.
- Writes via `POST /api/v1/me/update` (narrowed to only `phone` + `marketing_opt_in` — name + email are read-only and synced from Clerk via webhook).

## Backend dependencies (already shipped in this phase)

| Path | Change |
|---|---|
| `web/src/server/auth/users.ts` | `updateUserProfile` no longer accepts `firstName`/`lastName`. |
| `web/src/app/api/v1/me/update/route.ts` | Body schema narrowed to `phone` + `marketing_opt_in`. |

Clerk webhook (`web/src/app/api/webhooks/clerk/route.ts`) remains the source of truth for `first_name`/`last_name` on `UserRecord`. No code change required.

## Future addresses (deferred)

`AccountAddressesCard` (mentioned in the canonical plan) is deferred until Phase 5 because no checkout surface currently consumes saved addresses. When checkout polish lands, we'll add it as a third card on the same page.

## Acceptance criteria

- `/dashboard/account` renders with `<UserProfile />` panel and `AppPreferencesCard` underneath.
- Updating phone + marketing opt-in persists across reloads.
- Header user menu "Profile and preferences" link navigates to `/dashboard/account`.
- v1 modal is unreachable from any UI surface.
- Build, lint, typecheck, perf:budgets, test, release-gates e2e all pass.

## Verification

- Manual: load `/dashboard/account`, change name in Clerk panel — name persists in Clerk. Update phone in AppPreferencesCard, refresh — phone persists. Update marketing toggle, refresh — toggle persists.
- Automated: existing release-gates e2e still passes (no new e2e in this phase; per-page customer-dashboard specs land in Phase 4).
