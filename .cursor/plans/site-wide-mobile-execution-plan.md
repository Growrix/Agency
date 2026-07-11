# GrowrixOS Site-Wide Mobile Redesign — Execution Plan

> **How to use:** Open this file → `Ctrl+A` → `Ctrl+C` → paste into a new Cursor Agent (or Cursor Cloud) chat → send.
>
> **Repo path:** `.cursor/plans/site-wide-mobile-execution-plan.md`
>
> **Branch:** `Mobile_version_cloud` (baseline commit `7869308`)

---

## Agent prompt (paste everything below this line)

Execute this plan end-to-end on branch `Mobile_version_cloud` in the GrowrixOS repo (`web/` is the Next.js app). Follow every phase in order. Reuse existing mobile patterns from `/services/websites` and `/services/saas-applications`. Do not skip zero-gate verification. Commit after each phase passes `npm run health:check`.

---

## Mission

Bring every **public marketing and commerce route** in `web/` to the same mobile quality bar as the homepage and the completed service pages (`/services/websites`, `/services/saas-applications`). Use the existing **1024px viewport gate**, shared mobile primitives, and BEM tokens in `web/src/app/globals.css`. Do not hardcode page-specific CSS outside the shared `home-mobile-marketing` / `service-detail-hero-mobile` systems.

**Working branch:** `Mobile_version_cloud` (baseline commit `7869308` — SaaS mobile + accent title unification).

**Out of scope:** `/dashboard/**`, `/admin/**` (authenticated app shells — separate UX contract).

---

## Current state (verified)

| Route group | Status |
|-------------|--------|
| `/` homepage | Mobile complete — sections use internal `MarketingViewportGate` in `web/src/components/marketing/` |
| `/services/websites` | Mobile complete — full gate coverage in `web/src/app/services/[slug]/page.tsx` |
| `/services/saas-applications` | Mobile complete — same file, all 9 sections gated |
| `/services/mobile-apps` | Desktop layout on mobile — content in `web/src/lib/mobile-apps-service-content.ts` |
| `/services/automation` | Desktop on mobile — unique sections: workflow showcase, automation types |
| `/services/technical-seo` | Desktop on mobile — unique: search foundation, setup categories, whats-included |
| `/services/ai-business-systems` | Desktop on mobile — unique: ai-solutions section |
| `/services` landing | Responsive Tailwind only — no viewport gates |
| About, contact, pricing, FAQ, book-appointment, portfolio, blog, additional-services | Desktop-first marketing layouts |
| `/shop`, `/shop/[slug]`, `/checkout`, `/success` | Desktop-first commerce layouts |
| `/digital-products/**` | Mostly re-exports shop (`web/src/app/digital-products/page.tsx`) |

**Public service catalog (only these six):** `websites`, `saas-applications`, `mobile-apps`, `automation`, `technical-seo`, `ai-business-systems` — defined in `web/src/lib/services-landing-content.ts` (`SERVICES_LANDING_HIGHLIGHT_SLUGS`).

---

## Architecture (do not deviate)

| Layer | Location | Rule |
|-------|----------|------|
| Breakpoint gate | `web/src/components/marketing/MarketingViewportGate.tsx` | `(min-width: 1024px)` — server renders mobile |
| Accent titles | `web/src/components/marketing/MarketingAccentTitle.tsx` + `web/src/components/primitives/SectionHeading.tsx` | All section headings get `titleLead` / `titleAccent` in content files |
| Mobile section shell | `web/src/components/marketing/mobile/MobileMarketingSectionHeader.tsx` | Eyebrow + accent title + description |
| Reusable grids | `MobileFeatureGrid`, `MobilePrincipleList`, `MobileStackGroups` under `web/src/components/marketing/mobile/` | Overview/deliverables/stack patterns |
| Service blocks | `ServiceDetailHeroMobile`, `ProcessStepsMobile`, `EngagementTiersMobile`, `ServiceFaqMobile`, `ProductLedFinalCTAMobile` | Wire for every service |
| Section rhythm | `web/src/lib/marketing-composition.ts` | Preserve `marketingSection(page, sectionKey)` — do not remove desktop sections |
| CSS | `web/src/app/globals.css` | Extend `.home-mobile-marketing*` and `.service-detail-hero-mobile*` — no inline style dumps |

