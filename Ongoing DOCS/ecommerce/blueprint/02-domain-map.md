# Domain Map

Document status: source of truth
Owner: Architecture

## Purpose

Define ecommerce bounded contexts, their responsibilities, and the dependency rules between them.

## Bounded Contexts

| Domain | Owns | Depends on |
| --- | --- | --- |
| Identity/Auth | Credentials, sessions, roles, devices | Notification, audit |
| Customer | Profiles, addresses, preferences, support identity | Auth |
| Catalog | Products, variants, categories, brands, collections, SEO | Media, search |
| Pricing/Promotions | Coupons, discounts, gift cards, rewards | Catalog, customer |
| Inventory | Stock, reservations, warehouses, suppliers | Catalog, orders |
| Cart | Guest/user cart, line items, totals preview | Catalog, pricing, inventory |
| Checkout | Validation, addresses, shipping, tax, payment handoff | Cart, inventory, payments |
| Orders | Order lifecycle, items, status, invoices, returns | Checkout, payments, shipping |
| Payments | Provider intents, transactions, refunds, webhooks | Orders, security |
| Fulfillment | Shipments, tracking, delivery, pickup | Orders, inventory, shipping |
| Content/CMS | Pages, blog, policies, campaign content | SEO, frontend |
| Reviews | Ratings, moderation, helpful votes | Customer, catalog, orders |
| Notifications | Email, SMS, WhatsApp, push, in-app | Templates, events |
| Analytics | Events, metrics, dashboards, funnels | All domains |
| Admin | Operations views and mutations | All operational domains |

## Dependency Rules

- Catalog does not depend on cart, checkout, or orders.
- Cart reads catalog, pricing, and inventory but does not capture payment.
- Checkout orchestrates validation but should not own payment provider logic.
- Orders own post-checkout state and immutable customer purchase records.
- Payments own provider status and reconciliation, not customer-facing order history.
- Admin can coordinate domains but should not bypass domain service rules.

## Integration Events

- `catalog.product.updated`
- `cart.item.added`
- `checkout.started`
- `payment.succeeded`
- `order.created`
- `shipment.dispatched`
- `return.requested`
- `review.submitted`
- `customer.support_ticket.created`

## Acceptance Criteria

- Every service has one primary data owner.
- Cross-domain writes are explicit and auditable.
- Domain events are named before analytics, notifications, or integrations consume them.
