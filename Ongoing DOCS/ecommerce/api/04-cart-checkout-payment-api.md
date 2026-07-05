# Cart Checkout Payment API

Document status: API contract
Owner: Cart, checkout, payments

## Purpose

Define customer-facing cart, checkout, and payment endpoints.

## Cart Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/cart` | Read current guest or user cart. |
| POST | `/api/v1/cart/items` | Add item. |
| PATCH | `/api/v1/cart/items/:id` | Update quantity or options. |
| DELETE | `/api/v1/cart/items/:id` | Remove item. |
| POST | `/api/v1/cart/merge` | Merge guest cart into user cart. |
| POST | `/api/v1/cart/coupons` | Apply coupon. |
| DELETE | `/api/v1/cart/coupons/:code` | Remove coupon. |

## Checkout Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/checkout/validate` | Validate cart, address, inventory, shipping, tax, coupons. |
| POST | `/api/v1/checkout/shipping-rates` | Return shipping methods. |
| POST | `/api/v1/checkout/start` | Create checkout session/reservation. |
| POST | `/api/v1/checkout/confirm` | Confirm checkout after payment/COD state. |

## Payment Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/payments/intent` | Create or update payment intent. |
| POST | `/api/v1/payments/retry` | Retry failed payment when allowed. |
| GET | `/api/v1/payments/:id/status` | Read safe payment status. |
| POST | `/api/v1/webhooks/payments/:provider` | Provider webhook endpoint. |

## Rules

- Cart and checkout totals are server-calculated.
- Checkout and payment mutations use idempotency keys.
- Webhooks are signature-verified and not authenticated by customer sessions.
- Failed payment returns recoverable next actions when possible.

## Acceptance Criteria

- Repeated checkout/payment requests cannot duplicate orders or captures.
- Inventory, coupons, tax, and shipping are revalidated before confirmation.
- Webhook state transitions are safe, logged, and idempotent.
