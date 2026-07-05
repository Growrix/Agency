# Feature Matrix

Document status: planning source
Owner: Product and delivery

## Purpose

Map the ecommerce feature set across customer, admin, backend, and release phases.

## Public And Discovery Features

| Feature | Customer surface | Backend/API | Phase |
| --- | --- | --- | --- |
| Home and landing pages | Public pages | CMS/content API | 1 |
| Product listing | Products, categories, brands | Catalog/search API | 4-5 |
| Filters and sorting | Search and category pages | Search facets | 5 |
| Product detail | PDP, media, variants, reviews | Catalog/review API | 4, 11 |
| Wishlist/recently viewed | Customer-enhanced discovery | Customer/catalog events | 6-7 |
| Compare | Product comparison page | Catalog API | 5 |

## Commerce Features

| Feature | Customer surface | Backend/API | Phase |
| --- | --- | --- | --- |
| Guest cart | Cart drawer/page | Cart API | 7 |
| User cart merge | Login/cart recovery | Cart + auth | 7 |
| Coupons/gift cards | Cart/checkout | Pricing/promotion API | 7-9 |
| Checkout | Address, shipping, payment | Checkout API | 8 |
| Payments | Provider UI/redirect/COD | Payment API/webhooks | 9 |
| Orders | Success and dashboard | Order API | 10 |
| Returns/refunds | Customer dashboard/support | Return/refund API | 10 |

## Customer Features

- Profile, addresses, payment methods.
- Orders, invoices, downloads, subscriptions.
- Wishlist, reviews, reward points, referrals.
- Notifications, messages, sessions, security.
- Support tickets, returns, store credit.

## Admin Features

- Dashboard and KPI overview.
- Product, category, brand, collection management.
- Inventory, warehouses, suppliers, purchase orders.
- Order, payment, refund, return, shipment management.
- Customer, role, user, permission management.
- Coupons, gift cards, campaigns, rewards.
- Reviews, blogs, CMS pages, settings, taxes, shipping, payments.
- Logs, audit, reports, analytics, system health.

## Acceptance Criteria

- Every feature appears in an execution phase.
- Customer features have matching API and data ownership.
- Admin features identify required roles and audit requirements.
