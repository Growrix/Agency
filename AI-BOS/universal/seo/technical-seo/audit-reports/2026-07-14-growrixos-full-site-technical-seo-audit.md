# Growrix OS Full-Site Technical SEO Audit

**Audit mode:** Technical SEO Expert — Audit Mode  
**Date:** 2026-07-14  
**Auditor:** `@technical-seo` / `Technical_SEO_expert`  
**Scope:** `web/` (Next.js SaaS), `sites/` (HTML templates), `Frontend_Nextjs/` (migrated Next.js sites)  
**Evidence type:** Static codebase analysis; no live HTTP crawl, no Search Console, no Lighthouse runs  
**Handbook alignment:** `Ongoing DOCS/SEO/technical-seo/` — principles of crawlability, indexability, renderability, measurability, enforceability, observability

---

## Executive Summary

| Surface | Health Score | Maturity | Top Risk |
|---------|-------------|----------|----------|
| `web/` SaaS | 65 / 100 | Mid | Global indexing disabled; root canonical likely inherited by most routes |
| `sites/` HTML templates | 45 / 100 | Low–Mid | Hash-routing SPAs + Bedrock missing full SEO head |
| `Frontend_Nextjs/` migrated sites | 55 / 100 | Mid | Missing OG images, global FAQ schema on every route, weak image optimization on 01/02 |
| **Overall** | **55 / 100** | **Mid–Low** | **Indexability and canonical signal quality are the dominant risks before go-live** |

**Release decision:** Conditional Pass — acceptable for preview/development; **Blocked for production launch** until Critical/High issues are mitigated.

---

## 1. Critical Issues (Launch Blockers)

### C1. Global indexing disabled by default (`web/`)

- **Evidence:** `web/src/lib/site.ts` L30 — `SITE_INDEXING_ENABLED` defaults to `false` unless env is `true`; `layout.tsx` L63–69 emits `robots: { index: false }` and `robots.ts` returns `disallow: /` when off.
- **Handbook:** `checklists/01-prelaunch-checklist.md` — noindex removal on production is a blocking gate.
- **Business impact:** No page in `web/` can be indexed until the flag is flipped and validated.
- **Action:** Set `SITE_INDEXING_ENABLED=true` in production Vercel env; verify rendered robots meta and `robots.txt` after deploy.
- **Validation:** Fetch `https://www.growrixos.com/robots.txt` (must `Allow: /`) and inspect `<meta name="robots">` on homepage and key category routes.

### C2. Root canonical `/` likely inherited by most `web/` routes

- **Evidence:** `web/src/app/layout.tsx` L45–47 sets `alternates.canonical: "/"`. Only `shop/[slug]/page.tsx` and `digital-products/category/[category]/page.tsx` override canonical. Next.js merges parent metadata when children omit fields.
- **Handbook:** `on-page/03-canonicals-indexability.md` — make the preferred URL unambiguous.
- **Business impact:** `/services/technical-seo`, `/digital-products`, `/blog`, `/about`, etc. may tell search engines their canonical URL is the homepage, causing index consolidation and ranking loss.
- **Action:** Remove root canonical or scope it to `/` only; add self-canonical to every indexable route.
- **Validation:** Render each route and verify `<link rel="canonical">` matches the current URL.

### C3. HTML templates use hash-only routing (`sites/`)

- **Evidence:** All 4 `sites/` files route via `#home`, `#/shop`, `#/residential`, etc. Sub-views are in the DOM (`display:none` or `hidden`) and share one canonical URL.
- **Handbook:** `on-page/05-internal-linking-navigation.md` — important pages need real, crawlable URLs.
- **Business impact:** Search engines index only one URL per file; ~20–30 virtual pages per template are invisible to crawlers.
- **Action:** Treat these as preview demos. For SEO delivery, migrate to Next.js via `/migrate-to-next` with real URLs and per-route metadata.
- **Validation:** For demo use, acceptable; for client delivery, confirm contract is "template preview" not "ranked multi-page site".

### C4. Bedrock HTML template missing full SEO head

