# Isolated Local Agent System Spec

## Purpose

Define the governed pattern for project-specific local automation/tooling systems that do not belong in shared delivery lanes.

For systems such as:

- Node.js CLI generators
- prompt-driven file builders
- local ops dashboards
- automation pipelines
- content or asset emitters
- single-file HTML/profile generators

## Use When

- Blueprint is primarily local, script-driven, or file-output driven rather than a shared SaaS runtime.
- Product depends on prompts, briefs, templates, or generated artifacts inside a dedicated root.
- Clean delivery model is a local tool, utility, or automation system.
- Forcing work into shared delivery lanes would create architectural drift.

## Required Inputs

- Locked blueprint or implementation plan
- Chosen isolated root path
- Exact integrations, APIs, env vars, and external dashboards in scope
- Expected output artifacts and validation standards

## Required Outputs

- Isolated project root for the local system
- Local skills under `<isolated-root>/.cursor/skills/` when invocable workflows are needed
- Local rules under `<isolated-root>/.cursor/rules/` when persistent conventions apply
- Local execution spec and validation checklist (in isolated root docs)
- Local registry describing the isolated skill surface
- Runtime documentation: `README.md`, `RUN.md`, or equivalent
- `ENV.example` or equivalent env contract
- Explicit retention/ignore rules for secrets, briefs, outputs, and sensitive/generated assets

## Cursor Surface Mapping

| Need | Location in isolated root |
|------|---------------------------|
| Invocable workflow | `.cursor/skills/<name>/SKILL.md` |
| Persistent conventions | `.cursor/rules/*.mdc` |
| Event automation | `.cursor/hooks.json` + `.cursor/hooks/*` |
| Governance docs | `DOC/` or `docs/` subdirectory |

Do not mix isolated runtime files into personal `~/.cursor/skills/system-builder/` bundle unless promoting a reusable pattern with explicit user approval.

## Execution Rules

- Keep project-specific runtime assets inside the isolated root.
- Do not mix isolated implementation into shared personal skill lanes.
- Provider choices, API endpoints, env vars, and package names must be explicit and verified.
- Prompt packs, templates, and generation assets must be versioned inside the isolated root.
- Generated outputs must have a defined validation path: structural checks, smoke preview, or fixture tests.
- PII-bearing inputs must have explicit `.gitignore` and handling rules.
- Optional deploy adapters remain isolated from shared lanes.

## Validation

- Isolated root is explicit; no leak of project-specific runtime into shared skill bundle.
- Local skills and governance docs align when a local surface exists.
- Local spec/checklist exists for non-trivial isolated systems.
- Runtime startup, env setup, validation commands, and recovery documented from isolated root.
- Secrets, briefs, outputs have explicit ignore/retention rules.
- Remaining external blockers documented explicitly.

## Failure Modes

- `LOCAL_SYSTEM_ROOT_MISSING`
- `LOCAL_SYSTEM_SPEC_MISSING`
- `LOCAL_SYSTEM_SUPPORT_MISSING`
- `LOCAL_SYSTEM_SCOPE_MIXING`
- `LOCAL_SYSTEM_VALIDATION_GAPS`

## Handoff from System Builder

When archetype fit is `isolated_local_system_required`:

1. Define isolated root path with user.
2. Scaffold minimum artifact set above.
3. Register in project-local docs, not in personal lanes-index unless promoted to shared pattern.
4. Hand off execution to a delivery skill scoped to that isolated root.
