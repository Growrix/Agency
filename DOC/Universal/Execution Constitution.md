# Execution Constitution for Agency Documentation and Build Workflow

**Purpose:**
Defines the minimum strict workflow for the full system so AI does not drift between universal rules, role orchestration, project-specific documentation, and later implementation. This file governs both the documentation-generation phase and the later code-execution phase.

---

## 1. The Three Documentation Layers

### Universal Layer
Reusable cross-project assets.

Contains:
- `DOC/Universal/GPT ROLES/`
- `DOC/Universal/Prompts/`
- `DOC/Universal/Enterprise Level Guide/`
- this constitution

Purpose:
- defines how AI should think, route, and orchestrate work

### GPT Role Layer
The worker-role system that generates documentation.

Purpose:
- converts a project plan into structured project-specific artifacts
- each role owns one documentation domain only

### Project-Specific Layer
The generated documentation for one real project.

Contains:
- `DOC/PROJECT PLAN/ai-context.yaml`
- `DOC/PROJECT PLAN/README.md`
- root planning artifacts such as `DOC/PROJECT PLAN/<scope>-e2e-plan.md`
- `DOC/PROJECT PLAN/Shared Contracts/`
- `DOC/PROJECT PLAN/Frontend/`
- `DOC/PROJECT PLAN/Backend/`
- `DOC/PROJECT PLAN/API and Data/`
- `DOC/PROJECT PLAN/Security/`
- `DOC/PROJECT PLAN/DevOps/`
- `DOC/PROJECT PLAN/QA/`

Purpose:
- becomes the only valid source for actual implementation work on that project

---

## 2. Canonical Workflow

There are only two execution stages.

### Stage A: Documentation Generation
Input:
- `DOC/Universal/Prompts/master_orchestration_prompt.md`
- `DOC/MASTER PLAN/Plan.md`

Internal read order:
1. `DOC/Universal/GPT ROLES/ai-context.yaml`
2. `DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md`
3. `DOC/Universal/Execution Constitution.md`
4. `DOC/MASTER PLAN/Plan.md`

Output:
- complete project-specific documentation under `DOC/PROJECT PLAN/`

Rule:
- no code implementation is allowed during this stage

### Stage B: Implementation Execution
Input:
- `DOC/PROJECT PLAN/ai-context.yaml`

Rule:
- once the project-specific documentation exists, all build work must start from the project root ai-context, not from the universal prompt

Additional rule for later fresh, scale, or hybrid planning inside Stage B:
- AI must materialize the plan as a markdown artifact under `DOC/PROJECT PLAN/` before updating the execution tracker or recommending implementation.
- AI must also materialize the affected downstream role-specific planning docs in their owning folders before updating the execution tracker or recommending implementation.
- chat summaries are secondary and never replace the canonical planning artifact.

Purpose:
- keeps implementation grounded in the already-generated project docs instead of re-running orchestration logic

---

## 3. Required Order Inside Stage A

The role workflow must remain sequential:
1. Shared Contracts
2. Frontend
3. Backend
4. API and Data
5. Security
6. DevOps
7. QA
8. Refresh `DOC/PROJECT PLAN/ai-context.yaml` and `DOC/PROJECT PLAN/README.md`

Rules:
- every later phase must read earlier artifacts
- if a valid existing folder already exists, reuse and normalize it instead of blindly replacing it
- no phase may silently override shared contracts
- for scale or enhancement planning, AI must audit the current implementation and prefer extension or normalization over replacement
- documentation generation is incomplete if CMS, database ownership, integration boundaries, or operator workflows are left implicit
- planning is incomplete if the new scope does not exist as a concrete project artifact under `DOC/PROJECT PLAN/` and inside the affected role folders

---

## 4. Required Order Inside Stage B

Implementation work must remain sequential and contract-led.

Recommended execution order:
1. initialize project shell and repository structure
2. implement shared primitives and configuration
3. implement frontend shell and static marketing surfaces
4. implement backend core services and persistence
5. connect API and data contracts
6. harden auth, permissions, and integrations
7. add CI/CD, observability, and deployment controls
8. enforce QA gates and end-to-end verification

Rule:
- implementation may be vertical-slice by feature, but it may not violate the contracts defined in project-specific docs

---

## 5. Canonical Entrypoints

For generating docs:
- `DOC/Universal/Prompts/master_orchestration_prompt.md`

For using the generated project docs:
- `DOC/PROJECT PLAN/ai-context.yaml`

For cross-role authority:
- `DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml`

If AI starts from any other file first, the workflow is off-track.

---

## 6. Stack And Tech Constraints

- Frontend: Next.js, TypeScript, Tailwind, `src/` structure
- Backend: as defined in `DOC/PROJECT PLAN/Backend/README.md`
- API: as defined in `DOC/PROJECT PLAN/API and Data/README.md`
- Database: as defined in `DOC/PROJECT PLAN/API and Data/README.md`
- CMS and content operations: Sanity ownership, authoring flow, and preview or publishing model must be explicit when content-bearing surfaces exist
- Integrations: Stripe, WhatsApp, Email, Calendar, AI, storage, and realtime providers as defined in shared contracts and project-specific docs
- CI/CD and operations: as defined in `DOC/PROJECT PLAN/DevOps/README.md`
- Testing and release gates: as defined in `DOC/PROJECT PLAN/QA/README.md`

If project-specific docs later refine a stack detail, the project-specific layer wins over universal defaults.

---

## 7. Non-Negotiable Rules

Do:
- always read the current phase's `ai-context.yaml` and `README.md`
- always preserve the chain Universal -> GPT Roles -> Project Specific -> Implementation
- always keep `DOC/PROJECT PLAN/ai-context.yaml` current as the project root routing file
- always materialize cross-role planning as a concrete markdown artifact under `DOC/PROJECT PLAN/` and create the affected downstream role docs before touching `Tasks/tasks.md`
- always validate implementation against QA and Security docs before considering a feature complete
- always prefer reuse of existing routes, components, schemas, and integrations before proposing net-new architecture on an existing codebase
- always make CMS, data, integration, and operator ownership explicit during planning rather than leaving them as follow-up guesses

Do not:
- do not invent features outside the project plan
- do not skip or reorder the orchestration phases
- do not start implementation before the project-specific docs exist
- do not treat frontend assumptions as backend truth
- do not let implementation bypass project-specific contracts

---

## 8. Context Recovery

If context is lost during documentation generation, re-read:
1. `DOC/Universal/GPT ROLES/ai-context.yaml`
2. `DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md`
3. `DOC/Universal/Execution Constitution.md`
4. `DOC/MASTER PLAN/Plan.md`

If context is lost during implementation, re-read:
1. `DOC/PROJECT PLAN/ai-context.yaml`
2. `DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml`
3. the current role folder's `ai-context.yaml`
4. the current role folder's `README.md`

---

## 9. Quality Gates

- no implementation is production-ready until QA gates pass
- all critical workflows must have test coverage
- no P0 or P1 defects are allowed at release
- any contract change must be reflected in affected project-specific docs before more code is added

---

**Concrete decision:**
You do not need another separate constitution file.
You need one corrected universal master prompt and one strong constitution that explicitly governs the three-layer workflow and the handoff into `DOC/PROJECT PLAN/ai-context.yaml`.
