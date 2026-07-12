# Catalog Search Admin Detailed Contracts

Document status: active API implementation contract
Owner: Catalog, admin, search, inventory, QA

## Purpose

Define detailed API contracts for product discovery, product detail, search, reviews, admin product management, inventory adjustment, and coupon management.

## Public Catalog Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/products` | Product listing with filters, sort, pagination. |
| GET | `/api/v1/products/:slug` | Product detail page data. |
| GET | `/api/v1/categories/:slug` | Category page and filters. |
| GET | `/api/v1/search` | Search results and facets. |
| GET | `/api/v1/products/:id/reviews` | Public approved reviews. |
| POST | `/api/v1/products/:id/reviews` | Customer review when eligible. |

## Product Listing Response
```json
{
  "data": {
    "items": [
      {
        "id": "prod_123",
        "slug": "premium-template",
        "title": "Premium Template",
        "summary": "A conversion-focused ecommerce template.",
        "priceRange": {
          "min": 9900,
          "max": 19900,
          "currency": "USD"
        },
        "primaryImage": {
          "url": "/media/prod_123.jpg",
          "alt": "Premium Template preview"
        },
        "ratingAverage": 4.8,
        "reviewCount": 24,
        "badges": ["best_seller"],
        "availability": "available"
      }
    ],
    "facets": {
      "category": [{ "value": "templates", "count": 12 }],
      "price": [{ "min": 0, "max": 10000, "count": 4 }]
    },
    "pagination": {
      "page": 1,
      "pageSize": 24,
      "total": 120
    }
  },
  "meta": {},
  "error": null
}
```

## Product Detail Response

Required fields:
- Product identity, slug, title, description, SEO metadata.
- Variant list with SKU, price, currency, availability, options, inventory policy.
- Media gallery with alt text.
- Category/collection breadcrumbs.
- Reviews summary and approved review preview.
- Related products/recommendations.
- Fulfillment policy by product type.
- Purchase eligibility and blocking messages.

## Admin Product Endpoints

| Method | Path | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/api/v1/admin/products` | `products.manage` | Search/filter admin product list. |
| POST | `/api/v1/admin/products` | `products.manage` | Create product. |
| PATCH | `/api/v1/admin/products/:id` | `products.manage` | Update product. |
| POST | `/api/v1/admin/products/:id/archive` | `products.manage` | Archive product. |
| POST | `/api/v1/admin/products/:id/variants` | `products.manage` | Create variant. |
| PATCH | `/api/v1/admin/variants/:id` | `products.manage` | Update variant. |
| PATCH | `/api/v1/admin/inventory/:variantId` | `inventory.adjust` | Adjust stock with reason. |
| POST | `/api/v1/admin/coupons` | `settings.manage` | Create coupon. |
| PATCH | `/api/v1/admin/coupons/:id` | `settings.manage` | Update coupon. |
| GET | `/api/v1/admin/reviews` | `products.manage` | Review moderation queue. |
| PATCH | `/api/v1/admin/reviews/:id` | `products.manage` | Approve/reject review. |

## Admin Product Create Request
```json
{
  "title": "Premium Template",
  "slug": "premium-template",
  "description": "Long product description.",
  "status": "draft",
  "productType": "digital",
  "categoryIds": ["cat_templates"],
  "seoTitle": "Premium Template",
  "seoDescription": "Launch faster with a polished template.",
  "variants": [
    {
      "sku": "TPL-PREMIUM-COMMERCIAL",
      "title": "Commercial License",
      "price": 9900,
      "currency": "USD",
      "requiresShipping": false,
      "inventoryManaged": false,
      "status": "active"
    }
  ]
}
```

Rules:
- Published products require valid slug, title, variant, price, media policy, and SEO metadata.
- SKU and public slug uniqueness conflicts return `409`.
- Archived products remain visible to historical order snapshots but not public listings.

## Inventory Adjustment Request
```json
{
  "warehouseId": "wh_123",
  "delta": 10,
  "reason": "Stock received from supplier PO-1001"
}
```

Rules:
- Requires actor, reason, and audit log.
- Cannot reduce available stock below zero unless damaged/loss policy explicitly allows correction.
- Low-stock alerts update after adjustment.

## Coupon Create Request
```json
{
  "code": "WELCOME10",
  "type": "percent",
  "value": 10,
  "startsAt": "2026-07-12T00:00:00Z",
  "endsAt": "2026-08-12T00:00:00Z",
  "usageLimit": 1000,
  "perCustomerLimit": 1,
  "eligibility": {
    "firstPurchaseOnly": true,
    "productIds": [],
    "categoryIds": []
  },
  "stackingPolicy": "exclusive"
}
```

## Review Moderation Rules

- Customers can review only when product/order eligibility allows it.
- New reviews enter `pending` unless auto-approval policy is active.
- Admin moderation writes audit logs.
- Rejected reviews are not public but remain available to moderation history.

## Search Rules

- Public search returns only published products.
- Facets must match applied filters.
- Search index failures fall back to safe database search when configured.
- Reindex jobs must be observable and retryable.

## Acceptance Criteria

- Public catalog screens and admin product/inventory/coupon/review screens can be built from these contracts.
- Product, variant, inventory, coupon, and review mutations are permissioned, validated, and audit logged.
- Search behavior includes fallback and stale-index recovery expectations.
