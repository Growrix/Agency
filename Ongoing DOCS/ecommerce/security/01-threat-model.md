# Threat Model

Document status: security source
Owner: Security

## Purpose

Identify ecommerce assets, actors, threats, and primary controls.

## Protected Assets

- Customer accounts and personal data.
- Admin accounts and permissions.
- Orders, invoices, addresses, and support history.
- Payment and transaction records.
- Coupons, gift cards, store credit, and reward balances.
- Inventory and fulfillment records.
- Provider secrets and webhook endpoints.
- Analytics and audit logs.

## Actors

- Anonymous visitor.
- Customer.
- Staff or admin.
- Malicious user.
- Compromised integration.
- Bot or scraper.
- Insider with excessive permissions.

## Key Threats

- Account takeover.
- Coupon/gift card abuse.
- Payment webhook spoofing.
- Order ownership bypass.
- Admin privilege escalation.
- Inventory manipulation.
- XSS, CSRF, SQL injection, SSRF, file upload abuse.
- Sensitive data exposure through logs, analytics, or exports.

## Primary Controls

- Server-side authorization and ownership checks.
- CSRF protection for cookie-authenticated mutations.
- Rate limiting and abuse detection.
- Input validation and output encoding.
- CSP and secure headers.
- Webhook signature verification.
- Audit logging for privileged actions.
- Least-privilege secrets and provider access.

## Acceptance Criteria

- Critical assets and attack paths are named.
- Controls map to each payment, auth, customer, admin, and webhook surface.
- Security gates block launch of critical workflows without mitigation.
