# On-Page SEO Tools & Evidence

Document status: active
Last updated: 2026-07-14

## Preferred Evidence

| Source | Use for |
| --- | --- |
| Google Search Console | Queries, impressions, CTR, page performance |
| Analytics (GA4, PostHog) | Engagement, landing page behavior |
| Ahrefs / Semrush exports | Keyword gaps, content ideas (user-supplied) |
| Live page / repo files | Current titles, headings, body copy |
| Manual SERP review | Intent validation, SERP feature notes |

## Tool Usage Rules

1. Never fabricate tool output—request exports or label `missing_knowledge`.
2. Prefer project files when auditing `web/`, `sites/`, or `Frontend_Nextjs/`.
3. Quantify impact with available metrics; otherwise use qualitative severity.
4. Document date and source of any third-party export used.

## Cursor / Agent Tools

| Tool | On-page use |
| --- | --- |
| Read / Grep | Audit page content, metadata copy in code |
| Web search | Public competitor pages, SERP context (cite URLs) |
| Task subagents | Parallel page audits when scope is large |

## Handoff Artifacts

Produce machine-readable briefs where possible:

- Keyword map (table)
- Per-page content brief
- Internal link matrix
- Title/meta recommendation table
