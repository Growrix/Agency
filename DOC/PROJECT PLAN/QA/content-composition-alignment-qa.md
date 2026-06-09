# Content Composition Alignment — QA Plan

## Parent Artifact
`DOC/PROJECT PLAN/content-composition-alignment-e2e-plan.md`

## Regression Scope
- Homepage hero CTAs and new marketing sections render on desktop, tablet, and mobile.
- `/products` hero and filters unchanged functionally.
- `/services/template-customization` returns 200 and links resolve.
- `/solutions/*` four routes return 200 with shared template.
- Legacy `/shop` and `/shop/[slug]` compatibility preserved.
- Checkout, contact, booking, and AI concierge flows unchanged.

## Required Gates Per Slice
1. `npm run lint` — 0 errors
2. `npm run test:unit` — pass
3. `npm run test:integration` — pass
4. `npm run build` — pass
5. Playwright smoke on home + products + one solution route when slice 6 ships

## Content Acceptance Checks
- No homepage section uses agency-only pricing without product context.
- Product index headline is not operator-facing ("Published Template Catalog").
- Solutions pages include primary CTA to products or booking.
- Template customization page includes package tiers and book/contact CTAs.