- **Evidence:** `sites/01-BedrockConstruction.html` has title + description only; no canonical, OG, Twitter, `robots`, JSON-LD, theme-color, or favicon.
- **Handbook:** `on-page/01-metadata.md`, `on-page/02-structured-data-schema.md`, `40-performance-seo.mdc`.
- **Action:** Add full head + Organization/LocalBusiness JSON-LD; remove external Google Fonts; fix `projects.html` links.
- **Validation:** Open file in browser and inspect `<head>` completeness.

### C5. Missing OG images on migrated sites `01` and `02`

- **Evidence:** `Frontend_Nextjs/01-bedrock-construction/site.config.ts` and `02-sunterra-solar/site.config.ts` reference `/og-image.png`; neither `public/` directory exists. `05-elite-estates-realty` uses `public/og-image.svg` (SVG is often rejected by social crawlers).
- **Handbook:** `on-page/01-metadata.md` — social sharing assets must exist and be valid.
- **Action:** Create 1200×630 PNG/JPG `og-image.png` in each site `public/`; update references.
- **Validation:** Request each image URL and verify dimensions and content type.

---

## 2. High Issues

### H1. Incomplete metadata on high-value `web/` templates

- **Affected:** `/services/technical-seo`, `/digital-products`, `/services`, `/blog`, `/portfolio`, `/faq`, `/about`, `/contact`, `/pricing`
- **Evidence:** Only title/description present; no canonical, OG, or Twitter per route.
- **Action:** Extend `generateMetadata` or add `export const metadata` with canonical, OG, Twitter on every indexable route.

### H2. Structured data gaps on `web/` content pages

- **Affected:** `/services/technical-seo`, `/blog/[slug]`, `/portfolio/[slug]`, `/faq`, `/services`
- **Evidence:** Homepage has `Organization` + `WebSite` + `SearchAction`; product/category pages have `Product`/`CollectionPage`; services, blog, portfolio have no JSON-LD.
- **Action:** Add `Service`/`ProfessionalService` + `FAQPage` for service pages; `BlogPosting`/`Article` for blog; `CreativeWork` for portfolio.

### H3. Invalid `SearchAction` target (`web/` and `05-elite`)

- **Evidence:** `web/` homepage uses `/digital-products?search={search_term_string}` but shop filters use `category`/`type`/`industry` only. `05-elite` uses `/properties?q={search_term_string}` with no search handler.
- **Handbook:** `on-page/02-structured-data-schema.md` — schema must match real site behavior.
- **Action:** Remove `SearchAction` or implement a working search endpoint.
- **Validation:** Test `?search=test` query on production and confirm results page returns 200 with relevant results.

### H4. Multiple H1s in HTML templates

- **Evidence:** 8–28 `<h1>` elements per file in `sites/`; all hidden views remain in DOM.
- **Handbook:** `accessibility-international-local/01-accessibility-seo.md` — one H1 per page.
- **Action:** Use one H1 per active view; or migrate to multi-page architecture.

### H5. Weak image optimization on `sites/` and migrated `01`/`02`

- **Evidence:** Bedrock uses 32 external Unsplash `<img>` with no dimensions and CSS hero backgrounds. Migrated 01/02 use raw `<img>` without `next/image` or `remotePatterns`. 02 has no alt text anywhere.
- **Action:** Add `width`/`height`; use `next/image` with remotePatterns; write descriptive alt text.
- **Validation:** Run Lighthouse on representative pages; target LCP < 2.5s, CLS < 0.1.

### H6. Aggregate rating without visible reviews

- **Evidence:** `02-sunterra-solar` and `05-elite` include `aggregateRating` (4.9 / 4200–847) with no individual `Review` markup visible on most pages.
- **Handbook:** Structured data must be supported by visible page content.
- **Action:** Either add visible review feed or remove `aggregateRating` until real reviews are surfaced.

### H7. Transactional/utility routes indexable when `SITE_INDEXING_ENABLED` on (`web/`)

