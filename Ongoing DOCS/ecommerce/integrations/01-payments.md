# Payments Integration

Document status: integration contract
Owner: Payments and security

## Purpose

Define provider integration rules for Stripe, SSLCommerz, PayPal, cash on delivery, refunds, and payment webhooks.

## Provider Modes

| Provider | Use cases | Required controls |
| --- | --- | --- |
| Stripe | Cards, wallets, payment intents, refunds | Webhook signature, idempotency, sandbox/live separation. |
| SSLCommerz | Regional payment methods | Signature verification, redirect validation, reconciliation. |
| PayPal | Wallet payments | Provider order capture validation, webhook reconciliation. |
| Cash on delivery | Offline collection | Fraud rules, delivery confirmation, manual reconciliation. |

## Integration Rules

- Internal order state is the source of truth; providers are reconciliation inputs.
- Webhooks must be signature-verified, idempotent, and logged.
- Payment amount and currency must match the order before fulfillment.
- Refunds require original transaction linkage and audit logs.
- Provider secrets must never appear in frontend code or documentation.

## Required Events

- `payment.intent.created`
- `payment.succeeded`
- `payment.failed`
- `payment.refund.requested`
- `payment.refund.completed`
- `payment.dispute.opened`

## Acceptance Criteria

- Payment providers can be swapped behind a payment service contract.
- Duplicate callbacks cannot duplicate orders, transactions, or refunds.
- Finance can reconcile orders, payments, refunds, disputes, and provider IDs.
