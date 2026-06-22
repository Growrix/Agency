# HTML → Next.js Mapping

Forward conversion is fully defined in `.cursor/skills/nextjs-site-migrator/SKILL.md`. This file is a quick-reference summary.

## Path convention

```
sites/02. sunterra-solar-website.html  →  Frontend_Nextjs/02-sunterra-solar/
```

Serial (zero-padded) + kebab-case site name from the HTML filename.

## Structure mapping

| HTML | Next.js |
|---|---|
| `<!-- SECTION: Hero -->` | `components/sections/Hero.tsx` |
| `data-route="quote"` | `app/quote/page.tsx` + `components/views/QuoteView.tsx` |
| `#/quote` hash route | `/quote` App Router path |
| `function initQuoteWizard()` | `hooks/useQuoteWizard.ts` + client wrapper |
| `:root` / `[data-theme="dark"]` tokens | `app/globals.css` + Tailwind `@theme` |
| `var BLOG = [...]` | `content/blog.json` + repository |
| JSON-LD in `<head>` | `components/seo/JsonLd*.tsx` + `generateMetadata()` |
| Inline SVG icons | `components/icons/Icon*.tsx` |
| BEM `@layer components` CSS | `app/globals.css` `@layer components` |

## Migration scripts

```bash
node scripts/migration/inventory-html.mjs "<source.html>" --out "Frontend_Nextjs/NN-site-name/MIGRATION-MAP.json"
node scripts/migration/extract-content.mjs "<source.html>" "<content-dir>"
node scripts/migration/extract-pages.mjs "<source.html>" "<content/pages-dir>"
node scripts/migration/extract-component-css.mjs "<source.html>" --out "<target>/.migration/component-css.css"
node scripts/migration/extract-icons.mjs "<source.html>" --manifest "<target>/.migration/icons-manifest.json"
node scripts/migration/classify-routes.mjs "<source.html>"
```

## Content location rules (no hardcoding)

| Data | Next.js location |
|---|---|
| Brand, phone, locale | `config/site.config.ts` |
| Domain | `NEXT_PUBLIC_SITE_URL` env |
| Navigation | `content/navigation.json` |
| Page copy, FAQ, blog, products | typed `content/*.json` |
| Colors/spacing | Tailwind theme + CSS vars |
| Fetch logic | `lib/content/repositories/` |

## Commands

- `/migrate-to-next` — full HTML → Next workflow
- `/parity-pass` — visual parity audit for existing migrations
