# Services Overview

Document status: backend source
Owner: Backend architecture

## Purpose

Define backend services, responsibilities, transaction boundaries, and shared rules.

## Service Map

- User/profile/address service.
- Auth/session/permission service.
- Product catalog service.
- Search indexing service.
- Inventory and warehouse service.
- Pricing, coupon, gift card, loyalty service.
- Cart service.
- Checkout service.
- Order service.
- Payment service.
- Shipping and tax service.
- Review and Q&A service.
- Notification service.
- Analytics and reporting service.
- Admin operations service.

## Shared Rules

- Services own business invariants, not UI components.
- Transactional services should emit events after durable writes.
- Money and inventory changes require idempotency and auditability.
- External providers are called through adapters.
- Errors must be typed enough for API and frontend recovery.

## Transaction Boundaries

- Cart mutations can be short transactions.
- Checkout requires coordinated validation and reservation.
- Order creation and payment confirmation require idempotent state transitions.
- Webhook processing must deduplicate provider events.

## Acceptance Criteria

- Each backend feature maps to one primary service owner.
- Cross-service behavior is explicit and testable.
- Critical writes have logs, events, and rollback or compensation strategy.
