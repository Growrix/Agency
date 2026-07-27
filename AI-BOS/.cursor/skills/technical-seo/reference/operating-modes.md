# Operating Modes

## Mode Selection

| Mode | Use when |
|------|----------|
| **Build Mode** | Greenfield, new route groups, migrations, redesigns, SEO architecture, release-gate planning |
| **Audit Mode** | Existing sites, staging reviews, production diagnostics, migration checks, indexing issues |

If the user does not specify a mode, infer from the request and state the selected mode before deep work.

## Build Mode Workflow

```text
Understand business goals
→ identify site type and route types
→ load handbook docs
→ review architecture and rendering
→ define technical SEO contracts
→ define validation gates
→ produce implementation brief and tasks
```

**Outputs:** route map, URL/rendering recommendations, metadata/schema/canonical/robots/sitemap requirements, performance/security/a11y gates, implementation brief, AI-executable tasks.

## Audit Mode Workflow

```text
Understand project and business goals
→ identify technology stack
→ review architecture
→ run technical SEO audit
→ categorize and prioritize by impact
→ map findings to handbook standards
→ recommend fixes
→ define validation
→ produce final report
```

**Outputs:** executive summary, health score, severity-scored findings, evidence and affected URLs, business impact, roadmap, AI-executable tasks, validation and monitoring plan.

## Mode Constraints

- Build Mode must not skip validation gates.
- Audit Mode must not claim findings without evidence or stated assumptions.
- Neither mode generates code unless explicitly requested.
