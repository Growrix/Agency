---
document_type: e2e-plan
plan_scope: E-commerce launch (digital-goods-only, percent-discount coupons)
plan_version: 1
plan_status: active — E1a in progress
canonical_ai_entrypoint: ai-context.yaml
parent_artifact: DOC/PROJECT PLAN/auth-account-cart-dashboard-e2e-plan.md
authoring_branch: ecomerce
last_audit_date: 2026-07-02
phase_sequence:
  - E1a-coupons
  - E1b-invoices
  - E1c-refunds
  - E2-customer-surfaces-polish
  - E3-admin-operations
  - E4-content-and-trust
  - E5-infra-hardening-launch-gates
downstream_role_docs:
  - DOC/PROJECT PLAN/API and Data/coupons-invoices-refunds-api-data.md
  - DOC/PROJECT PLAN/Backend/coupons-invoices-refunds-backend.md
  - DOC/PROJECT PLAN/Frontend/coupons-checkout-frontend.md
  - DOC/PROJECT PLAN/Admin Dashboard/coupons-admin-dashboard.md
  - DOC/PROJECT PLAN/QA/coupons-invoices-refunds-qa.md
---

# E-commerce Launch — E2E Plan

## Context

The operator asked to move Growrixos from "advanced feature set" to "live-ready e-commerce". Prior phases already delivered auth (sign-up gate), account UX (Clerk UserProfile), server-synced cart, admin panel (users/catalog/submissions/email-log), checkout polish, mobile audit, and a full cart→checkout→payment→confirmation journey. The remaining gaps for a launch-ready storefront are:

- **Coupons that actually work** (WELCOME10 is UI-only today — no persistence, no admin, no per-user cap, no expiry)
- **Invoices** (PDF, delivered on payment, retained in customer dashboard)
- **Refund workflow** (Stripe refund API + audit + email)
- **Customer address book + payment history + wishlist**
- **Admin coupons CRUD + reports** (revenue, orders, best-sellers, conversion funnel)
- **Reviews on product pages**
- **Legal pages** (refund policy, purchase-specific terms)
- **Background jobs + Sanity SSG resilience** for launch stability

**Constraints confirmed with operator (2026-07-02):**

- **Digital-goods only.** No physical shipping. No stock tracking. No warehouse. Inventory is infinite; fulfillment is a signed URL or a service delivery.
- **Percent discounts only.** No fixed-amount or free-shipping coupons for this launch.

Those constraints trim the reference plan considerably — G1 (inventory), G5 (shipping zones/rates), G15 (shipping fulfillment) all drop.

## Sequencing

| Phase | Scope | Blocking launch? |
|---|---|---|
| E1a | Coupons: schema + domain + endpoints + admin UI + checkout/cart wiring | Yes |
| E1b | Invoices: PDF generation + Supabase Storage + dashboard link + email | Yes (legal/accounting) |
| E1c | Refunds: Stripe refund API + admin action + audit + customer email | Yes (support) |
| E2 | Customer surfaces: saved addresses, payment history, wishlist | Nice-to-have |
| E3 | Admin operations: reports (revenue/orders/conversion/best-sellers), order fulfillment polish | Ops-critical |
| E4 | Content + trust: reviews module + legal pages (refund/terms) audit | Yes (Stripe requires) |
| E5 | Infra hardening: background jobs (Vercel cron), Sanity SSG resilience, launch gates | Yes |

Each phase commits to `ecomerce` behind the full zero-gate sequence (per `web/AGENTS.md`). No push, no merge, until the operator approves.

---

## E1a — Coupons (this slice)

### Schema

`coupons` table (added to `web/supabase/schema.sql` + `web/src/server/data/schema.ts`):

