# High Level Architecture

Document status: architecture source
Owner: System architecture

## Purpose

Define the runtime shape of the ecommerce platform and the responsibility of each layer.

## Runtime Layers

```text
Browser and mobile web
-> Next.js storefront and admin UI
-> API routes or backend gateway
-> domain services
-> database, cache, queue, search index
-> external providers
```

## Layer Responsibilities

| Layer | Owns | Must not own |
| --- | --- | --- |
| Frontend | Presentation, routing, form UX, optimistic UI, accessibility | Money, inventory, permission decisions |
| API | Request validation, auth checks, response contracts, idempotency | Provider-specific business state without services |
| Services | Business workflows, transactions, invariants, domain events | UI state or raw request coupling |
| Database | Durable facts, relationships, constraints, history | Temporary view state |
| Queue/worker | Async notifications, indexing, retries, exports | Customer-visible synchronous confirmation without fallback |
| External providers | Payments, messaging, shipping, tax, search, storage | Internal source of truth |

## Core Requests

- Product discovery reads catalog and search data.
- Cart mutation validates product, variant, inventory, and pricing state.
- Checkout validates customer, address, shipping, tax, coupon, inventory, and payment requirements.
- Payment webhooks reconcile provider state with internal orders.
- Admin mutations pass permission checks and write audit logs.

## Non-Functional Requirements

- Public pages should be cacheable where business rules allow.
- Checkout and payment routes require strong idempotency.
- Admin and customer dashboards require ownership-aware authorization.
- Search and media providers must degrade gracefully.
- Critical workflows need structured logging and trace IDs.

## Acceptance Criteria

- Every domain has a clear owner layer.
- External providers are integrations, not the system of record.
- Customer-visible transactional workflows are observable, retryable, and auditable.
