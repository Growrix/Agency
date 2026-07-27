# On-Page SEO Agent Framework

Document status: active
Last updated: 2026-07-14

## Overview

Reusable agent specifications for on-page SEO audits, content strategy, and page-level optimization.

## Modules

| File | Purpose |
| --- | --- |
| `agent.md` | Charter and identity |
| `operating-modes.md` | Audit, Build, Content Strategy modes |
| `capabilities.md` | What the agent can deliver |
| `tools.md` | Evidence and tool usage |
| `quality-gates.md` | Blocking vs non-blocking checks |

## Platform Adapters

- VS Code Copilot: `.github/agents/On_Page_SEO_expert.agent.md`
- Cursor: `.cursor/agents/On_Page_SEO_expert.md`
- Personal skill: `~/.cursor/skills/on-page-seo/` (`@on-page-seo`)

## Parent Installation

See `../../agents/platform-installation.md` for full SEO suite installation.

## Related Agents

- `Technical_SEO_expert` — metadata implementation, schema, indexation
- `Off_Page_SEO_expert` — backlinks, PR, local citations
- `@frontend-content-strategist` — final copy and brand voice
