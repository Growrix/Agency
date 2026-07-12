# Platform Installation Guide

Document status: active adapter guide
Last updated: 2026-07-12

## Purpose

Explain how to make the Technical SEO Architect Agent selectable in VS Code Copilot, Cursor, and future projects.

## Current Project Installation

This project uses thin adapter files that point to the reusable framework and handbook:

| Platform | Selectable adapter | Source framework |
| --- | --- | --- |
| VS Code Copilot Agent Mode | `.github/agents/technical-seo-architect.agent.md` | `Ongoing DOCS/Technical_SEO/agents/` |
| Cursor agents | `.cursor/agents/technical-seo-architect.md` | `Ongoing DOCS/Technical_SEO/agents/` |

## How To Use In VS Code Copilot

1. Open Copilot Chat in Agent Mode.
2. Select `Technical SEO Architect` from the agent list.
3. Use a prompt such as: `Use Technical SEO Architect in Audit Mode to review this site against the Technical_SEO handbook.`
4. The agent must read the framework and handbook docs before making recommendations.

## How To Use In Cursor

1. Open Cursor's agent selector.
2. Select `technical-seo-architect`.
3. Use a prompt such as: `Run Build Mode for this Next.js route group and create a Technical SEO implementation brief.`
4. The agent must read the framework and handbook docs before making recommendations.

## Files To Copy Into Future Projects

For VS Code Copilot support, copy:

- `.github/agents/technical-seo-architect.agent.md`

For Cursor support, copy:

- `.cursor/agents/technical-seo-architect.md`

For the reusable knowledge base, copy:

- `Ongoing DOCS/Technical_SEO/`

If the future project uses a different docs path, update the source paths inside the copied `.github` and `.cursor` adapter files.

## Recommended Portable Folder Layout

```text
project-root/
  .github/
    agents/
      technical-seo-architect.agent.md
  .cursor/
    agents/
      technical-seo-architect.md
  Ongoing DOCS/
    Technical_SEO/
      README.md
      00-documentation-map.md
      agents/
      architecture/
      on-page/
      media/
      performance/
      security-http/
      accessibility-international-local/
      devops-observability/
      testing-auditing/
      rules/
      patterns/
      templates/
      checklists/
      execution/
```

## Adapter Rule

Keep platform adapters small. Do not duplicate the full framework inside `.github` or `.cursor`; point to the reusable `Ongoing DOCS/Technical_SEO` source instead.

## Verification Checklist

- `.github/agents/technical-seo-architect.agent.md` exists.
- `.github` adapter has valid YAML frontmatter with `name`, `description`, `tools`, and `user-invocable: true`.
- `.cursor/agents/technical-seo-architect.md` exists.
- Cursor adapter has valid YAML frontmatter with `name`, `description`, and `model`.
- Both adapters point to the same `Ongoing DOCS/Technical_SEO` framework.
- No application code changes are required for installation.
