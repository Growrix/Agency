---
id: HB-GRO-EMAIL-001
title: Email Lifecycle Marketing Handbook
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
  - AG-GRO-EMAIL-STRAT-001
  - AG-GRO-EMAIL-NEWS-001
  - AG-GRO-EMAIL-DELIV-001
dependencies:
  - HB-GRO-CRO-001
  - HB-GRO-CONTENT-001
  - HB-GRO-MKOS-001
related:
  - email
  - lifecycle
  - newsletter
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - marketing
  - email
capabilities:
  - CAP-GRO-009
---

# Email Lifecycle Marketing Handbook

## Purpose

Design email lifecycle programs — welcome, nurture, launch, win-back, and newsletter systems — with deliverability guidance and human-gated send execution.

## Scope

Email strategist, newsletter writer, and deliverability advisor. ESP integration and automation build delegate to `@founder-automation` or delivery when technical.

## Principles

1. **Permission-first** — only strategies compliant with opt-in/consent assumptions stated explicitly.
2. **One job per email** — single primary CTA unless transactional.
3. **Sequence logic** — triggers, delays, and exit conditions documented.
4. **Deliverability is infrastructure** — SPF/DKIM/DMARC guidance before scale sends.

## Standards

### Lifecycle map (baseline)

| Stage | Trigger | Emails | Goal |
|-------|---------|--------|------|
| Welcome | Opt-in | 1–3 | Deliver lead magnet, set expectations |
| Nurture | Tag/behavior | 5–7 | Educate, proof, soft offer |
| Launch | Campaign start | 3–5 | Urgency, objection handling |
| Post-purchase | Conversion | 2–4 | Onboard, upsell, referral ask |
| Win-back | Inactivity 30–90d | 2–3 | Re-engage or sunset |

### Strategist deliverables

- Automation flow diagram (text or mermaid in markdown)
- Segment definitions and suppression rules
- KPI targets (open/click/conversion benchmarks as ranges)

### Newsletter writer deliverables

- Subject line variants, preview text, scannable body
- Content blocks: hero, value, CTA, P.S.
- Plain-text alternate summary

### Deliverability deliverables

- Domain authentication checklist (SPF, DKIM, DMARC — human DNS steps in Bangla)
- List hygiene rules (bounce, complaint handling)
- Warm-up guidance for new domains (conservative volume ramp)

### Output path

`projects/<slug>/marketing/email/` — `lifecycle-map.md`, `sequences/`, `newsletters/`, `deliverability.md`

## Best Practices

- Align launch sequences with `WF-GRO-LAUNCH-001` timelines.
- Link every promotional email to scorecard conversion events.
- Store approved templates in asset library for reuse.

## Anti-patterns

- Purchased list strategies
- Misleading subject lines (RE: fake thread patterns)
- Blast sends without unsubscribe path documentation

## References

- HB-GRO-CRO-001
- WF-GRO-LAUNCH-001
- ST-GRO-CLAIMS-001

## Related Knowledge Objects

- HB-GRO-ADS-001
- HB-GRO-ANALYTICS-001
- HB-GRO-CONTENT-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial email handbook (I15 Wave 0). |
