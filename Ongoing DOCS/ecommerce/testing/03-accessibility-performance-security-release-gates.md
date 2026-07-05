# Accessibility Performance Security Release Gates

Document status: release gate source
Owner: QA, security, frontend, DevOps

## Purpose

Define non-functional checks that must pass before ecommerce production release.

## Accessibility Gates

- WCAG AA target for public, checkout, customer, and admin critical flows.
- Keyboard navigation for menus, filters, modals, cart, checkout, admin tables.
- Visible focus states.
- Form labels and error associations.
- Color contrast and reduced-motion support.

## Performance Gates

- Core Web Vitals for home, category, search, PDP, cart, checkout.
- Image optimization and layout stability.
- Search latency targets.
- Checkout API latency and error rate monitoring.
- Bundle and third-party script review.

## Security Gates

- Auth/session tests.
- Authorization and ownership tests.
- Webhook signature tests.
- Input validation and rate-limit checks.
- Secret scanning.
- Dependency vulnerability review.

## Release Gates

- No critical or high security findings unresolved.
- Payment sandbox and webhook smoke tests pass.
- Admin critical mutations are audit logged.
- Monitoring and rollback are ready.

## Acceptance Criteria

- Release cannot proceed with critical accessibility, security, checkout, payment, or data integrity failures.
- Non-functional checks are tied to commands or documented manual gates.
- Known risks have owner, severity, and mitigation.
