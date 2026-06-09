# Product-Led Platform Shared Contract Delta

## Purpose
Record the shared route, entity, lifecycle, and integration deltas introduced by `DOC/PROJECT PLAN/product-led-platform-gap-e2e-plan.md`.

## Positioning Contract
Growrix OS is now planned as a productized SaaS development studio plus digital product marketplace. The operating loop is:

1. Digital products create entry points.
2. Conversations convert buyers into service leads.
3. Services create case studies.
4. Case studies sell more products and services.

This replaces the narrower agency-site-only interpretation while preserving existing agency credibility surfaces.

## Route Contract Delta
- Canonical product routes to add:
  - `/products`
  - `/products/[slug]`
  - `/products/category/[category]`
  - `/products/bundles`
  - `/products/free`
- Compatibility routes to preserve during migration:
  - `/shop`
  - `/shop/[slug]`
- Customer routes to add:
  - `/success`
  - `/dashboard`
  - `/dashboard/products`
  - `/dashboard/downloads`
  - `/dashboard/orders`
  - `/dashboard/support`
  - `/dashboard/appointments`
- Buyer-segment SEO routes to add later:
  - `/solutions/for-startups`
  - `/solutions/for-local-businesses`
  - `/solutions/for-agencies`
  - `/solutions/for-saas-founders`

## Entity Contract Delta
- Product now has content and transactional halves:
  - Sanity product content: title, slug, description, screenshots, demo, FAQ, SEO, related products/services.
  - Supabase product metadata: active status, variants, provider IDs, delivery type, license and download rules.
- New required entities:
  - ProductVariant
  - Category
  - OrderItem
  - Download
  - Lead
  - LeadEvent
  - ServiceRequest
  - ConversationMessage
  - License
  - NotificationEvent

## Product Variant Contract
- Required tier names where applicable:
  - Standard
  - Premium
  - Done-For-You
- Required variant fields:
  - price, currency, includes, delivery type, license type, active status, payment provider IDs.
- Done-For-You variants may create service requests instead of instant downloads.

## Lead Conversion Contract
Every high-intent action should create or update a lead and lead event:
- product view
- demo click
- buy button click
- checkout started
- checkout completed
- customization CTA click
- WhatsApp click
- contact form submission
- booking submission
- AI qualification milestone
- download event

Lead scoring is shared backend truth, not frontend-only display logic.

## Integration Ownership Delta
- Stripe remains current payment provider.
- Lemon Squeezy is an open decision, not implemented by default.
- Resend handles transactional and funnel emails.
- Lark handles internal sales and operations notifications.
- Supabase Storage handles private product files first; S3 is a later scale option.
- Pusher is deferred unless realtime admin or chat is explicitly scoped.

## Contract Invariants
- Public product content must not be the source of payment truth.
- Transactional data must not be stored in Sanity.
- Private downloads must be server-authorized and signed.
- `/shop` compatibility must not break while `/products` is introduced.
- All new Supabase tables must use RLS from the first migration.
- Admin mutations must be auditable.

## Finalized Field Lists (Slice 1 Implementation)

The following field lists are the canonical Slice 1 backend contracts, materialized in `web/src/server/data/schema.ts` and persisted via the JSON-backed store with Supabase `app_state` fallback. Live migration to normalized Supabase tables is deferred to Slice 5; SQL in `web/supabase/schema.sql` matches these shapes.

### Lead
- `id` (string, uuid)
- `email` (string, lowercase normalized, required)
- `name`, `phone`, `company` (string, optional)
- `status` (`LeadStatus` = `new` | `engaged` | `qualified` | `customer` | `cold` | `archived`)
- `temperature` (`LeadTemperature` = `cold` | `warm` | `hot` | `customer`)
- `score` (number, cumulative event weight)
- `primary_source`, `last_source` (`LeadSource` = `contact_form` | `booking_form` | `newsletter` | `ai_concierge` | `live_chat` | `product_view` | `checkout` | `whatsapp_cta` | `service_request` | `admin_manual`)
- `last_route` (string, optional)
- `last_event_type` (`LeadEventType`, optional)
- `notes` (string, optional)
- `user_id`, `assigned_to_user_id` (string, optional)
- `related_inquiry_id`, `related_appointment_id` (string, optional)
- `related_order_ids` (string[])
- `related_service_request_ids` (string[])
- `conversation_ids` (string[])
- `created_at`, `updated_at` (ISO string)

