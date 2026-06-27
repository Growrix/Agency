<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Growrix OS Web App — Agent Rules

Production Next.js app for [growrixos.com](https://growrixos.com/). Lives in `web/` (distinct from `Frontend_Nextjs/` template migrations).

## Zero-gate policy (blocking)

**Never declare work complete unless every applicable gate passes with 0 failures.**

After any change under `web/`:

1. `ReadLints` on all touched files — fix TypeScript, ESLint, and cSpell diagnostics
2. `npm run lint`
3. `npm run typecheck`
4. `npm run perf:budgets`
5. `npm run test`
6. `npm run build`
7. `npm run test:e2e -- tests/e2e/release-gates.spec.ts --project=desktop-chrome`

Shortcut: `npm run health:check` (runs the full sequence above).

## Release gates (`tests/e2e/release-gates.spec.ts`)

| Gate | Threshold |
|------|-----------|
| A11y smoke (`/`, `/contact`) | 0 critical axe violations (iframes excluded) |
| Security headers | nosniff, DENY frame, HSTS present |
| Admin protection | `/api/v1/admin/*` → 401; `/admin` → login redirect |
| Health | `/api/health`, `/api/ready` OK |
| Homepage load | `< 5s` to domcontentloaded (CI cold-start headroom) |
| Resource budget | ≤ 30 resources on homepage |
| Preview iframes | ≤ 2 on `/`; ≤ 3 on website-templates category |
| SEO metadata | canonical + JSON-LD on key category route |

## Performance constraints

- Do **not** remove homepage sections without explicit user approval
- Preview iframes: staged auto-load via `useDeferredPreview` (queue, 320px root margin)
- Production previews: static CDN paths via `getWebsiteTemplateHtmlPreviewUrl()`
- Font diet: minimal weight subsets in `app/layout.tsx`

## Homepage hero client boundaries

The homepage hero is a single `"use client"` module ([`HomeHero.tsx`](src/components/marketing/HomeHero.tsx)) that owns `Section`, motion, viewport gates, and mobile/desktop variants. Import hero-motion symbols from their source files — never from a barrel `index.ts`. Avoid `"use client"` files that only re-export another module's symbols.

## Spell-check

Project terms (Growrix, GrowrixOS, Supabase, TTFB, domcontentloaded, etc.) live in root `cspell.json`. Add new brand/API terms there instead of inline suppressions.
