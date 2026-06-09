---
document_type: page-plan
page_id: shop
route: /shop
scope: commerce
build_stage: 5-commerce-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# Shop Page

## Page Definition
- Purpose: drive commerce for website templates, HTML business profiles, and ready-made websites through dense merchandising and direct purchase paths, with catalog messaging aligned to the active pricing bands and support promise.
- Target audience: founders, marketers, agencies, SaaS teams, and service businesses buying packaged digital website products.
- Primary CTA: Start Checkout.
- Secondary CTA: Preview Product.

## Sections In Visual Order

### 1. Commerce Banner
- Content: short retail-style promotional banner, current catalog focus, HTML business profile category mention, template pricing from $500 to $10k, ready-website pricing from $1k to $15k, and support reassurance.
- Components: promo banner, merch stats, support badge.

### 2. Sidebar Filter Navigator
- Content: category, product type, and industry filter groups as a vertical sidebar navigation.
- Components: sidebar nav groups (Category, Type, Industry), each with an "All" option and individual filter links; active-filter pills with clear links; result count above product grid.
- Layout: desktop uses a two-column `[240px_1fr]` grid — sidebar on the left (sticky), product grid on the right. Mobile stacks the sidebar above the grid.
- Interaction notes: every sidebar item is a `<Link>` that updates the URL searchParam; active state is derived from URL, no client-side state required; "Clear filters" link appears when any filter is active. All sidebar groups are derived from the live published catalog payload returned by `listPublicShopProducts` — no hardcoded labels or values in the UI layer.

### 3. Category Shelves
- Content: grouped product shelves for templates, HTML business profiles, and ready websites, with wording that reinforces these as the primary commerce offer over MCP or automation kits.
- Components: section headers, product count labels, dense product grid.
- State requirements: default, filtered, no results, reset filters.

### 4. Product Grid
- Content: product cards with preview image, pricing, category, type, industry, feature bullets, 1 year support messaging, and direct checkout.
- Components: product cards, metadata badges, CTA row.

- Interaction notes: every published card must expose both detail preview and direct checkout actions without hover dependence.

## State Requirements
- Product listing: populated, filtered, filtered-empty.
- Direct checkout CTA: available on every published product card.

## Responsive Adaptation
- Desktop: two-column layout — 240px sticky sidebar on the left, product grid on the right.
- Mobile: sidebar stacks above the product grid as collapsible filter groups.
- Sidebar filter items are full-width links with active-state highlighting (primary color left border + text).
- "Need something custom?" CTA in the page header routes to `/book-appointment`.

## SEO and Metadata
- Title: Website Shop | Templates, HTML Business Profiles, and Ready Websites.
- Description: Browse Growrix website templates, HTML business profiles, and ready-made websites by category, type, and industry, with pricing aligned to the current offer and support promise.

## Conversion Path
- Banner -> category/type/industry filter -> grouped product grid -> product detail or direct checkout.