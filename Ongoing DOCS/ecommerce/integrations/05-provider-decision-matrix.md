# Provider Decision Matrix

Document status: active integration decision contract
Owner: Architecture, DevOps, finance, operations, security

## Purpose

Remove provider ambiguity before implementation. Every production ecommerce build must choose concrete providers, fallback behavior, environment variables, webhooks, observability, and test mocks before launch work starts.

## Decision Rule

If a project has no special market, compliance, or budget constraint, use the baseline V1 provider stack below. Any deviation must be recorded in the project implementation plan and linked from `execution/tasks.md`.

## Baseline V1 Provider Stack

| Domain | Baseline provider | Fallback/manual path | Required before launch |
| --- | --- | --- | --- |
| Card/wallet payments | Stripe Payment Intents or Checkout Sessions | Manual/offline payment marker | Webhooks, idempotency, refund, dispute, sandbox/live separation. |
| Regional payments | SSLCommerz where Bangladesh/regional coverage is required | Manual invoice/payment confirmation | Signature validation, redirect validation, reconciliation. |
| PayPal wallet | PayPal Checkout when target buyers require it | Disabled until configured | Capture validation, webhook reconciliation. |
| Cash/manual payment | Internal COD/manual payment workflow | Admin mark-paid permission | Fraud rules, audit log, reconciliation report. |
| Email | Resend | SMTP provider | Domain authentication, template preview, retry/dead-letter logs. |
| SMS | Twilio or equivalent | Disabled until consent/provider configured | Consent, opt-out, cost limits, logs. |
| WhatsApp | Approved WhatsApp Business API provider | Disabled until approved | Template approval, consent, rate limits. |
| Storage/media | S3-compatible storage or Cloudflare R2 | Local/dev storage only outside production | Signed uploads/downloads, CDN, malware/file validation. |
| Image transforms | Cloudinary or app image pipeline | Original image fallback | Size limits, alt text, responsive variants. |
| Search | Postgres search for small catalogs; Typesense/Meilisearch for advanced search | Database fallback | Reindex job, stale index recovery, facet parity. |
| Shipping/rates | Shippo, EasyPost, carrier API, or manual rates | Manual shipping table | Rate validation, label/tracking, provider failure behavior. |
| Tax | TaxJar, Stripe Tax, Avalara, or manual tax rules | Fail-safe manual tax policy | Product tax classes, address rules, stored snapshots. |
| Analytics | GA4 plus PostHog/Plausible where product analytics is required | Server-side event log | Consent, server-side order events, PII redaction. |
| Error monitoring | Sentry or equivalent | Structured logs and alerts | Request IDs, release tags, alert routing. |

## Provider Adapter Requirements

Every provider integration must expose:

- A domain interface owned by the application, not the provider SDK.
- Environment-specific credentials.
- Sandbox/test mode and production mode separation.
- Retry and timeout policy.
- Idempotency behavior for mutations and callbacks.
- Safe logging that excludes secrets, raw tokens, and sensitive provider payloads.
- Mock/fake adapter for automated tests.
- Operational dashboard or log query for support.

## Environment Variables

Each selected provider must document:

- Public client variables, if any.
- Server-only secrets.
- Webhook signing secrets.
- Callback/redirect URLs.
- Feature flags for enabling/disabling provider flows.
- Test credentials and sandbox identifiers.

## Launch Blockers

Production launch is blocked when:

- A payment provider is selected without verified webhook handling.
- Email templates can send without retry/dead-letter visibility.
- Storage accepts user/admin uploads without validation and access policy.
- Search is enabled without reindex/recovery plan.
- Tax or shipping provider failure can create impossible customer promises.
- Analytics sends customer PII without consent and redaction controls.

## Acceptance Criteria

- Every external service has a chosen provider, fallback, environment variables, mock adapter, and failure policy.
- Provider decisions are linked from implementation tasks before code work begins.
- Production readiness checks include webhook, retry, logging, alerting, and reconciliation validation for selected providers.
