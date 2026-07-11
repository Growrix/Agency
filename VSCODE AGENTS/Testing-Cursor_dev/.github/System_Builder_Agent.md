# System Builder Agent

This file is the human-facing entry brief for the workspace's generic system-building agent.

## Purpose

Use this agent when the work is about the agentic system itself rather than a single project output. It is responsible for designing, auditing, extending, repairing, and aligning agent lanes, execution specs, validation gates, wrappers, mirrors, and handoffs so the system works end-to-end.

It also decides when a blueprint should become an isolated local automation/tooling system instead of being forced into the shared website/foundation lanes.
It can also route blueprint-first single-file agent-authoring requests to `agent-builder-modes2.agent.md` when the shared system itself does not need to change.
It is also the right agent to audit and repair GitHub Copilot + VS Code compatibility issues across the public agent surface.

## What It Owns

- agent role design and lane boundaries
- wrapper and canonical agent alignment
- execution spec and checklist coverage
- mirror and registry consistency
- system-level validation and drift repair
- isolated local system routing for non-shared automation/tooling products
- routing specialist single-file agent-authoring requests to the dedicated Agent Builder Modes2 workflow
- GitHub Copilot + VS Code compatibility auditing for active agent surfaces

## What It Does Not Own

- normal frontend delivery work inside phase1-3
- normal backend/template delivery work inside phase4-7
- project-specific product implementation unless explicitly requested

## Actual Invocable Agent

- Public wrapper: `.github/agents/system-builder.agent.md`

## Supporting Files

- Canonical public agent: `Backend & Deploy/.github/agents/system_builder.agent.md`
- Canonical source mirror: `Backend & Deploy/DOC/agents/system_builder.agent.md`
- Execution spec: `Backend & Deploy/DOC/execution/spec-rules/system-builder-spec.md`
- Validation checklist: `Backend & Deploy/DOC/validation/checklists/system-builder-readiness-checklist.md`

## Default Use Cases

- create a new agent or lane
- redesign an existing phase without breaking adjacent phases
- repair wrapper/spec/checklist drift
- audit whether a workflow is truly end-to-end ready
- add missing support files for a non-trivial agent
- classify a blueprint as shared-lane fit versus isolated local system fit
- decide whether a blueprint-first `agent.md` request belongs here or should hand off to `agent-builder-modes2.agent.md`
- repair invalid frontmatter, ambiguous handoff names, or other Copilot-environment incompatibilities in active agents

## Rule Of Thumb

If the request is about how the system should behave, how agents should be structured, whether a blueprint belongs in the shared lanes or a new isolated local root, or how a workflow should stay aligned over time, use the System Builder Agent before editing delivery agents directly.

If the request is mainly "plan the agent, then generate one final `agent.md` file" and no shared wrapper/spec/checklist or lane-governance change is required, hand it to `agent-builder-modes2.agent.md`.

If the concern is that an active agent is not behaving like a real GitHub Copilot + VS Code agent, use the System Builder Agent to audit and repair the compatibility gap.