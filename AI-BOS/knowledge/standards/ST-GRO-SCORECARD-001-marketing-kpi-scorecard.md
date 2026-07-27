---
id: ST-GRO-SCORECARD-001
title: Marketing KPI Scorecard Standard
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
  - AG-GRO-KPI-001
  - AG-GRO-ANALYTICS-001
  - AG-GRO-CMO-001
dependencies:
  - HB-GRO-ANALYTICS-001
  - AR-GRO-MKOS-001
related:
  - kpi
  - cac
  - ltv
  - roas
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - standard
  - marketing
  - scorecard
capabilities:
  - CAP-GRO-011
---

# Marketing KPI Scorecard Standard

## Purpose

Define **consistent KPI definitions and scorecard format** for Marketing OS — CAC, LTV, ROAS, CPL, and supporting metrics — so analytics and CMO reviews use comparable numbers.

## Scope

Scorecard authoring and interpretation. Financial sign-off on targets remains human + `HB-OPS-FIN-001`.

## Principles

1. **Define before measure** — every metric has formula, source, and cadence documented.
2. **Actuals vs targets** — separate columns; never merge invented actuals.
3. **Unit economics honesty** — LTV may be modeled with labeled assumptions until CRM data exists.
4. **One primary KPI per campaign** — scorecard supports but does not dilute focus.

## Standards

### Core metric definitions

| Metric | Definition | Typical source |
|--------|------------|----------------|
| **CPL** | Ad spend ÷ leads in period | Ad platform + CRM |
| **CAC** | Total sales+marketing cost ÷ new customers in period | Finance + CRM |
| **LTV** | Gross profit per customer × avg lifetime (or subscription months × ARPU × margin) | CRM / modeled |
| **LTV:CAC** | LTV ÷ CAC | Derived |
| **ROAS** | Revenue attributed ÷ ad spend | Ads + analytics |
| **CPA** | Spend ÷ conversions (purchase or qualified action) | Ads + analytics |
| **MER** | Total revenue ÷ total marketing spend (blended) | Finance |
| **Payback period** | CAC ÷ monthly gross profit per customer | Derived |

When data unavailable, mark `actual: null` and `status: awaiting_human_export`.

### Scorecard file format

Path: `projects/<slug>/marketing/scorecards/<campaign-id>-<YYYY-MM-DD>.md`

```markdown
# Scorecard — <campaign-id>

| Metric | Target | Actual | Source | Notes |
|--------|--------|--------|--------|-------|
| Primary KPI (CPL) | | | | |
| ROAS | | | | |
| Spend | | | | |

## Assumptions
## Actions recommended
```

### Campaign binding

Every `campaigns/<id>/charter.md` must name:

- Primary KPI (one)
- Target value or band
- Review dates (7d / 30d / 90d)

## Best Practices

- Snapshot scorecard at launch, +7d, +30d, end.
- Attach scorecard path in winner/loser post-mortem.
- Use same currency and timezone notes across exports.

## Anti-patterns

- Reporting ROAS without attribution window stated
- Treating modeled LTV as audited finance fact
- Changing metric definitions mid-campaign without version note

## References

- HB-GRO-ANALYTICS-001
- HB-GRO-ADS-001
- HB-OPS-FIN-001

## Related Knowledge Objects

- ST-GRO-MKT-MEMORY-001
- WF-GRO-CAMPAIGN-001
- HB-GRO-MKT-MEMORY-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial KPI scorecard standard (I15 Wave 0). |
