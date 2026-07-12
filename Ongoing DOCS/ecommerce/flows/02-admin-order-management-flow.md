# Admin Order Management Flow

Document status: active flow specification
Owner: Operations, admin, backend, QA

## Purpose

Define the complete admin order workflow so operators can manage orders without direct database access.

## Scope

This specification covers admin order list, filters, order detail, status transitions, internal notes, invoice actions, payment reconciliation, fulfillment, refunds, returns, customer support context, audit logs, and permissions.

## Source Documents

- `blueprint/04-role-permission-capability-map.md`
- `frontend/06-customer-and-admin-dashboards.md`
- `backend/06-order-payment-shipping-service.md`
- `api/05-orders-admin-webhook-api.md`
- `admin/01-admin-permissions-and-screens.md`
- `state-machines/01-order-payment-fulfillment-states.md`

## Admin Routes

| Route/screen | Purpose | Required states |
| --- | --- | --- |
| `/admin` | KPI overview and operational queue entry points | loading, loaded, permission denied |
| `/admin/orders` | Search, filter, sort, and triage orders | empty, loading, filtered, error, permission denied |
| `/admin/orders/:id` | Full order operation screen | loaded, not found, permission denied, action pending |
| `/admin/email-templates` | Configure transactional email templates | list, edit, preview, validation error |
| `/admin/customers/:id` | Customer support context | ownership/permission checked, order history, support summary |

## Order List Requirements

Filters:
- Status, payment status, fulfillment status, refund status, date range, customer email/name, order number, product, delivery method, risk flag.

Columns:
- Order number, customer, total, payment status, fulfillment status, order status, created date, assigned operator, flags, latest note.

Actions:
- Open detail, mark fulfilled when eligible, add note quick action, export where permission allows.

Empty states:
- No orders yet, no matching filters, permission denied, data load failed.

## Order Detail Required Panels

- Order summary and immutable line-item snapshot.
- Customer/contact and support context.
- Payment and transaction timeline.
- Invoice timeline and actions.
- Fulfillment/shipment panel.
- Returns/refunds panel.
- Internal notes and customer-visible messages.
- Audit log timeline.
- Risk/fraud flags.

## Allowed Admin Actions

| Action | Permission | Preconditions | Required result |
| --- | --- | --- | --- |
| Add internal note | `orders.note` | Order exists | Note appears in timeline and audit log. |
| Update order status | `orders.status.update` | Transition allowed | Status updates once, audit log written. |
| Mark offline payment paid | `payments.mark_paid` | Payment method allows manual mark | Payment state changes, audit log, notification optional. |
| Send invoice | `invoices.send` | Invoice exists or can be created | Invoice send event and email/job record. |
| Mark invoice paid | `invoices.mark_paid` | Manual payment allowed | Invoice/payment/order state reconciles. |
| Create refund | `refunds.create` | Paid/refundable amount exists | Refund record created, payment provider or manual workflow triggered. |
| Approve return | `returns.approve` | Return request eligible | Return status updates, customer notified. |
| Create shipment/tracking | `shipments.create` | Fulfillment allowed | Shipment record created, order fulfillment state updates. |
| Export order data | `orders.export` | Elevated role | Export audit log written. |

## Admin Status Flow

1. Operator opens `/admin/orders`.
2. API checks staff session and permission.
3. Operator filters to actionable queue.
4. Operator opens order detail.
5. API returns order, customer context, line snapshots, payment, invoice, fulfillment, notes, and audit timeline.
6. UI enables only actions valid for the current state and permission.
7. Operator performs action with confirmation when destructive or financial.
8. API validates permission, transition, idempotency where needed, and writes durable state.
9. Audit log records actor, action, before/after, target, timestamp, and reason/note.
10. Notifications/analytics emit events where configured.
11. UI refreshes from source state, not optimistic assumptions alone.

## Failure And Edge Cases

- Permission denied: hide action and enforce API 403.
- Stale order state: reject action with conflict and reload latest state.
- Invalid transition: explain why action is unavailable.
- Duplicate action submit: idempotency or conflict prevents duplicate notes/refunds/invoices.
- Provider failure: keep internal pending state and surface retry/manual resolution.
- Partial refund: show remaining refundable amount.
- Customer data privacy: support sees only necessary data.

## Audit Requirements

Every sensitive action records:
- Actor ID and role.
- Action name.
- Target type and ID.
- Previous state and new state where applicable.
- Reason or note when required.
- Request ID/idempotency key where applicable.
- Timestamp.

## Acceptance Criteria

- Admin can search, filter, open, and operate orders without database access.
- Invalid actions are unavailable in UI and rejected by API.
- Order, payment, invoice, shipment, refund, and note actions are permissioned and audit logged.
- Admin changes are visible in customer/order state when they should be.
- E2E tests cover list filters, order detail, notes, status action, invoice action, refund permission, and forbidden access.
