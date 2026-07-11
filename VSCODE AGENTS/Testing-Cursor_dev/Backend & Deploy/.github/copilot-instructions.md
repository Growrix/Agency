# Copilot Workspace Instructions

Keep the public `.github/agents` surface low-chaos and system-oriented.

## Source Of Truth
- Canonical planning and execution rules live in `DOC/`.
- `.github/agents` is the public workspace agent surface for VS Code Copilot.
- VS Code documents agent discovery at `.github/agents`, but does not clearly guarantee recursive folder loading. Keep public agent files flat for discovery safety.
- Reduce picker confusion with scoped agent names, `user-invocable: false` on legacy agents, and grouped README/catalog guidance.

## Operating Rules
- For the stable DOC system use:
	- `frontend_planner` -> `backend_planner` -> `frontend_developer` / `backend_developer`
- For the Foundation + template system use:
	- `foundation_planner` -> `foundation_developer` -> `template_import_attacher` -> `template_post_import_continuation` -> `template_deployment_operator`
	- use `Claude_Frontend_Agent` for screenshot-first template creation or visual continuation work.
- For the DS system use:
	- `DS_site_planner` -> `DS_Frontend_developer`
- Keep factory experiments and the legacy ongoing execution orchestrator hidden from the picker unless explicitly debugging that lane.
- Do not invent integrations, routes, env vars, or schema fields that are absent from DOC knowledge files.
- Keep Frontend-Master_DS as generic canonical DS; do not write project-specific routes/pages/presets into canonical DS runtime paths.
- For DS execution, implement and run project-specific changes only inside DOC/output/runs/<timestamp>/codegen/<project-slug>/ clones.

## Visibility Rules
- Prefer agents whose picker names are prefixed by system: `[Foundation]`, `[Template]`, `[DS]`, and `[Meta]`.
- Treat `[Legacy]` agents as hidden workflow artifacts, not normal entrypoints.

## Artifact Output
Write generated artifacts under DOC/output/runs/<timestamp>/ with subfolders:
- planning/
- specs/
- reports/
- codegen/
