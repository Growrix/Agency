---
document_type: page-plan
page_id: product-detail
route: /shop/[slug]
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
- Purpose: convert product interest into purchase through clear previews, specs, and reassurance.
- Target audience: buyers evaluating a specific template, app, ready website, MCP server, or automation product.
- Primary CTA: Buy Now.
- Secondary CTA: Chat Before Buying.

## Sections In Visual Order

### 1. Product Hero and Purchase Panel
- Content: product name, category, headline benefit, price, included assets, license, and immediate CTA.
- Components: media gallery, pricing card, badge row, CTA block.

### 2. Preview Gallery
- Content: desktop screens, mobile screens, code or workflow previews, documentation teaser.
- Components: media gallery, tabs, modal viewer.

### 3. What You Get
- Content: files, docs, setup support, updates, bonus assets.
- Components: checklist grid, content cards.

### 4. Technical Specs and Compatibility
- Content: frameworks, integrations, APIs, CMS compatibility, deployment guidance.
- Components: spec table, badge list, info alerts.

### 5. Use Cases and Outcomes
- Content: ideal buyers, use scenarios, customization options.
- Components: feature blocks, comparison cards.

### 6. Reviews and Trust
- Content: testimonials, ratings, support promise, secure checkout, refund policy summary.
- Components: testimonial cards, trust badges.

### 7. Related Products and Bundle Upsell
- Content: complementary products and discounted bundles.
- Components: product tiles, pricing comparison.

### 8. FAQ and Final CTA
- Content: setup time, customization, support window, refunds, license limits.
- Components: accordion, sticky CTA on mobile.

## State Requirements
- Gallery: loading, ready, fullscreen open.
- Purchase panel: default, adding to cart, added, checkout redirect, payment-disabled fallback.

## Responsive Adaptation
- Mobile puts purchase panel in a sticky bottom action sheet.
- Gallery becomes swipe-first with thumbnail rail below.

## SEO and Metadata
- Title: Product Detail | Digital Asset, Template, or Ready Build.
- Description: Review previews, specs, support, and purchase details for this digital product.

## Conversion Path
- Hero -> gallery -> specs -> reviews -> buy or chat.