# Unit Integration API E2E

Document status: testing contract
Owner: QA and engineering

## Purpose

Define layer-specific test requirements for ecommerce implementation.

## Unit Tests

- Pricing and discount calculations.
- Coupon eligibility and stacking.
- Inventory reservation state.
- Order status transitions.
- Payment state transitions.
- Role/permission helpers.
- Data validation schemas.

## Integration Tests

- Cart with catalog, pricing, and inventory.
- Checkout with tax, shipping, reservation, payment intent.
- Webhook processing and order reconciliation.
- Notification dispatch after events.
- Search indexing after catalog updates.

## API Tests

- Request validation.
- Auth and ownership checks.
- Pagination and filters.
- Error codes and safe messages.
- Idempotency for checkout, payment, refund, webhook.

## E2E Tests

- Guest purchase.
- Logged-in purchase with saved address.
- Failed payment and retry.
- Customer order and return request.
- Admin product update.
- Admin refund and audit log.

## Acceptance Criteria

- Critical behavior has automated coverage at the cheapest reliable layer.
- E2E tests focus on business-critical journeys, not every visual variant.
- API contract tests cover failure and forbidden states.
