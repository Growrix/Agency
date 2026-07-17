---
id: ST-EXE-001
title: Execution Standard
type: standard
category: execution
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
  - AR-AI-BOS-009
  - ST-KNW-001
related:
  - standard
  - execution
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - execution
---

# Execution Standard

## Purpose

Formalize workflow execution context, six-state lifecycle, orchestration patterns, human-in-the-loop gates, and provenance.

## Scope

Applies to WF-* Knowledge Objects and runtime execution of those workflows.

## Principles

1. Workflows are Knowledge Objects; executions are transient instances.
2. Provenance is mandatory for every completed or failed execution.
3. Human-in-the-loop gates are first-class, not afterthoughts.
4. Idempotency and recovery are required for mutating steps.
5. Orchestration pattern is declared, not improvised.

## Standards

### Execution lifecycle

queued → running → waiting_human → succeeded | failed | cancelled

### Orchestration patterns

sequential, parallel, fan-out, fan-in, conditional, human-gated

### HITL gate types

approve, choose, provide_input, review_output

### Provenance minimum

execution_id, workflow_id, agent_ids, started_at, ended_at, status, inputs_hash, outputs_refs, gate_decisions

## Best Practices

- Declare gates in the WF KO before running.
- Record provenance even on failure.

## Anti-patterns

- Silent retries that skip provenance.
- Mutating steps without idempotency keys.
- Treating executions as Knowledge Objects.

## References

- AR-AI-BOS-009 — Execution Architecture

## Related Knowledge Objects

- ST-GOV-001
- TP-WF-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Execution Standard authored in implementation phase. |
