# FounderOS Phase 1 Locked Execution Plan

Status: LOCKED FOR EXECUTION  
Date: 2026-05-21  
Version: 1.0  
System Class: isolated_local_system_required  
Execution Agent: `FounderOS_Phase 1_Builder_Agent.md`  
Primary Interface: VS Code plus GitHub Copilot Chat  
Default Runtime Name: FounderOS Core Brain  
Default Chat Surface: `@founderos`  
Default Local Storage Root: `~/founderos_core_brain`

---

## 1. Purpose

FounderOS Phase 1 builds the first usable Core Brain for business planning, client/project continuity, structured memory, and execution readiness.

This is not the full autonomous FounderOS vision yet. Phase 1 is the smallest testable system that proves whether a local VS Code/Copilot-based business brain can serve daily business work without forgetting context.

The system must help the founder discuss business topics, create isolated project/client workspaces, store machine-readable planning memory, ingest external notes, and retrieve old context before answering future questions.

---

## 2. Locked Phase 1 Promises

Phase 1 is locked to exactly five product promises.

### Promise 1: Contextual Business Answers

The Core Brain must answer business questions using the current user prompt plus relevant stored memory.

It must support:

- strategy questions
- project planning questions
- client planning questions
- product idea questions
- task and decision review
- continuation from prior conversations

Acceptance:

- User can ask a question after prior memory exists.
- The agent retrieves relevant summaries, decisions, tasks, or project notes.
- The answer clearly uses that prior context when relevant.

### Promise 2: Isolated Client and Project Folders

The Core Brain must create and maintain separate folders for clients, products, ideas, and internal projects.

It must support:

- one folder per client
- one folder per product
- one folder per idea
- one folder per internal initiative
- no mixing of unrelated client/project memory

Acceptance:

- A new client command creates a complete client folder.
- A new project command creates a complete product/idea folder.
- Each folder has metadata, overview, tasks, decisions, notes, and archive space.

### Promise 3: Durable Machine-Readable Memory

The Core Brain must persist important information to disk in structured formats.

It must store:

- raw chat logs
- normalized notes
- summaries
- decisions
- tasks
- project metadata
- context links

Acceptance:

- Important exchanges are saved as JSON and/or Markdown.
- Raw logs are preserved.
- Decisions and tasks are machine-readable.
- Memory is readable in VS Code without a special database tool.

### Promise 4: External Input Ingestion

The Core Brain must ingest pasted meeting notes, chats, calls, briefs, or documents and convert them into structured business memory.

It must extract:

- summary
- tasks
- decisions
- open questions
- project/client hints
- tags

Acceptance:

- User can paste external notes into the agent.
- Raw input is saved.
- Structured output is generated.
- If a matching project exists, extracted tasks and decisions are linked to it.

### Promise 5: Retrieval and Continuity

The Core Brain must find old discussions, plans, tasks, decisions, and project state so future conversations do not restart from zero.

It must retrieve from:

- current project files
- recent summaries
- decisions
- tasks
- raw chat logs when needed
- archive only when requested or necessary

Acceptance:

- User can search memory by keyword/topic/project/client.
- The agent can inject relevant past context into a new answer.
- The user can inspect memory files directly.

---

## 3. Phase 1 Non-Goals

The following are explicitly out of scope for Phase 1:

- LangChain
- LangGraph
- autonomous multi-agent swarms
- browser automation
- web scraping
- Supabase/PostgreSQL/vector database sync
- n8n workflow execution
- SaaS dashboard UI
- billing, auth, or deployment infrastructure
- fully autonomous execution without human approval
- social media automation
- external API integrations beyond GitHub Copilot inside VS Code

These may become Phase 2 or Phase 3 capabilities only after Phase 1 proves useful.

---

## 4. Locked Delivery Archetype

FounderOS Phase 1 is an isolated local agent system.

It must not be forced into the shared website/frontend/backend lanes.

Reason:

- The primary runtime is local VS Code/Copilot.
- The primary output is local structured files.
- The system is a personal business operating brain, not a public SaaS app yet.
- The cleanest first validation is local memory continuity and folder governance.

Implementation may reuse the existing `Business Brain Claude/` prototype as seed material, but final Phase 1 product naming, commands, docs, and storage should align to FounderOS.

---

## 5. Product Definition

