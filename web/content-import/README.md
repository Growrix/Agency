# Content Import Inbox

Use this folder for post-content files that should be imported into Sanity.

## Folders
- `inbox/`: Put new `.md`, `.yaml`, `.yml`, or `.json` content files here.
- `processed/`: Move successfully imported files here after publish.

## Single file import

```bash
npm --prefix web run cms:import -- --file ./web/content-import/inbox/your-file.md --dry-run
npm --prefix web run cms:import -- --file ./web/content-import/inbox/your-file.md
```

## Batch import from inbox

```bash
npm --prefix web run cms:import -- --dry-run
npm --prefix web run cms:import
```

Running without `--file` or `--dir` automatically processes `web/content-import/inbox`.

## Optional explicit directory import

```bash
npm --prefix web run cms:import -- --dir ./web/content-import/inbox --dry-run
npm --prefix web run cms:import -- --dir ./web/content-import/inbox
```

## Notes
- Include `contentType` inside file payload (`caseStudy`, `blogPost`, or `shopItem`) or pass `--type`.
- Import automation is text-only by policy; image/media fields in payloads are ignored.
- Image uploads remain manual in Sanity Studio as planned.
- Requires `SANITY_API_TOKEN` in your terminal.

## Fix missing Studio array keys (one-time maintenance)

If Sanity Studio shows `Missing keys` for object arrays like shop `highlights`, run:

```bash
npm --prefix web run cms:fix-array-keys:dry
npm --prefix web run cms:fix-array-keys
```

This backfills `_key` values for object-array items in `shopItem` and `caseStudy` documents.
