---
id: RU-AI-BOS-ENGOS-001
title: Engineering OS Binding Rule
type: rule
category: governance
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
  - AG-ENG-DOCS-001
  - AG-STR-FOUNDER-001
dependencies:
  - AR-ENG-SAASOS-001
  - AR-AI-BOS-004
  - RU-AI-BOS-VAULT-001
  - RU-AI-BOS-HANDOFF-001
related:
  - engineering-os
  - binding
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - rule
  - engineering
  - binding
capabilities:
  - CAP-ENG-001
---

# Engineering OS Binding Rule

## Purpose

Bind Engineering OS agents, skills, and runtime projections to `PRJ-ENG-SAASOS-001`.

## Scope

All work under Engineering OS department. Host projection: rule `86-ai-bos-engos-binding.mdc`.

## Binding

| Artifact | Path |
|----------|------|
| Project | `PRJ-ENG-SAASOS-001` |
| Architecture | `AR-ENG-SAASOS-001` |
| Executive | `AG-ENG-CTO-001` → skill `engineering-cto` |
| Performance | `AG-ENG-PERF-001` → skill `eng-performance` |
| Documentation | `AG-ENG-DOCS-001` → skill `eng-documentation` |
| Ledger | `AI-BOS/tasks.md` |
| Memory | `.cursor/brain/founder-os-memory/projects/<slug>/engineering/` |

## Read order

1. `lane-router.yaml` → `engineering_os` lane
2. `AR-ENG-SAASOS-001`
3. `HB-ENG-CTO-001` (or division HB)
4. Active project `engineering/meta.json`
5. `RU-AI-BOS-HANDOFF-001` v1.1

## Routing

- `engineering_intake` → `@engineering-cto`
- Founder engineering department work → `AG-ENG-CTO-001` (not direct to delivery leads)
- Lane execution → existing `AG-DLV-*` agents via CTO brief

## Never

- Auto-deploy to production
- Skip phase-end quality enforcers
- Bypass CTO for cross-track engineering programs from Founder

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I17 — initial Engineering OS binding rule. |