### Product Name

FounderOS Core Brain

### Runtime Type

VS Code extension with a GitHub Copilot Chat participant.

### Primary Chat Participant

`@founderos`

### Primary User

Solo founder/operator using VS Code as the business operating cockpit.

### First Successful Use Case

The founder creates one client, ingests one meeting note, asks follow-up planning questions, retrieves prior context, reviews extracted tasks, and can inspect all resulting files in VS Code.

---

## 6. Operating System Architecture

```text
FounderOS Core Brain
|
|-- VS Code Copilot Chat Participant (@founderos)
|   |-- Command Router
|   |-- Conversation Handler
|   |-- Response Composer
|
|-- Core Brain Runtime
|   |-- Context Resolver
|   |-- Project Workspace Manager
|   |-- Memory Manager
|   |-- Ingest Processor
|   |-- Retriever
|   |-- Planner and Extractor
|   |-- Status Reporter
|   |-- Validation Reporter
|
|-- Local File Operating System
|   |-- config/
|   |-- inbox/
|   |-- memory/
|   |-- projects/
|   |-- discussions/
|   |-- exports/
|   |-- logs/
|
|-- Test and Release Layer
    |-- unit tests
    |-- storage smoke tests
    |-- extension compile check
    |-- VSIX packaging check
    |-- manual Copilot chat smoke checklist
```

---

## 7. Agent Model For Phase 1

Phase 1 must have one user-facing agent only.

### 7.1 User-Facing Agent

Name: FounderOS Core Brain  
Surface: `@founderos`  
Role: Personal business advisor, organizer, memory keeper, and planning assistant.

Responsibilities:

- answer business questions
- detect project/client context
- retrieve relevant old memory
- create client/project folders
- save raw and structured memory
- ingest external notes
- extract summaries, tasks, decisions, and open questions
- report status across projects and tasks
- suggest next steps without pretending full autonomy exists

### 7.2 Internal Specialist Modules

These are logical modules, not independent autonomous agents in Phase 1.

#### Command Router

Routes user commands and natural prompts.

Required commands:

- `/new-client <name>`
- `/new-project <name>`
- `/ingest <pasted content>`
- `/summarize [optional context]`
- `/retrieve <topic>`
- `/tasks [optional filter]`
- `/status`

Optional Phase 1 commands if time permits:

- `/archive <project>`
- `/export <project|all>`

#### Context Resolver

Determines whether the current prompt belongs to:

- a client
- a product
- an idea
- an internal project
- a general business discussion

It must use explicit user command context first, then project metadata, then keyword matching.

#### Project Workspace Manager

Creates and maintains folder structures for clients, products, ideas, and internal projects.

It must avoid overwriting existing user-written files unless the operation is append-only or explicitly confirmed.

#### Memory Manager

Writes raw logs, structured memory records, summaries, decisions, tasks, and logs.

It must keep machine-readable records stable and inspectable.

#### Ingest Processor

Converts pasted external material into a structured memory object.

It must preserve the original raw material and produce parsed summaries, tasks, decisions, and open questions.

#### Retriever

Searches memory and project files by keyword in Phase 1.

Vector search is not allowed in Phase 1.

#### Planner and Extractor

Turns business discussions into action plans, next steps, tasks, and decisions.

It must not create fake commitments or claim tasks were completed when only planned.

#### Status Reporter

Reports active projects, open tasks, decisions, memory counts, and storage root.

#### Validation Reporter

Runs or reports the required quality gates before completion.

---

## 8. Local Storage Contract

Default storage root:

```text
~/founderos_core_brain/
```

The storage root must be configurable through VS Code settings.

Recommended setting keys:

```json
{
  "founderos.storageRoot": "",
  "founderos.autoSave": true,
  "founderos.maxContextChars": 6000
}
```

Do not require API keys in Phase 1.

Do not auto-upload memory to external services.

If workspace-local storage is supported, generated data must be ignored by git by default.

---

## 9. Required Folder Structure

