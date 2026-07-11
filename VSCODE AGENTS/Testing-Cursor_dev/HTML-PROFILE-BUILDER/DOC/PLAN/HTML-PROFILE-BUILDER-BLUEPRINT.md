# HTML Profile Builder Blueprint

Status: locked
Version: 1.1
Date: 2026-05-18
System class: isolated local automation/tooling system
Local root: `HTML-PROFILE-BUILDER/`

## 1. Decision

This system is locked as an isolated local builder, not a shared website/runtime lane.

The product is:
- a Node.js local CLI build system
- a prompt-and-template-driven local HTML renderer
- a file-output delivery workflow
- an optional local-only deploy/QR helper surface

The product is not:
- a Next.js site lane
- a Foundation-Core continuation
- a shared workspace service
- a self-service SaaS in milestone 1

## 2. Locked Outcome

One normalized client brief must produce one deterministic build bundle containing:
- one complete mobile-first HTML profile
- one input snapshot used for the build
- one prompt bundle used as a generation and design trace
- one Copilot handoff file for optional editor-side refinement
- one machine-readable build result manifest
- one QA report/checklist artifact

This is the minimum proven outcome for milestone 1.

## 3. Milestone-1 Scope

Milestone 1 includes:
- local brief intake via manual JSON drop or Google Form export copied into the isolated root
- brief normalization into a locked per-client JSON contract
- theme selection by `colorVibe`
- prompt bundle assembly by `businessType`
- deterministic local HTML rendering from the locked brief + theme + section rules
- HTML structural validation
- manual QA checklist generation
- optional QR generation after a successful build

Milestone 1 does not include:
- client login/auth
- hosted self-service ordering
- online payments
- analytics dashboards
- client-side editing UI
- multi-page websites
- automatic live deployment as a required success path

## 4. Non-Negotiable Rules

- The system must run from `HTML-PROFILE-BUILDER/` only.
- No client content may be hand-typed into HTML files.
- Prompts must not require fields the brief contract does not provide.
- Sections with missing data must be omitted, not hallucinated.
- The build must fail fast on missing required inputs.
- The output must always start with `<!DOCTYPE html>`.
- PII-bearing briefs and generated deliverables must remain git-ignored.

## 5. Isolated Root Structure

```text
HTML-PROFILE-BUILDER/
  .github/agents/
  DOC/
    PLAN/
    agents/
    execution/spec-rules/
    validation/checklists/
  briefs/
    inbox/
    ready/
  assets/
    logos/
    gallery/
    uploads/
  prompts/
  themes/
  templates/
  scripts/
  outputs/
  qa/
  README.md
  RUN.md
  ENV.example
  .gitignore
```

## 6. Locked Input Contract

### 6.1 System Inputs

| Input | Required | Type | Notes |
|---|---|---|---|
| `NETLIFY_TOKEN` | no | secret env var | Optional only for later deploy automation |
| `prompts/system-prompt.md` | yes | markdown | Shared generation rules |
| `prompts/<businessType>-prompt.md` | conditional | markdown | Loaded only when a matching file exists |
| `themes/<theme>.json` | yes | json | Loaded from `colorVibe` mapping |
| `templates/*.html` | no | html snippets | Reference-only quality aids |

### 6.2 Per-Client Inputs

Required normalized brief fields:

```json
{
  "clientId": "brew-and-bean",
  "revision": "v1",
  "businessName": "Brew & Bean",
  "tagline": "Artisan Coffee & Cafe",
  "businessType": "cafe",
  "colorVibe": "warm",
  "deliveryTier": "professional",
  "contact": {
    "phone": "+8801700000000",
    "whatsapp": "8801700000000",
    "email": "hello@example.com"
  },
  "location": {
    "address": "House 12, Road 64, Gulshan-2, Dhaka 1212",
    "googleMapsLink": "https://maps.google.com/..."
  },
  "social": {
    "facebook": "https://facebook.com/example",
    "instagram": "https://instagram.com/example",
    "website": ""
  },
  "services": [
    {
      "name": "Signature Cold Brew",
      "description": "12hr steeped, over ice",
      "price": "BDT 320"
    }
  ],
  "hours": {
    "mondayFriday": "7:00am - 10:00pm",
    "saturday": "8:00am - 11:00pm",
    "sunday": "8:00am - 11:00pm",
    "publicHolidays": "9:00am - 9:00pm"
  },
  "aboutText": "Short brand story.",
  "team": [],
  "assets": {
    "logoPath": "assets/logos/brew-and-bean/logo.png",
    "gallery": []
  },
  "optionalSections": {
    "statusLabel": "",
    "ratingLabel": "",
    "proofStats": [],
    "portfolioLabels": [],
    "techStack": [],
    "processSteps": [],
    "deliveryInfo": "",
    "bookingLink": ""
  }
}
```

### 6.3 Input Rules

