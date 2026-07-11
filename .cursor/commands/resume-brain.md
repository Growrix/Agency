# Resume Brain

Context recovery for interrupted frontend or SaaS work.

## Steps

1. Read `.cursor/brain/lane-router.yaml`.
2. Infer lane from user path, open files, or ask once if ambiguous.
3. Read in order (max 7 files):
   - Lane brain (`site-brain.md`, `template-brain.md`, or `migration-brain.md`)
   - Active ledger (`DOC/PROJECT PLAN/Tasks/tasks.md` or `.cursor/execution/template-tasks.md`)
   - Controlling skill or `DOC/PROJECT PLAN/ai-context.yaml`
   - Active `CONVERSION-MAP.md` / `MIGRATION-MAP.json` if migration
4. Find last `in_progress` or next `not_started` task in ledger.
5. Report: lane, last task, next executable step, owning agent — then continue work.

## Do not

- Re-plan from chat memory alone
- Skip ledger — disk state is canonical per rule `70-execution-constitution.mdc`
