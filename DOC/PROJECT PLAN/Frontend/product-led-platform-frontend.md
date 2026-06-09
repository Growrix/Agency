# Product-Led Platform Frontend Plan

## Purpose
Translate `DOC/PROJECT PLAN/product-led-platform-gap-e2e-plan.md` into frontend route, layout, component, and UX implementation work.

## Current Frontend Baseline
- Existing public routes cover homepage, services, pricing, portfolio, blog, FAQ, contact, booking, live chat, AI concierge, HTML business profiles, shop, checkout, and admin.
- Existing commerce surface is `/shop` and `/shop/[slug]`, not the master-plan `/products` hierarchy.
- Product detail pages already show preview media, highlights, includes, stack, live preview, checkout CTA, gallery, and related products.
- Checkout creates orders and hands off to Stripe when configured, but it does not complete a customer dashboard/download journey.
- Admin dashboard shell exists and can be reused for customer dashboard structure only if visual separation is maintained.

## Target Route Model
- Add canonical product routes:
  - `/products`
  - `/products/[slug]`
  - `/products/category/[category]`
  - `/products/bundles`
  - `/products/free`
- Preserve compatibility routes:
  - `/shop` should either redirect to `/products` or render the same catalog until SEO migration is approved.
  - `/shop/[slug]` should either redirect to `/products/[slug]` or share the same product detail component.
- Add conversion and customer routes:
  - `/success`
  - `/dashboard`
  - `/dashboard/products`
  - `/dashboard/downloads`
  - `/dashboard/orders`
  - `/dashboard/support`
  - `/dashboard/appointments`
- Add buyer-segment routes after product foundation:
  - `/solutions/for-startups`
  - `/solutions/for-local-businesses`
  - `/solutions/for-agencies`
  - `/solutions/for-saas-founders`

## UX Redesign Requirements
- Homepage must shift from agency-first copy to product-led studio positioning:
  - Primary CTA: Browse Products.
  - Secondary CTA: Book a Free Consultation.
  - Supporting actions: Need Custom Work, WhatsApp, Ask AI Assistant.
- Product index should behave like a marketplace but keep premium studio restraint:
  - filters by category, type, industry, price tier, free/paid, bundle, and buyer intent.
  - no generic Amazon-style clutter.
- Product detail must include:
  - product hero and demo/preview.
  - Standard, Premium, Done-For-You tier cards.
  - feature comparison table.
  - setup/customization upsell.
  - FAQ and related products/services.
  - WhatsApp CTA with product-specific prefilled message.
- Services pages should cross-link to related product templates and customization packages.
- Dashboard should feel like a lightweight customer portal, not the internal admin dashboard.

## Reuse Targets
- Reuse `ShopProductCard`, `ProductPreviewSurface`, product gallery, previewable image frame, primitives, CTA bands, pricing cards, process steps, AI modal, and dashboard shell patterns.
- Refactor product detail into reusable sections instead of duplicating `/shop/[slug]` and `/products/[slug]`.
- Reuse checkout client flow but adapt it for selected variant, success redirect, account prompt, and dashboard link.

## Required Frontend Gaps
- Product variant selector and tier comparison UI.
- Bundles and free-product listing UI.
- Success page with order status, account/login prompt, and next action.
- Customer dashboard route group and navigation.
- Download list and signed-download action states.
- Support request entry point from dashboard.
- Tracked WhatsApp CTA helper.
- Product-led empty, loading, error, and permission states.

## Implementation Sequence
1. Create shared product view model and route compatibility plan.
2. Extract current shop detail sections into reusable product components.
3. Add `/products` routes while preserving `/shop` behavior.
4. Add variant/tier UI and Done-For-You upsell.
5. Add `/success` and customer dashboard shell.
6. Add downloads/order history surfaces after API contracts exist.
7. Add solutions pages after content structure is approved.
8. Run responsive, accessibility, and regression checks against `/shop`, `/products`, `/checkout`, and `/dashboard`.

## Exit Criteria
- A visitor can browse products, open a product detail page, compare tiers, start checkout, land on success, and reach a dashboard path.
- Existing `/shop` links do not break.
- Product pages generate leads through Done-For-You, WhatsApp, AI, booking, and contact paths.
- Mobile layouts remain app-like and do not overlap or overflow.