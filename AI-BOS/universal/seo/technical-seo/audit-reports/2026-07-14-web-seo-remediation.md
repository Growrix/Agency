# web/ Technical SEO Remediation — Completion Report

**Date:** 2026-07-14  
**Scope:** `web/` only (Growrix OS live site)  
**Plan:** Focused Technical SEO Remediation (Critical + High issues)  
**Status:** Code remediation complete; production launch still requires `SITE_INDEXING_ENABLED=true`

---

## Issues Remediated

| ID | Severity | Issue | Resolution |
|----|----------|-------|------------|
| C1 | Critical | Global indexing gated by env (intentional pre-launch) | No code change; `DISALLOWED_CRAWL_PATHS` expanded for transactional routes |
| C2 | Critical | Root canonical `/` inherited by child routes | Removed `alternates.canonical` from `layout.tsx`; per-route `buildPageMetadata()` on all indexable routes |
| H3 | High | Incomplete metadata on high-value routes | `web/src/lib/seo-metadata.ts` + `buildPageMetadata()` on services, blog, portfolio, FAQ, about, contact, pricing, digital-products, homepage |
| H4 | High | Missing structured data | `web/src/lib/seo-structured-data.ts` — Service, FAQPage, BlogPosting, CreativeWork; Organization.sameAs on homepage |
| H5 | High | Invalid SearchAction target | Removed SearchAction from homepage WebSite schema |
| H6 | High | Duplicate legal URLs | 301 redirects `/privacy-policy` → `/legal/privacy`, `/terms-of-service` → `/legal/terms`; canonicals point to `/legal/*` |
| H7 | High | Transactional routes indexable | `robots: noindex` on sign-in, sign-up, cart, complete-account, live-chat; paths added to `DISALLOWED_CRAWL_PATHS` |
| M9 | Medium | Sitemap `lastModified: now` on static routes | Omitted `lastModified` for static/category/product/service/portfolio entries; blog keeps `publishedAt` |
| M10 | Medium | Mobile nav `/additional-services` link | Updated to `/services/technical-seo` in `nav.ts` |
| M8 | Medium | Release gates coverage | Expanded `release-gates.spec.ts` to 15 tests (services, blog, portfolio, FAQ, robots, sitemap, noindex, legal redirects) |

---

## New / Modified Files

- `web/src/lib/seo-metadata.ts` — shared metadata builder
- `web/src/lib/seo-structured-data.ts` — JSON-LD builders
- `web/src/lib/site.ts` — expanded `DISALLOWED_CRAWL_PATHS`
- `web/src/app/layout.tsx` — removed global canonical
- Per-route metadata + JSON-LD across homepage, services, blog, portfolio, FAQ, about, contact, pricing, shop/digital-products
- `web/src/app/complete-account/layout.tsx`, `web/src/app/live-chat/layout.tsx` — noindex metadata
- `web/next.config.ts` — legal URL 301 redirects
- `web/src/lib/nav.ts` — mobile SEO nav fix
- `web/src/app/sitemap.ts` — static `lastModified` removed
- `web/tests/e2e/release-gates.spec.ts` — expanded SEO gates

---

## Validation Evidence

| Gate | Result |
|------|--------|
| ESLint | Pass |
| TypeScript | Pass |
| perf:budgets | Pass |
| Unit + integration tests | Pass |
| `next build` | Pass |
| `release-gates.spec.ts` | 15/15 pass (desktop-chrome) |

---

## Remaining Human Actions (Post-Code)

1. Set `SITE_INDEXING_ENABLED=true` and `NEXT_PUBLIC_SITE_URL=https://www.growrixos.com` in production Vercel env before go-live.
2. Verify rendered `<head>` on production for key routes (canonical, OG, Twitter, JSON-LD).
3. Submit sitemap in Google Search Console after indexing enabled.
4. Run Rich Results Test / Lighthouse on production URLs.

---

## Updated Health Score (web/ only, post-remediation estimate)

| Category | Before | After (estimate) |
|----------|--------|------------------|
| Indexability | 50 | 85 (pending env flip) |
| Metadata / Head | 60 | 90 |
| Structured Data | 70 | 88 |
| Measurability / CI | 50 | 75 |
| **Overall** | **65** | **82** (Pass pending production env) |

---

*Remediation complete. See root `tasks.md` WEB-SEO-001..005 for ledger entries.*
