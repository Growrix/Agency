---
name: frontend-ui-converter
description: Converts website frontend UI/UX bidirectionally between single-file HTML templates in sites/ and production Next.js apps in Frontend_Nextjs/. Use when the user asks to migrate, convert, export, port, or reverse-engineer between HTML and Next.js, React, TypeScript, Tailwind, or vanilla single-file sites.
---

# Frontend UI Converter

Bidirectional conversion playbook for this workspace's **dual delivery tracks** (see `AGENTS.md`). Never mix tech contracts in the same output path.

| Direction | Source | Target | Delegates to |
|---|---|---|---|
| **HTML → Next.js** | `sites/NN. site-name-website.html` | `Frontend_Nextjs/NN-site-name/` | `nextjs-site-migrator` |
| **Next.js → HTML** | `Frontend_Nextjs/NN-site-name/` | `sites/NN. site-name-website.html` | This skill + `html-website-builder` standards |

## Step 0 — Determine direction

Infer from user language and paths:

- **HTML → Next.js** triggers: "migrate to Next", "convert to React", paths in `sites/`, `/migrate-to-next`
- **Next.js → HTML** triggers: "export to HTML", "single file", "convert back", "preview template", paths in `Frontend_Nextjs/`

If ambiguous, ask once: *Which direction — HTML → Next.js or Next.js → HTML?*

---

## Track A — HTML → Next.js

**Do not duplicate the migration playbook.** Follow it end-to-end:

1. Read and execute `.cursor/skills/nextjs-site-migrator/SKILL.md` (all phases 0–9).
2. Or run the `/migrate-to-next` command with the source HTML path.
3. Delegate orchestration to `nextjs-migration-architect` subagent when the migration is non-trivial.

### Track A gates (blocking)

- Source HTML must exist and match `NN. site-name-website.html`
- Do **not** modify the source HTML file during migration
- `pnpm build` passes; audit trio + visual parity gate with **zero P0/P1 blockers**
- Dev server validated once (no duplicate `pnpm dev` for same target)

### Track A quick reference

```
sites/02. sunterra-solar-website.html
  → Frontend_Nextjs/02-sunterra-solar/
```

Inventory: `node scripts/migration/inventory-html.mjs "<source>" --out "Frontend_Nextjs/NN-site-name/MIGRATION-MAP.json"`

Full mapping table: [references/html-to-next-mapping.md](references/html-to-next-mapping.md)

---

## Track B — Next.js → HTML

Authoritative reverse migration into **one self-contained `.html` file**. Tech contract is locked: vanilla HTML5 + custom CSS + vanilla JS only — no React, Tailwind, CDN scripts, or build step in output.

### Track B prerequisites

- Source app exists at `Frontend_Nextjs/NN-site-name/`
- Prefer an existing `MIGRATION-MAP.json` or original `sites/` HTML as the route/component blueprint (parity target)
- If no prior HTML exists, derive serial + name from folder (`02-sunterra-solar` → `02. sunterra-solar-website.html`)

### Track B phases (follow in order)

#### Phase 0 — Gate

Confirm source folder. Check for `MIGRATION-MAP.json`, `PARITY-SIGNOFF.md`, or matching file in `sites/`. Decide output path:

- **Update existing HTML** (parity restore): overwrite matching `sites/NN. site-name-website.html` only when user explicitly requests sync/update
- **New HTML export**: use next serial in `sites/` if no matching file exists

#### Phase 1 — Inventory Next app

Build `EXPORT-MAP.md` in the Next app folder (or temp) listing:

| Source | Extract |
|---|---|
| `app/**/page.tsx` | App Router routes → `data-route` view names |
| `components/sections/*.tsx` | Homepage section order + BEM blocks |
| `components/views/*.tsx` | Interactive/full-page views (Tier C/D) |
| `components/layout/*.tsx` | Header, footer, nav, FAB, bottom nav, announce bar |
| `config/site.config.ts` | Brand, locale, SEO defaults, phone |
| `content/*.json` | Copy, nav, blog, products, FAQ → JS data arrays |
| `app/globals.css` | `:root` / `[data-theme="dark"]` tokens + `@layer components` BEM |
| `hooks/use*.ts` | Client behavior → `initX()` targets |
| `components/icons/*.tsx` | Inline SVG markup |
| `lib/**/*.ts` | Pure logic (calculators, validators) → vanilla functions |

If `MIGRATION-MAP.json` exists, use its `routes[]` and `sections[]` as the canonical map (reverse `nextPath` → `htmlRoute`).

#### Phase 2 — Scaffold HTML shell

Copy `.cursor/skills/html-website-builder/assets/boilerplate.html` to the target `sites/` path. Fill `<head>` from `site.config.ts` + route metadata (title, description, OG, Twitter, JSON-LD).

#### Phase 3 — Port design system

From `app/globals.css`:

1. Copy `:root` and `[data-theme="dark"]` token blocks verbatim (preserve `--color-*`, `--space-*`, etc.)
2. Copy `@layer components { ... }` BEM rules — **strip all Tailwind `@apply` and utility classes**
3. Add section-specific CSS co-located with components (mobile-first `min-width` queries)
4. Remove `@import "tailwindcss"` — output must have zero framework CSS

