# Admin Permissions And Screens

Document status: active admin implementation contract
Owner: Admin, security, operations, frontend, backend

## Purpose

Define exact admin screens, permissions, UI states, and action behavior required for complete ecommerce operations.

## Scope

This file covers admin dashboard navigation, orders, products, inventory, customers, coupons, reviews, CMS, email templates, reports, logs, settings, and system health.

## Permission Model
| Permission | Allows |
| --- | --- |
| `admin.dashboard.view` | View admin overview. |
| `orders.view` | View order list/detail. |
| `orders.status.update` | Update allowed order status transitions. |
| `orders.note` | Add internal/customer-visible order notes. |
| `orders.export` | Export order data. |
| `payments.view` | View payment state and transaction summaries. |
| `payments.mark_paid` | Mark offline/manual payment as paid. |
| `refunds.create` | Create refund. |
| `returns.manage` | Approve/reject returns. |
| `shipments.create` | Add shipment/tracking. |
| `invoices.send` | Send invoice. |
| `invoices.mark_paid` | Mark invoice paid. |
| `inventory.adjust` | Adjust stock with reason. |
| `products.manage` | Create/update/archive products. |
| `customers.view` | View customer support context. |
| `roles.manage` | Manage roles and permissions. |
| `settings.manage` | Change store settings/integrations. |

## Global Admin UI Requirements
- Permission-aware navigation.
- Server-enforced authorization on every admin API.
- Loading, empty, error, forbidden, and stale-state views.
- Search, filter, sort, pagination for lists.
- Confirmation for destructive/financial actions.
- Audit log for sensitive actions.
- No secrets exposed in UI.

## Required Admin Screens
| Screen | Required capabilities |
| --- | --- |
| Dashboard | KPIs, pending orders, failed payments, low stock, returns, support, system health. |
| Orders | Search/filter/list, order detail, status actions, notes, invoice, refund, shipment, audit timeline. |
| Products | CRUD, variants, media, SEO, status, pricing, archive/discontinue. |
| Inventory | Stock by variant/warehouse, reservations, low stock, adjustment, transfer, audit. |
| Customers | Customer profile, order history, support context, store credit/rewards summary. |
| Coupons/gift cards | Eligibility, usage limits, expiration, stacking, ledger records. |
| Reviews/Q&A | Moderation queue, approve/reject, abuse reports. |
| Email templates | Placeholder list, preview, validate, fallback defaults, send test where supported. |
| Reports/analytics | Sales, products, funnels, abandoned cart, refunds, fulfillment. |
| Logs/audit | Actor, action, target, timestamp, filters, export with permission. |
| Settings | Taxes, shipping, payments, integrations, roles, security controls. |

## Admin Order Detail Minimum Data
- `orderId`, `orderNumber`, created/updated dates.
- Customer contact and safe support context.
- Line items with immutable snapshots.
- Totals and adjustments.
- Payment state and transactions.
- Invoice state/actions.
- Fulfillment/shipment state/actions.
- Refund/return eligibility and records.
- Internal notes and customer-visible messages.
- Audit timeline.
- Available actions calculated by server state and permission.

## UI State Requirements
- Empty list: explain what will appear and reset filters.
- Permission denied: explain missing access without exposing data.
- Stale data conflict: reload latest state and explain action was not applied.
- Provider failure: show retry/manual-resolution path.
- Validation failure: field-level errors plus summary.
- Success: show durable confirmation from server response.

## Acceptance Criteria

- Every admin screen has a permission owner and server API enforcement.
- Every sensitive admin action writes audit logs.
- Admin order operations can be performed without direct database access.
- UI state, backend state, and audit state remain consistent after each action.
