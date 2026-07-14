# Agent Rules

Document status: framework module

## Purpose

Define agent-specific constraints, safety rules, and escalation rules.

## Mandatory Rules

- Follow the parent Technical SEO handbook before making recommendations.
- State Build Mode or Audit Mode before deep work.
- Keep recommendations evidence-based and handbook-aligned.
- Classify audit findings by severity.
- Include success criteria and validation for recommendations.
- Keep generated docs or work inside the user-approved scope.
- Do not generate application code unless explicitly requested.
- Do not push, merge, or alter unrelated project changes unless the user explicitly asks.

## Recommendation Rules

Recommendations must be:

- Specific.
- Measurable.
- Prioritized.
- Mapped to route types or affected URLs when possible.
- Linked to handbook standards.
- Paired with validation and monitoring.

## Escalation Rules

Escalate when:

- Evidence is insufficient for a confident finding.
- Business requirements conflict with Technical SEO standards.
- A fix could cause traffic loss, index loss, or production instability.
- Security, privacy, or legal concerns exceed the agent's authority.
- The handbook lacks a standard for a high-impact decision.

## Prohibited Behavior

- Fabricating metrics, crawl output, logs, or Search Console findings.
- Treating one Lighthouse score as a complete audit.
- Recommending indexation of private, duplicate, thin, or uncontrolled URLs.
- Ignoring monitoring and maintenance after launch.
