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
- Purpose: drive digital product revenue through clear category discovery and high-trust merchandising.
- Target audience: founders, developers, marketers, and operators buying templates, ready sites, mobile apps, MCP servers, and automation assets.
- Primary CTA: Browse Products.
- Secondary CTA: View Bundles.

## Sections In Visual Order

### 1. Commerce Hero
- Content: store positioning, category highlights, value proposition, and trust note around support or licensing.
- Components: hero, category chips, promo badge.

### 2. Category Navigator
- Content: templates, ready websites, mobile apps, MCP servers, automation kits, bundles.
- Components: tab group, chips, icon badges.
- Interaction notes: switching categories updates URL and listing state.

### 3. Search, Filters, and Sort
- Content: keyword search, product type, platform, price, complexity, newest, best-selling.
- Components: search bar, filter panel, sort control.
- State requirements: loading, applied filters, no results, reset filters.

### 4. Featured Bundles
- Content: high-value grouped offers with savings and ideal buyer profile.
- Components: pricing cards, product bundle cards.

### 5. Product Grid
- Content: product cards with image, short promise, tags, price, and support badge.
- Components: product tiles, pagination or load-more control.
- Interaction notes: quick preview drawer on desktop, sheet on mobile.

### 6. Trust and Delivery Details
- Content: what's included, license types, updates, documentation, setup support.
- Components: content block, alert cards, icon list.

### 7. FAQ and Conversion Rail
- Content: refunds, support, compatibility, updates, payments.
- Components: accordion, CTA strip.

## State Requirements
- Product listing: skeleton, populated, empty, filtered-empty, API error.
- Quick preview: closed, loading, open, add-to-cart success.

## Responsive Adaptation
- Desktop uses side filter rail.
- Mobile uses bottom sheet filters with sticky apply and reset actions.
- Sticky mini-cart appears after the first add-to-cart event.

## SEO and Metadata
- Title: Digital Product Shop | Templates, Ready Websites, MCP Servers, Mobile Apps.
- Description: Buy high-quality digital assets including templates, websites, automation kits, mobile apps, and MCP servers.

## Conversion Path
- Shop hero -> category filter -> product grid -> preview -> product detail or direct checkout.