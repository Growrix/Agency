# Document Template

Document status: template source

## Purpose

Provide the standard structure for future Technical SEO handbook documents.

## Scope

Use this template for new domain modules, rules, checklists, and execution-support documents.

## Business Value

Consistent structure makes documents easier for humans and AI agents to scan, compare, and validate.

## Dependencies

- `00-documentation-map.md`
- `rules/01-technical-seo-rules.md`
- `patterns/01-agent-workflow-patterns.md`

## Concepts

- Every document should include purpose, scope, value, dependencies, guidance, validation, monitoring, maintenance, and references.
- Templates are not rules by themselves; they support rule application.

## Architecture

```md
# <Document Title>

Document status: draft | active | deprecated

## Purpose
## Scope
## Business Value
## Dependencies
## Concepts
## Architecture
## Best Practices
## Common Mistakes
## Validation Rules
## Testing Strategy
## Monitoring
## Maintenance
## Future Enhancements
## Related Documents
## References
```

## Best Practices

- Keep each document focused on one topic.
- Use lists and tables where they reduce ambiguity.
- Link related docs instead of duplicating large sections.
- Mark mandatory and optional guidance clearly.

## Common Mistakes

- Adding a new doc without updating `00-documentation-map.md`.
- Leaving validation or monitoring sections vague.
- Writing broad advice that cannot be tested.

## Validation Rules

- New documents must include all required headings.
- New documents must name dependencies and related documents.
- New documents must include validation rules and testing strategy.

## Testing Strategy

Check required headings, review internal links, and verify that the document has one clear owner topic.

## Monitoring

Monitor stale or duplicated guidance across the suite.

## Maintenance

Update this template when the suite governance changes.

## Future Enhancements

- Add frontmatter standards if automation requires it.
- Add machine-readable metadata fields.

## Related Documents

- `00-documentation-map.md`
- `rules/01-technical-seo-rules.md`
- `patterns/01-agent-workflow-patterns.md`

## References

- Master Technical SEO Documentation Blueprint.
