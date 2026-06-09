# Product-Led Platform Admin Dashboard Plan

## Purpose
Define admin/operator changes required to run Growrix OS as a product-led marketplace, sales pipeline, and fulfillment operation.

## Current Admin Baseline
- Existing routes: `/admin`, `/admin/activity`, `/admin/catalog`, `/admin/pipeline`.
- Dashboard shell exists and is protected by admin auth.
- Current catalog management uses JSON textareas for services, products, and portfolio.
- Pipeline view lists recent inquiries, appointments, and orders but does not support workflow actions.

## Target Admin Modules
- Products:
  - product list, filters, publish state, variant status, related content, delivery model, provider IDs.
  - sync/compare Sanity product content with Supabase variant metadata.
- Orders:
  - paid, pending, failed, refunded filters.
  - fulfillment status, delivery URL/download record visibility, refund notes.
- Downloads and licenses:
  - file mapping, signed URL audit, download count, expiry, license status.
- Leads:
  - new, warm, hot, high-priority queues.
  - lead score, source, intent, product, budget, urgency, assigned owner, notes.
- Service requests:
  - template customization, SaaS build, website build, SEO, MCP, automation requests.
  - statuses: new, reviewed, quoted, accepted, rejected.
- Appointments and conversations:
  - link booking and AI conversations to leads.
- Notifications:
  - Lark and Resend send status, retry visibility, failure log.
- Analytics:
  - product views, demo clicks, buy clicks, checkout started/completed, customization CTA, WhatsApp clicks, downloads.

## UX Requirements
- Replace JSON textarea editing with structured forms in phases.
- Use tables, filters, status badges, detail drawers, notes, and timelines.
- Keep repeated admin elements reusable: data table, form field group, status action control, detail drawer, timeline, assignment control, notification log panel.
- Do not expose service role credentials or provider secrets in the UI.

## Implementation Sequence
1. Add admin route map for product-led modules without removing current admin routes.
2. Add products/variants operations panel.
3. Add orders/downloads/licenses operations panel.
4. Add leads/service requests pipeline with scoring and assignment.
5. Add notification health panel for Lark and Resend.
6. Add analytics dashboard for product funnel metrics.
7. Replace JSON editors with structured forms module-by-module.

## Exit Criteria
- Admin can operate products, variants, orders, downloads, leads, service requests, and notifications without editing raw JSON.
- Every admin mutation has validation, authorization, and audit evidence.
- Pipeline exposes high-intent leads clearly enough for same-day follow-up.