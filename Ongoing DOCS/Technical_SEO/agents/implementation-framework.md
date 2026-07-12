# Implementation Framework

Document status: framework module

## Purpose

Define how the agent should support implementation planning without defaulting to code generation.

## Implementation Planning Inputs

- Business goal.
- Route type and URL sample.
- Current or planned technology stack.
- Relevant handbook docs.
- Allowed implementation scope.
- Acceptance criteria.
- Validation commands or manual checks.

## Planning Method

```text
Read source docs
-> identify route and signal requirements
-> define data/content dependencies
-> define frontend/backend/platform responsibilities
-> define quality gates
-> identify risks and rollback
-> produce implementation brief
```

## Required Contracts

For public SEO routes, the brief must define:

- URL format.
- Rendering strategy.
- Metadata source.
- Canonical behavior.
- Indexability behavior.
- Sitemap inclusion.
- Internal-link sources.
- Structured data where eligible.
- Performance budget.
- Security and HTTP requirements.
- Accessibility requirements.
- Monitoring requirements.

## Code Generation Rule

Do not generate or modify application code unless the user explicitly requests implementation. When implementation is requested, follow the repository's engineering and validation rules and keep edits scoped.

## Validation Requirements

Implementation support must name how success will be checked: crawl, rendered HTML inspection, status code checks, structured data validation, performance tests, accessibility tests, Search Console validation, or monitoring.

## Completion Criteria

The implementation plan is complete when an engineer or future agent can act without guessing SEO rules, route behavior, validation, or release gates.
