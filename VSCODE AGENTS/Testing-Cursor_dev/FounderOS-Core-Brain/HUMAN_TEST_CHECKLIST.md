# FounderOS Core Brain - Human Test Checklist

This checklist closes the final manual runtime gap for Phase 1.

## Pre-check

1. Open the project root in VS Code:
   - `FounderOS-Core-Brain`
2. Ensure dependencies are installed:
   - `npm install`
3. Ensure compile passes:
   - `npm run compile`

## Start Extension Development Host

1. Press `F5` in VS Code.
2. Wait for the Extension Development Host window to open.
3. Open Copilot Chat in that new window.

## Manual Runtime Smoke Sequence

Run the commands below in exact order.

1. `@founderos`
2. `@founderos /new-client Acme Plumbing`
3. `@founderos /ingest Meeting notes: Acme needs a 5-page plumbing website, quote by Friday, decision maker is John. TODO: send quote by Friday. Decision: use blue-white brand.`
4. `@founderos /retrieve Acme`
5. `@founderos What is the current plan for Acme?`
6. `@founderos /tasks`
7. `@founderos /status`

## Expected Outcomes Per Locked Promise

### Promise 1: Contextual Business Answers

- Command 5 references previous Acme memory.
- Answer includes practical next steps.

### Promise 2: Isolated Client and Project Folders

- Folder created at `G:\founderos_core_brain\projects\client_acme_plumbing\` when using the default Windows storage root.
- No unrelated project data appears inside this folder.

### Promise 3: Durable Machine-Readable Memory

- Files created and readable:
  - `tasks.json`
  - `decisions.json`
  - chat files under `memory/chats/`
  - summary files under `memory/summaries/`

### Promise 4: External Input Ingestion

- Raw ingest file appears under `inbox/raw/`.
- Ingest summary appears under memory summaries or client meeting notes.
- Extracted tasks and decisions are linked to Acme project files.

### Promise 5: Retrieval and Continuity

- Command 4 returns relevant Acme results.
- Command 6 shows extracted tasks.
- Command 7 shows status metrics with non-zero counts.

## Pass and Fail Rules

Pass:

- All seven commands respond without runtime crash.
- All five promise checks above pass.

Fail:

- Any command crashes the participant.
- Ingestion does not persist raw plus structured memory.
- Retrieval fails to surface Acme context after ingestion.

## Evidence To Capture

1. Screenshot of each command output in Copilot Chat.
2. File explorer screenshot of `G:\founderos_core_brain\projects\client_acme_plumbing\` when using the default Windows storage root.
3. JSON content screenshots for tasks and decisions files.
4. Status output screenshot for `/status`.

## Final Human Acceptance Statement

Use this sentence once all checks pass:

- `FounderOS Core Brain Phase 1 manual runtime smoke passed in Extension Development Host.`
