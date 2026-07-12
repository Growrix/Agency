# Detailed Request Response Contracts

Document status: active API implementation contract
Owner: API, backend, frontend, QA

## Purpose

Define detailed request/response shapes and error behavior for ecommerce flows that often break when AI builds from high-level endpoint lists only.

## Scope

This file adds implementation-level examples for cart, checkout, payment, orders, customer order detail, admin order actions, invoices, refunds, and webhooks.

## General API Response Shape
```json
{
  "data": {},
  "meta": {
    "requestId": "req_123",
    "idempotencyKey": "idem_123"
  },
  "error": null
}
```

Error shape:
```json
{
  "data": null,
  "meta": {
    "requestId": "req_123"
  },
  "error": {
    "code": "CHECKOUT_VALIDATION_FAILED",
    "message": "Some checkout details need attention.",
    "fields": {
      "shipping.postalCode": "Postal code is required."
    },
    "recoverable": true
  }
}
```

## Common Error Codes
| Code | HTTP | Meaning | Recoverable |
| --- | --- | --- | --- |
| `UNAUTHENTICATED` | 401 | Login/session required | yes |
| `FORBIDDEN` | 403 | User lacks permission/ownership | no |
| `NOT_FOUND` | 404 | Resource absent or safely hidden | no |
| `VALIDATION_FAILED` | 400 | Request shape invalid | yes |
| `CART_EMPTY` | 409 | Checkout cannot start | yes |
| `ITEM_UNAVAILABLE` | 409 | Product/variant unavailable | yes |
| `PRICE_CHANGED` | 409 | Customer must review new totals | yes |
| `OUT_OF_STOCK` | 409 | Quantity unavailable | yes |
| `COUPON_INVALID` | 400 | Coupon cannot apply | yes |
| `CHECKOUT_EXPIRED` | 409 | Checkout/reservation expired | yes |
| `IDEMPOTENCY_CONFLICT` | 409 | Key reused for different payload | no |
| `INVALID_STATE_TRANSITION` | 409 | State machine rejected action | no |
| `PAYMENT_PROVIDER_ERROR` | 502 | Provider failure | yes |

## Cart Response Contract
`GET /api/v1/cart`

```json
{
  "data": {
    "cartId": "cart_123",
    "status": "active",
    "currency": "USD",
    "items": [
      {
        "id": "ci_123",
        "productId": "prod_123",
        "variantId": "var_123",
        "slug": "premium-template",
        "title": "Premium Template",
        "variantTitle": "Commercial License",
        "quantity": 1,
        "unitPrice": 9900,
        "lineSubtotal": 9900,
        "availability": "available",
        "warnings": []
      }
    ],
    "totals": {
      "subtotal": 9900,
      "discountTotal": 0,
      "taxTotal": 0,
      "shippingTotal": 0,
      "grandTotal": 9900
    },
    "blockingErrors": [],
    "nextActions": ["checkout"]
  },
  "meta": {},
  "error": null
}
```

## Checkout Validate Request
`POST /api/v1/checkout/validate`

```json
{
  "cartId": "cart_123",
  "checkoutId": "chk_123",
  "buyer": {
    "email": "buyer@example.com",
    "name": "Buyer Name",
    "phone": "+10000000000"
  },
  "shipping": {
    "required": true,
    "address": {
      "line1": "123 Main St",
      "city": "Dhaka",
      "region": "Dhaka",
      "postalCode": "1207",
      "country": "BD"
    },
    "methodId": "ship_standard"
  },
  "billing": {
    "sameAsShipping": true
  },
  "couponCode": "WELCOME10",
  "notes": "Deliver after 5 PM"
}
```

Successful validation response:
```json
{
  "data": {
    "checkoutId": "chk_123",
    "state": "ready",
    "reservationId": "res_123",
    "expiresAt": "2026-07-12T12:30:00Z",
    "totals": {
      "subtotal": 9900,
      "discountTotal": 990,
      "taxTotal": 0,
      "shippingTotal": 500,
      "grandTotal": 9410
    },
    "reviewRequired": true,
    "nextActions": ["place_order"]
  },
  "meta": {},
  "error": null
}
```

## Checkout Confirm Request
`POST /api/v1/checkout/confirm`

Headers:
```text
Idempotency-Key: checkout_cart_123_20260712_001
```

Body:
```json
{
  "checkoutId": "chk_123",
  "paymentMode": "manual_follow_up",
  "acceptedTerms": true,
  "clientReviewVersion": "totals_v3"
}
```

Response:
```json
{
  "data": {
    "orderId": "ord_123",
    "orderNumber": "GRX-10001",
    "orderState": "placed",
    "paymentState": "manual_pending",
    "invoiceState": "sent",
    "redirectUrl": "/success?order=GRX-10001",
    "customerVisibleMessage": "Your order was placed. Our team will contact you with next steps."
  },
  "meta": {
    "idempotencyKey": "checkout_cart_123_20260712_001"
  },
  "error": null
}
```

## Customer Order Detail Contract
`GET /api/v1/orders/:id`

Response includes:
- Order summary.
- Immutable line items.
- Payment state.
- Invoice state and download URL when available.
- Fulfillment/shipment state.
- Return eligibility.
- Customer-visible notes.
- Support actions.

Ownership rule:
- API returns only orders owned by current customer unless staff/admin permission applies.

## Admin Order Action Contract
`PATCH /api/v1/admin/orders/:id/status`

Headers:
```text
Idempotency-Key: admin_order_status_ord_123_001
```

Body:
```json
{
  "targetState": "fulfillment_pending",
  "reason": "Manual payment confirmed by finance.",
  "notifyCustomer": true
}
```

Rules:
- Requires permission.
- Validates state transition.
- Writes audit log.
- Returns updated source state.

## Admin Note Contract
`POST /api/v1/admin/orders/:id/notes`

```json
{
  "body": "Customer requested delivery after 5 PM.",
  "visibility": "internal"
}
```

## Refund Request Contract
`POST /api/v1/admin/orders/:id/refunds`

```json
{
  "amount": 2500,
  "reason": "Customer return approved.",
  "lineItemIds": ["oi_123"],
  "refundMethod": "original_payment"
}
```

Rules:
- Refund amount cannot exceed refundable balance.
- Requires permission and audit log.
- Provider refund and internal refund state must reconcile.

## Webhook Contract
Payment webhook requests must include provider signature headers and provider event ID. The API must:

1. Verify signature.
2. Deduplicate provider event ID.
3. Validate amount/currency/order mapping.
4. Apply allowed state transition.
5. Write transaction record.
6. Emit audit/notification/analytics events.

## Acceptance Criteria

- Frontend can build complete screens from response contracts without guessing fields.
- API errors are field-specific and recoverable where possible.
- Idempotency behavior is explicit for checkout, payment, admin actions, refunds, and webhooks.
- Ownership and permission behavior is explicit for customer and admin APIs.
