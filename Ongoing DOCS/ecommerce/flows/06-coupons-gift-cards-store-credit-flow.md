# Coupons Gift Cards Store Credit Flow

Document status: active flow specification
Owner: Growth, finance, operations, backend, QA

## Purpose

Define promotional value workflows so discounts, gift cards, store credit, rewards, and abuse controls are implemented safely.

## Scope

This specification covers coupon creation, eligibility, stacking, redemption, gift cards, store credit ledger, rewards, checkout application, admin controls, audit logs, and customer visibility.

## Value Types

| Type | Source of value | Required ledger/audit |
| --- | --- | --- |
| Coupon | Campaign/admin rule | Coupon redemption record. |
| Gift card | Purchased/admin issued value | Gift card ledger and balance. |
| Store credit | Refund/service adjustment | Store credit ledger. |
| Reward points | Loyalty earning/redemption | Rewards ledger. |
| Manual adjustment | Admin support action | Audit log and reason. |

## Customer Checkout Flow
1. Customer enters coupon/gift-card/store-credit code.
2. API validates code, ownership, date, usage limits, product/category/customer eligibility, cart minimum, currency, and stacking policy.
3. Server recalculates totals.
4. UI shows applied adjustment and removable state.
5. Final checkout revalidates all adjustments.
6. Order creation writes redemption/ledger records.

## Admin Coupon Flow
1. Admin opens promotions screen.
2. API checks permission.
3. Admin creates coupon with type, value, eligibility, date window, usage limits, stacking policy, and status.
4. Server validates code uniqueness and policy conflicts.
5. Coupon saves as draft/active and writes audit log.
6. Reporting tracks redemption count, discount total, revenue, and abuse flags.

## Store Credit Flow
- Store credit is ledger-based, never overwritten as a single mutable balance without history.
- Credit issuance requires reason and actor when admin-created.
- Credit redemption is reserved during checkout and finalized on order creation.
- Failed checkout releases reserved credit.
- Refund-to-credit creates a new ledger credit event.

## Gift Card Flow
- Gift card code is stored hashed.
- Gift card balance changes require ledger records.
- Gift card redemption must not expose full code after initial display/delivery.
- Expiration and jurisdiction rules must be configured before production use.

## Failure And Abuse Cases

| Case | Required behavior |
| --- | --- |
| Expired coupon | Field-level error, no discount. |
| Usage limit reached | Field-level error, no discount. |
| Stacking conflict | Explain which adjustment cannot combine. |
| Discount exceeds total | Cap at allowed total; never negative order total. |
| Gift card balance too low | Apply partial balance if policy allows or reject. |
| Reused gift card code abuse | Rate limit and log attempts. |
| Store credit race | Reservation/idempotency prevents double spend. |

## Tests
- Valid coupon applies and finalizes redemption.
- Expired/limit/customer-ineligible coupon rejects.
- Stacking policy is enforced.
- Gift card partial/full redemption works.
- Store credit reservation releases on failed checkout.
- Admin manual credit requires permission, reason, and audit log.

## Acceptance Criteria

- All promotional value is deterministic, auditable, and safe from double spend.
- Checkout totals remain server-calculated and never negative.
- Admin and finance can reconcile discounts, gift cards, credits, and rewards.