```sql
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null check (discount_type in ('percent')),  -- future-proofed enum
  discount_value integer not null check (discount_value > 0 and discount_value <= 100),
  min_subtotal_cents integer,
  max_uses integer,
  times_used integer not null default 0,
  per_user_limit integer,
  expires_at timestamptz,
  active boolean not null default true,
  created_by_user_id uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists coupons_code_idx on public.coupons (upper(code));
create index if not exists coupons_active_idx on public.coupons (active, expires_at);
drop trigger if exists coupons_set_updated_at on public.coupons;
create trigger coupons_set_updated_at
before update on public.coupons
for each row execute function public.set_updated_at();
```

RLS joined into the existing service-role-only block. Admin API handlers enforce role, customer validate endpoint reads only.

`CouponRecord` TS type + `DatabaseSchema.coupons` + `DEFAULT_DATABASE.coupons: []` + store clone.

Also add to `OrderRecord`:
- `applied_coupon_code?: string`
- `applied_discount_cents?: number` (already have `discount_cents`; this new field distinguishes coupon-driven discount from other sources)

### Domain module (`web/src/server/domain/coupons.ts`)

- `listCoupons()` / `getCouponById(id)` / `getCouponByCode(code)`
- `createCoupon(input)` / `updateCoupon(id, patch)` / `deactivateCoupon(id)`
- `validateCouponForCheckout({ code, subtotal_cents, user_email })` → returns `{ valid: true, discount_cents, coupon: CouponSnapshot }` or `{ valid: false, reason: "expired" | "inactive" | "min_subtotal" | "max_uses" | "per_user_limit" | "not_found" }`
- `applyCouponToOrder(couponCode, orderId)` — atomic increment of `times_used`, called by the order-creation flow

### Endpoints

| Method | Path | Auth | Behavior |
|---|---|---|---|
| POST | `/api/v1/coupons/validate` | public + rate-limited | Validates code against subtotal/user, returns discount snapshot |
| GET | `/api/v1/admin/coupons` | admin | List coupons with filters (active/expired/code query) |
| POST | `/api/v1/admin/coupons` | admin | Create coupon; server enforces uppercase code + unique |
| GET | `/api/v1/admin/coupons/[couponId]` | admin | Detail |
| PATCH | `/api/v1/admin/coupons/[couponId]` | admin | Update (all fields except code, times_used, created_at) |
| DELETE | `/api/v1/admin/coupons/[couponId]` | admin | Soft-delete via `active=false` |

### Admin UI

- `/admin/coupons` list page with search + active/expired filter
- Create/edit modal with fields: code, description, discount_type (percent — locked), discount_value (1-100), min_subtotal_cents (dollars → cents on submit), max_uses, per_user_limit, expires_at, active
- Column showing usage: `times_used / max_uses`
- Nav entry `Coupons` in AdminDashboard sidebar

### Checkout + cart wiring

- `DiscountCodeField.tsx` — replace the client-side WELCOME10 check with a real fetch to `POST /api/v1/coupons/validate`. Show inline error message on invalid codes (with the reason mapped to friendly text).
- `CheckoutExperience.tsx` — remove the local `computeDiscountCents` helper. Coupon state now holds the validated snapshot `{ code, discount_cents }`. Summary uses `discount_cents` from state.
- `CartPage.tsx` — expose the same `DiscountCodeField` in the right column above the order summary (so users can preview savings before checkout).
- `OrderSummary` and `CartOrderSummary` receive the `discount_cents` (unchanged prop shape).

### Order creation

- `POST /api/v1/orders` — on order creation, if `applied_coupon_code` is in the payload:
  1. Re-validate the coupon server-side (subtotal, expiry, max_uses, per_user_limit)
  2. If valid: set `orders.applied_coupon_code` and `orders.discount_cents`, then atomically increment `coupons.times_used`
  3. If invalid: return 400 with the reason so the client can update the UI
- Stripe checkout session is created with the discounted `total_cents`

### Rate limiting

`/api/v1/coupons/validate` gets a per-IP rate limit (`RATE_LIMIT_COUPON_VALIDATE_PER_MINUTE`, default 20) — configured in `runtime.ts`. Prevents brute-force code discovery.

### Test surface

