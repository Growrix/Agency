# System Builder Readiness Checklist

Use this checklist before declaring a system-level change complete.

## Public Surface
- The public wrapper exists under `.github/agents/`.
- The wrapper frontmatter includes a meaningful `description` and user-invocable metadata when intended.
- The wrapper language describes system work, not project delivery work.
- Public agent changes explicitly consider GitHub Copilot + VS Code compatibility: valid frontmatter, exact handoff names, verified tools, and human interaction guidance when needed.
- The System Builder prompt includes a dedicated human-interaction section for clarifying questions, approval gates, and external-input stop conditions.

## Canonical Surface
- The canonical public agent exists under `Backend & Deploy/.github/agents/`.
- The canonical source mirror exists under `Backend & Deploy/DOC/agents/`.
- Canonical and mirrored intent stay aligned.

## Governance Support
- A non-trivial system change includes or updates its supporting spec/checklist artifacts.
- The spec defines purpose, inputs, outputs, execution rules, validation, and failure modes.
- The checklist covers wrapper, canonical, governance, registry, and mirror expectations.
- Task-ledger impacts are covered when the change affects execution continuity, agent planning behavior, or anti-redundant-question rules.

## Task Ledger
- The active project root has `tasks.md` before material system edits.
- The current system-change task block is present in execution order.
- Completed system-change tasks have evidence paths or evidence notes.
- No stale `in_progress` task remains after the completed scope.
- New or materially changed agents are required to use project-root `tasks.md` for durable task tracking.

## Blueprint Readiness
- For large blueprints, a module-level readiness matrix exists with `currently_supported`, `requires_extension`, and `missing_knowledge` buckets.
- Major blueprint modules have explicit lane ownership/handoff mapping.
- Unknown integrations, APIs, env vars, and tool dependencies are explicitly flagged instead of assumed.

## Archetype Fit
- The blueprint is explicitly classified as `shared_lane_fit`, `isolated_local_system_required`, or `unsupported_without_new_knowledge` before downstream handoff.
- Non-SaaS local automation, CLI, prompt-driven builder, or file-output systems are not forced through the shared website/foundation lanes.
- When `isolated_local_system_required` is selected, `isolated-local-agent-system-spec.md` and `isolated-local-agent-system-readiness-checklist.md` (or project-local equivalents) are referenced.

## Registry and Discovery
- Root public agent documentation is updated when a public wrapper is added or materially changed.
- Canonical registry documentation is updated when the canonical public surface changes.
- The change does not create hidden discovery drift between public and canonical surfaces.

## External Input Guidance
- If the system can proceed only with third-party credentials, dashboards, IDs, webhooks, DNS, or other user-provided assets, the blocker message is written in Bangla.
- The blocker message lists the exact item names, why each is needed, where to find each item, what to copy, and whether each item is secret.
- Grouped external requests are formatted as a copy-ready checklist the user can forward without additional explanation.

## Lane Safety
- Existing delivery lanes remain intact unless explicit redesign was requested.
- When shared phase agents can attach project-local continuation surfaces, a concrete starter package source and bootstrap contract are documented.
- New meta/system language stays generic and reusable.
- The System Builder prompt explicitly routes blueprint-first single-file `agent.md` authoring to `agent-builder-modes2.agent.md` when shared-system changes are not required.
- Remaining unresolved gaps are documented explicitly.