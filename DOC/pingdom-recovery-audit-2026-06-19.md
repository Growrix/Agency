# Pingdom Recovery Audit - 2026-06-19

## Baseline Captured

### Pingdom snapshot (provided)
- Performance grade: ~70
- Load time: ~3.0s
- Page size: ~57.4MB
- Requests: ~474

### Lighthouse artifacts analyzed
- Source files:
  - `.cursor/tmp-lh-home.json`
  - `.cursor/tmp-lh-blog.json`
  - `.cursor/tmp-lh-preview-category.json`

| Route | Perf | FCP | LCP | Speed Index | TBT | Requests | Total Bytes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 52 | 2.3s | 3.7s | 5.7s | 4,760ms | 147 | 4.65MB |
| `/blog` | 89 | 1.3s | 2.5s | 2.9s | 340ms | 58 | 0.52MB |
| `/products/category/website-templates-html-preview` | 54 | 2.1s | 2.9s | 14.8s | 3,330ms | 149 | 2.41MB |

### Primary root causes from measured requests
- Repeated heavy Unsplash media in embedded template previews (multiple 100-600KB images).
- Preview iframes mounted too early (including offscreen/adjacent slides).
- Preview carousels and mobile+desktop preview sections increasing concurrent iframe/network load.
- Shared JS chunks are moderate, but main-thread pressure spikes when preview iframes execute simultaneously.

## Implemented Remediation (Code)

### 1) Media weight reduction for preview HTML
- Switched website-template preview rendering to an API-served optimization pipeline:
  - `web/src/app/api/website-templates-html-preview/[templateSlug]/route.ts`
- Added server-side rewrite for Unsplash URLs:
  - clamp image width to `<=1280`
  - clamp quality to `<=70`
- Added automatic `loading=\"lazy\"` + `decoding=\"async\"` for `img` tags missing loading behavior.

### 2) Request count and iframe burst reduction
- Homepage preview payload reduced by default:
  - hide desktop showcase block on `/` and keep mobile showcase:
    - `web/src/app/page.tsx`
- Carousel loading strategy tightened:
  - previews no longer mount for adjacent slides by default
  - offscreen carousels do not mount iframe previews until intersecting viewport
  - iframe loading changed from eager to lazy in carousel preview renderer
  - file: `web/src/components/sections/HtmlProfileHeroCarousel.tsx`
- Default autoplay toned down for heavy preview surfaces:
  - category hero desktop preview autoplay disabled
  - html business profile hero autoplay defaults disabled
  - files:
    - `web/src/components/sections/WebsiteTemplatesHtmlPreviewCategoryLanding.tsx`
    - `web/src/components/sections/HtmlBusinessProfilesCategoryHero.tsx`

### 3) Delivery optimization hardening
- Next.js config updated:
  - `compress: true`
  - `poweredByHeader: false`
  - AVIF/WebP image formats enabled
  - Unsplash host whitelisted in image remote patterns
  - immutable cache headers for `/_next/static/*`
  - explicit cache policy for `/_next/image`
  - package import optimization for `@heroicons/react` and `framer-motion`
  - file: `web/next.config.ts`
- Added DNS-prefetch + preconnect for key image/content origins:
  - `web/src/app/layout.tsx`

### 4) Technical SEO readiness hardening
- Added category-level structured data for product category pages:
  - `CollectionPage` + `BreadcrumbList`
  - file: `web/src/app/products/category/[category]/page.tsx`
- Expanded homepage WebSite JSON-LD with `SearchAction`:
  - file: `web/src/app/page.tsx`

### 5) Regression gates (CI-aligned)
- Added release-gate tests for:
  - preview iframe count budget on `/` and HTML preview category route
  - canonical + CollectionPage JSON-LD presence on category route
  - file: `web/tests/e2e/release-gates.spec.ts`

## Expected Impact Range
- Homepage performance score: +10 to +22 points (largest gains from iframe deferral + media clamping).
- HTML preview category score: +12 to +25 points (offscreen gating + autoplay reduction + optimized media URLs).
- Initial request count: typically reduced by 25-55% on preview-heavy routes before user interaction.
- Initial transfer size: typically reduced by 35-70% on preview-heavy routes depending on active slide.
- Main-thread blocking: expected meaningful reduction on preview-heavy routes due fewer concurrent iframe scripts.

## Verification Evidence (Local)
- `npm run lint` passes after all changes.
- `npx playwright test tests/e2e/release-gates.spec.ts --project=desktop-chrome` passes (`5/5`).
- New automated gates now enforce:
  - preview iframe count budget on `/` and HTML preview category route,
  - canonical URL presence,
  - CollectionPage JSON-LD presence.

## Technical SEO + Performance Readiness Checklist
- Crawl/index controls: robots + sitemap in place, category canonicals in place.
- Structured data: Organization/WebSite on home, CollectionPage + BreadcrumbList on category routes.
- Preview hygiene: preview routes remain noindex/nofollow with stricter security headers.
- Performance governance: e2e release gates now check preview iframe budget and SEO metadata presence.

## Recommended Next Verification Run (Post-Deploy)
- Re-run:
  - Pingdom from same test region
  - Lighthouse mobile and desktop for `/`, `/blog`, `/products/category/website-templates-html-preview`
  - PageSpeed Insights + Search Console CWV trend
- Validate 7-day trend:
  - p75 LCP <= 2.5s
  - p75 INP <= 200ms
  - p75 CLS <= 0.1
