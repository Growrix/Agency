# Validation Report

Date: 2026-05-24

## Commands Executed
- npm run generate:snapshots
- npm run lint
- npm run build
- npm run dev -- --port 3100
- npm run qa:runtime
- PARITY_THRESHOLD=0.03 npm run qa:parity
- Canonical route smoke checks via Invoke-WebRequest against localhost:3100
- .html alias redirect checks via Invoke-WebRequest against localhost:3100
- VS Code Problems check for FRONTEND DEV/Lumoria via get_errors

## Results
- Lint: PASS
- Build: PASS
- Dev startup: PASS (server responding on localhost:3100)
- VS Code Problems: 0
- Canonical route status checks:
  - 22 routes return 200
  - /404 returns 404
- .html alias checks:
  - /index.html and all mapped route aliases return 308 to canonical routes
- Source-domain link checks in src runtime code: none detected
- Purity search checks in src runtime code: no HTML parser, dangerous HTML injection, or HTML file-read runtime usage detected
- Runtime matrix (qa:runtime): PASS
  - 23/23 routes pass expected status, console, page-error, and axe serious-critical checks
  - Artifact: DOC/migration/phase1.4/artifacts/runtime-matrix/runtime-summary.md
- Visual parity (qa:parity): FAIL
  - 46/46 checks fail PARITY_THRESHOLD=0.03
  - Worst observed ratio: 0.701331 on /404 (desktop)
  - Best observed ratio: 0.073690 on /pricing-plan (mobile)
  - Artifact: DOC/migration/phase1.4/artifacts/parity-live/parity-summary.md

## Remaining Validation Gaps
- Visual parity remains out of threshold on all desktop and mobile checks and requires major UI fidelity rework
- Live source baseline appears materially divergent from route-specific local snapshots in overall page-height/structure, leaving parity blocked under the non-negotiable 0.03 threshold.

## Status
- Phase 1.4 validation gate: PARTIAL (technical, purity, runtime, accessibility, and console checks pass; parity gate fails)
