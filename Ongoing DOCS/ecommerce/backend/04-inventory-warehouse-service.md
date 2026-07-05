# Inventory Warehouse Service

Document status: backend contract
Owner: Inventory backend

## Purpose

Define stock, reservations, warehouse, supplier, transfer, and low-stock behavior.

## Responsibilities

- Warehouse records.
- Stock by variant and warehouse.
- Reservation creation, expiration, confirmation, release.
- Low-stock alerts.
- Manual adjustments with reasons.
- Stock transfers.
- Supplier and purchase order support.
- Backorder and preorder policy enforcement.

## Rules

- Checkout must reserve stock before final order confirmation when inventory-managed.
- Reservations expire automatically.
- Manual stock changes require actor, reason, and audit log.
- Stock cannot go negative unless explicit backorder policy allows it.
- Digital products and services may bypass physical stock but still need entitlement capacity rules where relevant.

## Events

- `inventory.reservation.created`
- `inventory.reservation.expired`
- `inventory.stock.adjusted`
- `inventory.low_stock.detected`
- `inventory.transfer.completed`

## Acceptance Criteria

- Checkout cannot oversell inventory-managed products.
- Admin can reconcile stock history.
- Low stock and reservation failures are visible to operations.
