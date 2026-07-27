# Metadata

Document status: active module

## Purpose

Define metadata requirements for public routes and templates.

## Scope

Covers title tags, meta descriptions, robots meta, Open Graph, Twitter cards, canonical links, alternates, and Next.js metadata generation.

## Business Value

Accurate metadata improves search result presentation, social sharing, index control, and route clarity.

## Dependencies

- `architecture/03-nextjs-rendering-strategy.md`
- `on-page/03-canonicals-indexability.md`
- `on-page/02-structured-data-schema.md`

## Concepts

- Metadata should be generated from reliable content fields.
- Every indexable route needs unique, accurate metadata.
- Social metadata should match the page promise and visible content.

## Architecture

Metadata should be defined at route template level with content-driven overrides for dynamic pages.

## Best Practices

- Keep titles unique and descriptive.
- Write meta descriptions for conversion and clarity, not keyword stuffing.
- Use robots meta only when route-level index control is needed.
- Keep canonical and alternate signals consistent.

## Common Mistakes

- Duplicate titles across templates.
- Missing metadata on dynamic routes.
- Metadata that promises content not visible on the page.
- Conflicting robots, canonical, and sitemap signals.

## Validation Rules

- Every indexable route must have title, description, canonical, and social metadata.
- Noindex routes must not appear in XML sitemaps.
- Metadata must render in the final HTML for representative routes.

## Testing Strategy

Inspect rendered HTML, crawl titles/descriptions, validate social previews, and test dynamic metadata for sample routes.

## Monitoring

Monitor duplicate metadata, missing metadata, low CTR pages, and search result mismatches.

## Maintenance

Update metadata rules when content models or route templates change.

## Future Enhancements

- Add title/description length and uniqueness linting.
- Add CMS field requirements for SEO metadata.

## Related Documents

- `on-page/02-structured-data-schema.md`
- `on-page/03-canonicals-indexability.md`
- `templates/03-implementation-brief-template.md`

## References

- Google title link documentation.
- Next.js Metadata API documentation.
