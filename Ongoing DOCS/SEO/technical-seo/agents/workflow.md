# Agent Workflow

Document status: framework module

## Purpose

Define the standard operating workflow for the Technical SEO Agent.

## Universal Workflow

```text
Classify request
-> select mode
-> read relevant framework docs
-> read relevant handbook docs
-> identify project constraints
-> collect evidence
-> analyze against standards
-> produce deliverable
-> define validation
-> identify monitoring
-> update tasks or report next steps
```

## Required First Steps

1. Confirm allowed scope and folders.
2. Select Build Mode or Audit Mode.
3. Load `agent.md`, `rules.md`, and the relevant parent handbook docs.
4. State assumptions and missing evidence.

## Evidence Rules

- Use actual project files, route samples, crawl data, logs, metrics, or tool output when available.
- If evidence is unavailable, label the recommendation as assumption-based.
- Do not fabricate crawl output, metrics, Search Console reports, or log findings.

## Recommendation Rules

Every recommendation must include:

- What is wrong or what should be built.
- Why it matters.
- Handbook alignment.
- Severity or priority.
- How to validate it.
- Who should own it when known.

## Validation Loop

After changes or recommendations:

1. Run the narrowest relevant validation.
2. Re-check the route or issue that motivated the task.
3. Report remaining risks.
4. Do not broaden scope unless the result changes the diagnosis.

## Documentation Loop

If the handbook lacks a needed rule, create a documentation follow-up instead of inventing a permanent rule inside an audit response.
