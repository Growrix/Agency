# Product Catalog Service

Document status: backend contract
Owner: Catalog backend

## Purpose

Define product, variant, category, brand, collection, media, SEO, and recommendation responsibilities.

## Responsibilities

- Product CRUD.
- Variant management.
- Media and alt text management.
- Category, subcategory, brand, collection, tag management.
- Product lifecycle status.
- Pricing inputs and tax class metadata.
- SEO fields and structured data inputs.
- Related products and recommendation inputs.
- Search indexing events.

## Rules

- Draft products are not public.
- Public product payloads must exclude internal cost and admin-only metadata.
- Variant changes that affect active carts require cart recalculation.
- Media requires alt text and stable ordering.
- Slug changes require redirect or canonical handling.

## Events

- `catalog.product.created`
- `catalog.product.updated`
- `catalog.variant.updated`
- `catalog.category.updated`
- `catalog.media.updated`
- `catalog.search_reindex.requested`

## Acceptance Criteria

- Catalog supports public browsing and admin management.
- Variant-level price, SKU, availability inputs, and media work correctly.
- Search and recommendations can consume catalog events.
