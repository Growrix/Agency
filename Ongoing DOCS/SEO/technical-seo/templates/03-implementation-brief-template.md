# Implementation Brief Template

Document status: template source

## Purpose

Provide a concise planning template for converting Technical SEO docs into implementation tasks.

## Scope

Covers route type, allowed scope, source docs, requirements, acceptance criteria, validation, risks, and rollback.

## Business Value

Implementation briefs reduce ambiguity before engineers or AI agents make code changes.

## Dependencies

- `patterns/01-agent-workflow-patterns.md`
- `execution/tasks.md`
- Relevant domain documents.

## Concepts

- A brief is the bridge between documentation and code work.
- It must define what is allowed and what is not allowed.

## Architecture

```md
# Technical SEO Implementation Brief

Status: Draft | Approved | In Progress | Done
Route type:
Allowed folders:
Source docs:
- `<path>`

## Problem
## Required Behavior
## Out Of Scope
## Acceptance Criteria
## Validation Plan
## Monitoring Plan
## Risks And Rollback
```

## Best Practices

- Use route samples before broad changes.
- Include both user-visible and crawler-visible requirements.
- Define validation before implementation starts.

## Common Mistakes

- Starting implementation from a vague audit note.
- Omitting excluded scope.
- Forgetting monitoring after release.

## Validation Rules

- Every brief must link source docs and define acceptance criteria.
- Every brief must include a validation plan.
- High-risk route changes need rollback or mitigation.

## Testing Strategy

Review the brief against the domain docs before implementation and against validation results after implementation.

## Monitoring

Track whether briefs lead to reopened tasks or production regressions.

## Maintenance

Update the template when implementation teams need additional clarity.

## Future Enhancements

- Add examples for metadata, migration, performance, and sitemap tasks.

## Related Documents

- `patterns/01-agent-workflow-patterns.md`
- `execution/tasks.md`
- `testing-auditing/01-testing-strategy.md`

## References

- Master Technical SEO Documentation Blueprint.
