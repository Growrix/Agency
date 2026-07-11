# RUN GUIDE - FounderOS Core Brain

## 1. Install dependencies

```bash
npm install
```

## 2. Compile

```bash
npm run compile
```

## 3. Test and smoke

```bash
npm test
npm run smoke
```

## 4. Package VSIX

```bash
npm run package
```

## 5. Run in Extension Development Host

1. Open this folder in VS Code.
2. Press F5.
3. In the new Extension Development Host window open Copilot Chat.
4. Use `@founderos` and test commands.

## Manual Smoke Script

```text
@founderos
@founderos /new-client Acme Plumbing
@founderos /ingest Meeting notes: Acme needs a 5-page plumbing website, quote by Friday, decision maker is John.
@founderos /retrieve Acme
@founderos What is the current plan for Acme?
@founderos /tasks
@founderos /status
```

## Human Acceptance Pack

- Human runtime checklist: `HUMAN_TEST_CHECKLIST.md`
- Production readiness report: `PRODUCTION_READINESS_REPORT.md`
- Beginner guide in Bangla: `BEGINNER_GUIDE_BN.md`
