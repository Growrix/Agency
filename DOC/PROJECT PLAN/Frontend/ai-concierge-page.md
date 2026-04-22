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
- Purpose: provide a shared AI chat experience that opens as a popup from Ask the concierge triggers and remains available as a dedicated route when needed.
- Target audience: visitors who need clarity quickly before booking, buying, or contacting.
- Primary CTA: Open AI chat popup.
- Secondary CTA: Escalate to WhatsApp.

## Assistant Scope And Guardrails
- The assistant answers only from approved Growrix OS knowledge sources: services, pricing guidance, FAQs, portfolio proof, shop catalog, booking flow, contact paths, and policy content.
- The assistant must not browse the web, invent offers, or answer with unsupported general knowledge when the answer is not grounded in approved content.
- If the answer is not available in the curated knowledge set, the assistant says it does not have a verified answer yet and offers WhatsApp, contact, or booking handoff.
- Every answer should prefer concise business guidance, recommended next action, and visible source context such as source chips, labels, or section references.
- The popup chat is the primary activation path for homepage CTAs, floating launcher access, and support shortcuts.
- The `/ai-concierge` route remains available as a dedicated full-page version for users who intentionally navigate there or land from shared links.

## Sections In Visual Order

### 1. Concierge Hero
- Content: explanation of what the AI can answer, trust boundary, privacy note, and example prompts grounded in real site content.
- Components: full-page hero, prompt chips, reassurance badges, trust line, source-scope note.

### 1A. Popup Activation Layer
- Content: modal-first chat activation from homepage Ask AI buttons, the global floating icon, and mobile chat shortcuts without forcing a route transition.
- Components: global launcher button, modal overlay, close controls, focus trap, preserved background context.
- Interaction rule: when users click suggested next-step actions (WhatsApp, booking, contact, pricing, services, shop, FAQ), the popup closes immediately and the target destination is shown without requiring manual chat dismissal.

### 2. Conversation Surface
- Content: full chat interface with starter prompts for services, pricing, delivery timelines, products, technical fit, and escalation.
- Components: expanded chat shell, message thread, sticky composer, starter prompts, source badges, suggested next actions, retry control.
- State requirements: greeting, seeded prompt, active conversation, grounded answer, no-answer fallback, loading, handoff, offline.

### 3. Knowledge Areas
- Content: services, portfolio proof, shop items, booking process, payments, support, and policy boundaries.
- Components: knowledge cards, search bar, source-group chips.

### 4. Escalation Paths
- Content: WhatsApp, book appointment, contact form, and optional later live-chat escalation.
- Components: action bar, channel cards, qualified lead handoff summary.

### 5. Popular Questions
- Content: curated FAQ derived from business FAQs and sales objections.
- Components: accordion, prompt chips.

### 6. Trust and Boundaries
- Content: what data is stored, what knowledge sources are used, what the AI can and cannot do, support hours for human escalation.
- Components: content block, alert message.

### 7. Final CTA
- Content: continue chatting, message on WhatsApp, or schedule a call.
- Components: CTA band.

## State Requirements
- Chat supports input validation, typing feedback, retry on failure, explicit escalation state, and preserved thread state per session.
- A no-answer state must explain that the assistant is restricted to approved Growrix knowledge and offer escalation immediately.
- Offline or API-error state must still route to WhatsApp, contact, and booking.
- Popup mode must auto-close on route transition so internal navigation always reveals the destination screen immediately.

## Responsive Adaptation
- Mobile popup opens the chat as a full-height app-like sheet with a single-column conversation surface, sticky bottom-safe composer treatment, and no desktop escalation rail.
- The mobile composer stacks input and send action vertically so the primary submit control always remains visible inside narrow viewports.
- Knowledge areas and FAQs live below the conversation in stacked cards.

## SEO and Metadata
- Title: AI Concierge | Chat About Services, Pricing, Timelines, and Fit.
- Description: Chat with the grounded Growrix AI concierge to get answers from approved service, pricing, FAQ, and portfolio content before you book.

## Conversion Path
- Existing Ask the concierge CTA, floating launcher, header chat icon, or mobile dock chat item -> popup chat overlay -> grounded answer or no-answer fallback -> WhatsApp, booking, contact, or product route.
- Dedicated route fallback: explicit navigation to `/ai-concierge` -> full chat page -> same grounded answer and escalation rules.