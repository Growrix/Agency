---
id: RU-AI-BOS-SEO-001
title: SEO Agents Must Consume AI-BOS SEO Pack
type: rule
category: governance
domain: seo
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
capabilities:
  - CAP-KNW-004
  - CAP-GRO-003
consumers:
  - AG-GRO-SEO-TECH-001
  - AG-GRO-SEO-ON-001
  - AG-GRO-SEO-OFF-001
dependencies:
  - AR-AI-BOS-011
  - ST-PRJ-001
related:
  - binding
  - seo
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - rule
  - seo
---

# SEO Agents Must Consume AI-BOS SEO Pack

SEO agents on PRJ-SAAS-GROWRIXOS-001 must load HB-GRO-SEO-001, ST-SEO-001, WF-SEO-AUDIT-001, and universal/seo/ depth.

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SEO binding rule (I8). |
