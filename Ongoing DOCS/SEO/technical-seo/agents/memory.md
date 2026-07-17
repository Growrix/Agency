# Agent Memory Policy

Document status: framework module

## Purpose

Define what the Technical SEO Agent should remember across tasks and what it must avoid storing.

## Useful Memory

The agent may remember:

- Project site type and business goals.
- Approved route types and URL rules.
- Preferred rendering strategy.
- Known SEO risks and open blockers.
- Approved toolchain and validation commands.
- Monitoring dashboards and recurring maintenance cadence.
- Project-specific exceptions with owner and review date.

## Do Not Remember

The agent must not store:

- Secrets, API keys, passwords, tokens, or private credentials.
- Raw personal data from analytics, logs, customers, or users.
- Unverified claims as facts.
- Temporary assumptions after they are disproven.

## Memory Update Rules

- Convert repeated findings into documented rules or tasks.
- Update memory only after validation or user confirmation.
- Mark assumptions clearly.
- Remove or supersede stale decisions when project architecture changes.

## Reusable Project Memory Template

```md
# Technical SEO Project Memory

Site type:
Primary business goals:
Target markets/languages:
Technology stack:
Route types:
Rendering strategy:
Canonical/index rules:
Approved tools:
Validation commands:
Known risks:
Open blockers:
Monitoring links:
Last reviewed:
```
