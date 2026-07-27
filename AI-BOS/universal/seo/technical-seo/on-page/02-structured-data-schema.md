# Structured Data Schema

Document status: active module

## Purpose

Define how Schema.org structured data should be selected, generated, validated, and maintained.

## Scope

Covers JSON-LD, Organization, WebSite, BreadcrumbList, Article, Product, Review, FAQPage, LocalBusiness, VideoObject, and route-specific schema ownership.

## Business Value

Structured data helps search engines understand entities, page type, breadcrumbs, products, articles, local business data, and rich result eligibility.

## Dependencies

- `on-page/01-metadata.md`
- `on-page/05-internal-linking-navigation.md`
- `accessibility-international-local/03-local-seo.md`

## Concepts

- Structured data must describe visible or verifiable content.
- JSON-LD is preferred for maintainability.
- Schema should be route-type-specific, not blindly global.

## Architecture

| Route type | Common schema |
| --- | --- |
| Global layout | Organization, WebSite |
| Breadcrumb pages | BreadcrumbList |
| Blog/article | Article |
| Product/detail | Product, Offer, Review when valid |
| FAQ content | FAQPage when visible and policy-compliant |
| Local pages | LocalBusiness or subtype |

## Best Practices

- Generate schema from source content, not duplicate manual fields.
- Validate required and recommended properties.
- Keep schema synchronized with visible price, availability, rating, and business data.

## Common Mistakes

- Marking up hidden content.
- Adding review schema without valid review content.
- Using organization schema with inconsistent name, logo, or URL.
- Duplicating conflicting schema blocks.

## Validation Rules

- Structured data must be valid JSON-LD.
- Product, review, local, and FAQ schema must match visible page content.
- Schema errors must be release blockers for rich-result-critical pages.

## Testing Strategy

Use Rich Results Test, Schema Markup Validator, rendered HTML inspection, and route sample validation.

## Monitoring

Monitor Search Console rich result reports, schema warnings, invalid items, and traffic changes for rich-result pages.

## Maintenance

Update schema when content models, product fields, review rules, or local business data changes.

## Future Enhancements

- Add route-specific schema templates.
- Add automated JSON-LD snapshot tests.

## Related Documents

- `media/01-image-seo.md`
- `media/02-video-font-css-javascript-seo.md`
- `testing-auditing/01-testing-strategy.md`

## References

- Schema.org.
- Google Search Central structured data documentation.
