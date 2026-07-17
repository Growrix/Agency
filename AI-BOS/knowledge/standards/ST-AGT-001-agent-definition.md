---
id: ST-AGT-001
title: Agent Definition Standard
type: standard
category: agents
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
  - AR-AI-BOS-007
  - ST-KNW-001
related:
  - standard
  - agent-definition
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - agent-definition
---

# Agent Definition Standard

## Purpose

Formalize agent identity, authority levels, lifecycle, handoff contracts, and agent-registry entry shape.

## Scope

Applies to entries in gent-registry/. Knowledge-layer AG-* definition KOs (if used) must also satisfy ST-KNW-001.

## Principles

1. Agents consume knowledge; they do not own it.
2. Agents bind to capability IDs and KO IDs by ID.
3. Authority is explicit: autonomous, supervised, or advisory.
4. Handoffs are contracts, not implicit chat routing.
5. Runtime skill files are projections of agent definitions.

## Standards

### Agent ID

AG-<DOMAIN>-<NAME>-<NNN>

### Authority levels

| Level | May do |
|-------|--------|
| autonomous | Execute within declared scope without human gate |
| supervised | Execute with human approval at declared gates |
| advisory | Recommend only; cannot mutate production state |

### Registry entry fields

id, name, version, status, authority, capabilities, consumes, mcp_servers, handoffs, owner, updated

### Lifecycle

draft → active → deprecated → archived; paused optional for temporary halt.

## Best Practices

- Declare consumes by KO ID.
- Keep handoff targets explicit.
- Mirror runtime skill only as projection.

## Anti-patterns

- Agents owning knowledge content.
- Implicit authority without declaration.
- Circular handoffs without termination rules.

## References

- AR-AI-BOS-007 — Agent Architecture

## Related Knowledge Objects

- ST-MCP-001
- ST-EXE-001
- TP-AGT-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Agent Definition Standard authored in implementation phase. |
