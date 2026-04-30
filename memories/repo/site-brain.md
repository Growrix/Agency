# Growrix OS Site Brain Memory

Last updated: 2026-04-30
Scope: Agency monorepo current implemented surface snapshot.

## Purpose

This file is the repository memory anchor for AI agents.
Update this file whenever major site structure, content ownership, or operational flows change.

## Runtime Baseline

- Workspace root Node: 20
- Web app runtime: >=20 <25
- Studio runtime: 20.x
- Web and Studio are isolated apps and should not share install/deploy pipelines.

## Web Surface Snapshot

### Public Pages

- /
- /about
- /additional-services
- /ai-concierge
- /blog
- /blog/[slug]
- /book-appointment
- /checkout
- /contact
- /faq
- /live-chat
- /portfolio
- /portfolio/[slug]
- /pricing
- /privacy-policy
- /services
- /services/[slug]
- /shop
- /shop/[slug]
- /terms-of-service
- /not-found

### Admin Pages

- /admin
- /admin/activity
- /admin/catalog
- /admin/login
- /admin/pipeline

### API Routes

System:
- /api/contact
- /api/health
- /api/preview
- /api/preview/disable
- /api/ready
- /api/revalidate

V1 Public and Auth:
- /api/v1/ai-concierge
- /api/v1/ai-concierge/[sessionId]
- /api/v1/appointments
- /api/v1/appointments/[appointmentId]
- /api/v1/auth/login
- /api/v1/auth/logout
- /api/v1/auth/register
- /api/v1/chat/start
- /api/v1/contact
- /api/v1/newsletter
- /api/v1/observability/errors

V1 Domain:
- /api/v1/portfolio
- /api/v1/portfolio/[slug]
- /api/v1/services
- /api/v1/services/[serviceId]
- /api/v1/shop/categories
- /api/v1/shop/products
- /api/v1/shop/products/[productSlug]

V1 Orders and Customer Self-Service:
- /api/v1/orders
- /api/v1/orders/[orderId]
- /api/v1/orders/[orderId]/download
- /api/v1/orders/webhook
- /api/v1/me
- /api/v1/me/appointments
- /api/v1/me/orders
- /api/v1/me/update

V1 Admin Operations:
- /api/v1/admin/analytics
- /api/v1/admin/appointments
- /api/v1/admin/inquiries
- /api/v1/admin/orders
- /api/v1/admin/portfolio
- /api/v1/admin/products
- /api/v1/admin/services

## CMS Snapshot (Sanity Studio)

### Content Types

- author
- blogPost
- category
- caseStudy
- portfolioCategory
- servicePage
- shopCategory
- shopItem
- siteSettings

### Current Editorial Grouping

- Blog: author, category, blogPost
- Portfolio: portfolioCategory, caseStudy
- Shop: shopCategory, shopItem
- Other: servicePage, siteSettings

## Key Server Modules

- Auth: web/src/server/auth
- AI concierge: web/src/server/ai
- Sanity data adapters: web/src/server/sanity
- Domain catalog logic: web/src/server/domain/catalog.ts
- Persistence layer: web/src/server/data
- Observability and security helpers: web/src/server/logging, web/src/server/security

## Content Ownership Memory

- CMS-first surfaces: blog, portfolio, shop, key homepage sections, and service content.
- Placeholder catalog records must not leak to public listing routes.
- Shop Spotlight on homepage must exclude Live SaaS products and remain templates-focused.
- Live SaaS homepage section must remain filtered to live-saas category.

## Future Update Checklist

When site content changes, update this file in this order:

1. Route additions/removals (public, admin, API)
2. CMS schema additions/removals
3. Content ownership rules (code-authored vs CMS-authored)
4. Runtime/Node policy changes
5. Release or operational constraints that agents must enforce
