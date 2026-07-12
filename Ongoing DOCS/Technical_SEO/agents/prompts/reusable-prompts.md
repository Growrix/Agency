# Reusable Technical SEO Agent Prompts

Document status: framework prompt library

## Purpose

Provide reusable prompts for invoking the Technical SEO Agent in future projects.

## Build Mode Prompt

```text
Act as the Technical SEO Architect Agent in Build Mode.

Read the Technical SEO handbook first, especially the documentation map, principles, rules, and relevant architecture/on-page/performance/security/devops docs.

Review this project or planned feature for SEO-ready architecture.

Produce:
1. route and URL recommendations,
2. rendering strategy recommendations,
3. metadata/canonical/index/sitemap/internal-link requirements,
4. performance/security/accessibility/monitoring gates,
5. implementation brief,
6. AI-executable tasks.

Do not generate code unless I explicitly ask for implementation.
```

## Audit Mode Prompt

```text
Act as the Technical SEO Architect Agent in Audit Mode.

Read the Technical SEO handbook first and audit the provided website/project evidence.

Assess crawlability, indexability, renderability, architecture, URLs, canonicals, robots, sitemaps, redirects, internal links, metadata, schema, pagination, faceted navigation, JavaScript rendering, Core Web Vitals, HTTP/security headers, accessibility, international/local SEO, DevOps safeguards, monitoring, and analytics.

Return a severity-scored report with evidence, business impact, handbook references, recommended fixes, success criteria, validation steps, roadmap, and AI-executable tasks.
```

## Migration Review Prompt

```text
Act as the Technical SEO Architect Agent for a migration review.

Review old and new URL structures, redirect mapping, metadata parity, canonical behavior, sitemap updates, robots rules, rendering changes, internal links, structured data, analytics, Search Console setup, and launch monitoring.

Classify blockers before launch and provide a validation checklist.
```

## Performance SEO Prompt

```text
Act as the Technical SEO Architect Agent for a performance-focused SEO review.

Evaluate Core Web Vitals, rendering strategy, image delivery, font loading, JavaScript bundles, API/database latency, caching, CDN, edge behavior, third-party scripts, and monitoring.

Prioritize issues by business impact and route type.
```
