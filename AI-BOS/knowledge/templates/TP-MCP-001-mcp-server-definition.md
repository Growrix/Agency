---
id: TP-MCP-001
title: MCP Server Definition Template
type: template
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
  - ST-MCP-001
  - ST-TP-001
related:
  - template
  - mcp-server-definition
  - ST-MCP-001
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - template
  - mcp-server-definition
---

# MCP Server Definition Template

## Purpose

Skeleton for registering a new MCP server in mcp-registry.

## Scope

Use for mcp-registry entries with capability contracts.

## Principles

1. Declare services and contracts.
2. Keep transport details out of the contract core.
3. Set generated_from: TP-MCP-001.

## Standards

Corresponding standard: `ST-MCP-001`

### Placeholder map

| Placeholder | Meaning |
|-------------|---------|
| {{MC_ID}} | MC-DOMAIN-NAME-NNN |
| {{NAME}} | Server name |
| {{SERVICES}} | Service names |
| {{CAPABILITIES}} | CAP-* list |

### Skeleton

```json
{
  "id": "{{MC_ID}}",
  "name": "{{NAME}}",
  "version": "1.0.0",
  "status": "draft",
  "services": ["{{SERVICES}}"],
  "contracts": {},
  "capabilities": ["{{CAPABILITIES}}"],
  "owner": "AI-BOS",
  "generated_from": "TP-MCP-001",
  "updated": "YYYY-MM-DD"
}
```

### Required fields
id, name, version, status, services, contracts, capabilities, owner, updated

### Optional fields
runtime_projection, transport

### Validation hints
ST-MCP-001; prefer including the five canonical knowledge services when the server is a knowledge provider.

### Instantiation example
A future knowledge MCP may expose knowledge.read/search/validate/list/resolve — register when implemented.

## Best Practices

- Instantiate only after the corresponding Standard is active.
- Keep placeholders consistent across templates.
- Register instantiated artifacts immediately.

## Anti-patterns

- Treating this template as an example instance.
- Skipping generated_from on instantiated artifacts.
- Authoring a template before its Standard exists.

## References

- ST-MCP-001
- ST-TP-001 — Template Authoring Standard
- AR-AI-BOS-012 — Templates catalog

## Related Knowledge Objects

- ST-MCP-001
- ST-TP-001
- AR-AI-BOS-012

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial template authored in implementation phase. |
