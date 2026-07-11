# HTML Profile Builder Agent Entry Points

This folder is the public local agent surface for the isolated `HTML-PROFILE-BUILDER/` root.

## Phase Order
- Phase 1: `phase-1-html-profile-system-builder.agent.md`
- Phase 2: `phase-2-html-profile-workflow-architect.agent.md`
- Phase 3: `phase-3-html-profile-builder-developer.agent.md`
- Phase 4: `phase-4-html-profile-validator.agent.md`

## When To Use Which
- Phase 1 `phase-1-html-profile-system-builder.agent.md`: use first for system design, local governance, and any lane/spec drift repair.
- Phase 2 `phase-2-html-profile-workflow-architect.agent.md`: use second to lock or revise the brief schema, prompt rules, theme rules, output contracts, and milestone scope.
- Phase 3 `phase-3-html-profile-builder-developer.agent.md`: use third to implement scripts, prompts, themes, templates, validation tooling, and local runtime files.
- Phase 4 `phase-4-html-profile-validator.agent.md`: use last to validate readiness, sample builds, contract parity, and isolated-root compliance.

## Default Execution Sequence
`Phase 1 System Builder` -> `Phase 2 Workflow Architect` -> `Phase 3 Builder Developer` -> `Phase 4 Validator`

## Rules
- Keep this local agent surface inside `HTML-PROFILE-BUILDER/` only.
- Update public wrappers and canonical local sources together.
- Do not mix this system's prompts, scripts, or outputs into shared workspace roots.