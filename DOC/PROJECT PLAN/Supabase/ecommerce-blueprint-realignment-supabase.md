# Ecommerce Blueprint Realignment Supabase Plan

## Purpose
Finalize Supabase transactional ownership and migration posture for ecommerce blueprint closure.

## Current State
- Supabase integration exists with mixed transactional maturity and fallback patterns.
- Blueprint closure requires stronger confidence in normalized transactional persistence.

## Gap Priorities
1. Transactional schema closure
- Verify required ecommerce entities are represented and production-safe (orders, items, payments, inventory, downloads, licenses, support records).

2. Migration execution governance
- Ensure migration runner usage and verification are deterministic and documented.
- Track operator-run migration evidence and post-migration checks.

3. Fallback policy hardening
- Maintain fail-closed production posture.
- Constrain emergency fallback usage and reconciliation runbook.

4. Data integrity and ownership
- Ensure service-role-only writes and ownership-enforced reads.
- Ensure no critical transactional path remains ambiguous under app_state fallback.

## Reuse Targets
- Existing schema.sql, migration runner, store adapters, and runtime config.

## Deliverables
- Supabase parity checklist mapped to blueprint phases 3,6,8,9,10.
- Migration and verification runbook with evidence expectations.
- Risk register for deferred transactional migrations.

## Exit Criteria
- Transactional ecommerce flows have explicit, verified Supabase ownership.
- Production persistence behavior is deterministic with documented recovery paths.
