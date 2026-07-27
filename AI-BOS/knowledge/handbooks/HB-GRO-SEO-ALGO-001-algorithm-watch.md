---
id: HB-GRO-SEO-ALGO-001
title: Algorithm Watch and Continuous SEO Improvement Handbook
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
  - AG-GRO-SEO-ALGO-001
dependencies:
  - HB-GRO-SEO-001
  - HB-GRO-SEO-GEO-001
  - HB-GRO-SEOOS-001
related:
  - algorithm-watch
  - continuous-improvement
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - seo
  - algorithm
capabilities:
  - CAP-GRO-003
  - CAP-GRO-014
---

# Algorithm Watch and Continuous SEO Improvement Handbook

## Purpose

Guide **algorithm monitoring, ranking volatility response, and continuous SEO improvement** — Google core updates, AI search evolution, and data-driven recommendation cycles.

## Scope

Update monitoring, volatility analysis, improvement recommendations. Does **not** guarantee recovery from penalties; produces evidence-based action plans for SEO Lead to assign.

## Principles

1. **Observe before reacting** — confirm volatility is site-specific, not industry-wide noise.
2. **Separate correlation from causation** — document assumptions in every recommendation.
3. **AI search is first-class** — track GEO visibility alongside traditional rankings.
4. **Feed memory** — every major update logged in `algorithm-log/` for future reference.

## Standards

### Monitoring sources

| Source | Frequency | Human gate |
|--------|-----------|------------|
| Google Search Status Dashboard | On announced updates | Human confirms impact |
| Search Console performance delta | Weekly | Human exports or shares data |
| Ranking tracker (if available) | Weekly | Human provides access |
| AI visibility prompts (GEO) | Monthly | Human runs test prompts |
| Industry SEO news | As needed | WebSearch / WebFetch |

### Volatility response playbook

1. **Detect** — traffic/ranking delta vs 28-day baseline
2. **Classify** — technical, content, link, or algorithm-wide
3. **Correlate** — map to recent deploys, content changes, or known updates
4. **Recommend** — prioritized actions with expected impact (hypothesis)
5. **Assign** — route to technical, on-page, off-page, or GEO specialist
6. **Log** — write to `algorithm-log/<date>-<event>.md`

### Deliverables

| Artifact | Content |
|----------|---------|
| Update brief | What changed, suspected impact, sources |
| Volatility report | Winners/losers pages or queries |
| Recommendation memo | Prioritized actions for SEO Lead |
| Monthly improvement plan | Top 5 SEO initiatives for next 30 days |

### Output path

`projects/<slug>/marketing/seo/algorithm-log/` — event logs and recommendation memos

## Best Practices

- Cross-reference algorithm events with `@mkt-seo-geo` for AI search shifts.
- Avoid panic changes within 72h of major updates — wait for data stabilization.
- Update SEO scorecard after confirmed impact.

## Anti-patterns

- Blaming every traffic drop on "algorithm update" without evidence
- Recommending disavow without toxic link analysis
- Guaranteeing recovery timelines

## References

- HB-GRO-SEO-GEO-001
- ST-GRO-SEO-SCORECARD-001
- WF-GRO-SEO-PROGRAM-001

## Related Knowledge Objects

- HB-GRO-SEOOS-001
- AR-GRO-SEOOS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial algorithm watch handbook. |
