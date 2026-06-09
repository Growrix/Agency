# Product-Led Platform Gap E2E Plan

## 0. Artifact Metadata
- Canonical artifact path: `DOC/PROJECT PLAN/product-led-platform-gap-e2e-plan.md`
- Affected downstream role docs:
  - `DOC/PROJECT PLAN/Frontend/product-led-platform-frontend.md`
  - `DOC/PROJECT PLAN/Backend/product-led-platform-backend.md`
  - `DOC/PROJECT PLAN/API and Data/product-led-platform-api-data.md`
  - `DOC/PROJECT PLAN/Admin Dashboard/product-led-platform-admin-dashboard.md`
  - `DOC/PROJECT PLAN/Supabase/product-led-platform-supabase.md`
  - `DOC/PROJECT PLAN/Security/product-led-platform-security.md`
  - `DOC/PROJECT PLAN/DevOps/product-led-platform-devops.md`
  - `DOC/PROJECT PLAN/QA/product-led-platform-qa.md`
- Planning request source: `Ongoing DOCS/Website Plan Growrix OS/websiteplan.md`
- Planning mode: hybrid enhancement planning
- Status: canonical planning artifact, ready for implementation sequencing
- Last updated: 2026-05-23

## 1. Planning Mode And Objective

- Planning mode: hybrid.
- Why this mode fits the request: the site already has a real Next.js app, public routes, shop, checkout, admin shell, Sanity Studio, Supabase persistence, Resend-backed form emails, Stripe handoff, and AI concierge. The new master plan changes the product strategy from an agency site with a shop into a product-led marketplace and sales operating system, so the work is partly extension and partly contract redesign.
- Scope boundaries:
  - Reposition Growrix OS as a productized SaaS development studio plus digital product marketplace.
  - Convert the current `/shop` model into a marketplace-grade product surface, either by introducing `/products` as canonical or by redirecting `/shop` to `/products` after compatibility is preserved.
  - Add product variants, Done-For-You upsell, private downloads, customer dashboard, lead scoring, service requests, tracked WhatsApp events, Lark notifications, and expanded Resend automation.
  - Preserve existing CMS, Supabase, auth, admin shell, checkout, content, and conversion flows where they are usable.
- Explicit non-goals:
  - No immediate replacement of Next.js, Sanity, Supabase, or the existing dashboard shell.
  - No Amazon-style general marketplace redesign.
  - No full infrastructure migration to AWS/ECS unless later release scope explicitly requires it.
  - No Lemon Squeezy switch until payment ownership, tax handling, and delivery tradeoffs are approved.
- Current implementation compatibility requirements:
  - Keep `/shop` and `/shop/[slug]` live during migration.
  - Keep existing `/checkout`, `/api/v1/orders`, `/api/v1/admin/**`, `/api/v1/ai-concierge`, `/book-appointment`, `/contact`, and `/live-chat` compatible.
  - Keep Sanity Studio isolated from the public web app.
  - Keep Supabase RLS enabled for live database tables.

## 2. Current-State Audit

### Tracker Status
- Done:
  - Public marketing, services, blog, portfolio, shop, checkout, contact, booking, live chat, AI concierge, and admin shell routes exist.
  - Core APIs exist for services, portfolio, shop products/categories, orders, auth, me, appointments, contact, newsletter, admin catalog, admin operations, analytics, health, readiness, preview, and revalidation.
  - Sanity schemas exist for shop items, shop categories, HTML business profile templates, services, case studies, blog posts, site settings, about page, authors, and categories.
  - Supabase app-state persistence exists and RLS has been hardened for `public.app_state`.
  - Unit, integration, lint, build, and runtime readiness gates have been exercised in prior execution.
- Partial:
  - Commerce exists as order creation and Stripe handoff, but private downloads, variant pricing, success dashboard, license keys, and email delivery sequence are not complete.
  - Admin exists, but catalog editing is JSON-textarea based and operational workflows are shallow.
  - Subscriber APIs exist, but no customer-facing `/dashboard` route exists.
  - Resend is used for contact, booking, and newsletter paths, but product purchase and lead nurture sequences are not complete.
  - Lead capture exists through inquiries, appointments, and conversations, but unified leads, lead scoring, lead events, service requests, and Lark routing do not exist.
- Blocked:
  - Live leaked-password protection is plan-limited on Supabase Free and cannot be enabled without Pro.
  - Live product delivery automation depends on payment/provider and storage decisions.
