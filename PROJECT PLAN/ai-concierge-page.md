---
document_type: page-plan
page_id: ai-concierge
route: /ai-concierge
scope: assisted-conversion
build_stage: 5-assistant-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# AI Concierge Page

## Page Definition
- Purpose: provide a dedicated AI-assisted entry point that answers business questions and routes visitors to the correct next action.
- Target audience: visitors who need clarity quickly before booking, buying, or contacting.
- Primary CTA: Ask the AI Concierge.
- Secondary CTA: Escalate to WhatsApp.

## Sections In Visual Order

### 1. Concierge Hero
- Content: explanation of what the AI can answer, trust boundary, and privacy notice.
- Components: hero, prompt chips, reassurance badges.

### 2. Conversation Surface
- Content: large chat panel with starter prompts for services, pricing, delivery timelines, products, and technical questions.
- Components: chat widget expanded mode, prompt list, quick actions.
- State requirements: greeting, active conversation, loading, handoff, offline.

### 3. Knowledge Areas
- Content: services, portfolio, shop items, booking process, payments, support.
- Components: knowledge cards, search bar.

### 4. Escalation Paths
- Content: human live chat, WhatsApp, book appointment, contact form.
- Components: action bar, channel cards.

### 5. Popular Questions
- Content: curated FAQ derived from business FAQs and sales objections.
- Components: accordion, prompt chips.

### 6. Trust and Boundaries
- Content: what data is stored, what the AI can and cannot do, support hours for human escalation.
- Components: content block, alert message.

### 7. Final CTA
- Content: continue chatting, message on WhatsApp, or schedule a call.
- Components: CTA band.

## State Requirements
- Chat supports input validation, typing feedback, retry on failure, and explicit escalation state.
- Offline state must still route to WhatsApp and booking.

## Responsive Adaptation
- Mobile opens the chat as a full-height app-like screen with sticky composer.
- Knowledge areas and FAQs live below the conversation in stacked cards.

## SEO and Metadata
- Title: AI Concierge | Ask Questions About Services, Pricing, and Products.
- Description: Use the AI concierge to get quick answers about services, pricing, products, booking, and business fit.

## Conversion Path
- Hero -> chat -> escalation path -> booking, contact, or product route.