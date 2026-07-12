# Ecommerce Execution Tasks

Document status: canonical execution tracker
Last updated: 2026-07-12

## Purpose

This tracker converts the ecommerce blueprint into sequenced execution phases. It should be updated only after the source handbook, blueprint, API, database, frontend, backend, auth, security, and testing docs are aligned.

## Execution Rules

- Do not start implementation from a task alone; read the linked source documents first.
- Each phase must have clear inputs, deliverables, acceptance criteria, and validation gates.
- A phase cannot close while blocking security, data, API, or testing decisions remain unresolved.
- Local implementation should use focused branches or commits, but this documentation suite does not require code changes.

## Global Gates

- Scope gate: implementation aligns with the approved source documents.
- Contract gate: database, API, frontend, backend, auth, provider, and security contracts agree.
- Schema gate: stateful work has matching table, column, constraint, index, RLS/access, migration, and seed requirements in `database/05-full-schema-contract.md`.
- Flow-spec gate: multi-step ecommerce work has matching flow spec, state machine, request/response contract, fixtures, and E2E scenarios.
- Provider gate: external-service work has a selected provider, fallback path, environment variables, test mock, and failure policy in `integrations/05-provider-decision-matrix.md`.
- Quality gate: required lint, type, unit, integration, API, E2E, accessibility, performance, and security checks pass for the touched application scope.
- Operations gate: monitoring, logging, rollback, and support procedures are documented for production-affecting features.
- Analytics gate: measurable revenue, funnel, and customer events are defined when behavior affects conversion or retention.

## Phase Tracker

| Phase | Name | Status | Primary Sources | Deliverables | Acceptance Criteria |
| --- | --- | --- | --- | --- | --- |
| 1 | Project setup | Done | `architecture/`, `deployment/`, `rules/` | Repo structure, env strategy, CI gates, docs baseline | Environments and quality gates are defined before feature work. |
| 2 | Authentication | Partial | `auth/`, `security/`, `api/02-auth-customer-api.md` | Registration, login, refresh, reset, roles | Auth flows are tested and protected against session/token abuse. |
| 3 | Database | Partial | `database/`, `architecture/03-data-and-request-flows.md` | Schema, migrations, seed data, indexes | Core commerce data model supports catalog, cart, orders, payments, inventory. |
| 4 | Products | Partial-Advanced | `handbook/04-revenue-product-and-pricing-model.md`, `backend/03-product-catalog-service.md` | Product CRUD, variants, media, SEO fields | Products can be created, searched, viewed, and managed consistently. |
| 5 | Categories | Partial-Advanced | `api/03-product-catalog-search-api.md`, `frontend/03-product-discovery-and-search.md` | Categories, subcategories, brands, collections | Discovery pages expose stable filters and SEO-ready routes. |
| 6 | Inventory | Partial | `backend/04-inventory-warehouse-service.md`, `database/04-order-payment-inventory-schema.md` | Stock, reservations, warehouses, low-stock rules | Checkout cannot oversell inventory and admin can reconcile stock. |
| 7 | Cart | Partial-Advanced | `backend/05-cart-checkout-service.md`, `api/04-cart-checkout-payment-api.md` | Guest cart, user cart, merge, coupons, totals | Cart totals are deterministic and recoverable across guest/login flows. |
| 8 | Checkout | Partial-Advanced | `frontend/05-cart-checkout-order-success.md`, `backend/05-cart-checkout-service.md` | Address, shipping, tax, validation, order review | Checkout fails safely, explains issues, and locks required inventory. |
| 9 | Payments | Partial | `integrations/01-payments.md`, `security/04-payment-webhook-fraud-compliance.md` | Payment intents, COD, retries, webhooks, refunds | Payment state is idempotent, auditable, and reconciled with orders. |
| 10 | Orders | Partial-Advanced | `backend/06-order-payment-shipping-service.md`, `api/05-orders-admin-webhook-api.md` | Order creation, status, tracking, invoices, returns | Customers and admins see accurate order lifecycle state. |
| 11 | Reviews | Partial | `frontend/04-product-detail-reviews-wishlist.md`, `backend/07-review-coupon-notification-analytics-service.md` | Reviews, ratings, moderation, helpful votes | Reviews are permissioned, moderated, and linked to verified purchases when required. |
| 12 | Notifications | Partial-Advanced | `integrations/02-email-sms-whatsapp.md`, `backend/07-review-coupon-notification-analytics-service.md` | Email, SMS, WhatsApp, in-app notifications | Transactional messages are templated, observable, and retryable. |
| 13 | Admin dashboard | Partial-Advanced | `frontend/06-customer-and-admin-dashboards.md`, `blueprint/04-role-permission-capability-map.md` | Product, inventory, order, customer, coupon, report management | Admin actions are role-protected and audit logged. |
| 14 | Analytics | Partial-Advanced | `analytics/`, `backend/07-review-coupon-notification-analytics-service.md` | Event tracking, funnels, dashboards, reports | Core revenue, product, retention, and funnel metrics are visible. |
| 15 | Testing | Advanced | `testing/` | Test suites, fixtures, release checks | Critical paths have automated checks and documented manual QA where needed. |
| 16 | Deployment | Partial | `deployment/`, `security/` | CI/CD, secrets, monitoring, rollback, backups | Staging and production launch paths are repeatable and monitored. |
| 17 | Optimization | Partial | `deployment/03-scaling-cache-cdn-backups.md`, `testing/03-accessibility-performance-security-release-gates.md` | Performance, caching, search, image and query optimization | Core Web Vitals, search latency, and checkout reliability meet targets. |
| 18 | Production launch | Not Closed | all docs | Launch checklist, support runbook, incident response | No critical gates open; support, analytics, rollback, and monitoring are live. |