```text
founderos_core_brain/
|-- config/
|   |-- settings.json
|   |-- agent_profile.md
|   |-- schemas/
|       |-- project.schema.json
|       |-- task.schema.json
|       |-- decision.schema.json
|       |-- chat.schema.json
|       |-- memory_record.schema.json
|
|-- inbox/
|   |-- raw/
|   |-- processed/
|
|-- memory/
|   |-- chats/
|   |-- summaries/
|   |-- decisions/
|   |-- tasks/
|   |-- entities/
|   |-- search_index/
|
|-- projects/
|   |-- client_<slug>/
|   |-- product_<slug>/
|   |-- idea_<slug>/
|   |-- internal_<slug>/
|   |-- archive/
|
|-- discussions/
|   |-- active/
|   |-- archived/
|
|-- exports/
|   |-- markdown/
|   |-- json/
|   |-- reports/
|
|-- logs/
|   |-- app.log
|   |-- agent.log
|   |-- memory.log
|   |-- error.log
```

---

## 10. Project Folder Contract

### Client Folder

```text
projects/client_<slug>/
|-- metadata.json
|-- overview.md
|-- scope.md
|-- plan.md
|-- tasks.json
|-- decisions.json
|-- chat_logs/
|-- meeting_notes/
|-- documents/
|-- exports/
|-- archive/
```

### Product Folder

```text
projects/product_<slug>/
|-- metadata.json
|-- overview.md
|-- roadmap.md
|-- plan.md
|-- tasks.json
|-- decisions.json
|-- chat_logs/
|-- research/
|-- meeting_notes/
|-- exports/
|-- archive/
```

### Idea Folder

```text
projects/idea_<slug>/
|-- metadata.json
|-- overview.md
|-- validation.md
|-- plan.md
|-- tasks.json
|-- decisions.json
|-- notes/
|-- archive/
```

---

## 11. Machine-Readable Schemas

### Project Schema

```json
{
  "project_id": "string",
  "name": "string",
  "slug": "string",
  "type": "client|product|idea|internal",
  "status": "active|paused|archived",
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  "summary": "string",
  "goals": [],
  "tasks": [],
  "decisions": [],
  "references": []
}
```

### Task Schema

```json
{
  "task_id": "string",
  "project_id": "string",
  "title": "string",
  "description": "string",
  "status": "todo|doing|blocked|done",
  "priority": "low|medium|high",
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  "source_id": "string"
}
```

### Decision Schema

```json
{
  "decision_id": "string",
  "project_id": "string",
  "decision": "string",
  "reason": "string",
  "impact": "string",
  "created_at": "ISO8601",
  "source_id": "string"
}
```

### Chat Message Schema

```json
{
  "message_id": "string",
  "role": "user|assistant|system",
  "project_id": "string",
  "timestamp": "ISO8601",
  "content": "string",
  "tags": [],
  "related_ids": []
}
```

### Memory Record Schema

```json
{
  "id": "string",
  "timestamp": "ISO8601",
  "source": "chat|meeting|document|manual",
  "project_id": "string",
  "client_id": "string|null",
  "type": "discussion|decision|task|summary|meeting|idea|plan",
  "importance": "low|medium|high",
  "tags": [],
  "content": "string",
  "summary": "string",
  "next_actions": [],
  "related_ids": [],
  "status": "active|archived"
}
```

---

## 12. Memory Layer Rules

### Layer 1: Raw Input

Store the original user prompt, meeting note, chat, or pasted document.

Rule: raw input must not be silently rewritten.

### Layer 2: Normalized Record

Convert raw input into a structured JSON object.

Rule: keep source links back to raw input.

### Layer 3: Summary Memory

Create short Markdown summaries for human review and retrieval.

Rule: summaries must state what was discussed, what was decided, what remains open, and next steps.

### Layer 4: Decision Memory

Extract decisions into structured JSON.

Rule: decisions must include reason, impact, project_id, and source_id.

### Layer 5: Action Memory

Extract tasks into structured JSON.

Rule: tasks must include status, priority, project_id, and source_id.

---

## 13. Required Commands

### `@founderos`

Default business chat.

Behavior:

- load recent summaries
- search relevant memory from the prompt
- load active tasks and projects
- answer concisely
- suggest next actions
- save user and assistant messages if auto-save is enabled

### `@founderos /new-client <name>`

Creates a client workspace.

Required output:

- storage path
- initialized files
- suggested next step

### `@founderos /new-project <name>`

Creates a product project workspace.

Required output:

- storage path
- initialized files
- suggested next step

### `@founderos /ingest <content>`

Processes external notes.

Required output:

