# SEO Architecture Decisions

Document status: decision log
Last updated: 2026-07-14

## ADR-001: Three-agent SEO family (not one mega-agent)

**Decision:** Separate `Technical_SEO_expert`, `On_Page_SEO_expert`, and `Off_Page_SEO_expert` agents with shared `Ongoing DOCS/SEO/` root.

**Rationale:** Clear ownership, smaller context loads, predictable handoffs. Users select the discipline they need.

**Deferred:** `SEO_Orchestrator` for cross-agent coordination—add only if handoffs become painful.

## ADR-002: Unified handbook root

**Decision:** Rename `Ongoing DOCS/Technical_SEO/` → `Ongoing DOCS/SEO/technical-seo/` with shared taxonomy at `Ongoing DOCS/SEO/`.

**Rationale:** Single install path for all SEO knowledge; avoids duplicate principles.

## ADR-003: On-Page includes content strategy; copy implementation handoff

**Decision:** On-Page agent owns keyword research, content briefs, title/meta **strategy and recommended copy**. Final brand-voice copy goes to `@frontend-content-strategist`.

## ADR-004: Technical on-page vs On-Page SEO

**Decision:** `technical-seo/on-page/` covers metadata **implementation** (Next.js APIs, HTML head, schema plumbing). `on-page-seo/` covers **what to say** (keywords, headings, content).

## ADR-005: Tooling is methodology-driven

**Decision:** Agents do not require Ahrefs/Semrush MCPs. Users supply exports or agents produce methodology and templates for manual execution.

## ADR-006: Lane routing

**Decision:** All three agents available in `web_saas`, `html_templates`, and `nextjs_migrations` lanes via `.cursor/brain/lane-router.yaml`.

## Open Questions

| ID | Question | Status |
| --- | --- | --- |
| OQ-1 | Automated rank/backlink monitoring integration | Open — human/dashboard |
| OQ-2 | SEO_Orchestrator agent | Deferred |
