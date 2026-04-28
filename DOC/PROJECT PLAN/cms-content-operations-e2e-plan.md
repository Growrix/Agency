---
document_type: e2e-planning-artifact
planning_scope: cms-content-operations
planning_mode: hybrid
status: planning-ready
canonical_template: DOC/Universal/Template/e2e-planning-template.md
source_request: Ongoing DOCS/Prompts.md
last_updated: 2026-04-28
---

# CMS And Content Operations E2E Plan

## 0. Artifact Metadata
- Canonical artifact path: `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`
- Planning request source: `Ongoing DOCS/Prompts.md`
- Planning mode: hybrid
- Status: planning-ready, implementation-not-started
- Last updated: 2026-04-28

## 1. Planning Mode And Objective
- Planning mode: hybrid
- Why this mode fits the request:
  - Blog content already uses Sanity.
  - Portfolio, shop, services, FAQs, homepage/about editorial content, and newsletter operations still need first-class CMS and operator ownership.
- Scope boundaries:
  - define the canonical CMS/content operations plan for portfolio posts, shop content, newsletter content and subscriber operations, FAQs, services, and reusable marketing copy.
  - define the preview, publish, revalidation, admin, and data ownership model required to support that scope.
- Explicit non-goals:
  - no implementation code in this phase.
  - no route redesign or layout replacement.
  - no replacement of Next.js, Supabase, or Sanity.
  - no movement of orders, inquiries, appointments, or auth into Sanity.
- Current implementation compatibility requirements:
  - extend the current Studio.
  - preserve the current public routes and design system.
  - preserve the current admin auth boundary.
  - preserve the existing API contracts unless future implementation work explicitly versions them.

## 2. Current-State Audit

### Tracker Status
- Done:
  - Sanity Studio exists and already powers blog content.
  - public marketing, portfolio, shop, admin, and conversion routes exist.
  - admin auth and catalog CRUD scaffolds exist.
- Partial:
  - portfolio and shop management rely on file-backed catalog records plus static seed modules.
  - newsletter subscription exists, but only as a capture API plus welcome email.
  - publish/unpublish lifecycle, preview flow, and operator-safe content workflows are incomplete.
- Blocked:
  - no technical blocker is visible.
  - the real blocker is undocumented multi-source content ownership across Sanity, static modules, and file-backed admin records.
- Not started:
  - canonical root planning artifact for CMS/content operations before this document.
  - Sanity schemas for portfolio, shop, services, FAQ, homepage/about singletons, and newsletter issues/templates.
  - Supabase/Postgres-backed newsletter send and unsubscribe operations.

### Existing Codebase Inventory
- Reusable routes:
  - `web/src/app/blog/**`
  - `web/src/app/portfolio/**`
  - `web/src/app/shop/**`
  - `web/src/app/services/**`
  - `web/src/app/faq/page.tsx`
  - `web/src/app/about/page.tsx`
  - `web/src/app/page.tsx`
- Reusable layouts and shells:
  - `web/src/app/layout.tsx`
  - `web/src/components/shell/**`
  - `web/src/components/dashboard/**`
- Reusable sections and components:
  - `web/src/components/sections/PortfolioCard.tsx`
  - `web/src/components/sections/BlogGrid.tsx`
  - `web/src/components/sections/BlogSidebar.tsx`
  - `web/src/components/shop/ShopProductCard.tsx`
  - existing primitives and motion components under `web/src/components/primitives/**` and `web/src/components/motion/**`
- Reusable data/store modules:
  - `web/src/server/sanity/client.ts`
  - `web/src/server/sanity/blog.ts`
  - `web/src/server/blog/content.ts`
  - `web/src/server/domain/catalog.ts`
  - `web/src/server/domain/newsletter.ts`
  - `web/src/server/data/schema.ts`
- Existing API handlers and contracts:
  - `web/src/app/api/v1/portfolio/**`
  - `web/src/app/api/v1/shop/**`
  - `web/src/app/api/v1/admin/products/route.ts`
  - `web/src/app/api/v1/admin/portfolio/route.ts`
  - `web/src/app/api/v1/newsletter/route.ts`
  - `web/src/app/api/revalidate/route.ts`
