# Audit Report Template

Document status: template source

## Purpose

Provide a repeatable format for Technical SEO audit reports.

## Scope

Covers summary, methodology, route sample, findings, severity, evidence, recommendations, validation, and follow-up tasks.

## Business Value

A consistent report format turns audit output into prioritized engineering and business decisions.

## Dependencies

- `testing-auditing/02-audit-playbook.md`
- `rules/01-technical-seo-rules.md`
- `execution/tasks.md`

## Concepts

- Reports should separate facts, interpretation, severity, and recommendations.
- Every critical finding needs reproducible evidence.

## Architecture

```md
# Technical SEO Audit Report

## Executive Summary
## Scope And Method
## Route Sample
## Critical Findings
## High Findings
## Medium Findings
## Low Findings
## Positive Signals
## Recommended Roadmap
## Validation Evidence
## Follow-Up Tasks
```

## Best Practices

- Group findings by route template and owner.
- Include screenshots, crawl exports, URLs, or tool references where useful.
- Tie recommendations to business impact.

## Common Mistakes

- Providing raw tool exports without prioritization.
- Mixing content advice with technical blockers without labeling.
- Omitting retest criteria.

## Validation Rules

- Each finding must include severity, affected URLs, evidence, impact, recommendation, and validation method.
- Critical findings must map to release blockers or emergency tasks.

## Testing Strategy

Retest every fixed finding using the same or stronger validation method that discovered it.

## Monitoring

Track unresolved findings, recurring categories, and post-fix regressions.

## Maintenance

Update the template after each major audit if the format fails to capture necessary evidence.

## Future Enhancements

- Add severity scoring table.
- Add sample report for a Next.js site.

## Related Documents

- `testing-auditing/02-audit-playbook.md`
- `checklists/01-prelaunch-checklist.md`
- `checklists/02-recurring-maintenance-checklist.md`

## References

- Search Console and crawler audit workflows.
