---
id: RU-AI-BOS-FOUNDER-001
title: Founder OS Power Pack Binding Rule
type: rule
category: governance
domain: ai-bos
version: 1.3.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-STR-FOUNDER-001
  - AG-STR-RESEARCH-001
  - AG-GRO-MARKET-001
  - AG-GRO-SALES-001
  - AG-PLT-AUTOMATION-001
dependencies:
  - HB-STR-FOUNDER-001
  - RU-AI-BOS-HANDOFF-001
  - RU-AI-BOS-VAULT-001
  - RU-AI-BOS-MKOS-001
  - RU-AI-BOS-ENGOS-001
related:
  - founder-os
  - i13
  - i15
  - i17
  - marketing-os
  - engineering-os
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - rule
  - founder
capabilities:
  - CAP-STR-006
  - CAP-OPS-005
---

# Founder OS Power Pack Binding Rule

## Purpose

Require Founder OS and specialist agents to load I13/I15 knowledge and MCP tools before large initiatives, with explicit handoff to Marketing OS CMO when marketing scope exceeds offer/funnel design.

## Scope

Founder power pack agents at strategy layer. Marketing execution binds to `RU-AI-BOS-MKOS-001` after handoff.

## Principles

1. **Founder owns business context** — CMO owns multi-channel marketing orchestration.
2. **Offer first, campaign second** — `@founder-marketing` or founder session produces offer; full campaigns go to CMO.
3. **No coding** — founder and I13 strategy agents must not edit product code roots.

## Standards

### Before material founder initiative

1. Read `HB-STR-FOUNDER-001` v1.1+
2. Load specialist HB when scope matches: research, marketing, sales, finance, automation
3. Persist outcomes to `ST-STR-MEMORY-001` paths
4. End with Bangla handoff per `RU-AI-BOS-HANDOFF-001`

### Marketing handoff to CMO

Route to **`AG-GRO-CMO-001`** (`@marketing-cmo`) when any of:

- Multi-channel marketing campaign
- SEO program beyond single-page fix (CMO routes to `@seo-lead`)

- Multi-channel campaign (≥2 of content, ads, email, social, launch)
- GTM launch with dated timeline
- Client marketing deliverable pack
- Ongoing marketing retainer scope

Route to **`AG-GRO-MARKET-001`** (`@founder-marketing`) when:

- Early offer one-pager and funnel map only
- Channel exploration before campaign commitment

**Handoff packet minimum:** project slug, client vs product mode, offer one-pager path, ICP summary, budget band (if known), founder memory record id.

### Engineering handoff to CTO

Route to **`AG-ENG-CTO-001`** (`@engineering-cto`) when any of:

- Engineering department work spanning multiple tracks (SaaS + HTML + Next.js)
- Full-stack SaaS build or cross-layer program from Founder intake
- HTML template client deliverable program
- Next.js migration program
- API contract design before build (department scope)
- Integration provider wiring (department scope)
- Ambiguous engineering scope needing program brief

Route to lane delivery agents **via CTO brief** — Founder must **not** bypass CTO for department-level engineering programs.

**Handoff packet minimum:** project slug, tracks (web/sites/Frontend_Nextjs), primary KPI, deadline, founder memory record id, link to `engineering/programs/<id>/brief.md` when slug known.

Initialize `projects/<slug>/engineering/` before CTO handoff when slug is known.

### MCP tools (when available)

| ID | Use |
|----|-----|
| MC-KNW-REGISTRY-001 | KO search/read |
| MC-KNW-RETRIEVE-001 | Founder memory + grounding retrieve |
| MC-PLT-CODEBASE-001 | Codebase snapshot for planning |

### No-coding rule

`AG-STR-FOUNDER-001` and I13/I15 strategy agents **must not** edit `web/`, `sites/`, `Frontend_Nextjs/`.

## Best Practices

- Initialize `projects/<slug>/marketing/` before CMO handoff when slug is known.
- Link `PRJ-GRO-MKOS-001` in marketing `meta.json` at handoff.
- Keep offer artifacts in disk paths CMO can read without chat replay.

## Anti-patterns

- Founder agent running full ad/copy calendars without CMO
- CMO handoff with no slug or offer document
- Skipping memory persistence on marketing routing decisions

## References

- HB-STR-FOUNDER-001
- RU-AI-BOS-MKOS-001
- AR-GRO-MKOS-001
- AR-ENG-SAASOS-001

## Related Knowledge Objects

- HB-GRO-MKOS-001
- HB-ENG-CTO-001
- WF-GRO-CAMPAIGN-001
- WF-ENG-PROGRAM-001
- TP-GRO-MKOS-001
- TP-ENG-SAASOS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial (I13). |
| 1.1.0 | 2026-07-18 | I15 — add handoff rules to AG-GRO-CMO-001; marketing scope routing; RU-AI-BOS-MKOS-001 dependency. |
| 1.2.0 | 2026-07-18 | I16 — clarify SEO programs route CMO → SEO Lead. |
| 1.3.0 | 2026-07-18 | I17 — engineering department routes Founder → AG-ENG-CTO-001; RU-AI-BOS-ENGOS-001 dependency. |
