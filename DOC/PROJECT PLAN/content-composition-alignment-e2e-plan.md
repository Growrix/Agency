# Content Composition Alignment E2E Plan

## 0. Artifact Metadata
- Canonical artifact path: `DOC/PROJECT PLAN/content-composition-alignment-e2e-plan.md`
- Affected downstream role docs:
  - `DOC/PROJECT PLAN/Frontend/content-composition-alignment-frontend.md`
  - `DOC/PROJECT PLAN/QA/content-composition-alignment-qa.md`
- Planning request source: `Ongoing DOCS/Website Plan Growrix OS/websiteplan.md` + P9 gap review
- Planning mode: hybrid enhancement planning
- Status: canonical planning artifact, implementation in progress
- Last updated: 2026-06-06

## 1. Planning Mode And Objective

- Planning mode: hybrid.
- Why this mode fits: P9 delivered routes, checkout, dashboard, lead scoring, and tier UI scaffolding. The remaining gap is marketing composition, copy coherence, CMS seeding, and buyer-segment surfaces — not another backend rewrite.
- Scope boundaries:
  - Align homepage, products index, product detail composition, services bridge pages, solutions landings, pricing framing, and navigation with the product-led marketplace model in `websiteplan.md`.
  - Extract reusable marketing components under `web/src/components/marketing/`.
  - Seed or author CMS content for tiers, bundles, and free offers.
  - Preserve P9 backend routes, APIs, dashboard, and `/shop` compatibility.
- Explicit non-goals:
  - Lemon Squeezy migration.
  - Live Supabase cutover (operator step remains deferred).
  - Admin JSON-to-form refactor (P7).
  - Pusher/realtime.
- Positioning lock (canonical):
  - **Primary identity:** productized SaaS studio + digital product marketplace.
  - **Primary CTA:** Browse Products.
  - **Secondary CTA:** Book a Free Consultation.
  - **Price ladder:** micro digital products ($15–$399 Standard/Premium) on product surfaces; Done-For-You setup ($299–$8k) on product and customization service surfaces; custom agency engagements ($500+) on services, solutions, and pricing tabs only.

## 2. Current-State Audit

### Tracker Status
- Done: P0–P2, P6; P9 routes, tier UI, dashboard, lead/Lark/Resend slices.
- Partial: homepage body copy still agency-first; product index operator-facing; solutions missing; template-customization service missing; CMS catalog thin; page-plan docs drift from product-led plan.
- Blocked: none for P10 UI work.

### Reuse-First Delta Map
- Reuse: hero product-led copy, `ShopProductCard`, product detail tier layout, `CTABand`, `FeatureCard`, `PortfolioCard`, `ProcessSteps`, AI concierge shell, Sanity loaders.
- Extend: homepage section order, `/products` hero, nav/footer, services cross-links, contact intents.
- Refactor: extract marketing sections from `page.tsx` and `shop/[slug]/page.tsx` into `components/marketing/`.
- Net-new: `/solutions/*`, `/services/template-customization`, marketing component set, pricing tab structure, CMS seed packs for bundles/free.

### Hybrid Catalog Publishing Contract (Current)
- Public shop uses a hybrid source:
  - published CMS products (`shopItem`, `htmlBusinessProfileTemplate`)
  - intentional local fallback seed sets (anchor products + HTML profile fallback + curated email packs)
- Placeholder/legacy mock records remain filtered before public output.
- Fallback visibility must stay explicit and curated; fallback seeds are not treated as arbitrary mock data.

## 3. E2E Phase Plan (P10)

### Slice 1 — Positioning lock and copy matrix
- Deliverable: `web/src/lib/product-led-content.ts` + updated page plans.
- Exit: no page contradicts the positioning lock above.

### Slice 2 — Marketing component extraction
- Deliverable: `TrustBar`, `FeaturedProducts`, `ThreePathExplainer`, `ServiceCards`, `Testimonials`, `ProductLedFinalCTA`, `SolutionsLanding`.
- Exit: homepage uses components, not inline-only composition.

### Slice 3 — Homepage recomposition
- Section order: Hero → TrustBar → FeaturedProducts → ThreePathExplainer → ServiceCards → HTML profiles spotlight → Featured builds → Process → AI → Testimonials → Blog → FinalCTA.
- Remove homepage agency customization scope grid; relocate to `/services/template-customization`.

### Slice 4 — Product catalog surfaces
- Rewrite `/products` hero and category chips.
- Improve bundles/free detection via CMS flags (follow-up after schema flags).
- Category editorial intros per plan taxonomy.

### Slice 5 — Service ↔ product bridge
- Ship `/services/template-customization` with packages, process, related products, FAQ.
- Add nav entry and cross-links from product customization upsells.

### Slice 6 — Solutions SEO pages
- `/solutions/for-startups`, `for-local-businesses`, `for-agencies`, `for-saas-founders`.
- Add Solutions nav group.

### Slice 7 — Pricing and contact harmonization
- `/pricing` tabs: Digital Products | Done-For-You | Custom Services.
- Contact intents aligned to plan lead taxonomy.

### Slice 8 — CMS seeding and validation
- Publish anchor products with authored tiers; seed bundles and free offers.
- Run lint, unit, integration, build, e2e regression.

## 4. Release-Gate Matrix

| Gate | Scope | Blocking? |
|---|---|---|
| Static validation | lint, build | Yes |
| Unit/integration | catalog, API flows | Yes |
| E2E | home, products, checkout, services | Yes |
| Content | no empty bundles/solutions on launch slice | Yes for slice 6 |
| Accessibility | new marketing sections | Yes |

## 5. Tracker And Documentation Updates
- Add phase P10 and tasks T053–T062 to `DOC/PROJECT PLAN/Tasks/tasks.md`.
- Update `DOC/PROJECT PLAN/ai-context.yaml` active artifacts.
- Sync `home-page.md`, `00-master-ui-architecture.md`, `product-detail-page.md`, `Frontend/ai-context.yaml`.
