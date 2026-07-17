---
id: WF-DLV-SAAS-FEATURE-001
title: SaaS Feature Delivery Workflow
type: workflow
category: delivery
domain: saas
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-DLV-SAAS-001
  - AG-DLV-FE-001
  - AG-DLV-BE-001
  - AG-DLV-QA-001
  - AG-DLV-QA-BE-001
  - AG-DLV-DEVOPS-001
dependencies:
  - ST-EXE-001
  - ST-TST-001
  - ST-SEC-001
  - HB-ENG-ARCH-001
related:
  - workflow
  - feature
  - phase-gate
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - workflow
  - saas
---

# SaaS Feature Delivery Workflow

## Purpose

Repeatable workflow for delivering a SaaS feature on PRJ-SAAS-GROWRIXOS-001 with human gates and quality enforcement.

## Scope

Applies to cross-layer and single-layer SaaS features under web/. Not for AI-BOS architecture phases.

## Principles

1. Audit before build.
2. Contracts before code when cross-layer.
3. Mid-phase narrow checks; phase-end full gates.
4. Provenance in project ledger.
5. Human approve for production-risk changes.

## Standards

### Orchestration pattern
human-gated sequential (with parallel FE/BE when contracts stable)

### Steps
1. Confirm project PRJ-SAAS-GROWRIXOS-001 and read consumes KOs
2. Audit current code/docs; classify mode
3. Update/create contracts if cross-layer (ST-API-001)
4. Implement smallest change set (FE/BE as owned)
5. Mid-phase lint/typecheck on touched packages
6. Run applicable ST-TST-001 gates / phase-end enforcers
7. Security review against ST-SEC-001 for privileged paths
8. Update DOC/PROJECT PLAN Tasks/tasks.md evidence
9. Human approve gate for release-risk items
10. CI parity before push when requested

### Human gates
approve (release-risk), review_output (QA findings)

### Provenance
execution notes, agent IDs, KO IDs read, gate commands, commit SHA when committed

generated_from: TP-WF-001

## Best Practices

- Prefer AG-DLV-SAAS-001 for cross-layer; specialist agents for single-layer.
- Stop on gate red — do not advance.

## Anti-patterns

- Coding before reading project KO set.
- Skipping QA agents on phase completion.

## References

- ST-EXE-001, ST-TST-001, ST-SEC-001
- HB-ENG-ARCH-001, HB-OPS-REL-001

## Related Knowledge Objects

- WF-GOV-PHASE-APPROVE-001
- RU-AI-BOS-SAAS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS feature delivery workflow authored for I4. |