- **Affected:** `/sign-in`, `/sign-up`, `/cart`, `/complete-account`, `/live-chat`
- **Evidence:** No `robots: noindex` and not in `DISALLOWED_CRAWL_PATHS`.
- **Action:** Add `robots: { index: false }` to these pages or add them to disallow list.

### H8. Duplicate legal URLs (`web/`)

- **Evidence:** `/privacy-policy` and `/legal/privacy` serve same content; same for terms. Sitemap lists only `/legal/*`.
- **Action:** Add 301 redirects or canonical consolidation.

### H9. E-commerce schema incomplete (`sites/03-primora` + `Frontend_Nextjs`)

- **Evidence:** Primora has one sample `Product` only; no `Store`, `ItemList`, `BreadcrumbList`, per-PDP `Product`. `Frontend_Nextjs` sites lack product/listing schemas.
- **Action:** Define schema strategy per route type for any shoppable surface.

---

## 3. Medium Issues

### M1. `web/` release gates cover only 2 SEO routes

- **Evidence:** `web/tests/e2e/release-gates.spec.ts` tests homepage + one category route. No service/blog/portfolio metadata checks.
- **Action:** Expand release gates to sample metadata, canonical, JSON-LD across services, blog, portfolio, robots.txt, and sitemap URL spot-checks.

### M2. Global FAQ schema on all marketing routes

- **Evidence:** `Frontend_Nextjs/01` and `02` inject `FAQPage` in root layout; `web/` services may also carry global FAQ.
- **Handbook:** Route-type-specific schema.
- **Action:** Move FAQ schema to pages that actually render FAQ content.

### M3. Missing Twitter cards on `web/` blog and `05-elite` subpages

- **Action:** Add `twitter: { card, title, description, images }` to metadata.

### M4. `web/` blog `datePublished` not ISO 8601

- **Evidence:** `Frontend_Nextjs/02-sunterra-solar` uses `"4 Jun 2026"` in `Article` schema.
- **Action:** Use ISO 8601 format (`2026-06-04`).

### M5. Localhost fallback for production canonicals (`01`/`02` migrated sites)

- **Evidence:** `getSiteUrl()` defaults to `http://localhost:3000` when `NEXT_PUBLIC_SITE_URL` is absent.
- **Action:** Set production env and add build-time validation to fail on localhost fallback.

### M6. `web/` sitemap `lastModified` set to `now` for static routes

- **Evidence:** `sitemap.ts` L44–48 uses `new Date()` for static routes.
- **Action:** Use real content update dates or omit `lastModified`.

### M7. `web/` internal link to redirected URL

- **Evidence:** Mobile nav still links `/additional-services` (301 to `/services/technical-seo`).
- **Action:** Update link to final URL.

### M8. No `next.config` redirects in migrated sites

- **Action:** Add redirects from old `sites/*.html` paths when client sites are deployed.

---

## 4. What Passes Well

- **Crawl hygiene:** `robots.ts`, `sitemap.ts`, preview/API noindex headers, preview middleware blocking in `web/`.
- **Transactional de-indexing:** Dashboard, checkout, success correctly noindexed/disallowed in `web/`.
- **Structured data maturity:** `web/` homepage `Organization` + `WebSite` + `SearchAction`; product/category `Product`/`CollectionPage`/`BreadcrumbList`; Sunterra `LocalBusiness` + `Service` + `FAQPage`.
- **HTML template head completeness:** 3 of 4 `sites/` files have full title/description/robots/canonical/OG/Twitter/JSON-LD.
- **Template stack discipline:** `sites/` use vanilla inline CSS/JS (no CDN scripts), Sunterra/Primora are SVG-first.
- **Next.js migration pattern:** All 3 `Frontend_Nextjs` sites use App Router, `metadata.ts`, `JsonLd.tsx`, `sitemap.ts`, `robots.ts`.

---

## 5. Missing Evidence / External Inputs Needed

