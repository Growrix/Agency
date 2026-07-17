---
id: ST-DOC-001
title: Documentation Standard
type: standard
category: documentation
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
  - AR-AI-BOS-006
  - ST-KNW-001
related:
  - standard
  - documentation
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - documentation
---

# Documentation Standard

## Purpose

Define how human-facing documentation presents Knowledge Objects without becoming knowledge itself.

## Scope

Applies to docs/ pages and docs/index.json. Does not replace Knowledge Objects.

## Principles

1. Documentation presents knowledge; it is not knowledge.
2. Docs have a separate index from the knowledge registry.
3. Every page declares which KO IDs it presents.
4. Docs may use paths; knowledge must use IDs.
5. Vendor-independent narrative; runtime details live in RUN guides.

## Standards

### Doc types

guides, reference, concepts

### Doc index entry

id, title, path, presents (list of KO IDs), status, updated

### Authoring conventions

- One page, one job
- Link to KO IDs in a Presents section
- Prefer short how-to and reference pages over encyclopedias

## Best Practices

- Keep docs short; put durable rules in Standards.
- Update docs/index.json when adding pages.

## Anti-patterns

- Duplicating entire KO bodies into docs.
- Storing docs inside knowledge/ as if they were KOs.
- Omitting the presents field.

## References

- AR-AI-BOS-006 — Documentation Architecture

## Related Knowledge Objects

- ST-KNW-001
- TP-DOC-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Documentation Standard authored in implementation phase. |
