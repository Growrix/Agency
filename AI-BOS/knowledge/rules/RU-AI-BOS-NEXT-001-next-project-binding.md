---
id: RU-AI-BOS-NEXT-001
title: Next.js Agents Must Consume AI-BOS Project Knowledge
type: rule
category: governance
domain: nextjs
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
  - AG-DLV-NEXT-LEAD-001
  - AG-DLV-NEXT-DS-001
  - AG-DLV-NEXT-A11Y-001
  - AG-DLV-NEXT-PERF-001
  - AG-DLV-NEXT-QA-001
  - AG-DLV-NEXT-PARITY-001
dependencies:
  - AR-AI-BOS-011
  - ST-PRJ-001
related:
  - binding
  - nextjs
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - rule
  - nextjs
---

# Next.js Agents Must Consume AI-BOS Project Knowledge

Bind Frontend_Nextjs/ to PRJ-TMPL-NEXT-001 and Next domain pack. Runtime: rule 78.

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Next binding rule (I7). |
