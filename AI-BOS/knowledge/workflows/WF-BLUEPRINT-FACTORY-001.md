---
id: WF-BLUEPRINT-FACTORY-001
title: Blueprint Factory Workflow
type: workflow
category: strategy
domain: blueprint
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
capabilities:
  - CAP-STR-004
consumers:
  - AG-BP-DIR-001
dependencies:
  - ST-EXE-001
  - ST-BP-001
related:
  - workflow
  - blueprint
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - workflow
  - blueprint
---

# Blueprint Factory Workflow

## Steps

1. bp-director orchestrates stages 01–12 sequentially
2. Human approval between major strategy locks
3. Uniqueness gate at stage 11
4. Final masterplan at stage 12

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial blueprint workflow (I8). |
