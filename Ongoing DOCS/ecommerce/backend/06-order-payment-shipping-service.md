# Order Payment Shipping Service

Document status: backend contract
Owner: Orders, payments, fulfillment

## Purpose

Define order lifecycle, payment reconciliation, refund, return, shipment, invoice, and tracking behavior.

## Order Responsibilities

- Create orders from validated checkout.
- Store immutable order item snapshots.
- Manage order status transitions.
- Provide customer and admin order views.
- Generate invoices.
- Manage cancellations, returns, exchanges, partial refunds, and notes.

## Payment Responsibilities

- Create payment intents or provider sessions.
- Record transactions and provider events.
- Reconcile webhooks.
- Process retries and refunds.
- Track payment status and disputes.

## Shipping Responsibilities

- Select shipping method.
- Create shipments.
- Store tracking numbers and carrier updates.
- Update delivery status.
- Support pickup where configured.

## State Rules

- Order state transitions must be validated.
- Payment success does not always equal fulfillment readiness if fraud/manual review applies.
- Refunds update payment, order, and accounting state.
- Shipment delivery does not automatically close support eligibility.

## Acceptance Criteria

- Orders, payments, refunds, and shipments reconcile from durable records.
- Webhook and retry paths are idempotent.
- Customer and admin views reflect the same source state.
