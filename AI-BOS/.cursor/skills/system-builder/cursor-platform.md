# Cursor Platform Reference

Concise reference for the Cursor agentic system. System Builder uses this when designing or auditing Cursor artifacts.

## Architecture Overview

```text
User prompt
  → Agent (Composer) with tools: Shell, Read, Write, Grep, Task, MCP, AskQuestion, ...
  → Optional context: Skills (@mention), Rules (.mdc), User rules, MCP servers
  → Optional automation: Hooks (pre/post events), Automations (scheduled/cloud)
```

Handoffs between skills are **user-routing guidance** ("attach @other-skill next"), not hidden autonomous agent spawning unless the Task tool or hooks explicitly support it.

## Skills

| Type | Path | Scope |
|------|------|-------|
| Personal | `~/.cursor/skills/<name>/SKILL.md` | All projects for this user |
| Project | `.cursor/skills/<name>/SKILL.md` | Shared via repository |

**Frontmatter:**

```yaml
---
name: skill-name          # lowercase, hyphens, max 64 chars
description: Third-person WHAT + WHEN trigger terms
disable-model-invocation: true   # default: explicit @mention only
---
```

- Keep `SKILL.md` under **500 lines**; put heavy content in sibling reference files.
- Never write to `~/.cursor/skills-cursor/` (Cursor built-ins only).
- Progressive disclosure: link one level deep from SKILL.md to references.

**When to use:** invocable workflows, domain playbooks, multi-step procedures the agent should follow when attached.

## Rules

| Type | Path |
|------|------|
| Project | `.cursor/rules/*.mdc` |

**Frontmatter:**

```yaml
---
description: What this rule enforces
globs: "**/*.ts"      # optional; omit for always-apply
alwaysApply: false    # true = every session
---
```

**When to use:** persistent coding standards, file-pattern conventions, always-on project policy. Not for one-off task workflows (use skills).

## Hooks

| Scope | Config | Scripts |
|-------|--------|---------|
| Project | `.cursor/hooks.json` | `.cursor/hooks/*` (paths from project root) |
| User | `~/.cursor/hooks.json` | `~/.cursor/hooks/*` |

**Common events:**

| Goal | Event |
|------|-------|
| Block/approve shell | `beforeShellExecution` |
| Audit shell output | `afterShellExecution` |
| Format after edit | `afterFileEdit` |
| Block/rewrite tool call | `preToolUse` |
| Inject context after tool | `postToolUse` |
| Control subagents | `subagentStart`, `subagentStop` |
| Validate prompts | `beforeSubmitPrompt` |
| Gate MCP calls | `beforeMCPExecution` |

**When to use:** enforce policy at agent events, auto-format, audit commands, chain subagent workflows.

## Automations

Cursor Automations = scheduled/cloud/integrated agent runs configured in the Automations editor.

- Creation workflow: gather trigger + action + outcome → draft table → user approval → open Automations editor handoff.
- Do not assume generic "automate this" means Cursor Automations; confirm explicitly.
- MCP actions in automations require **dashboard-backed** MCP servers (prefixes: `dashboard-team-`, `dashboard-`, `plugin-`).
- Local/project MCP servers may not resolve in the Automations editor.

**When to use:** recurring PR review, scheduled reports, Slack-triggered agents, git-triggered workflows outside the IDE session.

## Task Subagents

The Task tool launches specialized subagents:

| Type | Use for |
|------|---------|
| `explore` | Fast codebase search, file patterns |
| `shell` | Git, terminal, command execution |
| `generalPurpose` | Multi-step research |
| `bugbot` | Explicit code review requests |
| `security-review` | Explicit security review requests |
| `ci-investigator` | Diagnose failing PR CI checks |

**Rules:**

- Handoffs to subagents are real when Task is invoked; skill handoffs are user-routed.
- Do not write "spawn parallel agents" in skills unless Task/hooks actually implement it.
- Prefer direct tools for narrow queries; use Task for broad exploration.

## MCP (Model Context Protocol)

- Tool descriptors live under workspace MCP folder; read schema before calling.
- Project MCP: configured in project `mcp.json` or workspace.
- Dashboard MCP: connected via cursor.com; required for Automations MCP actions.
- Never invent MCP tool names; verify from descriptor files.
- Authenticate with `mcp_auth` only when a call fails with auth error.

## SDK / Programmatic Agents

Use `@cursor/sdk` (TypeScript) or `cursor-sdk` (Python) when agents must run **outside** the IDE:

- CI pipelines, GitHub Actions, backend services, bots
- Patterns: `Agent.prompt()` one-shot; `Agent.create()` + `agent.send()` for streaming/multi-turn
- Local runtime: `local: { cwd }`; cloud runtime: cloned repo on Cursor VM

System Builder skills govern IDE workflows; SDK integrations belong in isolated or project code, not mixed into generic skill lanes.

## User Rules vs Project Rules vs Skills

| Mechanism | Persistence | Invocation |
|-----------|-------------|------------|
| User rules | Cursor settings | Always in user context |
| Project rules (`.mdc`) | Repository | Auto by glob or alwaysApply |
| Skills | Skill directory | @mention or auto if disable-model-invocation omitted |
| system-builder | Personal skill | Explicit @system-builder |

## Interface Behaviors Relevant to Authoring

- **Plan mode:** read-only; no edits until user confirms plan.
- **Agent mode:** full tool access for implementation.
- **Ask mode:** read-only exploration.
- **Glass / open_resource:** reveal files, terminals, URLs in editor panel.
- **move_agent_to_root:** MCP tool to switch workspace to a project directory before project-scoped work.

When authoring skills that touch project work, instruct agents to resolve project root and use `move_agent_to_root` when appropriate.

## Storage Decision Tree

```text
Reusable across all my projects?
  YES → ~/.cursor/skills/ (personal)
  NO  → .cursor/skills/ (project)

Always-on coding standard?
  YES → .cursor/rules/*.mdc

React to agent events?
  YES → hooks.json + hook scripts

Scheduled or external trigger?
  YES → Cursor Automation

Run outside IDE?
  YES → Cursor SDK in project/isolated root
```
