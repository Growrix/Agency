---
id: HB-GRO-BRAND-001
title: Marketing Brand Strategy Handbook
type: handbook
category: growth
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-GRO-BRAND-001
  - AG-GRO-BRAND-GUARD-001
dependencies:
  - HB-GRO-INTEL-001
  - HB-GRO-MKOS-001
related:
  - brand
  - messaging
  - guardian
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - brand
capabilities:
  - CAP-GRO-006
---

# Marketing Brand Strategy Handbook

## Purpose

Define brand strategy (positioning, messaging, voice) and brand guardianship — ensuring all marketing outputs stay coherent across channels and client engagements.

## Scope

`AG-GRO-BRAND-001` (strategist) and `AG-GRO-BRAND-GUARD-001` (guardian). Visual identity production delegates to creative division and delivery agents.

## Principles

1. **Position before prose** — UVP and category frame precede taglines.
2. **One messaging house** — single source for pillars, proof points, and tone.
3. **Guardian is a gate** — not a rewriter; flag violations with fix suggestions.
4. **Client-mode isolation** — never bleed Growrixos product voice into client brand artifacts.

## Standards

### Brand strategist deliverables

| Artifact | Purpose |
|----------|---------|
| Positioning statement | For [ICP], [brand] is the [category] that [benefit] because [proof] |
| Messaging house | 3 pillars, proof points, vocabulary do/don't |
| Tone guide | Voice attributes, reading level, Bangla/English usage rules |
| Elevator pitch | 30s and 10s variants |

### Brand guardian review checklist

- [ ] ICP and offer referenced correctly
- [ ] No prohibited claims (`ST-GRO-CLAIMS-001`)
- [ ] Terminology matches messaging house
- [ ] Competitor references appropriate
- [ ] CTA aligns with funnel stage

Output: `guardian-review-<asset-id>.md` with pass/fail + line-level notes.

### Storage

`projects/<slug>/marketing/brand/` — `positioning.md`, `messaging-house.md`, `tone-guide.md`, `reviews/`

## Best Practices

- Run guardian on all client-facing exports in client-mode.
- Version messaging house (`v1.0`, `v1.1`) when offer pivots.
- Link brand kit asset paths in `marketing/assets/` index.

## Anti-patterns

- Taglines without supporting proof points
- Guardian rewriting entire campaigns — provide targeted fixes only
- Copying competitor positioning verbatim

## References

- HB-GRO-INTEL-001
- ST-GRO-CLAIMS-001

## Related Knowledge Objects

- HB-GRO-CONTENT-001
- HB-GRO-CREATIVE-001
- HB-GRO-UNIVERSAL-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial brand handbook (I15 Wave 0). |
