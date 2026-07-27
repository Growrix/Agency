---
id: ST-NEXT-MIG-001
title: Next.js Migration Contract
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
  - CAP-DLV-002
consumers:
  - AG-DLV-NEXT-LEAD-001
dependencies:
  - HB-ENG-HTML-001
  - RU-AI-BOS-UNI-001
related:
  - migration
  - folder-anatomy
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - nextjs
---

# Next.js Migration Contract

## Purpose

Folder anatomy and content boundaries for migrated apps.

## Standards

- `NN-site-name/` under Frontend_Nextjs/; config/site.config.ts + content/*.json
- Typed schemas; CMS-swappable lib/content/
- Source HTML in sites/ remains preview SSOT until parity sign-off

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial migration contract (I7). |
