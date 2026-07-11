# Project Starter Bootstrap Spec

## Purpose
Define the governed bootstrap contract used by shared phase1 and DOC-system phase2 agents when a website project root needs its own local DOC system and project-local continuation agents.

## Canonical Source
- Starter package root: `.github/project-starters/hybrid-canonical-project-starter/`
- Bootstrap script: `.github/project-starters/bootstrap-hybrid-canonical-project-starter.ps1`

## Required Inputs
- Target project root or project slug
- The shared phase agent invoking bootstrap
- Whether a phase1 frontend runtime already exists in the target root

## Required Outputs
- The target project root exists
- The starter package is attached without overwriting existing project files by default
- The target root contains local continuation agents under `.github/agents/`
- The target root contains starter docs under `DOC/`
- The target root contains starter memory under `memories/repo/site-brain.md`

## Execution Rules
- Shared phase agents must resolve one canonical target project root before bootstrap.
- If the target root is missing, create it before phase-specific work continues.
- Bootstrap must copy missing files only by default; it must not overwrite existing project files silently.
- Phase1 may create or reuse `FRONTEND DEV/<project-slug>/` and attach the starter package before frontend runtime work begins.
- DOC-system phase2 planning may attach the starter package even when no phase1 runtime exists yet.
- DOC-system phase2 frontend development and polish may attach the starter package if missing, but they must block if the required frontend runtime baseline is absent.
- Local continuation agent filenames must stay generic and reusable.

## Validation
- The starter package exists at the documented source path.
- The bootstrap script runs successfully against an empty temp target.
- A second bootstrap run is idempotent and skips existing files.
- Shared phase agent docs reference the canonical starter source and bootstrap contract.
- Registry docs identify the starter package as the canonical source for new website project roots.

## Failure Modes
- `STARTER_PACKAGE_MISSING`
- `BOOTSTRAP_SCRIPT_MISSING`
- `PROJECT_ROOT_UNRESOLVED`
- `BOOTSTRAP_OVERWRITE_RISK`
- `FRONTEND_BASELINE_MISSING`