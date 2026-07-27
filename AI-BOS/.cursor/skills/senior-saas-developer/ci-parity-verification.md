# CI Parity and Remote Verification

Mandatory when the user asks to fix CI, deploy, merge to main, push, or declares production/release readiness.

## Problem this solves

Agents often run a **local convenience script** (e.g. `health:check`) that is **narrower** than `.github/workflows/*.yml`, then falsely report "CI green" or "deploy ready." Local pass ≠ remote pass.

## Phase A — Discover the remote contract (before declaring fix)

1. Read `.github/workflows/` (and any project CI config) for the **exact commands** run on push.
2. Read `package.json` scripts; note differences between `health:check`, `ci:check`, `test:release`, and raw `test:e2e`.
3. Record in output:
   - workflow file path
   - job name
   - exact npm/script invocations per step
   - Node version matrix if present

If no CI config exists, state that explicitly; local gates only apply until CI is added.

## Phase B — Local parity run (required before "fixed")

Run the **same command bundle CI uses**, not a substitute, unless user explicitly accepts a narrower scope.

Growrixos `web/` default:

```bash
cd web && npm run ci:check
```

If `ci:check` is missing, reproduce CI steps **literally** from the workflow file in order.

**Forbidden substitutions without explicit user approval:**

| Wrong | Why |
|-------|-----|
| `health:check` when CI runs full `test:e2e` | Different e2e scope |
| `test:e2e -- release-gates` when CI runs all specs | Misses failing tests |
| `lint` only | Skips build/e2e |
| Partial Playwright project when CI runs all projects | False green |

## Phase C — Remote verification (required after push/merge)

When the user requested push, merge, or deploy:

1. After push, fetch GitHub Actions conclusion for the commit SHA:
   - `gh run list --branch <branch> --limit 3` **or**
   - GitHub API / Actions UI for `conclusion: success`
2. Do **not** claim "CI passed" until remote `conclusion` is `success` for the relevant workflow on **that commit**.
3. If Vercel (or other deploy) is linked to GitHub checks, verify deploy check separately:
   - Vercel build success ≠ GitHub CI success
   - GitHub CI failure can block Vercel even when a prior Vercel build log looked fine
4. Report evidence as links or API fields: run URL, commit SHA, workflow name, conclusion.

If remote checks cannot be queried (no `gh`, no network), say so and label status **"local pass only — remote unverified."**

## Phase D — Completion language (strict)

**Allowed when local ci:check passes, push not requested:**

> "Local CI parity bundle passed (`npm run ci:check`). Remote CI not run."

**Allowed when remote success confirmed:**

> "GitHub Actions run #N on commit `<sha>`: `conclusion: success` — [link]"

**Forbidden:**

- "CI is green" after only local `health:check`
- "Deployed successfully" from local build logs alone
- "All tests pass" when only release-gates ran but CI runs full suite (unless CI was aligned)
- "Merged and fixed" without verifying the post-merge Actions run

## Failure mode

Block completion with `SENIOR_DEV_REMOTE_VERIFICATION_MISSING` when:

- User asked for push/merge/deploy fix and remote conclusion was not checked, or
- Local command did not match CI workflow and user did not approve the narrower scope

## Growrixos reference

| Script | Scope |
|--------|--------|
| `npm run ci:check` | Matches `.github/workflows/ci.yml` lint-and-build job |
| `npm run health:check` | Same as `ci:check` in `web/` (alias) |
| `npm run test:e2e` (no args) | Full Playwright suite — **not** CI gate unless workflow says so |

When changing CI scope, update **both** `.github/workflows/ci.yml` and `web/package.json` `ci:check` in the same commit.
