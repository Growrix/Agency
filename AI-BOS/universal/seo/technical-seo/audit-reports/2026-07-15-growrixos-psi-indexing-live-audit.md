# Technical SEO Live Audit — PSI, Indexing, Sitemap

**Site:** `https://www.growrixos.com/`  
**Audit date:** 2026-07-15  
**Agent:** Technical_SEO_expert  
**Evidence:** PageSpeed Insights + Pingdom screenshots (user), live `curl` probes

## Executive Summary

| Check | Status | Notes |
|-------|--------|-------|
| Homepage HTTP | **Pass** | `GET /` returns **200** (no Clerk 307 handshake) |
| `robots.txt` indexing | **Blocked** | App emits `Disallow: /` when `SITE_INDEXING_ENABLED` is false |
| `sitemap.xml` | **Reachable** | Valid `<urlset>`; URLs use apex host `https://growrixos.com/` |
| Homepage robots meta | **noindex** | Expected until env flag flipped |
| Canonical | **Pass** | Per-route via `buildPageMetadata` (`/` → `/`) |

**Release decision:** Safe to proceed with LCP/SEO code fixes. Indexing requires `SITE_INDEXING_ENABLED=true` + `NEXT_PUBLIC_SITE_URL=https://www.growrixos.com` in Vercel after checklist.

---

## Live probe results (2026-07-15)

### Redirects

```
curl -I --max-redirs 0 https://www.growrixos.com/
→ HTTP/1.1 200 OK (Server: cloudflare, X-Vercel-Cache: STALE)
→ No clerk.accounts.dev redirect on first response
```

Clerk handshake fix (`1fe5db2`) is **live** on production.

### robots.txt

Production response combines Cloudflare managed rules (Allow `/` for generic bots) with Next.js output:

```
User-Agent: *
Disallow: /
```

This blocks Google until `SITE_INDEXING_ENABLED=true`. See [`web/src/app/robots.ts`](../../../../web/src/app/robots.ts).

### sitemap.xml

- Returns valid XML with static + dynamic routes
- **Host mismatch:** `<loc>` entries use `https://growrixos.com/` (apex) not `https://www.growrixos.com/`
- **Action:** Set `NEXT_PUBLIC_SITE_URL=https://www.growrixos.com` in production before enabling indexing

### Sitemap coverage ([`web/src/app/sitemap.ts`](../../../../web/src/app/sitemap.ts))

**Static (18):** `/`, `/digital-products`, bundles, free, `/pricing`, `/services`, `/services/technical-seo`, `/portfolio`, `/blog`, `/about`, `/contact`, `/faq`, `/book-appointment`, `/ai-concierge`, `/html-business-profiles`, legal, `/refund-policy`

**Dynamic:** product categories, public products, services, portfolio, blog posts

**Excluded (correct):** `/previews/`, `/api/`, admin, dashboard, checkout, auth — see [`DISALLOWED_CRAWL_PATHS`](../../../../web/src/lib/site.ts)

---

## PSI baseline (user screenshot, mobile lab)

| Metric | Value |
|--------|-------|
| Performance | 52 |
| LCP | 6.8 s |
| CLS | 0.164 |
| TBT | 550 ms |
| SEO | 85 |
| Accessibility | 96 |

**LCP element:** Hero poster inside deferred `HomeHero` bundle; placeholder had no image at audit time.

**Top opportunities:** Render-blocking (~1.44 s), image sizing (~450 ms), unused JS (~420 ms), next-gen formats (~360 ms).

---

## Pingdom baseline (user screenshot, Frankfurt)

| Metric | Value |
|--------|-------|
| Grade | 78 (C) |
| Load | 2.80 s |
| Requests | 40 (8 redirects) |
| Scripts | 47.92% of weight |

Post-Clerk-fix re-test expected to reduce redirect count significantly.

---

## Remediation phases (this implementation)

1. **LCP:** SSR poster in `HomeHeroPlaceholder`, preload hints, demote stack-logo priority
2. **Posters:** WebP generation + `<picture>` fallback in poster frame
3. **SEO 85:** Crawlable Chat nav link, 44px+ tap targets on shell
4. **Indexing:** Env flip checklist + GSC setup doc (manual Vercel step)

---

## Post-deploy validation checklist

- [ ] `curl https://www.growrixos.com/robots.txt` shows `Allow: /` (not sitewide Disallow)
- [ ] Homepage `<meta name="robots">` contains `index, follow`
- [ ] Sitemap URLs use `https://www.growrixos.com`
- [ ] GSC sitemap submitted and status Success
- [ ] PSI mobile LCP &lt; 4 s
- [ ] Pingdom grade ≥ 85