- Existing CMS or Studio schemas:
  - `studio/schemaTypes/blogPost.ts`
  - `studio/schemaTypes/author.ts`
  - `studio/schemaTypes/category.ts`
- Existing admin/operator flows:
  - `web/src/app/admin/**`
  - raw JSON editing for services, products, and portfolio in `web/src/app/admin/AdminDashboard.tsx`
- Existing integrations already wired:
  - Sanity blog reads
  - Supabase auth and persistence adapters
  - Resend welcome email for newsletter signup
  - Stripe commerce baseline
  - revalidation endpoint

### Reuse-First Delta Map
- Reuse without changes:
  - current Next.js route structure.
  - current Sanity Studio workspace.
  - current blog schema family.
  - current revalidation endpoint shape.
- Extend carefully:
  - catalog domain bridge in `web/src/server/domain/catalog.ts` so it can migrate from static seeds to Sanity-backed content.
  - admin dashboard so it hands long-form content ownership to Studio rather than replacing Studio.
  - AI knowledge assembly so it can ingest CMS-backed content later.
- Refactor in place:
  - static content arrays in `web/src/lib/content.ts`.
  - static shop catalog in `web/src/lib/shop.ts`.
  - raw JSON editors in `web/src/app/admin/AdminDashboard.tsx`.
- Net-new additions that are truly required:
  - Sanity schemas for case studies, shop categories/items, service pages, FAQ items, homepage/about/site settings, newsletter issues, and newsletter templates.
  - newsletter subscriber/send/unsubscribe persistence in Supabase/Postgres.
  - preview, publish, and webhook-driven revalidation coverage for non-blog CMS surfaces.
- Items rejected to avoid architecture drift:
  - greenfield CMS replacement.
  - moving operational records into Sanity.
  - replacing current public routes.
  - introducing Prisma before the ownership model is stable.

## 3. Platform Decision Matrix

| Capability | Current State | Decision | Required Now / Later / Excluded | Notes |
|---|---|---|---|---|
| Next.js | Already owns all public routes | Reuse | Required now | Public content surfaces stay on the current route structure |
| React | Already present | Reuse | Required now | No UI replatforming needed |
| TypeScript | Already present | Reuse | Required now | Keep typed content mappers and query adapters |
| Sanity CMS | Integrated for blog only | Expand to own editorial content | Required now | Blog, case studies, shop content, services, FAQs, homepage/about, newsletter issues/templates |
| Supabase | Already present for auth and persistence | Keep as operational data store | Required now | Subscribers, consents, send logs, orders, inquiries, appointments, users, audit data |
| PostgreSQL | Present via Supabase | Keep as transactional source of truth | Required now | Do not store subscriber lifecycle in Sanity |
| Prisma | Not present | Defer | Later | Direct typed queries are enough for the current migration slice |
| Lark | Not present | Exclude | Excluded | No current CMS/content ops dependency |
| Resend | Partially wired for welcome email | Expand for newsletter delivery and lifecycle email | Required now | Good fit for transactional and low-volume campaign delivery |
| Pusher | Not present | Defer | Later | Only needed if real-time admin workflows become mandatory |
| S3 | Not present in current content flow | Defer conditionally | Later | Needed when downloadable fulfillment assets leave manual delivery |
| Payments | Already present in commerce flow | Reuse | Required now | Shop CMS feeds presentation and checkout metadata, not payment state |
| Calendar | Booking exists, live sync remains deferred | Keep outside CMS | Later | Booking stays operational, not editorial |

## 4. CMS And Content Operations Plan

### Content Surfaces
- Blog:
  - keep Sanity as the primary source.
  - extend preview and editorial workflow rather than rebuilding it.
- Services:
  - move services overview and service-detail copy to Sanity `servicePage` documents.
  - keep current route composition in code.
- Shop/catalog:
  - move catalog content, merchandising, and homepage shop sections to Sanity.
  - use a single canonical taxonomy that separates `Ready Templates` and `Live SaaS Products`.
- Case studies/portfolio:
  - move list and detail content to Sanity `caseStudy` documents.
  - keep current portfolio routes and cards.
- FAQ, landing pages, and static trust content:
  - move FAQ, homepage, about, and reusable editorial copy to Sanity.
  - keep legal policy surfaces code-authored unless a later planning pass explicitly migrates them.

