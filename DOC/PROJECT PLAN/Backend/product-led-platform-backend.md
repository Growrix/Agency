# Product-Led Platform Backend Plan

## Purpose
Define backend service work required to evolve Growrix OS from agency site plus shop into a product-led commerce and lead-conversion platform.

## Current Backend Baseline
- Domain modules already exist for catalog, orders, contact, appointments, conversations, newsletter, auth, logging, rate limiting, and AI concierge.
- Order creation persists a draft order and optionally creates a Stripe checkout session.
- Payment success moves orders to `intake_pending`; delivery remains manual unless an admin adds delivery URLs.
- Resend is used in contact, appointment, and newsletter paths.
- No Lark adapter exists in runtime config or domain services.
- No product variant, private download, license, lead scoring, service request, or tracked WhatsApp service exists.

## Target Backend Services
- Product service:
  - hydrate Sanity product content plus Supabase transactional product metadata.
  - expose product variants, active status, provider IDs, license rules, and delivery model.
- Checkout/payment service:
  - accept product slug plus variant ID.
  - support Stripe now; leave provider abstraction open for Lemon Squeezy later.
  - create orders and order items with provider metadata.
- Fulfillment/download service:
  - create download records after payment confirmation.
  - generate signed URLs for authorized customers.
  - enforce download limits and expiry.
- Lead service:
  - create or update leads from contact, booking, AI, WhatsApp, product pages, and service requests.
  - calculate score and priority.
- Service request service:
  - connect product customization and custom build inquiries to leads.
- Notification service:
  - centralize Resend and Lark sends.
  - never block checkout or lead capture on notification failure.
- Analytics/event service:
  - track product views, demo clicks, checkout started/completed, WhatsApp clicks, customization requests, downloads, and lead milestones.

## Reuse Targets
- Extend `orders.ts` rather than replacing it.
- Extend `catalog.ts` to merge Sanity content with Supabase product metadata.
- Reuse `contact.ts`, `appointments.ts`, `conversations.ts`, and `newsletter.ts` patterns for Resend and audit behavior.
- Reuse `observability.ts` for audit and analytics records.
- Reuse `rate-limit.ts` for new public endpoints.

## Backend Gaps
- No normalized transactional data layer beyond `app_state` fallback.
- No Lark webhook client.
- No email template registry or send-log model.
- No service request lifecycle.
- No customer dashboard domain service.
- No private file delivery or license key generation.
- No payment provider abstraction for Stripe vs Lemon Squeezy.

## Implementation Sequence
1. Add typed product variant and lead models in the data layer.
2. Add notification abstraction for Resend and Lark.
3. Extend order creation to accept variant IDs and create order items.
4. Add payment confirmation to create download/license records.
5. Add signed download generation with authorization checks.
6. Add lead scoring service and event writer.
7. Add service request creation and Lark hot-lead notification.
8. Add customer dashboard read services for orders, downloads, support, and appointments.

## Exit Criteria
- Purchases create complete order, order item, lead event, notification, and fulfillment-ready records.
- Product customization requests create leads and service requests.
- AI and WhatsApp interactions can update lead state.
- All integrations fail gracefully and emit audit/analytics entries.