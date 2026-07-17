---
id: ST-GOV-001
title: Governance Standard
type: standard
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
  - ai-bos-architect
  - system-builder
dependencies:
  - AR-AI-BOS-010
  - ST-KNW-001
related:
  - standard
  - governance
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - governance
---

# Governance Standard

## Purpose

Formalize roles, decision process, authority matrix, amendment process, and conflict resolution for AI-BOS.

## Scope

Applies to governance of AI-BOS itself and to per-project governance role assignments.

## Principles

1. Humans own ratification of permanent rules.
2. Structural changes route to the system-builder role; content to domain architects.
3. Amendments are versioned.
4. Conflict resolution is explicit.
5. Audit posture is continuous, not episodic only.

## Standards

### Roles (minimum)

System Builder, Domain Architect, Knowledge Owner, Project Owner, Auditor, Consumer, Human Approver

### Decision process (six steps)

propose → impact assess → review → decide → author/register → communicate

### Amendment process (seven steps)

propose → impact → review → decide → version → validate → communicate

### Conflict rules

ID permanence wins; SSOT wins over derived indexes; higher authority ratifies; freeze on unresolved BLOCK.

## Best Practices

- Record decisions in tasks.md with evidence paths.
- Escalate structural vs content routing early.

## Anti-patterns

- Silent constitution edits.
- Agents ratifying permanent rules without human approval.
- Skipping impact assessment on MAJOR changes.

## References

- AR-AI-BOS-010 — Governance

## Related Knowledge Objects

- ST-VER-001
- ST-EXE-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Governance Standard authored in implementation phase. |