- `clientId` and `revision` are mandatory for deterministic output paths.
- `services` must be an array even when empty.
- `team` must be an array even when empty.
- `optionalSections` keys must exist even if their values are empty.
- Prompts may only render `proofStats`, `techStack`, `processSteps`, `portfolioLabels`, `ratingLabel`, `deliveryInfo`, or `bookingLink` when the brief provides them.
- `Open Now` may be rendered only when hours are parseable enough for a deterministic status calculation; otherwise omit the label.

## 7. Locked Output Contract

Each successful build must write to:

```text
outputs/<clientId>/<revision>/
  profile.html
  build-result.json
  input-snapshot.json
  prompt-bundle.md
  copilot-handoff.md
  qa-report.md
```

Optional artifacts:

```text
outputs/<clientId>/<revision>/
  <clientId>-qr.png
  deploy-receipt.json
  preview-notes.md
```

`build-result.json` must include:
- `status`
- `delivery_class`
- `manual_qa_pending`
- `manual_qa`
- `client_id`
- `revision`
- `theme_name`
- `business_type`
- `required_sections_rendered`
- `omitted_sections`
- `validation_results`
- `model`
- `build_started_at`
- `build_completed_at`

In milestone 1, `model` is the local generation engine identifier and must be `local-template-renderer`.

`copilot-handoff.md` must include:
- target output file path
- brief and theme usage rules
- no-hallucination rules
- phase-3 local agent reference
- validation reminders before QA approval

Allowed `delivery_class` values:
- `blocked`
- `baseline_prototype`
- `production_candidate`

Milestone 1 may complete as `baseline_prototype` only when all milestone-1 gates pass.

## 8. Script Responsibilities

| Script | Input | Output | Notes |
|---|---|---|---|
| `scripts/form-sync.js` | form export or copied raw JSON | `briefs/ready/<clientId>.json` | Normalizes field names and arrays |
| `scripts/build.js` | normalized brief + prompt files + theme | build bundle under `outputs/<clientId>/<revision>/` | Required milestone-1 script |
| `scripts/validate-output.js` | built html + normalized brief | validation section inside `build-result.json` and `qa-report.md` | Required milestone-1 proof step |
| `scripts/approve-qa.js` | successful `build-result.json` + reviewer details | approved `build-result.json` and filled `qa-report.md` | Required to move a build above `blocked` |
| `scripts/qr-generate.js` | hosted URL | QR PNG | Optional |
| `scripts/deploy-netlify.js` | built html file + optional token | deploy receipt / URL | Optional and not a milestone-1 blocker |

## 9. Prompt and Theme Rules

- `system-prompt.md` must forbid invented content.
- Category prompts must describe only layouts/behavior that can be driven by the brief.
- `minimal-white` must not use Inter because the master prompt forbids it. Use an allowed Google font during implementation.
- Prompts must say "omit if not provided" for optional proof/status/process sections.
- Placeholder portfolio tiles are allowed only when the brief explicitly requests placeholder portfolio blocks.

## 10. Validation Gates

Milestone 1 is not locked complete unless all of the following pass:

1. Brief completeness gate: normalized brief matches the contract.
2. Prompt parity gate: prompts do not require missing data.
3. HTML structure gate: output starts with `<!DOCTYPE html>`, contains `<html>`, `<head>`, `<body>`, required meta tags, and no markdown fences.
4. Link gate: phone, WhatsApp, map, and social links use the correct targets when provided.
5. Artifact gate: required files exist in the output bundle.
6. Manual QA gate: `qa-report.md` is filled and approved.
7. Local quality gate: isolated-root code passes lint/typecheck/test with zero warnings once implementation exists.

Manual QA approval path:
- a successful build starts as `delivery_class=blocked`
- `scripts/approve-qa.js` records reviewer name, approval timestamp, and notes
- only then may milestone 1 promote the build to `baseline_prototype`

Copilot role in milestone 1:
- GitHub Copilot helps build and evolve this system inside VS Code.
- The runtime itself does not call Copilot or any external AI API.
- Each build emits `copilot-handoff.md` so VS Code + Copilot can refine the generated HTML inside the editor without breaking the locked contract.

## 11. Local Agent Surface

The isolated root will own these local agents in a fixed phase order:
- Phase 1: local system builder
- Phase 2: local workflow architect
- Phase 3: local builder developer
- Phase 4: local validator

Their canonical definitions must live under `DOC/agents/` and their public wrappers under `.github/agents/` inside this isolated root.

Default execution path:
`Phase 1 System Builder` -> `Phase 2 Workflow Architect` -> `Phase 3 Builder Developer` -> `Phase 4 Validator`

## 12. Acceptance Criteria For Locked Milestone 1

Milestone 1 is accepted only when:
- one sample cafe brief builds successfully
- one sample agency or photography brief builds successfully
- each build produces the full required artifact bundle
- omitted optional sections are recorded explicitly in `build-result.json`
- no invented business facts appear in the HTML
- the output is readable at 360px, 375px, and 414px widths
- briefs and outputs remain outside git tracking

## 13. Later Roadmap (Not Locked Into Milestone 1)

Later phases may add:
- automated form syncing
- deploy automation
- QR bundling
- revision history UI
- local dashboard
- self-service ordering flow

These are separate scope decisions and must not leak into milestone 1 by default.