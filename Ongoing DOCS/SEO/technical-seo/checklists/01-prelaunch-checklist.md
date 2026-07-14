# Prelaunch Checklist

Document status: checklist source

## Purpose

Provide a release checklist for Technical SEO readiness before a new site, route group, migration, or major redesign goes live.

## Scope

Covers architecture, URLs, rendering, metadata, schema, crawlability, indexability, sitemaps, links, media, performance, security, accessibility, redirects, monitoring, and rollback.

## Business Value

The checklist reduces launch regressions and gives stakeholders visible release confidence.

## Dependencies

- `00-documentation-map.md`
- `devops-observability/01-ci-cd-deployment-gates.md`
- `testing-auditing/01-testing-strategy.md`

## Concepts

- Prelaunch checks are not a substitute for good architecture.
- Critical launch blockers must be fixed or explicitly accepted with owner and mitigation.

## Architecture

Use the checklist after domain docs are applied and before production release.

## Best Practices

- Validate representative route templates, not only the homepage.
- Include old URLs for migrations.
- Capture evidence for critical gates.

## Common Mistakes

- Forgetting noindex removal on production.
- Indexing staging or preview environments.
- Launching without redirects or sitemaps.
- Missing analytics and Search Console setup.

## Validation Rules

Checklist:

- Public routes return correct status codes.
- Metadata is unique and accurate.
- Canonicals are correct.
- Noindex/robots rules are intentional.
- XML sitemaps contain only canonical indexable 200 URLs.
- Redirects are tested.
- Structured data validates where used.
- LCP/INP/CLS are checked for critical templates.
- Accessibility checks pass for core templates.
- Security headers and HTTPS are valid.
- Monitoring, analytics, and Search Console are ready.

## Testing Strategy

Run automated and manual checks, record blockers, assign owners, and retest before launch.

## Monitoring

After launch, monitor crawl errors, index coverage, organic traffic, CWV, 404/5xx, redirect errors, and sitemap reports daily during the initial window.

## Maintenance

Update the checklist after launch retrospectives or repeated missed issues.

## Future Enhancements

- Add severity scoring for each checklist item.
- Add project-specific checklist variants.

## Related Documents

- `testing-auditing/02-audit-playbook.md`
- `checklists/02-recurring-maintenance-checklist.md`
- `architecture/04-migration-maintenance.md`

## References

- Google Search Console launch validation practices.
- Lighthouse and crawler release workflows.
