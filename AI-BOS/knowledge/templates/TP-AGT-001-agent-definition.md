---
id: TP-AGT-001
title: Agent Definition Template
type: template
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
  - ST-AGT-001
  - ST-TP-001
related:
  - template
  - agent-definition
  - ST-AGT-001
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - template
  - agent-definition
---

# Agent Definition Template

## Purpose

Skeleton for registering a new AI-BOS agent in agent-registry.

## Scope

Use for agent-registry entries. Runtime skill projection is separate.

## Principles

1. Declare authority explicitly.
2. List consumes as KO IDs.
3. Set generated_from: TP-AGT-001 on the registry metadata or companion definition KO.

## Standards

Corresponding standard: `ST-AGT-001`

### Placeholder map

| Placeholder | Meaning |
|-------------|---------|
| {{AG_ID}} | AG-DOMAIN-NAME-NNN |
| {{NAME}} | Human-readable agent name |
| {{AUTHORITY}} | autonomous / supervised / advisory |
| {{CAPABILITIES}} | CAP-* list |
| {{CONSUMES}} | KO ID list |
| {{MCP_SERVERS}} | MC-* list |

### Skeleton

```json
{
  "id": "{{AG_ID}}",
  "name": "{{NAME}}",
  "version": "1.0.0",
  "status": "draft",
  "authority": "{{AUTHORITY}}",
  "capabilities": ["{{CAPABILITIES}}"],
  "consumes": ["{{CONSUMES}}"],
  "mcp_servers": ["{{MCP_SERVERS}}"],
  "handoffs": [],
  "owner": "human: owner-name",
  "generated_from": "TP-AGT-001",
  "updated": "YYYY-MM-DD"
}
```

### Required fields
id, name, version, status, authority, capabilities, consumes, owner, updated

### Optional fields
mcp_servers, handoffs, runtime_projection

### Validation hints
ST-AGT-001; IDs unique in agent-registry.

### Instantiation example
Register ai-bos-architect conceptually as AG-GOV-ARCHITECT-001 when first agent registration is performed (placeholder only — not auto-registered here).

## Best Practices

- Instantiate only after the corresponding Standard is active.
- Keep placeholders consistent across templates.
- Register instantiated artifacts immediately.

## Anti-patterns

- Treating this template as an example instance.
- Skipping generated_from on instantiated artifacts.
- Authoring a template before its Standard exists.

## References

- ST-AGT-001
- ST-TP-001 — Template Authoring Standard
- AR-AI-BOS-012 — Templates catalog

## Related Knowledge Objects

- ST-AGT-001
- ST-TP-001
- AR-AI-BOS-012

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial template authored in implementation phase. |