| Item | Why | Secret? |
|------|-----|---------|
| Production env values (`SITE_INDEXING_ENABLED`, `NEXT_PUBLIC_SITE_URL`) | Verify noindex removal and canonical base URL | No (safe to paste) |
| Google Search Console property access | Index coverage, crawl errors | Credentials secret; exports safe |
| Live rendered `<head>` snapshots | Confirm canonical inheritance, OG tags, robots meta | Safe |
| Lighthouse / CWV reports | LCP, CLS, INP on homepage, service, product, category pages | Safe |
| Crawl export (Screaming Frog/Sitebulb) | Broken links, canonical conflicts, redirect chains | Safe |
| Rich Results Test / Schema Markup Validator | JSON-LD validity for homepage, product, category, services | Safe |
| CDN / DNS config (www↔apex, HSTS, trailing slash) | Edge-level canonical signals | No secrets |

---

## 6. AI-Executable Technical SEO Plan

### Phase 1 — Launch Blockers (`web/`)

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 1.1 | Set `SITE_INDEXING_ENABLED=true` in production Vercel env and verify | `@devops-release-engineer` | Production robots.txt + meta robots |
| 1.2 | Fix root canonical inheritance — scope root canonical to `/` only; add self-canonical to all indexable routes | `@senior-frontend-specialist` | Rendered `<head>` per route |
| 1.3 | Add per-route metadata (canonical + OG + Twitter) to `/services/technical-seo`, `/digital-products`, `/services`, `/blog`, `/portfolio`, `/faq`, `/about`, `/contact`, `/pricing` | `@senior-frontend-specialist` + `@frontend-content-strategist` | Metadata exports on disk |
| 1.4 | Add `robots: noindex` to `/sign-in`, `/sign-up`, `/cart`, `/complete-account`, `/live-chat` | `@senior-frontend-specialist` | Rendered robots meta |
| 1.5 | Consolidate duplicate legal URLs (`/privacy-policy` → `/legal/privacy`, `/terms-of-service` → `/legal/terms`) | `@senior-frontend-specialist` | Redirects in `next.config.ts` |

### Phase 2 — Structured Data Expansion (`web/`)

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 2.1 | Add `Service` + `FAQPage` JSON-LD to `/services/technical-seo` and other service pages | `@senior-frontend-specialist` | Rich Results Test pass |
| 2.2 | Add `BlogPosting`/`Article` JSON-LD to blog posts | `@senior-frontend-specialist` | Schema Markup Validator pass |
| 2.3 | Add `CreativeWork` JSON-LD to portfolio case studies | `@senior-frontend-specialist` | Validator pass |
| 2.4 | Fix or remove `SearchAction` | `@senior-frontend-specialist` | Working search endpoint OR removed schema |

### Phase 3 — CI SEO Enforcement (`web/`)

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 3.1 | Expand release-gate SEO tests to sample metadata + canonical + JSON-LD across services, blog, portfolio, robots.txt, sitemap URL spot-check | `@senior-frontend-specialist` | `release-gates.spec.ts` passes |
| 3.2 | Add `npm run health:check` pass as mandatory pre-launch gate | `@frontend-quality-enforcer` | CI green |
| 3.3 | Fix sitemap `lastModified` to use real dates or omit | `@senior-frontend-specialist` | Sitemap XML review |

### Phase 4 — HTML Templates (`sites/`)

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 4.1 | Fix `01-BedrockConstruction.html` full SEO head + Organization/LocalBusiness JSON-LD + theme-color + favicon | `frontend-architect` + `html-website-builder` | Browser `<head>` inspect |
| 4.2 | Remove external Google Fonts from Bedrock (use system stack or inline `@font-face`) | `frontend-architect` | No external CSS requests |
| 4.3 | Fix broken `projects.html` links and dead `href="#"` anchors | `frontend-architect` | Link crawl |
| 4.4 | Collapse multiple H1s to one per active view OR migrate SPA templates to Next.js for real URLs | `frontend-architect` / `nextjs-migration-architect` | Heading count = 1 per route |
| 4.5 | Add `noindex` to cart/checkout/login/account/success/404 views in Primora | `frontend-architect` | Meta robots inspect |
| 4.6 | Deduplicate Sunterra templates (pick one production version) | `frontend-architect` | Single canonical domain |

