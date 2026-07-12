# Technical SEO Documentation System

Document status: active handbook index
Last updated: 2026-07-12
Scope: Documentation only

## Purpose

Provide the single source of truth for building, auditing, optimizing, and maintaining technically excellent websites with modern Technical SEO standards.

## Scope

This suite covers site architecture, information architecture, URL strategy, Next.js App Router rendering, metadata, structured data, crawlability, indexability, canonicals, robots, XML sitemaps, internal linking, media SEO, JavaScript SEO, performance, Core Web Vitals, CDN, edge, caching, API/database performance, security, HTTP, redirects, error handling, accessibility, international SEO, local SEO, observability, DevOps, CI/CD, testing, auditing, governance, AI workflows, templates, checklists, and execution tasks.

## Business Value

The system helps teams ship websites that can be crawled, indexed, understood, trusted, monitored, and improved without relying on undocumented tribal knowledge.

## Dependencies

- A website or application architecture to audit or implement.
- Access to analytics, Search Console, logs, crawl tools, and performance tooling when validating live systems.
- Agreement that application code is not generated from this suite unless a later implementation task explicitly requests it.

## Concepts

- Technical SEO is an engineering quality system, not only a checklist.
- Every SEO rule needs an owner, validation path, and maintenance routine.
- Agents should load the smallest relevant document set before implementation.

## Architecture

```text
Technical_SEO/
  README.md
  00-documentation-map.md
  01-brainstorming-and-architecture-decisions.md
  02-principles.md
  architecture/
  on-page/
  media/
  performance/
  security-http/
  accessibility-international-local/
  devops-observability/
  testing-auditing/
  rules/
  patterns/
  templates/
  checklists/
  execution/tasks.md
```

## Best Practices

- Start with `00-documentation-map.md`.
- Use the domain file that owns the decision before changing downstream docs or implementation plans.
- Treat mandatory guidance as release-blocking when it affects crawlability, indexability, rendering, performance, security, or user access.
- Keep optional enhancements separate from launch requirements.

## Common Mistakes

- Optimizing metadata while ignoring crawl blocks, rendering failures, or broken canonicals.
- Treating Core Web Vitals as a frontend-only concern.
- Generating duplicate documentation instead of linking to the source owner.
- Letting AI agents infer SEO policy from code without reading the handbook.

## Validation Rules

- Every feature that creates public URLs must define URL, metadata, canonical, indexing, sitemap, internal-linking, and monitoring behavior.
- Every release must include crawl, index, performance, accessibility, security header, and redirect/error checks for touched public routes.

## Testing Strategy

Use layered validation: static checks, local crawl checks, route rendering checks, structured data validation, Lighthouse/WebPageTest, Search Console inspection, log review, and recurring production monitoring.

## Monitoring

Monitor crawl errors, index coverage, sitemap health, Core Web Vitals, redirect spikes, 404/5xx rates, canonical conflicts, structured data errors, and organic traffic anomalies.

## Maintenance

Review the handbook before major platform changes, migrations, route additions, content model changes, rendering changes, CDN changes, or deployment pipeline changes.

## Future Enhancements

- Add project-specific implementation notes after the first real Technical SEO execution pass.
- Add tool-specific command recipes for each preferred stack.
- Add benchmark snapshots for recurring audits.

## Related Documents

- `00-documentation-map.md`
- `01-brainstorming-and-architecture-decisions.md`
- `02-principles.md`
- `execution/tasks.md`

## References

- Google Search Central documentation.
- Schema.org documentation.
- Next.js App Router documentation.
- W3C accessibility guidance.
- web.dev performance guidance.
