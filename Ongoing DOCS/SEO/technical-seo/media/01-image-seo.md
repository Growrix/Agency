# Image SEO

Document status: active module

## Purpose

Define how images should support discoverability, performance, accessibility, and visual quality.

## Scope

Covers image formats, dimensions, alt text, captions, filenames, lazy loading, responsive images, image sitemaps, Open Graph images, and CDN optimization.

## Business Value

Optimized images improve page speed, accessibility, image search visibility, social sharing, and conversion quality.

## Dependencies

- `performance/01-core-web-vitals.md`
- `on-page/01-metadata.md`
- `on-page/02-structured-data-schema.md`

## Concepts

- Images can be content, decoration, product evidence, or conversion proof.
- Alt text communicates meaningful image content to assistive technology and search systems.
- Hero and product images often affect LCP.

## Architecture

Use a media pipeline that supports source upload, validation, transformation, CDN delivery, responsive sizing, and metadata storage.

## Best Practices

- Use modern formats where supported.
- Reserve image dimensions to avoid layout shift.
- Prioritize LCP images and lazy-load non-critical images.
- Write descriptive alt text for meaningful images and empty alt text for decoration.

## Common Mistakes

- Uploading oversized images.
- Lazy-loading the LCP image.
- Reusing the same generic alt text everywhere.
- Serving important images only as CSS backgrounds without fallback context.

## Validation Rules

- Important images need meaningful alt text, width/height or stable aspect ratio, optimized delivery, and no broken URLs.
- LCP image strategy must be tested on representative routes.
- Social share images must be defined for important pages.

## Testing Strategy

Run Lighthouse, inspect image sizes, test rendered HTML, validate alt text, and compare desktop/mobile image loading behavior.

## Monitoring

Monitor LCP, image transfer size, broken images, CDN errors, and image indexing signals when image search matters.

## Maintenance

Review image rules when design, CMS, CDN, product media, or content workflows change.

## Future Enhancements

- Add automated image size budgets.
- Add image alt text quality review workflows.

## Related Documents

- `performance/01-core-web-vitals.md`
- `performance/02-caching-cdn-edge.md`
- `checklists/01-prelaunch-checklist.md`

## References

- Google image SEO documentation.
- Next.js image optimization documentation.
- web.dev image performance guidance.