**Gold-standard references:**

- SaaS wiring: `web/src/app/services/[slug]/page.tsx` (lines ~1057–1740)
- Content shape: `web/src/lib/saas-applications-service-content.ts`

---

## Phase 0 — Baseline and shared prep

1. Checkout `Mobile_version_cloud`, pull latest.
2. From `web/`: run `npm run lint && npm run typecheck` — fix any drift before new work.
3. Spot-check at **375px** and **1023px**: `/`, `/services/websites`, `/services/saas-applications` — confirm gates flip cleanly.
4. Shared folders already exist: `web/src/components/marketing/mobile/` and `web/src/components/marketing/services/` — add thin wrappers only where needed.

**Shared content prep (all phases):** For every `*-content.ts` touched, add optional fields mirroring SaaS:

```ts
titleLead?: string;
titleAccent?: string;
// FAQ sections: export *_FAQ_SECTION with eyebrow/title/titleLead/titleAccent
// Hero: headlineLead / headlineAccent where applicable
// Engagement tiers: iconKey per tier → getMarketingTierIcon() in web/src/lib/marketing-tier-icons.ts
```

Add new brand/tech terms to root `cspell.json` as needed.

---

## Phase 1 — Remaining four service detail pages

**File hub:** `web/src/app/services/[slug]/page.tsx`

For each service below, wire **every section** with `MarketingViewportGate` the same way SaaS does. Extend the hero gate condition from `(isWebsitesService || isSaasService)` to **all six conversion slugs** (`isConversionServicePage` already exists ~line 432).

### 1A — `/services/mobile-apps`

**Content:** `web/src/lib/mobile-apps-service-content.ts`

**Sections** (from `service-detail-mobile-apps` in marketing-composition): hero → product-types → overview → deliverables → process → engagement → faq → cta

| Section | Mobile component | Action |
|---------|------------------|--------|
| Hero | `ServiceDetailHeroMobile` | Add `MOBILE_SERVICE_HERO.headlineLead/Accent`; pass `heroServiceStats` |
| Product types | Reuse `SaasProductTypesMobile` (rename optional → `ServiceProductTypesMobile` if shared) | Gate around existing desktop product-types block (~line 953) |
| Overview | `MobileFeatureGrid` | Gate; content from `MOBILE_SYSTEMS_SECTION` + accent fields |
| Deliverables | `MobilePrincipleList` | Gate; content from mobile-apps differentiators section |
| Process | `ProcessStepsMobile` | Gate |
| Engagement | `EngagementTiersMobile` | Gate; add `iconKey` to tiers |
| FAQ | `ServiceFaqMobile` | Gate; add `MOBILE_SERVICE_FAQ_SECTION` export |
| CTA | `ProductLedFinalCTAMobile` | Gate |

### 1B — `/services/automation`

**Content:** `web/src/lib/automation-service-content.ts`

**Unique sections:** `workflow-showcase`, `automation-types`

| Section | Mobile component | Action |
|---------|------------------|--------|
| Hero | `ServiceDetailHeroMobile` | Same pattern as 1A |
| Workflow showcase | **New** `AutomationWorkflowShowcaseMobile.tsx` | Compact vertical step cards from `AutomationWorkflowShowcase` data; BEM under `home-mobile-marketing__workflow-*` |
| Automation types | **New** `AutomationTypesMobile.tsx` | Use `MobileFeatureGrid` or chip grid if items are short |
| Overview / deliverables / process / engagement / FAQ / CTA | Same shared components as 1A | Gate each block (~lines 838, 632+) |

### 1C — `/services/technical-seo`

**Content:** `web/src/lib/technical-seo-service-content.ts`

**Unique sections:** `search-foundation`, `setup-categories`, `whats-included`

