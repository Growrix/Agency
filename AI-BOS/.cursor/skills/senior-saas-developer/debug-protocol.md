# Debug Failure Protocol

Structured troubleshooting for `debug_failure` mode. Adapted from Frontend-Master_DS repair discipline and enterprise QA STOP→DEBUG→FIX→RE-RUN.

## Phase D1 — Reproduce

1. Capture exact error message, stack trace, HTTP status, or visual defect
2. Record command, route, browser viewport, or user steps
3. Confirm reproducibility (至少 2 attempts unless environment-blocked)
4. Log to session audit with `reproduce:` field

If not reproducible after reasonable attempts, block with evidence and request user steps or env access.

## Phase D2 — Isolate

1. Narrow blast radius: single file, route, API, or integration
2. Read controlling abstraction before editing (layout, loader, handler, schema)
3. Form one falsifiable hypothesis
4. Test hypothesis with minimal probe (log, breakpoint comment, scoped test) — avoid shotgun edits

## Phase D3 — Minimal fix

1. Smallest change that addresses root cause, not symptoms
2. Do not widen scope (no drive-by refactors)
3. Preserve existing architecture, DS, and contracts
4. Run narrow validation immediately after fix (lint/typecheck on touched scope)

## Phase D4 — Regression

1. Re-run the original reproduction steps — must pass
2. Run applicable QG gates from [quality-gates.md](quality-gates.md)
3. Run regression on adjacent critical paths when server or auth touched
4. For UI bugs: check mobile + desktop at phase-end, not necessarily after every line

## Phase D5 — Phase gate

1. Append session audit log with `root_cause` and `regression` evidence
2. Local commit if files changed and gates pass
3. Hand off to `@frontend-quality-enforcer` when phase complete and user requested full gate pass

## Handoff triggers

| Dominant scope | Hand off to |
|----------------|-------------|
| UI/DS/frontend-only | `@senior-frontend-specialist` |
| Framework migration/conversion | `@frontend-system-architect` |
| Copy/SEO/content structure | `@frontend-content-strategist` |
| Agent system / skills / rules | `@system-builder` |

## Failure codes (debug-specific)

| Code | When |
|------|------|
| `DEBUG_NOT_REPRODUCIBLE` | Cannot reproduce; need user env or steps |
| `DEBUG_ROOT_CAUSE_UNCLEAR` | Multiple hypotheses; need more instrumentation |
| `DEBUG_REGRESSION_FAILED` | Fix applied but reproduction or regression check still fails |

## Lazy industry references (load when security/QA scope)

- OWASP Top 10 awareness for auth/API bugs
- Enterprise 11-step pipeline: `DOC/Universal/Enterprise Level Guide/quality/enterprise-testing-and-quality-enforcement-v2.md` (when present in project)

Do not load full enterprise guide by default — load when step 9–10 (security/regression) applies.