### Sanity Structure
- Document types:
  - `blogPost` (reuse)
  - `author` (reuse)
  - `category` (reuse and extend as needed)
  - `caseStudy`
  - `shopCategory`
  - `shopItem`
  - `servicePage`
  - `faqItem`
  - `homePage`
  - `aboutPage`
  - `siteSettings`
  - `newsletterIssue`
  - `newsletterTemplate`
- Field groups and validation:
  - SEO group on all public documents.
  - publish group: slug, featured flags, scheduled publish, and status.
  - media group: hero, gallery, and required alt text.
  - merchandising group: CTA copy, ordering, badges, and homepage visibility flags.
  - validation for slug uniqueness, alt text, taxonomy assignment, and preview readiness.
- Taxonomies and references:
  - `shopCategory` with top-level values `ready-templates` and `live-saas-products`.
  - `shopItem` references `shopCategory`, `servicePage`, and related `caseStudy` documents.
  - `caseStudy` references the primary `servicePage` and optional `shopItem` or proof links.
  - `faqItem` can target site-wide, service, shop category, or shop item scope.
- Media model:
  - use Sanity assets for editorial images and galleries.
  - keep downloadable fulfillment archives outside Sanity and defer S3 until product delivery is upgraded.
- Slug and preview rules:
  - slug required for every public document.
  - preview must support blog, services, shop items, case studies, homepage, and about.
  - preview must not bypass admin auth or secret validation.
- Draft, review, publish flow:
  - draft in Studio.
  - preview via authenticated draft mode.
  - publish via Studio.
  - webhook-driven revalidation for affected paths.
- Revalidation or cache invalidation model:
  - reuse `web/src/app/api/revalidate/route.ts`.
  - extend path mapping for `/blog`, `/portfolio`, `/portfolio/[slug]`, `/shop`, `/shop/[slug]`, `/services`, `/services/[slug]`, `/faq`, `/`, and `/about`.

### Editorial And Operator Workflow
- Who creates blog posts and where:
  - editors create posts in Sanity Studio.
- How services are created or updated:
  - service pages live in Sanity.
  - admin dashboard surfaces only operational status or links back to Studio when needed.
- How shop content is managed:
  - Sanity manages content, merchandising, and publish state.
  - admin dashboard manages operational readiness, fulfillment state, and later delivery assets.
- How portfolio and proof content is managed:
  - Sanity manages case study copy, results, gallery, and CTA messaging.
  - admin dashboard manages operational audit and later notes/status workflows if required.
- What belongs in Sanity Studio vs admin dashboard vs code:
  - Sanity Studio: public content and merchandising.
  - admin dashboard: subscribers, inquiries, bookings, orders, send logs, and audit-safe statuses.
  - code: layout composition, primitives, invariant strings, auth/security logic, and operational integrations.

## 5. Data, Database, And Storage Plan
- Source of truth per domain:
  - Sanity: blog, services, shop content, case studies, FAQs, homepage/about, newsletter issues, newsletter templates.
  - Supabase/Postgres: users, orders, inquiries, appointments, subscribers, unsubscribe events, send logs, audit logs.
- Supabase responsibilities:
  - auth.
  - newsletter subscriber lifecycle.
  - consent and unsubscribe state.
  - delivery/send logs.
  - admin-facing operational records.
- PostgreSQL schema impact:
  - add newsletter subscriber consent and unsubscribe fields or dedicated tables.
  - add `newsletter_campaign_sends`.
  - add optional `content_publication_events` if auditability needs to cover publish lifecycle.
- Prisma decision and justification:
  - defer Prisma.
  - current typed query/schema approach is enough for this planning slice and avoids unnecessary migration churn.
- Row-level security or access policy considerations:
  - subscriber/send tables remain server-only behind admin auth.
  - preview and revalidation secrets stay server-only.
  - public newsletter subscribe path remains API-only with abuse controls.
- File or asset storage plan:
  - Sanity assets for editorial media.
  - S3 later for downloadable fulfillment assets.
- Data migration or backfill needs:
  - seed case studies from `web/src/lib/content.ts` and `web/src/lib/site-images.ts`.
  - seed shop items and homepage merchandising from `web/src/lib/shop.ts` and `web/src/lib/content.ts`.
  - seed service, FAQ, homepage, and about copy from current route-authored content.
  - migrate newsletter subscribers from the file-backed store to Supabase/Postgres before campaign sending is introduced.

