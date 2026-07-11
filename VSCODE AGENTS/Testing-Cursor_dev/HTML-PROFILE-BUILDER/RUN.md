# RUN.md

Run all future implementation commands from `HTML-PROFILE-BUILDER/`, not from the workspace root.

Planned milestone-1 commands after implementation:

```bash
npm install
npm run verify
node scripts/form-sync.js --input tests/fixtures/sample-cafe-raw.json --output briefs/ready/brew-and-bean.json
node scripts/build.js --brief briefs/ready/brew-and-bean.json
code outputs/brew-and-bean/v1/copilot-handoff.md
node scripts/validate-output.js --brief outputs/brew-and-bean/v1/input-snapshot.json --html outputs/brew-and-bean/v1/profile.html
node scripts/approve-qa.js --result outputs/brew-and-bean/v1/build-result.json --by "QA Reviewer" --notes "Ready for delivery"
```

Optional later commands:

```bash
node scripts/qr-generate.js <url> outputs/sample-client/v1/sample-client-qr.png
node scripts/deploy-netlify.js --file outputs/sample-client/v1/profile.html
```

If a command depends on third-party credentials, it must fail with an exact missing-env message rather than continuing with a partial build.

Milestone 1 build generation is local and does not require any AI provider API key.

If you want a Copilot refinement pass, open `outputs/<clientId>/<revision>/copilot-handoff.md` in VS Code and run the Phase 3 local agent against the generated `profile.html`.

Agent order for this isolated root:
`Phase 1 System Builder` -> `Phase 2 Workflow Architect` -> `Phase 3 Builder Developer` -> `Phase 4 Validator`

Exact agent filenames for that order:
- `phase-1-html-profile-system-builder.agent.md`
- `phase-2-html-profile-workflow-architect.agent.md`
- `phase-3-html-profile-builder-developer.agent.md`
- `phase-4-html-profile-validator.agent.md`

Normal repeatable build order for one business profile:
1. Use `phase-1-html-profile-system-builder.agent.md` only when changing the system, docs, or agent lane itself.
2. Use `phase-2-html-profile-workflow-architect.agent.md` when you need to change the brief contract, prompts, themes, output rules, or milestone scope.
3. Use `phase-3-html-profile-builder-developer.agent.md` to run or adjust the actual build workflow.
4. Run `node scripts/form-sync.js --input <raw-brief.json> --output briefs/ready/<client-id>.json` when your source brief is still in raw intake format.
5. Run `node scripts/build.js --brief briefs/ready/<client-id>.json` to generate the output bundle.
6. The build will block if the theme roles fail readability contrast or if any required local asset cannot be bundled into the output.
7. The build now also selects a layout family by business archetype instead of forcing one generic page shape for every brief.
7. Open `outputs/<clientId>/<revision>/copilot-handoff.md` only if you want a Copilot refinement pass on the generated `profile.html`.
8. Run `node scripts/validate-output.js --brief outputs/<clientId>/<revision>/input-snapshot.json --html outputs/<clientId>/<revision>/profile.html`.
9. Use `phase-4-html-profile-validator.agent.md` for the final readiness check, then run `node scripts/approve-qa.js --result outputs/<clientId>/<revision>/build-result.json --by "QA Reviewer" --notes "Ready for delivery"` when the bundle is approved.

Current layout-family routing:
- `cafe|restaurant` -> `hospitality-cafe`
- `agency` -> `agency-command`
- `photography|salon` -> `editorial-luxury`
- `retail` -> `retail-shelf`
- fallback -> `profile-core`