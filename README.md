# Agency Workspace

This repository contains the Agency frontend workspace and the project planning system used to track implementation phases.

## Local Commands

Use Node.js `20.x` locally. The repository now includes `.nvmrc`, `.node-version`, and `engine-strict` enforcement so installs do not silently drift onto an unsupported major version and break Next.js native bindings.

Run these commands from the repository root:

```bash
npm install
npm run dev
npm run lint
npm run build
```

`npm run dev` now self-heals common local startup issues: it enforces Node 20 through `fnm` when available, restarts stale Agency Next.js processes that are still holding port `5000`, and falls back to the next free local port if `5000` is occupied by another application.

The root install now also installs the Next.js app dependencies inside `web/` through `postinstall`, so CI and deployment environments can build from the repository root without a manual second install step.

## Development Deployment Baseline

The current deployment target is a frontend-only development deployment. Backend and API phases are intentionally deferred while frontend iteration continues.

Recommended Vercel project settings:

- Framework Preset: `Next.js`
- Root Directory: `web`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave empty and let Vercel detect `.next`
- Node.js Version: `20.x`

If the Vercel project is instead pointed at the repository root, use:

- Install Command: `npm install`
- Build Command: `npm run build`

That works because the root `postinstall` script installs `web/` dependencies and the root build script proxies to the Next.js app.

## Environment Setup

Copy values from `.env.example` into Vercel project environment variables before deployment. The current frontend can deploy without backend secrets, but the public site URL should be set.

For the live Google review sections, also set:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: a browser/referrer-restricted key.
- `NEXT_PUBLIC_GOOGLE_PLACE_ID` or `NEXT_PUBLIC_GOOGLE_PLACE_SEARCH_TEXT`: the business listing to load.

Enable both the Google Maps JavaScript API and the Places API for that key. The review feed is browser-side so the key should stay restricted to your site domain.

## Documentation Entry Points

- Execution tracker: `DOC/PROJECT PLAN/Tasks/tasks.md`
- Machine-readable tracker entry: `DOC/PROJECT PLAN/Tasks/ai-context.yaml`
- DevOps plan: `DOC/PROJECT PLAN/DevOps/README.md`