# Ecommerce Suite Map

Document status: canonical map
Last updated: 2026-07-05

## Purpose

This file maps the full ecommerce documentation suite. It is the navigation source for humans, AI agents, and MCP context retrieval.

## Architecture Chain

```text
Intake -> Handbook -> Blueprint -> MCP Docs -> Database -> API -> Frontend -> Backend -> Auth -> Execution
```

## Suite Rules

- Read the smallest domain file that owns the decision before editing a downstream contract.
- Do not duplicate source-of-truth decisions across documents; cross-reference the owner instead.
- If a technical file changes a behavior, update the matching handbook or blueprint rule.
- If a phase task changes scope, update `execution/tasks.md` after the source docs are updated.

## Canonical Inventory

Target document count: 72 markdown files after the flow-spec layer upgrade.

### Root

- `README.md` - operating manual and suite index.
- `00-suite-map.md` - canonical map, ownership, and read order.

### Handbook

- `handbook/01-business-model.md` - commerce model, buyer types, value proposition.
- `handbook/02-marketplace-vs-single-vendor.md` - vendor model decision and future marketplace path.
- `handbook/03-customer-journey-and-sales-funnel.md` - acquisition, conversion, retention, support journey.
- `handbook/04-revenue-product-and-pricing-model.md` - pricing, subscriptions, bundles, upsells.
- `handbook/05-store-operations-and-user-roles.md` - operational responsibilities and staff roles.
- `handbook/06-shipping-tax-coupons-inventory-returns.md` - policy logic for fulfillment and commercial adjustments.
- `handbook/07-payment-workflow-and-risk-policy.md` - payment lifecycle, fraud, refunds, chargebacks.

### Blueprint

- `blueprint/01-e2e-system-blueprint.md` - full ecommerce system overview.
- `blueprint/02-domain-map.md` - bounded contexts and dependencies.
- `blueprint/03-feature-matrix.md` - feature coverage by user surface and phase.
- `blueprint/04-role-permission-capability-map.md` - role capabilities across store, customer, and admin.
- `blueprint/05-ai-mcp-single-source-context.md` - MCP retrieval and AI agent usage rules.

### Architecture

- `architecture/01-high-level-architecture.md` - runtime layers and external services.
- `architecture/02-module-boundaries.md` - ownership, dependencies, and anti-coupling rules.
- `architecture/03-data-and-request-flows.md` - common sequence flows and state transitions.
- `architecture/04-environments-and-runtime-strategy.md` - local, staging, production, workers, queues.

### Frontend

- `frontend/01-storefront-and-navigation.md` - app shell, navigation, public route map.
- `frontend/02-public-marketing-pages.md` - home, about, contact, policy, blog, careers, affiliates.
- `frontend/03-product-discovery-and-search.md` - categories, brands, collections, filters, sort, search.
- `frontend/04-product-detail-reviews-wishlist.md` - PDP, reviews, Q&A, compare, wishlist, related products.
- `frontend/05-cart-checkout-order-success.md` - cart, checkout, address, shipping, payment, success/failure.
- `frontend/06-customer-and-admin-dashboards.md` - customer account and admin management surfaces.

### Backend

- `backend/01-services-overview.md` - service map and transaction boundaries.
- `backend/02-user-profile-address-service.md` - customer identity-adjacent business data.
- `backend/03-product-catalog-service.md` - products, variants, categories, brands, SEO.
- `backend/04-inventory-warehouse-service.md` - warehouses, reservations, stock, suppliers.
- `backend/05-cart-checkout-service.md` - cart merge, totals, validation, inventory locks.
- `backend/06-order-payment-shipping-service.md` - orders, payments, refunds, fulfillment, tracking.
- `backend/07-review-coupon-notification-analytics-service.md` - engagement and operations services.

### Flow Specs

- `flows/01-checkout-flow-spec.md` - complete cart, checkout, order placement, payment/manual order, success/failure, and recovery behavior.
- `flows/02-admin-order-management-flow.md` - admin order queue, detail, actions, notes, invoice, refunds, fulfillment, and audit behavior.
- `flows/03-customer-account-flow.md` - dashboard, order detail, invoice, return, support, address, and session behavior.

### State Machines

- `state-machines/01-order-payment-fulfillment-states.md` - cart, checkout, inventory reservation, order, payment, invoice, shipment, refund/return, and notification states.

### Admin Operations

- `admin/01-admin-permissions-and-screens.md` - exact admin screens, permissions, UI states, and operational actions.

