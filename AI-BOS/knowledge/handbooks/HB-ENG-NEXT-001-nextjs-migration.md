---
id: HB-ENG-NEXT-001
title: Next.js Migration Handbook
type: handbook
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
  - CAP-DLV-004
consumers:
  - AG-DLV-NEXT-LEAD-001
  - AG-DLV-NEXT-PARITY-001
dependencies:
  - AR-AI-BOS-004
  - ST-NEXT-MIG-001
related:
  - nextjs
  - migration
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - handbook
  - nextjs
---

# Next.js Migration Handbook

## Purpose

Index card for HTML → Next.js migration under PRJ-TMPL-NEXT-001.

## Scope

`Frontend_Nextjs/` — Next.js 15 App Router, React 19, Tailwind v4.

## Principles

1. HTML preview approved before migration.
2. Repository pattern; no hardcoded content in components.
3. Parity gate before client delivery (ST-NEXT-PARITY-001).
4. Deep FE rules: universal/Enterprise Level Guide/frontend/

## References

- ST-NEXT-MIG-001, ST-NEXT-PARITY-001
- WF-MIGRATE-HTML-TO-NEXT-001
- nextjs-site-migrator skill (runtime projection)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Next.js handbook (I7). |
