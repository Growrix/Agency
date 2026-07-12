# Audit Playbook

Document status: active module

## Purpose

Define the end-to-end Technical SEO audit workflow for existing websites or prelaunch builds.

## Scope

Covers intake, crawl setup, route sampling, architecture review, metadata, schema, crawl/index checks, performance, accessibility, security, logs, analytics, prioritization, and reporting.

## Business Value

A repeatable audit playbook turns findings into prioritized business and engineering actions.

## Dependencies

- `00-documentation-map.md`
- `testing-auditing/01-testing-strategy.md`
- `templates/02-audit-report-template.md`

## Concepts

- An audit is evidence-driven and severity-scored.
- Findings should identify impact, affected routes, reproduction steps, and recommended fix owner.
- Not every warning is equally important.

## Architecture

```text
Intake -> crawl -> sample route inspection -> tool validation -> log/analytics review -> severity scoring -> task creation
```

## Best Practices

- Capture baseline metrics before recommending fixes.
- Group findings by route template and system owner.
- Prioritize index blockers, crawl failures, redirect errors, render failures, and high-impact performance issues first.
- Include evidence links and screenshots when useful.

## Common Mistakes

- Delivering a tool export without interpretation.
- Mixing content strategy findings with technical blockers without severity.
- Ignoring business-critical pages.
- Failing to retest after fixes.

## Validation Rules

- Every critical finding must have evidence, impact, owner, recommendation, and validation method.
- Audit reports must separate critical, high, medium, low, and informational issues.
- Fixes must be retested before closing.

## Testing Strategy

Use crawl tools, rendered HTML inspection, Search Console, analytics, logs, performance tools, structured data validators, accessibility tools, and manual route review.

## Monitoring

Track open findings, resolution time, repeated issue categories, and production regressions that escaped audit.

## Maintenance

Refresh the playbook as search engine guidance, site architecture, and tooling change.

## Future Enhancements

- Add severity scoring rubric.
- Add project-specific audit command recipes.

## Related Documents

- `templates/02-audit-report-template.md`
- `checklists/01-prelaunch-checklist.md`
- `checklists/02-recurring-maintenance-checklist.md`

## References

- Google Search Console inspection workflows.
- Common crawler and performance audit practices.
