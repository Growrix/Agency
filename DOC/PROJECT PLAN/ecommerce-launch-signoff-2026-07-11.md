# Ecommerce Launch Sign-Off Snapshot (2026-07-11)

## Scope
This snapshot captures T135 release evidence after P22 transactional and invoice parity work.

## Validation Evidence
- `npm --prefix web run typecheck`: pass
- `npm --prefix web run test:unit`: pass (includes `orders.test.ts` and `invoices.test.ts`)
- `npm --prefix web run test:integration`: pass (8/8)
- `npm --prefix web run health:check`: pass
  - lint pass
  - typecheck pass
  - perf budgets pass
  - unit pass
  - integration pass
  - build pass
  - release-gates e2e pass (8/8, desktop-chrome)

## Implemented In This Slice
- Checkout idempotency key dedupe and stock-aware oversell guard.
- Stripe webhook duplicate-event guard and refund analytics event.
- Invoice lifecycle implementation:
  - invoice schema types and storage collection
  - invoice domain (`create`, `send`, `mark paid`, `get by order`)
  - non-Stripe checkout auto-invoice issuance
  - admin invoice send endpoint
  - admin invoice mark-paid endpoint
  - admin order detail now includes invoice payload
  - invoice email sender and notification events (`invoice_sent`, `invoice_paid`)

## Launch Blockers (Open)
- Supabase normalized migration (`npm --prefix web run db:migrate`) is blocked in this environment because `SUPABASE_DB_URL` is missing.
- Final production launch sign-off remains blocked until migration evidence and production operator confirmations are complete.

## Required Operator Action
1. Export `SUPABASE_DB_URL` in secure terminal environment.
2. Run: `npm --prefix web run db:migrate`.
3. Record verification evidence for transactional tables and update tracker blocker status.
