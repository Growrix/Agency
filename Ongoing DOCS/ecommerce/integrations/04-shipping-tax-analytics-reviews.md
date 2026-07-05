# Shipping Tax Analytics Reviews Integration

Document status: integration contract
Owner: Fulfillment, finance, analytics, trust

## Purpose

Define integrations for shipping, tax, analytics, and external review systems.

## Shipping

- Providers may include Shippo, EasyPost, carrier APIs, or manual shipping rules.
- Required behavior includes rates, labels, tracking, delivery updates, and pickup where configured.
- Shipping provider failures must not create paid orders with impossible fulfillment promises.

## Tax

- Tax providers calculate address and product tax class based totals.
- Provider failures require clear fallback policy.
- Tax calculation result is stored on order snapshots.

## Analytics

- GA4, PostHog, Plausible, or equivalent can receive sanitized events.
- Server-side events are required for order and payment milestones.
- Client events must respect consent policy.

## Reviews

- Google Reviews or external review embeds can support trust.
- Internal product reviews remain the primary product-rating source where implemented.
- External review widgets must not block core product or checkout rendering.

## Acceptance Criteria

- Shipping, tax, analytics, and reviews have failure and fallback rules.
- Provider data is reconciled into internal records where business-critical.
- Customer privacy and consent are respected for analytics and review tooling.
