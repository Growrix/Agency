# New Blueprint

Run the strategy-first Website Blueprint Factory end-to-end and produce the 12 agency-grade markdown deliverables for one website. Strategy and architecture only — no code, no HTML.

## Inputs

Parse the text after the command as the business brief (e.g. "a premium pest control company in Austin" or a detailed paragraph). If the business/brand name is unclear, ask only for that one fact. Otherwise make confident senior decisions — do not stall with questions.

## Steps

1. **Read the playbook:** `.cursor/skills/website-blueprint-factory/SKILL.md` is authoritative.
2. **Determine the serial:** list `blueprints/` (create it if missing). Find the highest leading integer among `NN-*` folders; the new serial is that + 1, zero-padded to 2 digits (first project = `01`).
3. **Create the project folder:** `blueprints/NN-project-name/` (kebab-case the brand/business name).
4. **Load the ledger:** read `blueprints/_uniqueness-ledger.md` (create from the format described in the factory if missing) so prior projects' choices are known.
5. **Run the pipeline:** delegate to `bp-director`, which orchestrates Stages 01–12, each specialist writing its file using the `references/deliverable-templates.md` skeletons:
   - 01 `bp-01-industry-intelligence` → `01-industry-report.md`
   - 02 `bp-02-competitor-intelligence` → `02-competitor-analysis.md`
   - 03 `bp-03-positioning-strategist` → `03-brand-positioning.md`
   - 04 `bp-04-visual-architecture-director` → `04-visual-architecture.md`
   - 05 `bp-05-homepage-composition-architect` → `05-homepage-composition.md`
   - 06 `bp-06-hero-system-designer` → `06-hero-system.md`
   - 07 `bp-07-conversion-architect` → `07-conversion-system.md`
   - 08 `bp-08-interactive-experience-designer` → `08-interactive-experience.md`
   - 09 `bp-09-motion-director` → `09-motion-system.md`
   - 10 `bp-10-component-system-architect` → `10-component-system.md`
   - 11 `bp-11-uniqueness-enforcer` → verdict (HARD GATE: >30% overlap → loop back to Stage 04)
   - 12 `bp-12-frontend-execution-architect` → `11-frontend-blueprint.md` + `12-final-website-masterplan.md`
6. **Enforce uniqueness:** if Stage 11 rejects, regenerate from Stage 04 until the project is < 30% similar to every prior project, then update `blueprints/_uniqueness-ledger.md`.
7. **Confirm:** report the project folder path, the 7-dimension uniqueness fingerprint, the uniqueness verdict, and confirmation that all 12 files exist and pass the SKILL.md Final QA checklist.

## Notes

- This command never produces code or a built site. To later build the approved blueprint as HTML, use the separate `/new-site` track.
- To run a single stage instead of the whole pipeline, invoke that stage's `bp-NN-*` agent directly with the project folder path.