- Not started:
  - `/products`, `/products/[slug]`, category pages, bundles, free products, `/success`, and customer `/dashboard/**` surfaces.
  - Supabase normalized commerce schema for products, variants, orders, order items, downloads, leads, service requests, lead events, conversations, messages, and licenses.
  - Lark notification integration.
  - Pusher/realtime support.
  - S3 or Supabase Storage private file delivery.
  - Product analytics event model beyond current generic analytics events.

### Existing Codebase Inventory
- Reusable routes:
  - Public: `/`, `/about`, `/services`, `/services/[slug]`, `/additional-services`, `/pricing`, `/portfolio`, `/portfolio/[slug]`, `/blog`, `/blog/[slug]`, `/faq`, `/contact`, `/book-appointment`, `/live-chat`, `/ai-concierge`, `/html-business-profiles`.
  - Commerce: `/shop`, `/shop/[slug]`, `/checkout`.
  - Admin: `/admin`, `/admin/activity`, `/admin/catalog`, `/admin/pipeline`, `/admin/login`.
- Reusable layouts and shells:
  - App shell, header, footer, mobile bottom nav, utility ribbon, chat launcher.
  - Dashboard shell and dashboard header controls.
- Reusable sections and components:
  - Product cards and preview surface.
  - Cards, buttons, badges, containers, section headings, motion helpers.
  - Portfolio lightbox, previewable image frame, trust/proof sections, CTA bands, pricing cards, process steps, AI concierge modal/chat.
- Reusable data/store modules:
  - `web/src/server/data/schema.ts`
  - `web/src/server/data/store.ts`
  - `web/src/server/domain/catalog.ts`
  - `web/src/server/domain/orders.ts`
  - `web/src/server/domain/contact.ts`
  - `web/src/server/domain/appointments.ts`
  - `web/src/server/domain/conversations.ts`
  - `web/src/server/domain/newsletter.ts`
- Existing API handlers and contracts:
  - `/api/v1/shop/categories`, `/api/v1/shop/products`, `/api/v1/shop/products/[productSlug]`
  - `/api/v1/orders`, `/api/v1/orders/[orderId]`, `/api/v1/orders/[orderId]/download`, `/api/v1/orders/webhook`
  - `/api/v1/contact`, `/api/v1/appointments`, `/api/v1/ai-concierge`, `/api/v1/chat/start`, `/api/v1/newsletter`
  - `/api/v1/me`, `/api/v1/me/orders`, `/api/v1/me/appointments`, `/api/v1/me/update`
  - `/api/v1/admin/**`
- Existing CMS or Studio schemas:
  - `shopItem`, `shopCategory`, `htmlBusinessProfileTemplate`, `servicePage`, `caseStudy`, `portfolioCategory`, `blogPost`, `category`, `author`, `siteSettings`, `aboutPage`.
- Existing admin/operator flows:
  - Overview metrics, activity stream, catalog JSON editing for services/products/portfolio, and pipeline read panels for inquiries/appointments/orders.
- Existing integrations already wired:
  - Supabase auth/app-state persistence.
  - Sanity CMS reads/writes and Studio.
  - Stripe checkout session and webhook handling.
  - Resend for contact/booking/newsletter paths.
  - OpenAI-backed AI concierge.
  - WhatsApp static links.

### Reuse-First Delta Map
- Reuse without changes:
  - Next.js App Router, React, TypeScript, Tailwind, existing route conventions.
  - Shared app shell, dashboard shell, primitive UI components, AI modal shell, content cards, image preview components.
  - Sanity Studio isolation and schema organization.
  - Supabase client and RLS posture.
  - Existing admin auth, audit, analytics, rate limiting, and request envelope patterns.
- Extend carefully:
  - `/shop` should become compatibility alias or legacy path for `/products`.
  - `ManagedProductRecord` should gain variants, license, delivery, free/bundle, provider IDs, and upsell metadata.
  - Orders should gain user ownership, provider abstraction, order items with variant references, download records, and success state.
  - AI concierge should write lead qualification events rather than only conversation records.
  - WhatsApp CTAs should route through a tracking endpoint before redirecting.
  - Admin catalog should move from JSON editor to structured forms over time.
