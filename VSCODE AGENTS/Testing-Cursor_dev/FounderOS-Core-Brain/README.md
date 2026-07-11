# FounderOS Core Brain (Phase 1)

FounderOS Core Brain is a local VS Code plus Copilot Chat agent for business continuity.

This Phase 1 build is locked to five promises:

1. Contextual business answers
2. Isolated client and project folders
3. Durable machine-readable memory
4. External input ingestion
5. Retrieval and continuity

## Chat Surface

Use `@founderos` in Copilot Chat.

## Commands

- `@founderos`
- `@founderos /new-client <name>`
- `@founderos /new-project <name>`
- `@founderos /ingest <content>`
- `@founderos /summarize [optional context]`
- `@founderos /retrieve <topic>`
- `@founderos /tasks [optional filter]`
- `@founderos /status`

## Storage

Default storage root:

- `G:\founderos_core_brain` on Windows
- `~/founderos_core_brain` on other platforms

Configurable settings:

- `founderos.storageRoot`
- `founderos.autoSave`
- `founderos.maxContextChars`

## Quality Gates

- `npm install`
- `npm run compile`
- `npm test`
- `npm run smoke`
- `npm run package`

## Notes

- All business memory is local by default.
- No API keys are required for Phase 1.
- No cloud sync in Phase 1.
