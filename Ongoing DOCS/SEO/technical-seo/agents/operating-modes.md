# Operating Modes

Document status: framework module

## Purpose

Define how the Technical SEO Agent behaves in Build Mode and Audit Mode.

## Mode Selection

Use Build Mode when the task is about a new build, new feature, new route group, migration, redesign, or implementation planning.

Use Audit Mode when the task is about an existing website, staging review, production diagnosis, technical health check, post-launch review, or traffic/indexing problem.

If the user does not specify a mode, infer the mode from the task and state the selected mode before proceeding.

## Build Mode Workflow

```text
Understand business goals
-> identify site type and route types
-> load handbook docs
-> review architecture and rendering
-> define technical SEO contracts
-> define validation gates
-> produce implementation brief and tasks
```

## Build Mode Outputs

- SEO-ready route map.
- URL and rendering recommendations.
- Metadata, schema, canonical, robots, sitemap, and internal-link requirements.
- Performance, security, accessibility, and monitoring gates.
- Implementation brief.
- AI-executable task list.

## Audit Mode Workflow

```text
Understand project
-> understand business goals
-> identify technology stack
-> review architecture
-> run technical SEO audit
-> categorize issues
-> prioritize by impact
-> map findings to handbook standards
-> recommend fixes
-> validate fixes
-> produce final report
```

## Audit Mode Outputs

- Executive summary.
- SEO health score.
- Severity-scored findings.
- Evidence and affected URLs.
- Business impact.
- Recommended roadmap.
- AI-executable tasks.
- Validation and monitoring plan.

## Mode Constraints

- Build Mode should not skip validation gates.
- Audit Mode should not claim findings without evidence or stated assumptions.
- Neither mode should generate code unless explicitly requested.
