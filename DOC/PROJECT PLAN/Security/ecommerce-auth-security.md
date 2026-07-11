# Security Role Plan — E-Commerce + Auth Platform

**Canonical root plan:** `DOC/PROJECT PLAN/ecommerce-auth-platform-e2e-plan.md`
**Last updated:** 2026-06-29

---

## Scope

Security constraints for new surfaces: cart, checkout payment method, invoice flow, S3 presigned URLs, admin order actions, and payment method configuration.

---

## Auth and Authorization Boundaries

| Surface | Auth requirement | Guard |
|---------|-----------------|-------|
| Cart store (client) | None (localStorage, anonymous) | Client-only; no server secrets |
| `POST /api/v1/orders` | Public (rate-limited) | Existing rate limit + bot trap |
| `POST/PATCH /api/v1/admin/orders/*` | Admin only | `requireAdminUser` |
| `GET /api/v1/admin/files`, `POST upload` | Admin only | `requireAdminUser` |
| `PATCH /api/v1/admin/downloads/[id]/asset` | Admin only | `requireAdminUser` |
| `/api/v1/me/downloads/*/signed-url` | Customer owns record | Existing ownership check in `downloads.ts` |
| `/admin/orders/**` pages | Admin session | Existing `requireAdminUser` server guard |

---

## Payment Method Configuration Security

**Problem:** Bank account numbers, Payoneer email, WU/MG recipient details are sensitive operator data. They must never be committed to git or exposed in browser bundles.

**Solution:**
- Store in `web/data/payment-methods.json` — add to `.gitignore`
- Load server-side only via `import "server-only"` module
- Never include in `NEXT_PUBLIC_` env vars
- In Vercel production: store as environment variable `PAYMENT_METHODS_JSON` (stringified JSON) and parse at runtime

**Validation:** `payment-methods.json` must not appear in git history. Add pre-commit hook check or CI lint rule.

---

## S3 Security

- **No public bucket ACLs** — all objects private
- **Presigned URLs:** 1 hour expiry for download URLs, 5 minutes for upload URLs
- **Download enforcement:** `downloads.ts` checks `max_downloads` and `status` before issuing URL — never issue URL for `expired` or `revoked` records
- **Upload access:** only admin-authenticated requests can generate upload presigned URLs
- **AWS IAM policy (minimal):** S3 credentials must have only `s3:GetObject` + `s3:PutObject` permissions on the specific bucket — no `s3:DeleteObject`, no bucket-level permissions
- **Bucket policy:** deny all public access at bucket level

---

## Invoice Security

- Invoice emails contain payment instructions — treat as sensitive. Resend delivers only to `customer_email` from the order record (already validated at order creation).
- `invoice_number` is not secret but is non-guessable (includes UUID suffix)
- Admin "Mark Paid" action is audited — `recordAuditLog` with admin user ID and timestamp
- No customer-facing invoice URL (customers see invoice details only in their dashboard)

---

## Input Validation (new surfaces)

- `payment_method` field: enum-validated server-side against `PaymentMethodType` — reject unknown values
- Cart `items[]` array: server validates each item has `product_slug` (string, non-empty), `quantity` (integer, 1–99), `unit_price_cents` (integer, ≥ 0); re-fetch price from catalog server-side to prevent price tampering
- Admin `delivery-url`: validate URL format server-side (`URL` constructor check), reject non-http(s) schemes
- S3 upload filename: sanitize — allow only `[a-z0-9._-]` characters, reject path traversal (`..`, `/`)

---

## Rate Limiting Extensions

Extend existing rate limiter for new routes:
- `POST /api/v1/orders`: keep existing 6/min per IP limit
- `POST /api/v1/admin/orders/*/invoice/send`: 5/hour per admin user (prevent accidental spam)
- `POST /api/v1/admin/files/upload`: 20/hour per admin user

---

## CSP Updates (`next.config.ts`)

No new external domains needed for the manual payment flow (Payoneer/Bank/WU are not embedded, just referenced in emails). When Stripe goes live, `https://js.stripe.com` and `https://hooks.stripe.com` will need to be added to CSP — defer until Stripe activation.

---

## Secrets Checklist (pre-launch)

- [ ] `web/data/payment-methods.json` in `.gitignore` and not in git history
- [ ] `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` only in `.env.local` and Vercel dashboard, never committed
- [ ] `SUPABASE_DB_URL` only in `.env.local` and Vercel dashboard, never committed
- [ ] `CLERK_WEBHOOK_SIGNING_SECRET` populated in Vercel production env
- [ ] S3 IAM policy restricted to minimum required permissions
- [ ] No `NEXT_PUBLIC_` env vars contain any secrets
