---
id: TP-ENG-SAASOS-001
title: Engineering OS Project Template
type: template
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
  - AG-GOV-SYSBUILD-001
  - AG-ENG-CTO-001
dependencies:
  - AR-ENG-SAASOS-001
  - RU-AI-BOS-ENGOS-001
related:
  - engineering-os
  - project
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - template
  - engineering
capabilities:
  - CAP-ENG-001
  - CAP-PLT-005
---

# Engineering OS Project Template

## Purpose

Template for registering and scaffolding Engineering OS projects (peer to `TP-GRO-MKOS-001`).

## Project registration

```json
{
  "id": "PRJ-ENG-SAASOS-001",
  "name": "Growrix Engineering OS",
  "primary_agent": "AG-ENG-CTO-001",
  "parent_project": "PRJ-STR-FOUNDEROS-001",
  "peer_project": "PRJ-GRO-MKOS-001",
  "ledger_path": "AI-BOS/tasks.md",
  "memory_path": ".cursor/brain/founder-os-memory/projects/<slug>/engineering/"
}
```

## Memory scaffold

```
engineering/
├── meta.json
├── programs/
├── adr/
├── incidents/
├── benchmarks/
├── runbooks/
├── changelogs/
└── scorecards/
```

## meta.json template

```json
{
  "project_slug": "<slug>",
  "engineering_lead": "AG-ENG-CTO-001",
  "saas_project": "PRJ-SAAS-GROWRIXOS-001",
  "tracks": ["web", "sites", "Frontend_Nextjs"],
  "updated": "2026-07-18"
}
```

## Agent roster

- Executive: AG-ENG-CTO-001
- Specialists: AG-ENG-PERF-001, AG-ENG-DOCS-001
- Reused delivery: all AG-DLV-* under PRJ-SAAS-GROWRIXOS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I17 — initial Engineering OS project template. |
