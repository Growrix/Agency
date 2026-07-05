# Store Operations And User Roles

Document status: source of truth
Owner: Operations and administration

## Purpose

Define who operates the store, what each role can do, and which workflows need admin support.

## Operational Domains

- Catalog management.
- Inventory and warehouse management.
- Order fulfillment and tracking.
- Returns, refunds, exchanges, and store credit.
- Customer support and messaging.
- Coupon, gift card, reward, and campaign management.
- CMS pages, blog, policy content, SEO metadata.
- Reporting, analytics, audit, and system health.

## User Roles

| Role | Primary capabilities |
| --- | --- |
| Guest | Browse, search, cart, guest checkout, contact support. |
| Customer | Orders, invoices, downloads, wishlist, addresses, returns, support, rewards. |
| Support | View customer/order context, respond to tickets, initiate returns within policy. |
| Manager | Manage products, inventory, orders, coupons, reviews, CMS content, reports. |
| Admin | Configure store settings, payments, shipping, taxes, roles, integrations. |
| Super Admin | Full system authority, critical settings, data exports, emergency controls. |

## Rules

- Every admin mutation requires a known actor and audit log entry.
- Sensitive operations require elevated roles: refunds, manual payment marks, role changes, export, integration secrets.
- Support agents should see only the data needed to resolve the case.
- Customer-facing support history must remain consistent across order, ticket, email, and in-app surfaces.

## Workflow Implications

- Admin dashboard requires queues for orders, returns, low stock, pending reviews, failed payments, and support tickets.
- Staff users need permission-based navigation, not only hidden buttons.
- Operational reports must reconcile with order, payment, refund, and inventory data.

## Acceptance Criteria

- Each role has clear permissions and forbidden actions.
- Each operational workflow has an admin surface and an audit strategy.
- Customer support can resolve common issues without direct database access.
