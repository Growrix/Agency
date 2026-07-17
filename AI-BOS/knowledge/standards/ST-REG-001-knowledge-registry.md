---
id: ST-REG-001
title: Knowledge Registry Standard
type: standard
category: knowledge
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
  - AR-AI-BOS-005
  - ST-KNW-001
related:
  - standard
  - knowledge-registry
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - knowledge-registry
---

# Knowledge Registry Standard

## Purpose

Define the structure and invariants of the knowledge registry: root manifest, type indexes, uniqueness, and dependency integrity.

## Scope

Applies to knowledge-registry/ only. Agent, MCP, and project registries are governed by ST-AGT-001, ST-MCP-001, and ST-PRJ-001 respectively.

## Principles

1. registry.json is the SSOT; type indexes are derived views.
2. Every object appears in registry.json AND its type-specific index.
3. IDs are unique across ALL indexes.
4. Registry stores metadata only — never full bodies.
5. Paths are relative to the AI-BOS root and may change; IDs never do.

## Standards

### Root layout

`
knowledge-registry/
├── registry.json
├── handbook-index.json
├── architecture-index.json
├── blueprint-index.json
├── standard-index.json
├── rule-index.json
├── pattern-index.json
├── template-index.json
├── workflow-index.json
├── prompt-index.json
└── example-index.json
`

### Object entry shape

id, title, type, path, version, status, owner, consumers, capabilities, dependencies, updated

### Invariants

- last_updated bumped when objects added or status changes
- dependency IDs must exist
- cycles forbidden
- type determines which index receives the entry

## Best Practices

- Register immediately after authoring.
- Keep path in sync with on-disk location in the same edit session.

## Anti-patterns

- Putting body content into registry JSON.
- Registering only in a type index and skipping registry.json.
- Reusing a retired ID.

## References

- AR-AI-BOS-005 — Knowledge Architecture
- ST-KNW-001 — Knowledge Object Standard

## Related Knowledge Objects

- ST-VER-001 — Versioning
- TP-REG-001 — Registry Entry Template

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Knowledge Registry Standard authored in implementation phase. |
