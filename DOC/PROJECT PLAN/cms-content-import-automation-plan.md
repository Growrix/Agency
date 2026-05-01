---
document_type: planning-artifact
scope: cms-content-import-automation
status: active-draft
last_updated: 2026-05-01
owner: frontend-cms-operations
---

# CMS Content Import Automation Plan

## 1. Objective
Reduce manual Sanity field-by-field copy/paste by introducing a file-driven import workflow for:
- Case Study (`caseStudy`)
- Blog Post (`blogPost`)
- Shop Item (`shopItem`)

Target outcome:
- Operator generates one structured content file from template.
- CLI importer creates/updates the Sanity document automatically.
- Operator only uploads screenshots/images manually.

## 2. Current State Audit
- Templates already exist for the three content types under `DOC/PROJECT PLAN/`.
- Sanity schema supports all three content models.
- No deterministic importer existed for template -> Sanity document sync.
- Current process is high-friction and error-prone due to repeated manual field paste.

## 3. Chosen Solution
Implement a deterministic CLI importer in the web workspace:
- Script: `web/scripts/import-cms-content.mjs`
- Command: `npm --prefix web run cms:import -- --type <caseStudy|blogPost|shopItem> --file <path>`
- Input formats:
  - Markdown files with fenced `yaml` block
  - Raw `.yaml` / `.yml`
  - Raw `.json`
- Operation mode:
  - `--dry-run` to validate payload mapping
  - `createOrReplace` for idempotent upsert

## 4. Data Contract
### Required environment
- `SANITY_API_TOKEN` (write token)
- Optional overrides:
  - `SANITY_PROJECT_ID` (default `1tk4ulcx`)
  - `SANITY_DATASET` (default `production`)

### Document IDs
- `caseStudy.<slug>`
- `shopItem.<slug>`
- `blogPost.<slug>`

### Safety behavior
- Deterministic IDs avoid duplicate records.
- `--dry-run` allows schema/mapping inspection before mutation.
- Missing required importer inputs fail early with clear error output.

## 5. Field Mapping Strategy
### Case study
Maps template payload to:
- Basics + proof
- New technical fields:
  - `deliveryStory`
  - `process`
  - `integrations`
  - `seo`
  - `standards`

### Blog post
- Auto-creates missing `category` and `author` references from payload labels.
- Supports:
  - `bodyPortableText` (direct)
  - `bodyOutline` (auto-converted to Portable Text blocks)

### Shop item
- Maps commerce + delivery fields directly from template payload.
- Keeps image upload manual as requested.

## 6. Operator Workflow
1. Generate content file from template.
2. Run dry-run command:
   - `npm --prefix web run cms:import -- --type caseStudy --file ./content/case-study.md --dry-run`
3. Verify payload output.
4. Run import command without dry-run.
5. Open Sanity Studio and upload images/screenshots.
6. Publish.

## 7. Validation and Quality Gates
- Static gate: script executes with valid args and env.
- Contract gate: generated payload fields align with current schema keys.
- Functional gate: document appears in Studio and renders on site after publish/revalidate.
- Regression gate: existing manual workflow still works (no schema-breaking removals).

## 8. Risks and Mitigations
- Risk: malformed YAML from LLM outputs.
  - Mitigation: enforce `--dry-run` as first step and fail fast on parse errors.
- Risk: optional fields omitted in generated payload.
  - Mitigation: importer provides safe defaults for non-critical fields.
- Risk: author/category naming inconsistencies.
  - Mitigation: deterministic slug-based reference IDs for auto-created refs.

## 9. Expansion Path
Phase-2 enhancements (optional):
- Add image asset import support from local file paths.
- Add content linting rules (word count, tag count, SEO length checks).
- Add a minimal operator UI wrapper over CLI for non-technical editors.
- Add batch import mode for folders.

## 10. Immediate Deliverables
- Implemented script command and parser/upsert flow.
- Updated all three templates with `contentType` and importer usage blocks.
- Extended case-study model to support technical storytelling fields used on slug pages.