- Refactor in place:
  - Product route structure, product detail layout, checkout flow, order schema, admin product management, and customer history surfaces.
  - Existing app-state store should remain fallback only while normalized Supabase tables become source of truth for transactional domains.
- Net-new additions that are truly required:
  - `/products`, `/products/[slug]`, `/products/category/[category]`, `/products/bundles`, `/products/free`.
  - `/success` and `/dashboard/**` customer surfaces.
  - Lead, lead_event, service_request, download, product_variant, license, and private file delivery modules.
  - Lark notification client and event routing.
  - Product analytics event taxonomy and first-party tracking endpoint.
- Items rejected to avoid architecture drift:
  - Building a separate marketplace app outside the current Next.js app.
  - Duplicating product data independently in Sanity and Supabase without ownership rules.
  - Adding Prisma before schema ownership and migration strategy are stable.
  - Switching to Lemon Squeezy immediately without a payment provider decision record.

## 3. Platform Decision Matrix

| Capability | Current State | Decision | Required Now / Later / Excluded | Notes |
|---|---|---|---|---|
| Next.js | App Router app exists in `web/` | Keep and extend | Required now | Add product-led routes in same app. |
| React | React 19 app exists | Keep | Required now | Reuse component model. |
| TypeScript | Strict typed modules exist | Keep | Required now | Expand domain types before UI wiring. |
| Sanity CMS | Studio plus shop/blog/service/case schemas exist | Keep for marketing/catalog content | Required now | Product content belongs here, transactions do not. |
| Supabase | Auth plus `public.app_state` persistence exists | Expand to normalized transactional DB | Required now | RLS is required on new tables. |
| PostgreSQL | Available through Supabase | Use directly through Supabase | Required now | Product transactions, leads, downloads, dashboard. |
| Prisma | Not present | Defer | Later | Consider after schema stabilizes; avoid churn now. |
| Lark | Planned, not wired | Add notification adapter | Required now for sales ops | Start with webhook notifications. |
| Resend | Used for contact/booking/newsletter | Extend to commerce and lead emails | Required now | Centralize templates and send logging. |
| Pusher | Not present | Defer unless realtime dashboard/chat is scoped | Later | Current app can poll or use server state first. |
| S3 | Not present | Choose Supabase Storage first, S3 later if needed | Required now via Supabase Storage | Private downloads can use signed URLs. |

## 4. CMS And Content Operations Plan

### Content Surfaces
- Blog: keep Sanity as source of truth with local fallback.
- Services: keep Sanity service pages, add template customization and product setup service emphasis.
- Shop/catalog: evolve `shopItem` into a product content document that supports variants, bundles, free products, related services, and setup/customization CTAs.
- Case studies/portfolio: keep Sanity case studies and add related products/services references.
- FAQ, landing pages, and static trust content: add product-led FAQ groups and buyer-segment landing pages for `/solutions`.

### Sanity Structure
- Document types:
  - Extend `shopItem` with product tier content, related products, related services, free/bundle flags, license copy, FAQ, and SEO.
  - Add or extend `landingPage` only after `/solutions` copy structure is approved.
- Field groups and validation:
  - Keep basics, commerce, content, delivery, media groups.
  - Add `variants`, `upsell`, `seo`, and `relations` groups.
- Taxonomies and references:
  - Use categories for product taxonomy and references to service pages, blog posts, case studies, and related products.
- Media model:
  - Keep screenshots/gallery in Sanity for public product proof.
  - Keep deliverable files out of Sanity; use Supabase Storage or S3.
- Slug and preview rules:
  - Canonical product route should be `/products/[slug]`.
  - `/shop/[slug]` should redirect or render the same record during migration.
- Draft, review, publish flow:
  - Use Sanity draft/publish for marketing content.
  - Use Supabase product/variant activation for transactional availability.
- Revalidation or cache invalidation model:
  - Extend existing `/api/revalidate` to product, category, bundle, free-product, and solution routes.
- Studio runtime and deployment isolation plan:
  - Keep current Studio isolation: own package, lockfile, Node policy, CI, and hosting surface.

### Editorial And Operator Workflow
- Blog posts: Sanity only.
- Services: Sanity for public content, admin for operational lead/service request status only.
- Shop content: Sanity owns public product copy, screenshots, categories, and SEO; Supabase owns purchasable variants, orders, downloads, licenses, and events.
- Portfolio and proof: Sanity owns public proof and references.
- Sanity Studio vs admin dashboard vs code:
  - Sanity Studio: marketing/catalog authoring.
  - Admin dashboard: operations, orders, downloads, leads, service requests, Lark/email status, support.
  - Code: UI, integration adapters, contracts, validation, and static fallback fixtures.

