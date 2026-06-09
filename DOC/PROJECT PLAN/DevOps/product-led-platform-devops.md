# Product-Led Platform DevOps Plan

## Purpose
Define environment, rollout, integration, and release operations for the product-led platform enhancement.

## Current DevOps Baseline
- Next.js public app deploys from `web/`.
- Sanity Studio is isolated under `studio/` with separate runtime expectations.
- CI/build scripts exist for lint, build, and tests.
- Supabase, Sanity, Resend, Stripe, and OpenAI environment variables are partially defined.

## Required Environment Variables
- Payments:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - optional later Lemon Squeezy keys after decision record.
- Supabase:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Storage:
  - Supabase Storage bucket names or future S3 variables.
- Resend:
  - `RESEND_API_KEY`
  - `CONTACT_FROM_EMAIL`
  - template sender config.
- Lark:
  - `LARK_WEBHOOK_URL`
  - optional signing secret if used.
- App:
  - `NEXT_PUBLIC_SITE_URL`
  - `AUTH_JWT_SECRET`
  - rate-limit knobs.

## Rollout Strategy
1. Documentation and contract update.
2. Add schema migrations in a non-destructive sequence.
3. Add product routes behind compatibility with `/shop`.
4. Add variant checkout while keeping manual fulfillment fallback.
5. Add private downloads for test products only.
6. Add customer dashboard after signed download tests pass.
7. Add Lark/Resend notifications with failure-safe logging.
8. Promote canonical `/products` after regression and SEO checks.

## Operational Runbooks Needed
- Supabase migration and rollback.
- Supabase Storage bucket setup and signed URL verification.
- Stripe webhook setup and replay testing.
- Lark webhook setup and test notification.
- Resend domain/template verification.
- Product file publishing checklist.
- `/shop` to `/products` SEO migration checklist.

## Observability Requirements
- Track checkout started/completed/failure.
- Track download generation and failures.
- Track Lark/Resend send failures.
- Track webhook failures and signature failures.
- Track lead priority aging and hot-lead response time.

## Exit Criteria
- Product-led rollout can be deployed, verified, and rolled back without data loss.
- All new secrets are documented and server-only.
- Studio remains isolated from public app deploy lifecycle.