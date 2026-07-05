# Orders Admin Webhook API

Document status: API contract
Owner: Orders, admin, integrations

## Purpose

Define APIs for order lifecycle, returns, refunds, admin operations, and non-payment webhooks.

## Customer Order Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/orders` | List current customer's orders. |
| GET | `/api/v1/orders/:id` | Read owned order details. |
| POST | `/api/v1/orders/:id/cancel` | Cancel when eligible. |
| POST | `/api/v1/orders/:id/returns` | Request return. |
| GET | `/api/v1/orders/:id/invoice` | Download or view invoice. |
| GET | `/api/v1/orders/:id/tracking` | Read shipment tracking. |

## Admin Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/admin/orders` | Filter and manage orders. |
| PATCH | `/api/v1/admin/orders/:id/status` | Update status through allowed transitions. |
| POST | `/api/v1/admin/orders/:id/refunds` | Create refund request/record. |
| GET | `/api/v1/admin/customers` | Customer list and support context. |
| GET | `/api/v1/admin/reports/sales` | Sales reporting. |
| GET | `/api/v1/admin/audit-logs` | Audit log search. |

## Webhook Endpoints

- `/api/v1/webhooks/shipping/:provider`
- `/api/v1/webhooks/tax/:provider`
- `/api/v1/webhooks/search/:provider`
- `/api/v1/webhooks/messaging/:provider`

## Rules

- Customer order APIs require ownership checks.
- Admin APIs require role permissions and audit logs.
- Order status transitions must be validated by a state machine.
- Webhooks require signature verification or provider-specific trust controls.

## Acceptance Criteria

- Order APIs expose accurate status without leaking other customers' data.
- Admin mutations are permissioned and auditable.
- Webhooks are idempotent and observable.
