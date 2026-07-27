---
id: ST-GRO-MKT-MEMORY-001
title: Marketing Memory Folder Layout Standard
type: standard
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
  - AG-GRO-MKT-MEMORY-001
  - AG-GRO-ASSET-LIB-001
dependencies:
  - ST-STR-MEMORY-001
  - AR-GRO-MKOS-001
  - HB-GRO-MKT-MEMORY-001
related:
  - marketing-memory
  - folder-layout
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - standard
  - marketing
  - memory
capabilities:
  - CAP-GRO-015
  - CAP-KNW-007
---

# Marketing Memory Folder Layout Standard

## Purpose

Define the **`marketing/` folder** under each founder project slug — canonical paths for campaigns, assets, scorecards, and post-mortems used by all Marketing OS agents.

## Scope

Runtime layout under `.cursor/brain/founder-os-memory/projects/<slug>/marketing/`. Complements `ST-STR-MEMORY-001` project tier; does not replace AI-BOS knowledge registry.

## Principles

1. **One marketing root per project slug** — never scatter campaign files across unrelated dirs.
2. **Campaign-id prefix** — folder and file names include stable campaign id for grep and handoffs.
3. **Index file required** — `assets/index.json` maintained by asset library agent.
4. **No secrets** — credentials, API keys, and payment details forbidden in marketing tree.

## Standards

### Folder structure

```text
.cursor/brain/founder-os-memory/projects/<slug>/marketing/
├── meta.json                 # PRJ link, mode, active campaign pointer
├── intelligence/             # ICP, personas, competitors
├── brand/                    # Messaging house, tone, guardian reviews
├── content/                  # Pillars, calendar, copy, blogs
├── seo-geo/                  # Keywords, entity map, GEO playbook
├── social/                   # Strategy, posts, calendars
├── ads/                      # Channel plans, audiences, launch checklists
├── email/                    # Lifecycle, sequences, newsletters
├── cro/                      # Funnel maps, audits, pricing tests
├── creative/                 # Briefs, prompts, platform
├── video/                    # Strategy, scripts
├── community/                # Engagement + reputation plans
├── campaigns/
│   └── <campaign-id>/
│       ├── charter.md
│       ├── brief.md
│       └── timeline.md
├── scorecards/               # KPI snapshots per ST-GRO-SCORECARD-001
├── experiments/              # A/B logs
├── winners-losers/           # Post-mortems
└── assets/
    ├── index.json
    └── templates/            # Reusable approved snippets
```

### meta.json minimum shape

```json
{
  "project_slug": "<slug>",
  "prj_id": "PRJ-GRO-MKOS-001",
  "mode": "client|product",
  "active_campaign_id": null,
  "brand_version": "1.0.0",
  "updated": "2026-07-18"
}
```

### Write classification

| Content type | Target subfolder |
|--------------|------------------|
| New campaign | `campaigns/<campaign-id>/` + update meta pointer |
| Approved reusable copy | `assets/templates/` + index entry |
| Ended campaign | `winners-losers/<campaign-id>.md` |

### Sync to founder memory

After material writes, create project memory record:

```json
{
  "type": "marketing",
  "scope": "project",
  "project_slug": "<slug>",
  "summary": "One-line campaign or artifact summary",
  "refs": ["projects/<slug>/marketing/..."]
}
```

## Best Practices

- Initialize `marketing/` tree when CMO accepts founder handoff.
- Archive entire `campaigns/<id>/` to winners-losers summary, not delete.
- Keep `assets/index.json` sorted by `updated` desc for fast session load.

## Anti-patterns

- Storing marketing artifacts only in chat logs
- Mixing delivery code repos with marketing memory paths
- Empty `meta.json` or missing `mode` on client engagements

## References

- ST-STR-MEMORY-001
- HB-GRO-MKT-MEMORY-001
- AR-GRO-MKOS-001

## Related Knowledge Objects

- RU-AI-BOS-MKOS-001
- ST-GRO-SCORECARD-001
- TP-GRO-MKOS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial marketing memory layout (I15 Wave 0). |
