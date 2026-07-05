# Marketplace Vs Single Vendor

Document status: decision source
Owner: Product and architecture

## Purpose

Decide the initial vendor model and preserve a future path to marketplace functionality without overbuilding the first release.

## Current Decision

Launch as a single-vendor ecommerce platform.

## Rationale

- Faster launch with simpler catalog, payout, tax, shipping, and support ownership.
- Lower operational risk because the store owner controls product quality and fulfillment.
- Cleaner customer experience for order status, returns, refunds, and support.
- Marketplace concepts can be reserved in the data model without exposing vendor onboarding yet.

## Future Marketplace Path

The platform may later support:

- Vendor profiles and onboarding.
- Vendor-owned products and inventory.
- Vendor payout accounts and settlement reporting.
- Commission rules and platform fees.
- Vendor dashboards, moderation, and SLA enforcement.
- Multi-vendor carts, shipping splits, returns, and dispute handling.

## Business Rules

- Version 1 orders have one merchant of record.
- Version 1 refunds, returns, shipping, and support are owned by the store operator.
- Product records should not hardcode assumptions that prevent future vendor ownership.
- Payouts are out of scope until marketplace mode is approved.

## Data Implications

- Product and order schemas may include nullable future `vendorId` fields only if implementation benefits from it.
- Do not implement commission tables, payout ledgers, vendor KYC, or vendor settlement until marketplace work starts.
- Audit logs must capture admin actions even before vendor actions exist.

## Frontend Implications

- Storefront should present one trusted brand experience.
- Product pages do not need seller cards in version 1.
- Admin navigation should avoid vendor management until the marketplace phase is active.

## Backend Implications

- Services should keep merchant policy logic centralized.
- Shipping and tax calculations should assume one seller in version 1.
- Future marketplace work must introduce vendor boundaries through explicit contracts, not hidden branching.

## Acceptance Criteria

- Version 1 scope is single vendor.
- Future marketplace expansion points are documented but not implemented prematurely.
- No customer-facing marketplace terminology appears before the business approves it.
