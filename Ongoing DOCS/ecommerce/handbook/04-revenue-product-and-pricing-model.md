# Revenue Product And Pricing Model

Document status: source of truth
Owner: Product and finance

## Purpose

Define sellable product types, pricing behavior, discount policy, and revenue tracking rules.

## Product Types

- Physical products.
- Digital products and downloadable assets.
- Service products and setup packages.
- Bundles and kits.
- Subscriptions or recurring memberships.
- Gift cards and store credit.
- Preorders and backorders when inventory policy allows.

## Pricing Rules

- Store money in minor units where implementation supports it.
- Display currency, tax behavior, discount, and shipping cost before payment confirmation.
- Product price snapshots must be stored on order items.
- Discount stacking must be explicit and testable.
- Manual admin price overrides require audit logging and permission checks.

## Discount Types

| Type | Rule owner | Notes |
| --- | --- | --- |
| Coupon | Coupon service | Code, eligibility, usage limits, expiration. |
| Automatic discount | Pricing rules | Applied by cart rules without customer entry. |
| Bundle discount | Product/catalog | Requires clear bundle composition and inventory behavior. |
| Gift card | Ledger | Treated as stored value, not a normal coupon. |
| Store credit | Customer ledger | Issued by refund, support, loyalty, or promotion. |
| Loyalty/reward | Loyalty rules | Earn and redeem rules must be auditable. |

## Data Implications

- Product variants need price, compare-at price, cost, SKU, tax class, and inventory policy.
- Orders need subtotal, discount total, tax total, shipping total, grand total, paid total, refunded total.
- Promotions need eligibility, usage count, customer limit, lifecycle status, and stacking rules.

## API Implications

- Cart and checkout APIs must return server-calculated totals.
- Pricing errors must fail closed and provide actionable messages.
- Admin pricing mutations require permission checks.

## Acceptance Criteria

- Each product type has a defined fulfillment and revenue recognition path.
- Discount and gift card behavior is deterministic under repeated calculation.
- Order totals can be audited from line items, adjustments, tax, shipping, and payment records.
