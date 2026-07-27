---
id: HB-GRO-SEO-INTL-001
title: International SEO Handbook
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
  - AG-GRO-SEO-INTL-001
dependencies:
  - HB-GRO-SEO-001
  - HB-GRO-SEOOS-001
  - AR-GRO-SEOOS-001
related:
  - international-seo
  - hreflang
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - seo
  - international
capabilities:
  - CAP-GRO-003
---

# International SEO Handbook

## Purpose

Guide **international and multi-region SEO** — hreflang, country targeting, localization strategy, and cross-market content architecture.

## Scope

Hreflang mapping, localization recommendations, country/market SEO strategy. Technical implementation remains with `AG-GRO-SEO-TECH-001`; on-page localization with `AG-GRO-SEO-ON-001`.

## Principles

1. **One URL per locale intent** — avoid duplicate content across markets without proper hreflang.
2. **Localization over translation** — adapt messaging, not just language swap.
3. **Document risks** — hreflang errors can harm indexation; always note rollback plan.
4. **Human deploys DNS and hreflang** — agent produces maps and checklists only.

## Standards

### Deliverables

| Artifact | Content |
|----------|---------|
| Market map | Target countries, languages, priority order |
| Hreflang map | URL pairs, x-default, implementation notes |
| Localization brief | Per-locale content gaps and cultural adaptations |
| Country SEO plan | Local keywords, competitors, directory opportunities |

### Hreflang checklist

- [ ] Each locale URL is self-referencing
- [ ] x-default defined for global fallback
- [ ] Reciprocal hreflang tags planned
- [ ] Canonical alignment documented
- [ ] Sitemap per locale or hreflang in sitemap noted

### Output path

`projects/<slug>/marketing/seo/international/` — `market-map.md`, `hreflang-map.md`, `localization-brief.md`

## Best Practices

- Start with 1–2 priority markets before expanding.
- Pair hreflang work with `@mkt-seo-keyword` for locale-specific clusters.
- Coordinate with `@mkt-brand-guardian` on localized messaging.

## Anti-patterns

- Machine-translated pages without human review
- hreflang on query-parameter URLs without canonical strategy
- Launching all markets simultaneously without phased rollout

## References

- HB-GRO-SEO-001
- universal/seo/technical-seo/

## Related Knowledge Objects

- HB-GRO-SEOOS-001
- AR-GRO-SEOOS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial international SEO handbook. |
