# Storefront And Navigation

Document status: frontend source
Owner: Frontend architecture

## Purpose

Define the storefront shell, navigation model, route families, and responsive behavior.

## Route Families

- `/` home.
- `/products`, `/products/[slug]`.
- `/categories/[slug]`, `/brands/[slug]`, `/collections/[slug]`.
- `/deals`, `/best-sellers`, `/new-arrivals`, `/trending`, `/featured`.
- `/search`.
- `/cart`, `/checkout`, `/checkout/success`, `/checkout/failed`.
- `/account/*` customer dashboard.
- `/admin/*` admin dashboard.
- Public support and policy pages.

## Shell Requirements

- Header with logo, search, category navigation, cart, account, and support access.
- Mobile navigation optimized for thumb reach and fast product discovery.
- Persistent cart access with accurate item count.
- Footer with policy, support, social, newsletter, and trust links.
- Skip links, focus states, keyboard navigation, and semantic landmarks.

## State Rules

- Cart state is hydrated from server data and reconciled after mutations.
- Auth state should not expose protected UI until session is verified.
- Search state must be shareable through URL parameters.
- Navigation should degrade when personalization, search, or recommendations are unavailable.

## Performance Rules

- Prioritize fast first render for home, category, search, and PDP routes.
- Lazy-load non-critical recommendations, reviews, and analytics scripts.
- Avoid layout shift for cart badges, media, filters, and product cards.

## Acceptance Criteria

- Navigation supports public, customer, and admin journeys without mixing permissions.
- Mobile and desktop routes expose the same core commerce capabilities.
- The shell remains accessible with keyboard and screen reader navigation.
