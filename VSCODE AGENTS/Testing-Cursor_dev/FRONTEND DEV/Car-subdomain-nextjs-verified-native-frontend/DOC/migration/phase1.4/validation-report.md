# Validation Report

Generated: 2026-05-23

Status: completed.

## Gates
- Lint: `npm run lint -- --max-warnings 0`
- Typecheck: `npm run typecheck`
- Build: `npm run build -- --webpack` (fallback mode)
- Dev startup: `npm run dev -- --port 3103`
- QA suite: `npm run qa:native`
- VS Code Problems: `get_errors` workspace scan

## Current Results Snapshot
- Lint: passed (`npm run lint -- --max-warnings 0`).
- Typecheck: passed (`npm run typecheck`).
- Build: passed in webpack mode (`npm run build -- --webpack`) after Turbopack stalling in this environment.
- Dev startup: validated at `http://localhost:3103`.
- QA: passed (`npm run qa:native`).
- VS Code Problems: no errors found in project scan.

## QA Summary (Final)
- Route ownership checks: 32 canonical routes validated.
- Legacy redirect checks: 10 aliases validated.
- Runtime checks: 32 routes scanned for console/request failures.
- Form contract checks: contact and appointment validated.
- Visual parity checks: 64 screenshots compared.
- Parity max diff ratio: 0.2108 (threshold 0.22).
- Parity avg diff ratio: 0.0676.

All native frontend QA checks passed.
