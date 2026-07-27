# Redirects And Error Handling

Document status: active module

## Purpose

Define how redirects and error pages should preserve SEO value, user trust, and crawler clarity.

## Scope

Covers 301, 302, 307, 308, 404, 410, 500, soft 404s, redirect chains, canonical host redirects, migration maps, and custom error pages.

## Business Value

Correct redirects preserve link equity and clean error handling prevents wasted crawl budget and poor user recovery.

## Dependencies

- `architecture/02-information-architecture-url-strategy.md`
- `architecture/04-migration-maintenance.md`
- `security-http/01-http-security-headers.md`

## Concepts

- Permanent changes need permanent redirects.
- Removed content may need 410 or a relevant replacement.
- Error pages should use accurate status codes.

## Architecture

Redirect logic should live in a documented layer such as CDN, hosting config, middleware, or application routing, with one source of truth for migration maps.

## Best Practices

- Redirect old valuable URLs to the closest relevant replacement.
- Avoid redirect chains and loops.
- Return 404 or 410 for unavailable content with useful recovery links.
- Keep custom error pages crawl-safe and user-helpful.

## Common Mistakes

- Redirecting all missing pages to the home page.
- Returning 200 on error pages.
- Creating multi-hop redirect chains.
- Forgetting redirects for renamed slugs.

## Validation Rules

- Redirect targets must return 200 and be relevant.
- Error pages must return correct status codes.
- Redirect maps must be tested before migrations launch.

## Testing Strategy

Crawl old URL lists, test redirect chains, validate status codes, inspect error page HTML, and monitor post-launch 404s.

## Monitoring

Monitor 301/302 volume, 404/410/5xx rates, redirect loops, soft 404 reports, and high-traffic missing URLs.

## Maintenance

Review redirect maps after migrations, content pruning, slug changes, and platform moves.

## Future Enhancements

- Add redirect map templates.
- Add automated redirect regression tests.

## Related Documents

- `architecture/04-migration-maintenance.md`
- `on-page/03-canonicals-indexability.md`
- `testing-auditing/02-audit-playbook.md`

## References

- Google redirects and site move documentation.
- MDN HTTP status code documentation.
