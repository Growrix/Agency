# On-Page SEO Audit Report

Document status: active audit
Last updated: 2026-07-15
Mode: Audit Mode (Audit + Build + Content Strategy)
Agent: On_Page_SEO_expert

---

**Site / scope:** Growrix OS production SaaS — `web/` (`https://www.growrixos.com`)
**Audit date:** 2026-07-15
**Business goal:** Lead generation for custom website / SaaS / mobile app development
**Target market:** Global / English-speaking international clients

## Executive Summary

| Metric | Value |
| --- | --- |
| Pages reviewed | 28 indexable public routes + dynamic CMS routes |
| Critical | 0 |
| High | 4 |
| Medium | 8 |
| Low | 6 |
| Informational | 5 |

**Primary finding:** Technical on-page plumbing (canonical, OG/Twitter, schema, sitemap, H1 structure) had gaps on several routes. Content and keyword alignment with the lead-gen focus is partially misaligned — hero and several pages still emphasize “digital marketplace” and secondary services (AI concierge). **Text rewrites are deferred** pending user approval via the suggested-text-changes document.

## Health Score (0–100)

**Score:** 62/100  
**Rationale:** Solid metadata helper infrastructure and JSON-LD on key templates, but inconsistent metadata coverage, title-template duplication, missing breadcrumbs on detail pages, sitemap omissions, and content-intent drift on homepage/secondary surfaces reduce score. No GSC baseline available (`missing_knowledge`).

## Keyword & Intent Map

| URL | Primary intent | Primary keyword (target) | Secondary keywords | Status |
| --- | --- | --- | --- | --- |
| `/` | Commercial investigation | web development agency | custom website development, SaaS development studio | Misaligned hero copy |
| `/services` | Commercial investigation | web development services | SaaS development, mobile app development | Partial |
| `/services/websites` | Commercial investigation | custom website development | Next.js website agency, conversion-focused websites | Good structure |
| `/services/saas-applications` | Commercial investigation | SaaS development agency | SaaS product development, MVP development | Good structure |
| `/services/mobile-apps` | Commercial investigation | mobile app development agency | React Native app development, iOS Android apps | Good structure |
| `/services/automation` | Commercial investigation | business automation services | workflow automation, integrations | Secondary focus |
| `/services/technical-seo` | Commercial investigation | technical SEO services | Core Web Vitals, schema setup | Secondary focus |
| `/services/ai-business-systems` | Commercial investigation | AI business systems | AI assistants, knowledge systems | Secondary focus |
| `/pricing` | Commercial investigation | web development pricing | SaaS development cost, website project cost | Partial |
| `/about` | Navigational + trust | about Growrix OS | founder-led studio, product studio | E-E-A-T improving |
| `/contact` | Transactional | contact web development agency | start a project, hire developers | Good |
| `/portfolio` | Commercial investigation | web development portfolio | SaaS case studies, app case studies | Good |
| `/book-appointment` | Transactional | book discovery call | free consultation web development | Good CTA |
| `/digital-products` | Transactional | website templates | ready websites, HTML templates | Competes with services intent |
| `/digital-products/free` | Transactional | free website templates | starter downloads | Supporting |
| `/digital-products/bundles` | Transactional | website template bundles | product packs | Supporting |
| `/blog` | Informational | web development blog | SaaS build notes, Next.js guides | Underused for lead gen |
| `/faq` | Informational | Growrix OS FAQ | pricing FAQ, delivery FAQ | Good |
| `/additional-services` | Commercial investigation | SEO setup service | GA4 setup, GSC setup | Overlaps technical-seo service |
| `/ai-concierge` | Navigational | AI Growrix OS | instant answers | Demoted from footer nav |

**Cannibalization notes:**
- `/services/technical-seo` vs `/additional-services` — both target SEO setup; differentiate or consolidate long-term.
- `/digital-products` vs `/services/websites` — marketplace vs custom build; keep distinct intents in titles and H1s.
- `/book-appointment` vs `/contact` — both transactional; acceptable if messaging differs (call vs form).

## Findings

### [SEV-001] Missing canonical / OG / Twitter — multiple public pages

| Field | Value |
| --- | --- |
| Severity | High |
| Intent | All affected routes |
| Current | Raw `metadata` objects without `buildPageMetadata()` |
| Recommended | Migrate to `buildPageMetadata()` for self-canonical + OG + Twitter |
| Business impact | Weak social sharing and inconsistent index signals |
| Handbook | `02-title-meta-optimization.md` |
| Validation | View page source; confirm `og:url`, `twitter:card`, `link rel=canonical` |
| Status | **Fixed in code** (2026-07-15) |

**Affected URLs:** `/book-appointment`, `/additional-services`, `/refund-policy`, `/ai-concierge`, `/digital-products/free`, `/digital-products/bundles`

### [SEV-002] Title template duplication

| Field | Value |
| --- | --- |
| Severity | High |
| Intent | Brand + topic clarity |
| Current | Root layout template `%s \| Growrix OS` + page titles already containing brand |
| Recommended | Remove brand suffix from page-level title strings (structural fix) |
| Business impact | Overlong SERP titles, reduced CTR |
| Handbook | `02-title-meta-optimization.md` |
| Validation | Rendered title ≤ 60 chars where possible |
| Status | **Partially fixed** — brand stripped from 6 listing pages; homepage title rewrite deferred |

### [SEV-003] Missing H1 on digital product sub-pages

| Field | Value |
| --- | --- |
| Severity | Medium |
| Intent | Transactional |
| Current | `SectionHeading` default `h2` on `/digital-products/free` and `/bundles` |
| Recommended | Set `as="h1"` on page heading (no copy change) |
| Business impact | Weaker topical signal for crawlers |
| Handbook | `03-heading-structure.md` |
| Validation | One H1 per page in DOM |
| Status | **Fixed in code** |

