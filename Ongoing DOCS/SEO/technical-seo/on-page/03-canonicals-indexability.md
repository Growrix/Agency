# Canonicals And Indexability

Document status: active module

## Purpose

Define how preferred URLs and index eligibility are controlled.

## Scope

Covers canonical tags, noindex, duplicate URLs, parameter URLs, content variants, pagination, faceted navigation, staging environments, and private routes.

## Business Value

Clear canonical and indexability rules protect crawl budget, reduce duplicate content, and help search engines select the intended ranking URL.

## Dependencies

- `architecture/02-information-architecture-url-strategy.md`
- `on-page/04-crawlability-robots-sitemaps.md`
- `on-page/06-pagination-faceted-search.md`

## Concepts

- Canonical is a hint for preferred URL selection.
- Noindex is a stronger route-level indexing control.
- Robots blocking and noindex are not interchangeable.

## Architecture

Every route type should define:

- Indexable or noindex.
- Self-canonical or canonical target.
- Sitemap inclusion or exclusion.
- Internal-link policy.

## Best Practices

- Use self-canonicals for normal indexable pages.
- Use noindex for low-value search, filter, account, admin, and staging pages.
- Do not canonicalize fundamentally different content to one page.
- Keep canonical, sitemap, internal links, and redirects aligned.

## Common Mistakes

- Canonicalizing pages while still linking heavily to non-canonical variants.
- Blocking noindex pages in robots before crawlers can see noindex.
- Including noindex URLs in XML sitemaps.
- Using canonicals to solve every duplicate caused by bad URL design.

## Validation Rules

- One canonical URL per indexable page.
- Noindex URLs must be excluded from XML sitemaps.
- Canonical targets must return 200 and be indexable.

## Testing Strategy

Crawl canonical tags, compare sitemap inclusion, inspect noindex routes, test parameter variants, and inspect Search Console canonical selections.

## Monitoring

Monitor duplicate content, alternate canonical selections, indexed noindex pages, and excluded pages that should be indexed.

## Maintenance

Review canonical/index rules whenever route, filter, pagination, localization, or CMS behavior changes.

## Future Enhancements

- Add route-level indexability matrix.
- Add canonical consistency tests in CI.

## Related Documents

- `on-page/04-crawlability-robots-sitemaps.md`
- `on-page/06-pagination-faceted-search.md`
- `security-http/02-redirects-error-handling.md`

## References

- Google canonicalization documentation.
- Google robots meta documentation.
