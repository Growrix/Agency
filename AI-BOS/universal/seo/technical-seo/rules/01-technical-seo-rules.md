# Technical SEO Rules

Document status: governance source

## Purpose

Define mandatory and optional rules that agents must follow when planning, auditing, or implementing Technical SEO work.

## Scope

Covers documentation use, route rules, metadata, canonicals, crawl/index controls, sitemaps, performance, security, accessibility, monitoring, and task execution.

## Business Value

Rules prevent agents and teams from shipping avoidable SEO regressions.

## Dependencies

- `README.md`
- `00-documentation-map.md`
- `execution/tasks.md`

## Concepts

- Mandatory rules are launch gates.
- Optional guidance improves maturity but may be phased.
- Exceptions need documentation, owner, and review date.

## Architecture

Rules sit above domain docs. Domain docs explain why and how to apply them.

## Best Practices

- Read the owning domain doc before applying a rule.
- Prefer route-type matrices for complex sites.
- Keep exceptions rare and visible.

## Common Mistakes

- Treating SEO as a final checklist instead of a design constraint.
- Shipping public routes without index/canonical decisions.
- Using noindex, robots, redirects, and canonicals inconsistently.

## Validation Rules

Mandatory:

- Every indexable page needs crawlable content, unique metadata, canonical URL, correct status code, and internal links.
- Noindex pages must not be in XML sitemaps.
- Redirect targets must be relevant and avoid chains.
- SEO-critical content must not be hidden behind fragile client-only rendering.
- Public pages must meet accessibility and performance gates.
- Production releases must include monitoring.

Optional:

- Add automated route-level SEO assertions.
- Add structured data where eligible.
- Add log-based crawl analysis for larger sites.

## Testing Strategy

Test mandatory rules through CI checks, crawls, rendered HTML inspection, structured data validation, performance tests, and manual release review.

## Monitoring

Monitor rule violations found in production and update gates when repeated issues appear.

## Maintenance

Review rules quarterly or when search guidance, platform architecture, or release process changes.

## Future Enhancements

- Add severity levels per rule.
- Add machine-readable rule IDs.

## Related Documents

- `patterns/01-agent-workflow-patterns.md`
- `checklists/01-prelaunch-checklist.md`
- `execution/tasks.md`

## References

- Google Search Essentials.
- Next.js documentation.
- WCAG and web.dev guidance.
