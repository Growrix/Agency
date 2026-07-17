---
id: WF-KNW-AUTHOR-001
title: Knowledge Object Authoring Workflow
type: workflow
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
  - AG-KNW-ARCH-001
  - AG-KNW-VALID-001
dependencies:
  - ST-KNW-001
  - ST-REG-001
  - ST-EXE-001
  - TP-KNW-001
related:
  - workflow
  - authoring
  - knowledge
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - workflow
  - knowledge
---

# Knowledge Object Authoring Workflow

## Purpose

Standardize how new Knowledge Objects are authored, validated, and registered.

## Scope

Applies to HB/AR/BP/ST/RU/PT/TP/WF/PR/EX authoring under AI-BOS.

## Principles

1. Templates instantiate standards.
2. Validate before register.
3. IDs are permanent.
4. Vendor-independent content only.

## Standards

### Orchestration pattern
sequential with autonomous validation gate

### Steps
1. Select template (usually TP-KNW-001)
2. Fill required placeholders and nine body sections
3. Assign permanent ID
4. Call knowledge.validate (AG-KNW-VALID-001 / MC-KNW-REGISTRY-001)
5. Register in registry.json + type index
6. Update tasks.md evidence
7. Human ratifies draft → active when required

### Human gates
- **approve** — required when status moves draft → active for critical priority KOs

### Provenance
execution_id, workflow_id, generating agent, KO id, validation result, registry path

generated_from: TP-WF-001

## Best Practices

- Prefer ST-* before TP-* for new families.
- Keep generated_from on instantiated artifacts.

## Anti-patterns

- Registering without validation.
- Path-based dependencies instead of IDs.

## References

- ST-KNW-001
- ST-REG-001
- TP-KNW-001

## Related Knowledge Objects

- WF-GOV-PHASE-APPROVE-001
- HB-KNW-AUTHORING-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial workflow authored in I2 implementation. |
