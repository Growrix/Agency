# Product Catalog Search API

Document status: API contract
Owner: Catalog and search

## Purpose

Define APIs for product discovery, product detail, categories, brands, collections, search, filters, and recommendations.

## Public Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/products` | List products with filters, sorting, and pagination. |
| GET | `/api/v1/products/:slug` | Product detail by slug. |
| GET | `/api/v1/categories` | Category tree. |
| GET | `/api/v1/categories/:slug/products` | Products in category. |
| GET | `/api/v1/brands` | Brand list. |
| GET | `/api/v1/brands/:slug/products` | Products by brand. |
| GET | `/api/v1/collections/:slug` | Curated collection. |
| GET | `/api/v1/search` | Search products and suggestions. |
| GET | `/api/v1/recommendations` | Personalized or contextual recommendations. |

## Query Parameters

- `q` search query.
- `category`, `brand`, `collection`, `tag`.
- `minPrice`, `maxPrice`.
- `availability`.
- `rating`.
- `sort`.
- `page` and `limit` or cursor pagination.

## Response Requirements

- Product cards include title, slug, primary image, price range, rating, availability, badge, and variant summary.
- Product details include media, variants, inventory policy, reviews summary, Q&A summary, SEO fields, related products.
- Filter responses include available facets and counts where supported.

## Acceptance Criteria

- Listing, filtering, sorting, and search are stable under pagination.
- Product detail can render without extra waterfall requests for core content.
- Search endpoints never expose draft or archived products to public users.
