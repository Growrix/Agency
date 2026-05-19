# Master Orchestration Prompt (Reusable)

**Purpose:**
This is the single canonical, reusable prompt for generating a complete documentation set for any project using the universal role-based orchestration system. It always includes the frontend phase. It does not implement product code. It orchestrates the GPT roles in sequence so AI creates or updates the correct files under `DOC/PROJECT PLAN/`.

---

## How To Use

Use this prompt with your project plan source (e.g., `DOC/MASTER PLAN/Plan.md`).

The AI must read the universal orchestration system, follow the strict role sequence, and generate the full documentation set for any project, always including frontend.

---

## Canonical Prompt Body

```text
Start with DOC/Universal/GPT ROLES/ai-context.yaml.

Before generating anything, read these files in order:
1. DOC/Universal/GPT ROLES/ai-context.yaml
2. DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md
3. DOC/Universal/Execution Constitution.md
4. DOC/MASTER PLAN/Plan.md

Your job is to generate or update the full documentation set in DOC/PROJECT PLAN/ by orchestrating the GPT roles in strict sequence, always including the frontend phase.

You are not implementing the website or product code yet.
You are creating the implementation-ready documentation that later execution will follow.

Execution model:
1. Inspect DOC/PROJECT PLAN/ to see what already exists.
2. Create or refresh DOC/PROJECT PLAN/ai-context.yaml and DOC/PROJECT PLAN/README.md as the project root entrypoint.
3. Run the role workflow sequentially, never in parallel.
4. Every later phase must read the artifacts created by earlier phases.
5. If a valid existing folder already exists, reuse and normalize it instead of blindly replacing it.

Role sequence (always include frontend):
1. Fullstack_Contract_Orchestrator
   - Output: DOC/PROJECT PLAN/Shared Contracts/
2. Frontend_UIUX_Generator
   - Output: DOC/PROJECT PLAN/Frontend/
3. Backend_System_Planner
   - Output: DOC/PROJECT PLAN/Backend/
4. API_Data_Contract_Architect
   - Output: DOC/PROJECT PLAN/API and Data/
5. Security_Compliance_Trust_Architect
   - Output: DOC/PROJECT PLAN/Security/
6. DevOps_Reliability_Release_Planner
   - Output: DOC/PROJECT PLAN/DevOps/
7. QA_Test_Release_Governor
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

Final outcome:
Produce a complete, implementation-ready documentation system under DOC/PROJECT PLAN/ that is internally consistent, sequentially generated, and ready for the later build phase.
```

---

## Canonical Inputs

- `DOC/MASTER PLAN/Plan.md`
- `DOC/Universal/GPT ROLES/ai-context.yaml`
- `DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md`
- `DOC/Universal/Execution Constitution.md`

## Canonical Outputs

- `DOC/PROJECT PLAN/ai-context.yaml`
- `DOC/PROJECT PLAN/README.md`
- `DOC/PROJECT PLAN/Shared Contracts/`
- `DOC/PROJECT PLAN/Frontend/`
- `DOC/PROJECT PLAN/Backend/`
- `DOC/PROJECT PLAN/API and Data/`
- `DOC/PROJECT PLAN/Security/`
- `DOC/PROJECT PLAN/DevOps/`
- `DOC/PROJECT PLAN/QA/`

## Important Decision

This file is the only prompt you should hand to AI for the full documentation-generation phase (always includes frontend).
After the documentation exists, later implementation should start from `DOC/PROJECT PLAN/ai-context.yaml`, not from this prompt again.
