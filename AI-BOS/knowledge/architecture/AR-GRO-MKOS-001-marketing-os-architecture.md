---
id: AR-GRO-MKOS-001
title: Marketing OS Architecture
type: architecture
category: growth
domain: ai-bos
version: 1.1.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-GRO-CMO-001
  - AG-STR-FOUNDER-001
dependencies:
  - AR-AI-BOS-004
  - AR-AI-BOS-007
  - AR-AI-BOS-011
  - HB-GRO-MKOS-001
  - RU-AI-BOS-MKOS-001
related:
  - marketing-os
  - cmo
  - growth
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - architecture
  - marketing
  - mktos
capabilities:
  - CAP-GRO-002
  - CAP-GRO-006
  - CAP-GRO-007
  - CAP-GRO-008
  - CAP-GRO-009
  - CAP-GRO-010
  - CAP-GRO-011
  - CAP-GRO-012
  - CAP-GRO-013
  - CAP-GRO-014
  - CAP-GRO-015
---

# Marketing OS Architecture

## Purpose

Define the **Marketing Operating System (Marketing OS)** — a CMO-led, 15-division advisory layer that coordinates all growth marketing work for Growrixos client and product initiatives without writing product code or spending ad budget.

## Scope

Architecture for `PRJ-GRO-MKOS-001`, agent routing, operating modes, human gates, memory, and handoffs from Founder OS. Does **not** define vault runtime projections (those follow `RU-AI-BOS-VAULT-001`).

## Principles

1. **CMO executive owns routing** — `AG-GRO-CMO-001` is the single marketing entry point; specialists never bypass the CMO for cross-division work.
2. **Advisory only** — Marketing OS produces strategy, briefs, copy, calendars, and human action checklists; implementation lives in delivery lanes.
3. **Two operating modes** — client-mode (agency deliverables for a named client) vs product-mode (Growrixos or owned digital products).
4. **Human gates for irreversible actions** — ad spend, account creation, publishing, DNS, and payment require explicit human approval with Bangla step-by-step instructions.
5. **Disk is SSOT** — campaign artifacts live under `projects/<slug>/marketing/` per `ST-GRO-MKT-MEMORY-001`; chat is never canonical.
6. **Founder hands off, CMO orchestrates** — business context arrives from `AG-STR-FOUNDER-001`; Marketing OS does not re-do business architecture.

## Standards

### Executive layer

| Property | Value |
|----------|-------|
| Project | `PRJ-GRO-MKOS-001` |
| Executive agent | `AG-GRO-CMO-001` |
| Primary handbook | `HB-GRO-MKOS-001` |
| Binding rule | `RU-AI-BOS-MKOS-001` |
| Default workflow | `WF-GRO-CAMPAIGN-001` |

### Fifteen divisions

| # | Division | Handbook | Primary capability | Lead agents |
|---|----------|----------|-------------------|-------------|
| 1 | CMO Executive | HB-GRO-MKOS-001 | CAP-GRO-002 | AG-GRO-CMO-001 |
| 2 | Universal Rules | HB-GRO-UNIVERSAL-001 | CAP-GRO-002 | All marketing agents |
| 3 | Intelligence | HB-GRO-INTEL-001 | CAP-GRO-006, CAP-STR-004 | AG-GRO-INTEL-CUST-001, AG-GRO-INTEL-COMP-001 |
| 4 | Brand | HB-GRO-BRAND-001 | CAP-GRO-006 | AG-GRO-BRAND-001, AG-GRO-BRAND-GUARD-001 |
| 5 | Content | HB-GRO-CONTENT-001 | CAP-GRO-007 | AG-GRO-CONTENT-STRAT-001, AG-GRO-COPY-001, AG-GRO-BLOG-001 |
| 6 | SEO / GEO | HB-GRO-SEOOS-001, HB-GRO-SEO-GEO-001 | CAP-GRO-016, CAP-GRO-014, CAP-GRO-003 | AG-GRO-SEO-LEAD-001, AG-GRO-SEO-GEO-001, AG-GRO-SEO-KW-001 |
| 7 | Social | HB-GRO-SOCIAL-001 | CAP-GRO-004 | AG-GRO-SOCIAL-MGR-001, AG-GRO-SOCIAL-WRITE-001 |
| 8 | Paid Ads | HB-GRO-ADS-001 | CAP-GRO-008 | AG-GRO-ADS-PPC-001, AG-GRO-ADS-META-001 |
| 9 | Email | HB-GRO-EMAIL-001 | CAP-GRO-009 | AG-GRO-EMAIL-STRAT-001, AG-GRO-EMAIL-NEWS-001 |
| 10 | CRO & Pricing | HB-GRO-CRO-001 | CAP-GRO-010 | AG-GRO-CRO-FUNNEL-001, AG-GRO-PRICE-001 |
| 11 | Analytics | HB-GRO-ANALYTICS-001 | CAP-GRO-011 | AG-GRO-ANALYTICS-001, AG-GRO-EXPERIMENT-001 |
| 12 | Creative | HB-GRO-CREATIVE-001 | CAP-GRO-012 | AG-GRO-CREATIVE-DIR-001, AG-GRO-PROMPT-CREATIVE-001 |
| 13 | Video | HB-GRO-VIDEO-001 | CAP-GRO-012 | AG-GRO-VIDEO-STRAT-001, AG-GRO-VIDEO-SCRIPT-001 |
| 14 | Community | HB-GRO-COMMUNITY-001 | CAP-GRO-013 | AG-GRO-COMMUNITY-001, AG-GRO-REPUTATION-001 |
| 15 | Marketing Memory | HB-GRO-MKT-MEMORY-001 | CAP-GRO-015 | AG-GRO-MKT-MEMORY-001, AG-GRO-ASSET-LIB-001 |

