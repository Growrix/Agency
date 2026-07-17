---
id: ST-MCP-001
title: MCP Server Definition Standard
type: standard
category: mcp
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
  - AR-AI-BOS-008
  - ST-KNW-001
related:
  - standard
  - mcp-server-definition
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - mcp-server-definition
---

# MCP Server Definition Standard

## Purpose

Formalize MCP identity, capability contracts, canonical knowledge-query services, and mcp-registry entry shape.

## Scope

Applies to mcp-registry/ entries. Does not define agent bindings (agents declare MCP usage).

## Principles

1. MCP provides capabilities; it is not documentation.
2. Contracts are vendor-independent; transport is a projection.
3. Agents call MCP; projects do not call MCP directly.
4. Five canonical knowledge-query services are baseline for knowledge access.
5. One-way: Agent → MCP → Knowledge.

## Standards

### MCP ID

MC-<DOMAIN>-<NAME>-<NNN>

### Canonical knowledge-query services

1. knowledge.read
2. knowledge.search
3. knowledge.validate
4. knowledge.list
5. knowledge.resolve

### Registry entry fields

id, name, version, status, services, contracts, capabilities, owner, updated

### Capability contract

Each service declares inputs, outputs, errors, and idempotency expectations.

## Best Practices

- Keep contracts stable; bump MAJOR on breaking service changes.
- Register before first agent binding.

## Anti-patterns

- Putting handbook prose in MCP registry.
- Agents bypassing MCP contracts for knowledge access when contracts exist.
- Bidirectional registry references (MCP → Agent).

## References

- AR-AI-BOS-008 — MCP Architecture

## Related Knowledge Objects

- ST-AGT-001
- ST-REG-001
- TP-MCP-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial MCP Server Definition Standard authored in implementation phase. |
