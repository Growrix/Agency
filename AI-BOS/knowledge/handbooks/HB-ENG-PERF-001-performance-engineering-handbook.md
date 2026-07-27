---
id: HB-ENG-PERF-001
title: Performance Engineering Handbook
type: handbook
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
  - AG-ENG-PERF-001
  - AG-ENG-CTO-001
dependencies:
  - AR-ENG-SAASOS-001
  - ST-ENG-SCORECARD-001
  - RU-AI-BOS-ENGOS-001
related:
  - performance
  - cwv
  - engineering-os
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - performance
  - engineering
capabilities:
  - CAP-DLV-001
  - CAP-OPS-002
---

# Performance Engineering Handbook

## Purpose

Define performance engineering standards for latency, Core Web Vitals, bundle size, database queries, scalability, and cost optimization across all delivery tracks.

## Scope

`AG-ENG-PERF-001` under Engineering OS. Applies to web/, sites/, and Frontend_Nextjs/ when performance is primary scope.

## Principles

1. **Measure before optimize** — baseline benchmarks on disk before changes.
2. **Budget-driven** — respect perf budgets in CI and release gates.
3. **Track-specific tools** — Lighthouse for HTML; health:check + release gates for web/; build + CWV for Next.js.
4. **Cost awareness** — flag expensive queries, oversized bundles, and unnecessary API calls.

## Standards

### Core Web Vitals targets

| Metric | Target |
|--------|--------|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

### web/ (Growrix OS)

- Run `npm run perf:budgets` from web/
- Release gates in `tests/e2e/release-gates.spec.ts`
- Delegate implementation to AG-DLV-FE-001 / AG-DLV-BE-001 as needed

### sites/ (HTML)

- Lighthouse Performance 95+
- Delegate to AG-DLV-HTML-PERF-001 or AG-DLV-HTML-LEAD-001

### Frontend_Nextjs/

- `pnpm build` + nextjs-performance-optimizer audit
- Delegate to AG-DLV-NEXT-PERF-001 or AG-DLV-NEXT-LEAD-001

## Output artifacts

Store under `engineering/benchmarks/`:

- Baseline report (before)
- Optimization report (after)
- Scorecard delta

## Handoffs

| Condition | To |
|-----------|-----|
| Return to program | AG-ENG-CTO-001 |
| Frontend implementation | AG-DLV-FE-001 / lane perf agents |
| Backend / DB queries | AG-DLV-BE-001 |
| DevOps / CDN / caching | AG-DLV-DEVOPS-001 |
| Documentation | AG-ENG-DOCS-001 |

## Anti-patterns

- Optimizing without baseline measurement
- Removing sections to "fix" perf without user approval
- Skipping track-specific quality gates

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I17 — initial performance engineering handbook. |
