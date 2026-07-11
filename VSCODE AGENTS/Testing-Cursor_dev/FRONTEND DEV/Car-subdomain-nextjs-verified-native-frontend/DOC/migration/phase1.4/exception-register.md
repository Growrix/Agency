# Exception Register

Generated: 2026-05-23

## Exception 1: Build Runner Mode
- Context: `next build` in Turbopack mode was slow/stalled in this environment during final validation runs.
- Resolution: Production build gate was validated with `npm run build -- --webpack`.
- Status: resolved.

## Exception 2: QA Source Port Contention
- Context: QA baseline source server port `3204` was occupied by stale process during rerun.
- Resolution: Freed port by terminating owning process, then reran QA.
- Status: resolved.

## Exception 3: First-Hit Route Compilation Timeout
- Context: Initial canonical route checks timed out in dev mode at prior 30s request timeout.
- Resolution: Added retry and configurable timeout (`QA_REQUEST_TIMEOUT_MS`, default 120000) in `scripts/qa-native-checks.mjs`.
- Status: resolved.
