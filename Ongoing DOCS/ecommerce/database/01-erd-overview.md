# ERD Overview

Document status: database source
Owner: Data architecture

## Purpose

Define the major entity groups and how ecommerce data should be organized.

## Entity Groups

- Identity and access: users, sessions, devices, roles, permissions.
- Customer profile: profiles, addresses, preferences, consent, support identity.
- Catalog: products, variants, categories, brands, collections, media, tags, SEO.
- Commerce: carts, cart items, coupons, gift cards, store credit, rewards.
- Inventory: warehouses, stock, reservations, transfers, suppliers, purchase orders.
- Checkout/orders: orders, order items, shipments, invoices, returns, refunds.
- Payments: payment intents, transactions, provider events, disputes, settlements.
- Content: pages, blog posts, policy pages, campaigns.
- Engagement: reviews, questions, wishlists, recently viewed, notifications.
- Operations: audit logs, settings, analytics events, reports.

## Relationship Rules

- Orders store snapshots of customer, address, product, price, tax, and shipping values.
- Product variants own purchasable SKU-level state.
- Inventory records belong to variant and warehouse.
- Payments belong to orders but transactions remain append-only records.
- Customer-owned resources require user/customer ownership fields.

## Data Quality Rules

- Use stable IDs for external references.
- Enforce unique slugs where public URLs depend on them.
- Prefer explicit lifecycle status fields over deletion for business records.
- Use soft delete or archival where records affect audits, payments, orders, or compliance.

## Acceptance Criteria

- Every major domain has a data owner.
- Money and fulfillment records preserve historical truth.
- Customer data supports privacy and retention policy.