### LeadEvent
- `id` (string, uuid)
- `lead_id` (string)
- `event_type` (`LeadEventType` = `product_view` | `demo_click` | `buy_click` | `checkout_started` | `checkout_completed` | `customization_cta` | `whatsapp_click` | `contact_form` | `booking` | `ai_qualification` | `ai_message` | `download` | `service_request` | `admin_note`)
- `score_delta` (number; canonical weights: product_view=1, demo_click=3, buy_click=5, checkout_started=10, checkout_completed=30, customization_cta=8, whatsapp_click=6, contact_form=12, booking=20, ai_qualification=15, ai_message=1, download=5, service_request=18, admin_note=0)
- `route` (string, optional)
- `source` (`LeadSource`, optional)
- `metadata` (record)
- `created_at` (ISO string)

Lead temperature is computed from cumulative score and purchase signal: any `checkout_completed` or `related_order_ids.length > 0` → `customer`; `score >= notifications.hotLeadThreshold` (default 30) → `hot`; `score >= max(10, threshold/3)` → `warm`; else `cold`. Status maps from temperature unless overridden by admin.

### ServiceRequest
- `id` (string), `request_number` (string, `SR-<base36-ts>-<rand>`)
- `lead_id` (string, optional)
- `customer_email`, `customer_name` (string, required)
- `customer_phone`, `company` (string, optional)
- `product_slug`, `product_name`, `variant_slug`, `variant_tier_name` (string, optional)
- `budget`, `timeline` (string, optional)
- `brief` (string, required, min length 20)
- `status` (`ServiceRequestStatus` = `new` | `scoping` | `in_progress` | `qa_review` | `delivered` | `cancelled`)
- `assigned_to_user_id`, `notes`, `resolution_notes` (string, optional)
- `metadata` (record)
- `created_at`, `updated_at` (ISO string)
- `completed_at` (ISO string, optional)

### NotificationLog
- `id` (string)
- `channel` (`NotificationChannel` = `lark` | `resend` | `console`)
- `kind` (`NotificationKind` = `lead_created` | `lead_hot` | `purchase_completed` | `service_request_created` | `appointment_requested` | `download_issued` | `system`)
- `status` (`NotificationStatus` = `pending` | `sent` | `failed` | `skipped`)
- `title` (string)
- `payload` (record)
- `related_lead_id`, `related_order_id`, `related_service_request_id` (string, optional)
- `error_message` (string, optional)
- `attempt_count` (number)
- `delivered_at`, `created_at` (ISO string)

### Download
- `id`, `order_id`, `user_email`, `product_slug` (string, required)
- `user_id`, `variant_slug`, `file_label` (string, optional)
- `asset_path` (string, required)
- `max_downloads` (number)
- `download_count` (number)
- `status` (`DownloadStatus` = `issued` | `expired` | `revoked`)
- `expires_at`, `last_downloaded_at`, `created_at` (ISO string)

### License
- `id`, `order_id`, `user_email`, `product_slug` (string, required)
- `user_id`, `variant_slug`, `notes` (string, optional)
- `license_key` (string)
- `license_type` (`single_site` | `team` | `agency`)
- `status` (`active` | `revoked` | `expired`)
- `issued_at`, `expires_at` (ISO string)

### Public APIs Added (Slice 1)
- `POST /api/v1/events/track` — lead event ingestion. Body: `{ email, event_type, route?, source?, name?, phone?, company?, metadata? }`. Rate-limit scope `lead-event` (60/min). Returns the standard API envelope `{ success, data, timestamp, request_id }`, where `data = { lead_id, event_id, score, temperature, status, promoted }`.
- `POST /api/v1/leads` — manual lead capture / admin note (server-authenticated paths recommended for admin_note).
- `POST /api/v1/service-requests` — DFY brief intake. Body: `{ customer_email, customer_name, brief (>=20 chars), product_slug?, variant_slug?, variant_tier_name?, budget?, timeline?, company?, customer_phone?, metadata? }`. Emits audit + Lark notification.
- `GET /api/v1/cta/whatsapp?email=…&route=…&source=…` — records a `whatsapp_click` lead event, then 302-redirects to `runtime.cta.whatsappHref`.

### Side-Effect Wiring (Slice 1)
- `contact.create` → `recordLeadEvent({ event_type: "contact_form", delta: 12 })`.
- `appointments.create` → `recordLeadEvent({ event_type: "booking", delta: 20, related_appointment_id })`.
- `ai-concierge.exchange` → optional `recordLeadEvent({ event_type: "ai_message", delta: 1, conversation_id })` when email present.
- `orders.create` (existing) wiring extended in later slices; Slice 1 leaves checkout-event emission to `/api/v1/events/track`.
- Every lead-event call is wrapped in `.catch` that writes a `*.lead_event_failed` warning audit log so lead-pipeline failures cannot break primary flows.
- `notifications.dispatchNotification` posts a Lark text-card with a 4-second `AbortController` timeout; missing webhook → `skipped`, network error → `failed`; never throws.