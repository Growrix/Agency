---
id: TP-REG-001
title: Registry Entry Template
type: template
category: registry
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
  - ST-REG-001
  - ST-TP-001
related:
  - template
  - registry-entry
  - ST-REG-001
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - template
  - registry-entry
---

# Registry Entry Template

## Purpose

Skeleton for a new entry in knowledge-registry (or guidance for parallel registries).

## Scope

Use when registering a new Knowledge Object metadata entry.

## Principles

1. Add to registry.json AND type index.
2. Paths relative to AI-BOS root.
3. Never put body content in the registry.

## Standards

Corresponding standard: `ST-REG-001`

### Placeholder map

| Placeholder | Meaning |
|-------------|---------|
| {{ID}} | KO ID |
| {{TITLE}} | Title |
| {{TYPE}} | Object type |
| {{PATH}} | Relative path |
| {{CAPABILITIES}} | CAP-* list |
| {{DEPENDENCIES}} | KO ID list |

### Skeleton

```json
{
  "id": "{{ID}}",
  "title": "{{TITLE}}",
  "type": "{{TYPE}}",
  "path": "{{PATH}}",
  "version": "1.0.0",
  "status": "draft",
  "owner": "AI-BOS",
  "consumers": ["ai-bos-architect"],
  "capabilities": ["{{CAPABILITIES}}"],
  "dependencies": ["{{DEPENDENCIES}}"],
  "updated": "YYYY-MM-DD"
}
```

### Required fields
id, title, type, path, version, status, owner, updated

### Optional fields
consumers, capabilities, dependencies

### Validation hints
ST-REG-001 uniqueness and dependency integrity

### Instantiation example
Any ST-* entry created in this implementation batch.

## Best Practices

- Instantiate only after the corresponding Standard is active.
- Keep placeholders consistent across templates.
- Register instantiated artifacts immediately.

## Anti-patterns

- Treating this template as an example instance.
- Skipping generated_from on instantiated artifacts.
- Authoring a template before its Standard exists.

## References

- ST-REG-001
- ST-TP-001 — Template Authoring Standard
- AR-AI-BOS-012 — Templates catalog

## Related Knowledge Objects

- ST-REG-001
- ST-TP-001
- AR-AI-BOS-012

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial template authored in implementation phase. |
