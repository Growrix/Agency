---
id: RU-AI-BOS-SEOOS-001
title: SEO OS Lane Binding Rule
type: rule
category: governance
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
dependencies:
  - AR-GRO-SEOOS-001
  - HB-GRO-SEOOS-001
  - RU-AI-BOS-MKOS-001
  - ST-GRO-SEO-SCORECARD-001
  - RU-AI-BOS-HANDOFF-001
  - RU-AI-BOS-VAULT-001
related:
  - seo-os
  - binding
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - rule
  - seo
  - seoos
capabilities:
  - CAP-GRO-016
  - CAP-OPS-005
---

# SEO OS Lane Binding Rule

## Purpose

Require all SEO OS agents to load I16 knowledge, bind to `PRJ-GRO-MKOS-001`, persist artifacts to SEO memory paths, and respect human gates before external SEO actions.

## Scope

Applies to `AG-GRO-SEO-LEAD-001` and SEO division agents when work root is SEO advisory or SEO program orchestration.

## Principles

1. **Project identity** — SEO programs use `PRJ-GRO-MKOS-001` with artifacts under `marketing/seo/`.
2. **SEO Lead entry** — multi-track or ambiguous SEO scope starts with `@seo-lead` (via CMO handoff).
3. **CMO still owns marketing** — full marketing campaigns start with `@marketing-cmo`.
4. **No fabricated data** — rankings, traffic, and indexation require human-provided or audit evidence.

## Standards

### Binding checklist

1. Load `AR-GRO-SEOOS-001`, `HB-GRO-SEOOS-001`, `RU-AI-BOS-SEOOS-001`
2. Load division handbook for assigned agent
3. Read `projects/<slug>/marketing/seo/meta.json`
4. Follow `WF-GRO-SEO-PROGRAM-001` for program work
5. Update `ST-GRO-SEO-SCORECARD-001` scorecard when metrics available
6. Write outputs on disk; record memory summary
7. End with Bangla handoff per `RU-AI-BOS-HANDOFF-001`

### Orchestrator routing

| Need | Agent |
|------|-------|
| SEO department / multi-track | AG-GRO-SEO-LEAD-001 |
| Full marketing campaign | AG-GRO-CMO-001 |
| Technical SEO execution | AG-GRO-SEO-TECH-001 |
| On-page SEO | AG-GRO-SEO-ON-001 |
| Off-page / local | AG-GRO-SEO-OFF-001 |
| Business context | AG-STR-FOUNDER-001 |

### Human gates

Search Console login, DNS changes, sitemap submit, disavow file, publish — human executes; agent supplies Bangla checklist.

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial SEO OS binding rule. |
