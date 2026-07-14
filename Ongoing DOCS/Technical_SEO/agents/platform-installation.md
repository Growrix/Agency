# Platform Installation Guide

Document status: active adapter guide
Last updated: 2026-07-14

## Purpose

Explain how to make the Technical SEO Expert selectable in VS Code Copilot, Cursor, and future projects.

## Current Project Installation

This project uses thin adapter files that point to the reusable skill and handbook:

| Platform | Selectable adapter | Authoritative skill | Source handbook |
| --- | --- | --- | --- |
| VS Code Copilot Agent Mode | `.github/agents/Technical_SEO_expert.agent.md` | `@technical-seo` | `Ongoing DOCS/Technical_SEO/` |
| Cursor agents | `.cursor/agents/Technical_SEO_expert.md` | `@technical-seo` | `Ongoing DOCS/Technical_SEO/` |

**Deprecated:** `technical-seo-architect` — merged into `Technical_SEO_expert`. Do not use.

## How To Use In VS Code Copilot

1. Open Copilot Chat in Agent Mode.
2. Select `Technical SEO Expert` from the agent list.
3. Use a prompt such as: `Use Technical SEO Expert in Audit Mode to review this site against the Technical_SEO handbook.`
4. The agent must read `@technical-seo` skill and handbook docs before making recommendations.

## How To Use In Cursor

1. Open Cursor's agent selector.
2. Select `Technical_SEO_expert`.
3. Attach `@technical-seo` skill for the full playbook.
4. Use a prompt such as: `Run Build Mode for this Next.js route group and create a Technical SEO implementation brief.`
5. The agent must read the skill, framework, and handbook docs before making recommendations.

## Files To Copy Into Future Projects

For VS Code Copilot support, copy:

- `.github/agents/Technical_SEO_expert.agent.md`

For Cursor support, copy:

- `.cursor/agents/Technical_SEO_expert.md`

For the reusable knowledge base, copy:

- `Ongoing DOCS/Technical_SEO/`

For the portable skill (global, all projects):

- `~/.cursor/skills/technical-seo/` (personal skill directory)

If the future project uses a different docs path, update the source paths inside the copied `.github` and `.cursor` adapter files.

## Recommended Portable Folder Layout

```text
project-root/
  .github/
    agents/
      Technical_SEO_expert.agent.md
  .cursor/
    agents/
      Technical_SEO_expert.md
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

~/.cursor/skills/
  technical-seo/
    SKILL.md
    reference/
```

## Adapter Rule

Keep platform adapters small. Do not duplicate the full framework inside `.github` or `.cursor`; point to `@technical-seo` skill and the reusable `Ongoing DOCS/Technical_SEO` handbook instead.

## Verification Checklist

- `.github/agents/Technical_SEO_expert.agent.md` exists.
- `.github` adapter has valid YAML frontmatter with `name`, `description`, `tools`, and `user-invocable: true`.
- `.cursor/agents/Technical_SEO_expert.md` exists.
- Cursor adapter has valid YAML frontmatter with `name`, `description`, and `model`.
- Both adapters point to `@technical-seo` skill and `Ongoing DOCS/Technical_SEO` handbook.
- `technical-seo-architect` adapters are removed (deprecated).
- No application code changes are required for installation.
