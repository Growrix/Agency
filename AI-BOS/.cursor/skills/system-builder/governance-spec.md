# System Builder Governance Spec

## Purpose

Define the governed workflow for designing, auditing, extending, repairing, and aligning the Cursor agent system itself.

## Required Inputs

- A system-level request or drift report
- Optional large blueprint/spec artifact requiring module-level readiness audit
- Personal skill surface under `~/.cursor/skills/`
- Optional project skill surface under `.cursor/skills/`
- Applicable registry docs, specs, and checklists in this bundle

## Required Outputs

- Updated agent system artifacts at the correct locations (personal vs project scope)
- Supporting governance artifacts for any non-trivial system change
- Updated registry documentation for any new or materially changed skill
- Updated **`~/.cursor/docs/agents_cursor.md`** when agents, skills, lanes, or commands changed (mandatory — see [registry/agents-anatomy.md](registry/agents-anatomy.md))
- Updated task-ledger references whenever a change affects project execution continuity
- Explicit archetype-fit decision: `shared_lane_fit`, `isolated_local_system_required`, or `unsupported_without_new_knowledge`
- Blueprint readiness matrix: `currently_supported`, `requires_extension`, `missing_knowledge`
- Lane handoff mapping from blueprint modules to execution owners (skill names)
- Cursor compatibility verdict when frontmatter, handoff, tool, or interaction behavior is in scope
- Isolated local-system scaffold plan when `isolated_local_system_required` (see [isolated-local-system.md](isolated-local-system.md))
- Bangla external-input acquisition brief when progress is blocked on user-provided third-party items

## Change Classes

Each request or discovered issue must be classified as at least one of:

- `skill_gap` — missing or incomplete skill bundle
- `rule_gap` — missing or stale `.mdc` rule
- `hook_gap` — missing or broken hook config/script
- `automation_gap` — missing automation draft or incomplete trigger/action
- `governance_gap` — spec/checklist missing or stale
- `validation_gap` — checklist not run or failing
- `registry_drift` — skills-index or lanes-index out of date
- `handoff_drift` — ambiguous or wrong downstream skill reference
- `knowledge_gap` — unknown tool, API, env var, or integration
- `archetype_gap` — blueprint forced into wrong delivery pattern

Legacy Copilot terms (`wrapper_gap`, `canonical_gap`, `mirror_drift`) map to Cursor equivalents:

| Legacy | Cursor equivalent |
|--------|-------------------|
| `wrapper_gap` | `skill_gap` (thin SKILL.md missing or broken) |
| `canonical_gap` | `governance_gap` (reference/spec files missing) |
| `mirror_drift` | N/A — no mirror sync in portable Cursor bundle |

## Execution Rules

- Start by inventorying existing skills, rules, hooks, automations, governance files, and registries.
- Before material system work, read or create `project_root/tasks.md` and append the active task block.
- Reuse existing structures before creating new ones.
- For any non-trivial skill change, update SKILL.md, support files, and registry together.
- Preserve active delivery lanes unless the user explicitly asks to redesign or replace them.
- If the request is mainly blueprint + one final artifact with no registry/governance change, use Mode 1/2 only.
- Audit active skills for valid frontmatter, exact handoff skill names, realistic tool assumptions, and human-interaction guidance.
- Classify blueprint fit before handoff: shared lane, isolated local system, or unsupported without new knowledge.
- Do not force CLI/local automation/file-output blueprints through shared delivery lanes when isolated fit is cleaner.
- Keep system artifacts generic and portable; do not hardcode project-specific output behavior.
- Report unresolved structural drift explicitly; do not imply readiness.
- Classify every major blueprint module into `currently_supported`, `requires_extension`, or `missing_knowledge`.
- Unknown dependencies must be reported as `missing_knowledge`, never assumed.
- Before creating agents: read `~/.cursor/docs/agents_cursor.md`; after creating agents: update it and append version log.
- External blockers: emit Bangla acquisition brief per SKILL.md protocol.

## Mode Workflows

### MODE: DESIGN

1. Parse request: new lane, new skill, governance expansion, or single-artifact authoring.
2. Inventory reusable skills, specs, and checklists.
3. Emit required artifact set and dependency order, or route to Mode 1/2 when governance change is not needed.

### MODE: AUDIT

1. Inventory skill surface, rules, hooks, registries, specs, checklists.
2. Classify issues using change classes above.
3. Classify delivery archetype and module readiness.
4. Report readiness and minimum fix set.

### MODE: EXTEND

1. Add or revise required artifacts.
2. Update governance and registries in the same pass.
3. Preserve adjacent lane boundaries and handoff contracts.
4. If isolated local fit, keep project-specific assets inside isolated root.
5. Update `tasks.md` with evidence before reporting completion.

### MODE: ALIGN

1. Propagate approved rule/architecture change through all affected surfaces.
2. Remove stale wording that conflicts with new behavior.
3. Re-validate changed surfaces.
4. Update `tasks.md` with aligned artifacts and validation results.

### MODE: REPAIR

1. Start from audit or concrete drift report.
2. Apply smallest complete edit set that closes declared drift.
3. Re-run structural validation.
4. Update `tasks.md` with repair evidence and remaining gaps.

### MODE: DOCUMENT

1. Refresh registries after structural changes.
2. Confirm new or changed skills are discoverable from skills-index.

## Validation

- Skill exists with valid frontmatter (`name`, `description`) and meaningful description.
- Supporting governance files exist for non-trivial meta-skill changes.
- Registry lists newly added or materially changed skills.
- Archetype-fit is explicit before downstream handoff.
- Isolated local system references [isolated-local-system.md](isolated-local-system.md) when selected.
- Blueprint module coverage and lane ownership explicit for all major modules.
- External-input blocker messaging uses Bangla acquisition protocol.
- Task-ledger validation passes: `tasks.md` exists, no stale `in_progress`, completed tasks have evidence.

## Failure Modes

- `SYSTEM_REQUEST_MISSING`
- `SYSTEM_SKILL_MISSING`
- `SYSTEM_SUPPORTING_ARTIFACTS_MISSING`
- `SYSTEM_REGISTRY_DRIFT`
- `SYSTEM_ARCHETYPE_UNCLEAR`
- `SYSTEM_ISOLATED_SYSTEM_SPEC_MISSING`
- `SYSTEM_VALIDATION_FAILED`
- `SYSTEM_BLUEPRINT_UNCOVERED`

## Machine Output (optional)

When the user requests structured output:

```json
{
  "status": "passed | failed",
  "mode": "DESIGN | AUDIT | EXTEND | ALIGN | REPAIR | DOCUMENT",
  "files_touched": ["..."],
  "classifications": ["skill_gap", "registry_drift"],
  "archetype_fit": "shared_lane_fit | isolated_local_system_required | unsupported_without_new_knowledge",
  "blueprint_readiness": {
    "currently_supported": ["..."],
    "requires_extension": ["..."],
    "missing_knowledge": ["..."]
  },
  "validations_run": ["compatibility-checklist"],
  "remaining_gaps": ["..."]
}
```
