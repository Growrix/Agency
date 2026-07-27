# Internal Linking And Navigation

Document status: active module

## Purpose

Define how internal links and navigation support discovery, relevance, crawl paths, and conversion.

## Scope

Covers global navigation, breadcrumbs, contextual links, related content, footer links, pagination links, faceted links, and anchor text.

## Business Value

Effective internal linking improves crawl discovery, authority flow, user navigation, and search understanding of page relationships.

## Dependencies

- `architecture/01-site-architecture.md`
- `on-page/02-structured-data-schema.md`
- `on-page/06-pagination-faceted-search.md`

## Concepts

- Internal links are crawl paths and relevance signals.
- Navigation should expose high-value sections without overwhelming users.
- Breadcrumbs support both users and structured data.

## Architecture

Link systems should include global links, local section links, contextual body links, breadcrumbs, related pages, and sitemap support.

## Best Practices

- Link from hubs to important child pages and back where useful.
- Use descriptive anchor text.
- Keep breadcrumbs consistent with URL and information architecture.
- Ensure links are crawlable anchor elements for important routes.

## Common Mistakes

- Relying only on JavaScript click handlers for important links.
- Creating many footer links without hierarchy or intent.
- Using generic anchors like click here for important pages.
- Linking to non-canonical variants.

## Validation Rules

- Important indexable pages must have crawlable internal links.
- Breadcrumbs must match the page hierarchy.
- Internal links should point to canonical URLs.

## Testing Strategy

Crawl internal links, inspect anchor text, identify orphan pages, validate breadcrumbs, and compare internal links with sitemap URLs.

## Monitoring

Monitor orphan pages, crawl depth, broken internal links, and changes in internal link counts for high-value pages.

## Maintenance

Review internal linking after content launches, category changes, URL migrations, and navigation redesigns.

## Future Enhancements

- Add automated orphan-page detection.
- Add internal-link opportunity reports by topic cluster.

## Related Documents

- `architecture/01-site-architecture.md`
- `on-page/02-structured-data-schema.md`
- `testing-auditing/02-audit-playbook.md`

## References

- Google link best practices.
- Breadcrumb structured data documentation.
