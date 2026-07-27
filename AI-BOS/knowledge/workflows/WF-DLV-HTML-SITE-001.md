---
id: WF-DLV-HTML-SITE-001
title: HTML Site Delivery Workflow
type: workflow
category: delivery
domain: html
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
capabilities:
  - CAP-DLV-002
  - CAP-OPS-002
consumers:
  - AG-DLV-HTML-LEAD-001
dependencies:
  - ST-EXE-001
  - HB-ENG-HTML-001
related:
  - workflow
  - html
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - workflow
  - html
---

# HTML Site Delivery Workflow

## Steps

1. Confirm PRJ-TMPL-HTML-001 consumes
2. Design tokens (ST-HTML-DS-001)
3. Build sections per html-website-builder skill
4. Delegate a11y + perf + QA subagents
5. Record evidence in template-tasks.md

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial HTML delivery workflow (I7). |
