# Storage Media Search Integration

Document status: integration contract
Owner: Catalog, media, search

## Purpose

Define media storage, digital asset delivery, and search index integration.

## Storage Requirements

- Product images and videos.
- Brand/category media.
- Blog and CMS media.
- Review images where supported.
- Digital download files.
- Invoices and export files where applicable.

## Providers

- Cloudinary for image/video optimization.
- S3-compatible object storage for durable files and downloads.
- Algolia or Meilisearch for search and facets.

## Media Rules

- Public media requires alt text and optimized sizes.
- Private digital assets require signed URLs or entitlement checks.
- Admin uploads require validation for file type, size, and scan policy.
- Deleted products should not orphan uncontrolled storage assets.

## Search Rules

- Search index updates should be event-driven from catalog changes.
- Public search must exclude draft, archived, hidden, or restricted products.
- Index records should include only needed public data.
- Search provider failures should degrade to catalog fallback where feasible.

## Acceptance Criteria

- Media renders fast and accessibly.
- Digital downloads are protected by entitlement.
- Search stays consistent with catalog lifecycle status.
