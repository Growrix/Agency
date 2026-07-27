# Platform Installation Guide — SEO Agent Suite

Document status: active adapter guide
Last updated: 2026-07-14

## Purpose

Install the complete SEO agent family (Technical, On-Page, Off-Page) in VS Code Copilot, Cursor, and future projects.

## Agent Map

| Agent | Skill | Handbook |
| --- | --- | --- |
| `Technical_SEO_expert` | `@technical-seo` | `Ongoing DOCS/SEO/technical-seo/` |
| `On_Page_SEO_expert` | `@on-page-seo` | `Ongoing DOCS/SEO/on-page-seo/` |
| `Off_Page_SEO_expert` | `@off-page-seo` | `Ongoing DOCS/SEO/off-page-seo/` |

Shared taxonomy: `Ongoing DOCS/SEO/README.md`, `00-documentation-map.md`, `02-principles.md`

## Current Project Installation

| Platform | Adapters | Skills |
| --- | --- | --- |
| VS Code Copilot | `.github/agents/Technical_SEO_expert.agent.md`, `On_Page_SEO_expert.agent.md`, `Off_Page_SEO_expert.agent.md` | `@technical-seo`, `@on-page-seo`, `@off-page-seo` |
| Cursor | `.cursor/agents/Technical_SEO_expert.md`, `On_Page_SEO_expert.md`, `Off_Page_SEO_expert.md` | same |

**Deprecated:** `technical-seo-architect` — merged into `Technical_SEO_expert`.

## How To Use In Cursor

1. Open agent selector.
2. Choose the SEO discipline agent.
3. Attach the matching skill (`@technical-seo`, `@on-page-seo`, or `@off-page-seo`).
4. State mode (e.g. Audit Mode, Build Mode, Link Building Mode).
5. Agent reads skill + handbook before recommendations.

## Files To Copy Into Future Projects

**Adapters:**

- `.github/agents/Technical_SEO_expert.agent.md`
- `.github/agents/On_Page_SEO_expert.agent.md`
- `.github/agents/Off_Page_SEO_expert.agent.md`
- `.cursor/agents/Technical_SEO_expert.md`
- `.cursor/agents/On_Page_SEO_expert.md`
- `.cursor/agents/Off_Page_SEO_expert.md`

**Handbook (entire tree):**

- `Ongoing DOCS/SEO/`

**Personal skills (global):**

- `~/.cursor/skills/technical-seo/`
- `~/.cursor/skills/on-page-seo/`
- `~/.cursor/skills/off-page-seo/`

## Recommended Folder Layout

```text
project-root/
  .github/agents/
    Technical_SEO_expert.agent.md
    On_Page_SEO_expert.agent.md
    Off_Page_SEO_expert.agent.md
  .cursor/agents/
    Technical_SEO_expert.md
    On_Page_SEO_expert.md
    Off_Page_SEO_expert.md
  Ongoing DOCS/SEO/
    README.md
    technical-seo/
    on-page-seo/
    off-page-seo/
    agents/platform-installation.md

~/.cursor/skills/
  technical-seo/
  on-page-seo/
  off-page-seo/
```

## Lane Routing

Add all three agents to `.cursor/brain/lane-router.yaml` `primary_agents` for `web_saas`, `html_templates`, and `nextjs_migrations`. Add skills `technical-seo`, `on-page-seo`, `off-page-seo` to `primary_skills`.

## Verification Checklist

- [ ] All six adapter files exist with valid YAML frontmatter
- [ ] Each adapter points to correct skill and handbook path
- [ ] `Ongoing DOCS/SEO/` handbook tree present
- [ ] Personal skills installed under `~/.cursor/skills/`
- [ ] `lane-router.yaml` lists all three agents and skills
- [ ] Registries updated: `agents_cursor.md`, `skills-index.md`, `lanes-index.md`
- [ ] No duplicate deprecated `technical-seo-architect` adapters
- [ ] No application code required for installation

## Handoff Quick Reference

| Need | Agent |
| --- | --- |
| Crawl, index, schema, CWV | `Technical_SEO_expert` |
| Keywords, titles, content briefs | `On_Page_SEO_expert` |
| Backlinks, PR, local citations | `Off_Page_SEO_expert` |
| Brand copy | `@frontend-content-strategist` |
