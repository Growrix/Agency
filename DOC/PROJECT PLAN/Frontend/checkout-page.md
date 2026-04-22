---
document_type: page-plan
page_id: checkout
route: /checkout
scope: commerce
build_stage: 5-commerce-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
  - shop-page.md
  - product-detail-page.md
---

# Checkout Page

## Page Definition
- Purpose: complete website product purchases through a clear, trustworthy Stripe-powered checkout flow.
- Target audience: buyers ready to purchase a website template or ready-made website.
- Primary CTA: Pay with Stripe.
- Secondary CTA: Return to Product.

## Sections In Visual Order

### 1. Checkout Header
- Content: concise title, secure checkout reassurance, progress indicator, and back-to-cart or product link.
- Components: top bar, step indicator, trust badges.

### 2. Order Summary
- Content: selected website product, license, support notes, and totals.
- Components: summary card, editable rows, price blocks.

### 3. Coupon and Bundle Logic
- Content: coupon input, bundle savings, and offer feedback.
- Components: form row, alert message, badge.
- State requirements: idle, validating, applied, invalid, expired.

### 4. Customer Information
- Content: contact email, business name if relevant, billing country, tax notes.
- Components: form section, input family.

### 5. Payment Section
- Content: Stripe embedded payment or hosted handoff, wallet support, error handling.
- Components: checkout section, secure payment panel.

### 6. Assurance and Support
- Content: what happens after purchase, file delivery, support timeline, refund policy summary, chat shortcut.
- Components: content block, trust cards.

### 7. Success and Failure Messaging
- Content: payment success routing, receipt note, download access, retry behavior for failures.
- Components: toast or inline alerts, confirmation card.

## State Requirements
- Checkout states: loading summary, editing, payment processing, success, failure, retry.
- Embedded payment section must announce errors accessibly.

## Responsive Adaptation
- Desktop uses two-column summary plus payment layout.
- Mobile uses stacked cards with sticky pay action pinned above the system bottom area.

## SEO and Metadata
- Title: Secure Checkout | Complete Your Purchase.
- Description: Review your website order and pay securely with Stripe.

## Conversion Path
- Order summary -> customer info -> payment -> success delivery path.