# HTML Profile Builder

Isolated local system root for the HTML Business Profile Builder.

This root is intentionally separate from the shared website lanes, Foundation lane, and other local systems in the workspace.

## Canonical Documents
- Locked blueprint: `DOC/PLAN/HTML-PROFILE-BUILDER-BLUEPRINT.md`
- Local agent registry: `DOC/agents/README.md`
- Local system spec: `DOC/execution/spec-rules/local-agent-system-spec.md`
- Milestone-1 spec: `DOC/execution/spec-rules/milestone-1-execution-spec.md`
- Brief/output contract: `DOC/execution/spec-rules/brief-output-contract-spec.md`
- Readiness checklists: `DOC/validation/checklists/`

## Phase Lane
- Phase 1: `phase-1-html-profile-system-builder.agent.md`
- Phase 2: `phase-2-html-profile-workflow-architect.agent.md`
- Phase 3: `phase-3-html-profile-builder-developer.agent.md`
- Phase 4: `phase-4-html-profile-validator.agent.md`

Default order:
`Phase 1 System Builder` -> `Phase 2 Workflow Architect` -> `Phase 3 Builder Developer` -> `Phase 4 Validator`

## Isolation Rules
- Keep implementation assets inside `HTML-PROFILE-BUILDER/`.
- Do not place project-specific prompts, themes, briefs, outputs, or scripts in workspace-root systems.
- Treat `On Going DOCS/SAAS PLAN/html-profile-builder-blueprint.md` as the draft/source note, not the locked execution canon.

## Locked Milestone Outcome
Milestone 1 is a deterministic local builder that turns one normalized client brief into one validated HTML delivery bundle with traceable build artifacts.

Successful builds now require readable theme-role contrast and bundled local asset resolution, not only structural HTML validity.

The renderer is now layout-family aware instead of using one generic page skeleton for every business type.

Current layout families:
- `hospitality-cafe` for cafe and restaurant briefs
- `agency-command` for agency briefs
- `editorial-luxury` for photography and salon briefs
- `retail-shelf` for retail briefs
- `profile-core` fallback for other supported business types

## Runtime Model
Milestone 1 does not call an external AI API.

GitHub Copilot is used during development inside VS Code to help author and refine the builder, prompts, themes, and templates. The runtime itself is a local deterministic renderer inside this isolated root.

## Implemented Local Commands
```bash
npm install
npm run verify
node scripts/form-sync.js --input tests/fixtures/sample-cafe-raw.json --output briefs/ready/brew-and-bean.json
node scripts/build.js --brief briefs/ready/brew-and-bean.json
code outputs/brew-and-bean/v1/copilot-handoff.md
node scripts/approve-qa.js --result outputs/brew-and-bean/v1/build-result.json --by "QA Reviewer" --notes "Ready for delivery"
```

Additional sample layout-family proof:
```bash
node scripts/form-sync.js --input tests/fixtures/sample-photography-raw.json --output briefs/ready/northlight-studio.json
node scripts/build.js --brief briefs/ready/northlight-studio.json --output-root outputs/live-run-check
node scripts/validate-output.js --brief outputs/live-run-check/northlight-studio/v1/input-snapshot.json --html outputs/live-run-check/northlight-studio/v1/profile.html
node scripts/approve-qa.js --result outputs/live-run-check/northlight-studio/v1/build-result.json --by "QA Reviewer" --notes "Photography editorial layout verified"
```

## VS Code Workflow
- Run the tasks from `.vscode/tasks.json` inside `HTML-PROFILE-BUILDER/`.
- After each build, open `outputs/<clientId>/<revision>/copilot-handoff.md` in VS Code if you want Copilot to do a higher-touch refinement pass on top of the local renderer output.
- The local renderer produces the first complete HTML file; Copilot can then refine that file inside the editor using the locked brief, theme, and output contract.
- The build will now fail early if the selected theme produces unreadable role combinations or if the brief references a local asset that does not resolve into the output bundle.