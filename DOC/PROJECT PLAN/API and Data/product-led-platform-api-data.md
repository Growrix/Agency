# Product-Led Platform API And Data Plan

## Purpose
Freeze the API, data ownership, and schema expansion needed for product-led commerce, downloads, customer dashboard, lead scoring, and operations.

## Current API/Data Baseline
- Existing namespace is `/api/v1/**`.
- Public shop APIs expose categories, products, and product details.
- Order APIs support create, status, download route placeholder/manual delivery, and webhook handling.
- Subscriber APIs expose current user, own orders, appointments, and profile update.
- Admin APIs expose services, products, portfolio, orders, appointments, inquiries, analytics.
- Current Supabase SQL only bootstraps `public.app_state`; application data is serialized through app-state persistence/fallback.

## Canonical Data Ownership
- Sanity owns public editable product content, service content, blog posts, case studies, product screenshots, FAQs, SEO fields, and related content.
- Supabase owns transactional records: profiles, products metadata, variants, categories, orders, order items, downloads, leads, lead events, service requests, conversations, messages, appointments, licenses, audit, analytics.
- Code owns rendering contracts, API validation, adapters, and static fallbacks.

## Required Supabase Tables
- `profiles`
- `products`
- `product_variants`
- `categories`
- `orders`
- `order_items`
- `downloads`
- `leads`
- `lead_events`
- `service_requests`
- `appointments`
- `conversations`
- `conversation_messages`
- `licenses`
- `email_events` or `notification_events`
- Preserve `app_state` during migration.

## API Additions
- Product routes:
  - `GET /api/v1/products`
  - `GET /api/v1/products/[slug]`
  - `GET /api/v1/products/categories`
  - `GET /api/v1/products/bundles`
  - `GET /api/v1/products/free`
- Checkout/payment:
  - `POST /api/v1/checkout/create`
  - `POST /api/v1/webhooks/stripe`
  - optional later: `POST /api/v1/webhooks/lemonsqueezy`
- Downloads/customer:
  - `GET /api/v1/me/downloads`
  - `POST /api/v1/downloads/[downloadId]/signed-url`
  - `GET /api/v1/me/licenses`
- Leads/conversion:
  - `POST /api/v1/leads`
  - `POST /api/v1/lead-events`
  - `POST /api/v1/service-requests`
  - `POST /api/v1/events/track`
  - `GET /api/v1/whatsapp/redirect` or `POST /api/v1/whatsapp/click`
- Admin:
  - `GET /api/v1/admin/leads`
  - `GET/PATCH /api/v1/admin/leads/[leadId]`
  - `GET /api/v1/admin/service-requests`
  - `GET/PATCH /api/v1/admin/downloads`
  - product variant CRUD under admin products.

## Migration Strategy
1. Add schema in additive migrations with RLS enabled from creation.
2. Add typed server data access while current app-state fallback remains available.
3. Backfill product metadata from current Sanity/app-state catalog.
4. Switch reads by domain, starting with products/variants and leads.
5. Switch order and download writes after integration tests pass.
6. Keep rollback path to app-state/manual fulfillment until release gate passes.

## RLS Policy Requirements
- Public users cannot directly read private transactional tables.
- Customers can read only their own profile, orders, order items, downloads, licenses, support requests, and appointments.
- Admin role can read/manage operational records through server-mediated endpoints.
- Service role can perform backend writes and migrations.
- Downloads require both ownership and paid/delivered eligibility.

## Exit Criteria
- API contracts support product variants, checkout, success, dashboard, downloads, leads, service requests, and admin operations.
- Supabase schema is normalized enough to retire app-state for transactional domains.
- RLS and tests prove no cross-customer or public private-data access.