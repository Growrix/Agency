# Module Boundaries

Document status: architecture rule
Owner: System architecture

## Purpose

Prevent ecommerce modules from becoming tightly coupled and hard to test.

## Boundary Principles

- A module owns its data writes and exports explicit service/API contracts.
- Cross-module communication uses service calls, API calls, or domain events.
- Admin screens coordinate workflows but do not bypass module rules.
- Provider SDKs stay behind integration adapters.
- Money, inventory, permissions, and fulfillment status must not be calculated only in UI code.

## Module Ownership

| Module | Owns | Exposes |
| --- | --- | --- |
| Catalog | Products, variants, categories, brands, collections | Product read/write, discovery payloads |
| Pricing | Coupons, gift cards, discounts, totals rules | Cart/checkout price calculation |
| Inventory | Stock, reservations, warehouses | Availability and reservation APIs |
| Cart | Cart identity, items, totals preview | Cart mutation and merge APIs |
| Checkout | Validation and order creation orchestration | Checkout session and confirmation APIs |
| Orders | Order lifecycle and immutable purchase records | Customer/admin order APIs |
| Payments | Transactions, provider states, refunds | Payment intent, webhook, refund APIs |
| Notifications | Message templates and dispatch | Event-driven send APIs |
| Analytics | Events and reporting facts | Event ingest and dashboards |

## Forbidden Couplings

- Product pages must not query payment provider state.
- Payment webhooks must not directly render or mutate UI-specific records.
- Cart services must not create orders without checkout validation.
- Admin routes must not update inventory without inventory service rules.
- Notification templates must not be the only source of order status wording.

## Acceptance Criteria

- Each implementation file can identify its domain owner.
- Cross-domain writes are intentional and reviewed.
- Service contracts are testable without loading unrelated UI modules.
