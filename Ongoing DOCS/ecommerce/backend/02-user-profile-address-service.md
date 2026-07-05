# User Profile Address Service

Document status: backend contract
Owner: Customer backend

## Purpose

Define business data around customer profiles, addresses, preferences, and support identity. Credential behavior remains in `auth/`.

## Responsibilities

- Customer profile read/update.
- Address CRUD with billing and shipping defaults.
- Communication preferences and consent.
- Customer support profile context.
- Store credit, rewards, referral, and loyalty summary reads.
- Account export/anonymization coordination with privacy policy.

## Rules

- Customers can only mutate their own profile and addresses.
- Address validation must support checkout and saved-address workflows.
- Default billing and shipping address rules must be deterministic.
- Profile updates should not alter auth credentials without auth service flows.
- Consent changes require history when marketing or compliance requires it.

## Events

- `customer.profile.updated`
- `customer.address.created`
- `customer.address.updated`
- `customer.preferences.updated`
- `customer.data_export.requested`

## Acceptance Criteria

- Customer data changes are ownership-protected.
- Checkout can reuse validated customer addresses.
- Support can access safe customer context without exposing secrets.
