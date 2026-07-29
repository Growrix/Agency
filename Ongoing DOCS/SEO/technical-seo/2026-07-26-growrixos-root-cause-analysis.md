# Growrix OS — Technical SEO Root-Cause Analysis & Remediation

**Date:** 2026-07-26  
**Mode:** Audit + Build (remediation)  
**Target:** `web/` (Next.js App Router, growrixos.com)  
**Agent:** Technical_SEO_expert

## 1. Executive summary

Three distinct problems surfaced in the user's evidence:

1. **Merchant listings structured data** — Google Search Console email (WNC-10030322, Jul 24) flagged Product schema on growrixos.com with CRITICAL missing `image` plus non-critical warnings (`hasMerchantReturnPolicy`, `shippingDetails`). Root cause: `buildDigitalProductSchema` in `web/src/lib/seo-structured-data.ts` omitted `shippingDetails` and `itemCondition`; products without a parsed numeric price emitted no `offers` block at all (`web/src/app/shop/[slug]/page.tsx:525-526`).
2. **Brand / entity misattribution** — Google AI Overview describes Growrix OS as "a digital copyright and system identifier utilized by the Dhaka-based agency Communicators." The growrixos.com codebase contains **zero** Communicators references in `web/src`. The misattribution originates on **communicatorsbd.com**, which ships `© 2026 Growrix OS` in its footer/meta (visible in SERP snippets). Growrix OS and Communicators share the same Dhaka address (user confirmed), which reinforces Google's Knowledge Graph merge. **We deliberately did NOT add a physical address to Organization schema** — that would reinforce the merge.
3. **Meta titles/descriptions** — Several public routes exceeded SERP length limits (title >60 chars, description >155 chars). Google ignored the homepage meta description and pulled body copy from `HOME_THREE_PATH_COPY` ("Choose the way you want to build...").

Indexing: user confirmed `SITE_INDEXING_ENABLED=true` is set and Production redeployed. GSC "Processing data" is expected for a fresh property — not a code defect.

## 2. Findings table

| # | Issue | Evidence | Severity | Root cause | Fix applied |
|---|-------|----------|----------|------------|-------------|
| F1 | Product JSON-LD missing `shippingDetails` | `seo-structured-data.ts:282-285` (comment said intentionally omitted) | Medium | Digital delivery signal was incomplete for merchant listings validator | Added `OfferShippingDetails` with zero-rate + digital delivery time alongside `DigitalDelivery` |
| F2 | Offer missing `itemCondition` / `sku` | `seo-structured-data.ts:314-335` (original) | Low | Not emitted | Added `itemCondition: NewCondition` and optional `sku` on Product node |
| F3 | Products without parsed price have no `offers` | `shop/[slug]/page.tsx:525-526` — regex fails on "Free"/"Contact" | High | No Offer block → invalid merchant listing | Documented; content fix needed for products without numeric prices |
| F4 | Organization schema lacks contact disambiguation | `seo-structured-data.ts:25-36` | Medium | Thin entity signal vs communicatorsbd.com | Added `contactPoint` (URL-based, no shared Dhaka address) |
| F5 | No Communicators leak in growrixos.com | Grep `web/src` — zero matches | Informational | Leak is on communicatorsbd.com | No code change; user action required |
| F6 | Meta titles over 60 chars | `/services` (61), `/digital-products` (65), `/additional-services` (63) | Medium | Title strings too long before brand suffix | Shortened all three titles |
| F7 | Meta descriptions over 155 chars | `/about` (172), `/contact` (171), `/book-appointment` (156), `/additional-services` (175), `/services/[slug]` (158-178) | Medium | Copy not length-capped | Shortened static pages; added `truncateMetaDescription()` for dynamic service pages |
| F8 | Homepage meta ignored by Google | SERP shows `HOME_THREE_PATH_COPY.description` from body | Medium | Meta description not aligned with primary page message | Refined `HOME_SHARE_DESCRIPTION` to state marketplace + studio identity |
| F9 | `/live-chat` noindex + robots-blocked while publicly linked | `live-chat/layout.tsx` + `site.ts` DISALLOWED | Medium | Dual block wastes crawl budget and produces GSC "Blocked by robots.txt" | Kept noindex; removed from robots disallow (2026-07-29) |
| F10 | Sitemap redirected slugs included | `sitemap.ts` (original) | Low | Stale service URLs in sitemap | Filter `html-business-profiles`, `template-customization`; add `lastModified` |
| F11 | Sitemap emits CMS service slugs that 404 | `services/[slug]/page.tsx:363` + `sitemap.ts` | High | COPY map missing → `notFound()` | Filter sitemap to `PUBLIC_SERVICE_SLUG_SET` |
| F12 | Blog posts beyond first 10 are crawl orphans | `BlogGrid.tsx` Load-more only renders 9 in SSR HTML | Medium | Sitemap-only discovery for older posts | Render all post links in DOM; CSS-hide beyond page size |

