# Cart Checkout Order Success

Document status: frontend source
Owner: Frontend, checkout, payments

## Purpose

Define cart, checkout, payment, coupon, shipping, success, and failed-payment user experiences.

## Cart Requirements

- Guest and logged-in cart support.
- Add, update quantity, remove, save for later where supported.
- Coupon and gift card entry.
- Shipping and tax estimate where possible.
- Server-calculated subtotal, discounts, taxes, shipping, total.
- Clear stock, price, and eligibility errors.

## Checkout Steps

1. Identity or guest contact.
2. Shipping address or digital fulfillment details.
3. Shipping method.
4. Billing address.
5. Payment method.
6. Coupon/gift card/store credit review.
7. Order review.
8. Confirmation.

## Payment States

- Ready for payment.
- Processing.
- Succeeded.
- Failed with retry.
- Pending provider confirmation.
- Cash on delivery accepted.

## Success And Failure Pages

- Success page shows order number, summary, next steps, tracking expectations, account creation, and support.
- Failed payment page shows safe recovery actions and preserves cart/checkout context.
- Pending state explains that confirmation may arrive later.

## Acceptance Criteria

- Cart and checkout use server totals.
- Customers can recover from payment, inventory, coupon, address, and shipping failures.
- Success state does not appear before order/payment rules allow it.
