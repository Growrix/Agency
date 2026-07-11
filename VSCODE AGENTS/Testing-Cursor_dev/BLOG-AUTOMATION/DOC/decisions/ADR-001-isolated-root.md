# ADR-001: BLOG-AUTOMATION Uses an Isolated Root

## Status
Accepted

## Decision
All blog-automation-specific assets live under `BLOG-AUTOMATION/`.

## Consequences
- no project-specific mixing in the workspace root
- local agents and docs stay portable
- implementation can be opened as its own workspace root for clean agent discovery