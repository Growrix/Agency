---
document_type: e2e-plan
plan_scope: Auth security + Account UX + Cart hardening + Dashboard E2E + Checkout polish
plan_version: 1
plan_status: active — execution started
canonical_ai_entrypoint: ai-context.yaml
parent_artifact: DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md
working_copy: C:\Users\User\.claude\plans\there-are-few-happy-comet.md
authoring_branch: ecomerce
last_audit_date: 2026-07-01
phase_sequence:
  - P21-auth-security-and-email
  - P22-account-and-profile-ux
  - P23-cart-hardening
  - P24-dashboard-e2e-and-admin-polish
  - P25-checkout-polish-and-mobile-audit
downstream_role_docs:
  - DOC/PROJECT PLAN/Security/sign-up-gate-security.md
  - DOC/PROJECT PLAN/Backend/sign-up-gate-backend.md
  - DOC/PROJECT PLAN/Frontend/account-and-profile-frontend.md
  - DOC/PROJECT PLAN/API and Data/cart-server-sync-api-data.md
  - DOC/PROJECT PLAN/Frontend/cart-and-checkout-frontend.md
  - DOC/PROJECT PLAN/Admin Dashboard/catalog-form-editor-admin-dashboard.md
  - DOC/PROJECT PLAN/Admin Dashboard/email-log-admin-dashboard.md
---

# Auth Security + Account UX + Cart Hardening + Dashboard E2E

## Why this plan exists

The customer-dashboard-experience-e2e-plan delivered chrome decoupling, auth-gated checkout, submissions backend + UI, profile modal v1, real notifications, downloads/orders/appointments detail flows, and a Clerk-aware sign-out. That plan did not close four problems the operator surfaced after it shipped:

