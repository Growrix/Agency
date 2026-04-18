# Continue Role Orchestration Prompt (Frontend Already Done)

**Purpose:**
Use this prompt when the frontend documentation is already complete and approved. This will generate the rest of the project-specific documentation in strict, sequential order, without overwriting the frontend planning set.

---

## Canonical Usage

Use this prompt together with your project plan:
- `DOC/MASTER PLAN/Plan.md`

The AI must read the universal orchestration system, treat the existing frontend docs as source material, and generate the remaining project documentation in order.

---

## Canonical Prompt Body

```text
Start with DOC/Universal/GPT ROLES/ai-context.yaml.

Before generating anything, read these files in order:
1. DOC/Universal/GPT ROLES/ai-context.yaml
2. DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md
3. DOC/Universal/Execution Constitution.md
4. DOC/MASTER PLAN/Plan.md
5. DOC/PROJECT PLAN/Frontend/ai-context.yaml

Your job is to generate or update the remaining project-specific documentation set in DOC/PROJECT PLAN/ by orchestrating the GPT roles in strict sequence, skipping the frontend phase.

You are not implementing the website yet.
You are creating the implementation-ready project documentation that later execution will follow.

Execution model:
1. Inspect DOC/PROJECT PLAN/ to see what already exists.
2. Do not overwrite or regenerate DOC/PROJECT PLAN/Frontend/ unless a cross-contract dependency requires it.
3. Run the role workflow sequentially, never in parallel.
4. Every later phase must read the artifacts created by earlier phases.
5. If a valid existing folder already exists, reuse and normalize it instead of blindly replacing it.

Role sequence (skip frontend):
1. Fullstack_Contract_Orchestrator
	- Output: DOC/PROJECT PLAN/Shared Contracts/
2. Backend_System_Planner
	- Output: DOC/PROJECT PLAN/Backend/
3. API_Data_Contract_Architect
	- Output: DOC/PROJECT PLAN/API and Data/
4. Security_Compliance_Trust_Architect
	- Output: DOC/PROJECT PLAN/Security/
5. DevOps_Reliability_Release_Planner
	- Output: DOC/PROJECT PLAN/DevOps/
6. QA_Test_Release_Governor
	- Output: DOC/PROJECT PLAN/QA/

For each role output folder, generate at minimum:
- ai-context.yaml
- README.md
- any additional role-specific markdown files required by that role

Strict orchestration rules:
- Do not invent requirements outside DOC/MASTER PLAN/Plan.md unless clearly marked as assumptions.
- Do not skip, reorder, or merge phases.
- Do not let one role write another role's documentation type.
- Do not start code implementation.
- If context becomes unclear, re-read the universal files and the project root ai-context.yaml before continuing.
- Keep DOC/PROJECT PLAN/ai-context.yaml updated so it remains the canonical AI entrypoint after generation is complete.
- All new documentation must align with the already-existing frontend docs in DOC/PROJECT PLAN/Frontend/.

Final outcome:
Produce a complete, implementation-ready, project-specific documentation system under DOC/PROJECT PLAN/ that is internally consistent, sequentially generated, and ready for the later build phase, with the approved frontend docs preserved.
```

---

## Canonical Inputs

- `DOC/MASTER PLAN/Plan.md`
- `DOC/Universal/GPT ROLES/ai-context.yaml`
- `DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md`
- `DOC/Universal/Execution Constitution.md`
- `DOC/PROJECT PLAN/Frontend/ai-context.yaml`

## Canonical Outputs

- `DOC/PROJECT PLAN/Shared Contracts/`
- `DOC/PROJECT PLAN/Backend/`
- `DOC/PROJECT PLAN/API and Data/`
- `DOC/PROJECT PLAN/Security/`
- `DOC/PROJECT PLAN/DevOps/`
- `DOC/PROJECT PLAN/QA/`

## Important Decision

This file is the only prompt you should hand to AI for the continuation documentation-generation phase (frontend already done).
After the project-specific documentation exists, later implementation should start from `DOC/PROJECT PLAN/ai-context.yaml`, not from this prompt again.
