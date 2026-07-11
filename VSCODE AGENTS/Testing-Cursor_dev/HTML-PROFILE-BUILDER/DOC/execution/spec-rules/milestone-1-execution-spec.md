# Milestone 1 Execution Spec

## Purpose
Lock the first shippable version of the HTML Profile Builder as a deterministic local CLI workflow.

## Milestone 1 Deliverable
From a normalized brief, the system must generate a validated HTML delivery bundle under `outputs/<clientId>/<revision>/`.

## Required Inputs
- `briefs/ready/<clientId>.json`
- prompt files under `prompts/`
- theme files under `themes/`

## Required Outputs
- `profile.html`
- `build-result.json`
- `input-snapshot.json`
- `prompt-bundle.md`
- `copilot-handoff.md`
- `qa-report.md`
- bundled local assets required by the generated HTML

## Execution Rules
- The build must stop on missing required brief fields.
- The build must snapshot the exact input payload used for generation.
- The generator for milestone 1 is the local template renderer, not an external AI API call.
- The renderer must select a layout family that matches the business archetype instead of forcing one generic layout across all business types.
- The build must copy required local brief assets into the output bundle before writing the final HTML.
- The validator must compare the brief against the generated HTML for required fields, forbidden hallucinations, theme-role readability, and bundled local asset resolution.
- The delivery class must remain `blocked` until manual QA is approved and recorded.
- Optional deploy and QR helpers are non-blocking and must remain outside the critical path.

## Acceptance Checks
- At least two sample briefs from different business types complete successfully.
- Generated HTML includes required head/meta structure and semantic sections.
- Artifact bundle is complete for every successful build.
- Distinct business archetypes produce distinct layout-family outputs rather than one universal page skeleton.
- Theme role contrast gates pass for every successful build.
- Local image assets referenced by the output exist inside the output bundle.
- `build-result.json` records omitted optional sections instead of inventing them.
- Manual QA is recorded before a build can be classified above `blocked`.
- `scripts/approve-qa.js` can promote a successful build to `baseline_prototype` with reviewer evidence.

## Failure Modes
- `M1_BRIEF_INVALID`
- `M1_BUILD_FAILED`
- `M1_OUTPUT_INVALID`
- `M1_VALIDATION_FAILED`
- `M1_THEME_ACCESSIBILITY_FAILED`
- `M1_ASSET_BUNDLE_FAILED`