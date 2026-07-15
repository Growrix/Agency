# Google Indexing Enablement Checklist

**Site:** `https://www.growrixos.com`  
**Gate:** Set `SITE_INDEXING_ENABLED=true` in production Vercel **only after every box is checked**

---

## Code readiness (verify in repo / CI)

- [x] [`web/src/app/sitemap.ts`](../../../web/src/app/sitemap.ts) — static + dynamic public routes
- [x] [`web/src/app/robots.ts`](../../../web/src/app/robots.ts) — allow public, disallow previews/auth when flag on
- [x] [`web/src/lib/site.ts`](../../../web/src/lib/site.ts) — `SITE_INDEXING_ENABLED` + `DISALLOWED_CRAWL_PATHS`
- [x] Per-route self-canonical via `buildPageMetadata`
- [x] Transactional routes `noindex` (release gate)
- [x] Preview routes `X-Robots-Tag: noindex` (`next.config.ts`)
- [x] Homepage LCP / performance fixes deployed
- [x] JSON-LD Organization + WebSite on homepage

---

## Production env (Vercel — manual step)

Set in **Production** environment:

```env
SITE_INDEXING_ENABLED=true
NEXT_PUBLIC_SITE_URL=https://www.growrixos.com
```

Redeploy after saving env vars.

> **Important:** Current production sitemap uses apex `https://growrixos.com/` when `NEXT_PUBLIC_SITE_URL` is wrong or unset. Canonical host must be **www** for consistency with marketing URLs.

---

## Post-deploy verification

Run after redeploy:

```bash
curl.exe -s https://www.growrixos.com/robots.txt
# Must NOT contain sitewide "Disallow: /" from Next.js block
# Must contain "Sitemap: https://www.growrixos.com/sitemap.xml"

curl.exe -s https://www.growrixos.com/sitemap.xml | Select-String "www.growrixos.com"
# All <loc> entries should use www host

curl.exe -s https://www.growrixos.com/ | Select-String "robots"
# Must show index, follow (not noindex)
```

| Check | Pass criteria |
|-------|----------------|
| robots.txt | `Allow: /` for `User-Agent: *` (app section); `Sitemap:` present |
| Homepage meta | `index, follow` |
| Canonical | `/` on homepage; self-URL on `/services/technical-seo`, `/blog` |
| Previews | `curl -I https://www.growrixos.com/previews/html-template-websites/01-BedrockConstruction.html` → `X-Robots-Tag: noindex` |
| Auth routes | `/sign-in`, `/cart` → `noindex` in HTML |

---

## Rollback

```env
SITE_INDEXING_ENABLED=false
```

Redeploy → immediate re-block via `robots.ts` + layout metadata.

---

## Next step

Follow [`google-search-console-setup.md`](./google-search-console-setup.md) for GSC verification and sitemap submission.
