---
document_type: page-plan
page_id: faq
route: /faq
scope: support
build_stage: 5-conversion-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# FAQ Page

## Page Definition
- Purpose: answer recurring questions and reduce friction before booking or buying, especially for website, SaaS, mobile app, and ready website buyers.
- Target audience: visitors evaluating services, products, payment flexibility, timing, support, and handoff expectations.
- Primary CTA: Ask the AI Concierge.
- Secondary CTA: Book Appointment.

## Sections In Visual Order

### 1. FAQ Hero and Search
- Content: search-first entry with category chips for services, shop, booking, payments, support, and technical questions, framed around the primary website and SaaS offer.
- Components: hero, search bar, chips.

### 2. Category-Based FAQ Blocks
- Content: grouped answers covering website templates, ready websites, SaaS work, mobile launch work, timelines, payment flexibility, support, and secondary-service questions.
- Components: accordion groups, content anchors.

### 3. Quick Answer Panel
- Content: most common high-intent answers surfaced as short cards.
- Components: answer cards, prompt chips.

### 4. Escalation Options
- Content: AI concierge, WhatsApp, booking, contact.
- Components: action cards, CTA band.

## State Requirements
- Search: idle, results found, no results, clear query.
- Accordions: default, expanded, keyboard-focused.

## Responsive Adaptation
- Mobile uses category chips followed by stacked accordions.
- Search results should jump to the relevant answer with clear context.

## SEO and Metadata
- Title: FAQ | Services, Pricing, Products, Booking, and Support.
- Description: Find answers about websites, ready websites, SaaS work, pricing, support, flexible payments, and chat or booking options.

## Conversion Path
- Search or browse -> find answer -> escalate to AI, WhatsApp, contact, or booking.