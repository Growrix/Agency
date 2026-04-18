# Continue Role Orchestration Prompt (Frontend Already Done)

Use this prompt when the frontend documentation already exists and you want the AI to generate the rest of the project documentation in one sequential orchestration run.

---

## Input Source

Read this project plan as the primary human input:

```text
DOC/MASTER PLAN/Plan.md
```

Use these existing frontend docs as already-approved source material:

```text
DOC/PROJECT PLAN/Frontend/
```

---

## Prompt

```text
Start with DOC/Universal/GPT ROLES/ai-context.yaml.

This project already has frontend documentation completed in DOC/PROJECT PLAN/Frontend. Do not regenerate or replace the frontend planning set unless a direct cross-contract dependency forces a clearly documented adjustment. Treat the existing frontend docs as active source material that downstream roles must align with.

Read the project input from DOC/MASTER PLAN/Plan.md.
Read the workflow rules from DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md.

Then orchestrate the remaining documentation roles in strict sequence and generate the rest of the execution-ready documentation set.

Execution rules:
1. Start from the universal role entrypoint and follow the contract-first workflow.
2. Reuse the completed frontend documentation as context.
3. Skip frontend generation as a standalone phase.
4. Generate the remaining documentation in one managed sequential run.
5. If the shared contract layer is missing or incomplete, create or normalize it first without discarding the approved frontend work.
6. If any conflict appears between the master plan and the existing frontend docs, document the conflict explicitly and resolve it before continuing.
7. Every role must stay within its own responsibility and produce only its correct documentation type.

Run these roles in order:
- Fullstack_Contract_Orchestrator
- Backend_System_Planner
- API_Data_Contract_Architect
- Security_Compliance_Trust_Architect
- DevOps_Reliability_Release_Planner
- QA_Test_Release_Governor

Output requirements by folder:
- Shared contract and cross-system blueprint docs -> DOC/PROJECT PLAN/Shared Contracts/
- Backend docs -> DOC/PROJECT PLAN/Backend/
- API and data docs -> DOC/PROJECT PLAN/API and Data/
- Security docs -> DOC/PROJECT PLAN/Security/
- DevOps docs -> DOC/PROJECT PLAN/DevOps/
- QA docs -> DOC/PROJECT PLAN/QA/

For each target folder, generate:
- ai-context.yaml
- README.md
- the role-specific documentation set required by that role

Global constraints:
- Follow the invariants and anti-mismatch rules from DOC/Universal/GPT ROLES/ai-context.yaml.
- Keep all documentation aligned with the already-existing frontend docs in DOC/PROJECT PLAN/Frontend.
- Produce execution-ready documentation, not partial notes.
- Do not ask to re-enter requirements that already exist in DOC/MASTER PLAN/Plan.md unless a true blocker exists.
- Prefer resolving gaps through documented assumptions rather than stopping early.

Final outcome:
Generate the remaining project documentation so the repo contains a complete, implementation-ready, cross-role documentation system aligned with the approved frontend planning.
```

---

## References

- Universal role entry: `DOC/Universal/GPT ROLES/ai-context.yaml`
- Workflow guide: `DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md`
- Project input: `DOC/MASTER PLAN/Plan.md`
- Existing frontend docs: `DOC/PROJECT PLAN/Frontend/`

---

This prompt is for continuation mode: frontend is already done, and the AI should generate the remaining documentation set in a strict sequential orchestration.