- summary
- tasks
- decisions
- open questions
- saved paths
- linked project if detected

### `@founderos /summarize [context]`

Summarizes current conversation history.

Required output:

- Markdown summary
- saved file path
- extracted decisions and tasks when reliable

### `@founderos /retrieve <topic>`

Searches memory.

Required output:

- matched files
- preview snippets
- relevance order
- suggested follow-up

### `@founderos /tasks [filter]`

Lists tasks across projects.

Required output:

- todo
- doing
- blocked
- done count
- project names

### `@founderos /status`

Reports system state.

Required output:

- storage root
- active projects
- client count
- product count
- saved summaries
- open tasks
- decisions
- recent memory count

---

## 14. End-to-End Workflows

### Workflow A: First Run Bootstrap

1. User invokes `@founderos`.
2. Extension resolves storage root.
3. System creates required folders if missing.
4. System creates default config and schema files if missing.
5. Agent reports readiness and available commands.

Acceptance evidence:

- storage root exists
- folders exist
- config exists
- no errors in logs

### Workflow B: New Client Onboarding

1. User runs `/new-client Acme Corp`.
2. System creates `projects/client_acme_corp/`.
3. System creates metadata, overview, scope, plan, tasks, decisions, chat_logs, meeting_notes, archive.
4. Agent returns location and next recommended planning prompt.

Acceptance evidence:

- client folder exists
- JSON files parse successfully
- Markdown files exist

### Workflow C: Business Planning Chat

1. User asks a planning question about a client or product.
2. Context Resolver detects likely project.
3. Retriever loads relevant context.
4. Agent answers using current and prior context.
5. Memory Manager saves chat turn.

Acceptance evidence:

- chat log updated
- answer references relevant memory when available

### Workflow D: Meeting Note Ingestion

1. User runs `/ingest` with pasted notes.
2. System saves raw input to inbox.
3. Ingest Processor extracts summary, tasks, decisions, open questions, and project hint.
4. System saves processed summary.
5. If project is matched, system appends tasks and decisions to that project.

Acceptance evidence:

- raw note saved
- processed summary saved
- tasks and decisions linked when project match exists

### Workflow E: Retrieval Continuity

1. User runs `/retrieve Acme` or asks a natural follow-up.
2. Retriever searches memory and project files.
3. Agent returns top matches or uses them in the answer.

Acceptance evidence:

- relevant prior files are surfaced
- no unrelated project leakage in top results when a clear project exists

### Workflow F: Task Review

1. User runs `/tasks`.
2. System reads all project task files.
3. Agent groups tasks by status and project.

Acceptance evidence:

- task list renders
- invalid task JSON is handled as an error, not ignored silently

### Workflow G: Status Review

1. User runs `/status`.
2. System scans projects and memory.
3. Agent reports a concise operating dashboard.

Acceptance evidence:

- counts match actual files
- storage root is shown

---

## 15. Implementation Root And Repo Strategy

Recommended target implementation root:

```text
Business Brain Claude/
```

Reason:

- A matching VS Code/Copilot prototype already exists there.
- It already contains the right conceptual modules.
- Repairing and renaming the prototype is faster and less risky than starting from zero.

Required correction:

- Final user-facing product must be FounderOS Core Brain.
- Final chat participant should be `@founderos`.
- Package/config/settings should use `founderos` naming.
- Existing broken imports must be fixed.
- Missing TypeScript configuration must be added.

Alternative if the executor decides the prototype is too broken:

```text
FounderOS-Core-Brain/
```

The executor may create this clean isolated root only if it documents why reuse is slower or unsafe.

---

## 16. Known Gaps From Re-Analysis And Locked Resolutions

### Gap 1: Existing prototype does not compile

Finding:

- `npm run compile` fails because no `tsconfig.json` exists.

Locked resolution:

- Add `tsconfig.json`.
- Ensure `out/extension.js` is emitted.
- Add or confirm `rootDir` and `outDir`.

### Gap 2: Existing imports reference missing folders

Finding:

- Current files import from paths such as `./agent/coreAgent`, `../utils/fileUtils`, and `../types/schemas`, but files are flat.

Locked resolution:

- Either move code into `src/agent`, `src/utils`, and `src/types`, or rewrite imports to match a clean `src/` layout.
- Prefer clean `src/` layout for production readiness.