## Flow-Spec Layer Upgrade

Before future ecommerce implementation work begins, agents must read and apply the flow-spec layer when touching checkout, orders, admin operations, customer account flows, or payments.

Required flow-spec sources:

- `flows/01-checkout-flow-spec.md`
- `flows/02-admin-order-management-flow.md`
- `flows/03-customer-account-flow.md`
- `state-machines/01-order-payment-fulfillment-states.md`
- `api/06-detailed-request-response-contracts.md`
- `admin/01-admin-permissions-and-screens.md`
- `fixtures/01-ecommerce-test-data.md`
- `testing/04-e2e-scenario-matrix.md`
- `testing/05-executable-qa-pack.md`
- `database/05-full-schema-contract.md`
- `integrations/05-provider-decision-matrix.md`
- `auth/05-auth-hardening-rbac-csrf.md`
- `deployment/04-production-operations-runbook.md`

Flow-spec acceptance rule:

- No checkout, order, admin, payment, refund, invoice, or customer-dashboard task is ready unless it names the exact flow spec, state transitions, API contracts, fixtures, and E2E scenarios it satisfies.

## Implementation-Completeness Upgrade

The suite now includes the missing provider, full-schema, detailed API, secondary-flow, auth-hardening, executable-QA, and operations runbook contracts required to reduce implementation ambiguity.

Additional required sources for future implementation:

- `integrations/05-provider-decision-matrix.md`
- `database/05-full-schema-contract.md`
- `api/07-auth-customer-detailed-contracts.md`
- `api/08-catalog-search-admin-detailed-contracts.md`
- `api/09-operations-analytics-detailed-contracts.md`
- `flows/04-product-discovery-pdp-flow-spec.md`
- `flows/05-admin-product-inventory-flow.md`
- `flows/06-coupons-gift-cards-store-credit-flow.md`
- `flows/07-returns-exchanges-support-flow.md`
- `auth/05-auth-hardening-rbac-csrf.md`
- `testing/05-executable-qa-pack.md`
- `deployment/04-production-operations-runbook.md`

Completion rule:

- No ecommerce task is ready when it relies on an external provider, durable state, protected route, admin operation, support workflow, promotional value, or production launch behavior that is only named at a high level. The task must point to the exact detailed source doc above or add one before implementation.

## Implementation Alignment Snapshot (Growrixos branch)

The table above remains the canonical blueprint phase plan. Current repository implementation is ahead of this initial planned baseline in several areas.

Observed implementation alignment (2026-07-11):

