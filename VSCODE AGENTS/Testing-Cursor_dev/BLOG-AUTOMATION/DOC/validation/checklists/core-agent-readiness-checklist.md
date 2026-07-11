# Blog Automation Core Agent Readiness Checklist

- Public local wrapper exists at `.github/agents/blog-automation-core.agent.md`.
- Canonical local source exists at `DOC/agents/blog_automation_core.agent.md`.
- Local public registry lists the core agent.
- Canonical local registry lists the core agent.
- `DOC/execution/spec-rules/local-agent-system-spec.md` includes the core agent in public and canonical surfaces.
- `DOC/execution/spec-rules/core-agent-spec.md` exists.
- The core agent preserves `BLOG-AUTOMATION/` isolated-root boundaries.
- The core agent treats `blog-automation-Claude/` as reference evidence, not canonical truth.
- The core agent requires executable validation for readiness claims.
- The core agent routes specialized work to local specialist agents.
- The core agent explicitly asks for human clarification, approval, or review when the next step depends on it.