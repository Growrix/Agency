# Brief And Output Contract Spec

## Purpose
Define the exact input and output contracts for the HTML Profile Builder.

## Input Classes

### Raw Intake
- Source: copied Google Form export, Apps Script JSON payload, or manually prepared source JSON
- Location: `briefs/inbox/`
- Status: untrusted, not buildable directly

### Normalized Brief
- Source: output of `form-sync.js` or manual normalization
- Location: `briefs/ready/`
- Status: buildable

## Required Normalized Brief Fields
- `clientId`
- `revision`
- `businessName`
- `tagline`
- `businessType`
- `colorVibe`
- `deliveryTier`
- `contact.phone`
- `contact.whatsapp`
- `contact.email`
- `location.address`
- `location.googleMapsLink`
- `social.facebook`
- `social.instagram`
- `social.website`
- `services`
- `hours`
- `aboutText`
- `team`
- `assets.logoPath`
- `assets.gallery`
- `optionalSections`

## Optional Normalized Brief Fields
- `optionalSections.statusLabel`
- `optionalSections.ratingLabel`
- `optionalSections.proofStats`
- `optionalSections.portfolioLabels`
- `optionalSections.techStack`
- `optionalSections.processSteps`
- `optionalSections.deliveryInfo`
- `optionalSections.bookingLink`

## Required Output Bundle

### `profile.html`
- Full HTML document
- Must begin with `<!DOCTYPE html>`
- Must contain `meta name="description"`
- Must contain Open Graph title and description tags
- Must expose the selected layout family on `body[data-layout]`
- Must not contain unreadable foreground/background combinations in the shipped theme roles
- Must not reference missing local image assets

### Bundled local assets
- Every local `assets.logoPath` reference used by the build must be copied into the output bundle
- Every local `assets.gallery` reference used by the build must be copied into the output bundle
- Output HTML must reference the bundled output-local asset paths, not source-root-only paths

### `build-result.json`
- `status`
- `delivery_class`
- `manual_qa_pending`
- `manual_qa.approved_by`
- `manual_qa.approved_at`
- `manual_qa.notes`
- `client_id`
- `revision`
- `theme_name`
- `business_type`
- `model`
- `required_sections_rendered`
- `omitted_sections`
- `validation_results`
- `build_started_at`
- `build_completed_at`

For milestone 1, `model` records the local generation engine identifier and must be `local-template-renderer`.

### `input-snapshot.json`
- Exact normalized brief used for the generation call

### `prompt-bundle.md`
- Combined system prompt
- Category prompt if used
- Theme snapshot
- Build instruction block

### `copilot-handoff.md`
- Phase-3 local agent reminder
- exact target HTML file path
- exact brief/output rules
- refinement instructions for VS Code + Copilot use

### `qa-report.md`
- Pre-filled checklist path
- manual approval fields
- blockers or revision notes

## QA Approval Rules
- A build may start as `status=passed` while still remaining `delivery_class=blocked`.
- `delivery_class` may move to `baseline_prototype` only after QA approval is recorded.
- QA approval must record reviewer name, approval timestamp, and approval notes in both `build-result.json` and `qa-report.md`.
- Failed builds must not be approvable.

## Blocking Rules
- Missing required brief field: block
- Nonexistent theme mapping: block
- Theme role contrast failure: block
- Missing local asset referenced by the brief: block
- Model call failure: block
- HTML missing required structure: block
- HTML referencing missing bundled local assets: block
- Invented content detected: block

## Output Path Rules
- Output path format: `outputs/<clientId>/<revision>/`
- No flat writes directly under `outputs/`
- Every build must be revision-scoped