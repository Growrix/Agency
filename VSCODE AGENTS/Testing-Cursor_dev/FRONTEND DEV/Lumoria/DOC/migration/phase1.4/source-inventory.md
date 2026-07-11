# Source Inventory

Date: 2026-05-23

## Inputs
- source_root: On Going DOCS/Reference Style/Lumoria
- existing_attempt_root: FRONTEND DEV/Lumoria
- output_root: FRONTEND DEV/Lumoria

## Source Assets
- 23 screenshot captures under On Going DOCS/Reference Style/Lumoria
- Localized static source archive retained for evidence and migration tooling:
  - public/lumoria-pages
  - public/lumoria-assets

## Visual Tokens
- Global tokens in design-tokens.css
- Primary palette: #C69A59, #161616, #F5F4F2, #585858, #DFDEDC
- Typography: Jost and DM Sans

## Runtime Ownership State
- Primary routes are now owned by explicit App Router page files under src/app/**/page.tsx
- Shared render tree and sections are owned by native React components in src/components/site
- Typed page and section content ownership is in src/data/site-content.ts

## Retired Runtime Paths
- Removed src/app/route.ts
- Removed src/app/[...slug]/route.ts
- Removed src/lib/snapshotResponse.ts

## Phase 1.4 Risk Summary
- Native ownership gate is now implemented for all audited screenshot routes
- Quantitative visual parity threshold evidence is still pending
