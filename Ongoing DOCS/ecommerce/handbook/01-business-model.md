# Business Model

Document status: source of truth
Owner: Product and strategy

## Purpose

Define the commercial model the ecommerce platform must support before technical implementation begins.

## Scope

The platform starts as a single-vendor commerce system with a path to marketplace capabilities. It must support physical products, digital products, service add-ons, bundles, gift cards, subscriptions, and post-purchase support.

## Customer Segments

- Guest visitors researching products and prices.
- First-time buyers completing a fast checkout.
- Returning customers managing orders, downloads, rewards, and support.
- High-intent customers using coupons, bundles, subscriptions, or gift cards.
- Store operators managing catalog, orders, inventory, content, and support.

## Revenue Model

| Revenue stream | Required platform behavior |
| --- | --- |
| Product sales | Product pages, cart, checkout, payments, fulfillment, invoices. |
| Digital downloads | Entitlement, secure download links, versioned files, account history. |
| Bundles | Bundle pricing, inventory implications, promotion rules. |
| Subscriptions | Recurring billing, renewal notices, failed payment recovery. |
| Services | Quote request, appointment, manual fulfillment, follow-up. |
| Gift cards/store credit | Balance ledger, redemption, fraud controls, expiration rules. |

## Business Rules

- Every sellable item must have a clear product type and fulfillment type.
- Prices displayed to the customer must match checkout totals after discounts, taxes, and shipping.
- Guest checkout is allowed, but account creation should be encouraged after purchase.
- Customer service workflows must be visible from order, return, and support screens.
- Admin users must be able to reconcile orders, payments, refunds, inventory, and communications.

## Data Implications

- Products need type, lifecycle status, pricing, tax class, fulfillment type, and SEO metadata.
- Orders need immutable line-item snapshots.
- Payments, refunds, store credit, and gift cards need ledger-style records.
- Customers need account, profile, addresses, preferences, and communication consent records.

## API Implications

- Product, cart, checkout, order, payment, and customer APIs must expose consistent money fields.
- Business rules that affect totals must run server-side.
- Admin APIs require role-gated mutations and audit logs.

## Acceptance Criteria

- Each revenue stream maps to product, checkout, payment, fulfillment, and support behavior.
- The system can launch as single vendor without blocking later marketplace expansion.
- Manual operations are documented where automation is not yet implemented.