- Unit: `web/tests/unit/coupons.test.ts` — validation cases (expired, exhausted, per-user-limit, min-subtotal, disabled, unknown code, happy path)
- Integration: `web/tests/integration/coupons.test.ts` — POST validate + POST admin create + PATCH update + full checkout flow with a coupon applied
- E2E (deferred to E5): full cart → coupon → checkout flow

---

## E1b — Invoices (next slice)

- `@react-pdf/renderer` server-side generation on `markOrderPaid`
- Store PDF in Supabase Storage bucket `invoices/`
- `OrderRecord.invoice_url` field
- "Download invoice" link on `/dashboard/orders/[id]`
- Receipt email links to the same URL

## E1c — Refunds (next slice)

- Admin refund action on `/admin/submissions/order/[id]` (button visible when `payment_status === 'succeeded'` AND `refunded_at` is null)
- New endpoint `POST /api/v1/admin/orders/[orderId]/refund` calls Stripe refund API using stored `stripe_payment_intent_id`
- Sets `refunded_at` + updates `payment_status` to `refunded`
- Audit log `admin.order_refunded` (metadata: refund amount, admin actor)
- Customer email via `notifyTeam` fan-out

---

## E2 — Customer surfaces polish

- `addresses` table (user_id, label, address fields) + `/dashboard/account` address book
- `/dashboard/payments` — read from `orders` + Stripe charge references
- `wishlists` table + `/dashboard/wishlist` + "Save for later" on `/cart`

## E3 — Admin operations

- `/admin/coupons` (from E1a) — nothing more needed there
- `/admin/reports` — revenue by day/week/month, top products, refund rate, conversion funnel from `analytics_events`
- Order fulfillment polish: since digital-only, keep the current `payment_status × fulfillment_status` grid; add "delivered_via" text field for signed-URL tracking

## E4 — Content + trust

- `reviews` table (user_id, product_slug, rating 1-5, body, moderation_status)
- Inline on product detail; admin moderation queue under `/admin/submissions/review/[id]`
- Aggregate rating shown on product cards
- Legal page audit: privacy, terms, refund policy specific to Growrix purchases

## E5 — Infra hardening + launch gates

- Vercel cron for Resend email retry queue + invoice generation retry
- Sanity SSG resilience — bump timeout + ISR + revalidateTag
- Rate limits on `/api/v1/coupons/validate`, `/api/v1/reviews`
- Full `web/scripts/verify-ci-parity.ps1` green
- robots.txt + sitemap freshness audit
- Cookie banner if EU traffic

---

## Verification per phase

After each phase:

```
npm run lint
npm run typecheck
npm run perf:budgets
npm run test
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= CLERK_SECRET_KEY= CLERK_WEBHOOK_SIGNING_SECRET= npm run build
npm run test:e2e -- tests/e2e/release-gates.spec.ts --project=desktop-chrome
npm run test:e2e -- tests/e2e/mobile-smoke.spec.ts --project=mobile-chrome
```

Zero-gate policy. No push, no merge — local commits only, per strict-executor discipline.

## Reuse from prior phases (do NOT re-implement)

- `getPublicShopProduct` / catalog domain
- `CheckoutOrderSummary`, `CartOrderSummary`, `DiscountCodeField`, `CheckoutUpsellsCard`
- `recordAuditLog`, `notifyTeam` (email + Lark fan-out)
- `requireAdminUser` / `requireCompletedSubscriber`
- `useCartStore`, `getCheckoutHref`
- `formatCentsAsUsd`, `parsePriceStringToCents`
- Supabase persistence layer with production fail-closed (added in the recent security continuation slice)

## Operator follow-ups (E1a)

- Run the Supabase schema migration for the `coupons` table before deploy (`npm --prefix web run db:migrate`).
- Seed a couple of promo coupons (e.g. `WELCOME10` at 10%, `LAUNCH25` at 25% with a 500-use cap and 30-day expiry) via `/admin/coupons` on first admin login.
