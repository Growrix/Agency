---
id: HB-GRO-CRO-001
title: Funnels, CRO, and Pricing Handbook
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
  - AG-GRO-CRO-FUNNEL-001
  - AG-GRO-CRO-001
  - AG-GRO-PRICE-001
  - AG-GRO-MARKET-001
dependencies:
  - HB-GRO-INTEL-001
  - HB-OPS-FIN-001
  - HB-GRO-MKOS-001
related:
  - cro
  - funnel
  - pricing
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - cro
capabilities:
  - CAP-GRO-010
  - CAP-GRO-001
---

# Funnels, CRO, and Pricing Handbook

## Purpose

Design conversion funnels, landing-page CRO recommendations, and pricing/packaging tests that connect marketing traffic to revenue outcomes.

## Scope

Funnel strategist, CRO specialist, and pricing strategist. Page build and checkout implementation delegate to delivery; financial validation to human + `HB-OPS-FIN-001`.

## Principles

1. **Funnel stage clarity** — each step has one conversion event and one primary friction to fix.
2. **Measure before magnify** — baseline metrics or honest "unknown" before scaling paid traffic.
3. **Pricing is positioning** — price tests tie to value metric and ICP willingness signals.
4. **Offer specialist alignment** — `AG-GRO-MARKET-001` owns early offer one-pager; CRO division owns page-level conversion.

## Standards

### Funnel map deliverables

```text
Awareness → Lead magnet → Nurture → Sales call / Checkout → Onboard → Expand
```

Each stage: entry channel, asset, KPI, drop-off hypothesis, test backlog.

### CRO audit elements

| Element | Review |
|---------|--------|
| Hero | Clarity of promise in 5 seconds |
| CTA | Visibility, contrast, single primary action |
| Proof | Testimonials, logos, stats (verified only) |
| Form | Field count, friction, trust badges |
| Mobile | Thumb-zone CTA, readable type |
| Speed | Flag if delivery perf audit needed |

### Pricing strategist deliverables

- Packaging tiers (good/better/best) with feature gates
- Value metric definition (per seat, per site, flat fee)
- Test plan (A/B price, anchor, decoy) with ethical bounds
- Unit economics framing — CAC payback assumptions labeled

### Output path

`projects/<slug>/marketing/cro/` — `funnel-map.md`, `cro-audits/`, `pricing-tests.md`

## Best Practices

- Sync funnel maps with ads and email divisions before launch.
- Hand landing build to `@frontend-architect` with annotated wireframe notes in markdown.
- Record pricing decisions in founder memory when standing philosophy changes.

## Anti-patterns

- Dark patterns (hidden fees, fake scarcity timers agents cannot verify)
- Funnels with seven competing CTAs above the fold
- Pricing recommendations without offer clarity from intelligence division

## References

- HB-GRO-MARKET-001
- HB-OPS-FIN-001
- ST-GRO-SCORECARD-001

## Related Knowledge Objects

- HB-GRO-ADS-001
- HB-GRO-EMAIL-001
- WF-GRO-OFFER-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial CRO handbook (I15 Wave 0). |