- Project setup: Done (workspace/runtime/test gates and execution trackers are active).
- Authentication: Partial to advanced (Clerk-based auth flows, protected surfaces, and role-guard patterns implemented; additional hardening remains).
- Database: Partial (Supabase schema + app state/store patterns and migration tooling exist; full normalized transactional activation is still in progress).
- Products/Categories: Partial to advanced (catalog and product detail surfaces, category discovery, and admin/catalog operations are implemented).
- Cart/Checkout: Partial to advanced (cart flows, checkout flow, pricing validation, and order creation are active; remaining blueprint parity continues).
- Payments/Orders: Partial to advanced (order lifecycle, payment/webhook wiring, delivery operations, and admin order APIs are active; full production reconciliation and provider rollout still pending).
- Notifications/Analytics: Partial to advanced (event tracking, lead flows, notifications, and admin funnel analytics are active).
- Admin dashboard: Partial to advanced (multiple admin operations surfaces exist; remaining workflow parity and policy hardening continue).
- Testing: Active with strong coverage (unit, integration, release-gate e2e, and health-check pipeline are operational).
- Deployment/Optimization/Launch: Partial (core checks and build gates exist; full production-launch closure remains pending).

Most recent delta from P21 execution:

- Public template preview behavior has been restored to full preview mode while preserving paid-download security controls (signed grants, redemption checks, fingerprinting, rejection auditing, and throttling).

Most recent delta from P22 execution:

- Checkout flow realigned to paymentless Place order semantics for this phase: checkout copy/metadata now frame secure order submission with manual team follow-up, success state content/badges now support order-placed/manual-contact outcomes, and consultation-only plans bypass payable cart behavior.
- Cart tier-selection policy now follows replace semantics for same product slug (new tier selection replaces previous line-item tier instead of accumulating parallel tiers).
- Ecommerce Playwright regression expectations were updated for current checkout labels/required fields, with focused validation passing for `commerce-admin.spec.ts` and checkout placeholder coverage in `commerce-ui.spec.ts`.
- Checkout now autosaves and restores the information form draft (contact, billing, notes, coupon) per checkout context, and unauthenticated Place order redirects now preserve full checkout query state for sign-in/sign-up return routing.
- Admin operations now include a dedicated `/admin/orders` section with search/filter controls, pending/fulfilled status actions, and direct internal note capture for order comments.
- Team order-created email notifications now support admin-configurable templates via `/admin/email-templates`, with placeholder-driven subject/text/html customization and existing fallback defaults retained.
- Phase parity reconciliation completed for blueprint phases 1-18 with evidence in `DOC/PROJECT PLAN/ecommerce-blueprint-phase-parity-closure-2026-07-11.md`.
- Transactional hardening slice delivered: order idempotency-key dedupe, stock-aware oversell guard, Stripe webhook duplicate-event guard, and refund analytics instrumentation.
- Invoice/operator parity slice delivered: invoice schema + domain lifecycle (`create/send/mark-paid/get`), non-Stripe checkout auto-invoice issuance, admin invoice send/paid APIs, and admin order invoice payload wiring.
- Release evidence refreshed with passing `typecheck`, `test:unit` (including `orders.test.ts` and `invoices.test.ts`), `test:integration`, and full `health:check` including release-gates e2e (8/8); rerun completed after stale concurrent Next build lock cleanup.
- Supabase normalized migration is now executed successfully with shared pooler connection (`npm --prefix web run db:migrate`).
- Migration compatibility fix applied: `cart_items` expression-based uniqueness was moved from invalid table constraint syntax to a valid expression unique index in `web/supabase/schema.sql`.
- Post-migration verification confirms required normalized tables are present (`node web/scripts/verify-supabase-tables.mjs` => `FOUND 19`, `MISSING 0`).

Reference implementation tracker:

- `DOC/PROJECT PLAN/Tasks/tasks.md` is the active execution source for implementation-specific phase/task state in this repository.

## Backlog Format

Use this block for every future executable task:

```md
### Task: <short title>

Status: Planned | In Progress | Blocked | Done
Phase: <phase number and name>
Owner: Frontend | Backend | Full stack | QA | Security | DevOps | Product
Source docs:
- `<path>`

Deliverables:
- <specific output>

Acceptance criteria:
- <observable requirement>

Validation:
- <command or review gate>

Risks:
- <risk and mitigation>
```

## Current Blockers

- No active Supabase migration credential blocker remains in this execution environment.
- Future application work must choose concrete platform services for payments, email, SMS, storage, search, analytics, shipping, and tax before production launch.
