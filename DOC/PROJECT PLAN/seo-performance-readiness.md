# HTML Preview Performance + Technical SEO Readiness

This note records the performance baseline, the changes shipped to reduce
preview-iframe load, and the release gates that must pass before the site is
opened to search engines. It is the durable companion to the
`SEO Performance Audit Plan`.

## 1. Performance baseline (Phase 0)

### Measured preview corpus

Measured from `web/public/previews/` on the `HTML_WEBSITE` branch:

| Metric | Value |
| --- | --- |
| Standalone preview HTML files | 94 |
| Total on-disk size | ~2.46 MB (2,583,280 bytes) |
| Average file size | ~27 KB |
| Largest file | ~386 KB (Primora) |

Each preview is a full standalone HTML document (inline CSS/JS, sometimes Google
Fonts) loaded inside an `<iframe>`, so every embed costs a separate parse,
layout, and script-execution pass on top of the parent page.

### Per-page iframe load profile (pre-fix)

| Page | Active iframes (worst case) | Risk |
| --- | --- | --- |
| `/` (homepage) | ~16 | Critical |
| `/products/category/website-templates-html-preview` | 6 + N grid (~14) | Critical |
| `/products/category/html-business-profiles` | ~11 | High |
| `/products/:slug` (preview product) | ~5 (same template twice) | Medium |
| `/blog` (control) | 0 | Low |

### How to capture live Lighthouse numbers

Live Core Web Vitals should be captured against a production build, because dev
mode is not representative. Procedure:

```bash
cd web
npm run build
npm run start   # serves the production build on http://localhost:3000
# In a second shell, with Chrome installed:
npx lighthouse http://localhost:3000/ --preset=desktop --view
npx lighthouse "http://localhost:3000/products/category/website-templates-html-preview" --view
npx lighthouse "http://localhost:3000/products/category/html-business-profiles" --view
npx lighthouse "http://localhost:3000/products/<a-preview-product-slug>" --view
npx lighthouse http://localhost:3000/blog --view   # control
```

Record LCP, INP, CLS, TBT, total network bytes, and the number of iframes
mounted at initial load for each route, then compare against the success
criteria below.

### Captured baseline (2026-06-16, production)

The following values were captured against `https://www.growrixos.com` before
Cloudflare proxy cutover.

#### Network/header baseline

| URL | HTTP | TTFB | Total | Size | Cache-Control | Server/CDN |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 200 | 0.285s | 1.448s | 363,169 B | `public, max-age=0, must-revalidate` | `Server: Vercel`, `X-Vercel-Cache: HIT`, `Age: 227` |
| `/products/category/website-templates-html-preview` | 200 | 4.127s | 5.660s | 192,211 B | `private, no-cache, no-store, max-age=0, must-revalidate` | `Server: Vercel`, `X-Vercel-Cache: MISS`, `Age: 0` |
| `/blog` | 200 | 0.949s | 1.409s | 81,120 B | `private, no-cache, no-store, max-age=0, must-revalidate` | `Server: Vercel`, `X-Vercel-Cache: MISS`, `Age: 0` |
| `/images/home/studio-hero.jpg` | 200 | 1.050s | 2.749s | 241,098 B | `public, max-age=0, must-revalidate` | `Server: Vercel`, `X-Vercel-Cache: HIT`, `Age: 239` |
| `/previews/html-template-websites/08-VoltCorePower.html` | 200 | 0.545s | 2.375s | 170,197 B | `public, max-age=0, must-revalidate` | `Server: Vercel`, `X-Vercel-Cache: HIT`, `Age: 242` |

#### Lighthouse mobile baseline (production URL)

| Page | Performance | LCP | CLS | TBT |
| --- | --- | --- | --- | --- |
| `/` | 52 | 3.70s | 0.000 | 4,764ms |
| `/products/category/website-templates-html-preview` | 54 | 2.92s | 0.000 | 3,335ms |
| `/blog` | 89 | 2.49s | 0.000 | 342ms |

Notes:
- INP was not emitted in this headless run export (`n/a`).
- `cf-cache-status` is not present yet because Cloudflare proxy is not active.

## 2. Changes shipped

### Performance (Phase 1)

- **Deferred grid previews.** `ShopProductHtmlPreviewCard` and
  `ShopProductHtmlMobilePreviewCard` now mount their iframes through
  `useDeferredPreview` (IntersectionObserver, 300px root margin) and use
  `loading="lazy"` instead of `eager`. A module-level scheduler caps how many
  previews begin loading at once (max 4, with a short hold before the next
  queued preview starts) to smooth the network/main-thread burst.
- **Homepage load budget.** The homepage now runs a single autoplay carousel
  above the fold: the mobile showcase carousel and the business-profiles hero
  carousel autoplay are disabled there (`autoPlayMobileCarousel={false}`,
  `autoPlayCarousel={false}`). Grid previews below the fold defer via the change
  above.
- **De-duplicated product embeds.** The below-the-fold
  `WebsiteTemplateHtmlMobilePreviewSection` defers its iframe until scrolled
  into view, so a product page no longer loads the same template twice
  simultaneously.

### SEO infrastructure (Phase 2)

- **`web/src/lib/site.ts`** centralizes the canonical host (`SITE_URL`, override
  with `NEXT_PUBLIC_SITE_URL`), the indexing flag (`SITE_INDEXING_ENABLED`), and
  the disallowed crawl paths.
- **`web/src/app/robots.ts`** replaces the static `public/robots.txt`. While
  `SITE_INDEXING_ENABLED` is unset/false it disallows the whole site (current
  pre-launch posture); when set to `true` it allows public routes, disallows
  `/previews/`, `/api/`, `/admin`, `/dashboard`, `/checkout`, `/success`, and
  references the sitemap.
