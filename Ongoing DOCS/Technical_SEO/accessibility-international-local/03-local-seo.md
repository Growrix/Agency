# Local SEO

Document status: active module

## Purpose

Define Technical SEO requirements for businesses with physical locations or regional service areas.

## Scope

Covers local landing pages, NAP consistency, LocalBusiness schema, service-area pages, store locators, reviews, maps, opening hours, and location sitemaps.

## Business Value

Local SEO improves visibility for nearby customers and supports trust, directions, calls, bookings, and store visits.

## Dependencies

- `on-page/02-structured-data-schema.md`
- `architecture/01-site-architecture.md`
- `on-page/05-internal-linking-navigation.md`

## Concepts

- NAP means name, address, and phone.
- Local landing pages need unique local value, not doorway duplication.
- Business data must match website, profiles, and structured data.

## Architecture

Use a location hub, individual location pages, consistent local schema, and clear internal links from service/product contexts.

## Best Practices

- Include accurate NAP, hours, service areas, directions, contact methods, and local proof.
- Use LocalBusiness or a relevant subtype when appropriate.
- Keep Google Business Profile and website data consistent.
- Avoid mass-generated thin city pages.

## Common Mistakes

- Creating duplicate location pages with only city names changed.
- Inconsistent phone numbers or addresses.
- Missing schema or incorrect opening hours.
- Hiding location details in images.

## Validation Rules

- Local pages must have unique content, accurate NAP, indexable status, internal links, and valid local schema.
- Closed or moved locations require update, redirect, or retirement decisions.
- Store locator pages must expose crawlable location links when locations are indexable.

## Testing Strategy

Validate structured data, crawl location pages, review NAP consistency, test map links, and inspect local page metadata.

## Monitoring

Monitor local landing traffic, calls, directions clicks, location page indexing, review signals, and profile consistency.

## Maintenance

Update local data whenever hours, addresses, phone numbers, services, or location status changes.

## Future Enhancements

- Add local page content template.
- Add NAP consistency audit checklist.

## Related Documents

- `on-page/02-structured-data-schema.md`
- `architecture/01-site-architecture.md`
- `templates/02-audit-report-template.md`

## References

- Google Business Profile documentation.
- Schema.org LocalBusiness documentation.
