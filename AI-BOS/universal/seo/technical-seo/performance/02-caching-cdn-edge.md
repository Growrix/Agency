# Caching CDN And Edge

Document status: active module

## Purpose

Define caching, CDN, and edge strategies that improve performance without damaging freshness, personalization, or indexability.

## Scope

Covers browser cache, CDN cache, ISR, stale-while-revalidate, edge runtime, cache keys, invalidation, redirects, static assets, and personalized routes.

## Business Value

Correct caching reduces latency, improves Core Web Vitals, lowers infrastructure cost, and keeps public SEO pages reliable.

## Dependencies

- `architecture/03-nextjs-rendering-strategy.md`
- `performance/01-core-web-vitals.md`
- `security-http/01-http-security-headers.md`

## Concepts

- Cache public content aggressively when freshness rules allow.
- Never publicly cache personalized or private content.
- Cache invalidation must be tied to content ownership.

## Architecture

```text
Browser cache -> CDN cache -> edge logic -> application render/cache -> data cache
```

## Best Practices

- Use immutable caching for versioned static assets.
- Use controlled revalidation for content pages.
- Keep cache keys simple and documented.
- Separate public, preview, authenticated, and admin cache behavior.

## Common Mistakes

- Caching private pages at the CDN.
- Serving stale metadata after content updates.
- Varying cache by too many headers.
- Using edge logic without monitoring and fallback.

## Validation Rules

- Public route cache headers must match freshness requirements.
- Private routes must not use shared public cache.
- Sitemap, robots, redirects, and metadata must refresh predictably after changes.

## Testing Strategy

Inspect response headers, test cache hits/misses, validate revalidation, and simulate content updates.

## Monitoring

Monitor cache hit ratio, stale content reports, CDN errors, edge function errors, and server response time.

## Maintenance

Review caching after CMS changes, route changes, personalization changes, CDN rule updates, and deployment pipeline changes.

## Future Enhancements

- Add cache policy registry by route type.
- Add automated cache header assertions.

## Related Documents

- `architecture/03-nextjs-rendering-strategy.md`
- `performance/03-api-database-performance.md`
- `devops-observability/01-ci-cd-deployment-gates.md`

## References

- HTTP caching documentation.
- Next.js caching and revalidation documentation.
- CDN provider caching guidance.
