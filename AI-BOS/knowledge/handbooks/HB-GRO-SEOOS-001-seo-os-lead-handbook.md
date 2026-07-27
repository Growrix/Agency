---
id: HB-GRO-SEOOS-001
title: SEO OS Lead Operating Handbook
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
  - AG-GRO-SEO-LEAD-001
dependencies:
  - AR-GRO-SEOOS-001
  - HB-GRO-SEO-001
  - WF-GRO-SEO-PROGRAM-001
  - ST-GRO-SEO-SCORECARD-001
  - RU-AI-BOS-SEOOS-001
related:
  - seo-os
  - seo-lead
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - handbook
  - seo
  - seoos
capabilities:
  - CAP-GRO-016
  - CAP-GRO-003
  - CAP-GRO-014
---

# SEO OS Lead Operating Handbook

## Purpose

Define how `AG-GRO-SEO-LEAD-001` operates as the **Chief SEO Officer** — intake, division routing, program management, quality gates, and human coordination for all SEO OS work under the Marketing OS CMO.

## Scope

SEO executive orchestration for `PRJ-GRO-MKOS-001`. Division playbooks live in division handbooks; this document covers Lead duties only.

## Principles

1. **One SEO throat to choke** — CMO and delivery teams interact with SEO Lead for SEO scope, not individual SEO specialists directly on multi-track work.
2. **Program before tasks** — no specialist starts without a written program brief (site scope, objective, primary KPI, deadline).
3. **Audit before optimize** — technical and on-page work follows evidence from audits (`WF-SEO-AUDIT-001`).
4. **Business outcomes first** — prioritize by impact × effort × business fit, not vanity rankings alone.
5. **Bangla human actions** — Search Console, DNS, and publish steps end with simple Bangla instructions per `RU-AI-BOS-HANDOFF-001`.

## Standards

### Lead session checklist

1. Load `AR-GRO-SEOOS-001`, `HB-GRO-SEO-001`, `RU-AI-BOS-SEOOS-001`
2. Resolve project slug from CMO handoff or `active-project.json`
3. Read `projects/<slug>/marketing/seo/meta.json` and latest SEO scorecard
4. Classify request → single track or full SEO program
5. Assign specialist agent(s); set brief path under `marketing/seo/programs/<id>/`
6. Schedule scorecard update after audit or launch phase
7. Record decision + handoff in SEO memory

### Routing matrix

| Request type | Route to |
|--------------|----------|
| Technical audit, CWV, schema, crawl | AG-GRO-SEO-TECH-001 |
| On-page, content optimization, E-E-A-T | AG-GRO-SEO-ON-001 |
| Backlinks, outreach, local SEO | AG-GRO-SEO-OFF-001 |
| Keyword clusters, intent mapping | AG-GRO-SEO-KW-001 |
| GEO, AI citations, entity SEO | AG-GRO-SEO-GEO-001 |
| Hreflang, localization, country targeting | AG-GRO-SEO-INTL-001 |
| Scheduled audits, CI SEO gates | AG-GRO-SEO-AUTO-001 |
| Algorithm updates, volatility | AG-GRO-SEO-ALGO-001 |
| Search Console, GA4, ranking reports | AG-GRO-ANALYTICS-001 |
| SEO post-mortems, asset index | AG-GRO-MKT-MEMORY-001 |
| Full marketing campaign | AG-GRO-CMO-001 (escalate up) |

### Quality gates (Lead sign-off)

| Gate | Criteria |
|------|----------|
| G1 Program brief | Site scope, objective, primary KPI, deadline on disk |
| G2 Evidence | Recommendations cite audit or verifiable data |
| G3 Scorecard | Primary SEO KPI named before launch recommendation |
| G4 Claims safe | External copy reviewed per `ST-GRO-CLAIMS-001` |
| G5 Human actions | Bangla checklist for Search Console, DNS, publish |

### Deliverables (Lead-owned)

- SEO program charter (`seo/programs/<id>/charter.md`)
- Division assignment log
- Integrated SEO roadmap when multi-track
- Executive summary for CMO (≤1 page)

## Best Practices

- Prefer one active major SEO program per slug unless human approves parallel tracks.
- Escalate to `@marketing-cmo` when scope includes paid + email + SEO together.
- Route algorithm watch findings to content refresh via `@on-page-seo` within 48h of major update.

## Anti-patterns

- Lead performing all audits personally instead of routing to specialists.
- Recommending indexation changes without documenting risk.
- Guaranteeing ranking positions or traffic numbers.

## References

- AR-GRO-SEOOS-001
- WF-GRO-SEO-PROGRAM-001
- WF-SEO-AUDIT-001
- ST-GRO-SEO-SCORECARD-001

## Related Knowledge Objects

- HB-GRO-SEO-INTL-001
- HB-GRO-SEO-AUTO-001
- HB-GRO-SEO-ALGO-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial SEO OS Lead handbook. |
