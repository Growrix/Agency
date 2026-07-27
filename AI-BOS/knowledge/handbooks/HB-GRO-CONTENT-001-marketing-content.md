---
id: HB-GRO-CONTENT-001
title: Marketing Content Mini-OS Handbook
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
  - AG-GRO-CONTENT-STRAT-001
  - AG-GRO-CONTENT-PLAN-001
  - AG-GRO-COPY-001
  - AG-GRO-BLOG-001
  - AG-GRO-REPURPOSE-001
dependencies:
  - HB-GRO-BRAND-001
  - HB-GRO-INTEL-001
  - HB-GRO-MKOS-001
related:
  - content
  - copy
  - editorial
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - content
capabilities:
  - CAP-GRO-007
---

# Marketing Content Mini-OS Handbook

## Purpose

Operate the **content mini-OS** — pillars, clusters, editorial calendars, copy, blogs, and repurposing pipelines that feed SEO, social, email, and paid divisions.

## Scope

Content strategist, planner, copywriter, blog writer, and repurposer agents. Site build and CMS implementation delegate to delivery.

## Principles

1. **Pillar-cluster model** — one pillar page per major theme; clusters support internal linking.
2. **Intent-matched formats** — educational vs commercial copy follows funnel stage.
3. **Write once, repurpose many** — every pillar asset gets a repurposing map.
4. **SEO collaboration** — keyword targets from SEO/GEO division; content does not invent keyword strategy alone.

## Standards

### Content strategist outputs

- Content pillars (3–5) mapped to ICP pains
- Topic cluster map with primary keyword per cluster (from SEO division)
- Content-market fit notes (why this audience cares now)

### Planner outputs

- 4–12 week editorial calendar with channel, format, owner, status
- Campaign content spine aligned to `WF-GRO-CAMPAIGN-001`

### Copywriter outputs

| Asset | Required elements |
|-------|-------------------|
| Landing page | Hero, problem, solution, proof, FAQ, CTA |
| Ad copy | Primary text, headline variants, CTA, UTM naming suggestion |
| Email | Subject lines (3), preview, body, single CTA |

### Blog writer outputs

- SEO brief compliance (title, meta, H2 outline, internal links)
- Authoritative tone with actionable takeaways
- Handoff note for `@frontend-content-strategist` when site migration needed

### Repurposer outputs

Repurposing matrix: blog → social threads, email excerpt, video script hook, lead magnet outline.

### Folder layout

`projects/<slug>/marketing/content/` — `pillars.md`, `calendar/`, `copy/`, `blogs/`, `repurpose-maps/`

## Best Practices

- One primary CTA per asset; secondary CTAs only in footer/nurture.
- Batch brand-guardian review for calendar week exports.
- Store approved snippets in asset library for memory division indexing.

## Anti-patterns

- Publishing calendars without linked offers or landing URLs
- Blog posts with no internal link plan
- Duplicate SEO keyword research inside blog agent

## References

- HB-GRO-SEO-GEO-001
- HB-GRO-SOCIAL-001
- HB-GRO-EMAIL-001

## Related Knowledge Objects

- HB-GRO-BRAND-001
- WF-GRO-CAMPAIGN-001
- ST-GRO-CLAIMS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial content handbook (I15 Wave 0). |
