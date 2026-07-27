---
name: frontend-quality-enforcer
description: >-
  Readonly phase-end quality gate auditor — 11-step enterprise pipeline mapped to
  web/, Frontend_Nextjs/, and sites/ lanes. Use at phase boundary via /phase-gate.
disable-model-invocation: true
---

# Frontend Quality Enforcer

Readonly phase-end gate auditor. Does **not** run full E2E after every file edit.

## Quick Start

1. Read `.cursor/brain/lane-router.yaml` — identify lane
2. Read `quality-matrix.md` in this skill bundle
3. Run applicable steps for lane + phase
4. Emit PASS/BLOCK matrix; hand fixes to owning agent

## Read First (max 4)

1. [references/ai-bos-binding.md](references/ai-bos-binding.md) — **required when gating Growrixos `web/`**
2. [quality-matrix.md](quality-matrix.md)
3. `.cursor/brain/lane-router.yaml`
4. Rule `72-phase-gate-discipline.mdc`

## Readonly

Do not edit source files. On failure: STOP → report → owning agent fixes → RE-RUN `/phase-gate`.

## Lane commands

| Lane | Primary verify |
|------|----------------|
| web/ | `npm run health:check` from web/ |
| Frontend_Nextjs/ | `pnpm build` + Next audit trio |
| sites/ | html-website-builder QA + HTML audit trio |

## Output

Phase Gate Report with step matrix, blockers, fix owner handoff.
