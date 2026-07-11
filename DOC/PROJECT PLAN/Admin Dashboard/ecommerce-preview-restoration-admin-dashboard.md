# Ecommerce Preview Restoration Admin Dashboard Plan

## Purpose
Define operator-side responsibilities after restoring full public preview, with focus on risk communication, incident response, and paid-delivery integrity.

## Scope
- No major admin IA replacement.
- Add policy and workflow alignment for:
  - preview-risk acceptance
  - leak response handling
  - entitlement and fulfillment checks

## Admin Ownership Areas
- Preview policy visibility:
  - Operators should have a documented policy that public previews are intentionally full and copyable.
- Incident response intake:
  - Capture suspected unauthorized redistribution reports.
- Paid entitlement verification:
  - Use admin downloads/licenses/orders surfaces to validate purchaser entitlement and delivery history.

## Workflow Updates
1. Add operations runbook references for preview-copy risk acceptance and customer communication.
2. Maintain download/audit investigation path in admin operations:
  - order -> download record -> grant logs -> fingerprint metadata.
3. Ensure support and admin teams do not promise impossible controls like screenshot prevention.

## Reuse Targets
- Existing admin endpoints and pages for orders, downloads, licenses, leads, analytics, and notifications.
- Existing audit log usage from download grant flows.

## Security Coordination
- Admin operators follow Security role doc for:
  - takedown process
  - abuse escalation
  - legal/traceability workflow

## Exit Criteria
- Admin operation docs and tracker reflect full-preview policy.
- Teams can investigate paid-asset misuse using existing admin records and audit metadata.
