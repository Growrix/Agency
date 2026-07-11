# GitHub Copilot + VS Code Agent Design Guidelines

## Purpose
Define strict repository rules for building agents that behave well inside GitHub Copilot Agent Mode in VS Code.

These rules are repository policy for public and local agent surfaces. They are not generic multi-agent framework advice.

## Environment Reality
1. GitHub Copilot custom agents are chat-first, editor-grounded agents.
2. Public agent wrappers are hot-path prompt context. Oversized wrappers reduce reliability and make behavior less predictable.
3. Tool access is finite and must match the actual Copilot environment. Do not design around imaginary tools or external orchestration runtimes.
4. Human interaction is normal, not failure. Agents must ask clarifying questions, request approval, and stop when safe continuation depends on a human decision.
5. Handoffs are usually routing guidance for the user, not autonomous sub-agent execution.
6. File reads, search, diagnostics, terminal commands, and concrete validation are stronger than abstract planning language.

## Mandatory Rules

### 1. Frontmatter Validity Is Non-Negotiable
- Every public `.agent.md` file must start with an opening `---` line and close the frontmatter with `---` before body text.
- Public wrappers must include a meaningful `description`, `name`, `tools`, and `user-invocable` metadata when intended for picker use.
- Broken frontmatter is a blocking compatibility defect because the agent may not parse or appear correctly in VS Code.

### 2. Tool Declarations Must Be Verified
- Only declare tools that are actually supported by the target GitHub Copilot + VS Code environment.
- Do not rely on a tool such as `web` unless the target environment and team workflow have verified it.
- Optional tools must remain optional. The core workflow must still be understandable when an optional tool is unavailable.

### 3. One Public Agent, One Primary Job
- A public wrapper should expose one primary mission that a user can predict from the picker label and description.
- If an agent tries to plan, build, validate, deploy, govern, and route unrelated domains at once, split the responsibilities.
- Keep routing language explicit: tell the user which agent to use next instead of pretending to autonomously switch hidden runtimes.

### 4. Keep Public Wrappers Lean
- Public wrappers should contain the minimum behavior needed for reliable invocation in Copilot.
- Repository policy soft target: keep public wrappers at or under 90 lines.
- Repository policy warning threshold: over 120 lines.
- Repository policy split threshold: over 140 lines means details should move into canonical spec/checklist files unless there is a proven reason not to.
- Move exhaustive matrices, large schemas, and long failure catalogs into canonical spec/checklist files.

### 5. Limit Read-First Surface
- Public wrappers should only list the documents required to start correctly.
- Repository policy soft cap: 8 read-first entries.
- Repository policy hard warning: more than 12 read-first entries.
- If more context is required, load it through canonical files or supporting specs instead of bloating the public wrapper.

### 6. Human Interaction Instructions Are Required For Decision-Heavy Agents
- Any planning, execution, migration, deployment, validation, or system-governance agent must include a dedicated human-interaction section.
- That section must say when to ask clarifying questions, when to request approval, which external inputs must be collected explicitly, and when to stop.
- Missing human-interaction guidance pushes the prompt toward an autonomous-framework style that performs poorly in Copilot.

### 7. Handoff Semantics Must Match Copilot Reality
- Use exact invocable filenames when referring to another agent, for example `phase2-frontend-planning.agent.md`.
- Do not use vague titles such as `Frontend Finishing Agent` unless that exact public agent exists.
- Avoid language such as `spawn`, `delegate to sub-agent`, `launch child agent`, or `parallel agents` in active Copilot surfaces unless the environment truly supports that execution model.
- If legacy exported docs still use those phrases, keep them out of active `.github/agents/` surfaces until rewritten.

### 8. Output Contracts Must Be Chat-Friendly
- Output formats should be easy to follow in a chat transcript.
- Use strict JSON only when a machine-readable artifact is the actual required output.
- Do not force giant JSON payloads in the public wrapper when a spec can define the machine artifact more precisely.

### 9. Workflow Must Match VS Code Strengths
- Start from a concrete anchor: a file, route, runtime root, failing command, or known plan artifact.
- Require focused validation after substantive edits.
- Prefer editor-native evidence: Problems, tests, builds, smoke checks, and local dev runtime proof.
- Avoid framework-agnostic language that assumes long-running autonomous background planning between turns.

### 10. External Inputs Must Be Explicit
- If progress depends on credentials, dashboards, IDs, policy decisions, publish approval, or external services, say so clearly.
- State the exact missing item, why it is needed, whether it is secret, and what action the human must take.
- Do not imply a provider or policy choice exists unless it is already verified in the workspace.

## Recommended Public Wrapper Skeleton
```md
---
description: "..."
name: "..."
tools: [read, search, edit, execute, todo]
user-invocable: true
argument-hint: "..."
---
You are ...

## Primary Mission
...

## Read First
...

## Strict Rules
...

## Human Interaction Instructions
...

## Workflow
...

## Output Format
...

## Handoff
...
```

## Active Anti-Patterns
- broken or missing frontmatter delimiters
- oversized public wrappers that duplicate the entire canonical spec
- generic handoff names that do not map to real invocable agents
- prompts that assume direct multi-agent delegation or background orchestration
- missing human-approval gates for migration, deployment, or external dependency decisions
- invented tool names, providers, env vars, or dashboards

## Migration Priority For Existing Agents
1. Fix frontmatter and parser-level issues first.
2. Replace fake or ambiguous handoff names with real agent filenames.
3. Add human-interaction instructions to decision-heavy agents.
4. Move oversized detail from public wrappers into canonical specs/checklists.
5. Audit tool declarations against the actual Copilot environment.