---
id: WF-GRO-OFFER-001
title: Offer to Funnel to Sales Workflow
type: workflow
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
  - AG-GRO-MARKET-001
  - AG-GRO-SALES-001
dependencies:
  - HB-GRO-MARKET-001
  - HB-GRO-SALES-001
  - HB-OPS-FIN-001
related:
  - offer
  - funnel
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - workflow
  - growth
capabilities:
  - CAP-GRO-002
  - CAP-GRO-005
---

# Offer to Funnel to Sales Workflow

## Purpose

Connect marketing offer design to sales pipeline and delivery handoff.

## Standards

```text
1. OFFER — @founder-marketing drafts offer one-pager
2. PRICE — HB-OPS-FIN-001 pricing framing (human validates)
3. FUNNEL — channel map + human action checklist
4. SALES — @founder-sales qualifies lead / drafts proposal
5. WON — scope doc on disk → @senior-saas-developer or template agents
6. MEMORY — record client slug + PRJ link
```

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial (I13). |
