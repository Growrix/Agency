---
document_type: page-plan
page_id: 404
route: /404
scope: utility
build_stage: 6-legal-and-trust
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# 404 Page

## Page Definition
- Purpose: recover lost visitors and route them into high-value areas instead of dead-ending.
- Target audience: any visitor hitting a broken or outdated route.
- Primary CTA: Go Home.
- Secondary CTA: Open Chat.

## Sections In Visual Order

### 1. Error Hero
- Content: concise error message, reassuring tone, and guidance toward useful routes.
- Components: hero, CTA pair, subtle visual motif.

### 2. Recommended Destinations
- Content: links to services, shop, portfolio, pricing, booking.
- Components: utility cards, icon links.

### 3. Help Options
- Content: AI concierge prompt, WhatsApp, and live chat entry.
- Components: action bar, prompt chips.

## State Requirements
- Error messaging must remain accessible and not rely on animation.

## Responsive Adaptation
- Mobile keeps the page short, action-led, and easy to recover from.

## SEO and Metadata
- Title: Page Not Found.
- Description: The page could not be found. Continue to services, shop, portfolio, booking, or support.

## Conversion Path
- Error hero -> recommended destinations or chat recovery.