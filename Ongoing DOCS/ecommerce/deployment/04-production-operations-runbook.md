# Production Operations Runbook

Document status: active operations contract
Owner: DevOps, security, support, operations, engineering

## Purpose

Define launch, monitoring, alerting, reconciliation, incident response, rollback, backup, and support procedures required for production ecommerce operations.

## Production Readiness Gates

- Provider decisions are complete and linked from `integrations/05-provider-decision-matrix.md`.
- Database migrations, backups, restore drill, and rollback plan are verified.
- Payment, webhook, email, storage, search, shipping, tax, and analytics health checks are observable.
- P0 E2E scenarios pass.
- Critical alerts route to named owners.
- Support has admin access, runbooks, and escalation paths.

## Service Level Objectives

| Area | Target |
| --- | --- |
| Storefront availability | 99.9 percent monthly target after launch. |
| Checkout API availability | Higher priority than non-critical admin/reporting routes. |
| Checkout submit latency | Project-defined budget with alert on sustained degradation. |
| Payment webhook processing | Alert on repeated failures or queue backlog. |
| Notification delivery | Retry and alert on dead-letter growth. |
| Search freshness | Alert when index lag exceeds configured threshold. |

## Required Alerts
- Checkout error-rate spike.
- Payment webhook verification failure spike.
- Payment provider amount/currency mismatch.
- Duplicate idempotency conflict spike.
- Inventory oversell or negative-stock attempt.
- Notification dead-letter growth.
- Queue backlog/worker failure.
- Search index stale beyond threshold.
- Storage upload failure spike.
- Admin privilege/role change.
- Secrets/configuration change.
- Backup failure or restore drill failure.

## Reconciliation Jobs

| Job | Purpose | Frequency |
| --- | --- | --- |
| Payment reconciliation | Compare orders/payments/transactions/provider records. | Daily or more often during launch. |
| Refund reconciliation | Confirm provider refunds match internal refunds. | Daily. |
| Inventory reconciliation | Compare reserved/available stock and expired reservations. | Hourly/daily by scale. |
| Notification retry | Retry failed transactional messages. | Queue-driven plus scheduled sweep. |
| Search reindex verification | Detect stale/missing catalog index records. | Scheduled. |
| Invoice overdue sweep | Mark/send reminders for overdue invoices. | Daily. |
| Support SLA sweep | Escalate old tickets/returns. | Hourly/daily by SLA. |

## Incident Runbooks

### Checkout Down
1. Confirm storefront, API, database, payment, tax, shipping, and queue health.
2. Disable affected provider or payment method through feature flag when safe.
3. Preserve carts and checkout drafts.
4. Post operator note and support guidance.
5. Run incident review with root cause, customer impact, and prevention task.

### Payment Webhook Failure
1. Stop fulfillment release for affected payment method if payment trust is unclear.
2. Verify provider dashboard status and webhook secret/config.
3. Replay provider events where supported.
4. Reconcile internal payments/transactions/orders.
5. Log incident and customer-support impact.

### Inventory Oversell Risk
1. Pause affected SKU/product purchase if needed.
2. Reconcile stock, reservations, orders, and adjustments.
3. Contact impacted customers if promise cannot be met.
4. Correct stock through audited adjustment.

### Notification Failure
1. Confirm provider status and credentials.
2. Retry queued messages.
3. Use fallback channel/manual support for critical order/payment messages.
4. Keep orders valid; do not roll back successful commerce state.

## Backup And Restore
- Backups must cover database, storage metadata, provider configuration references, and critical settings.
- Restore drills must prove orders, payments, inventory, users, audit logs, and templates recover correctly.
- Backup access is restricted and audited.
- Restore steps must identify data loss window and customer/support communication plan.

## Rollback Rules
- Application rollback must not roll back completed payments/orders without reconciliation.
- Database migration rollback requires compatibility plan for already-written production data.
- Provider configuration rollback must verify webhook URLs/secrets and event delivery.
- Feature flags should isolate risky checkout/payment/provider changes.

## Acceptance Criteria

- Production support can detect, triage, and recover critical ecommerce failures.
- Reconciliation jobs catch payment, refund, inventory, invoice, notification, and search drift.
- Backup/restore and rollback procedures are documented before launch.
