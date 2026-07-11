# GitHub Copilot + VS Code Agent Compatibility Audit

## Scope
- Shared public wrappers under `.github/agents/`
- Canonical system-builder and agent-builder surfaces under `Backend & Deploy/`
- Representative local public surfaces under `BLOG-AUTOMATION/`, `HTML-PROFILE-BUILDER/`, `GIT-WORKSPACE-MANAGER/`, and `On Going DOCS/Growrixos/`
- Legacy exported reference surface under `DOC-System-Export-20260518-100741/`

## Method
- frontmatter integrity scan across active public agent roots
- wrapper line-count scan on shared surfaces
- handoff-name existence check on shared phase wrappers
- human-interaction coverage scan on shared wrappers
- optional-tool usage count on shared wrappers
- legacy orchestration-language scan on exported reference agents

## Findings

### High Severity
1. Broken frontmatter on active shared wrappers.
   - Affected before repair:
     - `.github/agents/phase1-site-replication.agent.md`
     - `.github/agents/phase2-doc-system-planning.agent.md`
     - `.github/agents/phase2-doc-system-frontend-dev.agent.md`
     - `.github/agents/phase3-doc-system-polish.agent.md`
   - Impact: these wrappers were at risk of not parsing correctly as GitHub Copilot custom agents.
   - Status: repaired in this change set.

2. Ambiguous handoff names in active phase-1 replication prompts.
   - Affected before repair:
     - `.github/agents/phase1-site-replication.agent.md`
     - `Backend & Deploy/Templates/local-business/nexform-consulting/.github/agents/phase1-site-replication.agent.md`
     - `FRONTEND DEV/nexform-website/.github/agents/phase1-site-replication.agent.md`
   - Problematic names:
     - `Frontend Audit Planner Agent`
     - `Frontend Finishing Agent`
   - Impact: the prompts referenced non-existent invocable agent names instead of real file-based handoffs.
   - Status: repaired in this change set with exact agent filenames.

### Medium Severity
3. Human-interaction coverage is too low on the shared public surface.
   - Shared wrappers with explicit human-interaction sections at audit time: `2`
   - Shared wrappers without explicit human-interaction sections at audit time: `26`
   - Covered files at audit time:
     - `.github/agents/blog-automation-core.agent.md`
     - `.github/agents/phase2.6-nextjs-native-completion.agent.md`
   - Impact: many agents still read like autonomous framework prompts instead of GitHub Copilot chat-first agents.
   - Post-repair state in this change set: `4` of `28` shared wrappers now include explicit human-interaction sections.

4. Several public wrappers are oversized for hot-path prompt context.
   - Longest shared wrappers observed:
     - `.github/agents/phase2.6-nextjs-native-completion.agent.md` at `146` lines
     - `Backend & Deploy/.github/agents/phase2.6-nextjs-native-completion.agent.md` at `140` lines
     - `Backend & Deploy/.github/agents/template_import_attacher.agent.md` at `139` lines
     - `Backend & Deploy/.github/agents/phase1.3-replica-to-native-nextjs-frontend.agent.md` at `134` lines
     - `Backend & Deploy/.github/agents/system_builder.agent.md` at `134` lines
   - Impact: reliability risk, slower convergence, and more context spent on prompt overhead instead of workspace evidence.

5. Shared wrappers rely on optional `web` tooling in multiple places.
   - Shared wrappers using `web` at audit time: `12`
   - Impact: compatibility depends on the exact GitHub Copilot + VS Code build and enabled capabilities.
   - Status: not treated as a confirmed defect, but now governed as a verification requirement.

### Low Severity / Structural Risk
6. Legacy exported reference agents still contain true delegation language.
   - Confirmed example: `DOC-System-Export-20260518-100741/DOC/agents/master_planner.agent.md`
   - Impact: acceptable as quarantined reference material, but unsafe if promoted directly into active `.github/agents/` surfaces without rewrite.

## Repairs Applied In This Change Set
1. Added permanent GitHub Copilot + VS Code design policy:
   - `Backend & Deploy/DOC/core/copilot-vscode-agent-design-guidelines.md`

2. Added permanent compatibility checklist:
   - `Backend & Deploy/DOC/validation/checklists/copilot-vscode-agent-compatibility-checklist.md`

3. Wired the policy into the two meta agents responsible for designing and auditing agents:
   - `system-builder.agent.md`
   - `agent-builder-modes2.agent.md`
   - canonical mirrors, specs, and readiness checklists aligned in the same change set

4. Repaired four shared public wrappers with invalid opening frontmatter.

5. Repaired shared and representative derived phase-1 handoff names to exact invocable agent filenames.

## Repository Policy Decision
The repository should treat GitHub Copilot + VS Code compatibility as a first-class design constraint for all active public agents.

That means:
- valid frontmatter is mandatory
- exact file-based handoff names are mandatory
- human-interaction rules are mandatory for decision-heavy agents
- tool declarations must be verified against the actual Copilot environment
- public wrappers should stay lean, with detailed matrices and schemas moved into canonical spec/checklist files
- exported multi-agent orchestration prompts must remain quarantined unless rewritten for Copilot reality

## Remaining Gaps
1. Apply explicit human-interaction sections to the remaining shared decision-heavy wrappers.
2. Verify `web` tool availability against the actual GitHub Copilot + VS Code build used by the team, then either keep, downgrade to optional, or remove it.
3. Reduce oversized public wrappers by moving detail into canonical spec/checklist files where possible.
4. Audit project-local cloned wrappers for drift from repaired shared surfaces.
5. Keep `DOC-System-Export-20260518-100741/` as reference only until any promoted agents are rewritten to avoid direct delegation semantics.

## Recommended Next Repair Order
1. Add human-interaction sections to the shared planning, execution, deploy, and validation agents.
2. Trim the longest shared wrappers first: phase 2.6, template import attacher, phase 1.3, and system builder.
3. Run a second compatibility sweep across project-local clones created before these repairs.