### [SEV-004] 404 page not noindexed

| Field | Value |
| --- | --- |
| Severity | Medium |
| Intent | N/A |
| Current | Plain metadata without `robots: noindex` |
| Recommended | `buildPageMetadata({ noIndex: true })` |
| Business impact | Soft-404 URLs may enter index |
| Handbook | Technical handoff — index rules |
| Validation | `<meta name="robots" content="noindex,nofollow">` on 404 |
| Status | **Fixed in code** |

### [SEV-005] Sitemap omissions

| Field | Value |
| --- | --- |
| Severity | Medium |
| Intent | Crawl discovery |
| Current | Missing `/additional-services`, `/privacy-policy`, `/terms-of-service` |
| Recommended | Add to `STATIC_ROUTES` in `sitemap.ts` |
| Business impact | Slower discovery of legal and SEO service pages |
| Handbook | Technical — sitemaps |
| Validation | Fetch `/sitemap.xml`; confirm URLs present |
| Status | **Fixed in code** |

### [SEV-006] Missing BreadcrumbList JSON-LD on detail pages

| Field | Value |
| --- | --- |
| Severity | Medium |
| Intent | Rich results + IA clarity |
| Current | Visual breadcrumbs on blog; no JSON-LD on service/portfolio/product detail |
| Recommended | `buildBreadcrumbListSchema()` on detail templates |
| Business impact | Missed breadcrumb rich-result eligibility |
| Handbook | Technical — structured data |
| Validation | Rich Results Test on sample URLs |
| Status | **Fixed in code** |

### [SEV-007] Homepage hero intent misalignment

| Field | Value |
| --- | --- |
| Severity | High |
| Intent | Commercial investigation — lead gen |
| Current | “Productized SaaS studio + digital marketplace”; primary CTA “Browse Digital Products” |
| Recommended | Reframe hero around custom website/SaaS/mobile app development; CTA to book/contact |
| Business impact | Attracts template buyers over high-value custom build leads |
| Handbook | `08-landing-page-optimization.md` |
| Validation | Message match vs target keywords post-approval |
| Status | **Deferred** — text changes pending approval |

### [SEV-008] Secondary service prominence (AI concierge)

| Field | Value |
| --- | --- |
| Severity | Medium |
| Intent | Focus dilution |
| Current | AI concierge in footer Support; kept per user request |
| Recommended | Keep as utility; ensure primary nav emphasizes websites/SaaS/mobile |
| Business impact | User-approved placement; no action needed |
| Handbook | `05-internal-linking.md` |
| Validation | Nav audit post-change |
| Status | **Partially fixed** — AI concierge removed from footer Support; homepage AI section kept as-is |

### [SEV-009] Homepage missing FAQ / pricing / about sections

| Field | Value |
| --- | --- |
| Severity | Low |
| Intent | Commercial investigation |
| Current | 14 sections; no inline FAQ, pricing, or about on homepage |
| Recommended | Add compact FAQ band + link to pricing; optional founder trust strip |
| Business impact | Extra clicks to convert; weaker E-E-A-T above fold |
| Handbook | `08-landing-page-optimization.md` |
| Validation | Scroll depth + CTA clicks after content approval |
| Status | **Deferred** — content/section changes pending approval |

### [SEV-010] Category pages missing OG image

| Field | Value |
| --- | --- |
| Severity | Low |
| Intent | Social sharing |
| Current | OG/Twitter without `images` on `/digital-products/category/[category]` |
| Recommended | Default share image via `DEFAULT_OG_IMAGE` |
| Business impact | Generic link previews on social |
| Handbook | Technical — metadata |
| Validation | OG debugger |
| Status | **Fixed in code** |

## Internal Link Opportunities

| From | To | Anchor | Rationale |
| --- | --- | --- | --- |
| `/` hero | `/book-appointment` | Book a free consultation | Primary lead-gen CTA |
| `/` services section | `/services/websites` | Custom website development | Pillar service |
| `/pricing` | `/services/saas-applications` | SaaS development | Cross-sell custom build |
| `/blog` posts | `/services/*` | Contextual service links | Cluster → money page |
| `/portfolio` case studies | `/contact` | Start a similar project | Conversion path |
| `/faq` | `/pricing` | See pricing ranges | Commercial investigation |

## Roadmap

| Priority | Action | Owner | Effort | Status |
| --- | --- | --- | --- | --- |
| P0 | Fix metadata plumbing on 6 pages | Technical_SEO_expert | S | Done |
| P0 | Add BreadcrumbList JSON-LD on detail pages | Technical_SEO_expert | S | Done |
| P0 | Sitemap + 404 noindex + H1 structural fixes | Technical_SEO_expert | S | Done |
| P0 | Title template duplication (structural) | Technical_SEO_expert | S | Done |
| P1 | Approve suggested text changes document | User | M | Pending |
| P1 | Homepage hero + CTA realignment | frontend-content-strategist | M | Pending approval |
| P2 | Content cluster execution (blog) | frontend-content-strategist | L | Planned |
| P2 | Resolve `/additional-services` vs `/services/technical-seo` overlap | On_Page_SEO_expert | S | Planned |
| P3 | GSC baseline + 28-day performance review | User + On_Page | S | `missing_knowledge` |

## Missing Knowledge

- Google Search Console impressions/clicks baseline not supplied
- No rank-tracker or competitor SERP exports
- Live crawl of production URL not run (codebase audit only)

## Validation Plan

1. Re-crawl or file review after implementation — **code review complete**
2. Run `npm run health:check` from `web/` — required before sign-off
3. GSC URL inspection after deploy when `SITE_INDEXING_ENABLED=true`
4. GSC performance review at 28 days post-launch