1. **CRITICAL — sign-up gate is missing.** The webhook handler at `web/src/app/api/webhooks/clerk/route.ts` upserts a local user with `role: "subscriber"` on every `user.created` event, and `web/src/server/auth/guards.ts:78-96` independently auto-creates a user from session claims on the first authenticated request. With `CLERK_WEBHOOK_SIGNING_SECRET=""` in `.env.local`, the webhook is even returning 503 (good fail-closed default) — but the guards.ts fallback path means a Clerk session is enough to provision a local subscriber record and reach `/dashboard`. Net effect: anyone with a Google account can land on `/dashboard`.
2. **EMAIL DELIVERY.** Resend logs confirm deliveries are happening — but only to `Inquiry@growrixos.com`. `growrixos@gmail.com` (operator's ops inbox) is not on `CONTACT_TO_EMAIL`. The sender `hello@growrixos.com` may not be a verified Resend domain, and the team-notifications module silently no-ops when env vars are missing — no audit log breadcrumb.
3. **PROFILE / ACCOUNT UX.** The shipped modal only edits name, phone, and marketing opt-in. No password change, profile photo, MFA, active sessions, connected accounts, or account deletion.
4. **CART.** Drawer + multi-item checkout exist. Cart is stuck per-device (localStorage only), no `/cart` page, no inventory check before submit.

## Decisions confirmed with the operator

- **Sign-up gate**: enforce Clerk email-verification on ALL strategies (operator action in Clerk dashboard) AND add a server-side intent gate. Introduce a `signup_completed_at` field on `UserRecord` that is set ONLY by a deliberate `/complete-account` confirmation step. A bare Clerk OAuth session without that flag lands on `/complete-account`, not `/dashboard`.
- **Profile / security UX**: mount Clerk's `<UserProfile />` on `/dashboard/account`. Clerk owns password, photo, MFA, active sessions, connected accounts, account deletion. App-specific fields (phone, marketing opt-in, addresses) stay in our existing form.
- **Email**: verify `growrixos.com` in Resend, append `growrixos@gmail.com` to `CONTACT_TO_EMAIL`, and add an `/admin/email-log` page that surfaces audit entries with action `team_notification.email_*`.
- **Cart**: server-synced for signed-in users; guests stay localStorage-only. Last-wins merge from localStorage when a guest signs in.

## Sequencing and tracker mapping

| Phase | Tracker ID | Scope |
|---|---|---|
| Phase 1 | P21 | Sign-up gate, sign-out UX cross-links, email recipients, Resend domain check, admin email-log |
| Phase 2 | P22 | `/dashboard/account` with Clerk `<UserProfile />`, retire v1 modal fields owned by Clerk |
| Phase 3 | P23 | `cart_items` schema + endpoints, `/cart` page, server-sync hydration with last-wins merge |
| Phase 4 | P24 | Per-page customer-dashboard specs + admin catalog form editor + admin user management |
| Phase 5 | P25 | Checkout step indicator, inline validation, mobile audit, Playwright mobile project |

Each phase commits to `ecomerce` behind the full gate set (web/AGENTS.md zero-gate policy). No merge to `main` until the operator approves.

## Security Containment Continuation Log (2026-07-02)

This artifact now tracks the immediate post-Phase-A containment hardening slice as part of P21 execution continuity.

Completed in this continuation slice:

1. Admin role elevation fallback removed from Clerk sync (`admin` is no longer inferred from matching `ADMIN_EMAIL`; only explicit Clerk metadata role or persisted existing role is used).
2. Public lead intake endpoint no longer defaults to `admin_manual`; defaults to `contact_form` and now enforces authenticated `admin` role for `admin_manual` source.
3. Supabase persistence now fails closed in production when unavailable, unless an explicit operator override is set (`ALLOW_SUPABASE_FILE_FALLBACK=1`). Silent fallback to file store is retained only for non-production by default.

Operator runbook note:

1. Keep `ALLOW_SUPABASE_FILE_FALLBACK` unset in production under normal operation.
2. Only set `ALLOW_SUPABASE_FILE_FALLBACK=1` during controlled incident recovery when Supabase is unavailable and business continuity requires temporary degraded writes.
3. After recovery, remove the override, reconcile file-store deltas back into Supabase, and attach an incident postmortem to the tracker.

Follow-up in next slice:

1. Add targeted tests for `admin_manual` source rejection and production fallback guard behavior.
2. Add startup/operator runbook note for `ALLOW_SUPABASE_FILE_FALLBACK` emergency usage.
3. Continue with account/profile and cart hardening tasks in this same plan.

---

## Phase 1 — Security & Email (P21, BLOCKING)

### S1 — Sign-up gate

**Files to modify**

- `web/src/server/data/schema.ts` — `UserRecord` gains `signup_completed_at?: string` and `signup_intent_source?: "self_signup" | "purchase_intent" | "invited" | "admin_seed"`.
- `web/src/server/auth/clerk-sync.ts` — `upsertUserFromClerk` accepts an optional `signupIntentSource` and an optional `markCompleted` flag; webhook callers do NOT set them. The completion endpoint is the only path that sets `signup_completed_at`.
- `web/src/server/auth/guards.ts` (lines 78–96) — remove the session-claims fallback that auto-creates a local user. If `getUserByClerkId(userId)` returns null AND `syncClerkUser` does not return a record (e.g. operator not configured), return null and let the caller redirect to `/complete-account`. Add `requireCompletedSubscriber(request)` that asserts `signup_completed_at` is set; used by all `/api/v1/me/*` routes.
- `web/src/proxy.ts` — when Clerk session exists AND pathname starts with `/dashboard` (excluding `/dashboard/login`, `/complete-account`) AND the local user record has no `signup_completed_at`, rewrite to `/complete-account`. Server-enforced regardless of client navigation.

**Files to create**

- `web/src/app/complete-account/page.tsx` — server component that loads the viewer record and renders the confirmation form (accept terms, marketing opt-in toggle, optional phone). On submit, POSTs to `/api/v1/me/complete-signup` and redirects to `/dashboard`.
- `web/src/app/complete-account/CompleteAccountForm.tsx` — client form.
- `web/src/app/api/v1/me/complete-signup/route.ts` — `POST { accepted_terms: true, marketing_opt_in: bool, phone?: string }`. Requires Clerk session AND no existing `signup_completed_at`. Sets `signup_completed_at: now` and `signup_intent_source: "self_signup"`. Audit log `auth.signup_completed`.

**Operator (Clerk dashboard) — out of code scope**

- Enable "Email verification required" for all strategies.
- Update webhook endpoint URL and set `CLERK_WEBHOOK_SIGNING_SECRET` (currently empty in `.env.local`).

**Reuse**

- `requireAuthenticatedUser` stays as the "session exists" check. `requireCompletedSubscriber` wraps it with the field check.
- Webhook handler already calls `verifyWebhook(...)` (svix internally) and returns 503 when the secret is unset — no code change needed. Operator action only.

### S2 — Sign-out & auth UX consistency

- Confirm `DashboardSignOutButton` (already shipped) still branches on `isClerkConfiguredClient()` and runs both `clearLegacySession()` and `clerk.signOut({ redirectUrl: "/" })`.
- Confirm `SignInExperience.tsx` exposes a "Need an account? Sign up" footer link (already present at line 31-37); add equivalent "Already have an account? Sign in" link to `SignUpExperience.tsx` if missing.
- Confirm `PublicAuthControls.tsx` `<UserButton afterSignOutUrl="/" />` still points home (regression guard, no behavior change expected).

### E1 — Email recipients

- Operator action: set `CONTACT_TO_EMAIL="Inquiry@growrixos.com,growrixos@gmail.com"` in `.env.local`. Document the comma-separated format in `.env.example` and `web/.env.example`.
- `web/src/server/domain/team-notifications.ts` lines 36-40 — when the no-op condition fires (`!runtime.contact.resendApiKey` or `runtime.contact.toEmails.length === 0` or `!runtime.contact.fromEmail`), `recordAuditLog({ level: "warning", action: "team_notification.email_skipped_missing_config", metadata: { kind, missing: [...] } })`. Silent failure is what hid the recipient gap.

### E2 — Resend domain verification

- Operator action: add `growrixos.com` to Resend with DKIM, SPF, return-path DNS records.
- `web/src/server/config/runtime.ts` — one-shot startup log if `CONTACT_FROM_EMAIL` host is not on a known verified list (`growrixos.com`, `resend.dev`). Read-only check, not blocking.

### E3 — Admin email-log page

- `web/src/app/api/v1/admin/email-log/route.ts` — `GET` returns audit entries where `action` matches `team_notification.email_*` or `*.email_failed`, paginated date desc, with optional `?kind=` and `?status=` filters. `requireAdminUser`.
- `web/src/app/admin/email-log/page.tsx` — server wrapper.
- `web/src/app/admin/email-log/EmailLogClient.tsx` — table view: timestamp, kind, subject, recipients, status, error message. Filters.

**Reuse**

- `recordAuditLog` already emits the needed actions across senders (commit `c4d54d0`).
- Admin sidebar nav gains an "Email log" entry.

---

## Phase 2 — Account & Profile (P22)

### P1 — Clerk UserProfile mount

- `web/src/app/dashboard/account/page.tsx` — server wrapper.
- `web/src/app/dashboard/account/AccountSurface.tsx` — client. Mounts `<UserProfile />` with our `appearance` prop matching `clerkAuthAppearance` from `SignInExperience.tsx`. Wraps in our `Card` primitive.
- `web/src/components/dashboard/AccountAddressesCard.tsx` — app-specific address block (shipping + billing). Phase 2 structural only.
- `web/src/components/dashboard/DashboardChrome.tsx` — add `{ href: "/dashboard/account", label: "Account" }` to nav.
- `web/src/components/dashboard/DashboardHeaderControls.tsx` — change "Profile settings" menu item to link to `/dashboard/account` rather than open the modal.

### P2 — Retire v1 modal fields owned by Clerk

- `web/src/components/dashboard/ProfileSettingsModal.tsx` — repurpose as `AppPreferencesModal`: drop email read-only block and name fields (Clerk owns), keep phone + marketing opt-in. Surface from `/dashboard/account`.
- `web/src/server/auth/users.ts` `updateUserProfile` — stop accepting `firstName`/`lastName` (Clerk webhook syncs them).
- `web/src/app/api/v1/me/update/route.ts` — accept only phone + marketing_opt_in.

---

## Phase 3 — Cart hardening (P23)

### C1 — Cart data layer

`web/supabase/schema.sql` + `web/src/server/data/schema.ts`:

```sql
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  product_slug text not null,
  product_variant_slug text,
  product_tier_name text,
  fulfillment_type text,
  quantity int not null check (quantity > 0),
  unit_price_cents int not null,
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, product_slug, coalesce(product_variant_slug, ''), coalesce(product_tier_name, ''))
);
create index if not exists cart_items_user_idx on public.cart_items (user_id, updated_at desc);
```

RLS joined into existing service-role-only block. `CartItemRecord` TS type added. `DatabaseSchema.cart_items: CartItemRecord[]` + default + store.ts clone.

### C2 — Cart domain + endpoints

- `web/src/server/domain/cart.ts` — `getCartForUser`, `addCartItem`, `updateCartQuantity`, `removeCartItem`, `clearCart`, `mergeLocalIntoServer(userId, localItems)` (last-wins per key).
- `web/src/app/api/v1/me/cart/route.ts` — `GET` items + subtotal; `PUT { items }` replaces (sign-in merge).
- `web/src/app/api/v1/me/cart/items/route.ts` — `POST { item }` add; `DELETE ?productSlug=&variantSlug=&tierName=` remove.
- `web/src/app/api/v1/me/cart/items/quantity/route.ts` — `PATCH { productSlug, variantSlug?, tierName?, quantity }`.

All guarded by `requireCompletedSubscriber`.

### C3 — Client integration + /cart page

- `web/src/lib/cart-store.ts` — `rehydrateCartStore` fetches `/api/v1/me/cart` when Clerk session exists, merges with localStorage items (last-wins), PUTs merged set back, replaces in-memory store. Mutations call store AND endpoint (optimistic update with rollback on 4xx).
- `web/src/app/cart/page.tsx` + `web/src/app/cart/CartPage.tsx` — full-page cart. Mirrors drawer with larger rows, Continue shopping + Proceed to checkout CTAs.
- `web/src/components/shop/CartInventoryNotice.tsx` — passive notice for unavailable items.

---

## Phase 4 — Dashboard E2E specs + admin polish (P24)

### D1 — Per-page specs (DOCS ONLY)

For each of `/dashboard`, `/dashboard/products`, `/dashboard/downloads`, `/dashboard/orders`, `/dashboard/orders/[id]`, `/dashboard/appointments`, `/dashboard/submissions`, `/dashboard/submissions/[type]/[id]`, `/dashboard/support`, `/dashboard/account`, write a one-page spec in `DOC/PROJECT PLAN/Frontend/customer-dashboard/<page>.md`:

- Purpose + audience, states (loading/empty/populated/error), data sources, mutations, mobile breakpoints + tap targets, accessibility checklist, E2E test path.

Same template under `DOC/PROJECT PLAN/Admin Dashboard/admin-dashboard/<page>.md` for `/admin`, `/admin/activity`, `/admin/catalog`, `/admin/pipeline`, `/admin/submissions`, `/admin/email-log`, `/admin/users`.

### D2 — Admin catalog form editor

Replace JSON textareas in `web/src/app/admin/AdminDashboard.tsx` (~512/545/578) with structured forms:

- `web/src/components/admin/CatalogServiceForm.tsx`
- `web/src/components/admin/CatalogProductForm.tsx`
- `web/src/components/admin/CatalogPortfolioForm.tsx`

Existing `POST /api/v1/admin/services|products|portfolio` already accept the full record; no API change.

### D3 — Admin user management

- `web/src/app/api/v1/admin/users/route.ts` — `GET` list with search + role filter, paginated.
- `web/src/app/api/v1/admin/users/[userId]/route.ts` — `GET` detail; `PATCH { role?, signup_completed_at? }` to grant/revoke (with audit log).
- `web/src/app/admin/users/page.tsx` + `[userId]/page.tsx` — list with role badge, completion state, last activity; detail with role toggle and "Revoke admission" action that nulls `signup_completed_at`.

### D4 — Order workflow polish

- Wire `PATCH /api/v1/admin/orders/[orderId]` into a structured form on `/admin/submissions/order/[id]` (status transitions, delivery URL input, internal notes, audit trail).

---

## Phase 5 — Checkout polish + mobile audit (P25)

### Q1 — Checkout polish

- `web/src/app/checkout/CheckoutExperience.tsx` — step indicator (Cart → Sign-in → Review → Payment). Inline validation with `aria-live`. Disable submit until valid.
- Surface estimated taxes/discounts if applicable.

### Q2 — Mobile audit

- Playwright mobile project for `/dashboard`, `/dashboard/account`, `/checkout`, `/cart`.
- Safe-area insets + bottom-nav clearance verification per web/AGENTS.md mobile rules.
- Per-route axe scan.

---

## Verification

After each phase, run the full gate sequence per web/AGENTS.md:

```
npm run lint
npm run typecheck
npm run perf:budgets
npm run test
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= CLERK_SECRET_KEY= CLERK_WEBHOOK_SIGNING_SECRET= npm run build
npm run test:e2e -- tests/e2e/release-gates.spec.ts --project=desktop-chrome
```

Phase-1 functional checks:

- Sign in with a brand-new Google account → land on `/complete-account`, NOT `/dashboard`. `/api/v1/me/orders` returns 403.
- Complete the form → `signup_completed_at` populated, `/dashboard` accessible, audit entry `auth.signup_completed`.
- Submit `/contact` → both `Inquiry@growrixos.com` AND `growrixos@gmail.com` receive the email. Audit log shows `delivered: true`.
- Rotate Resend key to invalid → `team_notification.email_failed` appears in `/admin/email-log`.
- Unset `CONTACT_TO_EMAIL` → `team_notification.email_skipped_missing_config` appears in `/admin/email-log`.

## Cross-cutting requirements

- Local-only commits on `ecomerce`, no push, no merge until operator approves.
- Each workstream lands as a discrete commit. Zero-gate policy applies to every commit.
- Reuse `Card`, `Button`, `LinkButton`, `Badge`, `Dialog` primitives. No new visual tokens.
- The working copy at `C:\Users\User\.claude\plans\there-are-few-happy-comet.md` stays in sync with this canonical artifact during execution.
