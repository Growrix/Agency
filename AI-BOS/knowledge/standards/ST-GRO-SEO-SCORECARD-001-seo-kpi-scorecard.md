---
id: ST-GRO-SEO-SCORECARD-001
title: SEO KPI Scorecard Standard
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
  - AG-GRO-SEO-LEAD-001
  - AG-GRO-ANALYTICS-001
dependencies:
  - ST-GRO-SCORECARD-001
  - HB-GRO-SEOOS-001
related:
  - seo-scorecard
  - kpi
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - standard
  - seo
  - kpi
capabilities:
  - CAP-GRO-016
  - CAP-GRO-003
  - CAP-GRO-011
---

# SEO KPI Scorecard Standard

## Purpose

Define **SEO-specific KPIs** that prioritize business outcomes over vanity metrics. Every SEO program names a primary KPI before launch recommendation.

## Standards

### Primary SEO KPIs (choose one per program)

| KPI | Definition | Source |
|-----|------------|--------|
| Organic sessions | Non-paid search visits | GA4 (human export) |
| Organic conversions | Goal completions from organic | GA4 |
| Indexed pages | Count of valid indexed URLs | Search Console |
| Keyword visibility | Weighted impression share for target cluster | Search Console / rank tracker |
| AI citation rate | Brand mention in manual AI prompt tests | Human-run GEO audit |
| Core Web Vitals pass rate | % URLs passing CWV thresholds | Lighthouse / CrUX |

### Secondary metrics

- Click-through rate (CTR) by query cluster
- Average position (target keywords only — not sitewide vanity)
- Referring domains (quality over quantity)
- Crawl errors resolved / open
- Rich result eligibility

### Scorecard template

Store at `projects/<slug>/marketing/seo/scorecards/<YYYY-MM>.md`:

```markdown
# SEO Scorecard — <slug> — <month>

**Primary KPI:** <name>
**Baseline:** <value> (<date>)
**Current:** <value> (<date>)
**Target:** <value> (<deadline>)

## Metrics
| Metric | Baseline | Current | Target |
|--------|----------|---------|--------|

## Notes
- Data source and human who provided export
- Hypotheses for delta
```

### Rules

- Never fabricate metric values — use "unknown" until human provides data
- Distinguish facts from hypotheses in scorecard notes
- Review cadence: monthly minimum during active programs

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial SEO KPI scorecard standard. |