| Section | Mobile component | Action |
|---------|------------------|--------|
| Hero | `ServiceDetailHeroMobile` | Same pattern |
| Search foundation | **New** `SeoVisibilityFoundationMobile.tsx` | Simplify `SeoVisibilityFoundation` to stacked cards |
| Setup categories | **New** `TechnicalSeoSetupCategoriesMobile.tsx` | Tabbed desktop → `MobileMarketingTabs` + panel content |
| What's included | **New** `SeoDeliverablesChecklistMobile.tsx` | Checklist groups as accordion or compact list |
| Shared sections | Same as 1A | Gate overview, deliverables, process, engagement, FAQ, CTA |

### 1D — `/services/ai-business-systems`

**Content:** `web/src/lib/ai-business-systems-service-content.ts`

**Unique section:** `ai-solutions`

| Section | Mobile component | Action |
|---------|------------------|--------|
| Hero | `ServiceDetailHeroMobile` | Same pattern |
| AI solutions | **New** `AiSolutionsMobile.tsx` | `MobileFeatureGrid` with icon keys or solution cards |
| Shared sections | Same as 1A | Gate remaining sections (~line 813+) |

### Phase 1 CSS additions (`web/src/app/globals.css`)

- Reuse existing `home-mobile-marketing__*` blocks wherever possible.
- Add modifiers only for new unique layouts: `__workflow-step`, `__seo-checklist`, `__tabs-panel`.
- Stack chip grid already exists: `.home-mobile-marketing__stack-group-items` (3-column) — reuse for short label lists.

### Phase 1 verification

- Manual: all four URLs at 375px — no horizontal scroll, tappable CTAs, readable accent titles.
- `ReadLints` on every touched file.
- From `web/`: `npm run health:check` (full gate including `web/tests/e2e/release-gates.spec.ts`).

---

## Phase 2 — `/services` landing

**Files:** `web/src/app/services/page.tsx`, `web/src/lib/services-landing-content.ts`

**Sections:** hero, intro/compare grid, ecosystem links, CTA (per page structure)

1. Add mobile accent fields to `SERVICES_LANDING_HERO`, `SERVICES_LANDING_INTRO`, and card copy.
2. Create `ServicesLandingHeroMobile.tsx` — mirror homepage hero density (eyebrow, accent headline, dual CTAs).
3. Create `ServicesLandingGridMobile.tsx` — single-column service cards for six highlights; reuse icon resolver from service slugs.
4. Wrap each major section in `MarketingViewportGate` in `page.tsx` (or extract `ServicesLandingPage` client wrapper if needed for gates).
5. Ecosystem diagram: replace desktop radial/graph with stacked link cards on mobile.

**Verify:** `/services` at 375px; all six service links navigate correctly.

---

## Phase 3 — Core marketing pages

Apply the same gate + content accent pattern page by page. Prefer **section-level gates inside existing pages** over duplicating entire pages.

| Route | Page file | Content file | Mobile work |
|-------|-----------|--------------|-------------|
| `/about` | `web/src/app/about/page.tsx` | `web/src/lib/about-landing-content.ts` | Gate hero (`AboutHeroPanel` → mobile variant), founder story, principles, process, CTA; reuse `ProcessStepsMobile`, `MobilePrincipleList` |
| `/contact` | `web/src/app/contact/page.tsx` | `web/src/lib/contact-landing-content.ts` | Gate hero, channel cards (stacked), form section (full-width inputs), FAQ |
| `/pricing` | `web/src/app/pricing/PricingPageClient.tsx` | pricing content in lib | Gate hero, starting points, service ranges, comparison table → stacked cards, FAQ, CTA |
| `/faq` | `web/src/app/faq/page.tsx` | `web/src/lib/faq-content.ts` | Gate hero, topic accordion (`ServiceFaqMobile` pattern), quick links |
| `/book-appointment` | `web/src/app/book-appointment/page.tsx` | `web/src/lib/book-appointment-landing-content.ts` | Gate hero + form; alternatives as compact link row |
| `/portfolio` | `web/src/app/portfolio/PortfolioPageClient.tsx` | `web/src/lib/portfolio-landing-content.ts` | Gate hero; filters → horizontal scroll chips; single-column grid |
| `/portfolio/[slug]` | `web/src/app/portfolio/[slug]/page.tsx` | case study content | Gate hero, stats, gallery, CTA — stacked layout |
| `/blog` | `web/src/app/blog/page.tsx` | blog lib | Gate hero; single-column post list |
| `/blog/[slug]` | `web/src/app/blog/[slug]/page.tsx` | Sanity/content | Readable prose width, mobile TOC collapse |
| `/additional-services` | `web/src/app/additional-services/page.tsx` | related content lib | Gate hero + service list cards |

