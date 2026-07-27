---
id: AR-GRO-SEOOS-001
title: SEO OS Architecture
type: architecture
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
  - AR-GRO-MKOS-001
  - AR-AI-BOS-004
  - HB-GRO-SEOOS-001
  - RU-AI-BOS-SEOOS-001
related:
  - seo-os
  - seo
  - marketing-os
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - architecture
  - seo
  - seoos
capabilities:
  - CAP-GRO-003
  - CAP-GRO-014
  - CAP-GRO-016
---

# SEO OS Architecture

## Purpose

Define the **SEO Operating System (SEO OS)** — a Chief SEO Officer-led sub-department under Marketing OS CMO that orchestrates all search optimization work (technical, on-page, off-page, GEO, international, automation, algorithm intelligence) without replacing delivery agents or the CMO executive.

## Scope

Architecture for SEO OS under `PRJ-GRO-MKOS-001`. Covers hierarchy, authority, memory, human gates, and handoffs. Does **not** define vault runtime projections (those follow `RU-AI-BOS-VAULT-001`).

## Principles

1. **SEO Lead owns SEO routing** — `AG-GRO-SEO-LEAD-001` is the SEO division entry; specialists do not bypass the Lead for multi-track SEO programs.
2. **CMO remains marketing entry** — full marketing campaigns still start with `@marketing-cmo`; CMO hands off SEO department work to SEO Lead.
3. **Reuse delivery agents** — technical, on-page, and off-page SEO execution uses existing `AG-GRO-SEO-*` delivery agents; SEO OS adds orchestration and missing divisions only.
4. **Advisory + delivery split** — advisory SEO (keyword, GEO, international, automation, algorithm watch) produces artifacts; delivery agents may edit code in their lanes.
5. **Disk is SSOT** — SEO artifacts live under `projects/<slug>/marketing/seo/` per `ST-GRO-MKT-MEMORY-001`.
6. **Evidence over vanity** — never fabricate rankings, traffic, or indexation data.

## Standards

### Executive layer

| Property | Value |
|----------|-------|
| Parent project | `PRJ-GRO-MKOS-001` |
| SEO executive | `AG-GRO-SEO-LEAD-001` |
| Primary handbook | `HB-GRO-SEOOS-001` |
| Binding rule | `RU-AI-BOS-SEOOS-001` |
| Default workflow | `WF-GRO-SEO-PROGRAM-001` |
| Reports to | `AG-GRO-CMO-001` |

### SEO divisions (orchestrated)

| # | Division | Handbook | Agents | Status |
|---|----------|----------|--------|--------|
| 1 | SEO Executive | HB-GRO-SEOOS-001 | AG-GRO-SEO-LEAD-001 | New (I16) |
| 2 | Technical SEO | HB-GRO-SEO-001, universal/seo/ | AG-GRO-SEO-TECH-001 | Existing |
| 3 | On-Page SEO | HB-GRO-SEO-001, universal/seo/ | AG-GRO-SEO-ON-001 | Existing |
| 4 | Off-Page / Authority / Local | HB-GRO-SEO-001, universal/seo/ | AG-GRO-SEO-OFF-001 | Existing |
| 5 | Keyword Intelligence | HB-GRO-SEO-GEO-001 | AG-GRO-SEO-KW-001 | Existing |
| 6 | AI Search / GEO | HB-GRO-SEO-GEO-001 | AG-GRO-SEO-GEO-001 | Existing |
| 7 | International SEO | HB-GRO-SEO-INTL-001 | AG-GRO-SEO-INTL-001 | New (I16) |
| 8 | SEO Automation | HB-GRO-SEO-AUTO-001 | AG-GRO-SEO-AUTO-001 | New (I16) |
| 9 | Algorithm Watch | HB-GRO-SEO-ALGO-001 | AG-GRO-SEO-ALGO-001 | New (I16) |
| 10 | SEO Analytics | HB-GRO-ANALYTICS-001 | AG-GRO-ANALYTICS-001 | Reuse (partial) |
| 11 | SEO Memory | HB-GRO-MKT-MEMORY-001 | AG-GRO-MKT-MEMORY-001 | Reuse |

### Human gates

| Action | Gate | Agent responsibility |
|--------|------|---------------------|
| Search Console / GA4 login | Human | Bangla checklist for verification |
| DNS / hreflang deploy | Human → delivery | Hand off to `@frontend-architect` or `@senior-saas-developer` |
| Submit sitemap / request indexing | Human | Provide exact URLs and steps |
| Disavow file / penalty response | Human | Draft recommendation; human submits |
| Claims about rankings or traffic | Human | Flag per `ST-GRO-CLAIMS-001`; no invented metrics |

### Memory architecture

SEO memory extends marketing memory:

```text
projects/<slug>/marketing/seo/
├── meta.json
├── programs/
├── audits/
├── rankings/
├── algorithm-log/
├── international/
└── ai-visibility/
```

### Handoffs

| From | To | When |
|------|-----|------|
| AG-STR-FOUNDER-001 | AG-GRO-CMO-001 | marketing department work |
| AG-GRO-CMO-001 | AG-GRO-SEO-LEAD-001 | SEO department work |
| AG-GRO-SEO-LEAD-001 | AG-GRO-SEO-* | specialist delegation |
| AG-GRO-SEO-LEAD-001 | AG-DLV-FE-001 | site implementation |
| AG-GRO-SEO-LEAD-001 | AG-GRO-CMO-001 | return to marketing executive |

## Best Practices

- Run `WF-GRO-SEO-PROGRAM-001` for new site or major SEO initiatives.
- Link every recommendation to an audit artifact or data source.
- Update SEO scorecard (`ST-GRO-SEO-SCORECARD-001`) after each program phase.

## Anti-patterns

- SEO Lead writing all audits personally instead of routing to specialists.
- Bypassing CMO on campaigns that include paid + email + SEO together.
- Creating duplicate SEO agents for divisions already covered by delivery trio.

## References

- AR-GRO-MKOS-001
- HB-GRO-SEO-001
- WF-GRO-SEO-PROGRAM-001
- ST-GRO-SEO-SCORECARD-001

## Related Knowledge Objects

- HB-GRO-SEOOS-001
- RU-AI-BOS-SEOOS-001
- TP-GRO-SEOOS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial SEO OS architecture under Marketing OS CMO. |
