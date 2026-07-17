# Technical SEO Audit Report — Homepage Pingdom Performance

**Site / scope:** `https://www.growrixos.com/` (production homepage)  
**Audit date:** 2026-07-15  
**Mode:** Audit Mode  
**Agent:** Technical_SEO_expert  
**Evidence:** Pingdom screenshot (2026-07-15), `Ongoing DOCS/Pingdom tests/har.json`

## Executive Summary

| Metric | Value |
|--------|-------|
| Pingdom performance grade | 78 (C) |
| Load time | 2.80 s |
| Page size | 706.4 KB |
| Total requests | 40 |
| Critical findings | 1 |
| High findings | 2 |
| Health score (pre-fix) | 62 / 100 |

**Root cause:** A Clerk authentication handshake redirect loop (9× `307` across 3 cycles) accounts for ~2.7 s of the 2.8 s load before the first `200` HTML response. This is a **server-side proxy/middleware** issue, not missing gzip or broken static caching.

**Remediation (implemented):** Narrow `web/src/proxy.ts` matcher so marketing routes skip `clerkMiddleware`; add release-gate regression test.

## Findings

### [PERF-001] Clerk handshake redirect loop on anonymous homepage visits

| Field | Value |
|-------|-------|
| Severity | **Critical** |
| Evidence | HAR: 9× `307` before first `200` at `/`; `__clerk_redirect_count=3` cookie on all static assets; Clerk handshake URL `generous-lioness-64.clerk.accounts.dev/v1/client/handshake` |
| Business impact | ~2.7 s added latency for crawlers, first-time visitors, and synthetic monitors; inflates redirect count (25% of requests); hurts page-experience signals |
| Handbook | `performance/01-core-web-vitals.md`, `security-http/02-redirects-error-handling.md` |
| Fix | Narrow `clerkMiddleware` to auth/protected/API routes only; marketing pages use lightweight `legacyProxy` |
| Validation | E2E: `GET /` with `maxRedirects: 0` returns `200`; re-run Pingdom post-deploy |

### [PERF-002] Request count exceeds release gate on external probe

| Field | Value |
|-------|-------|
| Severity | **High** |
| Evidence | Pingdom 40 requests vs CI budget ≤ 30; 10 entries are `307` redirects |
| Business impact | Fails production performance guardrails when measured at full load |
| Handbook | `performance/01-core-web-vitals.md` |
| Fix | Resolves when PERF-001 fixed (redirect entries removed) |
| Validation | Pingdom request count; local `release-gates.spec.ts` resource budget |

### [PERF-003] Pingdom “Compress with gzip” grade E

| Field | Value |
|-------|-------|
| Severity | **Informational** |
| Evidence | HAR shows `Content-Encoding: br` on all `200` responses; `307` redirects and `woff2` fonts are scored as uncompressed by Pingdom |
| Business impact | Misleading grade — not a real compression failure |
| Handbook | `performance/02-caching-cdn-edge.md` |
| Fix | None required; document for stakeholders |
| Validation | `curl -H 'Accept-Encoding: br' -I https://www.growrixos.com/` shows `content-encoding: br` |

### [PERF-004] Cookie sent on static asset requests

| Field | Value |
|-------|-------|
| Severity | **Medium** |
| Evidence | `__clerk_redirect_count=3` on every `_next/static` request in HAR |
| Business impact | Extra header bytes; Pingdom “cookie-free domains” grade D |
| Handbook | `performance/02-caching-cdn-edge.md` |
| Fix | Side effect of PERF-001; should clear after handshake eliminated |
| Validation | HAR re-test post-deploy |

## HAR Evidence Summary

| Metric | Value |
|--------|-------|
| Total HAR entries | 40 |
| Status 200 | 30 |
| Status 307 | 10 |
| Document TTFB (final 200) | 294 ms |
| Total body size (200 responses) | ~605 KB |
| Compression on 200s | Brotli (`br`) on 25 responses |
| External domain | `generous-lioness-64.clerk.accounts.dev` (Clerk only) |
| Largest asset | `clerk.browser.js` (~89 KB) |

## Roadmap

| Priority | Action | Owner | Status |
|----------|--------|-------|--------|
| P0 | Narrow Clerk proxy matcher | Technical_SEO_expert | Implemented |
| P0 | E2E regression: homepage not Clerk 307 | Technical_SEO_expert | Implemented |
| P0 | `npm run health:check` | Technical_SEO_expert | Pending validation |
| P1 | Re-run Pingdom post-deploy | Human | Post-deploy |
| P2 | Poster PNG compression (up to 1.3 MB) | Deferred | — |
| P2 | Stack logo sprite / lazy load (13 SVGs) | Deferred | — |
| P2 | `CLERK_DOMAIN` production env in Clerk dashboard | Human | Optional hardening |

## Post-Deploy Validation Plan

1. Run Pingdom Website Speed Test on `https://www.growrixos.com/` from same region if possible.
2. **Expect:** load time **&lt; 1.0 s** (down from 2.8 s); redirect count **0–2**; grade **B+ or higher**.
3. Export new HAR and compare: no `clerk.accounts.dev` handshake URLs on `GET /`.
4. Verify `curl -sI -o /dev/null -w '%{http_code}' https://www.growrixos.com/` returns `200` without redirect chain.
5. Confirm signed-in users can still access `/dashboard` and `/admin` (auth routes still use `clerkMiddleware`).
6. Optional: set `CLERK_DOMAIN=www.growrixos.com` in Vercel + Clerk dashboard if handshake reappears on auth routes.

## UX Impact (accepted)

- Homepage `PublicAuthControls` hydrates client-side via `ClerkProvider`; no server handshake on `/`.
- Signed-in session sync occurs on first visit to protected routes (`/dashboard`, `/admin`).

## Missing Knowledge

- Post-deploy Pingdom re-test (requires production deploy)
- CrUX field data for homepage LCP/INP (not in HAR)
