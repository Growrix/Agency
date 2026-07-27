---
id: TP-GRO-SEOOS-001
title: SEO OS Project Template
type: template
category: growth
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-GRO-SEO-LEAD-001
  - AG-GRO-CMO-001
dependencies:
  - AR-GRO-SEOOS-001
  - TP-GRO-MKOS-001
  - ST-GRO-MKT-MEMORY-001
related:
  - seo-os
  - template
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - template
  - seo
capabilities:
  - CAP-GRO-016
---

# SEO OS Project Template

## Purpose

Template to instantiate SEO OS for a client site or product under an existing marketing project slug.

## Instantiation steps

1. Confirm parent slug exists under `founder-os-memory/projects/<slug>/`
2. Copy `marketing/_template/seo/` structure to `marketing/seo/` (or create from I16 scaffold)
3. Edit `marketing/seo/meta.json`:

```json
{
  "program_id": null,
  "site_url": "https://example.com",
  "markets": ["en-US"],
  "primary_seo_kpi": "organic_sessions",
  "seo_lead_agent": "AG-GRO-SEO-LEAD-001",
  "project_id": "PRJ-GRO-MKOS-001",
  "updated": "2026-07-18"
}
```

4. Create first program: `seo/programs/001/brief.md`
5. Invoke `@seo-lead` with program brief path

## Folder structure

```text
marketing/seo/
├── meta.json
├── programs/
├── audits/
├── rankings/
├── scorecards/
├── algorithm-log/
├── international/
└── ai-visibility/
```

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial SEO OS project template. |
