---
id: TP-KNW-001
title: Knowledge Object Template
type: template
category: templates
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
  - ST-KNW-001
  - ST-TP-001
related:
  - template
  - knowledge-object
  - ST-KNW-001
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - template
  - knowledge-object
---

# Knowledge Object Template

## Purpose

Reusable skeleton for authoring any new Knowledge Object.

## Scope

Use when creating HB, AR, BP, ST, RU, PT, WF, PR, EX, or architecture KOs. Not for agent-registry/mcp-registry/project-registry entries.

## Principles

1. Fill all required placeholders.
2. Keep vendor-independent body content.
3. Set generated_from: TP-KNW-001 on the new KO.

## Standards

Corresponding standard: `ST-KNW-001`

### Placeholder map

| Placeholder | Meaning |
|-------------|---------|
| {{ID}} | Permanent Knowledge Object ID |
| {{TITLE}} | Human-readable title |
| {{TYPE}} | handbook / architecture / blueprint / standard / rule / pattern / template / workflow / prompt / example |
| {{CATEGORY}} | Top-level grouping |
| {{DOMAIN}} | Specific domain |
| {{OWNER}} | Owning entity |
| {{PURPOSE}} | Purpose section text |
| {{SCOPE}} | Scope section text |

### Skeleton

```yaml
---
id: {{ID}}
title: {{TITLE}}
type: {{TYPE}}
category: {{CATEGORY}}
domain: {{DOMAIN}}
version: 1.0.0
status: draft
owner: {{OWNER}}
visibility: internal
audience:
  - human
  - ai
consumers: []
dependencies: []
related: []
review_cycle: quarterly
last_review: YYYY-MM-DD
priority: medium
tags: []
generated_from: TP-KNW-001
---

# {{TITLE}}

## Purpose
{{PURPOSE}}

## Scope
{{SCOPE}}

## Principles
- ...

## Standards
- ...

## Best Practices
- ...

## Anti-patterns
- ...

## References
- ...

## Related Knowledge Objects
- ...

## Change History
| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | YYYY-MM-DD | Initial draft |
```

### Required fields
id, title, type, category, domain, version, status, owner, visibility, audience, priority, tags, all nine body sections

### Optional fields
consumers, dependencies, related, review_cycle, last_review, capabilities, generated_from

### Validation hints
Validate against ST-KNW-001 before registration.

### Instantiation example
See ST-KNW-001 itself as a completed instance of this shape (not a copy of this template).

## Best Practices

- Instantiate only after the corresponding Standard is active.
- Keep placeholders consistent across templates.
- Register instantiated artifacts immediately.

## Anti-patterns

- Treating this template as an example instance.
- Skipping generated_from on instantiated artifacts.
- Authoring a template before its Standard exists.

## References

- ST-KNW-001
- ST-TP-001 — Template Authoring Standard
- AR-AI-BOS-012 — Templates catalog

## Related Knowledge Objects

- ST-KNW-001
- ST-TP-001
- AR-AI-BOS-012

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial template authored in implementation phase. |
