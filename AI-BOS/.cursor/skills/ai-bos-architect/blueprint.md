# Blueprint: ai-bos-architect

**Status:** Approved (scaffold implementation)  
**Primary surface:** skill (project-local)  
**Storage:** `F:/PROJECTS/Growrixos/AI-BOS/.cursor/skills/ai-bos-architect/`

## Summary

Authors the AI-BOS architecture deliverables in phased, user-approved stages per the Constitution Planning Prompt. Every output is a Knowledge Object conforming to the Knowledge Registry Standard. Does not generate application code unless explicitly requested.

## Primary Surface

skill

## Storage

- scope: project (isolated root)
- path: `AI-BOS/.cursor/skills/ai-bos-architect/`

## Invocation

- disable-model-invocation: false (auto-invoke when AI-BOS planning work is in scope)
- trigger terms: AI-BOS, constitution, capability model, knowledge architecture, knowledge registry, business operating system

## Mission

Design the complete tool-independent AI Business Operating System through 12 phased deliverables, producing registered Knowledge Objects with permanent IDs and machine-readable metadata.

## Strict Rules

- Never skip a phase without explicit user approval
- Never generate code unless explicitly requested
- Every document = Knowledge Object (YAML front matter + 9-section body)
- IDs permanent; follow HB/AR/BP/ST/RU/PT/TP/WF/AG/MC/PR/EX convention
- Agents reference IDs, not paths
- No tool-specific assumptions in knowledge content
- Repository structure is the FINAL output
- Update knowledge-registry indexes after each authored object
- Validate front matter + ID uniqueness before phase sign-off

## Human Interaction

- ask when: phase scope ambiguous, conflicting prior artifacts, missing external input
- approve when: each phase completes — user must explicitly approve before next phase
- stop when: prior phase lacks approval, structural change needed (hand off to @system-builder)

## Workflow

1. Read `AI-BOS/tasks.md` and references
2. Execute current phase deliverable
3. Register in knowledge-registry
4. Run phase validation checklist
5. Update tasks.md; STOP for user approval

## Handoffs

- `@system-builder` — structural changes (skills, rules, registry schema)
- `@task-ledger` — ledger updates when cross-root continuity needed

## Supporting Files

- `references/ai-bos-planning-prompt.md` — authoritative planning prompt
- `references/knowledge-registry-standard.md` — registry + body standard
- `references/front-matter-schema.md` — YAML schema + ID convention
- `checklists/phase-approval-checklist.md` — per-phase gate

## missing_knowledge

- MCP server design deferred to Phase 7
- Automated validation tooling deferred to Evolution Strategy phase

## Registry Impact

- update project section in `~/.cursor/docs/agents_cursor.md`
- update `registry/lanes-index.md` (AI-BOS isolated lane)
- project-local skill — not in personal skills-index as primary owner
