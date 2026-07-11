# Agent Builder Modes2 Readiness Checklist

- The root public wrapper exists under `.github/agents/agent-builder-modes2.agent.md`.
- The human-facing root brief exists under `.github/Agent_Builder_Modes2.md`.
- The canonical public agent exists under `Backend & Deploy/.github/agents/agent_builder_modes2.agent.md`.
- The canonical source mirror exists under `Backend & Deploy/DOC/agents/agent_builder_modes2.agent.md`.
- The execution spec exists under `Backend & Deploy/DOC/execution/spec-rules/agent-builder-modes2-spec.md`.
- The readiness checklist exists under `Backend & Deploy/DOC/validation/checklists/agent-builder-modes2-readiness-checklist.md`.
- Root public registry documentation is updated to mention the agent.
- Canonical public registry documentation is updated to mention the agent.
- The agent is described as a two-mode specialist for blueprinting and single-file `agent.md` generation, not as a replacement for the System Builder lane.
- The prompt explicitly requires active-mode detection before proceeding.
- The prompt explicitly requires the Mode 1 clarifying-question intake before blueprint creation.
- The prompt explicitly requires the exact Blueprint Document structure.
- The prompt explicitly constrains Mode 2 output to one ready-to-use `agent.md` file unless the user expands scope.
- The prompt explicitly reports unknown tools, APIs, env vars, and target paths instead of guessing.
- The prompt explicitly defers shared workflow-governance, wrapper, spec, checklist, registry, and lane-boundary changes to `system-builder.agent.md`.
- The prompt explicitly enforces GitHub Copilot + VS Code compatibility: valid frontmatter, verified tools, exact handoff filenames, realistic orchestration semantics, and human interaction guidance when required.
- The prompt includes a dedicated human-interaction section covering clarifying questions, approval points, target-path confirmation, and stop conditions.