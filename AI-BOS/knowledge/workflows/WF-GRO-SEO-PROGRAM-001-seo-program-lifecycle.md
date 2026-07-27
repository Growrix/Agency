---
id: WF-GRO-SEO-PROGRAM-001
title: SEO Program Lifecycle Workflow
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
  - AG-GRO-SEO-LEAD-001
dependencies:
  - AR-GRO-SEOOS-001
  - HB-GRO-SEOOS-001
  - WF-SEO-AUDIT-001
related:
  - seo-program
  - seo-os
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - workflow
  - seo
capabilities:
  - CAP-GRO-016
  - CAP-GRO-003
---

# SEO Program Lifecycle Workflow

## Purpose

Define the end-to-end lifecycle for SEO programs under SEO OS — from intake through audit, roadmap, execution, measurement, and learning.

## Steps

### 1. Intake

- Receive handoff from `@marketing-cmo` or scoped SEO request from founder
- Resolve project slug and site scope (domain, property, markets)
- Write `seo/programs/<id>/brief.md` (objective, KPI, deadline, constraints)

### 2. Baseline audit

- Run or assign `WF-SEO-AUDIT-001` (technical → on-page → off-page)
- Capture baseline scorecard per `ST-GRO-SEO-SCORECARD-001`
- Store reports in `seo/audits/`

### 3. Roadmap

- SEO Lead prioritizes initiatives (impact × effort × business fit)
- Write `seo/programs/<id>/roadmap.md` with phases and owners
- CMO sign-off if SEO is part of larger marketing campaign

### 4. Execute

- Delegate tracks to specialists (tech, on-page, off-page, GEO, international, etc.)
- Delivery implementation via `@technical-seo`, `@on-page-seo`, `@frontend-architect` as applicable
- Human gates for Search Console, DNS, publish

### 5. Measure

- Update scorecard with available data (human-provided Search Console / GA4)
- Route analytics interpretation to `@mkt-analytics` when needed
- Compare vs baseline; document in `seo/rankings/`

### 6. Learn

- Post-mortem to `seo/programs/<id>/post-mortem.md`
- Promote winners to `seo/` memory via `@mkt-memory-curator`
- Algorithm events logged via `@mkt-seo-algorithm-watch`

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial SEO program lifecycle. |
