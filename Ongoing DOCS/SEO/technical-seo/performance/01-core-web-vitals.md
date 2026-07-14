# Core Web Vitals

Document status: active module

## Purpose

Define Core Web Vitals standards and how they connect to SEO, UX, and engineering quality.

## Scope

Covers LCP, INP, CLS, lab vs field data, route templates, performance budgets, user experience, and release gates.

## Business Value

Better Core Web Vitals improve user experience, conversion, crawler efficiency, and search quality signals.

## Dependencies

- `media/01-image-seo.md`
- `media/02-video-font-css-javascript-seo.md`
- `performance/02-caching-cdn-edge.md`

## Concepts

- LCP measures loading performance.
- INP measures interaction responsiveness.
- CLS measures visual stability.
- Field data reflects real users; lab data helps debug before release.

## Architecture

Performance ownership spans frontend rendering, assets, APIs, database, CDN, third-party scripts, and monitoring.

## Best Practices

- Define route-type performance budgets.
- Optimize LCP images, server response time, critical CSS, and route rendering.
- Reduce long tasks and unnecessary JavaScript.
- Reserve layout space for media and dynamic UI.

## Common Mistakes

- Optimizing only the homepage.
- Measuring only lab scores.
- Ignoring API/database latency behind slow SSR.
- Adding third-party scripts without budgets.

## Validation Rules

- Critical route templates require CWV checks before release.
- New media, scripts, and route templates must respect budgets.
- Regression thresholds should block release when business-critical pages are affected.

## Testing Strategy

Use Lighthouse, WebPageTest, browser performance traces, real-user monitoring, and route template comparisons.

## Monitoring

Monitor CWV by route group, device, geography, connection type, release version, and traffic source.

## Maintenance

Review performance budgets monthly and after large design, script, media, or infrastructure changes.

## Future Enhancements

- Add automated Lighthouse CI budgets.
- Add route-level CWV dashboards.

## Related Documents

- `performance/02-caching-cdn-edge.md`
- `performance/03-api-database-performance.md`
- `devops-observability/02-monitoring-logging-observability.md`

## References

- web.dev Core Web Vitals documentation.
- Google Search Central page experience guidance.
