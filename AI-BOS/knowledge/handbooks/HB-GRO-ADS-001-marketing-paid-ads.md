---
id: HB-GRO-ADS-001
title: Paid Acquisition Handbook
type: handbook
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
  - AG-GRO-ADS-PPC-001
  - AG-GRO-ADS-META-001
  - AG-GRO-ADS-LI-001
  - AG-GRO-ADS-RETARGET-001
dependencies:
  - HB-GRO-CRO-001
  - HB-GRO-CREATIVE-001
  - ST-GRO-SCORECARD-001
  - ST-GRO-CLAIMS-001
related:
  - paid-ads
  - ppc
  - meta
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - ads
capabilities:
  - CAP-GRO-008
---

# Paid Acquisition Handbook

## Purpose

Plan paid acquisition across search, social, and retargeting channels — structure, audiences, creative briefs, and budget framing **without spending money or accessing ad accounts**.

## Scope

PPC, Meta, LinkedIn, and retargeting strategists. Account setup, pixel install, and live campaign management are human-gated external actions.

## Principles

1. **Structure before scale** — campaign/ad group/ad hierarchy documented before launch checklist.
2. **Landing-page fit** — no cold traffic to weak pages; CRO division sign-off recommended.
3. **Test hierarchy** — offer → audience → creative → bid strategy.
4. **ROAS honesty** — project targets from scorecard; report when actuals unavailable.

## Standards

### Universal ad plan sections

1. Objective (awareness, leads, sales)
2. Audience definition + exclusions
3. Offer and landing URL
4. Creative angles (3+) with brief refs
5. Budget band and flight dates
6. Primary KPI (CPL, CPA, ROAS)
7. Human launch checklist (Bangla)

### Channel specifics

| Channel | Agent | Focus |
|---------|-------|-------|
| Google Ads | AG-GRO-ADS-PPC-001 | Search, PMax, display structure, negative keyword themes |
| Meta | AG-GRO-ADS-META-001 | TOF/MOF/BOF ad sets, creative variants, pixel events list |
| LinkedIn | AG-GRO-ADS-LI-001 | Job title/seniority targeting, lead gen form vs landing |
| Retargeting | AG-GRO-ADS-RETARGET-001 | Window tiers (7/30/90d), frequency caps, sequential messaging |

### Deliverable path

`projects/<slug>/marketing/ads/` — `<channel>-plan.md`, `audiences.md`, `creative-briefs/`, `launch-checklist.md`

## Best Practices

- Name campaigns with slug + date + objective for analytics alignment.
- Pair retargeting plans with email division nurture sequences.
- Document conversion events human must create in ad platform UI.

## Anti-patterns

- Agents recommending specific dollar bids without account access
- Launch plans missing landing page URL or thank-you event
- Guaranteed ROAS or lead volume claims

## References

- ST-GRO-SCORECARD-001
- ST-GRO-CLAIMS-001
- HB-GRO-ANALYTICS-001

## Related Knowledge Objects

- HB-GRO-CREATIVE-001
- HB-GRO-CRO-001
- WF-GRO-CAMPAIGN-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial paid ads handbook (I15 Wave 0). |
