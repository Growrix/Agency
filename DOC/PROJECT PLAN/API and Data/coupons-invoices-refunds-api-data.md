---
document_type: role-plan
role: API and Data
parent_artifact: DOC/PROJECT PLAN/ecommerce-launch-e2e-plan.md
status: active — E1a coupons shipped
last_audit_date: 2026-07-03
---

# Coupons + Invoices + Refunds — API and Data Plan

Covers E1a (coupons — shipped), E1b (invoices — next), E1c (refunds — after).

## E1a — Coupons (shipped)

### Data model

`public.coupons` (added to `web/supabase/schema.sql`):

```sql
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  description text,
  discount_type text not null check (discount_type in ('percent')),
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
create unique index if not exists coupons_code_uniq on public.coupons (upper(code));
```

RLS: joined into the existing service-role-only block. Anon + authenticated roles are blocked;
all reads/writes go through the API handlers below.

TS types added to `web/src/server/data/schema.ts`:

- `CouponRecord` — canonical shape
- `CouponDiscountType = "percent"` — future-proofed enum
- `OrderRecord.applied_coupon_code?: string`
- `OrderRecord.applied_discount_cents?: number`
- `OrderRecord.invoice_url?: string` (reserved for E1b)
- `DatabaseSchema.coupons: CouponRecord[]`

### Domain module

`web/src/server/domain/coupons.ts` exposes:

| Function | Behavior |
|---|---|
| `listCoupons()` | Sorted by updated_at desc |
| `getCouponById(id)` / `getCouponByCode(code)` | Direct lookup (code is case-insensitive) |
| `createCoupon(input)` | Uppercases the code, enforces uniqueness, defaults `active=true`, rejects percent outside 1..100 |
| `updateCoupon(id, patch)` | Patches allowed fields; code + discount_type + times_used are immutable |
| `deactivateCoupon(id, actorEmail)` | Sets `active=false` + emits `admin.coupon_deactivated` audit entry |
| `validateCouponForCheckout({ code, subtotal_cents, user_email })` | Returns `{ valid: true, discount_cents, coupon }` or `{ valid: false, reason, message }` |
| `applyCouponToOrder(code, orderId, actorEmail)` | Increments `times_used` atomically inside the writeDatabase queue and emits `checkout.coupon_applied` audit entry |

Validation rules (`validateCouponForCheckout`):

1. `not_found` — code doesn't match any coupon
2. `inactive` — `active === false`
3. `expired` — `expires_at` is in the past
4. `max_uses` — `times_used >= max_uses`
5. `min_subtotal` — `subtotal_cents < min_subtotal_cents`
6. `per_user_limit` — user's completed orders with this coupon reach the limit

### Endpoints

| Method | Path | Auth | Rate limit | Body / Query |
|---|---|---|---|---|
| POST | `/api/v1/coupons/validate` | public | `abuseProtection.couponValidateLimitPerMinute` (default 20/min per IP) | `{ code, subtotal_cents, user_email? }` |
| GET | `/api/v1/admin/coupons` | admin | — | `?active=true|false&q=<query>` |
| POST | `/api/v1/admin/coupons` | admin | — | `{ code, description?, discount_type: "percent", discount_value (1-100), min_subtotal_cents?, max_uses?, per_user_limit?, expires_at?, active? }` |
| GET | `/api/v1/admin/coupons/[couponId]` | admin | — | — |
| PATCH | `/api/v1/admin/coupons/[couponId]` | admin | — | Partial of create body minus `code`/`discount_type` |
| DELETE | `/api/v1/admin/coupons/[couponId]` | admin | — | Soft-delete via `active=false` |

New runtime config: `abuseProtection.couponValidateLimitPerMinute` (env `RATE_LIMIT_COUPON_VALIDATE_PER_MINUTE`, default 20).

### Order-creation contract change

`POST /api/v1/orders` accepts an optional `applied_coupon_code` string in the body. When present,
`createOrder` re-validates it server-side against the trusted subtotal and rejects the order
with a 400 if invalid. On success:

- `orders.applied_coupon_code` and `orders.applied_discount_cents` are persisted
- `orders.discount_cents` and `orders.total_cents` reflect the discount
- `coupons.times_used` is incremented atomically after the order write (best-effort; failures
  are logged as `checkout.coupon_apply_failed` but don't roll back the order)

### Stripe checkout integration

When a coupon is applied and Stripe is configured, a one-time `stripe.coupons.create` call runs
during session creation with `amount_off: appliedDiscountCents`, `duration: "once"`. The
resulting coupon id is passed as `discounts: [{ coupon: <id> }]` on the checkout session so the
customer sees the discount natively on Stripe's page. If Stripe coupon creation fails, we log
`checkout.stripe_coupon_create_failed` and proceed WITHOUT the Stripe-side discount — the order
in our DB still reflects the discount for accounting, but the customer would pay the full
amount. Reconciliation is manual in that edge case (audit log surfaces it).

## Audit log surface

| Action | Level | When |
|---|---|---|
| `admin.coupon_created` | info | Admin creates a coupon |
| `admin.coupon_updated` | info | Admin patches a coupon |
| `admin.coupon_deactivated` | info | Admin soft-deletes a coupon |
| `checkout.coupon_applied` | info | `applyCouponToOrder` succeeds |
| `checkout.coupon_apply_failed` | error | `applyCouponToOrder` throws (order still committed) |
| `checkout.stripe_coupon_create_failed` | warning | Stripe coupon creation failed; customer sees no discount on Stripe page |

## Test coverage

- Unit (deferred to E1a follow-up): validation cases (not_found, inactive, expired, max_uses, min_subtotal, per_user_limit, happy path)
- Integration (deferred): full checkout flow with coupon applied — asserts `orders.applied_coupon_code`, `orders.discount_cents`, `coupons.times_used` incremented
- Manual smoke (operator): create coupon `WELCOME10` at 10%, apply on `/cart`, place order, confirm discount reflected on Stripe checkout page

## Follow-up (deferred to E1b, E1c)

- **E1b** — Invoices: `@react-pdf/renderer` server-side generation on `markOrderPaid`, stored in Supabase Storage `invoices/`, linked via `orders.invoice_url` and surfaced on `/dashboard/orders/[id]`.
- **E1c** — Refunds: Admin action on order detail → Stripe refunds API → sets `orders.refunded_at`, updates `payment_status` to `refunded`, emits audit + customer email.

## Operator follow-ups (E1a)

1. Run the Supabase migration for the new `coupons` table before deploy (`npm --prefix web run db:migrate`).
2. Seed a couple of promo coupons via `/admin/coupons` (e.g. `WELCOME10` at 10%, `LAUNCH25` at 25% with a 500-use cap and 30-day expiry).
3. Verify Stripe test-mode account has permission to create dynamic coupons (default enabled on all accounts).
