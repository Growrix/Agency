# SaaS Agent Migration Notes (2026-06-29)

## Imported to Root `.github/agents`
- `frontend-planner.agent.md`
- `frontend-developer.agent.md`
- `backend-planner.agent.md`
- `backend-developer.agent.md`
- `ongoing-execution-orchestrator.agent.md`
- `system-architect.agent.md`
- `senior-saas-developer.agent.md`
- `system-builder.agent.md`

## Source Origin
- `VSCODE AGENTS/Testing-Cursor_dev/DOC-System-Export-20260518-100741/.github/agents/`
- `VSCODE AGENTS/Testing-Cursor_dev/.github/Senior_SaaS_Developer_Agent.md`
- `VSCODE AGENTS/Testing-Cursor_dev/.github/System_Builder_Agent.md`

## Normalization Applied
1. Converted to Copilot-native frontmatter:
- `description`
- `name`
- `tools`
- `user-invocable: true`
2. Removed source-only schema fields (`agent`, `version`, `runs_after`, `loads`).
3. Added workspace routing guards for dual-track delivery from `AGENTS.md`.
4. Added local-only git discipline and zero-gate validation expectations.

## Environment Configuration Notes
- Root-level Copilot inheritance file added: `.github/copilot-instructions.md`.
- Existing root agents were not modified (add-only coexistence).
- Imported SaaS lane agents explicitly avoid hijacking template-only work in `sites/`.
