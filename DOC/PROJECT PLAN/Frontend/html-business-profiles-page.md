---
document_type: page-plan
page_id: html-business-profiles
route: /html-business-profiles
scope: commerce
build_stage: 5-commerce-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# HTML Business Profiles Preview Page

## Page Definition
- Purpose: provide a category-first preview and purchase surface for HTML business profile templates.
- Target audience: operators and service businesses that want launch-ready HTML profile templates without a custom build cycle.
- Primary CTA: Buy This Template.
- Secondary CTA: Open HTML Preview.

## Sections In Visual Order

### 1. Hero and Context
- Content: explain this page as the preview and purchase hub for HTML Business Profiles.
- Components: badge, headline, supporting copy, CTA pair.

### 2. Category Filter Chips
- Content: all categories, creative business, local service business, and corporate business.
- Components: query-param link chips driven from centralized category constants.
- State requirements: all, active category, no category selected.

### 3. Selected Template Live Preview
- Content: selected template title, summary, direct HTML iframe preview, and direct purchase action.
- Components: card shell, iframe container, CTA row.
- State requirements: selected template, no preview URL fallback.

### 4. Category Grouped Template Catalog
- Content: category blocks with template cards, pricing, teaser copy, and actions.
- Components: category section, product cards, preview action, buy action, raw HTML open action.
- Interaction notes: preview action updates URL search params without client-only state.

### 5. Empty State
- Content: guidance when no templates are published.
- Components: fallback card with Studio publishing instruction.

## State Requirements
- Supports category and template URL state (`category`, `template`).
- Template cards and preview panel stay synchronized by URL-driven state.

## Responsive Adaptation
- Desktop: wide preview card with category grid below.
- Tablet: stacked preview and controls with two-column catalog cards.
- Mobile: single-column cards, large tap targets, and no hover-only interactions.

## SEO and Metadata
- Title: HTML Business Profiles | Preview By Category.
- Description: browse and preview built HTML business profile templates by category and purchase directly.

## Conversion Path
- Category filter -> preview template -> buy template via checkout.
