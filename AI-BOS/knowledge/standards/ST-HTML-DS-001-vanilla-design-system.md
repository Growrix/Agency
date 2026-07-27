---
id: ST-HTML-DS-001
title: Vanilla HTML Design System Standard
type: standard
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
  - CAP-DLV-004
consumers:
  - AG-DLV-HTML-DS-001
  - AG-DLV-HTML-LEAD-001
dependencies:
  - ST-KNW-001
  - RU-AI-BOS-UNI-001
related:
  - design-system
  - tokens
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - html
---

# Vanilla HTML Design System Standard

## Purpose

Token-first CSS design system rules for `sites/` deliverables.

## Standards

- CSS custom properties in `:root`; dark mode via `[data-theme="dark"]`.
- BEM-style scoped classes; one `<style>` block per file.
- Deep reference: universal/Enterprise Level Guide/frontend/component-and-styling-standards.md

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial HTML DS standard (I7). |
