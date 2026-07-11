# Visual Parity Report

Generated: 2026-05-23

Status: completed.

## Scope
- Compare source baseline (`../Car-subdomain/public/*.html`) vs canonical Next routes.
- Viewports:
  - desktop: 1440x900
  - mobile: iPhone 12 profile
- Artifacts path: `qa-artifacts/parity/{desktop|mobile}`

## Expected Metrics
- Route screenshot pairs: 32 routes x 2 viewports = 64 pairs
- Diff threshold: 0.22 (`PARITY_THRESHOLD`)

## Notes
- Final execution: `npm run qa:native`
- Result: passed
- Measured max diff ratio: 0.2108
- Measured avg diff ratio: 0.0676
- Threshold: 0.22

Parity gate passed across all 32 canonical routes on desktop and mobile baselines.
