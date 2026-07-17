# SEO Documentation System

Document status: active handbook index
Last updated: 2026-07-14
Scope: Documentation only

## Purpose

Unified source of truth for **Technical SEO**, **On-Page SEO**, and **Off-Page SEO** across Growrixos delivery lanes (`web/`, `sites/`, `Frontend_Nextjs/`).

## Agent Map

| Agent | Discipline | Handbook root | Skill |
| --- | --- | --- | --- |
| `Technical_SEO_expert` | Crawl, index, render, metadata plumbing, schema, CWV, CI gates | `Ongoing DOCS/SEO/technical-seo/` | `@technical-seo` |
| `On_Page_SEO_expert` | Keywords, intent, content strategy, titles/meta copy, headings, internal linking | `Ongoing DOCS/SEO/on-page-seo/` | `@on-page-seo` |
| `Off_Page_SEO_expert` | Link building, digital PR, local SEO, citations, authority | `Ongoing DOCS/SEO/off-page-seo/` | `@off-page-seo` |

## Handoff Rules (no overlap)

| Topic | Owner | Hand off to |
| --- | --- | --- |
| Robots, sitemaps, canonicals, redirects, render | Technical | — |
| Metadata **implementation** (Next.js `generateMetadata`, HTML `<head>`) | Technical | On-Page for **copy/strategy** |
| Keyword research, intent, E-E-A-T, content briefs | On-Page | `@frontend-content-strategist` for final copy |
| Title/meta **wording**, H1–H6 strategy, content gaps | On-Page | Technical for plumbing |
| Backlinks, outreach, citations, GBP, digital PR | Off-Page | On-Page for landing-page alignment |
| Core Web Vitals, security headers, release gates | Technical | `performance-optimizer` for fixes |
| Brand voice and UX copy | Content strategist | On-Page for SEO alignment only |

## Read First (any SEO agent)

1. `00-documentation-map.md`
2. `02-principles.md`
3. Discipline-specific `README.md` under `technical-seo/`, `on-page-seo/`, or `off-page-seo/`
4. Discipline `agents/agent.md` and `rules/01-*-rules.md`
5. `.cursor/brain/lane-router.yaml` (resolve active lane)
6. Project `tasks.md` or lane ledger

## Architecture

```text
Ongoing DOCS/SEO/
  README.md                          ← this file
  00-documentation-map.md
  01-brainstorming-and-architecture-decisions.md
  02-principles.md
  agents/
    platform-installation.md
  technical-seo/                     ← crawl, index, render, perf, devops
  on-page-seo/                       ← keywords, content, on-page elements
  off-page-seo/                      ← links, PR, local, authority
```

## Portability

Copy `Ongoing DOCS/SEO/` into a new project and install agent adapters from `.cursor/agents/` and `.github/agents/`. Install personal skills from `~/.cursor/skills/technical-seo/`, `on-page-seo/`, and `off-page-seo/`.

See `agents/platform-installation.md` for platform-specific steps.
