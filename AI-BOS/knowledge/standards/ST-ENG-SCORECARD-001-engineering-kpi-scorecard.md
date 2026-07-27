---
id: ST-ENG-SCORECARD-001
title: Engineering KPI Scorecard
type: standard
category: engineering
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-ENG-CTO-001
  - AG-ENG-PERF-001
dependencies:
  - AR-ENG-SAASOS-001
related:
  - engineering-os
  - kpi
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - standard
  - engineering
  - kpi
capabilities:
  - CAP-ENG-001
  - CAP-OPS-002
---

# Engineering KPI Scorecard

## Purpose

Standard metrics for Engineering OS program health and performance review.

## Metrics

| Metric | Description | Target (indicative) |
|--------|-------------|---------------------|
| P95 latency | API/page P95 response time | Track-specific SLA |
| Uptime | Service availability | ≥ 99.9% |
| Deploy frequency | Releases per week | Team-defined |
| MTTR | Mean time to recovery | ≤ 4h critical |
| Test coverage | Unit + integration | ≥ 80% critical paths |
| CWV pass rate | LCP/INP/CLS green | ≥ 90% pages |
| Bundle size | Main JS bundle (web/) | Within perf:budgets |
| Cost | Infra + API spend trend | Flat or decreasing |

## Storage

`founder-os-memory/projects/<slug>/engineering/scorecards/YYYY-MM-DD.json`

## Review cadence

- Per program: at release
- Department: monthly (CTO)
- Escalation to Founder: red metrics × 2 consecutive periods

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I17 — initial engineering scorecard. |
