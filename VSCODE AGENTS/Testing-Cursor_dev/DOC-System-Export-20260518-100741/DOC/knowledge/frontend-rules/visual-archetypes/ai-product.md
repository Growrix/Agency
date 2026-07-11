---
archetype: ai-product
positioning: AI-first product UI; conversation, suggestion, and streaming as primary affordances
best_for: [ai_chat_products, ai_writing_tools, ai_agents, ai_assistants, ai_search]
---

# AI Product

## Voice
- Calm, precise, and capable.
- Plain copy that explains what the AI can do and what it cannot.
- Honest about limits ("can be wrong", "verify outputs", "private by design").

## Density
- Medium hero.
- Dense conversation surface (chat).
- Balanced settings, history, and pricing.

## Color Direction
- Two-tone neutral with a single high-signal brand hue.
- Avoid loud accents in the chat surface to keep the focus on content.

### Default token roles
- background:  near-white / near-black
- surface:     white / graphite
- inset:       slightly darker for assistant bubbles or rails
- primary:     brand hue (deep blue/violet/teal class)
- accent:      streaming-cursor / suggestion hue
- destructive/success/warning/info: standard semantic palette
- ai-bubble:   subtle background distinct from user bubble
- user-bubble: subtle background distinct from ai bubble

## Typography
- Display family: geometric sans.
- Body family: highly readable humanist sans.
- Mono family: technical mono for code outputs.
- Heading scale: 32 / 28 / 24 / 20.
- Body scale: 16 / 14.
- Streaming cursor: monospaced thin line, blinking at ~1Hz.

## Spacing
- 8px base.
- Chat row vertical rhythm: 12–16px between bubbles.
- Composer min-height: 56; max growth: 240.

## Surface system
- Page base: flat neutral.
- Conversation: full-width column, max readable width 720–800px.
- Side rail: history + threads, optional.
- Overlay: command palette / model picker.

## Radius
- Bubbles 12–16; composer 12; cards 12.

## Motion personality
- Streaming feels alive but not jittery.
- Macro 160–220ms; micro 100–140ms.
- Token streaming animation: opacity + slight slide-up on new tokens.
- Suggestion chip hover: spring lift 1.02.
- Reduced-motion: streaming text appears instantly per chunk.

## Imagery direction
- Minimal hero imagery; product UI screenshots dominate.
- Diagrams allowed for explaining capabilities.
- Avoid stock "AI brain" imagery.

## Hero composition
- Headline: capability statement ("Write, analyze, and ship faster with <product>").
- Sub: limit + privacy note.
- CTA: "Start chatting" + "Watch a 60s demo".
- Below: live chat preview component.

## CTA hierarchy
- Primary: open chat / start trial.
- Secondary: pricing / docs.

## Iconography
- Outline 1.5px; sizes 16/20/24.
- Specialized icons for: model picker, attach, voice, regenerate, copy, share, like/dislike feedback.

## Trust + safety real estate
- Privacy line near every input where applicable.
- Citation/source UI for retrieval results.
- Feedback affordances (like/dislike) on every assistant response.
- Cost/usage indicator if applicable.

## Forbidden in this archetype
- Hiding the model name or capability scope.
- Auto-submitting prompts on focus.
- Decorative animation that competes with streaming text.
- Pretending the AI is a human.
