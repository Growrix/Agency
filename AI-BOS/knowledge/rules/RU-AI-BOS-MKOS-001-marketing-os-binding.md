---
id: RU-AI-BOS-MKOS-001
title: Marketing OS Lane Binding Rule
type: rule
category: governance
domain: ai-bos
version: 1.1.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-GRO-CMO-001
dependencies:
  - AR-GRO-MKOS-001
  - HB-GRO-MKOS-001
  - HB-GRO-UNIVERSAL-001
  - ST-GRO-MKT-MEMORY-001
  - ST-GRO-SCORECARD-001
  - ST-GRO-CLAIMS-001
  - RU-AI-BOS-HANDOFF-001
  - RU-AI-BOS-VAULT-001
related:
  - marketing-os
  - binding
  - mktos
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - rule
  - marketing
  - mktos
capabilities:
  - CAP-GRO-002
  - CAP-OPS-005
---

# Marketing OS Lane Binding Rule

## Purpose

Require all Marketing OS agents to load I15 knowledge, bind to `PRJ-GRO-MKOS-001`, persist artifacts to marketing memory paths, and respect human gates before external marketing actions.

## Scope

Applies to all `AG-GRO-CMO-001` and marketing division agents when work root is marketing advisory (not product code).

## Principles

1. **Project identity** — marketing initiatives use `PRJ-GRO-MKOS-001` unless spun as client sub-project linked in `marketing/meta.json`.
2. **CMO entry** — multi-division or ambiguous marketing scope starts with `@marketing-cmo`.
3. **No coding** — marketing agents must not edit `web/`, `sites/`, `Frontend_Nextjs/`.
4. **Vault SSOT** — knowledge bodies live in `AI-BOS/knowledge/`; host skills are projections per `RU-AI-BOS-VAULT-001`.

## Standards

### Binding checklist (before material marketing work)

1. Resolve project `PRJ-GRO-MKOS-001` via `TP-GRO-MKOS-001`
2. Load `AR-GRO-MKOS-001`, `HB-GRO-MKOS-001`, `HB-GRO-UNIVERSAL-001`
3. Load division handbook for assigned agent
4. Load `ST-GRO-MKT-MEMORY-001`, `ST-GRO-SCORECARD-001`, `ST-GRO-CLAIMS-001` as applicable
5. Read `projects/<slug>/marketing/meta.json` and active campaign folder
6. Follow `WF-GRO-CAMPAIGN-001` or `WF-GRO-LAUNCH-001` for lifecycle work
7. Write outputs on disk; record memory summary
8. End with Bangla handoff per `RU-AI-BOS-HANDOFF-001`

### Orchestrator routing

| Need | Agent |
|------|-------|
| Full marketing / multi-channel | AG-GRO-CMO-001 |
| Offer/funnel only (early) | AG-GRO-MARKET-001 → escalate to CMO when channels multiply |
| Business context / new initiative | AG-STR-FOUNDER-001 |
| Site / landing implementation | AG-DLV-FE-001 / frontend-architect lane |
| Sales handoff | AG-GRO-SALES-001 |
| Technical SEO execution | AG-GRO-SEO-TECH-001, AG-GRO-SEO-ON-001, AG-GRO-SEO-OFF-001 |
| Full SEO program / multi-track SEO | AG-GRO-SEO-LEAD-001 |

### Human gates (never skip)

Ad spend, account creation, DNS, email blast send, social publish, review responses in crisis — human executes; agent supplies Bangla checklist.

### MCP tools (when available)

| ID | Use |
|----|-----|
| MC-KNW-REGISTRY-001 | KO search/read |
| MC-KNW-RETRIEVE-001 | Project + founder memory grounding |

## Best Practices

- Link founder handoff record id in campaign charter.
- Update scorecard before recommending budget scale-up.
- Run brand guardian on client-mode exports.

## Anti-patterns

- Marketing specialists editing product codebases
- Chat-only deliverables without disk artifacts
- Bypassing CMO on cross-division campaigns
- Inventing analytics or ad performance data

## References

- AR-GRO-MKOS-001
- TP-GRO-MKOS-001
- RU-AI-BOS-FOUNDER-001

## Related Knowledge Objects

- WF-GRO-CAMPAIGN-001
- WF-GRO-LAUNCH-001
- HB-GRO-MKT-MEMORY-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial Marketing OS binding rule (I15 Wave 0). |
| 1.1.0 | 2026-07-18 | I16 — SEO programs route through AG-GRO-SEO-LEAD-001. |
