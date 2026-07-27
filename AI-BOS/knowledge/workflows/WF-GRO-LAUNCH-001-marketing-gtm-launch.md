---
id: WF-GRO-LAUNCH-001
title: GTM Launch Workflow
type: workflow
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
dependencies:
  - WF-GRO-CAMPAIGN-001
  - HB-GRO-EMAIL-001
  - HB-GRO-SOCIAL-001
  - HB-GRO-ADS-001
related:
  - gtm
  - launch
  - product
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - workflow
  - marketing
  - launch
capabilities:
  - CAP-GRO-002
  - CAP-STR-003
---

# GTM Launch Workflow

## Purpose

Coordinate **go-to-market launch sequencing** for product-mode initiatives — timed releases across email, social, paid, and content aligned to a single launch date.

## Scope

Product and major offer launches. Extends `WF-GRO-CAMPAIGN-001` Phase 3–4 with day-by-day GTM calendar. Client website launches may hand off delivery to template agents.

## Principles

1. **Launch date is anchor** — all assets back-schedule from T-0.
2. **Internal before external** — tracking, landing, payment tested before announcement.
3. **Single narrative** — one launch story across channels; creative division ensures message match.
4. **Rollback plan** — human knows how to pause ads and email if critical bug found.

## Standards

### GTM timeline template (relative to T-0)

| When | Workstream | Owner |
|------|------------|-------|
| T-21 | Intelligence refresh, offer lock, charter | CMO |
| T-14 | Landing + email sequences drafted; CRO audit | CRO + content |
| T-10 | Creative + video assets briefed | Creative + video |
| T-7 | Brand guardian full pass; claims check | Brand guardian |
| T-5 | Ads plans + audiences; organic social queue | Ads + social |
| T-3 | Human: tracking, checkout, DNS verification | Human + delivery |
| T-1 | Email test sends; ad drafts loaded (paused) | Human |
| T-0 | Launch: email blast, social, ads go-live | Human |
| T+1 | 24h analytics sanity | Analytics |
| T+7 | First optimization review | CMO |

### Launch day checklist (human — Bangla in handoff)

- [ ] Landing page live and mobile checked
- [ ] Payment/checkout tested
- [ ] Primary email sent or scheduled
- [ ] Pin launch post on primary social
- [ ] Ads enabled per approved budget
- [ ] Support inbox monitored

### Deliverables

`projects/<slug>/marketing/campaigns/<id>/gtm-calendar.md` — table above filled with real dates.

## Best Practices

- Soft launch to email list before cold paid traffic when list exists.
- Prepare "launch extended" alternate copy if technical delay on T-0.
- Sync with `@founder-os` for pricing/offer changes in final week.

## Anti-patterns

- Public launch before landing page CRO minimum pass
- Same-day first-time ad account + high budget
- Launch without single canonical URL in all channel assets

## References

- WF-GRO-CAMPAIGN-001
- HB-GRO-EMAIL-001
- HB-GRO-ADS-001

## Related Knowledge Objects

- AR-GRO-MKOS-001
- HB-GRO-CRO-001
- TP-GRO-MKOS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial GTM launch workflow (I15 Wave 0). |