## 5. Data, Database, And Storage Plan
- Source of truth per domain:
  - Product content: Sanity.
  - Product transactional metadata: Supabase.
  - Orders/order items/payments/downloads/licenses: Supabase.
  - Leads/lead events/service requests/conversations/messages: Supabase.
  - Marketing pages/blog/case studies/services: Sanity.
- Supabase responsibilities:
  - Auth, customer profiles, orders, order items, downloads, licenses, leads, lead events, service requests, appointments, conversations, messages, audit, analytics, app-state fallback.
- PostgreSQL schema impact:
  - Add normalized tables listed in the master plan, but sequence them by phase rather than one large migration.
- Prisma decision and justification:
  - Defer Prisma. Current code uses Supabase and file fallback patterns; add typed data access modules first.
- Row-level security or access policy considerations:
  - Every new public table must have RLS enabled.
  - Public read only for published product view projections if exposed through Supabase; otherwise all public reads remain server mediated.
  - Customers may read their own orders, downloads, appointments, profile, and support requests.
  - Admins need operation-level policies and audit logs.
- File or asset storage plan:
  - Use Supabase Storage private buckets for product files and invoice/download assets first.
  - Generate signed URLs through server-only endpoints.
  - S3 remains a later option if external marketplace scale requires it.
- Data migration or backfill needs:
  - Map current `ManagedProductRecord` records to `products` and `product_variants`.
  - Backfill existing orders into `orders` and `order_items` if needed.
  - Preserve `public.app_state` until migration is verified.

## 6. Integration Plan

| Integration | Purpose | Trigger Points | Owner Surface | Fallback / Failure Mode | Notes |
|---|---|---|---|---|---|
| Lark | Internal sales and ops notifications | purchase, hot lead, service request, appointment, failed payment, support request | Backend | Log notification failure and retry/manual admin visibility | Start with webhook adapter. |
| Resend | Transactional and funnel emails | purchase, download, lead, booking, follow-up | Backend | Persist send log and retry/manual fallback | Already partly wired. |
| Pusher | Realtime admin/chat updates | admin lead queue, chat, order status | Backend/frontend | Polling fallback | Defer until ops dashboard needs realtime. |
| S3 | Large/private file delivery | downloads, invoices | Backend | Supabase Storage first | Later migration option only. |
| Payments | Checkout and payment events | checkout, webhook, refunds | Backend | Manual order follow-up when provider missing | Keep Stripe now; evaluate Lemon Squeezy separately. |
| Calendar | Appointment scheduling | booking and consultation confirmation | Backend | Record inquiry without calendar confirmation | Existing booking is inquiry-first. |

## 7. Global Site Invariants
- Reuse existing design system, layouts, primitives, and interaction patterns before adding new UI.
- Prefer extending current routes, schemas, and data modules over introducing parallel systems.
- Keep homepage strategic and product-led, not a generic marketplace grid.
- Product pages must sell three paths: Standard, Premium, and Done-For-You.
- Every high-intent CTA should either create or update a lead event.
- The common footer copyright string must be planned as:
  `© {year} {Company Name or Site Name}. All right reserved. Built & Maintenece by Growrix OS.`
- Link `Growrix OS` to `https://www.growrixos.com`.

## 8. E2E Phase Plan

### Shared Contracts
- Inputs: current Shared Contracts, master plan, code audit.
- Deliverables: update route map, entity map, lifecycle states, integration ownership.
- Reuse targets: current role model and API index.
- Entry criteria: this plan approved.
- Exit criteria: no mismatch between `/shop` legacy surface and `/products` canonical surface.
- Risks and fallback: preserve `/shop` while adding `/products` to avoid broken links.

### CMS And Content Operations
- Inputs: Sanity schemas, product catalog strategy, CMS operations plan.
- Deliverables: product content schema extensions, related products/services, product FAQ, tier copy, revalidation.
- Reuse targets: `shopItem`, `shopCategory`, `htmlBusinessProfileTemplate`.
- Entry criteria: product route and data ownership decided.
- Exit criteria: Sanity owns public copy, Supabase owns transactional state.
- Risks and fallback: keep current shop rendering until new products route is stable.

