# Product-Led Platform Security Plan

## Purpose
Define security controls for product-led commerce, private downloads, customer dashboard, lead data, and admin operations.

## Current Security Baseline
- Admin auth and protected admin routes exist.
- Request validation, rate limiting, honeypot checks, audit logging, and analytics exist in key flows.
- Supabase `app_state` RLS has been hardened.
- Broader RBAC and ownership policies remain partial.

## New Threat Surfaces
- Private paid product downloads.
- Customer dashboard records.
- Product variant price/provider IDs.
- Webhook-driven payment confirmation.
- Lead scoring and PII-heavy lead records.
- Lark and Resend webhooks/API keys.
- Admin mutations for products, orders, downloads, leads, and service requests.

## Required Controls
- Authentication and ownership:
  - require auth for customer dashboard and downloads.
  - enforce customer ownership on orders, downloads, licenses, support, appointments.
- RLS:
  - enable RLS on every new Supabase table.
  - block direct client access to private operational tables.
- Webhooks:
  - verify Stripe signatures.
  - verify any future Lemon Squeezy signatures before processing.
- Downloads:
  - never expose raw storage paths.
  - signed URL generation must check payment status, ownership, limits, and expiry.
- Lead data:
  - treat email, phone, company, budget, urgency, and conversation summaries as PII/confidential.
  - avoid logging raw message bodies in public logs.
- Admin:
  - operation-level checks for all admin writes.
  - every mutation emits immutable audit events.
- Secrets:
  - keep Lark, Resend, Stripe, Supabase service role, OpenAI, and storage secrets server-only.

## Free Plan Security Note
- Supabase leaked password protection remains a warning on Free plan because it requires Pro.
- Compensating controls: strong password rules, rate limiting, captcha when properly configured, admin MFA where available, and audit review.

## Exit Criteria
- Security tests prove no unauthorized access to downloads, dashboard records, admin endpoints, or cross-customer order data.
- Webhook spoofing tests fail safely.
- Provider secrets are absent from client bundles and logs.