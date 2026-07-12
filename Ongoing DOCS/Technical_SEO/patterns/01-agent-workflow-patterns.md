# Agent Workflow Patterns

Document status: workflow source

## Purpose

Define repeatable AI-agent workflows for Technical SEO planning, auditing, implementation support, and validation.

## Scope

Covers read paths, task framing, audit patterns, implementation briefs, validation loops, escalation, and documentation updates.

## Business Value

Workflow patterns help agents act consistently and reduce the chance of incomplete or unsafe SEO changes.

## Dependencies

- `00-documentation-map.md`
- `rules/01-technical-seo-rules.md`
- `templates/03-implementation-brief-template.md`

## Concepts

- Agents should read context before acting.
- Work should proceed from source docs to targeted validation.
- Findings and fixes should be traceable.

## Architecture

```text
Classify task -> load source docs -> define route sample -> plan work -> execute or audit -> validate -> update tasks/docs
```

## Best Practices

- Use the smallest relevant document set.
- Name route types and affected URL samples before validation.
- Prefer evidence-based findings over generic advice.
- Update `execution/tasks.md` when execution scope changes.

## Common Mistakes

- Loading the whole handbook instead of the owning docs.
- Fixing metadata while ignoring render/index blockers.
- Reporting issues without reproduction or validation steps.
- Editing outside the allowed task scope.

## Validation Rules

- Every agent task must state allowed folders, source docs, acceptance criteria, and validation.
- Audits must include severity, evidence, and recommended owner.
- Implementation support must not generate code unless explicitly requested.

## Testing Strategy

Validate agent outputs against templates, check source-document coverage, and confirm validation evidence exists.

## Monitoring

Track repeated agent mistakes, missing documentation, and task reopen reasons.

## Maintenance

Update patterns after real agent runs expose ambiguity or missing steps.

## Future Enhancements

- Add role-specific read paths for frontend, backend, DevOps, QA, and content agents.
- Add prompt snippets for common audit types.

## Related Documents

- `templates/03-implementation-brief-template.md`
- `templates/02-audit-report-template.md`
- `execution/tasks.md`

## References

- Master Technical SEO Documentation Blueprint.
- AI documentation workflow practices.
