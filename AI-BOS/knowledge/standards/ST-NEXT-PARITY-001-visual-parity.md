---
id: ST-NEXT-PARITY-001
title: Visual Parity Standard
type: standard
category: delivery
domain: nextjs
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
capabilities:
  - CAP-DLV-004
  - CAP-DLV-005
consumers:
  - AG-DLV-NEXT-PARITY-001
  - AG-DLV-NEXT-LEAD-001
dependencies:
  - ST-NEXT-MIG-001
related:
  - parity
  - visual
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - nextjs
---

# Visual Parity Standard

## Purpose

Block delivery on P0/P1 fidelity gaps vs source HTML.

## Standards

- Section order, typography, color tokens, motion, and interactive behavior must match.
- nextjs-visual-parity-auditor subagent before sign-off.

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial parity standard (I7). |
