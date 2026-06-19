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
- Reduced preview payload pressure:
  - Clamped Unsplash URL params (`w <= 1280`, `q <= 70`) across preview HTML assets
  - Enforced `loading="lazy"` + `decoding="async"` for preview images
  - Lowered deferred-preview concurrency and preload margin
  - Disabled autoplay defaults in dual preview carousels
- Reduced render and metadata overhead:
  - Scoped font weight sets in root layout
  - Removed duplicate shortcut favicon metadata
  - Simplified route transition wrapper
- Hardened regression gates:
  - Added preview-budget script and CI step
  - Tightened release-gate load-time threshold
  - Expanded SEO release gates (homepage `SearchAction`, category `BreadcrumbList`)

## Current Internal Gate Results

- Preview budgets: pass
- Lint: pass
- Release gates (desktop-chrome): 6/6 pass
- Production build: pass

## External Delta Table (Fill With Shared Evidence)

| URL | Tool | Baseline | After | Delta |
| --- | --- | --- | --- | --- |
| Home | Pingdom Load Time | TBD | TBD | TBD |
| Home | Pingdom Requests | 35 | TBD | TBD |
| Home | PSI Mobile Perf | TBD | TBD | TBD |
| Home | WPT LCP | TBD | TBD | TBD |
| Blog | Pingdom Load Time | TBD | TBD | TBD |
| Blog | PSI Mobile Perf | TBD | TBD | TBD |
| Preview Category | Pingdom Load Time | TBD | TBD | TBD |
| Preview Category | Pingdom Requests | TBD | TBD | TBD |
| Preview Category | WPT LCP | TBD | TBD | TBD |

## Notes

- External tool evidence is required for final numeric before/after claims.
- Use `DOC/performance-external-test-runbook-2026-06-19.md` to keep all runs consistent.
