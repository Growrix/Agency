---
document_type: page-spec
route: /dashboard
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard — Customer overview

## Purpose

Landing surface after sign-in. Summarizes recent activity (orders, downloads, appointments,
support threads) so the customer can pick up where they left off in one screen.

## Audience

Signed-in customer (`role: subscriber | customer`) whose `signup_completed_at` is set.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | First mount before `/api/v1/me` resolves | Skeleton cards in DashboardShell |
| Empty | New customer with no activity | "Welcome" card + Browse digital products CTA |
| Populated | Has orders/downloads/etc | Summary tiles linking to deeper routes |
| Error | `/api/v1/me` returns non-2xx | Inline error card with retry button |

## Data sources

- `GET /api/v1/me` — viewer record (name, email, role, marketing flag, signup state)
- `GET /api/v1/me/orders?limit=3` — recent orders summary
- `GET /api/v1/me/downloads?limit=3` — latest downloads
- `GET /api/v1/me/appointments?limit=3` — upcoming appointments
- `GET /api/v1/me/submissions?limit=3` — open threads

All endpoints guarded by `requireCompletedSubscriber`. 401/403 means the proxy missed; redirect
to `/dashboard/login` or `/complete-account` respectively (proxy handles this server-side).

## Mutations

None — overview is read-only. CTAs link out to detail routes.

## Mobile

- DashboardShell collapses sidebar to bottom-sheet at < 768px
- Summary tiles stack vertically; each tile must keep tap targets ≥ 44×44
- Notification bell stays in header; bottom-nav clearance applies for floating Help CTA

## Accessibility

- DashboardShell sets `<main role="main">` and skip-link target
- Each summary tile has `aria-labelledby` on its heading
- Loading skeletons use `aria-busy="true"` on the section wrapper
- Color contrast for muted "—" placeholders meets 4.5:1

## E2E test path

`tests/e2e/dashboard.spec.ts` (Phase 5 mobile project will add this):
1. Sign in
2. Land on `/dashboard`
3. Assert at least one summary tile renders for a seeded customer
4. Tap the Orders tile → URL changes to `/dashboard/orders`
