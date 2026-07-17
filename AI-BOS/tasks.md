# AI-BOS Execution Ledger

**Root:** `F:/PROJECTS/Growrixos/AI-BOS/`  
**Owner skill:** `@ai-bos-architect`  
**Governance skill:** `@system-builder`

## Active phase

| Phase | Name | Status | Evidence |
|-------|------|--------|----------|
| 0 | Isolated root scaffold | completed | `AI-BOS/README.md`, `AI-BOS/knowledge-registry/`, `.cursor/skills/ai-bos-architect/` |
| 1 | Refine overall vision | completed | `knowledge/architecture/AR-AI-BOS-001-vision.md` — **approved 2026-07-16** |
| 2 | Constitution TOC | completed | `knowledge/architecture/AR-AI-BOS-002-constitution-toc.md` — **approved 2026-07-16** |
| 3 | Challenge assumptions | completed | `knowledge/architecture/AR-AI-BOS-003-assumption-review.md` — **approved 2026-07-16** (D1/D2/D3 defaults accepted) |
| 4 | Business Capability Model | completed | `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — **approved 2026-07-16** |
| 5 | Knowledge Architecture | completed | `knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md` — **approved 2026-07-16** (D1: defer to Phase 11) |
| 6 | Documentation Architecture | completed | `knowledge/architecture/AR-AI-BOS-006-documentation-architecture.md` — **approved 2026-07-16** |
| 7 | Agent Architecture | completed | `knowledge/architecture/AR-AI-BOS-007-agent-architecture.md` — **approved 2026-07-16** |
| 8 | MCP Architecture | completed | `knowledge/architecture/AR-AI-BOS-008-mcp-architecture.md` — **approved 2026-07-16** |
| 9 | Execution Architecture | completed | `knowledge/architecture/AR-AI-BOS-009-execution-architecture.md` — **approved 2026-07-16** |
| 10 | Governance | completed | `knowledge/architecture/AR-AI-BOS-010-governance.md` — **approved 2026-07-16** |
| 11 | Project Architecture | completed | `knowledge/architecture/AR-AI-BOS-011-project-architecture.md` — **approved 2026-07-16** (D1 re-evaluation: defer final to Phase 12) |
| 12 | Standards, Templates, Evolution Strategy | completed | `knowledge/architecture/AR-AI-BOS-012-standards-templates-evolution.md` — **approved 2026-07-16** |
| I1 | Foundation implementation | completed | Four registries + 10 ST-* + 7 TP-* + docs/ + `PRJ-GOV-AI-BOS-001` — **completed 2026-07-17** |
| I2 | Operational wiring | completed | 3 AG-* + 1 MC-* + 2 WF-* + 2 HB-* + project wired — **completed 2026-07-17** |
| I3 | Wire PRJ-SAAS-GROWRIXOS-001 | completed | `web/` project + 6 delivery AG-* mapped to existing Cursor skills — **completed 2026-07-17** |
| I4 | SaaS agent readiness (knowledge + skills + rules) | completed | 44 KOs; 6 skill bindings; rule 76; docs inventory — **completed 2026-07-17** |

## Task list

- [x] **0.1** Scaffold isolated root (README, RUN, ENV.example, .gitignore) — evidence: `AI-BOS/`
- [x] **0.2** Create local governance rule — evidence: `AI-BOS/.cursor/rules/75-ai-bos-governance.mdc`
- [x] **0.3** Scaffold knowledge-registry JSON indexes — evidence: `AI-BOS/knowledge-registry/`
- [x] **0.4** Create `@ai-bos-architect` skill bundle — evidence: `AI-BOS/.cursor/skills/ai-bos-architect/`
- [x] **0.5** Align Growrixos root rules 60 + 70 — evidence: `.cursor/rules/60-zero-gate-health-check.mdc`, `70-execution-constitution.mdc`
- [x] **0.6** Update system-builder registries — evidence: `~/.cursor/docs/agents_cursor.md`, `registry/skills-index.md`, `registry/lanes-index.md`
- [x] **1.1** Phase 1 — Refine overall vision — completed — evidence: `knowledge/architecture/AR-AI-BOS-001-vision.md` — **approved 2026-07-16**
- [x] **1.2** Phase 1 — Register vision artifact in knowledge-registry — completed — evidence: `knowledge-registry/registry.json`
- [x] **2.1** Phase 2 — Author Constitution TOC — completed — evidence: `knowledge/architecture/AR-AI-BOS-002-constitution-toc.md` — **approved 2026-07-16**
- [x] **2.2** Phase 2 — Register Constitution TOC in knowledge-registry — completed — evidence: `knowledge-registry/registry.json`
- [x] **3.1** Phase 3 — Author assumption review — completed — evidence: `knowledge/architecture/AR-AI-BOS-003-assumption-review.md` — **approved 2026-07-16**
- [x] **3.2** Phase 3 — Register assumption review in knowledge-registry — completed — evidence: `knowledge-registry/registry.json`
- [x] **4.1** Phase 4 — Author Business Capability Model — completed — evidence: `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — **approved 2026-07-16**
- [x] **4.2** Phase 4 — Register Capability Model in knowledge-registry — completed — evidence: `knowledge-registry/registry.json`
- [x] **5.1** Phase 5 — Author Knowledge Architecture — completed — evidence: `knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md` — **approved 2026-07-16**
- [x] **5.2** Phase 5 — Register Knowledge Architecture in knowledge-registry — completed — evidence: `knowledge-registry/registry.json` + `handbook-index.json`
- [x] **5.3** Phase 5 — Evaluate repo promotion trigger (D1) — completed — decision: **defer to Phase 11** (Option B). Evidence: `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-evaluation.md`. No structural change applied.
- [x] **6.1** Phase 6 — Author Documentation Architecture — completed — evidence: `knowledge/architecture/AR-AI-BOS-006-documentation-architecture.md` — **approved 2026-07-16**
- [x] **6.2** Phase 6 — Register Documentation Architecture in knowledge-registry — completed — evidence: `knowledge-registry/registry.json` + `handbook-index.json`
- [x] **7.1** Phase 7 — Author Agent Architecture — completed — evidence: `knowledge/architecture/AR-AI-BOS-007-agent-architecture.md` — **approved 2026-07-16**
- [x] **7.2** Phase 7 — Register Agent Architecture in knowledge-registry — completed — evidence: `knowledge-registry/registry.json` + `handbook-index.json`
- [x] **8.1** Phase 8 — Author MCP Architecture — completed — evidence: `knowledge/architecture/AR-AI-BOS-008-mcp-architecture.md` — **approved 2026-07-16**
- [x] **8.2** Phase 8 — Register MCP Architecture in knowledge-registry — completed — evidence: `knowledge-registry/registry.json` + `handbook-index.json`
- [x] **8.3** Phase 8 — System-builder structural alignment (three-registry model) — completed — `agents_cursor.md` Project: AI-BOS section updated with three-registry model + phase progress + version log row
- [x] **9.1** Phase 9 — Author Execution Architecture — completed — evidence: `knowledge/architecture/AR-AI-BOS-009-execution-architecture.md` — **approved 2026-07-16**
- [x] **9.2** Phase 9 — Register Execution Architecture in knowledge-registry — completed — evidence: `knowledge-registry/registry.json` + `handbook-index.json`
- [x] **10.1** Phase 10 — Author Governance — completed — evidence: `knowledge/architecture/AR-AI-BOS-010-governance.md` — **approved 2026-07-16**
- [x] **10.2** Phase 10 — Register Governance in knowledge-registry — completed — evidence: `knowledge-registry/registry.json` + `handbook-index.json`
- [x] **11.1** Phase 11 — Author Project Architecture — completed — evidence: `knowledge/architecture/AR-AI-BOS-011-project-architecture.md` — **approved 2026-07-16**
- [x] **11.2** Phase 11 — Register Project Architecture in knowledge-registry — completed — evidence: `knowledge-registry/registry.json` + `handbook-index.json`
- [x] **11.3** Phase 11 — D1 repo-promotion re-evaluation (per Phase 3 Option B) — completed — decision: **defer final D1 to after Phase 12** (Option B). Evidence: `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-reevaluation.md`. No structural change applied.
- [x] **12.1** Phase 12 — Author Standards, Templates, Evolution Strategy (+ final repository structure) — completed — evidence: `knowledge/architecture/AR-AI-BOS-012-standards-templates-evolution.md`
- [x] **12.2** Phase 12 — Register Phase 12 artifact in knowledge-registry — completed — evidence: `knowledge-registry/registry.json` + `handbook-index.json` (AR-011 promoted to active)
- [x] **12.3** Phase 12 — Final D1 repo-promotion decision (per Phase 11 deferral) — completed — decision: **Option B — keep as isolated root; close D1 with concrete re-evaluation triggers** (terminal decision, no further deferral). Evidence: `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-final-decision.md`. No structural change applied. Re-evaluation triggers: (1) second consumer project, (2) ≥10 ST/TP/HB KOs authored, (3) explicit user request.
- [x] **I1.1** Scaffold `agent-registry/`, `mcp-registry/`, `project-registry/` — completed — evidence: each has `registry.json` + type index
- [x] **I1.2** Scaffold `knowledge/` type folders + `docs/` with `docs/index.json` — completed — evidence: `knowledge/{handbooks,blueprints,standards,rules,patterns,templates,workflows,prompts,examples}/`, `docs/{guides,reference,concepts}/`
- [x] **I1.3** Author 10 ST-* Standard Knowledge Objects — completed — evidence: `knowledge/standards/ST-*.md` + `knowledge-registry/standard-index.json`
- [x] **I1.4** Author 7 TP-* Template Knowledge Objects — completed — evidence: `knowledge/templates/TP-*.md` + `knowledge-registry/template-index.json`
- [x] **I1.5** Register all new objects in `knowledge-registry/registry.json` + type indexes; promote AR-011/012 to active — completed — evidence: 29 objects in registry SSOT; `architecture-index.json` created; handbook-index cleared of AR spill
- [x] **I1.6** Register self-project `PRJ-GOV-AI-BOS-001` — completed — evidence: `project-registry/registry.json`
- [x] **I1.7** Update README, `agents_cursor.md`, ledger — completed — evidence: this file + `~/.cursor/docs/agents_cursor.md`
- [x] **I2.1** Register agents AG-KNW-ARCH-001, AG-GOV-SYSBUILD-001, AG-KNW-VALID-001 — completed — evidence: `agent-registry/registry.json`
- [x] **I2.2** Register MCP MC-KNW-REGISTRY-001 (five canonical services) — completed — evidence: `mcp-registry/registry.json`
- [x] **I2.3** Author workflows WF-GOV-PHASE-APPROVE-001 + WF-KNW-AUTHOR-001 — completed — evidence: `knowledge/workflows/` + `workflow-index.json`
- [x] **I2.4** Author handbooks HB-KNW-AUTHORING-001 + HB-GOV-OPS-001 — completed — evidence: `knowledge/handbooks/` + `handbook-index.json`
- [x] **I2.5** Wire `PRJ-GOV-AI-BOS-001` agents/mcp/workflows/governance — completed — evidence: `project-registry/registry.json`
- [x] **I2.6** D1 Trigger 2 acknowledgment (reaffirm Option B) — completed — evidence: `AI-BOS/.cursor/audits/2026-07-17-d1-trigger2-acknowledgment.md`
- [x] **I2.7** Update docs pages + anatomy + ledger — completed — evidence: `docs/`, `README.md`, `agents_cursor.md`, this file
- [x] **I3.1** Register delivery agents AG-DLV-* (map existing Cursor skills; no new skills) — completed — evidence: `agent-registry/registry.json` (9 agents total)
- [x] **I3.2** Register `PRJ-SAAS-GROWRIXOS-001` → `F:/PROJECTS/Growrixos/web/` — completed — evidence: `project-registry/registry.json`
- [x] **I3.3** Document projects catalog + update anatomy/ledger — completed — evidence: `docs/reference/projects-catalog.md`, `agents_cursor.md`, this file
- [x] **I4.1** Author SaaS knowledge pack (5 HB + 4 ST + 1 WF + 1 RU) — completed — evidence: `knowledge/handbooks/HB-ENG-*`, `HB-OPS-REL-001`, `knowledge/standards/ST-{SEC,TST,API,FE-DS}-001`, `WF-DLV-SAAS-FEATURE-001`, `RU-AI-BOS-SAAS-001`
- [x] **I4.2** Register KOs + wire PRJ-SAAS-GROWRIXOS-001 consumes — completed — evidence: `knowledge-registry/` (44 objects), `project-registry/registry.json`
- [x] **I4.3** EXTEND 6 delivery skill AI-BOS bindings — completed — evidence: `~/.cursor/skills/*/references/ai-bos-binding.md` + SKILL.md Read First
- [x] **I4.4** Add rule 76-ai-bos-saas-binding.mdc + align rule 70 — completed — evidence: `.cursor/rules/76-ai-bos-saas-binding.mdc`, `70-execution-constitution.mdc`
- [x] **I4.5** Docs + anatomy + runtime inventory — completed — evidence: `docs/reference/saas-knowledge-catalog.md`, `runtime-surface-inventory.md`, `~/.cursor/docs/agents_cursor.md`

