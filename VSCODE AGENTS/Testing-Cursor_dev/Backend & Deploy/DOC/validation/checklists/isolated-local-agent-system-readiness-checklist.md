# Isolated Local Agent System Readiness Checklist

- The blueprint has been explicitly classified as a better fit for an isolated local system than for the shared website/foundation lanes.
- The isolated root path is declared before implementation starts.
- Project-specific prompts, themes, templates, scripts, outputs, and runtime code stay inside the isolated root.
- Local public wrappers exist under `.github/agents/` when a local invocable surface is required.
- Matching local canonical agent sources exist under `DOC/agents/` when local wrappers exist.
- Local registry documentation is updated when the local public surface changes.
- A local execution spec and validation checklist exist for non-trivial local-agent work.
- Runtime docs (`README.md`, `RUN.md`, `ENV.example`, or equivalents) exist and are rooted to the isolated system.
- Secrets, briefs, outputs, and other sensitive/generated assets have explicit ignore/retention rules.
- Validation commands and quality expectations are documented from the isolated root.
- Remaining unknown integrations, APIs, env vars, dashboards, or credentials are called out explicitly.