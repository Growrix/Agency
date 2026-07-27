---
id: HB-GRO-INTEL-001
title: Marketing Intelligence Handbook
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
  - AG-GRO-INTEL-CUST-001
  - AG-GRO-INTEL-COMP-001
dependencies:
  - HB-GRO-MKOS-001
  - HB-STR-RESEARCH-001
  - AR-GRO-MKOS-001
related:
  - intelligence
  - icp
  - competitor
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - intelligence
capabilities:
  - CAP-GRO-006
  - CAP-STR-004
---

# Marketing Intelligence Handbook

## Purpose

Guide market, customer, and competitor intelligence work that **feeds every downstream marketing division** with validated ICP, personas, journey maps, and competitive context.

## Scope

Customer research (`AG-GRO-INTEL-CUST-001`) and competitor intelligence (`AG-GRO-INTEL-COMP-001`). Deep technology research delegates to `@founder-research`.

## Principles

1. **Evidence over opinion** — cite sources, interviews, or labeled assumptions.
2. **Actionable segments** — ICP must be narrow enough to target in ads and content.
3. **Competitor ≠ caricature** — document strengths, not just weaknesses.
4. **Refresh on trigger** — new market, new offer, or quarterly review for active campaigns.

## Standards

### Customer intelligence deliverables

| Artifact | Contents |
|----------|----------|
| ICP one-pager | Firmographics/demographics, pain, budget band, buying trigger |
| Persona cards | 1–3 personas with goals, objections, channels |
| Journey map | Awareness → consideration → decision → retention touchpoints |
| VoC summary | Quotes/themes from reviews, support, sales calls (anonymized) |

### Competitor intelligence deliverables

| Artifact | Contents |
|----------|----------|
| Competitor matrix | 3–7 competitors: positioning, pricing band, channels, strengths |
| Funnel teardown | Lead magnet, landing patterns, email/signup flow (public only) |
| Message gap analysis | Whitespace for brand division |
| SEO snapshot | Top keywords/clusters if public data available — detail to SEO agents |

### Output location

`projects/<slug>/marketing/intelligence/` — `icp.md`, `personas/`, `competitors.md`, `journey-map.md`

## Best Practices

- Start from founder research brief when it exists — extend, don't duplicate.
- Tag intelligence records `type: marketing` in founder memory when promoted to standing ICP.
- Flag legal/regulatory constraints for regulated industries early.

## Anti-patterns

- Generic "small business owners" ICP with no pain specificity
- Scraping login-walled competitor data
- Intelligence reports with no "so what" for content or ads divisions

## References

- HB-STR-RESEARCH-001
- HB-GRO-BRAND-001

## Related Knowledge Objects

- AR-GRO-MKOS-001
- HB-GRO-CONTENT-001
- HB-GRO-ADS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial intelligence handbook (I15 Wave 0). |
