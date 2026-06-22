# Performance Delta Report (HAR Follow-Up)

This report tracks measurable deltas from the latest baseline HAR and the current optimization pass.

## Baseline (From `Ongoing DOCS/har.json`)

- Pages captured: 1
- Total requests: 35
- Total body bytes: 486,827
- `onContentLoad`: 3,120 ms
- `onLoad`: 4,604 ms
- Average server wait (`timings.wait`): 406.7 ms
- Top request domains:
  - `www.growrixos.com`: 34
  - `static.cloudflareinsights.com`: 1
- Top response types:
  - JavaScript: 20
  - Images (webp/svg): 7
  - Fonts (woff2): 3
  - CSS: 2

## Pingdom Baseline (Frankfurt, 2026-06-22)

- Performance grade: B (80)
- Load time: 2.37 s
- Page size: 546.2 KB
- Requests: 36 (23 images, ~44% of weight)
- Failed checks: gzip (F — tooling artifact), fewer HTTP requests (D)
- Compression verification (`curl -H 'Accept-Encoding: br,gzip'`): **`Content-Encoding: br`** confirmed on `/` HTML (Vercel Brotli active; Pingdom gzip check is not authoritative)

## What Changed in This Pass

- Added route-level revalidation for:
  - Home page
  - Category landing page
  - Sitemap
  - HTML preview API route
- Added server-side cache layers (`unstable_cache`) for:
  - Public catalog products
  - Public services
  - Public portfolio
  - Blog content list
  - Home marketing content fetch
  - **Unified `getHomePageData()` blob** (single cache key for all homepage SSR fetches)
- Reduced preview payload pressure:
  - Clamped Unsplash URL params (`w <= 1280`, `q <= 70`) across preview HTML assets
  - Enforced `loading="lazy"` + `decoding="async"` for preview images
  - **Build-time preview HTML optimizer** (`scripts/optimize-preview-html.mjs`) runs before `next build`
  - **Production preview URLs now serve static `/previews/` files** (1-year CDN cache) instead of serverless API `readFile`
  - Lowered deferred-preview concurrency and preload margin
  - Disabled autoplay defaults in dual preview carousels
  - **Poster-first homepage preview strategy** (click-to-load live iframe; max 1 auto-live preview per band)
  - Homepage showcase: desktop-only, poster-first carousel; mobile section hidden
- Reduced render and metadata overhead:
  - Scoped font weight sets in root layout (13 → 8 font files)
  - Removed duplicate shortcut favicon metadata
  - Dynamic import for ConciergeModal, ChatLauncher, heavy homepage client sections
- Infrastructure and monitoring:
  - Vercel Speed Insights component in root layout
  - Cron cache warmer (`/api/cron/warm-cache` every 5 min)
  - Fixed `/api/:path*` `no-store` header conflict with preview routes
- Hardened regression gates:
  - Homepage load threshold tightened to 4 s
  - Resource count budget (≤30 on domcontentloaded)
  - Preview iframe budget counts static + API preview URLs (homepage ≤1)

## Current Internal Gate Results

- Preview budgets: pass (run `npm run perf:budgets`)
- Lint: pending CI
- Release gates: pending CI
- Production build: pending CI

## External Delta Table (Fill With Shared Evidence)

| URL | Tool | Baseline | After | Delta |
| --- | --- | --- | --- | --- |
| Home | Pingdom Load Time | 2.37 s | TBD post-deploy | TBD |
| Home | Pingdom Requests | 36 | TBD post-deploy | TBD |
| Home | PSI Mobile Perf | TBD | TBD | TBD |
| Home | WPT LCP | TBD | TBD | TBD |
| Home | TTFB (curl) | ~1.5–2 s wait | TBD post-deploy | TBD |
| Home | Compression | br confirmed | br | OK |
| Blog | Pingdom Load Time | TBD | TBD | TBD |
| Blog | PSI Mobile Perf | TBD | TBD | TBD |
| Preview Category | Pingdom Load Time | TBD | TBD | TBD |
| Preview Category | Pingdom Requests | TBD | TBD | TBD |
| Preview Category | WPT LCP | TBD | TBD | TBD |

## Notes

- External tool evidence is required for final numeric before/after claims.
- Use `DOC/performance-external-test-runbook-2026-06-19.md` to keep all runs consistent.
- Re-run Pingdom from Frankfurt after deploy to populate the After column.