## 3. Merchant listings schema — exact fields

| Field | GSC severity | Status after fix |
|-------|-------------|------------------|
| `image` (Product) | Critical | Always emitted; falls back to `/images/og/growrix-os-share.png` |
| `hasMerchantReturnPolicy` (offers) | Non-critical | Emitted: `MerchantReturnNotPermitted`, `merchantReturnDays: 0` |
| `shippingDetails` (offers) | Non-critical | Emitted: zero-rate `OfferShippingDetails` + digital delivery time |
| `itemCondition` (offers) | — | Added: `https://schema.org/NewCondition` |
| `sku` (Product) | — | Added: `product.slug` |

**Remaining content fix:** Products without a dedicated product image still fall back to the OG share image. Google may not accept a brand share image as a merchant listing product image. Ensure every shop product has a real product image in CMS.

## 4. Meta title / description audit (this pass)

| Page | Title (resolved) | Description | Issue | Fix |
|------|-----------------|-------------|-------|-----|
| `/` | Custom Website, SaaS & Mobile App Studio \| Growrix OS (53) | Refined to marketplace + studio identity (≤155) | Google ignored old meta | Updated `HOME_SHARE_DESCRIPTION` |
| `/services` | Web Dev Services — Websites, SaaS & Apps \| Growrix OS (≤60) | OK | Title was 61 | Shortened title |
| `/digital-products` | Digital Products — Templates & Toolkits \| Growrix OS (≤60) | OK | Title was 65 | Shortened title |
| `/additional-services` | SEO & Analytics Setup Package \| Growrix OS (≤60) | Shortened to ≤155 | Title 63, desc 175 | Both shortened |
| `/about` | OK | Shortened to ≤155 | Desc 172 | Shortened |
| `/contact` | OK | Shortened to ≤155 | Desc 171 | Shortened |
| `/book-appointment` | OK | Shortened to ≤155 | Desc 156 | Shortened |
| `/services/[slug]` | Dynamic | `truncateMetaDescription()` | Descs 158-178 | Capped at 155 |
| `/live-chat` | Live Chat \| Growrix OS | Unique description | Publicly linked but noindex | Keep noindex; removed from robots.txt disallow (crawlable, not indexable) |

## 5. Indexing signal audit

| Signal | Status | Notes |
|--------|--------|-------|
| `SITE_INDEXING_ENABLED` | User confirmed `true` + redeployed | Code default is `false`; env must stay set |
| `robots.ts` | Clean | Gated; disallows crawl paths when enabled |
| `sitemap.ts` | Fixed | Now gated; filters redirected service slugs; adds `lastModified` |
| Canonical / `metadataBase` | Clean | All resolve to `https://www.growrixos.com` |
| Google site verification | Missing | No meta token or `google*.html` in `public/` |
| `grow10x.io` / `communicatorsbd` in `web/src` | Clean | Zero matches |

## 6. Files changed (this pass)

| File | Change |
|------|--------|
| `web/src/lib/seo-structured-data.ts` | `contactPoint` on Organization; `shippingDetails`, `itemCondition`, `sku` on Product schema |
| `web/src/lib/seo-metadata.ts` | Refined `HOME_SHARE_DESCRIPTION`; added `truncateMetaDescription()` |
| `web/src/app/shop/[slug]/page.tsx` | Pass `sku: product.slug` to schema builder |
| `web/src/app/services/page.tsx` | Shortened title |
| `web/src/app/shop/page.tsx` | Shortened title |
| `web/src/app/additional-services/page.tsx` | Shortened title + description |
| `web/src/app/about/page.tsx` | Shortened description |
| `web/src/app/contact/page.tsx` | Shortened description |
| `web/src/app/book-appointment/page.tsx` | Shortened description |
| `web/src/app/services/[slug]/page.tsx` | Cap description via `truncateMetaDescription()` |
| `web/src/app/live-chat/layout.tsx` | Removed noindex; fixed title |
| `web/src/app/sitemap.ts` | Filter redirected slugs, add `lastModified` |

