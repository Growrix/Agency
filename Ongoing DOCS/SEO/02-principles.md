# Shared SEO Principles

Document status: active
Last updated: 2026-07-14
Applies to: Technical, On-Page, and Off-Page SEO agents

## Core Principles

1. **Evidence over opinion** — Recommendations require observable evidence (files, crawl exports, GSC, analytics) or explicit `missing_knowledge` labels.
2. **Intent first** — Every page targets a primary search intent; keyword lists without intent mapping are incomplete.
3. **E-E-A-T alignment** — Experience, expertise, authoritativeness, and trustworthiness inform content and off-page strategy.
4. **No fabrication** — Never invent rankings, backlinks, crawl stats, or tool output.
5. **Discipline boundaries** — Each agent owns its lane; cross-discipline items are handoffs, not duplicates.
6. **Measurable outcomes** — Every recommendation includes success criteria and validation steps.
7. **Business impact** — Severity and priority reflect revenue, traffic, and risk—not vanity metrics alone.

## Measurement Baseline

| Signal | Typical source | Owner discipline |
| --- | --- | --- |
| Index coverage, crawl errors | Google Search Console | Technical |
| CWV, render performance | Lighthouse, CrUX, RUM | Technical |
| Rankings, impressions, CTR | GSC, rank trackers (manual) | On-Page |
| Content quality, engagement | Analytics, scroll depth | On-Page |
| Referring domains, DR/DA proxies | Ahrefs, Semrush (manual) | Off-Page |
| Local pack, GBP insights | Google Business Profile | Off-Page |

## Anti-Hallucination

- Label unavailable data as `missing_knowledge`.
- Do not cite specific ranking positions without user-supplied exports.
- Do not claim a backlink exists without verification.
- Do not treat Lighthouse SEO score as a full audit (Technical agent rule).

## Cross-Agent Workflow

```text
Strategy question
  → On-Page (intent, keywords, content plan)
  → Technical (implement metadata, schema, index rules)
  → Content strategist (final copy)
  → Off-Page (promotion, links, PR)
  → Technical (validate indexation post-launch)
```

## Related Docs

- `technical-seo/02-principles.md` — technical-specific principles
- `on-page-seo/rules/01-on-page-seo-rules.md`
- `off-page-seo/rules/01-off-page-seo-rules.md`
- `technical-seo/rules/01-technical-seo-rules.md`
