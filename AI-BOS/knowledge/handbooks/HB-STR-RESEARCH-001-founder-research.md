---
id: HB-STR-RESEARCH-001
title: Founder Research Handbook — Market and Competitor Intelligence
type: handbook
category: strategy
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-STR-RESEARCH-001
  - AG-STR-FOUNDER-001
dependencies:
  - AR-AI-BOS-004
  - ST-STR-MEMORY-001
  - HB-STR-FOUNDER-001
related:
  - research
  - competitor
  - market-intelligence
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - research
  - founder
capabilities:
  - CAP-STR-004
---

# Founder Research Handbook — Market and Competitor Intelligence

## Purpose

Define how `AG-STR-RESEARCH-001` conducts market, competitor, and feasibility research for founder initiatives — advisory only, no coding.

## Scope

Research for digital services, SaaS, digital products, and automations. Covers WebSearch/WebFetch, MCP tools, and human escalation for blocked scraping.

## Principles

1. **Evidence on disk** — findings become memory records + summary MD before handoff.
2. **No invented data** — report `missing_knowledge` when unverified.
3. **Scrape escalation** — when sites block bots or need login, stop and instruct human (Bangla, click-by-click).
4. **Founder memory** — all material research persists under `founder-os-memory/memory/`.

## Standards

### Tool priority

| Order | Tool | When |
|-------|------|------|
| 1 | Existing memory / KOs | Prior research on same topic |
| 2 | `MC-KNW-REGISTRY-001` / `MC-KNW-RETRIEVE-001` | Ground in approved knowledge |
| 3 | Cursor WebSearch / WebFetch | Public market/competitor pages |
| 4 | `MC-PLT-CODEBASE-001` | Technical feasibility of existing repo |
| 5 | Human | Login-gated scrape, paid reports, surveys |

### Output artifacts

- Research brief (MD) in `founder-os-memory/memory/summaries/`
- JSON record with sources, confidence, gaps
- Recommendation: proceed / pivot / stop + handoff to `@founder-os` or `@founder-marketing`

## Best Practices

- Compare 3–5 competitors minimum for SaaS ideas
- Note pricing, audience, offer, and weakness explicitly
- Tie findings to revenue model (services vs product vs SaaS)

## Anti-patterns

- Scraping login walls without human
- Research without saving to memory
- Jumping to build before founder approval

## References

- WF-STR-RESEARCH-001
- HB-STR-FOUNDER-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial (I13). |
