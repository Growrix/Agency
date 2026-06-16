# Cloudflare CDN Rollout Checklist

This checklist operationalizes the Cloudflare plan for `growrixos.com` and
maps directly to cache, security, and validation requirements.

## Current execution status

- Code-level cache policies are implemented in `web/next.config.ts`.
- Cloudflare API account access works for account `3c79f9ec31a2bc54f0821844897778cd`.
- Cloudflare zone is **active**:
  - zone id: `03e38f1923d7650dfe466ce708924321`
  - activated on: `2026-06-16T18:31:45Z`
  - assigned nameservers: `chance.ns.cloudflare.com`, `sydney.ns.cloudflare.com`
- DNS in Cloudflare is configured for Vercel and proxied:
  - apex `growrixos.com` -> `7031fc4fc549cbb1.vercel-dns-017.com` (proxied)
  - `www.growrixos.com` -> `7031fc4fc549cbb1.vercel-dns-017.com` (proxied)
- SSL transport settings applied:
  - `ssl = strict`
  - `always_use_https = on`
  - `automatic_https_rewrites = on`
- Cloudflare rulesets applied:
  - cache ruleset (`http_request_cache_settings`) with 4 rules
  - rate-limit ruleset (`http_ratelimit`) with 1 combined API rule
  - managed WAF execution ruleset (`http_request_firewall_managed`) with 1 rule
- Cutover complete:
  - registrar delegation uses Cloudflare nameservers
  - live traffic shows `server: cloudflare` and `cf-ray`
  - static/preview assets return `cf-cache-status: HIT` on repeat requests

## Token permissions required

Create a Cloudflare API token with these scopes:

- **Account**
  - `Zone:Read`
  - `Zone:Edit` (or specifically zone create permission)
- **Zone** (for `growrixos.com`)
  - `DNS:Edit`
  - `Cache Rules:Edit`
  - `WAF:Edit`
  - `Zone Settings:Edit`
  - `Rate Limits:Edit`

## Phase A — Zone + DNS cutover

1. Create/import zone `growrixos.com` in Cloudflare.
2. Point registrar nameservers to the nameservers provided by Cloudflare.
3. DNS records:
   - `www` CNAME -> Vercel production target (proxied ON)
   - apex `@` -> proxied CNAME flatten or redirect to `www`
4. In Vercel, ensure `growrixos.com` and `www.growrixos.com` are added as domains.

## Phase B — SSL and transport

Cloudflare settings:

- SSL/TLS mode: `Full (strict)`
- Always use HTTPS: `On`
- Automatic HTTPS rewrites: `On`
- Keep HSTS compatible with app header policy (`max-age=31536000; includeSubDomains; preload`)

## Phase C — Cache policy in Cloudflare

Create cache rules:

1. **Bypass dynamic/auth**
   - `/api/*`
   - `/admin*`
   - `/dashboard*`
   - `/checkout*`
   - `/success*`
2. **Bypass Stripe webhook**
   - `/api/v1/orders/webhook`
3. **Cache previews aggressively**
   - `/previews/*`
   - Respect origin cache headers (configured to 1 year immutable)
4. **Cache static images**
   - `/images/*`, plus image extensions if needed

Do not enable “Cache Everything” globally on app HTML routes (`/`, `/products/*`).

## Phase D — Security controls

Enable and tune:

- Bot Fight Mode
- Security level: Medium
- Rate limits:
  - `/api/v1/contact`
  - `/api/v1/leads`
  - `/api/v1/ai-concierge`

## Phase E — Post-cutover validation

1. Header checks:
   - `cf-ray` present
   - `cf-cache-status: HIT` on repeat requests for:
     - `/images/home/studio-hero.jpg`
     - `/previews/html-template-websites/08-VoltCorePower.html`
2. Functional checks:
   - `/checkout` flow and success page work
   - Stripe webhook endpoint receives events
   - Admin redirect behavior unchanged
   - Preview iframe routes still render
3. Performance checks:
   - Re-run Lighthouse mobile:
     - `/`
     - `/products/category/website-templates-html-preview`
     - `/blog`
4. Record before/after metrics in:
   - `DOC/PROJECT PLAN/seo-performance-readiness.md`

## Rollback

If issues appear after cutover:

1. Set Cloudflare records to DNS-only (gray cloud) for `www`/apex.
2. Purge Cloudflare cache.
3. Re-verify checkout/webhook/admin routes.
