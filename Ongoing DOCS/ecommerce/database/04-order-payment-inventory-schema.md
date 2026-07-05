# Order Payment Inventory Schema

Document status: database contract
Owner: Data, orders, finance, inventory

## Purpose

Define durable schemas for order lifecycle, payments, refunds, inventory, shipments, coupons, and auditability.

## Core Tables

| Table | Purpose | Key fields |
| --- | --- | --- |
| `inventory_stock` | Current stock by warehouse | variantId, warehouseId, available, reserved, damaged |
| `inventory_reservations` | Checkout stock holds | id, cartId, orderId, variantId, quantity, expiresAt, status |
| `orders` | Purchase record | id, userId, status, currency, totals, address snapshots |
| `order_items` | Immutable line snapshots | orderId, variantId, sku, title, quantity, price, tax, discount |
| `payments` | Payment summary | id, orderId, provider, method, status, amount, currency |
| `transactions` | Provider events | id, paymentId, providerEventId, type, status, amount |
| `refunds` | Refund records | id, orderId, paymentId, amount, reason, status |
| `shipments` | Fulfillment packages | id, orderId, carrier, trackingNumber, status |
| `coupons` | Promo definitions | code, type, value, startsAt, endsAt, usageLimit, status |
| `audit_logs` | Admin/system action history | actorId, action, targetType, targetId, metadata, createdAt |

## Rules

- Order totals are stored as snapshots and reconciled against payments.
- Inventory reservations expire automatically if checkout does not complete.
- Transactions are append-only and idempotent by provider event ID.
- Refund records must link to original payment and order.
- Audit logs should be immutable to normal admin users.

## Indexes

- Order by user and created date.
- Order by status and fulfillment status.
- Payment by provider ID and order ID.
- Inventory by variant and warehouse.
- Audit by actor, target, action, and created date.

## Acceptance Criteria

- The schema can reconstruct order, payment, refund, shipment, and inventory history.
- Duplicate webhooks cannot create duplicate transaction records.
- Inventory and payment changes are auditable.
