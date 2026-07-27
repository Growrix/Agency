---
id: WF-GRO-CAMPAIGN-001
title: Marketing Campaign Lifecycle Workflow
type: workflow
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
  - AG-GRO-CMO-001
dependencies:
  - AR-GRO-MKOS-001
  - HB-GRO-MKOS-001
  - ST-GRO-SCORECARD-001
  - ST-GRO-MKT-MEMORY-001
related:
  - campaign
  - lifecycle
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - workflow
  - marketing
  - campaign
capabilities:
  - CAP-GRO-002
  - CAP-GRO-011
---

# Marketing Campaign Lifecycle Workflow

## Purpose

Encode the **end-to-end campaign lifecycle** from founder handoff through post-mortem — the default operating rhythm for `AG-GRO-CMO-001`.

## Scope

Standard campaigns (always-on or time-boxed). Product GTM launches also reference `WF-GRO-LAUNCH-001` for day-0 sequencing.

## Principles

1. **Charter first** — no division work without campaign id and charter on disk.
2. **Gates are sequential** — intelligence → brand → assets → channels → measure → learn.
3. **Human executes externals** — agents stop at checklists for spend and publish.
4. **Close the loop** — memory division owns post-mortem before campaign marked ended.

## Standards

### Lifecycle phases

```text
PHASE 0 — INTAKE
  Founder handoff → CMO accepts → init marketing/ tree → campaign-id assigned

PHASE 1 — PLAN
  Intelligence + brand → charter.md + brief.md + scorecard targets

PHASE 2 — BUILD
  Content, creative, CRO, email, social drafts → brand guardian pass

PHASE 3 — PRE-LAUNCH
  Ads plan + tracking checklist → human implements pixels/DNS/landing (delivery)
  Scorecard snapshot (baseline)

PHASE 4 — LAUNCH
  Human publishes/sends/spends per Bangla checklists
  7-day analytics review → division fixes

PHASE 5 — OPTIMIZE
  30-day review → experiments backlog → creative refresh if fatigue

PHASE 6 — CLOSE
  90-day or end-date review → winner/loser post-mortem → asset library update
  meta.json active_campaign_id cleared
```

### Phase owners

| Phase | Lead |
|-------|------|
| 0–1 | AG-GRO-CMO-001 |
| 2 | Division specialists |
| 3 | CMO + delivery + human |
| 4–5 | AG-GRO-ANALYTICS-001 + relevant divisions |
| 6 | AG-GRO-MKT-MEMORY-001 |

### Required artifacts per phase

| Phase | Disk outputs |
|-------|--------------|
| 0 | `marketing/meta.json`, `campaigns/<id>/charter.md` |
| 1 | intelligence + brand folders populated, scorecard targets |
| 2 | channel folders populated, guardian review |
| 3 | launch checklists, tracking verification notes |
| 4–5 | scorecard snapshots, experiment logs |
| 6 | `winners-losers/<id>.md`, assets index update |

## Best Practices

- Use single campaign id format: `camp-YYYYMMDD-slug-keyword`
- Pause Phase 4 if tracking verification fails — fix before scaling spend.
- Route sales-ready leads to `@founder-sales` at Phase 4 with funnel context.

## Anti-patterns

- Skipping Phase 1 intelligence on "small" campaigns
- Multiple concurrent launches without human approval
- Ending campaign without post-mortem file

## References

- AR-GRO-MKOS-001
- WF-GRO-LAUNCH-001
- RU-AI-BOS-MKOS-001

## Related Knowledge Objects

- HB-GRO-MKT-MEMORY-001
- ST-GRO-CLAIMS-001
- TP-GRO-MKOS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial campaign lifecycle workflow (I15 Wave 0). |
