# Content Composition Alignment — Frontend Plan

## Parent Artifact
`DOC/PROJECT PLAN/content-composition-alignment-e2e-plan.md`

## Purpose
Align public marketing and commerce surfaces with the product-led marketplace model: composition, copy, navigation, and reusable marketing components.

## Component Targets
Create under `web/src/components/marketing/`:
- `TrustBar.tsx`
- `FeaturedProducts.tsx`
- `ThreePathExplainer.tsx`
- `ServiceCards.tsx`
- `Testimonials.tsx`
- `ProductLedFinalCTA.tsx`
- `SolutionsLanding.tsx`

## Route Targets
| Route | Action |
|---|---|
| `/` | Recompose sections per P10 slice 3 |
| `/products` | Buyer-facing hero + category chips |
| `/services/template-customization` | New high-intent upsell page |
| `/solutions/for-startups` | New audience landing |
| `/solutions/for-local-businesses` | New audience landing |
| `/solutions/for-agencies` | New audience landing |
| `/solutions/for-saas-founders` | New audience landing |
| `/pricing` | Tabbed product vs service pricing (slice 7) |

## Copy Source
- Shared constants: `web/src/lib/product-led-content.ts`
- CMS overrides: Sanity home page, shop items, service pages (unchanged loaders)

## Navigation Updates
- `PRIMARY_NAV`: add Solutions dropdown; add Template Customization under Services.
- `FOOTER_NAV`: add Solutions, Bundles, Free products links.

## Exit Criteria
- Homepage reads product-led end-to-end, not agency-first below the fold.
- Product index title and description are buyer-facing.
- Template customization and solutions routes are reachable from nav and homepage paths.
- Mobile layouts remain single-column and thumb-friendly.
