---
id: WF-ENG-PROGRAM-001
title: Engineering Program Lifecycle
type: workflow
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
dependencies:
  - AR-ENG-SAASOS-001
  - HB-ENG-CTO-001
  - ST-ENG-SCORECARD-001
related:
  - engineering-os
  - program
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - workflow
  - engineering
capabilities:
  - CAP-ENG-001
  - CAP-DLV-001
---

# Engineering Program Lifecycle

## Purpose

End-to-end workflow for engineering programs under Engineering OS: intake → audit → plan → implement → release → measure → learn.

## Phases

### 1. Intake

- Trigger: Founder handoff or `engineering_intake` intent
- Owner: AG-ENG-CTO-001
- Output: `engineering/programs/<id>/brief.md`

### 2. Audit

- Classify tracks (web/, sites/, Frontend_Nextjs/)
- Read existing ADRs, scorecards, open incidents
- Identify delivery lead

### 3. Plan

- Scope slices with phase boundaries
- Assign specialists
- Define KPIs (latency, coverage, deploy freq)

### 4. Implement

- Delegate to lane delivery agents
- Contract-first for API/schema changes
- Mid-phase: narrow lint/typecheck only

### 5. Release

- Phase-end quality enforcer gates
- Human approval for production deploy
- Changelog in `engineering/changelogs/`

### 6. Measure

- Update ST-ENG-SCORECARD-001 metrics
- Store benchmarks in `engineering/benchmarks/`

### 7. Learn

- ADR if architecture changed
- Incident postmortem if failure
- Memory curator handoff for winners/losers patterns

## Gate checklist

- [ ] Program brief on disk
- [ ] Delivery lead assigned
- [ ] Phase-end enforcer pass
- [ ] Human gate for prod (if applicable)
- [ ] Scorecard updated
- [ ] Bangla handoff block

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I17 — initial engineering program workflow. |
