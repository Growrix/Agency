# Technical SEO Audit + Implementation Brief — Grok Findings Revalidation

**Date:** 2026-09-10  
**Mode:** Audit then Build  
**Lane:** `web/` / `PRJ-SAAS-GROWRIXOS-001`  
**Agent:** `AG-GRO-SEO-TECH-001`  
**Source docs:** `on-page/04`, `03`, `01`, `02`, `05`; `media/01`; `performance/01`

## Executive Summary

Grok’s P0–P2 list was revalidated against live `https://www.growrixos.com` and `web/` source. Confirmed P0/P1 engineering items were implemented in this pass. P2 IA (niche URLs, `/work/`, blog clusters), GSC/Bing verify, and `llms.txt` remain out of scope.

**Release decision (code):** Conditional Pass after `npm run health:check` — Cloudflare edge robots preamble remains; GSC field data is `missing_knowledge`.

## Validation Matrix (Grok → evidence → action)

| Item | Verdict | Action taken |
| --- | --- | --- |
| Clerk on public pages | Real — Critical | Root layout no longer wraps Clerk; provider only on auth/app layouts; marketing uses `/sign-in` links + `/api/v1/me` session probe |
| robots.txt `Host:` | Real — High | Removed `host` from `robots.ts`; e2e asserts no `Host:` line |
| Hero AVIF/WebP LCP | Real — High (partial) | Hero posters default WebP; preload with `type`/`imageSrcSet`/`imageSizes`; PNG fallback in `<picture>` |
| React #418 hydration | Plausible — High | Clerk widgets off marketing SSR; footer year `suppressHydrationWarning` |
| GA defer | Mostly done — Low | Idle after `load` + `lazyOnload` |
| Shrink DOM | Partial — Medium | Lazy `CartDrawer` when open; viewport gate dual-tree kept |
| Service JSON-LD | Already shipped | Verified; e2e covers all public slugs |
| Internal linking | Partial — Medium | `ServiceExploreLinks` → pricing/portfolio/contact/services |
| Title vs H1 | Low | Service `generateMetadata` uses visible headline |
| Canonical trailing slash | Low | `trailingSlash: false` |
| P2 / GSC / llms | Out of scope | Documented only |

## Implementation Brief

**Allowed folders:** `web/src/**`, `web/tests/e2e/**`, `web/next.config.ts`, SEO audit docs, task ledgers.

**Acceptance criteria:**

1. Marketing HTML does not initialize `ClerkProvider` / clerk-js widgets in header.
2. App `robots.txt` has no `Host:` directive.
3. Homepage LCP preload prefers WebP with sizes.
4. Service pages keep Service + FAQPage + BreadcrumbList and link pricing/portfolio/contact.
5. `npm run health:check` exits 0.

**Out of scope:** `/work/…`, AU niche pages, blog topic-cluster content, GSC/Bing operator verify, Cloudflare managed robots block removal, dismantling `MarketingViewportGate`.

## missing_knowledge

- Live GSC coverage export after this deploy
- Bing Webmaster status
- Field CWV (CrUX) post-deploy
- Whether Cloudflare dashboard can trim Content-Signal robots preamble

## Follow-up — 2026-09-16 indexing default

**Root cause:** `SITE_INDEXING_ENABLED === "true"` fail-closed meant any missing env silently blocked Google via `Disallow: /` + root `noindex`.

**Fix shipped in code:** production defaults ON (`resolveSiteIndexingEnabled` in `web/src/lib/site.ts`). Preview/dev still blocked. Explicit `SITE_INDEXING_ENABLED=false` remains the kill-switch.

**Live check (pre-deploy of this fix):** www already returned `Allow: /` and `meta robots=index,follow` when Production env had the flag set. Remaining live debt: `Host:` line until redeploy of Host-removal + this default flip.

## Validation Plan

1. Mid-phase: `ReadLints` on touched files
2. Phase-end: `npm run health:check` from `web/`
3. Post-deploy: curl production `robots.txt` — Next section must lack `Host:`
4. Operator: resubmit sitemap in GSC after deploy
