# Documentation Map

Document status: canonical map
Last updated: 2026-07-12

## Purpose

Map the Technical SEO handbook so agents and humans can quickly find the source document for each decision.

## Scope

This map covers every document in the suite and defines the recommended read order, ownership boundaries, and dependencies.

## Business Value

A stable map reduces context waste, prevents duplicate guidance, and helps agents retrieve precise documentation instead of loading the entire handbook.

## Dependencies

- The root `README.md` for operating rules.
- `execution/tasks.md` for phase-level execution.
- Domain documents for implementation detail.

## Concepts

- One topic has one source owner.
- Cross-references are preferred over repeated guidance.
- Execution starts after the relevant domain docs are understood.

## Architecture

| Folder | Purpose |
| --- | --- |
| `architecture/` | Site architecture, URL strategy, rendering, migration, maintenance. |
| `on-page/` | Metadata, schema, canonicals, crawl/index controls, links, pagination, faceted search. |
| `media/` | Images, video, fonts, CSS, JavaScript SEO. |
| `performance/` | Core Web Vitals, caching, CDN, edge, API/database performance. |
| `security-http/` | HTTP, security headers, redirects, error handling. |
| `accessibility-international-local/` | Accessibility, international SEO, local SEO. |
| `devops-observability/` | CI/CD, deployment, monitoring, logging. |
| `testing-auditing/` | Testing strategy and audit playbooks. |
| `rules/` | Mandatory and optional governance rules. |
| `patterns/` | Repeatable agent and documentation workflows. |
| `templates/` | Reusable briefs, document templates, and audit report formats. |
| `checklists/` | Prelaunch and recurring maintenance checklists. |
| `execution/` | Canonical tasks and phase tracker. |

## Best Practices

- Read `README.md`, this map, and `02-principles.md` before using the suite.
- For route work, read architecture, rendering, metadata, canonicals, crawlability, sitemaps, and internal linking.
- For performance work, read Core Web Vitals, caching/CDN/edge, and API/database performance together.
- For release work, read testing, CI/CD, monitoring, and checklists.

## Common Mistakes

- Reading only one file for work that crosses rendering, metadata, and indexability.
- Changing URLs without consulting redirects, sitemaps, canonicals, and internal links.
- Treating templates as policy instead of using rules and domain documents as the source.

## Validation Rules

- All created or updated docs must remain under `Ongoing DOCS/Technical_SEO`.
- The suite must include map, rules, patterns, templates, checklists, and execution tasks.
- Every domain document should preserve the required section structure.

## Testing Strategy

Validate the suite with file counts, folder coverage, markdown readability, link review, and VS Code Problems checks for the touched folder.

## Monitoring

Track stale documents, missing owners, outdated references, and recurring audit failures that indicate documentation drift.

## Maintenance

Update this map when files are added, renamed, merged, or removed.

## Future Enhancements

- Add a dependency graph generated from related-document sections.
- Add project-specific read paths for ecommerce, SaaS, blog, documentation, and marketplace sites.

## Related Documents

- `README.md`
- `01-brainstorming-and-architecture-decisions.md`
- `02-principles.md`
- `execution/tasks.md`

## References

- Master Technical SEO Documentation Blueprint.
- Google Search Central documentation architecture patterns.
- Next.js documentation structure conventions.
