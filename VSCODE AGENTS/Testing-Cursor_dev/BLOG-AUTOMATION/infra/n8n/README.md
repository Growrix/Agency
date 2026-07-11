# n8n Infrastructure

This folder now contains importable n8n workflow templates for the milestone-1 automation lanes.

Included assets:
- `workflow-manifest.json` maps each automation lane to its importable workflow JSON.
- `workflows/*.workflow.json` are n8n import templates with stable correlation and idempotency headers.
- `.env.example` lists the environment values the templates expect inside n8n.

Import flow:
1. Copy `.env.example` values into your n8n environment or credentials setup.
2. Import the workflow JSON files from `workflows/` into n8n.
3. Replace placeholder IDs for keyword, brief, and post based workflows before activating them.
4. Set `BLOG_AUTOMATION_CONNECTOR_ID` to the onboarded connector (for example `growrixos`) before running publish workflows.
5. Keep the API base URL and API key aligned with the BLOG-AUTOMATION application runtime.

Contract guarantees in the templates:
- mutating API nodes send `x-idempotency-key`
- all API nodes send `x-correlation-id`
- HTTP nodes use bounded retries (`maxTries: 3`)
- route coverage mirrors the milestone-1 manifest