**New shared components (create only if reused 2+ times):**

- `MarketingPageHeroMobile.tsx` — generic hero for non-service pages
- `MobileFilterChips.tsx` — portfolio/shop filter strip
- `MobilePricingCards.tsx` — pricing tiers on small screens

**Verify:** smoke each route at 375px; run `npm run lint && npm run typecheck`.

---

## Phase 4 — Commerce (shop + checkout)

| Route | Page file | Mobile work |
|-------|-----------|-------------|
| `/shop` (+ `/digital-products`) | `web/src/app/shop/page.tsx` | Replace sticky sidebar with **filter drawer** triggered by button; single-column `ShopProductCatalogCard`; mobile hero from `PRODUCT_INDEX_COPY` |
| `/shop/[slug]` | `web/src/app/shop/[slug]/page.tsx` | Stacked gallery + buy box; tier selector as full-width cards; sticky bottom CTA bar |
| `/checkout` | `web/src/app/checkout/page.tsx` | Single-column form; order summary collapsible accordion at top |
| `/success` | `web/src/app/success/page.tsx` | Centered confirmation, full-width primary CTA |

**Implementation notes:**

- Extract `ShopPageMobile.tsx` client component for gate + filter drawer state.
- Reuse shop filter logic from `web/src/lib/shop-filters.ts` — no duplicate filter state.
- Product detail mobile must not break Stripe/checkout deep links.
- Category routes under `/digital-products/category/[category]` inherit shop mobile once hub is done.

**Verify:** browse shop → product → checkout flow on mobile viewport; `npm run build` passes.

---

## Phase 5 — Footer, legal, and polish

| Route | Action |
|-------|--------|
| `web/src/components/shell/Footer.tsx` | Already has gate — confirm link groups stack cleanly |
| `/privacy-policy`, `/terms-of-service` | Prose max-width + padding pass (minimal — no full redesign) |
| `/live-chat`, `/ai-concierge` | Ensure hero/iframe containers don't overflow at 320px |

**Cross-cutting polish:**

- Unify accent titles on any desktop sections missed in earlier phases.
- Confirm `prefers-reduced-motion` disables scroll reveals on new mobile blocks.
- Audit tap targets ≥ 44px on CTAs and filter chips.

---

## Zero-gate checklist (mandatory before declaring done)

Per `.cursor/rules/60-zero-gate-health-check.mdc`:

1. `ReadLints` — zero diagnostics on all created/modified files.
2. From `web/`:

```bash
npm run lint
npm run typecheck
npm run perf:budgets
npm run test
npm run build
npm run test:e2e -- tests/e2e/release-gates.spec.ts --project=desktop-chrome
```

Or bundled: `npm run health:check`

3. Manual matrix at **375px** and **1023px** for every route in Phases 1–4.
4. No merge conflict markers; no accidental `.cursor/tmp-*` commits.

---

## Suggested commit sequence

1. `feat(mobile): service pages — mobile-apps, automation, technical-seo, ai-business-systems`
2. `feat(mobile): services landing viewport gates`
3. `feat(mobile): marketing pages — about, contact, pricing, faq, book-appointment, portfolio, blog`
4. `feat(mobile): shop, product detail, checkout, success`
5. `chore(mobile): polish, cspell, health-check green`

Push to `Mobile_version_cloud` after each phase passes health check.

---

## Execution order

1. Phase 0 — Baseline
2. Phase 1 — Four remaining service pages (highest priority)
3. Phase 2 — `/services` landing
4. Phase 3 — Marketing pages
5. Phase 4 — Commerce
6. Phase 5 — Polish + final health check

Phases 2–4 can be parallelized by route group once Phase 1 patterns are locked.