## Log

| Date | Entry |
|------|-------|
| 2026-07-16 | Isolated root scaffolded per AI-BOS build plan. `@system-builder` DESIGN + ALIGN + DOCUMENT complete. Handoff to `@ai-bos-architect` for Phase 1 pending user approval. |
| 2026-07-16 | Phase 1 vision draft authored: `AR-AI-BOS-001`. Registered in `knowledge-registry/registry.json`. Awaiting user approval before Phase 2. |
| 2026-07-16 | **Phase 1 approved by user.** Proceeding to Phase 2 — Constitution TOC. |
| 2026-07-16 | Phase 2 Constitution TOC authored: `AR-AI-BOS-002`. Registered in `knowledge-registry/registry.json`. Awaiting user approval before Phase 3. |
| 2026-07-16 | **Phase 2 approved by user.** Proceeding to Phase 3 — Review and challenge assumptions. |
| 2026-07-16 | Phase 3 assumption review authored: `AR-AI-BOS-003`. 12 assumptions challenged, 3 user decisions, 5 flags. Registered in `knowledge-registry/registry.json`. Awaiting user approval before Phase 4. |
| 2026-07-16 | **Phase 3 approved by user.** D1/D2/D3 defaults accepted (own-repo after Phase 5; agent-generated knowledge allowed; batch approval for Phases 10–12). Proceeding to Phase 4 — Business Capability Model. |
| 2026-07-16 | Phase 4 Business Capability Model authored: `AR-AI-BOS-004`. 7 groups, 30 capabilities, full vision coverage map. Registered in `knowledge-registry/registry.json`. Awaiting user approval before Phase 5. |
| 2026-07-16 | **Phase 4 approved by user.** Proceeding to Phase 5 — Knowledge Architecture. |
| 2026-07-16 | Phase 5 Knowledge Architecture authored: `AR-AI-BOS-005`. Type taxonomy, registry structure, consumer model, lifecycle, 10 validation rules, capability binding. Back-filled `capabilities` on prior registry objects. Registered in `knowledge-registry/registry.json` + `handbook-index.json`. Awaiting user approval before Phase 6. D1 promotion trigger evaluation deferred to post-approval per Phase 3 default. |
| 2026-07-16 | **Phase 5 approved by user** via `@system-builder`. D1 repo-promotion evaluation now running in `@system-builder` AUDIT mode. |
| 2026-07-16 | **D1 decision: defer to Phase 11 (Option B).** No structural change. AI-BOS remains isolated root inside Growrixos; `@ai-bos-architect` remains project-local. Re-evaluate at Phase 11 gate when repository structure is designed. Evidence: `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-evaluation.md`. Handoff back to `@ai-bos-architect` for Phase 6. |
| 2026-07-16 | Phase 6 — Documentation Architecture started. |
| 2026-07-16 | Phase 6 Documentation Architecture authored: `AR-AI-BOS-006`. Doc types, navigation model, separate doc index, authoring conventions, versioning, capability binding. Registered in `knowledge-registry/registry.json` + `handbook-index.json`. Awaiting user approval before Phase 7. |
| 2026-07-16 | **Phase 6 approved by user** ("proceed to Phase 7"). Proceeding to Phase 7 — Agent Architecture. |
| 2026-07-16 | Phase 7 Agent Architecture authored: `AR-AI-BOS-007`. Agent identity, separate agent registry, authority levels (autonomous/supervised/advisory), lifecycle, handoff contracts, agent-generated knowledge (D2), vendor-independent runtime projection, capability binding. Registered in `knowledge-registry/registry.json` + `handbook-index.json`. Awaiting user approval before Phase 8. |
| 2026-07-16 | **Phase 7 approved by user.** Proceeding to Phase 8 — MCP Architecture. |
| 2026-07-16 | Phase 8 MCP Architecture authored: `AR-AI-BOS-008`. MCP identity, separate MCP registry, capability contracts, five canonical knowledge-query services, agent-to-MCP binding (one-way), vendor-independent runtime projection, capability binding. Registered in `knowledge-registry/registry.json` + `handbook-index.json`. Awaiting user approval before Phase 9. |
| 2026-07-16 | **Phase 8 approved by user** via `@system-builder`. System-builder running structural alignment: three-registry model (knowledge / agent / mcp) recorded in anatomy. `mcp-registry/` directory itself not scaffolded — deferred to first MCP server registration (Phase 12 or per-project). |
| 2026-07-16 | Phase 9 — Execution Architecture started. |
| 2026-07-16 | Phase 9 Execution Architecture authored: `AR-AI-BOS-009`. Execution context, 6-state lifecycle, 6 orchestration patterns, handoff execution semantics, 4 human-in-the-loop gate types, failure/recovery/idempotency, mandatory provenance, vendor-independent runtime projection. Registered in `knowledge-registry/registry.json` + `handbook-index.json`. Awaiting user approval before Phase 10. |
| 2026-07-16 | **Phase 9 approved by user.** Proceeding to Phase 10 — Governance. |
| 2026-07-16 | Phase 10 Governance authored: `AR-AI-BOS-010`. 7 roles, 6-step decision process, authority matrix ratifying Phase 7 levels, 7-step amendment process, 6 conflict-resolution rules, audit posture, vendor independence. Ratifies existing `@system-builder`/`@ai-bos-architect`/human practice. Registered in `knowledge-registry/registry.json` + `handbook-index.json`. Awaiting user approval before Phase 11. |
| 2026-07-16 | **Phase 10 approved by user.** Proceeding to Phase 11 — Project Architecture. D1 repo-promotion re-evaluation due at this gate per Phase 3 Option B (route to @system-builder after Phase 11 approval). |
| 2026-07-16 | Phase 11 Project Architecture authored: `AR-AI-BOS-011`. Fourth registry (project-registry), four-registry model complete, project lifecycle, layer instantiation, repository structure emergence rule, vendor-independent runtime projection. AI-BOS itself is `PRJ-GOV-AI-BOS-001`. D1 re-evaluation flagged for @system-builder after approval. Registered in `knowledge-registry/registry.json` + `handbook-index.json`. Awaiting user approval before Phase 12. |
| 2026-07-16 | **Phase 11 approved by user** via `@system-builder`. D1 repo-promotion re-evaluation now running in `@system-builder` AUDIT mode per Phase 3 Option B. |
| 2026-07-16 | **D1 re-evaluation decision: Option B — defer final D1 to after Phase 12.** No structural change. AI-BOS remains isolated root inside Growrixos through Phase 12. `@ai-bos-architect` remains project-local. This is the last D1 deferral — Phase 12 is the terminal structural phase and will design the repository folder layout; the final promotion decision belongs at the Phase 12 gate. Evidence: `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-reevaluation.md`. Handoff back to `@ai-bos-architect` for Phase 12 — Standards, Templates, Evolution Strategy (which includes repository structure design). |
| 2026-07-16 | Phase 12 — Standards, Templates, Evolution Strategy started (terminal phase). |
| 2026-07-16 | Phase 12 terminal deliverable authored: `AR-AI-BOS-012`. Standards catalog (10 standards: ST-KNW-001, ST-REG-001, ST-DOC-001, ST-AGT-001, ST-MCP-001, ST-EXE-001, ST-GOV-001, ST-PRJ-001, ST-VER-001, ST-TP-001). Templates catalog (7 templates: TP-KNW-001, TP-AGT-001, TP-MCP-001, TP-PRJ-001, TP-WF-001, TP-DOC-001, TP-REG-001). Evolution Strategy (semver policy, migration protocol, deprecation protocol, amendment process, registry schema evolution, backward compatibility contract). Final Repository Structure (four registries as siblings, knowledge by type, docs separate, runtime under `.cursor/`, audits under runtime). Layout rules + migration gaps. Registered in `knowledge-registry/registry.json` + `handbook-index.json` (AR-011 promoted to active). Awaiting user approval. Final D1 decision flagged for @system-builder after approval. |
| 2026-07-16 | **Phase 12 approved by user** via `@system-builder`. Final D1 repo-promotion decision now running in `@system-builder` AUDIT mode — terminal decision, no further deferrals. |
| 2026-07-16 | **D1 TERMINAL DECISION: Option B — keep AI-BOS as isolated root inside Growrixos; close D1 with concrete re-evaluation triggers.** No structural change applied. AI-BOS remains isolated root; `@ai-bos-architect` remains project-local; `agents_cursor.md`/`skills-index.md`/`lanes-index.md`/root rules 60/70 unchanged. Re-evaluation triggers: (1) second consumer project materializes, (2) ≥10 ST/TP/HB KOs authored, (3) explicit user request. Evidence: `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-final-decision.md`. **ALL 12 AI-BOS ARCHITECTURE PHASES COMPLETE AND APPROVED.** AI-BOS transitions from architecture lifecycle to implementation + evolution lifecycle governed by `AR-AI-BOS-012` Evolution Strategy. |
| 2026-07-17 | **I1 Foundation implementation completed** via `@system-builder` (user: continue implementation all at once). Scaffolded `agent-registry/`, `mcp-registry/`, `project-registry/`; created knowledge type folders + `docs/` with index and 3 starter pages; authored 10 ST-* + 7 TP-* Knowledge Objects; updated `knowledge-registry/registry.json` to 29 objects; created `architecture-index.json`; registered `PRJ-GOV-AI-BOS-001`; updated README + `agents_cursor.md`. **D1 Trigger 2 condition MET** (17 ST/TP ≥ 10) — re-evaluation available on request; no auto-promotion applied. |
| 2026-07-17 | **I2 Operational wiring completed** via `@system-builder` (user: continue accordingly, done all planned implementations). Registered agents AG-KNW-ARCH-001 / AG-GOV-SYSBUILD-001 / AG-KNW-VALID-001; MCP MC-KNW-REGISTRY-001 with five canonical knowledge services; workflows WF-GOV-PHASE-APPROVE-001 + WF-KNW-AUTHOR-001; handbooks HB-KNW-AUTHORING-001 + HB-GOV-OPS-001; wired PRJ-GOV-AI-BOS-001; knowledge-registry now 33 objects. **D1 Trigger 2 acknowledged — Option B reaffirmed** (keep isolated root). Evidence: `AI-BOS/.cursor/audits/2026-07-17-d1-trigger2-acknowledgment.md`. Planned Phase 12 migration gaps + I1/I2 operational baseline are complete. |
| 2026-07-17 | **I3 — PRJ-SAAS-GROWRIXOS-001 wired** via `@system-builder`. Registered 6 delivery agents (AG-DLV-SAAS/FE/BE/QA/QA-BE/DEVOPS) as projections of existing Cursor skills (no skill duplication). Project root_path=`F:/PROJECTS/Growrixos/web/`, ledger_path=`DOC/PROJECT PLAN/Tasks/tasks.md`, capabilities CAP-DLV-001/004/005 + ops/platform. `missing_knowledge` noted: SaaS domain handbooks not yet in AI-BOS. Projects now: PRJ-GOV-AI-BOS-001 + PRJ-SAAS-GROWRIXOS-001. Agents total: 9. |
| 2026-07-17 | **I4 — SaaS agent readiness completed** via `@system-builder`. Authored 11 KOs; knowledge-registry **44** objects; wired project consumes; EXTEND 6 delivery skills with `ai-bos-binding.md`; added rule `76-ai-bos-saas-binding.mdc` + aligned rule 70; docs + anatomy + `runtime-surface-inventory.md`. Optional remaining: SEO/integration PT packs, MCP runtime, separate PRJ for sites/Next. |
