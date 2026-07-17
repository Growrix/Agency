---
id: ST-FE-DS-001
title: SaaS Frontend Design System Standard
type: standard
category: frontend
domain: saas
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-DLV-FE-001
  - AG-DLV-SAAS-001
  - AG-DLV-QA-001
dependencies:
  - ST-KNW-001
related:
  - design-system
  - tokens
  - ui
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - standard
  - design-system
---

# SaaS Frontend Design System Standard

## Purpose

Mandatory design-token and component governance for SaaS UI — no hardcoding of brand/visual constants in features.

## Scope

Applies to SaaS frontend styling and primitives. Template HTML lane has its own rules.

## Principles

1. Tokens are the only source for color/type/space/radius/elevation.
2. Prefer shared primitives over one-off styled divs.
3. Theme/dark-mode via tokens, not scattered overrides.
4. Changes to tokens go through review — not silent edits in features.
5. Accessibility states (hover/focus/disabled) required on interactive primitives.

## Standards

### Tokens
Color, typography, spacing, radius, shadow/elevation, motion (respect reduced-motion).

### Components
Documented variants; no business logic inside pure primitives.

### Definition of done
No raw hex/spacing magic numbers in feature UI; primitives reused; focus-visible present.

## Best Practices

- Extend the system via primitives, not copy-paste CSS.
- Pair visual changes with ST-TST-001 a11y checks.

## Anti-patterns

- Hardcoded brand colors in page modules.
- One-off buttons that diverge from primitive API.

## References

- DOC/Universal/Enterprise Level Guide/frontend/frontend-rules-and-design-system.md
- DOC/Universal/Enterprise Level Guide/frontend/component-and-styling-standards.md

## Related Knowledge Objects

- HB-ENG-FE-001
- ST-TST-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS design-system standard authored for I4. |