## 7. Further plan (external — cannot be done in codebase)

### P0 — communicatorsbd.com (highest impact on AI Overview)
1. Remove `© 2026 Growrix OS` from footer, meta, and visible copy. Replace with Communicators branding.
2. Rebrand all template defaults if built from Growrix OS template.
3. Add Communicators-specific Organization schema (name, url, address, services).
4. Request re-crawl in GSC for communicatorsbd.com.

### P1 — Google Search Console (growrixos.com)
1. Submit `https://www.growrixos.com/sitemap.xml`.
2. URL Inspection → Request indexing on `/`, `/services`, `/pricing`, `/digital-products`, `/about`.
3. Wait for "Processing data" to finish (3–7 days).
4. Rich Results Test on a product URL after deploy.

### P2 — Google Business Profile
1. Separate Growrix OS listing from Communicators (distinct category/phone/hours).
2. Review `NEXT_PUBLIC_GOOGLE_PLACE_SEARCH_TEXT` in `.env.example` — ensure it points to the correct Growrix OS Place, not Communicators.

### P3 — Google site verification
1. Provide verification token; wire into `app/layout.tsx` `metadata.verification.google`.

## 8. GSC Page indexing coverage remediation (2026-07-27 report / 2026-07-29 fix)

**Source:** `Ongoing DOCS/Pingdom tests/growrixos.com-Coverage-2026-07-27/` (GSC Page indexing export dated 2026-07-24).

| Metric | Value |
|--------|-------|
| Indexed | 8 |
| Not indexed | 102 |
| Impressions (peak) | 17 |

### Coverage breakdown

| Reason | Pages | Verdict | Action |
|--------|-------|---------|--------|
| Discovered - currently not indexed | 90 | New-site crawl priority — not a code bug | Request indexing on hubs; wait; build authority |
| Excluded by noindex tag | 4 | Mostly intentional (auth/transactional + `/live-chat` + `/html-business-profiles`) | Keep |
| Page with redirect | 3 | Expected legacy URLs (`/shop`, `/products`, `/privacy-policy`, etc.) | Keep redirects |
| Blocked by robots.txt | 2 | `/live-chat` + `/cart` publicly linked while disallowed | Unblocked `/live-chat` crawl; keep `/cart` blocked |
| Not found (404) | 1 | CMS service slug in sitemap without local COPY map | Filter sitemap to `PUBLIC_SERVICE_SLUG_SET` |
| Alternate page with proper canonical | 1 | `/shop` → canonical `/digital-products` | Expected / correct |
| Crawled - currently not indexed | 1 | Inspect specific URL in GSC | External |

### Codebase fixes applied (this pass)

| File | Change |
|------|--------|
| `web/src/lib/public-service-slugs.ts` | **New** — exports the 6 service slugs that have local COPY and can render without 404 |
| `web/src/app/sitemap.ts` | Filter service entries to `PUBLIC_SERVICE_SLUG_SET` (in addition to redirected-slug filter) |
| `web/src/lib/site.ts` | Remove `/live-chat` from `DISALLOWED_CRAWL_PATHS` (keep noindex in layout) |
| `web/src/components/sections/BlogGrid.tsx` | Render ALL blog post `<Link>` cards in initial HTML; CSS-hide beyond page size so Google can crawl orphans via internal links |

### External actions still required

1. GSC → Request indexing on hub pages: `/`, `/services`, `/digital-products`, `/about`, `/contact`, `/portfolio`, `/blog`.
2. GSC → URL Inspection on the exact "Crawled - currently not indexed" and "Not found (404)" URLs.
3. Re-check Page indexing report 5–7 days after this deploy.
4. Off-page authority (→ `Off_Page_SEO_expert`) remains the biggest lever for the 90 discovered-not-indexed pages.
5. communicatorsbd.com copyright rebrand (still open from Section 7 P0).