## 6. Integration Plan

| Integration | Purpose | Trigger Points | Owner Surface | Fallback / Failure Mode | Notes |
|---|---|---|---|---|---|
| Lark | No current CMS/content ops need | None | Excluded for now | None | Keep excluded until a real ops dependency exists |
| Resend | Welcome email and future newsletter delivery | Subscribe, campaign send | Backend and admin ops | Queue or manual resend if provider fails | Already partially wired |
| Pusher | Real-time operator updates | Later admin workflow only | Deferred | Polling fallback | Not required for first CMS rollout |
| S3 | Downloadable fulfillment assets | Order fulfillment | Deferred | Manual delivery fallback | Needed only when editorial plan expands into full digital delivery |
| Payments | Shop checkout and order capture | Checkout and order lifecycle | Backend | Manual follow-up if Stripe is unavailable | Content plan feeds presentation only |
| Calendar | Booking scheduling | Appointment creation and confirmation | Backend | Collect inquiry without sync | Booking remains operational, not CMS-owned |

## 7. Global Site Invariants
- Reuse existing design system, layouts, primitives, and interaction patterns before adding new UI.
- Prefer extending current routes, schemas, and data modules over introducing parallel systems.
- Public routes keep their current URL structure.
- Sanity owns editable public content; Supabase owns operational data.
- Newsletter editorial content and newsletter subscribers are separate concerns and must not share the same storage model.
- The common footer copyright string must remain:
  `© {year} {Company Name or Site Name}. All right reserved. Built & Maintenece by Growrix OS.`
- Link `Growrix OS` to `https://www.growrixos.com`.

## 8. E2E Phase Plan

### Shared Contracts
- Inputs:
  - `DOC/PROJECT PLAN/ai-context.yaml`
  - `DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml`
  - this planning artifact
- Deliverables:
  - content ownership matrix.
  - taxonomy decision for `Ready Templates` vs `Live SaaS Products`.
  - CMS vs admin vs code boundary.
  - preview/revalidation contract.
- Reuse targets:
  - current route map and role model.
- Entry criteria:
  - this artifact is accepted as canonical for CMS/content operations scope.
- Exit criteria:
  - no content-bearing surface has ambiguous ownership.
- Risks and fallback:
  - if scope changes, revise this artifact before implementation begins.

### CMS And Content Operations
- Inputs:
  - current Studio config.
  - existing blog schemas.
  - current static content modules.
- Deliverables:
  - schema family.
  - singleton structure.
  - editorial workflow.
  - backfill plan.
- Reuse targets:
  - current Studio and blog schema set.
- Entry criteria:
  - Shared Contracts scope is locked.
- Exit criteria:
  - every targeted content surface has a document model and operator flow.
- Risks and fallback:
  - keep static fallback until content parity is verified.

### Frontend
- Inputs:
  - current public routes.
  - CMS schema field shapes.
- Deliverables:
  - route-to-query map.
  - fallback rules.
  - preview behavior.
  - section reuse map.
- Reuse targets:
  - existing routes and components.
- Entry criteria:
  - CMS schema names and ownership are fixed.
- Exit criteria:
  - no migrated route requires layout rewrites to consume CMS data.
- Risks and fallback:
  - keep current static arrays until each route reaches parity.

### Backend
- Inputs:
  - subscriber and admin operational model.
  - preview and publish flow.
- Deliverables:
  - newsletter send orchestration boundaries.
  - audit logging rules.
  - admin service boundaries.
- Reuse targets:
  - current newsletter domain.
  - current admin auth guards.
  - current revalidation route.
- Entry criteria:
  - CMS/data ownership is approved.
- Exit criteria:
  - operational flows remain server-authoritative and auditable.
- Risks and fallback:
  - keep the current welcome-email-only path until campaign ops is ready.

### API And Data
- Inputs:
  - current schema contracts.
  - subscriber lifecycle model.
- Deliverables:
  - DB change list.
  - send log model.
  - unsubscribe flow.
  - content publication audit notes.
- Reuse targets:
  - current response envelopes.
  - current compatibility mode for local development.
