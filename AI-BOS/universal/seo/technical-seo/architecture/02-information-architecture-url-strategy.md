# Information Architecture And URL Strategy

Document status: active module

## Purpose

Define how content is organized and how URLs represent that organization.

## Scope

Covers URL naming, hierarchy, slugs, route groups, query parameters, trailing slash policy, lowercase rules, migrations, and route ownership.

## Business Value

Clear URLs improve user trust, search understanding, analytics reporting, redirect management, and migration safety.

## Dependencies

- `architecture/01-site-architecture.md`
- `security-http/02-redirects-error-handling.md`
- `on-page/03-canonicals-indexability.md`

## Concepts

- A URL is a stable address for a resource.
- Slugs should be readable, durable, lowercase, and hyphen-separated.
- Query parameters should not create unlimited indexable duplicates.

## Architecture

Preferred pattern:

```text
/{primary-section}/{subcategory-or-context}/{resource-slug}
```

Use shorter routes when hierarchy does not add meaning.

## Best Practices

- Use one canonical URL per resource.
- Keep URLs lowercase and avoid unnecessary dates, IDs, or stop words.
- Document trailing slash, locale, and parameter policies.
- Preserve old URLs with redirects during migrations.

## Common Mistakes

- Changing URLs for cosmetic reasons.
- Allowing both query and path versions to index.
- Mixing singular and plural route names without rules.
- Publishing CMS preview or draft URLs.

## Validation Rules

- Every public route type must define canonical URL format.
- Redirects must exist for replaced URLs.
- Parameterized URLs must have index/canonical rules.

## Testing Strategy

Crawl URL variants, test lowercase and trailing slash behavior, review redirect chains, and inspect canonical tags for representative routes.

## Monitoring

Monitor 404 spikes, redirect chains, duplicate indexed URL patterns, and unexpected parameter indexing.

## Maintenance

Maintain a URL registry for high-value routes and update it before route migrations.

## Future Enhancements

- Add route ownership metadata and automated URL linting.
- Add migration diff templates for URL changes.

## Related Documents

- `security-http/02-redirects-error-handling.md`
- `on-page/06-pagination-faceted-search.md`
- `templates/03-implementation-brief-template.md`

## References

- Google URL structure guidance.
- RFC 3986 URI syntax.
