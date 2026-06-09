---
document_type: page-plan
page_id: product-detail
route: /products/[slug]
scope: commerce
build_stage: 5-commerce-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
  - shop-page.md
---

# Product Detail Page

## Page Definition
- Purpose: convert product interest into purchase while routing non-technical buyers into Done-For-You customization.
- Target audience: DIY buyers, non-technical operators, and founders evaluating a specific digital product.
- Primary CTA: Buy Now.
- Secondary CTA: Need Customization.

## Sections In Visual Order

### 1. Product Hero and Purchase Panel
- Content: product name, category, headline benefit, price, included assets, license, and immediate CTA.
- Components: media gallery, pricing card, badge row, CTA block.

### 2. Preview Gallery
- Content: desktop screens, mobile screens, section previews, and documentation teaser.
- Components: media gallery, tabs, modal viewer.

### 3. Who This Is For
- Content: audience fit, use-case bullets, and buying context.
- Components: audience card, use-case list.

### 4. What You Get
- Content: files, docs, setup support, updates, bonus assets.
- Components: checklist grid, content cards.

### 5. Technical Specs and Compatibility
- Content: frameworks, integrations, CMS compatibility, deployment guidance, and implementation expectations.
- Components: spec table, badge list, info alerts.

### 6. Use Cases and Outcomes
- Content: ideal buyers, use scenarios, customization options.
- Components: feature blocks, comparison cards.

### 7. Reviews and Trust
- Content: testimonials, ratings, support promise, secure checkout, refund policy summary.
- Components: testimonial cards, trust badges.

### 8. Related Products and Bundle Upsell
- Content: complementary products and discounted bundles.
- Components: product tiles, pricing comparison.

### 9. FAQ and Final CTA
- Content: setup time, customization, support window, refunds, license limits.
- Components: accordion, sticky CTA on mobile, customization service links.

## State Requirements
- Gallery: loading, ready, fullscreen open.
- Purchase panel: default, adding to cart, added, checkout redirect, payment-disabled fallback.

## Responsive Adaptation
- Mobile uses a sticky bottom action bar for Buy and Live Preview.
- Gallery becomes swipe-first with thumbnail rail below.

## SEO and Metadata
- Title: Product Detail | Website Template or Ready Website.
- Description: Review previews, specs, support, and purchase details for this website product.

## Conversion Path
- Hero -> audience fit -> tier comparison -> buy now or request customization.