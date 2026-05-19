---
description: "Alias for the canonical Growrix strict executor agent. Use this entry when selecting the strict executor by the Growrixos naming convention."
name: "Growrixos Strict Executor"
tools: [read, search, edit, execute, todo]
user-invocable: true
---
Canonical agent file: .github/agents/growrix-strict-executor.agent.md

Use the canonical file above as the source of truth for all strict execution behavior, including:
- mandatory DOC/PROJECT PLAN/ai-context.yaml reading
- zero-gate validation discipline
- local commit only (no push, no merge)
- required post-change dev-server checks:
  - web dev server must be running
  - studio dev server must be running when studio is available
