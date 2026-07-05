# Data And Request Flows

Document status: architecture source
Owner: System architecture

## Purpose

Define the main ecommerce sequences that must remain consistent across frontend, API, services, database, and integrations.

## Product Discovery Flow

```text
Customer opens category/search
-> frontend requests catalog/search API
-> API validates filters and pagination
-> search/catalog service returns products, facets, sort metadata
-> frontend renders results, empty states, and SEO metadata
-> analytics records discovery event
```

## Cart Flow

```text
Customer adds item
-> API validates product and variant
-> pricing service calculates line price
-> inventory service checks availability
-> cart service writes item
-> API returns server totals
```

## Checkout Flow

```text
Cart submitted
-> checkout validates customer or guest identity
-> address, shipping, tax, coupon, inventory checks run
-> inventory reservation created
-> payment intent or COD order path starts
-> order created after payment confirmation or allowed COD state
-> notifications and analytics events dispatch
```

## Webhook Flow

```text
Provider sends webhook
-> API verifies signature
-> event idempotency key checked
-> payment transaction reconciled
-> order state updated if transition is valid
-> audit and notification events emitted
```

## Return Flow

```text
Customer requests return
-> order ownership and eligibility validated
-> return request created
-> support/admin reviews or auto-approves by policy
-> refund, exchange, replacement, or store credit path starts
-> inventory and accounting records reconcile
```

## Acceptance Criteria

- Every flow identifies validation, durable writes, and failure handling points.
- Payment and order flows are idempotent.
- Analytics and notifications consume domain events rather than guessing state.
