# Local Development Runbook

## Purpose
Describe the expected local execution posture for milestone-1 build work.

## Local Rules
- work only inside `BLOG-AUTOMATION/`
- keep milestone-1 scope narrow and complete
- validate typecheck/tests after each meaningful implementation slice

## Expected Local Services
- automation API
- SQLite database for local development
- optional Redis for queue simulation
- optional local n8n runtime

## Minimum Smoke Path
1. health route responds
2. keyword research route accepts a request
3. brief generation route returns a brief payload
4. quality gate route returns a pass/fail envelope
5. publish route resolves through the Sanity adapter contract

## Required Request Headers For Protected Routes
- `x-api-key`
- `x-correlation-id`
- `x-idempotency-key` for `POST` routes