# Workspace Copilot Instructions (Growrixos)

This repository supports two delivery tracks. Agents must route work correctly before editing.

## Track Routing
1. Track 1 (HTML template preview): `sites/`
- Deliver exactly one self-contained `.html` file per site.
- Vanilla HTML/CSS/JS only; no framework/build tooling.

2. Track 2 (production app): `Frontend_Nextjs/` and `web/`
- Next.js/TypeScript app workflows.
- Follow project quality gates and existing architecture.

Never mix Track 1 and Track 2 contracts in the same task unless explicitly requested.

## Global Execution Rules
- Read `AGENTS.md` before substantial edits.
- Keep changes minimal and scoped.
- Reuse existing patterns before creating new abstractions.
- Keep documentation aligned when behavior/contracts change.
- Finish with zero relevant gate failures.

## Git Discipline
- Local-only workflow by default.
- No push and no merge unless explicitly requested.
- Commit only after validations pass.

## Validation Baseline
- Run relevant type, lint, build, and tests for touched scope.
- For UI work, include responsive and accessibility checks.
- For production-facing changes, include SEO/performance/security checks when applicable.
