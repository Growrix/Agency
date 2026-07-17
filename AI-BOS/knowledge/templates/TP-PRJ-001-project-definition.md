---
id: TP-PRJ-001
title: Project Definition Template
type: template
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
  - ST-PRJ-001
  - ST-TP-001
related:
  - template
  - project-definition
  - ST-PRJ-001
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - template
  - project-definition
---

# Project Definition Template

## Purpose

Skeleton for registering a new project in project-registry.

## Scope

Use for project-registry entries. Not a Knowledge Object.

## Principles

1. Declare capabilities minimally.
2. Reference agents/MCP/workflows/KOs by ID.
3. Set generated_from: TP-PRJ-001.

## Standards

Corresponding standard: `ST-PRJ-001`

### Placeholder map

| Placeholder | Meaning |
|-------------|---------|
| {{PRJ_ID}} | PRJ-DOMAIN-NAME-NNN |
| {{NAME}} | Project name |
| {{OWNER}} | Human owner |
| {{CAPABILITIES}} | CAP-* list |
| {{CONSUMES}} | KO IDs |
| {{AGENTS}} | AG-* IDs |
| {{MCP}} | MC-* IDs |
| {{WORKFLOWS}} | WF-* IDs |

### Skeleton

```json
{
  "id": "{{PRJ_ID}}",
  "name": "{{NAME}}",
  "version": "1.0.0",
  "status": "draft",
  "owner": "{{OWNER}}",
  "capabilities": ["{{CAPABILITIES}}"],
  "consumes": ["{{CONSUMES}}"],
  "agents": ["{{AGENTS}}"],
  "mcp_servers": ["{{MCP}}"],
  "workflows": ["{{WORKFLOWS}}"],
  "governance": {},
  "runtime_projection": "standalone",
  "generated_from": "TP-PRJ-001",
  "updated": "YYYY-MM-DD"
}
```

### Required fields
id, name, version, status, owner, capabilities, consumes, agents, updated

### Optional fields
mcp_servers, workflows, governance, runtime_projection, root_path

### Validation hints
ST-PRJ-001; one-way Project → Agent → MCP → Knowledge.

### Instantiation example
PRJ-GOV-AI-BOS-001 is the AI-BOS self-project identity (register when project-registry is first populated with real projects).

## Best Practices

- Instantiate only after the corresponding Standard is active.
- Keep placeholders consistent across templates.
- Register instantiated artifacts immediately.

## Anti-patterns

- Treating this template as an example instance.
- Skipping generated_from on instantiated artifacts.
- Authoring a template before its Standard exists.

## References

- ST-PRJ-001
- ST-TP-001 — Template Authoring Standard
- AR-AI-BOS-012 — Templates catalog

## Related Knowledge Objects

- ST-PRJ-001
- ST-TP-001
- AR-AI-BOS-012

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial template authored in implementation phase. |
