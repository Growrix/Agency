---
id: HB-GRO-SEO-AUTO-001
title: SEO Automation Handbook
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
  - AG-GRO-SEO-AUTO-001
dependencies:
  - HB-GRO-SEO-001
  - WF-SEO-AUDIT-001
  - HB-GRO-SEOOS-001
related:
  - seo-automation
  - scheduled-audit
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - seo
  - automation
capabilities:
  - CAP-GRO-003
---

# SEO Automation Handbook

## Purpose

Guide **SEO automation and scheduled audit programs** — repeatable crawl audits, CI release gates, monitoring playbooks, and remediation prioritization without building scrape MCP or browser automation in this phase.

## Scope

Audit schedules, CI SEO gate definitions, crawl checklists, report templates. Does **not** implement crawlers or auto-fix code — produces playbooks for human or delivery-lane execution.

## Principles

1. **Automate detection, human approves fixes** — agents flag issues; humans or delivery agents implement.
2. **CI gates for regressions** — release gates catch metadata, indexability, and CWV regressions.
3. **Prioritize by impact** — P0 indexation blockers before P3 cosmetic issues.
4. **Reuse existing workflows** — extend `WF-SEO-AUDIT-001`, do not duplicate.

## Standards

### Scheduled audit cadence

| Cadence | Scope | Owner |
|---------|-------|-------|
| Pre-release | Metadata, robots, canonicals, CWV smoke | AG-GRO-SEO-AUTO-001 → delivery CI |
| Weekly | Crawl errors, index coverage delta | Human runs Search Console |
| Monthly | Full technical + on-page audit | AG-GRO-SEO-LEAD-001 orchestrates |
| Quarterly | Competitive + backlink profile review | AG-GRO-SEO-OFF-001 |

### CI SEO gate checklist (SaaS / Next / HTML)

- [ ] Title and meta description present on changed routes
- [ ] Canonical URL correct
- [ ] robots.txt allows index where intended
- [ ] No accidental noindex on production routes
- [ ] Structured data valid (smoke)
- [ ] Release gates spec passes (`web/tests/e2e/release-gates.spec.ts` for SaaS)

### Deliverables

| Artifact | Purpose |
|----------|---------|
| Audit schedule | Calendar with owners and tools |
| CI gate spec | Checks to add or verify in pipeline |
| Issue backlog | Prioritized P0–P3 with assignee lane |
| Automation playbook | Human steps for recurring audits |

### Output path

`projects/<slug>/marketing/seo/audits/` — `schedule.md`, `ci-gates.md`, `backlog-<date>.md`

## Best Practices

- Link CI failures to specific remediation tickets in backlog.
- Coordinate with `@devops-release-engineer` for pipeline gate wiring on SaaS.
- Document tool access requirements (Search Console, Lighthouse CI) in Bangla.

## Anti-patterns

- Promising fully autonomous SEO fixes without human review
- Running audits without baseline scorecard
- Ignoring false positives in CI gates without tuning

## References

- WF-SEO-AUDIT-001
- ST-SEO-001
- HB-GRO-SEO-001

## Related Knowledge Objects

- HB-GRO-SEOOS-001
- ST-GRO-SEO-SCORECARD-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I16 — initial SEO automation handbook. |
