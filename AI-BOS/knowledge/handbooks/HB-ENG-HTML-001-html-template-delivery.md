---
id: HB-ENG-HTML-001
title: HTML Template Delivery Handbook
type: handbook
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
  - CAP-DLV-004
  - CAP-DLV-005
consumers:
  - AG-DLV-HTML-LEAD-001
  - AG-DLV-HTML-DS-001
  - AG-DLV-HTML-QA-001
dependencies:
  - AR-AI-BOS-004
  - ST-HTML-DS-001
  - ST-HTML-A11Y-001
related:
  - html
  - templates
  - sites
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - handbook
  - html
---

# HTML Template Delivery Handbook

## Purpose

Index card for single-file HTML template delivery under PRJ-TMPL-HTML-001.

## Scope

`sites/` lane — vanilla HTML5, CSS tokens, vanilla JS. Not Next.js or SaaS.

## Principles

1. One file per site; design tokens in `:root`.
2. Mobile-first; WCAG AA+; Lighthouse 95+ targets.
3. Deep detail in `universal/Enterprise Level Guide/frontend/` and html-website-builder skill.
4. Subagents at delivery: DS, a11y, perf, QA.

## Standards

| Topic | KO / depth |
|-------|------------|
| Tokens | ST-HTML-DS-001 → UNI-ELG frontend rules |
| A11y | ST-HTML-A11Y-001 |
| Perf/SEO head | ST-HTML-PERF-001 |
| Workflow | WF-DLV-HTML-SITE-001 |
| Binding | RU-AI-BOS-HTML-001 |

## References

- universal/Enterprise Level Guide/frontend/frontend-rules-and-design-system.md
- universal/Enterprise Level Guide/frontend/accessibility-and-localization.md
- RU-AI-BOS-HTML-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial HTML domain handbook (I7). |
