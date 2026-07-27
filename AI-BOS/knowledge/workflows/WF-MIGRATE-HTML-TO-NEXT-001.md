---
id: WF-MIGRATE-HTML-TO-NEXT-001
title: HTML to Next.js Migration Workflow
type: workflow
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
  - HB-ENG-NEXT-001
  - ST-NEXT-MIG-001
related:
  - migration
  - workflow
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - workflow
  - nextjs
---

# HTML to Next.js Migration Workflow

## Steps

1. Confirm approved HTML in sites/
2. Scaffold Frontend_Nextjs/NN-site-name/
3. Port tokens → Tailwind theme
4. Section-by-section migration
5. Parity pass + a11y/perf/QA gates
6. Ledger update

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial migration workflow (I7). |
