---
id: HB-KNW-AUTHORING-001
title: Knowledge Authoring Handbook
type: handbook
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
  - TP-KNW-001
  - WF-KNW-AUTHOR-001
  - AR-AI-BOS-005
related:
  - handbook
  - authoring
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - handbook
  - knowledge
---

# Knowledge Authoring Handbook

## Purpose

Practical handbook for authoring reusable Knowledge Objects in AI-BOS without tool lock-in.

## Scope

Covers authoring, validation, registration, and reuse of Knowledge Objects. Does not cover runtime skill packaging.

## Principles

1. Knowledge is not agents, MCP, projects, or runtime.
2. Reference by ID, never by mutable path in cross-links.
3. One document, one responsibility.
4. Standards before templates; templates before instances.

## Standards

Follow ST-KNW-001 for structure, ST-REG-001 for registration, ST-VER-001 for versioning, and WF-KNW-AUTHOR-001 for the execution sequence.

### Quick checklist
1. Copy TP-KNW-001
2. Fill front matter + nine sections
3. Validate
4. Register
5. Ledger evidence

## Best Practices

- Declare capabilities on every KO.
- Prefer related keywords plus hard dependencies for true prerequisites.
- Keep examples in EX-* separate from templates TP-*.

## Anti-patterns

- Embedding IDE-specific paths in knowledge bodies.
- Duplicate handbooks that overlap without deprecation.
- Skipping Change History.

## References

- AR-AI-BOS-005
- ST-KNW-001
- docs/guides/author-knowledge-object.md

## Related Knowledge Objects

- TP-KNW-001
- WF-KNW-AUTHOR-001
- HB-GOV-OPS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial handbook authored in I2 implementation. |
