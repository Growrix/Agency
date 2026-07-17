---
id: ST-TP-001
title: Template Authoring Standard
type: standard
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
  - AR-AI-BOS-012
  - ST-KNW-001
related:
  - standard
  - template-authoring
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - template-authoring
---

# Template Authoring Standard

## Purpose

Define how Template Knowledge Objects are structured, referenced, and instantiated.

## Scope

Applies to TP-* Knowledge Objects under knowledge/templates/.

## Principles

1. Templates are Knowledge Objects (type template).
2. Templates instantiate Standards; they do not replace them.
3. Instantiated artifacts set generated_from to the template ID.
4. Templates include placeholder map, skeleton, required/optional fields, validation hints, and one marked example.
5. Author ST-* before TP-* for the same artifact family.

## Standards

### Required template sections (in Standards body area or dedicated subsections)

1. Placeholder map
2. Skeleton
3. Required fields
4. Optional fields
5. Validation hints
6. Instantiation example (clearly marked)

### Instantiation steps

copy skeleton → fill required placeholders → assign new ID → validate against corresponding ST → register → set generated_from

## Best Practices

- Keep placeholders unambiguous ({{name}} style).
- Keep examples clearly labeled so they are not mistaken for the template.

## Anti-patterns

- Shipping templates without a corresponding Standard.
- Using examples (EX-*) as if they were templates.
- Omitting generated_from on instantiated artifacts.

## References

- AR-AI-BOS-012 — Templates catalog
- ST-KNW-001

## Related Knowledge Objects

- TP-KNW-001 and other TP-* templates

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Template Authoring Standard authored in implementation phase. |
