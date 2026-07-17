---
id: WF-GOV-PHASE-APPROVE-001
title: Phase Gate Approval Workflow
type: workflow
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
  - ST-EXE-001
  - ST-GOV-001
  - AR-AI-BOS-009
  - AR-AI-BOS-010
related:
  - workflow
  - phase-gate
  - approval
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - workflow
  - governance
---

# Phase Gate Approval Workflow

## Purpose

Encode the repeatable human-gated workflow used to approve AI-BOS phase deliverables before advancing.

## Scope

Applies to architecture and implementation phase gates under AI-BOS. Does not approve SaaS delivery lane releases.

## Principles

1. Provenance is mandatory.
2. Human approval is a first-class gate, not optional chat.
3. Structural vs content routing is decided before ratification.
4. Ledger evidence paths are required.

## Standards

### Orchestration pattern
human-gated sequential

### Steps
1. Author deliverable Knowledge Object(s)
2. Register in knowledge-registry (and type index)
3. Run validation via MC-KNW-REGISTRY-001 knowledge.validate
4. Update tasks.md with evidence
5. Present summary and STOP for human approval
6. On approval: mark active, append ledger log, advance next task
7. On revise: return to step 1 with change notes

### Human gates
- **approve** — human ratifies the phase deliverable
- **review_output** — human may request revisions before approve

### Provenance
Record execution_id, workflow_id (WF-GOV-PHASE-APPROVE-001), agent_ids, started_at, ended_at, status, gate_decisions, evidence paths.

generated_from: TP-WF-001

## Best Practices

- Never skip validation before the human gate.
- Route structural findings to AG-GOV-SYSBUILD-001 before asking for approval.

## Anti-patterns

- Silent auto-advance without human approve gate.
- Missing ledger evidence path.
- Ratifying draft KOs without ID uniqueness check.

## References

- ST-EXE-001
- ST-GOV-001
- AR-AI-BOS-009
- AR-AI-BOS-010

## Related Knowledge Objects

- TP-WF-001
- AG-KNW-ARCH-001
- MC-KNW-REGISTRY-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial workflow authored in I2 implementation. |
