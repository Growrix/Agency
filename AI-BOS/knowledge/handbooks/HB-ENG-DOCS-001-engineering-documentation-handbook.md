---
id: HB-ENG-DOCS-001
title: Engineering Documentation Handbook
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
  - AG-ENG-DOCS-001
  - AG-ENG-CTO-001
dependencies:
  - AR-ENG-SAASOS-001
  - RU-AI-BOS-ENGOS-001
  - CAP-KNW-001
related:
  - documentation
  - adr
  - runbooks
  - engineering-os
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - documentation
  - engineering
capabilities:
  - CAP-KNW-001
  - CAP-DLV-001
---

# Engineering Documentation Handbook

## Purpose

Define standards for architecture docs, API docs, runbooks, changelogs, and ADRs under Engineering OS.

## Scope

`AG-ENG-DOCS-001` under Engineering OS. Does not replace `AG-KNW-ARCH-001` for vault KO authoring.

## Principles

1. **Disk is canonical** — chat summaries are never SSOT.
2. **ADR for decisions** — significant architecture choices get ADR in `engineering/adr/`.
3. **Runbooks for ops** — repeatable procedures in `engineering/runbooks/`.
4. **Changelogs per release** — user-facing notes in `engineering/changelogs/`.

## Document types

| Type | Location | When |
|------|----------|------|
| ADR | `engineering/adr/NNN-title.md` | Architecture decision |
| Runbook | `engineering/runbooks/<name>.md` | Ops procedure |
| Changelog | `engineering/changelogs/YYYY-MM-DD.md` | Release |
| API doc | Project docs or OpenAPI | API contract change |
| Program brief | `engineering/programs/<id>/brief.md` | CTO intake |

## ADR template

```markdown
# ADR-NNN: Title

## Status
Proposed | Accepted | Deprecated

## Context
...

## Decision
...

## Consequences
...
```

## Handoffs

| Condition | To |
|-----------|-----|
| Return to program | AG-ENG-CTO-001 |
| Vault KO authoring | AG-KNW-ARCH-001 |
| API contract design | AG-DLV-API-001 |
| Implementation | Lane delivery agents |
| Memory curation | AG-GRO-MKT-MEMORY-001 |

## Anti-patterns

- Documenting in chat only
- Skipping ADR for breaking architecture changes
- Duplicating vault KO content in project docs

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I17 — initial documentation handbook. |
