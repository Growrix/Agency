# Test Strategy

Document status: testing source
Owner: QA and engineering

## Purpose

Define the enterprise testing approach for ecommerce features.

## Test Pyramid

- Unit tests for pure business rules, pricing, eligibility, state machines, validation.
- Integration tests for services, database, provider adapters, queues.
- API tests for contracts, auth, authorization, idempotency, errors.
- E2E tests for customer and admin critical paths.
- Manual exploratory tests for edge UX, operations, and provider dashboards.

## Critical Paths

- Registration, login, refresh, password reset.
- Product discovery and PDP variant selection.
- Cart add/update/remove and coupon application.
- Checkout with shipping, tax, payment, and order success.
- Payment webhook reconciliation and retry.
- Admin product, inventory, order, refund, and role actions.
- Customer order, return, support, and account flows.

## Test Data

- Seed catalog with physical, digital, service, bundle, subscription-like, out-of-stock, low-stock, sale, and tax-exempt examples.
- Payment sandbox cards for success, failure, pending, dispute, refund.
- Customer roles and admin roles with permission boundaries.

## Acceptance Criteria

- Each domain document maps to a test owner and critical checks.
- Release blockers are defined before implementation.
- Test data covers success, failure, and edge states.
