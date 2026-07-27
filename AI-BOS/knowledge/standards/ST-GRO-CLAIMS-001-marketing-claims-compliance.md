---
id: ST-GRO-CLAIMS-001
title: Marketing Claims Compliance Standard
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
  - AG-GRO-BRAND-GUARD-001
  - AG-GRO-COPY-001
dependencies:
  - HB-GRO-UNIVERSAL-001
  - HB-GRO-BRAND-001
related:
  - claims
  - compliance
  - advertising
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - standard
  - marketing
  - compliance
capabilities:
  - CAP-GRO-002
  - CAP-OPS-003
---

# Marketing Claims Compliance Standard

## Purpose

Prevent false, unsubstantiated, or risky claims in marketing copy — ads, email, social, and landing pages — across client and product modes.

## Scope

All external-facing marketing artifacts before human publish. Legal review for regulated industries is always a human gate.

## Principles

1. **Prove or soften** — superlatives require cited proof or qualify down.
2. **No guaranteed outcomes** — especially ROI, rankings, weight loss, income.
3. **Testimonial integrity** — real persons, disclosed relationships, no composites presented as real.
4. **Platform policy awareness** — flag categories restricted by ad platforms (health, finance, politics).

## Standards

### Prohibited without human legal approval

- Guaranteed results ("10x revenue in 30 days guaranteed")
- Medical/health cure claims
- Unregistered investment advice promises
- Misleading before/after imagery descriptions
- Fake urgency (countdown for evergreen offer presented as live)

### Required checks (copy checklist)

- [ ] Every statistic has source or "internal estimate" label
- [ ] "Best", "#1", "leading" have substantiation or removed
- [ ] Testimonials marked illustrative if fictional
- [ ] Pricing and fees match offer one-pager
- [ ] Competitor comparisons factual and non-disparaging
- [ ] Affiliate/sponsored content disclosed where applicable

### Risk tiers

| Tier | Action |
|------|--------|
| Low | Brand guardian self-check |
| Medium | CMO review + human ack |
| High | Human legal/compliance before export |

Document tier in `brand/reviews/` or campaign charter.

## Best Practices

- Maintain `claims-proof/` folder linking stats to source URLs or study names.
- When unsure, use benefit language instead of outcome guarantees.
- Client-mode: ask human for approved proof points list before copy sprint.

## Anti-patterns

- Invented client logos or "as seen in" press lines
- Cherry-picked metrics without time window
- AI-generated fake testimonials

## References

- HB-GRO-BRAND-001
- HB-GRO-ADS-001
- CAP-OPS-003

## Related Knowledge Objects

- HB-GRO-UNIVERSAL-001
- RU-AI-BOS-MKOS-001
- HB-GRO-COMMUNITY-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial claims compliance standard (I15 Wave 0). |
