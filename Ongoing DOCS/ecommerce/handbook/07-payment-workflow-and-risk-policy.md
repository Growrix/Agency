# Payment Workflow And Risk Policy

Document status: source of truth
Owner: Finance, security, operations

## Purpose

Define how money moves through the ecommerce system, how payment risk is handled, and how refunds or failed payments are resolved.

## Supported Payment Methods

- Stripe card payments.
- SSLCommerz regional payments.
- PayPal.
- Cash on delivery.
- Gift cards and store credit.
- Manual or offline payment markers for controlled admin use.

## Payment Lifecycle

```text
Checkout validation -> Payment attempt -> Authorization or capture -> Webhook confirmation -> Order paid -> Fulfillment release
```

## Risk Rules

- Payment state must be driven by trusted provider responses or verified webhooks.
- Webhooks must be idempotent and signature-verified.
- Orders must not be fulfilled until payment and fraud state allow fulfillment.
- Refunds, partial refunds, and manual adjustments require permission and audit logs.
- Cash on delivery requires separate risk handling because payment is not captured online.

## Failure States

- Payment declined.
- Payment pending.
- Payment provider timeout.
- Webhook delayed or duplicate.
- Amount mismatch.
- Chargeback or dispute.
- Refund failed.

## Data Implications

- Payments and transactions should be append-only where possible.
- Store provider IDs, amount, currency, method, status, idempotency key, and raw-safe metadata.
- Never store full card numbers or sensitive payment secrets.

## Acceptance Criteria

- Payment status can be reconciled from order, payment, transaction, webhook, and refund records.
- Duplicate payment callbacks cannot create duplicate orders or duplicate captures.
- Finance and support roles can see enough detail to resolve payment issues without accessing secrets.
