# Planner Agent Gap Matrix

**Updated:** 2026-07-18  
**Policy:** RU-AI-BOS-VAULT-001 — enroll only after copy-in to `AI-BOS/`

## Legacy planners (outside vault — reference only)

| Legacy path (host) | Role | AI-BOS status |
|--------------------|------|---------------|
| `.github/agents/growrix-e2e-planning-architect.agent.md` | Full E2E planning → DOC/PROJECT PLAN | Not enrolled |
| `.github/agents/project-e2e-planning-architect.agent.md` | Portable E2E planner | Not enrolled |
| `.github/agents/frontend-planner.agent.md` | Frontend planning | Not enrolled |
| `.github/agents/backend-planner.agent.md` | Backend/API/DevOps planning | Not enrolled |
| `.github/agents/system-architect.agent.md` | Agent-system audit | **Do not enroll** — fold into AG-GOV-SYSBUILD-001 |
| `.github/agents/ongoing-execution-orchestrator.agent.md` | Execution orchestration | Partial overlap AG-DLV-SAAS-001 + AR-009 |

## Vault-local planning knowledge (already portable)

Under `AI-BOS/universal/GPT ROLES/`:

1. Fullstack Contract Orchestrator  
2. Frontend UI/UX Generator  
3. Backend System Planner  
4. API Data Contract Architect  
5. Security Compliance Trust Architect  
6. DevOps Reliability Release Planner  
7. QA Test Release Governor  

Plus `universal/Template/e2e-planning-template.md` and `universal/Prompts/`.

## Missing as registered AG-* (recommended — copy-in first)

| Proposed ID | Source | Notes |
|-------------|--------|-------|
| AG-STR-E2E-001 | e2e planning architects | Stage A docs; copy agent into `.cursor/agents/` first |
| AG-STR-CONTRACT-001 | Fullstack_Contract_Orchestrator | Shared contracts before FE/BE split |
| AG-STR-FE-PLAN-001 | frontend-planner + Frontend_UIUX_Generator | Optional if FE specialist plan mode insufficient |
| AG-STR-BE-PLAN-001 | backend-planner + Backend_System_Planner | Optional if BE agent plan mode insufficient |
| AG-STR-SEC-PLAN-001 | Security_Compliance_Trust_Architect | Optional |
| AG-STR-QA-PLAN-001 | QA_Test_Release_Governor | Optional |

## Current substitute

Delivery agents with `plan_new_scope` / planning modes:

- AG-DLV-SAAS-001 (orchestrator + plan modes)
- AG-DLV-FE-001, AG-DLV-BE-001, AG-DLV-API-001

## Enrollment rule

No registry entry until files exist under `AI-BOS/.cursor/agents/` (and skills if needed). Never register `.github/agents/` paths.
