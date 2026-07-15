# Google Search Console — Indexing Setup

**Site:** `https://www.growrixos.com`  
**Last updated:** 2026-07-15  
**Prerequisite:** Complete [`google-indexing-enablement-checklist.md`](./google-indexing-enablement-checklist.md)

---

## 1. Add property

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property → **URL prefix:** `https://www.growrixos.com`
3. Do **not** use apex-only (`https://growrixos.com`) unless you also verify www separately

---

## 2. Verify ownership

Choose one method:

| Method | Steps |
|--------|-------|
| **DNS TXT (recommended)** | Cloudflare → DNS → Add TXT record from GSC verification screen |
| **HTML tag** | Add meta tag via Vercel env or temporary layout injection; remove after verify |
| **HTML file** | Upload to `web/public/` if needed (prefer DNS) |

Confirm status shows **Verified** before submitting sitemap.

---

## 3. Submit sitemap

1. GSC → **Sitemaps**
2. Enter: `https://www.growrixos.com/sitemap.xml`
3. Submit
4. Expected status: **Success** within 24–48 hours

If URLs show apex host (`growrixos.com`), fix `NEXT_PUBLIC_SITE_URL` in Vercel first, redeploy, resubmit.

---

## 4. Request indexing (priority URLs)

Use **URL Inspection** for each:

| Priority | URL |
|----------|-----|
| P0 | `https://www.growrixos.com/` |
| P0 | `https://www.growrixos.com/services` |
| P0 | `https://www.growrixos.com/services/technical-seo` |
| P1 | `https://www.growrixos.com/digital-products` |
| P1 | `https://www.growrixos.com/digital-products/category/website-templates-html-preview` |
| P1 | `https://www.growrixos.com/blog` |
| P1 | `https://www.growrixos.com/about` |
| P1 | `https://www.growrixos.com/contact` |

For each: Inspect → **Request indexing** (quota applies).

---

## 5. Monitor (48–72 hours)

| Report | What to check |
|--------|----------------|
| **Pages → Indexing** | Indexed count rising; no unexpected exclusions |
| **Sitemaps** | Discovered URLs match sitemap.ts output |
| **Page experience** | LCP/CLS after performance deploy |
| **Rich results** | Organization, Service, Product schema valid |

---

## 6. Rollback

If indexing must pause:

1. Vercel → set `SITE_INDEXING_ENABLED=false`
2. Redeploy
3. Verify `robots.txt` returns `Disallow: /`
4. Optional: GSC → Removals → temporary removal for `/` (emergency only)

---

## Related docs

- [`google-indexing-enablement-checklist.md`](./google-indexing-enablement-checklist.md)
- [`2026-07-15-growrixos-psi-indexing-live-audit.md`](./2026-07-15-growrixos-psi-indexing-live-audit.md)
- [`../../../../DOC/PROJECT PLAN/seo-performance-readiness.md`](../../../../DOC/PROJECT%20PLAN/seo-performance-readiness.md)
