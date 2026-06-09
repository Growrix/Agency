# Product-Led Platform Supabase Plan

## Purpose
Plan Supabase Auth, PostgreSQL, RLS, and Storage responsibilities for the product-led Growrix OS platform.

## Current Supabase Baseline
- Supabase project: `okzrczymtlkaaxlvjnyh`.
- Current bootstrap table: `public.app_state`.
- RLS is enabled on `public.app_state`, with `anon` and `authenticated` blocked and backend service-role access allowed.
- Auth is configured for email/password.
- Leaked password protection is unavailable on the current Free plan unless the project upgrades to Pro.

## Target Supabase Responsibilities
- Auth:
  - customer accounts, admin accounts, profile ownership, dashboard access.
- PostgreSQL:
  - profiles, products metadata, product variants, categories, orders, order items, downloads, leads, lead events, service requests, appointments, conversations, messages, licenses, analytics, audit, notifications.
- Storage:
  - private product files, invoices, generated download artifacts.
- RLS:
  - enforced for all new public schema tables.
  - customers can access own records only.
  - admin operations remain server-mediated and audited.

## Storage Plan
- Create private buckets for product deliverables and generated invoices/download assets.
- Store only file paths in database records.
- Generate short-lived signed URLs through backend endpoints.
- Track download count and expiry in `downloads` table.

## Migration Plan
1. Keep `app_state` as fallback.
2. Add normalized tables with RLS enabled from the first migration.
3. Add read/write adapters per domain.
4. Backfill products and existing orders if needed.
5. Move production writes domain-by-domain.
6. Retire app-state only after zero-regression validation.

## Required Policies
- `profiles`: authenticated users read/update own profile; service role/admin manages.
- `orders` and `order_items`: customers read own; admins manage through backend.
- `downloads` and `licenses`: customers read own; signed URL endpoint performs access check.
- `leads`, `lead_events`, `service_requests`: public writes only through server endpoint; no direct client table access.
- `products`, `product_variants`, `categories`: public reads should remain server-mediated unless a view/policy is created intentionally.

## Exit Criteria
- All transactional data has normalized tables and RLS.
- Private downloads cannot be accessed by unauthenticated users or other customers.
- Supabase advisor remains free of critical RLS errors.