### Auth

- `auth/01-auth-overview.md` - auth architecture and account states.
- `auth/02-registration-email-verification-otp.md` - signup and verification flows.
- `auth/03-login-session-jwt-refresh.md` - session, token, device, refresh behavior.
- `auth/04-password-reset-social-login-rbac.md` - reset, social identity, 2FA, roles, permissions.

### Database

- `database/01-erd-overview.md` - entity groups and ownership.
- `database/02-commerce-catalog-schema.md` - products, categories, brands, variants, media.
- `database/03-customer-auth-cart-schema.md` - customers, profiles, sessions, carts, addresses.
- `database/04-order-payment-inventory-schema.md` - orders, payments, inventory, coupons, refunds.

### API

- `api/01-api-standards.md` - versioning, errors, auth, pagination, idempotency.
- `api/02-auth-customer-api.md` - auth and customer account endpoints.
- `api/03-product-catalog-search-api.md` - catalog, search, filters, recommendations.
- `api/04-cart-checkout-payment-api.md` - cart, checkout, totals, payment, webhook contracts.
- `api/05-orders-admin-webhook-api.md` - orders, returns, admin, webhooks.
- `api/06-detailed-request-response-contracts.md` - detailed cart, checkout, order, admin, refund, invoice, and webhook request/response contracts.

### Integrations

- `integrations/01-payments.md` - Stripe, SSLCommerz, PayPal, COD, refunds.
- `integrations/02-email-sms-whatsapp.md` - transactional and marketing messaging.
- `integrations/03-storage-media-search.md` - Cloudinary/S3 media and search engines.
- `integrations/04-shipping-tax-analytics-reviews.md` - fulfillment, tax, analytics, reviews.

### Security

- `security/01-threat-model.md` - assets, actors, attack surfaces, controls.
- `security/02-auth-session-token-security.md` - credentials, JWT, refresh, OTP, 2FA.
- `security/03-input-data-api-security.md` - validation, rate limits, CORS, CSP, injection defenses.
- `security/04-payment-webhook-fraud-compliance.md` - payment risk, audit, privacy, compliance.

### Deployment

- `deployment/01-environments-ci-cd.md` - environment promotion and pipeline gates.
- `deployment/02-secrets-monitoring-logging.md` - secrets, observability, incident visibility.
- `deployment/03-scaling-cache-cdn-backups.md` - scale, cache, CDN, jobs, backups.

### Testing

- `testing/01-test-strategy.md` - test pyramid, ownership, fixtures, release posture.
- `testing/02-unit-integration-api-e2e.md` - behavior coverage by layer.
- `testing/03-accessibility-performance-security-release-gates.md` - non-functional gates.
- `testing/04-e2e-scenario-matrix.md` - P0/P1/P2 customer, checkout, admin, permission, and non-functional e2e scenarios.

### Fixtures

- `fixtures/01-ecommerce-test-data.md` - deterministic data required for complete ecommerce unit, integration, API, and E2E validation.

### Analytics

- `analytics/01-event-taxonomy-and-commerce-metrics.md` - event names, revenue, product metrics.
- `analytics/02-funnels-retention-dashboards-ai-measurement.md` - funnels, retention, AI feature metrics.

### Rules, Patterns, Templates, Execution

- `rules/01-suite-rules.md` - documentation, naming, ownership, security, UI, MCP rules.
- `patterns/01-document-patterns.md` - reusable patterns for feature, API, database, service, ADR docs.
- `templates/01-implementation-templates.md` - fill-in templates for implementation planning.
- `execution/tasks.md` - canonical phase tracker, gates, dependencies, and acceptance criteria.

## Dependency Order

1. Handbook decisions define what the business allows.
2. Blueprint files define what the platform must support.
3. Architecture defines how modules interact.
4. Database defines persistent ownership.
5. API defines contracts between callers and services.
6. Flow specs and state machines define exact multi-step behavior and allowed transitions.
7. Frontend and backend define implementation responsibilities.
8. Auth and security define access and protection rules.
9. Fixtures and testing define proof that the e2e behavior works.
10. Deployment and analytics define readiness.
11. Execution turns approved contracts into phase tasks.

## Change Control

When changing a domain:

1. Update the owning domain document.
2. Update any downstream contract that depends on it.
3. Update `execution/tasks.md` when phase scope, priority, or acceptance changes.
4. Validate that all edited files remain inside `Ongoing DOCS/ecommerce`.
