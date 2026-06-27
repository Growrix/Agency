# Pre-Push Check

Run **before any `git push`** that includes `web/` changes. Matches GitHub Actions `lint-and-build` exactly.

## Command (from repo root)

```bash
npm run ci:check --prefix web
```

PowerShell wrapper (repo root):

```powershell
./web/scripts/verify-ci-parity.ps1
```

## Pass criteria

- Exit code **0**
- Lint, typecheck, perf budgets, unit/integration tests, production build, and release-gates E2E all pass

## After push (remote verification)

GitHub CLI on Windows (if not on PATH):

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" run list --repo Growrix/Agency --branch main --limit 1
```

Requires one-time `gh auth login` in your terminal. Without auth, rely on the GitHub Actions UI.

## Rules

- **Never push** if local `ci:check` fails — CI will fail the same way in ~1–2 minutes on lint/typecheck errors
- Mid-phase edits may use narrow checks (`lint` + `typecheck` only); **push always requires full `ci:check`**
- Do not substitute `health:check` run from `web/` cwd only — use `--prefix web` from repo root to mirror CI
