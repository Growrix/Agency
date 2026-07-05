# Commerce Catalog Schema

Document status: database contract
Owner: Data and catalog

## Purpose

Define catalog tables and relationships for products, categories, brands, collections, variants, media, and SEO.

## Core Tables

| Table | Purpose | Key fields |
| --- | --- | --- |
| `products` | Parent product record | id, title, slug, status, type, description, brandId, seo fields |
| `product_variants` | Purchasable SKU | id, productId, sku, title, price, compareAtPrice, taxClass, weight, status |
| `categories` | Hierarchical taxonomy | id, parentId, name, slug, description, seo fields |
| `brands` | Brand taxonomy | id, name, slug, description, logoMediaId |
| `collections` | Curated groups | id, title, slug, ruleType, status |
| `product_media` | Images/videos | id, productId, variantId, mediaUrl, altText, sortOrder |
| `product_tags` | Discovery labels | id, name, slug |

## Catalog Rules

- Product slugs must be unique among active products.
- Variants carry SKU, price, and inventory linkage.
- Products can be draft, active, archived, or discontinued.
- Media requires alt text for accessibility.
- SEO fields must be editable without changing product title.

## Search Index Inputs

- Product title, description, tags, category, brand, variant attributes.
- Price range, availability, rating, sales rank, created date.
- Promotion flags such as featured, new arrival, best seller, deal.

## Acceptance Criteria

- Catalog data supports listings, filters, product detail, recommendations, and admin editing.
- Variant-level pricing and inventory are not lost under product-level simplification.
- SEO and accessibility fields are first-class catalog data.
