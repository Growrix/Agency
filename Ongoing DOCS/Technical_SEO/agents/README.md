# Technical SEO Agent Framework

Document status: active framework index
Last updated: 2026-07-12
Scope: Reusable agent role specifications for Technical SEO work

## Purpose

This folder defines a reusable Technical SEO Agent Framework for greenfield builds, existing-site audits, migrations, performance reviews, release gates, and long-term SEO governance.

The framework is not application code. It is a portable agent operating system that can be copied into future projects and adapted without losing the core identity, rules, workflows, and quality standards.

## Source Of Truth

The agent must follow the parent Technical SEO handbook before making recommendations:

1. `../README.md`
2. `../00-documentation-map.md`
3. `../02-principles.md`
4. `../rules/01-technical-seo-rules.md`
5. Relevant domain docs under `../architecture`, `../on-page`, `../media`, `../performance`, `../security-http`, `../accessibility-international-local`, `../devops-observability`, `../testing-auditing`, `../templates`, `../checklists`, and `../execution`.

## Framework Inventory

| File | Purpose |
| --- | --- |
| `agent.md` | Master system prompt and permanent agent charter. |
| `capabilities.md` | What the agent can evaluate, plan, audit, and validate. |
| `skills.md` | Required competencies across SEO, Next.js, performance, security, DevOps, and analytics. |
| `operating-modes.md` | Build Mode and Audit Mode behavior. |
| `workflow.md` | Standard project workflow and decision loop. |
| `audit-framework.md` | Deep technical audit methodology. |
| `implementation-framework.md` | Implementation planning and validation method. |
| `reporting-framework.md` | Required report structure and severity model. |
| `quality-gates.md` | Blocking gates and evidence requirements. |
| `tools.md` | Tool expectations and tool-agnostic evidence rules. |
| `rules.md` | Agent-specific constraints and escalation rules. |
| `memory.md` | What the agent should remember, avoid remembering, and update. |
| `platform-installation.md` | How to install/select the agent in VS Code Copilot, Cursor, and future projects. |
| `prompts/reusable-prompts.md` | Reusable invocation prompts for future projects. |
| `templates/reporting-and-brief-templates.md` | Audit, roadmap, and implementation brief templates. |
| `checklists/readiness-audit-checklists.md` | Operational checklists for agent runs. |

## Reuse Rules

- Keep this framework vendor-neutral where possible.
- Preserve the master identity in `agent.md` when adapting to another project.
- Replace project-specific paths only in a local adapter section, not in the core rules.
- Do not remove the requirement to read the Technical SEO handbook before recommendations.
- Do not allow the agent to generate application code unless the user explicitly requests implementation.

## Recommended Agent Load Order

1. `agent.md`
2. `rules.md`
3. `operating-modes.md`
4. `workflow.md`
5. Relevant framework file for the task.
6. Relevant parent handbook docs.

## Platform Adapters

This framework is active in the current project through thin selectable adapters:

- VS Code Copilot: `.github/agents/Technical_SEO_expert.agent.md`
- Cursor: `.cursor/agents/Technical_SEO_expert.md`
- Personal skill: `~/.cursor/skills/technical-seo/` (`@technical-seo`)

**Deprecated:** `technical-seo-architect` — merged into `Technical_SEO_expert`.

For future projects, copy the relevant adapter file and the `Ongoing DOCS/Technical_SEO` handbook folder. See `platform-installation.md`.

## Completion Standard

An agent run is complete only when it has:

- Named the mode: Build Mode or Audit Mode.
- Loaded relevant handbook docs.
- Mapped findings or recommendations to handbook standards.
- Classified severity when auditing.
- Provided validation steps and measurable success criteria.
- Identified blockers, assumptions, and monitoring needs.
