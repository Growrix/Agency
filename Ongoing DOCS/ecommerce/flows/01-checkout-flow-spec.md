# Checkout Flow Specification

Document status: active flow specification
Owner: Product, frontend, backend, QA

## Purpose

Define the complete checkout journey so AI agents and engineers build the same end-to-end behavior every time.

## Scope

This specification covers cart entry, guest checkout, authenticated checkout, checkout draft persistence, validation, pricing, coupons, inventory reservation, payment/manual order paths, success/failure states, notifications, customer visibility, admin visibility, and required tests.

## Source Documents

- `handbook/06-shipping-tax-coupons-inventory-returns.md`
- `handbook/07-payment-workflow-and-risk-policy.md`
- `architecture/03-data-and-request-flows.md`
- `frontend/05-cart-checkout-order-success.md`
- `backend/05-cart-checkout-service.md`
- `api/04-cart-checkout-payment-api.md`
- `state-machines/01-order-payment-fulfillment-states.md`
- `testing/04-e2e-scenario-matrix.md`

## Actors

- Guest buyer.
- Authenticated customer.
- Payment provider.
- Inventory service.
- Notification service.
- Admin or support operator.

## Route And Screen Map

| Route/screen | Purpose | Required states |
| --- | --- | --- |
| `/cart` or cart drawer | Review cart, edit quantity, remove items, apply coupon entry point | empty, loading, valid, invalid item, price changed, out of stock |
| `/checkout` | Capture contact, fulfillment, billing, coupon, notes, and order review | guest, signed in, redirected return, draft restored, validation error, submitting |
| `/checkout/success` or `/success` | Confirm order placement/payment outcome | order placed, payment confirmed, manual follow-up, pending payment |
| `/checkout/failed` | Recover from payment or validation failure | retry available, cart restored, payment pending, support contact |
| `/dashboard/orders/:id` | Customer post-purchase order detail | ownership allowed, not found/forbidden, invoice/return visible when eligible |
| `/admin/orders/:id` | Operator order management | permission allowed, status actions, notes, invoice, refund/fulfillment actions |

## Required Checkout Data

Cart:
- `cartId`, `items[]`, `currency`, `subtotal`, `discountTotal`, `taxTotal`, `shippingTotal`, `grandTotal`, `warnings[]`.

Buyer:
- `email`, `name`, `phone`, `userId` when authenticated, `guestToken` when guest.

Fulfillment:
- Physical: shipping address, shipping method, delivery estimate.
- Digital: entitlement email and download policy.
- Service: project/contact details and manual follow-up policy.

Commercial adjustments:
- Coupon code, gift card, store credit, manual campaign attribution.

Order review:
- Immutable line item snapshot, final totals, consent/terms confirmation, idempotency key.

## Happy Path: Guest Manual Order Or COD

1. Guest adds product to cart.
2. Cart API validates product, variant, quantity, price, coupon, and inventory preview.
3. Guest opens checkout.
4. Checkout restores draft if one exists for the same checkout context.
5. Guest enters contact and required fulfillment details.
6. Checkout validates address, shipping/tax where applicable, coupon, inventory, and order eligibility.
7. System creates or refreshes inventory reservation for inventory-managed items.
8. Guest reviews final server-calculated totals.
9. Guest clicks `Place order`.
10. API receives idempotency key and confirms checkout.
11. Order is created with immutable line snapshots.
12. Non-online-payment/manual order creates invoice or follow-up payment state when configured.
13. Cart is cleared only after order creation succeeds.
14. Notification event is emitted for customer and team.
15. Success page shows order number, summary, next steps, support contact, and account creation/sign-in prompt.
16. Admin order queue shows the new order.

## Happy Path: Authenticated Online Payment

1. Customer signs in before or during checkout.
2. Guest cart merges into customer cart with deterministic merge rules.
3. Saved addresses may prefill, but customer can edit for this order.
4. Checkout validates cart, customer ownership, address, shipping, tax, coupons, inventory, and payment method.
5. Payment intent/session is created using the server-calculated amount and idempotency key.
6. Customer completes payment.
7. Webhook verifies provider signature and event idempotency.
8. Payment transaction is recorded.
9. Order transitions to paid or pending review according to risk rules.
10. Fulfillment release occurs only when payment/fraud policy allows it.
11. Invoice and confirmation notifications are generated.
12. Customer order detail shows payment, invoice, fulfillment, and support state.

## Required Branches And Recovery Paths

| Branch | Required behavior |
| --- | --- |
| Empty cart | Disable checkout and show recovery links to products/categories. |
| Unauthenticated protected checkout | Preserve cart and full checkout query/draft state through sign-in/sign-up return. |
| Price changed | Block final confirmation, show old vs new price if available, require customer review. |
| Item out of stock | Block checkout for affected item, allow remove/change quantity, preserve other items. |
| Reservation expired | Revalidate inventory and totals, then recreate reservation or block with explanation. |
| Invalid coupon | Keep checkout open, remove coupon effect, show field-level error. |
| Shipping unavailable | Block physical checkout until address/method changes. |
| Tax provider unavailable | Apply configured fallback or block with explicit retry/support message. |
| Payment declined | Preserve cart/order attempt context, show retry and alternative payment methods. |
| Payment pending | Show pending page/state; do not duplicate order on refresh. |
| Duplicate submit | Idempotency returns existing checkout/order result, never duplicates order/payment. |
| Customer closes browser | Draft and cart persist; reservations expire safely. |
| Notification failure | Order remains valid; notification retries/dead-letter queue records failure. |

## Screen Behavior Requirements

Cart:
- Quantity changes must call server validation before trusting totals.
- Product title, variant, price, discount, stock warning, remove action, and line subtotal are visible.
- Checkout CTA is disabled when blocking cart errors exist.

Checkout:
- Required fields are labeled and have field-level errors.
- Server errors appear near the affected step and as a summary when needed.
- Draft autosave must not store secrets or full payment details.
- Final review must show server totals and policies before order submission.

Success:
- Must not appear unless an order exists or a trusted pending state exists.
- Must show order number, email used, next step, support route, and dashboard link when authenticated.

Failed/pending:
- Must preserve recovery path and avoid duplicate order creation.

## Backend Invariants

- Server is the source of truth for totals, inventory, coupons, tax, shipping, order creation, and payment state.
- Checkout confirmation requires idempotency key.
- Order creation writes immutable product, price, tax, discount, shipping, and address snapshots.
- Inventory reservation and release are tied to checkout/order lifecycle.
- Cart clears only after successful order creation.
- Audit events record admin overrides and sensitive state changes.

## Analytics Events

- `cart.viewed`
- `cart.item_updated`
- `checkout.started`
- `checkout.draft_saved`
- `checkout.validation_failed`
- `checkout.submitted`
- `payment.attempted`
- `payment.failed`
- `order.created`
- `order.completed`
- `notification.order_created.sent`

## Acceptance Criteria

- Guest and authenticated checkout both complete end to end.
- Failed validation paths are recoverable without losing cart or draft data.
- Duplicate submits, refreshes, and webhook retries never duplicate orders/payments.
- Admin and customer order views reflect the same order state after checkout.
- E2E tests cover happy paths, failure paths, auth redirect return, and admin visibility.