- Entry criteria:
  - backend responsibilities are fixed.
- Exit criteria:
  - future implementation can add DB migrations without contract guesswork.
- Risks and fallback:
  - use compatibility mode locally until Postgres migration is complete.

### Security
- Inputs:
  - preview flow.
  - admin boundaries.
  - webhook contract.
- Deliverables:
  - secret handling model.
  - audit requirements.
  - unsubscribe token rules.
- Entry criteria:
  - API/data decisions are locked.
- Exit criteria:
  - no CMS token or preview secret is exposed client-side.
- Risks and fallback:
  - disable preview until auth and secret handling are complete.

### DevOps
- Inputs:
  - webhook needs.
  - environment requirements.
  - revalidation paths.
- Deliverables:
  - environment inventory.
  - webhook routing plan.
  - rollback notes.
  - publish runbook requirements.
- Entry criteria:
  - preview and publish flow is defined.
- Exit criteria:
  - staging and production can receive content publish events safely.
- Risks and fallback:
  - manual revalidation if webhook rollout lags.

### QA
- Inputs:
  - migrated content surfaces.
  - preview rules.
  - newsletter operations.
- Deliverables:
  - static/integration/e2e/accessibility/performance/security/regression gate list.
- Entry criteria:
  - all planning deliverables above are accepted.
- Exit criteria:
  - implementation team can validate each migration slice without inventing tests.
- Risks and fallback:
  - use route-by-route parity checklists before removing static fallbacks.

## 9. Execution Backlog
1. Harden the planning chain so end-to-end plans must materialize as `DOC/PROJECT PLAN/` root artifacts before tracker updates; owner hint: planning/docs; dependency: none; target docs/files: `.github/agents/growrix-e2e-planning-architect.agent.md`, `DOC/Universal/Template/e2e-planning-template.md`, `DOC/PROJECT PLAN/ai-context.yaml`, `DOC/PROJECT PLAN/README.md`, `DOC/PROJECT PLAN/Tasks/ai-context.yaml`, `DOC/Universal/Execution Constitution.md`.
2. Extend Sanity Studio with `caseStudy`, `shopCategory`, `shopItem`, `servicePage`, `faqItem`, `homePage`, `aboutPage`, `siteSettings`, `newsletterIssue`, and `newsletterTemplate` schemas; owner hint: CMS/frontend; dependency: backlog item 1; target docs/files: `studio/schemaTypes/**`, `DOC/PROJECT PLAN/Frontend/**`, `DOC/PROJECT PLAN/API and Data/**`.
3. Replace static portfolio and shop source arrays with CMS-backed data access while keeping current route composition and fallbacks during migration; owner hint: frontend/backend; dependency: backlog item 2; target docs/files: `web/src/lib/content.ts`, `web/src/lib/shop.ts`, `web/src/server/domain/catalog.ts`, `web/src/app/portfolio/**`, `web/src/app/shop/**`.
4. Move FAQ, services, homepage merchandising, and about/editorial copy to Sanity singletons/documents; owner hint: frontend/content ops; dependency: backlog item 2; target docs/files: `web/src/app/page.tsx`, `web/src/app/about/page.tsx`, `web/src/app/services/**`, `web/src/app/faq/page.tsx`.
5. Add preview, publish, and webhook-driven revalidation for all CMS-backed public surfaces; owner hint: backend/devops; dependency: backlog items 2-4; target docs/files: `web/src/app/api/revalidate/route.ts`, preview helpers, deployment docs.
6. Move newsletter subscribers, consents, unsubscribe events, and send logs to Supabase/Postgres and keep `newsletterIssue` and `newsletterTemplate` in Sanity; owner hint: backend/api-data; dependency: backlog item 1; target docs/files: `web/src/server/domain/newsletter.ts`, `web/src/server/data/schema.ts`, `DOC/PROJECT PLAN/API and Data/**`, `DOC/PROJECT PLAN/Admin Dashboard/**`.
7. Replace raw JSON catalog editing in the admin dashboard with operationally safe flows and Studio handoffs; owner hint: admin/backend/frontend; dependency: backlog items 2-6; target docs/files: `web/src/app/admin/**`, `web/src/app/api/v1/admin/**`.
8. Update AI knowledge assembly to read CMS-backed content after route parity and publish flow are stable; owner hint: backend/AI; dependency: backlog items 3-5; target docs/files: `web/src/server/ai/knowledge.ts`.
9. Run the full validation matrix and remove obsolete static fallbacks only after parity and publish flow are proven; owner hint: QA; dependency: backlog items 3-8; target docs/files: `web/tests/**`, `tests/e2e/**`, legacy static content modules.