### Phase 5 — Migrated Next.js Sites (`Frontend_Nextjs/`)

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 5.1 | Create real `public/og-image.png` (1200×630) for `01` and `02` | `nextjs-migration-architect` / `design-system-architect` | Image request 200 + correct dimensions |
| 5.2 | Convert `05-elite` `og-image.svg` to PNG/JPG | `nextjs-migration-architect` | Social crawler test |
| 5.3 | Add `images.remotePatterns` + migrate `01`/`02` to `next/image` | `nextjs-migration-architect` | Lighthouse performance |
| 5.4 | Add alt text everywhere in `02-sunterra-solar` | `nextjs-migration-architect` | a11y audit pass |
| 5.5 | Move global FAQ JSON-LD from root layout to FAQ/home routes only | `nextjs-migration-architect` | Schema route mapping |
| 5.6 | Fix `SearchAction` in `05-elite` or remove it | `nextjs-migration-architect` | Validator pass |
| 5.7 | Fix `aggregateRating` — add visible reviews or remove rating schema | `nextjs-migration-architect` | Rich Results Test |
| 5.8 | Set production `NEXT_PUBLIC_SITE_URL` for `01`/`02` and add build-time validation | `@devops-release-engineer` | Production canonical URLs |
| 5.9 | Add `next.config` redirects from old HTML source URLs | `nextjs-migration-architect` | Redirect smoke test |

### Phase 6 — Observability & Validation

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 6.1 | Set up Google Search Console properties for `www.growrixos.com` and migrated client domains | Human / `@devops-release-engineer` | GSC verification |
| 6.2 | Submit sitemaps and monitor index coverage | Human | GSC index status |
| 6.3 | Run Lighthouse CI or `web-vitals` RUM on homepage + service + product + category | `@senior-frontend-specialist` | CWV passes |
| 6.4 | Run Rich Results Test / Schema Markup Validator on all structured-data routes | `Technical_SEO_expert` | Validator screenshots |
| 6.5 | Document post-launch SEO monitoring cadence in `Ongoing DOCS/SEO/technical-seo/devops-observability/` | `Technical_SEO_expert` | Doc on disk |

---

## 7. Health Score Breakdown

| Category | `web/` | `sites/` | `Frontend_Nextjs/` | Weighted Avg |
|----------|--------|----------|-------------------|---------------|
| Crawlability | 80 | 55 | 75 | 70 |
| Indexability | 50 | 35 | 60 | 48 |
| Renderability | 70 | 60 | 70 | 67 |
| Metadata / Head | 60 | 55 | 60 | 58 |
| Structured Data | 70 | 50 | 60 | 60 |
| Performance / Images | 55 | 40 | 55 | 50 |
| Security / HTTP | 75 | 70 | 65 | 70 |
| Measurability / CI | 50 | 30 | 35 | 38 |
| Observability | 30 | 20 | 25 | 25 |
| **Overall** | **65** | **45** | **55** | **55** |

---

## 8. Next Human Decisions Needed

1. **Confirm production launch intent for `web/`** — if the site is still pre-launch, C1 and C2 are intentional; if you intend to go live, they must be fixed immediately.
2. **Confirm client delivery model for `sites/`** — are these single-file preview demos, or do clients expect indexed multi-page sites? This determines whether hash-routing is acceptable or migration is required.
3. **Provide production URLs / env values** — `NEXT_PUBLIC_SITE_URL`, `SITE_INDEXING_ENABLED`, and deployed client domains for live validation.
4. **Provide GSC / analytics access** — if you want full index coverage and traffic-risk assessment, share read-only GSC access or exports.

---

## 9. Validation Plan

Before declaring any phase complete:

- `npm run health:check` passes in `web/` (lint → typecheck → budgets → tests → build → release gates).
- Rendered HTML sample for each indexable route shows correct `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG tags, Twitter tags, and JSON-LD.
- Rich Results Test and Schema Markup Validator return no errors for representative routes.
- Lighthouse Performance ≥ 95, Accessibility 100, SEO 100, Best Practices 100 on homepage and key templates.
- `robots.txt` allows `/` and sitemap URL is correct on production.

---

*End of audit report.*
