# Isolated Local Agent System Spec

## Purpose
Define the governed pattern for project-specific local automation/tooling systems that do not belong in the shared website/foundation lanes.

This pattern is for systems such as:
- Node.js CLI generators
- prompt-driven file builders
- local ops dashboards
- automation pipelines
- content or asset emitters
- single-file HTML/profile generators

## Use When
- The blueprint is primarily local, script-driven, or file-output driven rather than a shared Next.js SaaS runtime.
- The product depends on prompts, briefs, templates, or generated artifacts that should stay inside a dedicated root.
- The clean delivery model is a local tool, utility, or automation system rather than a multi-phase website + backend lane.
- Forcing the work into the shared phase1-7 or Foundation lanes would create architectural drift.

## Required Inputs
- A locked blueprint or implementation plan
- A chosen isolated root path
- The exact integrations, APIs, env vars, and external dashboards in scope
- The expected output artifacts and validation standards

## Required Outputs
- An isolated project root for the local system
- Local public wrappers under `<isolated-root>/.github/agents/` when a local agent picker surface is needed
- Local canonical agent sources under `<isolated-root>/DOC/agents/` when local wrappers exist
- A local execution spec and validation checklist
- A local registry README describing the isolated agent surface
- Runtime documentation such as `README.md`, `RUN.md`, or equivalent startup instructions
- `ENV.example` or equivalent env contract
- Explicit retention/ignore rules for secrets, briefs, outputs, and other sensitive/generated assets

## Execution Rules
- Keep project-specific runtime assets inside the isolated root.
- Do not mix isolated local-system implementation files into the shared `Backend & Deploy/` delivery lanes.
- Do not force Next.js, Vercel, or shared SaaS-route conventions when the blueprint is a local CLI or file-output system.
- Provider choices, API endpoints, env vars, and package names must be explicit and verified.
- Prompt packs, theme files, templates, and other generation assets must be versioned inside the isolated root.
- Generated outputs must have a defined validation path: structural checks, smoke preview steps, or deterministic fixture tests.
- PII-bearing inputs such as client briefs must have explicit `.gitignore` and handling rules.
- Optional deploy adapters (for example Netlify, QR, email, or messaging delivery helpers) must remain isolated from the shared lanes.

## Validation
- The isolated root is explicit and does not leak project-specific runtime files into the shared lanes.
- Local wrappers and local canonical sources align when a local public surface exists.
- Local spec/checklist support exists for non-trivial local agent systems.
- Runtime startup, env setup, validation commands, and recovery steps are documented from the isolated root.
- Secrets, briefs, outputs, and other sensitive/generated assets have explicit ignore/retention rules.
- Remaining external blockers are documented explicitly.

## Failure Modes
- `LOCAL_SYSTEM_ROOT_MISSING`
- `LOCAL_SYSTEM_SPEC_MISSING`
- `LOCAL_SYSTEM_SUPPORT_MISSING`
- `LOCAL_SYSTEM_SCOPE_MIXING`
- `LOCAL_SYSTEM_VALIDATION_GAPS`