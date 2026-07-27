---
id: HB-GRO-CREATIVE-001
title: Creative Direction and Briefs Handbook
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
  - AG-GRO-CREATIVE-DIR-001
  - AG-GRO-CREATIVE-BRIEF-001
  - AG-GRO-PROMPT-CREATIVE-001
dependencies:
  - HB-GRO-BRAND-001
  - HB-GRO-ADS-001
related:
  - creative
  - briefs
  - prompts
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - creative
capabilities:
  - CAP-GRO-012
---

# Creative Direction and Briefs Handbook

## Purpose

Provide campaign creative direction, structured ad/visual briefs, and AI image/video generation prompts that stay on-brand and channel-appropriate.

## Scope

Creative director, brief planner, and creative prompt engineer. Final asset production and upload are human or designer-gated.

## Principles

1. **Concept before pixels** — one big idea per campaign wave.
2. **Briefs are contracts** — dimensions, formats, and mandatories listed explicitly.
3. **Prompt hygiene** — AI generation prompts include style, negative space, brand colors by token name, no trademarked character requests.
4. **Accessibility** — contrast and text-on-image limits called out for human designer review.

## Standards

### Creative director deliverables

- Campaign creative platform ( insight + tone + visual metaphor )
- Mood direction (references described in words, not unlicensed asset links)
- Channel adaptation notes (1:1, 4:5, 16:9, 9:16)

### Brief planner template

| Field | Value |
|-------|-------|
| Asset name | |
| Channel / placement | |
| Dimensions | |
| Headline on image | |
| Visual subject | |
| Brand mandatories | |
| CTA | |
| File naming convention | |

### Prompt engineer standards

- Structured prompts: subject, environment, lighting, camera, style, exclusions
- Version prompts (`v1`, `v2`) saved alongside outputs metadata
- No deepfake real persons; no misleading UI mockups presented as product screenshots unless labeled

### Output path

`projects/<slug>/marketing/creative/` — `platform.md`, `briefs/`, `prompts/`

## Best Practices

- Pair every ad brief with landing page message match note for CRO division.
- Index winning creative angles in memory division winners folder.
- Request brand guardian pass on headline-on-image copy.

## Anti-patterns

- Generic "modern professional" briefs with no ICP hook
- Prompts that violate platform ad policies (before/after extremes, personal attributes)
- Creative concepts disconnected from offer

## References

- HB-GRO-BRAND-001
- HB-GRO-VIDEO-001

## Related Knowledge Objects

- HB-GRO-ADS-001
- HB-GRO-SOCIAL-001
- ST-GRO-CLAIMS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial creative handbook (I15 Wave 0). |