### Frontend
- Inputs: existing routes/components and product-led master plan.
- Deliverables: homepage repositioning, `/products`, product detail tier layout, `/solutions`, `/success`, `/dashboard/**`, compatibility redirects.
- Reuse targets: `ShopProductCard`, `ProductPreviewSurface`, `CheckoutExperience`, dashboard shell, AI concierge modal, primitives.
- Entry criteria: API/data contracts for variants and downloads drafted.
- Exit criteria: visitor can browse, compare tiers, purchase, see success, log in, view downloads/order history.
- Risks and fallback: keep `/shop` active as alias until SEO migration completes.

### Backend
- Inputs: current domain modules and new data contract.
- Deliverables: product variant service, checkout provider abstraction, download service, lead service, lead scoring, Lark notification service, email sequence service.
- Reuse targets: `orders.ts`, `catalog.ts`, `contact.ts`, `appointments.ts`, `conversations.ts`, `newsletter.ts`, observability.
- Entry criteria: Supabase schema and RLS plan approved.
- Exit criteria: all critical events persist and emit notifications with safe fallbacks.
- Risks and fallback: use manual fulfillment until private downloads are verified.

### API And Data
- Inputs: master plan schema, existing `DatabaseSchema`, Supabase docs.
- Deliverables: migrations for profiles, products, product_variants, categories, orders, order_items, downloads, leads, lead_events, service_requests, conversations, messages, licenses.
- Reuse targets: existing API envelope and `/api/v1` namespace.
- Entry criteria: table ownership accepted.
- Exit criteria: typed endpoints and RLS policies exist for customer/admin flows.
- Risks and fallback: phase migrations to avoid destabilizing current app-state store.

### Security
- Inputs: current security docs, Supabase RLS posture, admin plan.
- Deliverables: RLS policies, operation-level admin checks, private download authorization, webhook verification, Lark/Resend secret handling, customer ownership policy.
- Entry criteria: schema contracts exist.
- Exit criteria: no public access to private files, cross-user orders, or admin records.
- Risks and fallback: server-mediated reads while RLS policies mature.

### DevOps
- Inputs: current Vercel/web/studio setup, Supabase, Sanity, Stripe, Resend.
- Deliverables: env matrix, migration runbook, storage bucket setup, webhook setup, Lark webhook setup, release rollback plan.
- Entry criteria: integration choices finalized.
- Exit criteria: staged rollout path and rollback steps documented.
- Risks and fallback: deploy product routes behind compatibility paths first.

### CMS Studio Runtime Isolation Checklist
- Studio directory and package manifest audited: yes, existing `studio/` app.
- Studio lockfile strategy defined: keep dedicated lockfile.
- Node version policy defined for Studio: Node 20 policy remains.
- Root install/deploy coupling explicitly accepted or rejected: rejected.
- Separate CI workflow defined: required to preserve current isolation.
- Separate hosting project and CMS domain defined: required for production CMS.

### QA
- Inputs: current tests and release gates.
- Deliverables: unit, integration, e2e, accessibility, performance, security, and regression gates for product-led flows.
- Entry criteria: feature phase branch/scope exists.
- Exit criteria: product browse, checkout, success, dashboard, download, lead scoring, Lark/Resend, admin operations, and legacy `/shop` compatibility pass.
- Risks and fallback: keep manual fulfillment and hidden dashboard modules until tests pass.