- **`web/src/app/sitemap.ts`** lists static marketing routes, the three product
  categories, public products, services, portfolio, and blog posts; preview
  assets and authenticated routes are excluded.
- **Global metadata** in `app/layout.tsx`: `metadataBase`, default Open Graph and
  Twitter cards, `themeColor`, and a `robots` default that follows the indexing
  flag.
- **Route metadata**: `generateMetadata` for product categories (unique title /
  description / canonical), extended product metadata (canonical + OG/Twitter),
  and `noindex` on admin, dashboard, checkout, and success routes.
- **Structured data** via `components/seo/JsonLd.tsx`: `Organization` + `WebSite`
  on the homepage; `Product` (+ `Offer`) and `FAQPage` on product pages.

### Preview hygiene (Phase 3)

- **`X-Robots-Tag: noindex, nofollow`** headers added for the preview and preview
  API routes in `next.config.ts`.
- **`web/scripts/inject-preview-noindex.mjs`** injects
  `<meta name="robots" content="noindex,nofollow">` into every preview HTML file
  and strips placeholder `example.com` canonicals. It is idempotent (skips files
  already tagged) and should be re-run whenever new preview HTML is added.

## 3. Release gates (Phase 4)

Run before merging preview-affecting changes and before opening the crawl.

### Static + tests

- [ ] `npm run lint` passes
- [ ] `npm run build` passes (zero gate)
- [ ] Unit + integration tests pass

### Performance checklist

- [ ] Homepage initial iframe mounts ≤ 4
- [ ] HTML preview category initial mounts ≤ 4 (hero carousel only; grid defers)
- [ ] Product page does not load the same template twice at initial load
- [ ] Mobile Lighthouse Performance (preview category) ≥ 75 (stretch 90+)
- [ ] CLS < 0.1

### SEO checklist (before setting `SITE_INDEXING_ENABLED=true`)

- [ ] `/sitemap.xml` reachable and lists products + categories + blog
- [ ] `/robots.txt` allows public routes and disallows `/previews/` + auth routes
- [ ] `/previews/*` returns `X-Robots-Tag: noindex` and the HTML carries the
      robots meta (re-run `inject-preview-noindex.mjs` after adding previews)
- [ ] Category and product pages have unique title, description, and canonical
- [ ] `Product` and `Organization`/`WebSite` JSON-LD validate (Rich Results Test)
- [ ] Admin / dashboard / checkout / success are `noindex`

### Opening the crawl

Once every box above is checked, set `SITE_INDEXING_ENABLED=true` (and
`NEXT_PUBLIC_SITE_URL` if the canonical host differs) in the production
environment and redeploy. No code change is required to flip indexing on.

## 4. Cloudflare rollout status

### Implemented in codebase

- `web/next.config.ts` now sets explicit cache policy headers for Cloudflare/Vercel edge:
  - `/previews/**` -> `public, max-age=31536000, immutable`
  - `/images/**`, `/Favicon.svg`, `/Favicon.png` ->
    `public, max-age=86400, stale-while-revalidate=604800`
  - `/api/**`, `/admin/**`, `/dashboard/**`, `/checkout/**`, `/success/**` ->
    `no-store`

### External Cloudflare state

- Cloudflare account is reachable (`3c79f9ec31a2bc54f0821844897778cd`).
- `growrixos.com` zone is **active**:
  - zone id: `03e38f1923d7650dfe466ce708924321`
  - activated on: `2026-06-16T18:31:45Z`
  - nameservers: `chance.ns.cloudflare.com`, `sydney.ns.cloudflare.com`
- DNS records in Cloudflare are configured and proxied:
  - apex `growrixos.com` -> `7031fc4fc549cbb1.vercel-dns-017.com`
  - `www.growrixos.com` -> `7031fc4fc549cbb1.vercel-dns-017.com`
- Cloudflare transport/security settings applied:
  - `ssl = strict`
  - `always_use_https = on`
  - `automatic_https_rewrites = on`
  - managed WAF ruleset execution enabled
- Cloudflare rulesets applied:
  - cache ruleset (`http_request_cache_settings`) with 4 rules:
    - bypass dynamic/auth/commerce routes and Stripe webhook
    - cache `/previews/*` for 1 year
    - cache `/images/*` + favicon for 1 day
  - rate-limit ruleset (`http_ratelimit`) with one combined rule for:
    - `/api/v1/contact`
    - `/api/v1/leads`
    - `/api/v1/ai-concierge`

### Post-cutover validation (2026-06-16)

| Check | Result |
| --- | --- |
| Public NS delegation | `chance.ns.cloudflare.com`, `sydney.ns.cloudflare.com` |
| `www` resolves to Cloudflare anycast | `104.21.70.20`, `172.67.217.239` |
| `https://www.growrixos.com/` | `200`, `server: cloudflare`, `cf-ray` present |
| Apex redirect | `307` -> `https://www.growrixos.com/` |
| `/Favicon.svg` repeat request | `cf-cache-status: HIT` |
| `/previews/html-template-websites/08-VoltCorePower.html` | `200`, `x-robots-tag: noindex, nofollow`, repeat `cf-cache-status: HIT` |
| `/checkout` | `200`, `cf-cache-status: DYNAMIC` (not cached) |
| `/admin` | `307` -> `/admin/login?next=%2Fadmin` |
| `/robots.txt`, `/sitemap.xml` | `200` |
| Homepage TTFB (curl, DAC edge) | ~584 ms start transfer, ~813 ms total |

Note: live origin `Cache-Control` for previews/favicon still shows Vercel defaults
(`max-age=14400`) until the `next.config.ts` cache-header deploy reaches production.
Cloudflare edge caching still shows `HIT` on repeat requests.