See [references/next-to-html-mapping.md](references/next-to-html-mapping.md) for the full reverse mapping table.

#### Phase 4 — Flatten layout + homepage sections

For each `components/sections/*.tsx`:

1. Render-equivalent semantic HTML with original BEM class names
2. Wrap in comment boundaries: `<!-- ========== SECTION: Hero ========== -->` … `<!-- ========== /SECTION: Hero ========== -->`
3. Resolve copy from `content/*.json` — **inline into markup** or prepare JS constants (never fetch at runtime)
4. Replace React icon components with inline `<svg aria-hidden="true">` from source TSX

Homepage `<main>` section order must match `app/page.tsx` import order.

#### Phase 5 — Flatten inner views (hash router)

Convert App Router pages to `<div data-route="slug" hidden>` views inside `<main>` (SPA pattern):

| Next.js | HTML |
|---|---|
| `app/page.tsx` | `data-route="home"` (default visible) |
| `app/about/page.tsx` | `data-route="about"` |
| `app/(marketing)/[slug]/page.tsx` | one view per slug from `content/pages/` |
| `app/blog/[slug]/page.tsx` | template view `data-route="blog-article"` + JS render |
| `app/not-found.tsx` | `data-route="404"` |

Implement hash router in JS: `#/` → home, `#/about` → about, etc. Update nav links to `href="#/slug"`.

**Tier rules** (same as html-website-builder):

- **Tier A:** `.page-hero` + `.content__prose` for legal/about pages
- **Tier B:** service pages with features + CTA blocks
- **Tier C:** interactive views (quote, calculator, contact) — full form markup, not prose-only
- **Tier D:** blog listing, case studies, reviews with JS-driven cards

#### Phase 6 — Port hooks → vanilla JS

For each `hooks/use*.ts`:

1. Identify DOM selectors the hook manages
2. Write matching `function initX(root?) { ... }` in the single `<script>` block
3. Port pure logic from `lib/**/*.ts` as plain functions (no imports)
4. Wire `init()` on `DOMContentLoaded` calling all `initX()` functions
5. Guard animations with `prefers-reduced-motion`
6. Use `IntersectionObserver` for scroll reveals; event delegation for lists

#### Phase 7 — Inline assets

- SVG icons: inline in markup (no external icon files)
- Favicon: data-URI SVG in `<head>`
- Images from `public/`: embed as data-URI or lightweight SVG placeholders if binary size is prohibitive — **zero required network dependency** for template demo
- No external scripts, fonts via CDN, or third-party embeds

#### Phase 8 — Audit trio (HTML track)

Delegate and fix all blocking findings:

1. `accessibility-auditor` — WCAG AA+
2. `performance-optimizer` — Core Web Vitals / asset pass
3. `code-reviewer` — single-file standards gate

Use checklists in [references/conversion-checklist.md](references/conversion-checklist.md).

#### Phase 9 — Parity verify (when source HTML or MIGRATION-MAP exists)

Compare exported HTML against:

- Original `sites/` HTML (visual + route coverage), or
- Live Next app (`pnpm dev`) for layout, tokens, and interactive behavior

Fix P0/P1 gaps before sign-off. Document in `EXPORT-SIGNOFF.md` beside the Next app.

### Track B no-leakage rules

| Data | HTML location |
|---|---|
| Brand, phone, locale | Hardcoded in head + JSON-LD (from `site.config.ts`) |
| Navigation | Markup in `<nav>` + optional `NAV_LINKS` JS array |
| Page copy, FAQ, blog | JS constants (`var BLOG = [...]`) or inline markup |
| Colors/spacing | CSS custom properties in `:root` |
| Env-only values | Sensible placeholder domain with `<!-- TODO(client): replace domain -->` |

### Track B final QA

- [ ] Exactly **one** `.html` file; one `<style>`, one `<script>`
- [ ] Opens by double-click with no server or network dependency
- [ ] All routes from EXPORT-MAP / MIGRATION-MAP implemented as hash views
- [ ] Dark mode + reduced motion work
- [ ] Audit trio PASS
- [ ] BEM class names preserved; no Tailwind classes in output
- [ ] Zero emoji icons; inline SVG only

---

## Subagent routing

| Task | Subagent |
|---|---|
| HTML → Next orchestration | `nextjs-migration-architect` |
| Token port HTML → Tailwind | `tailwind-design-system-architect` |
| Next.js audit / parity | `nextjs-accessibility-auditor`, `nextjs-performance-optimizer`, `nextjs-code-reviewer`, `nextjs-visual-parity-auditor` |
| HTML export audit | `accessibility-auditor`, `performance-optimizer`, `code-reviewer` |
| New HTML from scratch (no Next source) | `frontend-architect` via `html-website-builder` |

## References

- [references/html-to-next-mapping.md](references/html-to-next-mapping.md) — forward map (summary + link to nextjs-site-migrator)
- [references/next-to-html-mapping.md](references/next-to-html-mapping.md) — reverse map (detailed)
- [references/conversion-checklist.md](references/conversion-checklist.md) — QA for both directions