## 9. Execution Backlog
1. Shared contracts update, owner hint: planning/API, dependency: this plan, target docs/files: route map and entity contracts.
2. Product route compatibility plan, owner hint: frontend/API, dependency: shared contracts, target docs/files: `/products`, `/shop` redirect/alias, nav.
3. Product variants schema, owner hint: API/data, dependency: route decision, target docs/files: Supabase migration, Sanity schema extension, `ManagedProductRecord` update.
4. Product detail redesign, owner hint: frontend, dependency: variants model, target docs/files: product hero, tier cards, comparison, customization upsell, related products.
5. Checkout success and private download path, owner hint: backend/API/frontend, dependency: orders/order_items/downloads schema, target docs/files: `/success`, `/dashboard/downloads`, signed URL API.
6. Lead event and service request foundation, owner hint: backend/API, dependency: lead schema, target docs/files: `/api/v1/leads`, `/api/v1/service-requests`, `/api/v1/events/track`.
7. WhatsApp tracking wrapper, owner hint: frontend/backend, dependency: lead events, target docs/files: tracked CTA helper and redirect endpoint.
8. AI qualification writes, owner hint: backend/AI, dependency: lead service, target docs/files: concierge domain and conversation model.
9. Lark notification adapter, owner hint: backend/DevOps, dependency: env/secrets, target docs/files: runtime config, notification domain, runbook.
10. Resend commerce and nurture emails, owner hint: backend, dependency: email templates, target docs/files: purchase, download, lead, follow-up templates and send logs.
11. Customer dashboard, owner hint: frontend/API/security, dependency: auth and order/download APIs, target docs/files: `/dashboard/products`, `/dashboard/downloads`, `/dashboard/orders`, `/dashboard/support`, `/dashboard/appointments`.
12. Admin operations upgrade, owner hint: admin/security, dependency: normalized schema, target docs/files: product variants, orders, leads, downloads, coupons, analytics, status workflows.
13. Solutions SEO pages, owner hint: frontend/CMS, dependency: content plan, target docs/files: `/solutions/for-startups`, `/solutions/for-local-businesses`, `/solutions/for-agencies`, `/solutions/for-saas-founders`.
14. QA release matrix, owner hint: QA, dependency: slices 1-12, target docs/files: e2e scenarios and regression gates.

## 10. Release-Gate And Validation Matrix

| Gate | Scope | Blocking? | Owner | Evidence Required |
|---|---|---|---|---|
| Static validation | TypeScript, lint, build | Yes | Frontend/backend | `npm run lint`, `npm run build` pass. |
| Unit tests | domain services, pricing, lead scoring, auth policies | Yes | Backend/API | Unit suite passes. |
| Integration tests | checkout, webhooks, downloads, lead events, Lark/Resend fallbacks | Yes | API/backend | Integration suite passes with mocked providers. |
| E2E tests | products browse, product detail tiers, checkout success, dashboard downloads, admin order ops | Yes | QA | Playwright suite passes. |
| Accessibility | public product pages, forms, dashboard, admin | Yes | Frontend/QA | Axe/manual keyboard evidence. |
| Performance | homepage, product index/detail, checkout, dashboard | Yes | QA/DevOps | Web vitals and route timing evidence. |
| Security | RLS, private downloads, admin authz, webhook signatures, secrets | Yes | Security | Security checklist and negative tests. |
| Regression | existing `/shop`, `/checkout`, contact, booking, AI, admin | Yes | QA | Legacy routes remain valid or redirect intentionally. |

## 11. Risks, Assumptions, And Open Decisions
- Risks:
  - Duplicating product truth across Sanity and Supabase could create stale pricing or disabled products if ownership is not enforced.
  - Moving from `/shop` to `/products` can hurt SEO and existing links unless redirects/canonicals are planned.
  - Private file delivery needs RLS and signed URL tests before instant downloads are exposed.
  - Admin JSON editors will not scale to product variants and lead operations.
  - Lark/Resend notification failure must not block purchases or checkout completion.
- Assumptions:
  - Growrix OS keeps Next.js, Sanity, Supabase, Resend, Stripe, OpenAI, and Vercel as current stack.
  - Supabase Storage is acceptable as first private download storage.
  - Lemon Squeezy is a future option, not immediate replacement.
  - The product-led homepage should feel like a premium product studio, not a pure marketplace.
- Open decisions:
  - Should `/products` replace `/shop` as canonical immediately, or should `/shop` remain canonical for one release?
  - Should payments remain Stripe-first, or should Lemon Squeezy be evaluated before download automation?
  - What minimum product file packaging format is required for first paid downloads?
  - Should free products require account creation before download?
  - Is Pusher needed for realtime admin/chat now, or can it wait until dashboard operations prove demand?

## 12. Tracker And Documentation Updates
- Files updated:
  - `DOC/PROJECT PLAN/product-led-platform-gap-e2e-plan.md`
  - downstream role docs listed in artifact metadata
  - root project plan routing docs
  - task tracker
- Downstream role docs updated:
  - See artifact metadata.
- Task tracker deltas:
  - Add an active tracked planning session for the product-led platform gap plan.
  - Add product-led platform phase/tasks after current CMS/content operations work.
- New planning artifacts created:
  - `DOC/PROJECT PLAN/product-led-platform-gap-e2e-plan.md`