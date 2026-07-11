# Ecommerce Preview Restoration Frontend Plan

## Purpose
Define the frontend and preview-surface implementation deltas required to restore full template previews while keeping existing ecommerce UX and paid-delivery boundaries intact.

## Scope
- Restore full preview rendering behavior for:
  - /api/website-templates-html-preview/[templateSlug]
  - /api/html-business-profiles/[templateSlug]
- Preserve all current preview consumers:
  - /digital-products/[slug]
  - /shop/[slug]
  - desktop/mobile preview frame components
- Keep product journey and conversion surfaces aligned with shared ecommerce blueprint.

## Baseline Reuse
- Reuse existing iframe preview components:
  - WebsiteTemplateHtmlDesktopPreviewFrame
  - WebsiteTemplateHtmlMobilePreviewFrame
  - WebsiteTemplateHtmlMobilePreviewSection
- Reuse current product detail route structure and preview URL generation in lib modules.
- Reuse existing route contracts and avoid any route-path changes.

## Frontend Delta Decisions
- Preview behavior decision:
  - Full-site preview is intentionally allowed in public preview mode.
  - Remove constrained-preview assumptions from frontend copy/tests.
- Compatibility decision:
  - Keep preview API URLs unchanged so existing iframes and links continue to work.
- Risk decision:
  - Do not present right-click/screenshot prevention as security controls.

## Required Changes
1. Update preview API consumers and related UI copy to remove redaction-language assumptions such as truncated-content expectations.
2. Preserve lazy loading and performance optimizations for preview frames.
3. Keep SEO and noindex policy around preview surfaces.
4. Confirm mobile and desktop preview frames still render complete pages at current viewport scaling logic.

## Reuse-First Guardrails
- Do not replace preview frame components.
- Do not create new preview routes.
- Do not split shop and digital-products preview systems.

## Blueprint Alignment Checks
- Product discovery and PDP remain intact across /digital-products and /shop compatibility surfaces.
- Cart and checkout UX continue to follow existing multi-surface flow.
- Customer and admin dashboard links remain unchanged from current shell model.

## Validation Gates
- Integration assertions updated for full-preview mode.
- No regression in preview rendering on desktop and mobile frames.
- No regression in add-to-cart and checkout CTA flows from product pages.

## Exit Criteria
- Full template preview is visible in existing product preview surfaces.
- Frontend does not depend on redacted-preview markers.
- Preview policy change does not break conversion flows or route compatibility.
