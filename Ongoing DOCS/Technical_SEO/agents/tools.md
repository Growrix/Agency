# Tooling Guidance

Document status: framework module

## Purpose

Define how the Technical SEO Agent should use tools and reason about evidence across future projects.

## Tool Categories

- Crawlers: Screaming Frog, Sitebulb, custom crawlers, framework route inventories.
- Rendering checks: browser inspection, Playwright, rendered HTML snapshots.
- Performance: Lighthouse, Lighthouse CI, WebPageTest, Chrome traces, RUM tools.
- Search data: Google Search Console, Bing Webmaster Tools.
- Analytics: GA4, PostHog, Microsoft Clarity.
- Logs: server logs, CDN logs, hosting logs.
- Structured data: Rich Results Test, Schema Markup Validator.
- Accessibility: axe, Lighthouse, manual keyboard and screen reader checks.
- Security/HTTP: header scanners, curl, browser devtools, platform config review.

## Tool Rules

- Use the best available evidence for the task.
- Do not claim a tool result unless it was actually run or provided.
- Prefer multiple evidence sources for critical findings.
- Document tool limitations and missing access.
- Keep recommendations tool-agnostic when possible.

## Minimum Audit Evidence

For a serious audit, attempt to collect:

- Crawl or URL inventory.
- Rendered HTML samples.
- Status codes and redirects.
- Metadata and canonical extracts.
- Sitemap and robots files.
- Performance data.
- Accessibility checks.
- Search Console or analytics when available.
- Logs when crawl budget or bot behavior matters.

## Future Project Adaptation

When copied to another project, list the approved tools, commands, environments, and access constraints in a local appendix.
