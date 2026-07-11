# Ecommerce Blueprint Realignment Security Plan

## Purpose
Close unresolved security gaps on ecommerce-critical surfaces while preserving accepted preview policy decisions.

## Current Security Baseline
- Strong controls already exist for signed paid-delivery, audit trails, and selected abuse controls.
- Remaining gaps are concentrated around phase-complete authorization, payment/webhook/fraud closure, and admin mutation governance.

## Scope
- In scope:
  - authz ownership closure
  - payment/webhook/fraud controls
  - admin mutation and export safeguards
  - support/account request privacy boundaries
- Out of scope:
  - changing accepted public preview copy risk posture

## Gap Priorities
1. Auth/session/permission hardening
- Eliminate ambiguous fallback privilege paths.
- Strengthen role-policy checks on high-risk mutations.

2. Payment and webhook trust model
- Signature verification, replay protection, mismatch alerts, and fraud flags.
- Distinguish recoverable vs suspicious vs blocking payment states.

3. Admin and support data protection
- Guard customer exports, role edits, and sensitive adjustment actions.
- Ensure customer-visible vs internal-only message visibility controls.

4. Audit and incident readiness
- Ensure critical actions produce immutable, queryable audit trails.
- Define takedown/escalation workflow for paid-asset misuse.

## Reuse Targets
- Existing download grant and rejection-audit controls.
- Existing API guard, validation, and observability modules.

## Deliverables
- Security closure checklist mapped to blueprint security docs.
- Control-to-surface matrix for payment/auth/customer/admin/webhooks.
- Incident and escalation runbook requirements for ecommerce launch.

## Exit Criteria
- No critical ecommerce surface remains without explicit mitigation or documented risk acceptance.
- Security gates are testable and launch-blocking when unmet.
