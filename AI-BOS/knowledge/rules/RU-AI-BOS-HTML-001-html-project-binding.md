---
id: RU-AI-BOS-HTML-001
title: HTML Agents Must Consume AI-BOS Project Knowledge
type: rule
category: governance
domain: html
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
capabilities:
  - CAP-KNW-004
  - CAP-DLV-002
consumers:
  - AG-DLV-HTML-LEAD-001
  - AG-DLV-HTML-DS-001
  - AG-DLV-HTML-A11Y-001
  - AG-DLV-HTML-PERF-001
  - AG-DLV-HTML-QA-001
dependencies:
  - AR-AI-BOS-011
  - ST-PRJ-001
related:
  - binding
  - html
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - rule
  - html
---

# HTML Agents Must Consume AI-BOS Project Knowledge

## Purpose

Bind sites/ work to PRJ-TMPL-HTML-001 and HTML domain pack.

## Binding checklist

1. PRJ-TMPL-HTML-001
2. HB-ENG-HTML-001 + ST-HTML-* + WF-DLV-HTML-SITE-001
3. Rule 77 runtime projection

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial HTML binding rule (I7). |
