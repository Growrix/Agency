# Shipping Tax Coupons Inventory Returns

Document status: source of truth
Owner: Operations, finance, fulfillment

## Purpose

Define commercial policy logic that affects checkout totals, fulfillment, customer promises, and support workflows.

## Shipping

- Shipping methods depend on destination, product type, weight/dimensions, inventory location, and carrier availability.
- Digital products do not require shipping but may require entitlement delivery.
- Shipping estimates must be shown before payment confirmation when possible.
- Tracking numbers belong to shipments, not only orders.

## Tax

- Tax calculation depends on customer address, product tax class, store nexus rules, and exemptions.
- Tax totals must be server-calculated and stored on the order.
- Tax provider failures must fail safely with a clear checkout error or configured fallback.

## Coupons

- Coupons can target product, category, customer, cart value, first purchase, campaign, or channel.
- Coupons require usage limits, validity dates, eligibility checks, stacking rules, and auditability.
- Coupons should never make order totals negative.

## Inventory

- Stock should be reserved during checkout and released after expiration or failed payment.
- Low-stock thresholds must trigger admin visibility.
- Backorder and preorder require explicit product policy.
- Manual stock adjustments require reason and actor.

## Returns

- Return eligibility depends on product type, delivery status, return window, condition, and policy exceptions.
- Digital products may have separate refund rules from physical products.
- Return decisions should connect to refund, exchange, replacement, or store credit workflows.

## Acceptance Criteria

- Checkout can explain shipping, tax, coupon, and inventory failures.
- Admin can reconcile stock, returns, refunds, and coupons from durable records.
- Policy exceptions are permissioned and audit logged.
