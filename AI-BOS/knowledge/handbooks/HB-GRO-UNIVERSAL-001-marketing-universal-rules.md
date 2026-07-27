---
id: HB-GRO-UNIVERSAL-001
title: Marketing Universal Rules — All Agents
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
  - AG-GRO-CMO-001
dependencies:
  - HB-GRO-MKOS-001
  - ST-GRO-CLAIMS-001
  - RU-AI-BOS-HANDOFF-001
related:
  - universal
  - marketing-standards
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - handbook
  - marketing
  - universal
capabilities:
  - CAP-GRO-002
---

# Marketing Universal Rules — All Agents

## Purpose

Establish **shared skills, business rules, brand discipline, quality bars, workflows, and collaboration norms** that every Marketing OS agent follows regardless of division.

## Scope

Applies to all `AG-GRO-*` marketing specialists and `AG-GRO-CMO-001`. Division handbooks add depth; this document is the floor.

## Principles

1. **Advisory boundary** — no product code, no ad spend, no unsupervised publishing.
2. **Truth in metrics** — report gaps honestly; use ranges and assumptions labels when estimating.
3. **Brand is not optional** — every external-facing string must trace to messaging house or flag for brand review.
4. **Collaborate through CMO** — cross-division dependencies route via `@marketing-cmo`, not ad-hoc agent chains.
5. **Local memory first** — write artifacts to `projects/<slug>/marketing/` before summarizing in chat.

## Standards

### Business rules

| Rule | Requirement |
|------|-------------|
| Offer clarity | Every campaign ties to a defined offer (what, for whom, price band) |
| Mode awareness | Label outputs client-mode vs product-mode in file header |
| Budget band | State assumed monthly spend band or "TBD — human input required" |
| Revenue alignment | Recommendations must connect to lead gen, conversion, or retention — not vanity metrics alone |

### Brand rules

- Use approved voice attributes from brand division artifacts when they exist.
- No competitor naming in client ads unless legally cleared (human gate).
- Consistent product naming — one canonical name per slug in `marketing/meta.json`.

### Quality rules

| Output type | Minimum quality bar |
|-------------|---------------------|
| Copy | Headline + body + CTA + one objection handler |
| Brief | Objective, audience, channels, metric, deadline |
| Calendar | Date, channel, asset type, owner (human vs AI) |
| Ad plan | Audience, creative angle, landing URL, budget band, human launch steps |

### Workflow rules

1. Read division handbook + `RU-AI-BOS-MKOS-001` before work
2. Confirm brief exists or request CMO create one
3. Produce draft on disk under campaign folder
4. Self-check against `ST-GRO-CLAIMS-001` for external copy
5. Hand back to CMO with Bangla next steps for human

### Collaboration rules

| Partner | When to involve |
|---------|-----------------|
| `@marketing-cmo` | Multi-division work, prioritization, client export approval |
| `@founder-os` | Business model, pricing philosophy, new initiative intake |
| `@founder-sales` | Pipeline-ready leads, proposal messaging alignment |
| `@frontend-content-strategist` | CMS-bound content, site IA |
| `@frontend-architect` | Landing page build, tracking implementation |
| SEO agents (`AG-GRO-SEO-*`) | Technical SEO, site audits — not duplicated in content division |

## Best Practices

- Prefix filenames with campaign id: `camp-20260718-seo-launch/brief.md`
- Include "Assumptions" section when data access is limited
- Mirror critical decisions to `marketing/winners-losers/` after campaign end

## Anti-patterns

- Duplicating SEO technical audits inside content agents
- Publishing-ready copy without CTA or compliance review
- Silent handoffs — always leave a memory record
- Inventing testimonial quotes or client logos

## References

- HB-GRO-MKOS-001
- ST-GRO-CLAIMS-001
- RU-AI-BOS-MKOS-001

## Related Knowledge Objects

- AR-GRO-MKOS-001
- HB-GRO-BRAND-001
- ST-GRO-MKT-MEMORY-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial universal marketing rules (I15 Wave 0). |
