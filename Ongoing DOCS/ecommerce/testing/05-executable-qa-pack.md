# Executable QA Pack

Document status: active QA execution contract
Owner: QA, engineering, DevOps

## Purpose

Turn the scenario matrix into executable validation requirements with fixtures, mock providers, commands, database assertions, and release evidence.

## Required QA Inputs

- Flow specs from `flows/`.
- State machines from `state-machines/01-order-payment-fulfillment-states.md`.
- API contracts from `api/`.
- Fixture contract from `fixtures/01-ecommerce-test-data.md`.
- Provider decisions from `integrations/05-provider-decision-matrix.md`.
- Security controls from `auth/05-auth-hardening-rbac-csrf.md` and `security/`.

## Test Command Contract

Each implementation project must define these equivalent commands:

| Gate | Required command behavior |
| --- | --- |
| Typecheck | Validates all TypeScript/application types. |
| Lint | Validates style, import, accessibility, and security lint rules. |
| Unit tests | Runs pricing, state machine, permission, validation, and utility tests. |
| Integration tests | Runs cart, checkout, payments, notifications, search, and data-service tests. |
| API tests | Runs request/response, auth, forbidden, idempotency, and webhook tests. |
| E2E tests | Runs P0/P1 user/admin journeys from `testing/04-e2e-scenario-matrix.md`. |
| Accessibility | Runs keyboard, labels, contrast, focus, and screen-reader checks for critical flows. |
| Performance | Validates storefront, PDP, cart, checkout, and admin latency/Core Web Vitals budgets. |
| Security | Validates auth, CSRF, ownership, webhook, rate limit, and secrets checks. |
| Build | Produces production build with no relevant warnings/errors. |

## Scenario Traceability

Every automated E2E test must include:
- Scenario ID from `testing/04-e2e-scenario-matrix.md`.
- Fixture IDs used.
- Source flow spec path.
- Expected API calls or domain events.
- Expected database assertions.
- Expected analytics/notification side effects where relevant.

## Mock Provider Requirements

| Provider domain | Required mock behavior |
| --- | --- |
| Payments | success, failure, pending, duplicate webhook, invalid signature, refund. |
| Email/SMS/WhatsApp | queued, sent, failed, dead-letter. |
| Shipping | rate success, no rate, label created, delivery update, provider failure. |
| Tax | tax success, exemption, provider timeout/fallback. |
| Search | normal result, no result, stale index, provider unavailable. |
| Storage | upload success, invalid file, private signed URL, expired URL. |

## Database Assertions

P0/P1 tests must assert durable state, not just UI text:
- Order count and order state.
- Payment/transaction state and idempotency keys.
- Inventory reservation/confirmation/release.
- Coupon/gift card/store credit ledger records.
- Invoice/refund/return/support records.
- Notification job state.
- Audit log for admin/sensitive actions.
- Ownership denial returns no leaked data.

## Release Evidence

Each release candidate must include:
- Command outputs or CI links for required gates.
- Failed/deferred scenario list with owner and mitigation.
- Accessibility/performance/security gate summary.
- Provider sandbox/webhook verification summary.
- Migration and rollback verification.
- Known risk register.

## Acceptance Criteria

- QA can run deterministic tests from documented fixtures and provider mocks.
- P0 scenarios are automated and pass before release.
- P1 failures require explicit owner, mitigation, and release decision.
- Test evidence proves UI, API, database, provider, analytics, notification, and audit side effects.
