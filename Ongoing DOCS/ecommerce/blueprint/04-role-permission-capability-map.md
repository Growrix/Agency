# Role Permission Capability Map

Document status: source of truth
Owner: Product, security, operations

## Purpose

Define role capabilities for customer, support, management, admin, and super admin workflows.

## Role Model

| Role | Access level | Examples |
| --- | --- | --- |
| Guest | Anonymous | Browse, search, cart, guest checkout. |
| Customer | Self-service | Account, orders, wishlist, addresses, returns. |
| Support | Limited operational | Tickets, customer context, return assistance. |
| Manager | Store operations | Catalog, orders, coupons, reviews, inventory. |
| Admin | Configuration | Settings, payments, shipping, taxes, staff users. |
| Super Admin | Critical authority | Role changes, exports, emergency actions. |

## Capability Rules

- Customers can only access their own account, cart, orders, returns, addresses, and support records.
- Support can view customer/order context but cannot change payment settings or roles.
- Managers can operate store data but cannot access secrets or super-admin controls.
- Admins can configure systems but critical actions should be logged and optionally re-authenticated.
- Super admins can perform emergency actions, but those actions must still be audit logged.

## Sensitive Capabilities

- Issue refund.
- Override order status.
- Mark offline payment as paid.
- Export customer or order data.
- Modify roles or permissions.
- Change integration secrets.
- Disable fraud controls.
- Delete or anonymize customer data.

## Implementation Requirements

- Permission checks must run on the server.
- UI hiding is not an authorization control.
- Role assignments must be auditable.
- APIs must return consistent forbidden responses without leaking data existence.

## Acceptance Criteria

- Each admin route maps to a required permission.
- Each sensitive capability has an audit event.
- Customer ownership checks are part of the API contract.
