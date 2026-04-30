---
document_type: role-scope-plan
role: frontend
scope: cms-content-operations
parent_plan: DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md
status: planning-ready
last_updated: 2026-04-28
---

# Frontend CMS Content Operations Plan

## Purpose
- Translate the root CMS/content-operations artifact into public-route behavior, content-source ownership, component reuse rules, and migration sequencing for the frontend layer.
- Preserve the current Next.js route map, design system, SEO structure, and mobile behavior while editorial content moves into Sanity.

## Canonical Inputs
- `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`
- `DOC/PROJECT PLAN/Frontend/ai-context.yaml`
- `DOC/PROJECT PLAN/Frontend/00-master-ui-architecture.md`
- `DOC/PROJECT PLAN/Frontend/01-design-system.md`
- `DOC/PROJECT PLAN/Frontend/02-component-system.md`
- `DOC/PROJECT PLAN/API and Data/cms-content-operations-api-data.md`
- `DOC/PROJECT PLAN/Admin Dashboard/cms-content-operations-admin-dashboard.md`
- `DOC/PROJECT PLAN/Security/cms-content-operations-security.md`

## Scope
- In scope:
  - `/`
  - `/about`
  - `/faq`
  - `/services` and current service detail routes
  - `/portfolio` and `/portfolio/[slug]`
  - `/shop` and `/shop/[slug]`
  - `/blog` and `/blog/[slug]` stability during wider CMS rollout
- Out of scope:
  - admin-dashboard UI redesign beyond planned handoff points
  - backend schema or policy changes
  - replacing code-authored route composition with generic CMS-rendered layout blobs

## Current Reuse Baseline
- Reuse existing route shells and page composition in `web/src/app/**`.
- Reuse current section components and design primitives in `web/src/components/**`.
- Reuse current server Sanity integration patterns in `web/src/server/sanity/**`.
- Reuse static content modules as temporary fallbacks until parity is proven.

## Route Ownership Matrix

| Route group | Current source | Target source | Fallback rule | Notes |
|---|---|---|---|---|
| `/blog`, `/blog/[slug]` | Sanity with static fallback | Sanity primary | Keep current fallback until the wider CMS rollout is stable | Existing pattern becomes the reference model |
| `/portfolio`, `/portfolio/[slug]` | Static `web/src/lib/content.ts` | Sanity `caseStudy` | Keep static fallback until route parity and revalidation are proven | Preserve existing card/detail composition |
| `/shop`, `/shop/[slug]` | Static `web/src/lib/shop.ts` | Sanity `shopCategory` and `shopItem` | Keep static fallback until commerce parity and filter behavior are proven | Preserve current catalog UX and CTA structure |
| `/services` and current detail routes | Code-authored copy | Sanity `servicePage` | Keep current copy in code until service-document parity is verified | Route map stays fixed; content becomes data-backed |
| `/faq` | Code-authored FAQ entries | Sanity `faqItem` | Keep current local entries until query parity is proven | Preserve accordion interaction model |
| `/` and `/about` | Code-authored singleton copy | Sanity `homePage`, `aboutPage`, `siteSettings` | Keep current local defaults until singleton queries are stable | Homepage composition remains code-controlled |

## Frontend Non-Negotiables
- Keep page composition in code and map CMS documents into typed view models before rendering.
- Do not pass raw Sanity documents directly through page trees when normalized view models are expected.
- Preserve route URLs, metadata shape, structured data, and section ordering unless a later plan explicitly changes them.
- Preserve current mobile, accessibility, and performance behavior while data sources shift.
- Keep static fallbacks until route-by-route parity, preview, and revalidation are verified.
- Preview must remain server-authoritative and must not rely on client-visible secrets or open query-parameter toggles.

## Planned Frontend Work Slices

### Slice 1: Portfolio And Shop Migration
- Target routes:
  - `web/src/app/portfolio/**`
  - `web/src/app/shop/**`
- Target support modules:
  - `web/src/lib/content.ts`
  - `web/src/lib/shop.ts`
  - `web/src/server/domain/catalog.ts`
  - `web/src/server/sanity/**`
- Deliverables:
  - typed Sanity-to-view-model mappers
  - route loaders with temporary static fallback
  - preserved filtering, featured items, and CTA behaviors

### Slice 2: Services, FAQ, And Singleton Content
- Target routes:
  - `web/src/app/page.tsx`
  - `web/src/app/about/page.tsx`
  - `web/src/app/faq/page.tsx`
  - `web/src/app/services/**`
- Deliverables:
  - singleton and collection queries
  - section-level fallback data
  - stable hero, proof, FAQ, and CTA composition

### Slice 3: Preview And Publish UX Stability
- Target modules:
  - preview helpers
  - `web/src/app/api/revalidate/route.ts`
  - route metadata loaders
- Deliverables:
  - authenticated draft-mode preview behavior
  - route invalidation map for all migrated surfaces
  - operator-visible preview/publish expectations documented for frontend consumers

### Slice 4: Static Fallback Retirement
- Entry criteria:
  - migrated routes pass parity validation
  - publish and revalidation flow is stable
  - regression checks pass
- Deliverables:
  - remove obsolete static fallback branches
  - keep only deliberate emergency fallbacks where justified

## File Targets For Future Implementation
- `web/src/app/page.tsx`
- `web/src/app/about/page.tsx`
- `web/src/app/faq/page.tsx`
- `web/src/app/services/**`
- `web/src/app/portfolio/**`
- `web/src/app/shop/**`
- `web/src/server/sanity/**`
- `web/src/server/domain/catalog.ts`
- `web/src/lib/content.ts`
- `web/src/lib/shop.ts`

## Acceptance Criteria
- Every migrated public route has a documented target content source and explicit fallback rule.
- Existing section composition and design-system usage remain intact.
- Preview and publish behavior are documented before implementation begins.
- Builders can implement route migration without guessing ownership boundaries or UI fallback behavior.