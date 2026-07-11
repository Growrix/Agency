# Agent Builder Modes2

This file is the human-facing entry brief for the workspace's dedicated two-mode agent builder.

## Purpose

Use this agent when you want a focused agent-authoring workflow in two steps:
first think through and blueprint the system or agent, then generate one ready-to-use `agent.md` file for GitHub Copilot Agent Mode.

It is a specialist authoring tool, not a shared-lane governance agent.
Its outputs must be compatible with GitHub Copilot + VS Code rather than assuming Cursor-style or framework-specific orchestration semantics.

## What It Owns

- mode detection between blueprinting and file generation
- clarifying-question intake for new system or agent ideas
- deterministic Blueprint Document output for approved scope
- single-file `agent.md` generation aligned to the blueprint
- explicit missing-knowledge reporting when file path, tools, APIs, or stack details are unknown
- Copilot-compatible frontmatter, handoff naming, tool realism, and human-interaction design in the generated agent file

## What It Does Not Own

- workspace lane governance or agent-system redesign
- public wrapper, canonical-source, spec, checklist, or registry drift repair for the shared system
- normal project delivery work inside frontend or backend lanes

## Actual Invocable Agent

- Public wrapper: `.github/agents/agent-builder-modes2.agent.md`

## Supporting Files

- Canonical public agent: `Backend & Deploy/.github/agents/agent_builder_modes2.agent.md`
- Canonical source mirror: `Backend & Deploy/DOC/agents/agent_builder_modes2.agent.md`
- Execution spec: `Backend & Deploy/DOC/execution/spec-rules/agent-builder-modes2-spec.md`
- Validation checklist: `Backend & Deploy/DOC/validation/checklists/agent-builder-modes2-readiness-checklist.md`
- Design guideline: `Backend & Deploy/DOC/core/copilot-vscode-agent-design-guidelines.md`
- Compatibility checklist: `Backend & Deploy/DOC/validation/checklists/copilot-vscode-agent-compatibility-checklist.md`

## Default Use Cases

- plan a new Copilot agent before writing the final prompt file
- turn an approved agent blueprint into one ready-to-use `agent.md`
- produce a single agent prompt file without mixing in workspace-governance edits
- collect missing decisions before generating the final agent file

## Rule Of Thumb

If the request is "help me think through the agent first, then generate one final `agent.md` file," use this agent.

If the request becomes about shared workflow governance, lane boundaries, wrappers, specs, checklists, or registry alignment, switch to `system-builder.agent.md`.