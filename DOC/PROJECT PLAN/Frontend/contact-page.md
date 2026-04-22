---
document_type: page-plan
page_id: contact
route: /contact
scope: conversion
build_stage: 5-conversion-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# Contact Page

## Page Definition
- Purpose: give visitors the fastest appropriate route to start a conversation.
- Target audience: prospects and buyers needing pre-sales clarification around websites, SaaS applications, mobile launch work, ready websites, or related support.
- Primary CTA: Send Inquiry.
- Secondary CTA: Open WhatsApp.

## Sections In Visual Order

### 1. Contact Hero
- Content: headline, response expectation, and available contact channels.
- Components: hero, badge row, CTA pair.

### 2. Contact Method Cards
- Content: contact form, WhatsApp, AI concierge, live chat, and booking with language tuned to website, SaaS, mobile app, and ready-website inquiries first.
- Components: channel cards, action buttons.

### 3. Inquiry Form
- Content: service interest, project summary, budget band, urgency, preferred follow-up channel, plus options for website templates, ready websites, SaaS applications, and mobile app work.
- Components: form section, file attachment placeholder if added later.

### 4. Business FAQ Shortcut
- Content: links to frequent support and sales questions.
- Components: accordion, quick links, prompt chips.

### 5. Trust and Availability
- Content: support hours, timezone, privacy note, expected next step, flexible-payment reassurance, and delivery-first payment note for qualifying international clients.
- Components: content cards, alert message.

### 6. Final Action Rail
- Content: book if urgent, use WhatsApp for immediate messaging, or keep exploring portfolio.
- Components: action bar.

## State Requirements
- Contact form: default, focus, error, submitting, success, server failure.
- Channel cards: available, unavailable, preferred or recommended.

## Responsive Adaptation
- Mobile prioritizes channel cards above the form.
- Inquiry form becomes a concise stacked flow with larger tap targets.

## SEO and Metadata
- Title: Contact the Agency | Chat, WhatsApp, Booking, and Project Inquiries.
- Description: Reach the agency through contact form, booking, WhatsApp, live chat, or the AI concierge for website, SaaS, mobile launch, and ready-website inquiries.

## Conversion Path
- Contact methods -> chosen channel -> inquiry submitted or chat handoff.