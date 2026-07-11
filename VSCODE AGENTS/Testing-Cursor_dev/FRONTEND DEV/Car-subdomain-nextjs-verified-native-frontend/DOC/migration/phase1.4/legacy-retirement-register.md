# Legacy Retirement Register

Generated: 2026-05-23

## Retired Runtime Ownership
- Removed parser runtime files:
  - `src/lib/page-loader.ts`
  - `src/components/site/html-fragment.tsx`
  - `src/components/site/native-page-view.tsx`
- Removed dynamic route owner:
  - `src/app/[slug]/page.tsx` (folder retired)
- Removed parser dependencies:
  - `html-react-parser`
  - `node-html-parser`

## Replaced Behaviors
- Runtime HTML parsing replaced with typed native node rendering:
  - `src/components/site/native-node-renderer.tsx`
  - `src/components/site/native-route-page.tsx`
- Build-time HTML directory redirect discovery replaced by route manifest:
  - `next.config.ts` now reads `src/data/native-route-list.json`

## Remaining Legacy Assets
- Source legacy HTML files remain in `src/content/pages` as migration evidence only.
- Legacy static assets in `public/` remain as frontend media/style/script resources.
- Legacy jQuery/plugin scripts are not page owners; native fallback styles and behaviors own baseline render stability.
