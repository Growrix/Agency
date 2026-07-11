# Customer Dashboard Frontend Plan

## Purpose
Define the customer dashboard UI, route structure, modal system, and page-level UX so every signed-in surface has a complete end flow rather than placeholder summaries.

## Baseline Reuse
- Reuse the current dashboard route group under `/dashboard/**`.
- Reuse `DashboardShell` as the dedicated dashboard chrome (sidebar + slim header) — no longer wrapped in the public marketing shell.
- Reuse primitives: `Card`, `Button`, `LinkButton`, `Popover`, theme toggle, status badges, empty/loading/error states.

## Core Frontend Decision
Customer dashboard pages render inside a dedicated dashboard chrome and do NOT inherit the public marketing shell (`SiteTopChrome`, `Footer`, `MobileBottomNav`, `ChatLauncher`). Direction updated 2026-06-30 by operator instruction. The correct structure is:
- `AppChrome` excludes `/dashboard/**` alongside `/admin/**` and standalone profile routes.
- `web/src/app/dashboard/layout.tsx` wraps children in `DashboardChrome` (composes `DashboardShell`).
- The dashboard chrome owns: sidebar nav, header (user menu, notifications, theme toggle), logout, and utility actions.
- `/dashboard/login` (legacy fallback) renders bare children — the chrome short-circuits for unauthenticated entry points.

## Route Model
Required routes:
- `/dashboard` — overview
- `/dashboard/products` — entitlements and product-specific actions
- `/dashboard/downloads` — delivered assets and authorization actions
- `/dashboard/orders` — order history and order detail entrypoints
- `/dashboard/appointments` — booking history and follow-up actions
- `/dashboard/support` — support inbox and request threads
- `/dashboard/profile` — route fallback for profile/settings if modal deep-link is needed
- `/dashboard/security` — route fallback for account/privacy/security actions if modal deep-link is needed

## Modal-First Interaction Model
Primary interaction surfaces should be modal or drawer first, with route fallbacks for deep-linking and accessibility.

Required modal/drawer set:
1. Profile settings modal
- Update name, phone, company, timezone, contact preferences.
- Save -> success toast -> reflected in header/profile summary.

2. Notification center drawer
- Read/unread state.
- CTA routing into order, support, appointment, or download detail.

3. Order detail modal
- Items, payment state, fulfillment timeline, invoice state, delivery status, help CTA.

4. Download detail modal
- Download usage, entitlement limits, latest delivery note, issue-report CTA.

5. Appointment detail modal
- Scheduled/requested time, status, customer note, reschedule request, cancel request.

6. Support thread modal
- Full conversation history, customer-visible status, add message, escalate CTA.

7. Account request modal
- Request data export or account deletion.
- Shows SLA and confirmation state.

## Page-Level UX Requirements

### Overview
- Welcome summary.
- Recent orders.
- Ready downloads.
- Open support items.
- Upcoming or pending appointments.
- Notifications snippet.
- Every summary card links to a detail modal or the owning route.

### Products
- Purchased products grouped by active, delivered, support-required.
- License visibility.
- Quick actions: open downloads, request help, view order.
- Empty state links back to `/digital-products`.

### Downloads
- Each row shows delivery state, usage count, last download, and issue-report CTA.
- Download authorization should show progress and explicit error recovery.
- Delivered-but-expired or missing assets must present a recovery path, not a dead end.

### Orders
- Order cards/table with status badges.
- Order detail modal for invoice/payment/fulfillment timeline.
- Contextual CTA:
  - pending payment -> view invoice/payment instructions
  - delivered -> open downloads
  - issue -> open support thread

### Appointments
- Distinguish requested, confirmed, completed, cancelled.
- Detail modal exposes notes, meeting expectation, reschedule request, cancel request.
- Empty state offers booking CTA.

### Support
- Replace single submit form with support inbox.
- Show open threads, closed threads, latest reply, SLA copy.
- New request composer remains available.
- Customer can attach request to product/order/download context.

### Profile And Security
- Header popover action must open real settings UI.
- Profile flow must support success, validation error, and unsaved-change guard.
- Security/account flow must support sign-out, data request, and account deletion request initiation.

## Visual And Layout Rules
- Customer dashboard should feel closer to a premium account portal than an internal admin console.
- Use content-width containers and section spacing compatible with the public site.
- Avoid trapping the user in `h-screen` layouts that hide footer or page context.
- Keep mobile behavior thumb-friendly with slide-up drawers instead of tiny popovers where needed.

## Accessibility Rules
- All modal/drawer flows require focus trap, escape close, labelled titles, and return focus.
- Route fallbacks required for settings and deep detail access.
- Status colors must not be the only state signal.
- Dashboard navigation must remain fully keyboard reachable.

## Frontend Gaps Identified
- `DashboardHeaderControls` has a dead `Profile settings` action.
- Notifications are fake/static.
- Orders, downloads, and appointments are summary-only with no true end flow.
- Support is submit-only, not a thread or tracked workflow.
- Current shell behavior is too app-like for the user-facing portal.

## Exit Criteria
- Every dashboard page has complete loading, empty, error, and success states.
- Every visible action leads to a real backend-backed flow.
- Public header and footer remain part of the dashboard experience.
- Mobile and desktop dashboard interactions work via modal-first UI with route fallbacks.
