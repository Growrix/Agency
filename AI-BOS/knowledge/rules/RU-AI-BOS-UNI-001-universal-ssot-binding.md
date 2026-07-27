---
id: RU-AI-BOS-UNI-001
title: Universal SSOT Binding Policy
type: rule
category: governance
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
capabilities:
  - CAP-KNW-001
  - CAP-KNW-004
consumers:
  - AG-KNW-ARCH-001
  - AG-GOV-SYSBUILD-001
  - AG-KNW-VALID-001
dependencies:
  - ST-KNW-001
  - AR-AI-BOS-005
related:
  - universal
  - ssot
  - portability
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - rule
  - universal
---


# Universal SSOT Binding Policy

## Purpose

Lock delegated depth SSOT under `AI-BOS/universal/` so AI-BOS remains portable and vendor-independent.

## Scope

All AI-BOS Knowledge Objects and governance docs. Does not replace lane skills in Growrixos `.cursor/skills/`.

## Principles

1. Deep detail lives in `AI-BOS/universal/` (copied Universal + SEO trees).
2. HBs/STs/WFs are index cards — reference `UNI-*` IDs or `universal/...` relative paths.
3. Never reference repo-root `universal/` or `universal/seo/` from AI-BOS KOs.
4. Manual refresh policy until auto-sync is explicitly approved.

## Standards

### Reference format
- Preferred: `UNI-ELG-*` or `UNI-SEO-*` from `universal/INDEX.md`
- Acceptable: `universal/Enterprise Level Guide/frontend/...`

### Authoring checklist
1. Confirm path exists under `AI-BOS/universal/`
2. Add INDEX entry on major new subtrees
3. Run `knowledge.validate` after registry edits

## Anti-patterns

- Hardcoding Growrixos-only paths in knowledge bodies.
- Duplicating Universal prose into HBs (Option B depth).

## References

- `universal/README.md`, `universal/INDEX.md`
- ST-KNW-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial universal SSOT binding rule (I6). |
