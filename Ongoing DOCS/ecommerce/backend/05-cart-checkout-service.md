# Cart Checkout Service

Document status: backend contract
Owner: Cart and checkout backend

## Purpose

Define cart mutation, totals, checkout validation, inventory locks, and order initiation behavior.

## Cart Responsibilities

- Guest cart and user cart creation.
- Add/update/remove items.
- Cart merge after login.
- Coupon, gift card, and store credit application.
- Totals preview.
- Cart expiration and recovery.

## Checkout Responsibilities

- Validate cart items, price, inventory, coupons, customer/guest identity, address, shipping, tax, and payment method.
- Create or update inventory reservations.
- Create checkout session.
- Coordinate payment intent creation.
- Confirm checkout and hand off to order service.

## Rules

- Cart totals are recalculated server-side after every mutation.
- Checkout must revalidate all mutable business facts before confirmation.
- Inventory reservation failure blocks checkout for affected items.
- Idempotency keys are required for checkout start and confirm actions.

## Failure Reasons

- Product unavailable.
- Variant discontinued.
- Quantity exceeds stock.
- Price changed.
- Coupon invalid.
- Shipping unavailable.
- Tax calculation failed.
- Payment method unavailable.

## Acceptance Criteria

- Cart and checkout responses explain recoverable problems.
- Guest-to-user cart merge is deterministic.
- Checkout cannot create invalid orders.
