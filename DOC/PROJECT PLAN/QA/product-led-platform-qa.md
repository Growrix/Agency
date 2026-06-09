# Product-Led Platform QA Plan

## Purpose
Define release gates and validation coverage for the product-led Growrix OS platform enhancement.

## Critical Workflows
1. Product browsing:
   - `/products`, category filters, bundles, free products, legacy `/shop` compatibility.
2. Product detail:
   - screenshots/demo, tier selector, comparison, Done-For-You upsell, related products.
3. Checkout:
   - variant purchase, Stripe handoff, cancellation, success redirect, fallback manual order.
4. Fulfillment:
   - webhook confirmation, download record creation, signed URL generation, limits and expiry.
5. Customer dashboard:
   - login, products, downloads, orders, appointments, support.
6. Lead conversion:
   - contact, service request, WhatsApp tracking, AI qualification, booking, lead scoring.
7. Admin operations:
   - products/variants, orders, downloads, leads, service requests, notification logs.
8. Notifications:
   - Resend purchase/lead emails, Lark purchase/hot lead notifications, fallback logging.

## Test Coverage Required
- Unit tests:
  - price/variant selection, order totals, lead scoring, download eligibility, signed URL authorization, webhook verification, notification fallback.
- Integration tests:
  - product APIs, checkout create, webhook to order/download, dashboard reads, lead/service-request creation, WhatsApp event tracking, admin operations.
- E2E tests:
  - product browse to checkout to success.
  - customer login to downloads.
  - Done-For-You service request from product page.
  - admin lead/order triage.
  - legacy `/shop` path compatibility.
- Accessibility tests:
  - product tier selector, checkout, dashboard tables, admin forms, modals.
- Security tests:
  - unauthenticated dashboard/download denied.
  - cross-user order/download denied.
  - webhook signature spoof rejected.
  - admin writes denied for non-admin users.
- Performance tests:
  - homepage, product index, product detail, checkout, dashboard.

## Blocking Defects
- Payment completed but no order item or download record.
- Customer can access another customer's download/order.
- Private file path exposed to browser.
- Webhook accepted without valid signature.
- `/shop` links break without redirect or intentional replacement.
- Admin can mutate product/order/lead without audit log.
- Product page overflows or CTA text overlaps on mobile.

## Release Evidence
- `npm run lint` passes.
- `npm run build` passes.
- Unit and integration suites pass.
- Playwright critical paths pass.
- Accessibility scan passes for new public and dashboard routes.
- Security negative tests pass.
- Manual smoke confirms Supabase Storage, Stripe webhook, Resend, and Lark in target environment.

## Exit Criteria
- Product-led platform is releasable only when browse, checkout, dashboard, downloads, lead conversion, admin operations, and notification fallbacks are all validated.