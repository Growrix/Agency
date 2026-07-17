---
id: ST-PRJ-001
title: Project Definition Standard
type: standard
category: projects
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
  - AR-AI-BOS-011
  - ST-KNW-001
related:
  - standard
  - project-definition
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - project-definition
---

# Project Definition Standard

## Purpose

Formalize project identity, lifecycle, layer instantiation, project-registry entry shape, and runtime projection.

## Scope

Applies to project-registry/ entries. Projects are not Knowledge Objects.

## Principles

1. Projects consume all layers; they are not knowledge.
2. Every project declares capabilities.
3. References use IDs (KO, agent, MCP, workflow).
4. Runtime projection is separate from project definition.
5. One project, one human owner.

## Standards

### Project ID

PRJ-<DOMAIN>-<NAME>-<NNN>

### Required fields

id, name, version, status, owner, capabilities, consumes, agents, mcp_servers, workflows, governance, runtime_projection, updated

Optional: root_path

### Lifecycle

draft → active → paused | completed | deprecated | cancelled → archived

### Four-registry dependency

Project → Agent → MCP → Knowledge (one-way)

## Best Practices

- Minimal capability declaration.
- Share KOs/agents across projects instead of duplicating.

## Anti-patterns

- Storing projects in knowledge-registry.
- Hardcoding KO paths in consumes.
- Treating folders as the project identity.

## References

- AR-AI-BOS-011 — Project Architecture

## Related Knowledge Objects

- ST-AGT-001
- ST-MCP-001
- TP-PRJ-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Project Definition Standard authored in implementation phase. |
