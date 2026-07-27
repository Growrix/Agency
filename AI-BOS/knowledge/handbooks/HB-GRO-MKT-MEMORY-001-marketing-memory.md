---
id: HB-GRO-MKT-MEMORY-001
title: Campaign Memory and Asset Library Handbook
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
  - AG-GRO-MKT-MEMORY-001
  - AG-GRO-ASSET-LIB-001
  - AG-GRO-CMO-001
dependencies:
  - ST-GRO-MKT-MEMORY-001
  - ST-STR-MEMORY-001
  - HB-GRO-MKOS-001
related:
  - marketing-memory
  - asset-library
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - memory
capabilities:
  - CAP-GRO-015
  - CAP-KNW-007
---

# Campaign Memory and Asset Library Handbook

## Purpose

Curate **campaign history, winners/losers, lessons learned, and a searchable asset index** so Marketing OS compounds knowledge across engagements.

## Scope

Marketing memory curator and asset library manager. Founder personal memory (`ST-STR-MEMORY-001`) receives rollups; this handbook owns marketing-specific depth.

## Principles

1. **Post-mortems are mandatory** — every ended campaign gets winner or loser record.
2. **Index, don't hoard** — asset library entries point to paths and metadata, not duplicate blobs.
3. **Promote patterns** — repeating winners become templates in asset library.
4. **No secrets in index** — ad account ids ok; passwords never.

## Standards

### Winner record template

```markdown
## Campaign id
## Objective / KPI result (actual or "unknown")
## What worked
## Reusable assets (paths)
## Recommended repeat conditions
```

### Loser record template

```markdown
## Campaign id
## Hypothesis
## What failed
## Root cause hypothesis
## Do-not-repeat rules
```

### Asset library index fields

| Field | Description |
|-------|-------------|
| asset_id | Stable slug |
| type | copy, brief, creative, scorecard, template |
| campaign_id | Source campaign |
| channel | e.g. meta, email, blog |
| status | draft, approved, retired |
| path | Relative path under marketing/ |
| tags | Search tags |

### Curator cadence

- End of campaign: post-mortem within 5 business days of human-declared end
- Monthly: prune retired assets, update index
- Quarterly: cross-campaign pattern summary for CMO

### Output path

`projects/<slug>/marketing/winners-losers/`, `assets/index.json`, `assets/templates/`

## Best Practices

- Mirror one-line summary to founder project memory `type: marketing`.
- Link scorecard snapshots in winner records when available.
- Version templates when offer changes (`offer-v2-email-welcome`).

## Anti-patterns

- Campaign folders with no meta or scorecard link
- Asset library entries pointing to chat-only content
- Deleting loser records — archive with lessons

## References

- ST-GRO-MKT-MEMORY-001
- ST-GRO-SCORECARD-001

## Related Knowledge Objects

- HB-GRO-ANALYTICS-001
- AR-GRO-MKOS-001
- WF-GRO-CAMPAIGN-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial marketing memory handbook (I15 Wave 0). |
