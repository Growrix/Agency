---
id: HB-GRO-ANALYTICS-001
title: Marketing Analytics and Experiments Handbook
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
  - AG-GRO-ANALYTICS-001
  - AG-GRO-KPI-001
  - AG-GRO-EXPERIMENT-001
dependencies:
  - ST-GRO-SCORECARD-001
  - HB-GRO-MKOS-001
related:
  - analytics
  - kpi
  - experiments
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - analytics
capabilities:
  - CAP-GRO-011
---

# Marketing Analytics and Experiments Handbook

## Purpose

Interpret marketing analytics, maintain KPI scorecards, and design ethical A/B experiments — turning data access (when available) into decisions without inventing numbers.

## Scope

Analytics interpreter, KPI scorecard agent, and experiment designer. Tracking implementation delegates to delivery; raw data export requires human access.

## Principles

1. **No fabricated metrics** — if GA4/ads data unavailable, state gap and recommend human export steps.
2. **One north-star per campaign** — secondary metrics support, not distract.
3. **Hypothesis before test** — every experiment has predicted outcome and stop rule.
4. **Scorecard discipline** — use `ST-GRO-SCORECARD-001` definitions consistently.

## Standards

### Analytics review cadence

| Window | Focus |
|--------|-------|
| 7-day | Launch sanity — tracking firing, obvious breakage |
| 30-day | Channel efficiency, creative fatigue signals |
| 90-day | CAC trend, LTV proxy, experiment portfolio review |

### Interpretation deliverables

- Traffic source breakdown (when data provided)
- Conversion funnel step rates with commentary
- Anomaly flags (bot traffic, tracking gaps)
- Recommended actions routed to relevant division

### Experiment designer template

```markdown
## Hypothesis
If we [change], then [metric] will [direction] because [reason].

## Variants
- Control:
- Treatment:

## Primary metric
## Sample / duration guidance
## Stop rules
## Implementation owner (human vs delivery)
```

### Output path

`projects/<slug>/marketing/scorecards/`, `experiments/`, `analytics-reviews/`

## Best Practices

- Snapshot scorecard CSV/markdown after each review for memory division.
- Pair experiment results with winners-losers post-mortem.
- Document UTM conventions in campaign charter for clean attribution.

## Anti-patterns

- Declaring statistical significance without sample size context
- Optimizing vanity metrics (impressions alone) on performance campaigns
- Analytics recommendations without naming responsible division for fix

## References

- ST-GRO-SCORECARD-001
- HB-GRO-ADS-001

## Related Knowledge Objects

- HB-GRO-MKT-MEMORY-001
- WF-GRO-CAMPAIGN-001
- AG-GRO-KPI-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial analytics handbook (I15 Wave 0). |
