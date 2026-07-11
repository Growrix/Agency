# Legacy Retirement Register

Date: 2026-05-23

## Retired
- Full-route remote-domain proxy rewrite removed
- src/app/route.ts removed
- src/app/[...slug]/route.ts removed
- src/lib/snapshotResponse.ts removed
- Runtime dependence on HTML snapshot serving removed

## Replaced With Native Ownership
- Explicit App Router route files under src/app/**/page.tsx
- Shared route rendering through src/components/site/site-page-view.tsx
- Native interactions for navigation, FAQ, and contact form

## Retained For Migration Evidence Only
- public/lumoria-pages and public/lumoria-assets remain as archive and asset sources, not runtime route owners
- scripts/sync-lumoria-local.mjs remains a tooling utility, not a runtime route dependency

## Status
- Phase 1.4 legacy retirement gate: PASS
