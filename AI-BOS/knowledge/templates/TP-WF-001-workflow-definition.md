---
id: TP-WF-001
title: Workflow Definition Template
type: template
category: workflows
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
  - ST-EXE-001
  - ST-TP-001
  - ST-KNW-001
related:
  - template
  - workflow-definition
  - ST-EXE-001
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - template
  - workflow-definition
---

# Workflow Definition Template

## Purpose

Skeleton for a new WF-* workflow Knowledge Object.

## Scope

Use when authoring executable workflows as Knowledge Objects.

## Principles

1. Declare orchestration pattern and HITL gates.
2. Require provenance.
3. Set generated_from: TP-WF-001.

## Standards

Corresponding standard: `ST-EXE-001`

### Placeholder map

| Placeholder | Meaning |
|-------------|---------|
| {{WF_ID}} | WF-DOMAIN-NAME-NNN |
| {{TITLE}} | Workflow title |
| {{PATTERN}} | sequential / parallel / fan-out / fan-in / conditional / human-gated |
| {{STEPS}} | Ordered step list |
| {{GATES}} | HITL gate definitions |

### Skeleton

```yaml
---
id: {{WF_ID}}
title: {{TITLE}}
type: workflow
category: execution
domain: ai-bos
version: 1.0.0
status: draft
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers: []
dependencies:
  - ST-EXE-001
generated_from: TP-WF-001
priority: high
tags:
  - workflow
---

# {{TITLE}}

## Purpose
...

## Scope
...

## Principles
- Provenance mandatory
- Gates declared before run

## Standards
### Orchestration pattern
{{PATTERN}}

### Steps
{{STEPS}}

### Human gates
{{GATES}}

### Provenance
Record execution_id, workflow_id, agent_ids, timestamps, status, gate_decisions

## Best Practices
- ...

## Anti-patterns
- ...

## References
- ST-EXE-001

## Related Knowledge Objects
- TP-WF-001

## Change History
| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | YYYY-MM-DD | Initial draft |
```

### Required fields
All ST-KNW-001 required fields plus orchestration pattern and steps

### Optional fields
retry_policy, idempotency_keys, timeout

### Validation hints
ST-EXE-001 + ST-KNW-001

### Instantiation example
Phase approval workflow can be authored later as WF-GOV-PHASE-APPROVE-001.

## Best Practices

- Instantiate only after the corresponding Standard is active.
- Keep placeholders consistent across templates.
- Register instantiated artifacts immediately.

## Anti-patterns

- Treating this template as an example instance.
- Skipping generated_from on instantiated artifacts.
- Authoring a template before its Standard exists.

## References

- ST-EXE-001
- ST-TP-001 — Template Authoring Standard
- AR-AI-BOS-012 — Templates catalog

## Related Knowledge Objects

- ST-EXE-001
- ST-TP-001
- AR-AI-BOS-012

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial template authored in implementation phase. |