### Gap 3: Current plan lacks acceptance tests

Locked resolution:

- Add unit tests for storage, project creation, memory writing, retrieval, and ingest parsing helpers.
- Add a smoke script that validates folder and JSON output without requiring live Copilot.

### Gap 4: Data privacy rules are not explicit

Locked resolution:

- Store all data locally by default.
- Do not auto-upload to external services.
- Add `.gitignore` entries for local runtime memory if workspace storage is used.
- Document sensitive-data handling in README/RUN docs.

### Gap 5: Storage root was undecided

Locked resolution:

- Default to `~/founderos_core_brain`.
- Allow override via `founderos.storageRoot`.

### Gap 6: Success criteria were too broad

Locked resolution:

- Phase 1 success is proven only by the five locked promises and required workflows.
- No Phase 2 features can be used as evidence of Phase 1 completion.

### Gap 7: Naming was inconsistent

Locked resolution:

- User-facing name: FounderOS Core Brain.
- Chat participant: `@founderos`.
- Storage root: `founderos_core_brain`.
- Internal package name may be `founderos-core-brain`.

---

## 17. Implementation Work Breakdown

### Stage 0: Audit And Lock

Tasks:

- read this plan
- inspect existing prototype
- choose reuse or clean root
- record the target root decision
- run baseline diagnostics

Exit gate:

- target root selected
- baseline issues documented

### Stage 1: Project Scaffolding

Tasks:

- create or repair VS Code extension package
- add `tsconfig.json`
- add `src/` layout
- add package scripts
- add `.gitignore`
- add README and RUN docs

Exit gate:

- `npm install` succeeds
- `npm run compile` reaches TypeScript diagnostics instead of missing config

### Stage 2: Storage System

Tasks:

- implement safe directory creation
- implement JSON read/write/append helpers
- implement Markdown write helpers
- implement path slugging
- implement local logs
- implement schema files

Exit gate:

- first-run bootstrap creates required folders
- JSON files parse
- raw logs are append-only

### Stage 3: Project Workspace Manager

Tasks:

- create client folder flow
- create project folder flow
- create metadata files
- create overview/scope/plan/roadmap templates
- read all projects
- read tasks and decisions

Exit gate:

- `/new-client` and `/new-project` work in smoke tests

### Stage 4: Memory Manager

Tasks:

- save chat messages
- save summaries
- save decisions
- save tasks
- save raw ingest
- save processed ingest
- link records with source ids

Exit gate:

- chat and ingest records persist as machine-readable files

### Stage 5: Retrieval

Tasks:

- keyword search across memory and projects
- relevance scoring
- project-aware filtering
- recent summary context block
- retrieval preview output

Exit gate:

- `/retrieve` returns relevant files
- natural chat can inject retrieval context

### Stage 6: Copilot Chat Participant

Tasks:

- register chat participant
- implement command routing
- select available Copilot language model safely
- stream responses
- handle missing model gracefully
- avoid hardcoded unsupported model assumptions

Exit gate:

- extension compiles
- participant appears in Extension Development Host
- empty `@founderos` prompt shows help

### Stage 7: Ingest And Extraction

Tasks:

- define strict JSON output contract for extraction
- parse model response safely
- fallback to raw save if parsing fails
- link tasks and decisions to matched project

Exit gate:

- pasted meeting note produces raw file and structured memory

### Stage 8: Tests And Validation

Tasks:

- add unit tests
- add smoke tests
- add compile gate
- add package gate
- add manual Copilot smoke checklist

Exit gate:

- zero TypeScript errors
- zero VS Code Problems
- tests pass
- package builds

### Stage 9: Documentation And Handoff

Tasks:

- write README
- write RUN guide
- document commands
- document storage contract
- document privacy model
- document Phase 2 backlog without implementing it

Exit gate:

- a new user can run the extension from docs
- all Phase 1 promises have evidence

---

## 18. Required Implementation Files

Final implementation should include a structure equivalent to this:

```text
<target-root>/
|-- package.json
|-- tsconfig.json
|-- README.md
|-- RUN.md
|-- .gitignore
|-- src/
|   |-- extension.ts
|   |-- coreAgent.ts
|   |-- commandRouter.ts
|   |-- projectManager.ts
|   |-- memoryManager.ts
|   |-- retriever.ts
|   |-- ingestProcessor.ts
|   |-- responseComposer.ts
|   |-- validationReporter.ts
|   |-- types/
|   |   |-- schemas.ts
|   |-- utils/
|       |-- fileUtils.ts
|       |-- pathUtils.ts
|       |-- jsonUtils.ts
|-- tests/
|   |-- fileUtils.test.ts
|   |-- projectManager.test.ts
|   |-- memoryManager.test.ts
|   |-- retriever.test.ts
|   |-- smoke.test.ts
|-- scripts/
|   |-- smoke-founder-os.ts
```

---

## 19. Quality Gates

All gates are blocking.

### QG1: Zero Problems

- VS Code diagnostics must show zero errors and zero warnings for workspace-owned Phase 1 files.
- TypeScript must pass with zero diagnostics.

### QG2: Install And Compile

Required commands:

```bash
npm install
npm run compile
```

### QG3: Test Gate

Required command:

```bash
npm test
```

Tests must cover:

- folder bootstrap
- client creation
- project creation
- JSON append/read
- summary saving
- keyword retrieval
- ingest fallback behavior

### QG4: Smoke Gate

Required command:

```bash
npm run smoke
```

Smoke must prove:

- storage root can be created
- client folder can be created
- project folder can be created
- chat record can be saved
- summary can be saved
- retrieval finds known content
- all JSON outputs parse

### QG5: Package Gate

Required command:

```bash
npm run package
```

The VSIX must build successfully or the packaging blocker must be documented with exact remediation.

### QG6: Manual Copilot Chat Gate

Manual test in Extension Development Host:

```text
@founderos
@founderos /new-client Acme Plumbing
@founderos /ingest Meeting notes: Acme needs a 5-page plumbing website, quote by Friday, decision maker is John.
@founderos /retrieve Acme
@founderos What is the current plan for Acme?
@founderos /tasks
@founderos /status
```

Pass condition:

- all commands respond
- files are created
- retrieved context is relevant
- tasks and decisions are inspectable

---

## 20. Production-Ready Definition For Phase 1

Phase 1 is production-ready only when:

- it compiles with zero TypeScript errors
- it has zero VS Code Problems
- it has local tests and smoke tests
- it can be packaged as a VS Code extension
- it does not require external databases or API keys
- it stores data locally and predictably
- it can recover from malformed JSON by reporting the issue
- it avoids overwriting user content silently
- its docs explain setup, commands, storage, and privacy
- the five locked promises pass evidence checks

Phase 1 production-ready does not mean SaaS production. It means stable local daily-use readiness.

---

## 21. Missing Knowledge Register

These items are not blockers for Phase 1 execution because defaults are locked here.

| Item | Default Locked Decision | When To Revisit |
|---|---|---|
| Storage location | `~/founderos_core_brain` | If user wants portable workspace-local storage |
| Data sensitivity | local-only, no upload | Before cloud sync or team sharing |
| Model selection | use available Copilot model fallback | If exact model routing becomes necessary |
| Database | filesystem only | When memory exceeds keyword-search usefulness |
| Sub-agents | logical modules only | After Phase 1 five promises pass |
| Dashboard | not included | Phase 2 after local brain is useful |

---

## 22. Phase 2 Backlog Parking Lot

Do not implement these during Phase 1:

- LangGraph workflow graph
- autonomous sub-agents
- semantic vector search
- SQLite or PostgreSQL storage
- Supabase sync
- web dashboard
- browser automation
- n8n triggers
- product-building automation
- GitHub/Notion/Slack integrations
- multi-device sync
- permissions and team roles

---

## 23. Execution Handoff

Use `FounderOS_Phase 1_Builder_Agent.md` as the specialist execution agent.

The builder agent must:

- treat this plan as the locked source of truth
- implement only the five promises
- repair or create the isolated local VS Code/Copilot extension
- validate with the quality gates above
- document any blocker explicitly
- not drift into Phase 2 features

---

## 24. Final Lock Statement

FounderOS Phase 1 is locked as a local, VS Code/Copilot-first Core Brain with file-backed memory.

It succeeds only if it can answer with context, create isolated folders, persist structured memory, ingest external notes, and retrieve prior business discussions reliably.

No other feature is required or allowed to define Phase 1 success.