Offer/funnel specialist `HB-GRO-MARKET-001` reports to CMO for early-stage offer design before full campaign orchestration.

### Client-mode vs product-mode

| Mode | Trigger | Memory root | Typical outputs |
|------|---------|-------------|-----------------|
| **Client-mode** | Named client engagement, agency deliverable | `projects/<client-slug>/marketing/` | Campaign briefs, ad copy, client-facing calendars |
| **Product-mode** | Growrixos SaaS, templates, or owned digital products | `projects/<product-slug>/marketing/` | GTM plans, launch sequences, product messaging |

Both modes share the same division structure; client-mode adds brand-guardian review and claims compliance (`ST-GRO-CLAIMS-001`) before external delivery.

### Human gates (mandatory pause)

| Action | Gate | Agent responsibility |
|--------|------|---------------------|
| Create ad account / pixel | Human | Provide platform URLs and field-by-field Bangla checklist |
| Set daily budget / launch ads | Human | Draft structure; human confirms spend |
| Publish to social / send email blast | Human | Deliver ready copy + schedule recommendation |
| DNS / tracking / consent banner | Human → delivery | Hand off to `@frontend-architect` or `@senior-saas-developer` |
| Claims about results or compliance | Human | Flag per `ST-GRO-CLAIMS-001`; no invented metrics |

### Memory architecture

Marketing memory extends founder project memory — not a replacement:

```text
projects/<slug>/marketing/
├── campaigns/           # One folder per campaign id
├── assets/              # Copy, briefs, creative refs (no secrets)
├── scorecards/          # KPI snapshots per ST-GRO-SCORECARD-001
├── experiments/         # A/B logs
├── winners-losers/      # Post-mortems
└── meta.json            # Links to PRJ-*, active campaign pointer
```

Curated rollups sync to founder memory records with `type: marketing`.

### Handoffs from Founder OS

```text
Founder intake (offer validated)
  → AG-GRO-CMO-001 (if full marketing scope)
  → OR AG-GRO-MARKET-001 (offer/funnel only, then escalate to CMO)
  → Division specialists per WF-GRO-CAMPAIGN-001
  → Delivery (@frontend-architect, @frontend-content-strategist, SEO agents)
  → Sales (@founder-sales) when pipeline ready
```

Founder OS must pass: ICP summary, offer one-pager, project slug, client vs product mode, and budget band (if known).

## Best Practices

- Start every initiative with intelligence + brand before content or ads.
- Run brand-guardian pass before any client-facing export.
- Tie every campaign to a scorecard row before launch (`ST-GRO-SCORECARD-001`).
- Archive losers with lessons — memory division owns the post-mortem template.

## Anti-patterns

- Specialists talking directly to delivery without CMO routing on multi-division campaigns.
- Inventing GA4/ROAS numbers when analytics access is missing.
- Storing ad account credentials in marketing memory folders.
- Treating Marketing OS as a code lane — all implementation delegates out.
- Skipping Founder handoff context and re-deriving ICP from scratch.

## References

- AR-AI-BOS-004 — Capability model (CAP-GRO-006–015)
- AR-AI-BOS-007 — Agent architecture
- ST-GRO-MKT-MEMORY-001 — Marketing folder layout
- RU-AI-BOS-FOUNDER-001 — Founder → CMO handoff

## Related Knowledge Objects

- HB-GRO-MKOS-001 — CMO operating handbook
- RU-AI-BOS-MKOS-001 — Marketing lane binding
- WF-GRO-CAMPAIGN-001 — Campaign lifecycle
- WF-GRO-LAUNCH-001 — GTM launch workflow
- TP-GRO-MKOS-001 — Project template

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial Marketing OS architecture (I15 Wave 0). |
| 1.1.0 | 2026-07-18 | I16 — SEO OS sub-department with AG-GRO-SEO-LEAD-001. |
