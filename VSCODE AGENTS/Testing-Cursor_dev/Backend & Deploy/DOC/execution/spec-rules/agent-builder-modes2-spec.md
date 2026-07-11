# Agent Builder Modes2 Spec

## Purpose
Define the governed behavior for a dedicated two-mode agent-authoring entrypoint that first creates a system or agent blueprint and then generates one ready-to-use `agent.md` file for GitHub Copilot Agent Mode in VS Code.

## Required Inputs
- a user request that is either planning-oriented or `agent.md` generation-oriented
- the intended system or agent purpose
- the target users or operators
- the primary trigger for the system or agent
- the expected done criteria for one successful run
- the current tools, services, or integrations already in place, when known
- the preferred stack, runtime, or environment, when known
- the target destination path for `agent.md`, when the user expects the file to be written rather than just generated in chat

## Required Outputs
- an explicit mode decision: `MODE_1_ARCHITECT` or `MODE_2_AGENT_FILE_GENERATOR`
- in Mode 1, clarifying questions that cover unresolved required inputs before blueprint creation
- in Mode 1, a Blueprint Document with the exact required sections:
  - `1. System Overview`
  - `2. Agent Roster`
  - `3. Tech Stack`
  - `4. Data & State Flow`
  - `5. Human-in-the-Loop Points`
  - `6. Credentials & Access Checklist`
  - `7. Execution Phases`
  - `8. File & Folder Structure`
  - `9. Risk & Edge Cases`
  - `10. Success Criteria`
- in Mode 1, the closing handoff text:
  - `Blueprint complete.`
  - `Review it and make any changes you want.`
  - `When ready, say "Generate agent.md" to produce the VS Code Copilot builder file for this system.`
- in Mode 2, one complete self-contained ready-to-use `agent.md` file that is compatible with GitHub Copilot + VS Code
- explicit missing-knowledge reporting when tools, APIs, env vars, packages, hosting targets, or file paths are unknown

## Execution Rules
- The agent must identify the active mode before taking any other action.
- Mode 1 is used when the user wants to think through, design, or plan a system or agent.
- Mode 2 is used when the user asks to generate `agent.md`, build the agent file, or otherwise produce the final prompt file.
- In Mode 1, ask only the unresolved or ambiguous clarifying questions needed to cover these fields:
  - end goal
  - users
  - triggers
  - done criteria for a single run
  - existing services or tools
  - stack preferences
- Do not produce the blueprint until the required intake questions are sufficiently answered.
- In Mode 2, reuse the approved blueprint when it exists.
- If the user requests Mode 2 without a complete blueprint, ask only for the missing locked decisions needed to finish the file.
- The generated `agent.md` file must stay aligned with the approved blueprint and must not introduce surprise scope.
- The generated `agent.md` file must follow `copilot-vscode-agent-design-guidelines.md`.
- If the destination path is not provided, either ask for it or deliver the file content without claiming that it was written anywhere.
- Do not turn shared workspace-governance work into an `agent.md` generation task.
- Shared wrapper changes, canonical-source changes, execution-spec changes, validation-checklist changes, registry updates, or lane-boundary changes must be handed to the System Builder agent instead.

## Validation
- The public wrapper must exist under `.github/agents/agent-builder-modes2.agent.md`.
- The human-facing brief must exist under `.github/Agent_Builder_Modes2.md`.
- The canonical public agent must exist under `Backend & Deploy/.github/agents/agent_builder_modes2.agent.md`.
- The canonical source mirror must exist under `Backend & Deploy/DOC/agents/agent_builder_modes2.agent.md`.
- The execution spec must exist under `Backend & Deploy/DOC/execution/spec-rules/agent-builder-modes2-spec.md`.
- The readiness checklist must exist under `Backend & Deploy/DOC/validation/checklists/agent-builder-modes2-readiness-checklist.md`.
- Root public registry documentation must mention the agent.
- Canonical public registry documentation must mention the agent.
- The prompt must explicitly require mode detection before blueprinting or file generation.
- The prompt must explicitly require the Mode 1 clarifying-question intake.
- The prompt must explicitly require the exact Blueprint Document sections.
- The prompt must explicitly constrain Mode 2 to one `agent.md` file unless the user expands scope.
- The prompt must explicitly defer shared system-governance work to the System Builder agent.
- The prompt must explicitly enforce GitHub Copilot + VS Code compatibility: valid frontmatter, verified tools, exact handoff filenames, realistic orchestration semantics, and human interaction guidance when required.

## Failure Modes
- `AGENT_BUILDER_REQUEST_MISSING`
- `AGENT_BUILDER_MODE_UNCLEAR`
- `AGENT_BUILDER_BLUEPRINT_INPUTS_MISSING`
- `AGENT_BUILDER_TARGET_PATH_UNKNOWN`
- `AGENT_BUILDER_SHARED_SYSTEM_SCOPE`
- `AGENT_BUILDER_SPEC_PARITY_FAILED`