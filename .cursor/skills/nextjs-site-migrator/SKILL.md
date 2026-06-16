---
name: nextjs-site-migrator
description: Migrate an approved single-file HTML template from sites/ into a production Next.js app in Frontend_Nextjs/. Use when the user asks to migrate, convert, or deliver a site in Next.js, React, TypeScript, or Tailwind after HTML preview approval.
---

# Next.js Site Migrator

Authoritative playbook for migrating approved HTML previews into production Next.js apps. HTML preview track stays locked; this skill governs **`Frontend_Nextjs/`** only.

## Prerequisites

- Source file exists in `sites/NN. site-name-website.html`
- HTML preview approved (or user explicitly waives audit trio)
- Target folder: `Frontend_Nextjs/NN-site-name/` (serial + kebab name from source filename)

## Output contract

```
Frontend_Nextjs/NN-site-name/
  app/
  components/ui|layout|sections|views|seo/
  config/site.config.ts
  content/*.json
  lib/content/
  hooks/
  public/
  MIGRATION-MAP.md
```

Stack: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, `next-themes`.

## Migration phases (follow in order)

### Phase 0 — Gate

Confirm source HTML path. Run HTML audit trio unless waived. Resolve target folder name.

### Phase 1 — Inventory

Run `node scripts/migration/inventory-html.mjs <source-html> [--out Frontend_Nextjs/NN-site-name/MIGRATION-MAP.json]`.

Optional helpers:
- `node scripts/migration/extract-content.mjs <source.html> <content-dir>` — BLOG, CASES, STATES arrays
- `node scripts/migration/extract-pages.mjs <source.html> <content/pages-dir>` — prose route views

Extract:
- Section comment boundaries → component map
- `data-route` views → App Router routes
- `:root` / `[data-theme="dark"]` tokens → Tailwind theme
- `initX()` functions → hooks list
- JS data arrays (`BLOG`, `PRODUCTS`, etc.) → `content/` targets

Write `MIGRATION-MAP.md` in the target folder.

### Phase 2 — Scaffold

Copy `.cursor/skills/nextjs-site-migrator/assets/boilerplate/` to `Frontend_Nextjs/NN-site-name/`. Run `pnpm install`.

### Phase 3 — Design system port

Delegate to `tailwind-design-system-architect`. Map HTML CSS custom properties to `app/globals.css` + Tailwind `@theme` (preserve token names).

### Phase 4 — Primitives + layout

Build `components/ui/*`, `components/layout/*` from HTML shell (header, footer, nav, theme toggle, skip link).

### Phase 5 — Section migration (incremental)

1. Homepage sections first — parity checkpoint
2. Tier A: legal/prose pages via content JSON
3. Tier B: service pages
4. Tier C: lead-gen (quote, calculator, inspection)
5. Tier D: blog, case studies, reviews

Port each `initX()` to a hook + client component.

### Phase 5.5 — Component CSS port

Run `extract-component-css.mjs`. Port BEM blocks to `app/globals.css` `@layer components` per `references/component-css-porting.md`.

### Phase 5.6 — Icon extraction

Run `extract-icons.mjs`. Create `components/icons/`. Replace all emoji icon placeholders.

### Phase 5.7 — Interactive view classification

Run `classify-routes.mjs`. Build interactive routes as React views per `references/interactive-view-registry.md`. Never dump forms into prose JSON.

### Phase 6 — SEO

`generateMetadata()` per route, JSON-LD components, `sitemap.ts`, `robots.ts`. Domain from `NEXT_PUBLIC_SITE_URL`.

### Phase 7 — Audit trio

Delegate `nextjs-accessibility-auditor`, `nextjs-performance-optimizer`, `nextjs-code-reviewer`. Fix all blocking findings until there are **zero P0/P1 blockers**.

### Phase 8 — Build verify

`pnpm build` passes with zero TypeScript errors.

### Phase 8.5 — Dev server runtime validation (blocking)

- Check terminal metadata first for an existing `pnpm dev` process in the same target folder.
- If already running for the migrated site, **do not launch a duplicate**. Validate health from logs (`Local` + `Ready`) and verify an HTTP `200` response from the local URL.
- If not running, start `pnpm dev`, wait for startup readiness, and verify an HTTP `200` response.
- Resolve startup errors/warnings that indicate broken runtime behavior before sign-off.

### Phase 9 — Visual parity gate (blocking)

Delegate `nextjs-visual-parity-auditor`. Fix all P0/P1 findings. Update `PARITY-SIGNOFF.md`. Use `/parity-pass` for existing migrations.

## No-hardcoding rules

| Data | Location |
|---|---|
| Brand, phone, locale | `config/site.config.ts` |
| Domain | `NEXT_PUBLIC_SITE_URL` env |
| Navigation | `content/navigation.json` |
| Page copy, FAQ, blog, products | typed `content/*.json` |
| Colors/spacing | Tailwind theme + CSS vars |
| Fetch logic | `lib/content/repositories/` |

## HTML → Next mapping

| HTML | Next.js |
|---|---|
| `<!-- SECTION: Hero -->` | `components/sections/Hero.tsx` |
| `data-route="quote"` | `app/quote/page.tsx` |
| `initQuoteWizard()` | `hooks/useQuoteWizard.ts` |
| Hash `#/quote` | `/quote` |
| `:root` tokens | `globals.css` + Tailwind theme |
| JSON-LD in head | `components/seo/JsonLd*.tsx` |

## References

- `references/tailwind-token-mapping.md`
- `references/route-mapping.md`
- `references/content-schema.md`
- `references/accessibility-checklist.md`
- `references/pixel-parity-checklist.md`
- `references/component-css-porting.md`
- `references/interactive-view-registry.md`
- `references/icon-extraction.md`

## Final QA checklist

- [ ] Folder `Frontend_Nextjs/NN-site-name/` matches naming convention
- [ ] `pnpm build` passes, zero TS errors
- [ ] No brand/copy hardcoded in TSX outside allowed structural constants
- [ ] All routes from MIGRATION-MAP implemented
- [ ] Dark mode + reduced motion work
- [ ] Audit trio PASS with zero P0/P1 blockers
- [ ] Visual parity gate PASS (`nextjs-visual-parity-auditor`, zero P0/P1)
- [ ] Dev server validated (`pnpm dev` ready + HTTP 200, no duplicate server for same target)
- [ ] Zero emoji icons; zero interactive HTML in prose JSON
- [ ] Component CSS ported to `@layer components`
