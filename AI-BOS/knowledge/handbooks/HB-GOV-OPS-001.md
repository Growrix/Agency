---
id: HB-GOV-OPS-001
title: AI-BOS Operations Handbook
type: handbook
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
  - AG-KNW-ARCH-001
  - AG-GOV-SYSBUILD-001
dependencies:
  - ST-GOV-001
  - ST-VER-001
  - AR-AI-BOS-010
  - AR-AI-BOS-012
  - WF-GOV-PHASE-APPROVE-001
related:
  - handbook
  - operations
  - governance
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - handbook
  - governance
---

# AI-BOS Operations Handbook

## Purpose

Operational handbook for running AI-BOS day-to-day: roles, gates, registries, and evolution.

## Scope

Covers session start, skill routing, registry updates, phase/implementation gates, and D1 re-evaluation triggers. Does not replace the Constitution or Standards.

## Principles

1. Disk artifacts are canonical; chat is not.
2. Structural changes route to AG-GOV-SYSBUILD-001; content to AG-KNW-ARCH-001.
3. tasks.md is the execution ledger.
4. Evolution follows ST-VER-001.

## Standards

### Session start
1. Read tasks.md
2. Read last evidence artifact
3. Execute next incomplete task

### Routing
| Need | Agent |
|------|-------|
| KO / handbook / workflow content | AG-KNW-ARCH-001 |
| Skill / rule / registry schema / promotion | AG-GOV-SYSBUILD-001 |
| Validation | AG-KNW-VALID-001 via MC-KNW-REGISTRY-001 |

### D1 re-evaluation triggers
1. Second consumer project
2. ≥10 ST/TP/HB KOs authored
3. Explicit user request

## Best Practices

- Keep four registries as siblings.
- Record evidence paths in ledger after every material step.

## Anti-patterns

- Skipping human gates on phase ratification.
- Mixing runtime projections into knowledge/.
- Promoting AI-BOS to a new repo without Trigger evaluation.

## References

- RUN.md
- README.md
- AR-AI-BOS-010
- AR-AI-BOS-012

## Related Knowledge Objects

- WF-GOV-PHASE-APPROVE-001
- HB-KNW-AUTHORING-001
- ST-GOV-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial handbook authored in I2 implementation. |
