# Product Detail Reviews Wishlist

Document status: frontend source
Owner: Frontend, catalog, CX

## Purpose

Define product detail page behavior, review UX, wishlist, compare, Q&A, and related-product experiences.

## Product Detail Requirements

- Product title, images/videos, price, variant selectors, stock status, shipping estimate, and primary CTA.
- Product description, specifications, includes, usage guidance, and SEO content.
- Reviews summary, ratings distribution, review list, and review submission path.
- Questions and answers.
- Wishlist, compare, share, and recently viewed actions.
- Related products, bundles, frequently bought together, and recommendations.

## Variant Rules

- Variant selection must update price, media, SKU, availability, shipping constraints, and add-to-cart eligibility.
- Invalid variant combinations should be prevented or clearly explained.
- Low-stock and out-of-stock states should be visible before add to cart.

## Review Rules

- Review submission requires authentication or verified purchase policy.
- Reviews can include rating, text, images, helpful votes, and moderation status.
- Moderated or rejected reviews should not appear publicly.

## Wishlist And Compare

- Guests may use local wishlist where allowed, but account sync requires login.
- Compare should limit the number of selected products and show variant-aware attributes.

## Acceptance Criteria

- PDP can support physical, digital, service, bundle, and subscription products.
- Variant, stock, price, and CTA state remain consistent.
- Reviews and Q&A are permissioned, moderated, and accessible.
