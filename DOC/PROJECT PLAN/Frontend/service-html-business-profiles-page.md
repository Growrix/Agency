---
document_type: page-plan
page_id: service-html-business-profiles
route: /services/html-business-profiles
scope: services
build_stage: 4-page-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# HTML Business Profiles Service Page

## Page Definition
- Purpose: explain the HTML Business Profiles service as a fast digital-product pathway with optional customization.
- Target audience: teams that need category-aligned profile websites quickly and want clear template-to-purchase flow.
- Primary CTA: Browse Profile Templates.
- Secondary CTA: Open Profile Preview Hub.

## Sections In Visual Order

### 1. Hero and Positioning
- Content: service framing for category-based HTML business profile delivery.
- Components: hero heading, supporting copy, CTA pair.

### 2. What We Build
- Content: creative, local service, and corporate profile templates plus bundles and customization upgrades.
- Components: build-capability cards.

### 3. Differentiators
- Content: category clarity, truthful preview path, commerce-connected delivery, CMS extensibility.
- Components: differentiator grid.

### 4. Tiers and Pricing
- Content: single profile, showcase bundle, and customization upgrade tiers.
- Components: pricing cards, featured tier indicator.

### 5. FAQ
- Content: preview availability, checkout connection, customization workflow.
- Components: FAQ accordion section.

### 6. Stats and Conversion Band
- Content: built profile count, categories, launch timeline, and conversion CTA.
- Components: stat blocks, conversion CTA.

## State Requirements
- Uses the shared service detail route structure and shared fallback behavior.
- Keeps all CTA links mapped to real destinations (`/html-business-profiles`, `/shop?category=html-business-profiles`, `/book-appointment`).

## Responsive Adaptation
- Desktop: tier cards in multi-column layout with visible category framing.
- Tablet: two-column capability and tier blocks.
- Mobile: one-column stack with thumb-friendly CTA buttons and clear visual hierarchy.

## SEO and Metadata
- Title: HTML Business Profiles Service.
- Description: category-based HTML profile templates with real preview and direct purchase path.

## Conversion Path
- Service page -> preview hub or shop category -> checkout or customization booking.
