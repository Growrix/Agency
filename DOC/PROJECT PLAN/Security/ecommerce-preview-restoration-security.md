# Ecommerce Preview Restoration Security Plan

## Purpose
Define security posture and compensating controls after accepting full public template previews.

## Policy Decision
- Public preview copy risk is explicitly accepted by business decision.
- Security enforcement focus shifts to paid-delivery boundaries and forensic traceability.

## Scope
- In scope:
  - Preview policy risk acceptance documentation.
  - Paid asset protection controls.
  - Abuse detection and response model.
- Out of scope:
  - Impossible browser-level screenshot/save-as prevention.

## Threat Update
- Accepted risk:
  - Public preview HTML can be copied, saved, inspected, and reconstructed.
- Protected risk:
  - Paid assets must not be retrievable without entitlement and short-lived signed grant.

## Required Security Controls (Must Keep)
1. Signed grant token issuance for authorized downloads.
2. Grant redemption validation with ownership checks.
3. Grant TTL, jti tracking, and redemption throttling.
4. Rejected-grant audit events with request context.
5. Asset fingerprint propagation for attribution.
6. Private storage boundary for paid deliverables.

## Compensating Controls For Public Preview
- Keep noindex/nofollow and basic response hardening where compatible.
- Keep direct static preview path blocking if API-delivered preview remains canonical.
- Maintain legal/takedown process and operator escalation workflow.
- Continue monitoring for suspicious automated access patterns.

## Security Testing Impact
- Update integration tests to align with full-preview mode.
- Preserve security regression tests for download grant misuse handling.
- Keep release gate requirement: no regression in entitlement controls.

## Compliance Notes
- This policy does not alter PCI/GDPR obligations on transactional data.
- Customer and payment data protections remain unchanged.

## Exit Criteria
- Security docs explicitly separate accepted preview exposure from protected paid-delivery surfaces.
- Compensating controls and escalation ownership are documented and testable.
