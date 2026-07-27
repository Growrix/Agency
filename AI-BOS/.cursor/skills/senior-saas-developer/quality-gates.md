# Quality Gates — Senior SaaS Developer

Non-negotiable acceptance gates that must pass before this skill may mark work complete. Adapted generically for any SaaS project. Project-specific extensions may exist in project docs — load during discovery and apply when found.

## Applicability

Run every gate that applies to the touched scope. Mark skipped gates as `not-applicable` with a one-line rationale. A task is complete only when all applicable gates pass and evidence is recorded.

## QG1 — Zero Problems Gate

**Applies when:** Any workspace-owned files were edited.

**Requirements:**

- Touched files MUST have zero errors and zero warnings in IDE diagnostics (`ReadLints` on edited paths).
- If project uses ESLint, run with `--max-warnings 0` on touched scope.
- If project uses TypeScript or equivalent type checking, it MUST pass with zero diagnostics on touched scope.
- Any warning in touched scope is a blocking failure, not a soft warning.

**Evidence:** Linter output, typecheck command result, or IDE diagnostic summary.

## QG2 — Build + Runtime Gate

**Applies when:** Build tooling exists and code affecting runtime was changed.

**Requirements:**

- Build MUST pass without warnings promoted to errors by project policy.
- When project defines a dev/start script, dev server MUST start from project root.
- Prefer the project's documented primary command (`npm run dev`, `pnpm dev`, `yarn dev`, etc.) discovered from `package.json`.
- After any build or repair cycle, confirm runtime boots cleanly — do not stop at green static checks alone.

**Not applicable when:** Project has no build step or no dev server script; document rationale.

**Evidence:** Build command exit code; dev server startup log or health check.

## QG3 — Test + Smoke Gate

**Applies when:** Project has test suites or declared critical paths.

**Requirements:**

- Unit, integration, and E2E suites for declared critical paths MUST pass when those paths were touched.
- When no automated tests exist but project docs declare smoke routes, run manual or scripted smoke checks.
- Minimum smoke when applicable: home route, auth entry route (if auth exists), health/API route (if backend exists).

**Not applicable when:** Change is docs-only or explicitly isolated from testable surfaces; document rationale.

**Evidence:** Test runner output or smoke check results.

## QG4 — Environment Readiness Gate

**Applies when:** Runtime boot, integration work, or server behavior was touched.

**Requirements:**

- Required env vars MUST be enumerated from project docs (`.env.example`, README, config files).
- Missing env vars MUST block runtime validation and be reported with exact names.
- Local development may use placeholders only when project docs explicitly mark them as non-production safe.
- Never invent env var names; report as `missing_knowledge` if contract is unclear.

**Evidence:** Env var checklist with present/missing status.

## QG5 — Operation Mode Gate

**Applies when:** Working mode is `verify_only` or `audit_readiness`.

**Requirements:**

- Agent MUST NOT edit code or install packages unless explicitly blocked.
- On blocker, emit a blocker report and request permission to enter fix mode.
- In fix mode, changes must be minimal, explicit, and reported before re-validation.

**Evidence:** Mode label in output; fix-mode approval noted if edits were made.

## QG6 — Completion Contract

**Applies when:** Always.

**Requirements:**

- Work is complete only when all applicable gates pass and evidence is recorded in the run report and `tasks.md`.
- Any skipped gate must be marked `not-applicable` with rationale.
- Remaining gaps and `missing_knowledge` must be listed explicitly — do not imply full readiness when gaps remain.

**Evidence:** Gate matrix in output format section 5.

## QG7 — Plan/Spec/Code Parity Gate

**Applies when:** Working mode is `execute_locked_plan` or a governing plan exists for the current scope.

**Requirements:**

- Execution MUST prove parity between planning artifacts and generated code.
- Any missing planned route, component, integration artifact, webhook, or env-validation entry is a blocking failure.
- If no plan exists and mode is not plan-governed, mark gate `not-applicable`.

**Evidence:** Checklist mapping plan items to implemented artifacts.

## QG8 — Non-Placeholder Test Gate

**Applies when:** Project declares critical paths in planning artifacts or test config.

**Requirements:**

- Placeholder tests (echo scripts, `expect(true).toBe(true)`-only, no-op runners) are forbidden for declared critical paths.
- Execution MUST include runnable test evidence for critical paths declared in planning artifacts.
- If project has no declared critical paths, mark gate `not-applicable`.

**Evidence:** Test names and passing output for critical paths.

## QG9 — CI / Remote Parity Gate

**Applies when:** User asked to fix CI, push, merge to main, deploy, or release; or agent performed push/merge on user's behalf.

**Requirements:**

- Read `.github/workflows/` (or equivalent) and run the **exact** local command bundle CI uses (`ci:check` when defined).
- Do **not** substitute a narrower script (e.g. `health:check` alone, lint-only, or subset e2e) unless user explicitly approves.
- After push: verify GitHub Actions (and linked deploy checks) report `success` for the **same commit SHA** before claiming CI/deploy fixed.
- Separate Vercel build logs from GitHub CI — both must be reported independently when both failed.
- If remote checks cannot be queried, status MUST be **"local pass only — remote unverified"** — never "CI green."

**Not applicable when:** Change is local-only with no push/deploy request and no CI complaint.

**Evidence:** Workflow file path + command run locally + remote run URL/conclusion or explicit unverified disclaimer.

Full protocol: [ci-parity-verification.md](ci-parity-verification.md).

## Domain-Specific Checks (not numbered gates)

These are required validations tied to work type, not separate gate IDs:

### Frontend (when UI is affected)

- Responsive/mobile layout sanity at common breakpoints
- Accessibility: semantic HTML, labels, focus, contrast where checkable
- SEO: title, meta description, heading hierarchy on changed public pages

### Backend (when server behavior is affected)

- API contract correctness for changed endpoints
- Data layer integrity (migrations, queries, constraints)
- Security: auth boundaries, input validation, secret handling
- Performance: obvious N+1 or unbounded queries in changed code
- Regression: existing tests and dependent routes still pass

## Gate Report Template

```markdown
| Gate | Status | Evidence |
|------|--------|----------|
| QG1 Zero Problems | pass/fail/N/A | ... |
| QG2 Build + Runtime | pass/fail/N/A | ... |
| QG3 Test + Smoke | pass/fail/N/A | ... |
| QG4 Environment | pass/fail/N/A | ... |
| QG5 Operation Mode | pass/fail/N/A | ... |
| QG6 Completion Contract | pass/fail/N/A | ... |
| QG7 Plan Parity | pass/fail/N/A | ... |
| QG8 Non-Placeholder Tests | pass/fail/N/A | ... |
| QG9 CI / Remote Parity | pass/fail/N/A | ... |
```
