# System Builder Spec

## Purpose
Define the governed workflow for designing, auditing, extending, repairing, and aligning the agent system itself.

## Required Inputs
- A system-level request or drift report
- Optional large blueprint/spec artifact requiring module-level readiness audit
- Public wrapper surface under `.github/agents/`
- Canonical agent surface under `Backend & Deploy/.github/agents/` and `Backend & Deploy/DOC/agents/`
- Applicable registry docs, specs, and checklists

## Required Outputs
- Updated agent system artifacts at the correct public and canonical locations
- Supporting governance artifacts for any non-trivial system change
- Updated registry documentation for any public-surface change
- Updated task-ledger governance whenever a change affects project execution continuity or anti-redundant-question behavior
- An explicit archetype-fit decision: `shared_lane_fit`, `isolated_local_system_required`, or `unsupported_without_new_knowledge`
- A blueprint readiness matrix listing `currently_supported`, `requires_extension`, and `missing_knowledge`
- Lane handoff mapping from blueprint modules to execution owners
- Explicit delegation to `agent-builder-modes2.agent.md` when the request is primarily blueprint-first single-file `agent.md` authoring rather than shared-governance change
- A GitHub Copilot + VS Code compatibility verdict for active public-agent surfaces when parser, handoff, tool, or interaction behavior is in scope
- When required, an isolated local-system scaffold plan that references `isolated-local-agent-system-spec.md` and `isolated-local-agent-system-readiness-checklist.md`
- A Bangla external-input acquisition brief whenever progress is blocked on user-provided third-party items

## Change Classes
Each request or discovered issue must be classified as at least one of:
- `wrapper_gap`
- `canonical_gap`
- `governance_gap`
- `validation_gap`
- `mirror_drift`
- `handoff_drift`
- `knowledge_gap`
- `archetype_gap`

## Execution Rules
- Start by inventorying the existing public wrapper, canonical agent, governance, and registry surface.
- Before material system work, read or create `project_root/tasks.md` and append the active task block in execution order.
- Reuse existing structures before creating new ones.
- For any non-trivial public agent change, update the wrapper, canonical source, support files, and registry docs together.
- Preserve active delivery lanes unless the user explicitly asks to redesign or replace them.
- If the request is mainly to think through an agent or system and then generate one final `agent.md` file without changing the shared system surface, delegate to `agent-builder-modes2.agent.md` after any needed system-routing decision is made.
- Audit active public-agent surfaces for valid frontmatter, exact handoff filenames, environment-realistic tool declarations, and explicit human interaction guidance when GitHub Copilot + VS Code compatibility is in scope.
- When shared frontend lanes depend on a reusable project-local continuation package, the starter package path, bootstrap contract or script, and local agent filenames must be explicit and documented.
- Classify blueprint fit before handoff: shared-lane fit, isolated local-system fit, or unsupported without new knowledge.
- Do not force non-SaaS local automation, CLI, prompt-driven builder, or file-output blueprints through the shared phase1-7 or Foundation lanes when an isolated root is the cleaner and safer fit.
- When an isolated local system is required, use `isolated-local-agent-system-spec.md` and `isolated-local-agent-system-readiness-checklist.md` as the minimum governance pattern.
- Keep system artifacts generic and reusable; do not hardcode project-specific output behavior into them.
- When mirrored lanes exist under `Replicator/Backend & Deploy/`, keep them aligned in the same change set.
- Report unresolved structural drift explicitly; do not imply readiness.
- For blueprint requests, classify every major module into `currently_supported`, `requires_extension`, or `missing_knowledge` before approving downstream execution.
- Unknown tools, APIs, integrations, env vars, and operational dependencies must be reported as `knowledge_gap`/`missing_knowledge` rather than assumed.
- When a missing dependency must be supplied by the user from an external site or dashboard, stop and emit a Bangla acquisition brief with: exact field name, why needed, secret-handling guidance, source site/menu path, what to copy, and fallback if access is missing.

## Validation
- The public wrapper must exist in `.github/agents/` with valid frontmatter and a meaningful description.
- The canonical agent must exist under both `Backend & Deploy/.github/agents/` and `Backend & Deploy/DOC/agents/`.
- Supporting governance files must exist for any non-trivial meta agent change.
- Shared-lane starter bootstrap changes must name the canonical starter source and the bootstrap contract used by shared phase agents.
- Public registry docs must list newly added or materially changed public agents.
- Mirror copies must be updated when the same lane is mirrored.
- The System Builder prompt must explicitly route blueprint-first single-file `agent.md` authoring to `agent-builder-modes2.agent.md` when shared-system changes are not required.
- The System Builder prompt must explicitly treat invalid frontmatter, ambiguous handoff names, unsupported orchestration assumptions, missing human interaction guidance for decision-heavy agents, and unverified tool declarations as Copilot compatibility defects.
- Archetype-fit must be explicit before downstream handoff.
- If `isolated_local_system_required` is selected, the generic isolated-local-system spec/checklist or project-local equivalents must be referenced.
- Blueprint-module coverage and lane ownership must be explicit for all major modules in scope.
- External-input blocker messaging must instruct the user in Bangla where to go, what to collect, and whether each value is safe to paste.
- Task-ledger validation must pass for material system work: root `tasks.md` exists, active tasks are current, completed tasks have evidence, and no stale `in_progress` remains.

## Failure Modes
- `SYSTEM_REQUEST_MISSING`
- `SYSTEM_PUBLIC_WRAPPER_MISSING`
- `SYSTEM_CANONICAL_AGENT_MISSING`
- `SYSTEM_SUPPORTING_ARTIFACTS_MISSING`
- `SYSTEM_REGISTRY_DRIFT`
- `SYSTEM_MIRROR_DRIFT`
- `SYSTEM_ARCHETYPE_UNCLEAR`
- `SYSTEM_ISOLATED_SYSTEM_SPEC_MISSING`
- `SYSTEM_VALIDATION_FAILED`
- `SYSTEM_BLUEPRINT_UNCOVERED`