## 10. Release-Gate And Validation Matrix

| Gate | Scope | Blocking? | Owner | Evidence Required |
|---|---|---|---|---|
| Static validation | Studio schemas, markdown/yaml docs, app typecheck, lint | Yes | CMS and frontend | Clean schema load, clean markdown/yaml diagnostics, clean lint/typecheck |
| Unit tests | content mappers, taxonomy transforms, newsletter lifecycle helpers | Yes | Engineering | Passing unit coverage for adapters and newsletter domain |
| Integration tests | webhook, revalidation, subscribe/unsubscribe, admin content APIs | Yes | Backend | Passing API and webhook coverage |
| E2E tests | preview, publish, portfolio render, shop filters, newsletter signup, admin subscriber ops | Yes | QA | Passing browser flows on desktop and mobile |
| Accessibility | migrated CMS-backed pages and media alt-text handling | Yes | Frontend and QA | Axe smoke plus manual keyboard coverage |
| Performance | homepage, shop, portfolio, and blog after CMS queries | Yes | Frontend and QA | Route timing remains inside existing smoke thresholds |
| Security | preview secret, webhook auth, admin RBAC, unsubscribe tokens, server-only secrets | Yes | Security and backend | Verified secret handling, auth boundaries, and audit trails |
| Regression | public copy parity, AI knowledge parity, admin workflow parity | Yes | QA and content ops | Route-by-route parity checklist and sign-off |

## 11. Risks, Assumptions, And Open Decisions
- Risks:
  - content drift while three sources remain active during migration.
  - taxonomy confusion between `Ready Templates`, `Ready Websites`, and `Live SaaS Products`.
  - raw JSON admin editing creates operator risk until replaced.
  - preview, webhook, and CMS token handling can create security drift if not centralized.
- Assumptions:
  - the existing Sanity project remains the primary CMS.
  - current Next.js routes and UI composition stay in place.
  - newsletter volume starts small enough for Resend-backed admin sends.
- Open decisions:
  - whether `Ready Websites` remains a distinct visible category or becomes a subtype under `Ready Templates`.
  - whether legal/trust pages move to Sanity later or stay code-authored.
  - whether S3 is needed in the first commerce CMS slice or deferred to fulfillment rollout.
  - whether non-editor reviewers need authenticated preview access.

## 12. Tracker And Documentation Updates
- Files updated:
  - `.github/agents/growrix-e2e-planning-architect.agent.md`
  - `DOC/Universal/Template/e2e-planning-template.md`
  - `DOC/PROJECT PLAN/ai-context.yaml`
  - `DOC/PROJECT PLAN/README.md`
  - `DOC/PROJECT PLAN/Tasks/ai-context.yaml`
  - `DOC/Universal/Execution Constitution.md`
  - `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`
- Downstream role docs updated:
  - `DOC/PROJECT PLAN/Frontend/cms-content-operations-frontend.md`
  - `DOC/PROJECT PLAN/API and Data/cms-content-operations-api-data.md`
  - `DOC/PROJECT PLAN/Admin Dashboard/cms-content-operations-admin-dashboard.md`
  - `DOC/PROJECT PLAN/Security/cms-content-operations-security.md`
- Task tracker deltas:
  - the planner hardening rule now requires the canonical root planning artifact and affected downstream role docs before tracker sync.
  - the canonical CMS/content operations plan now exists at both the root and role-specific layers before implementation work begins.
  - implementation remains not started in this planning slice.
- New planning artifacts created:
  - `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`
  - `DOC/PROJECT PLAN/Frontend/cms-content-operations-frontend.md`
  - `DOC/PROJECT PLAN/API and Data/cms-content-operations-api-data.md`
  - `DOC/PROJECT PLAN/Admin Dashboard/cms-content-operations-admin-dashboard.md`
  - `DOC/PROJECT PLAN/Security/cms-content-operations-security.md`