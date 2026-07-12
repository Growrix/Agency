# Auth Hardening RBAC CSRF

Document status: active security implementation contract
Owner: Security, backend, frontend, QA

## Purpose

Lock the authentication, authorization, session, CSRF, step-up, and route-protection behavior required for production ecommerce.

## Auth Architecture Decision

Default contract:
- Server-side session record remains the revocation source.
- Browser access uses secure HTTP-only cookies or an equivalent secure provider session.
- Refresh/session rotation is required for long-lived sessions.
- External identity providers are allowed only behind the same user, role, permission, and ownership contract.

If the project uses Clerk, Auth.js, Supabase Auth, custom JWT, or another provider, the implementation must map provider sessions into this contract and document deviations in `execution/tasks.md`.

## Route Protection Matrix

| Surface | Auth requirement | Authorization requirement |
| --- | --- | --- |
| Public storefront | Public | Published resources only. |
| Cart | Guest or customer | Cart token/user ownership. |
| Checkout | Guest or customer | Cart/checkout ownership. |
| Customer dashboard | Customer | Current user's resources only. |
| Admin dashboard | Staff/admin | Permission per screen/action. |
| Webhooks | Provider signature | No customer session; provider trust controls. |
| Server jobs | Service identity | Least-privilege service role. |

## RBAC Matrix

| Role | Baseline permissions |
| --- | --- |
| Customer | Own profile, addresses, orders, tickets, sessions. |
| Support | Read assigned/customer support context, add notes, update tickets. |
| Manager | Manage products, inventory, orders, coupons, returns, reports. |
| Admin | Manage settings, roles, providers, templates, all operations. |
| Super admin | Break-glass/admin bootstrap actions with strict audit. |

## CSRF Rules
- Cookie-authenticated POST/PATCH/DELETE requests require CSRF protection.
- SameSite cookies, origin checks, and CSRF token validation must align.
- Webhooks do not use CSRF; they use provider signature validation.
- Public form endpoints require rate limiting and bot abuse controls.

## Step-Up Authentication
Require recent authentication or 2FA challenge for:
- Changing password/email.
- Adding/removing privileged roles.
- Viewing/exporting sensitive customer data.
- Changing payment, tax, shipping, provider, or webhook settings.
- Creating manual refunds/store credit over configured threshold.
- Rotating secrets or admin bootstrap actions.

## Session Security
- Refresh token reuse triggers session revocation and security event.
- Logout revokes the server-side session path.
- Password reset revokes risky sessions.
- Staff sessions have shorter lifetime than customer sessions.
- Device/session list is visible to the account owner.

## Ownership Enforcement
- Check authentication before protected resource load.
- Check ownership after resolving resource owner.
- Use safe 404 for resources where revealing existence is risky.
- Never trust client-supplied user IDs for ownership.

## Required Tests
- Customer cannot access another customer's order, invoice, address, ticket, or session.
- Admin action without permission returns 403 and writes security log where appropriate.
- CSRF missing/invalid token rejects cookie-authenticated mutations.
- Webhook signature failure rejects without state change.
- Staff step-up is required for sensitive settings/refund/role operations.
- Revoked session cannot refresh or access protected APIs.

## Acceptance Criteria

- Auth provider implementation maps clearly to the suite contract.
- RBAC, CSRF, ownership, session revocation, and step-up behavior are explicit and testable.
- Protected customer/admin surfaces fail closed.
