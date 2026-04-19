# Project

A Next.js web application migrated from Vercel to Replit.

## Structure

- `web/` — Next.js app (App Router, TypeScript, Tailwind CSS v4)

## Running the App

The app runs via the "Start application" workflow, which executes:

```
cd web && npm run dev
```

This starts the Next.js dev server on port 5000, bound to `0.0.0.0` for Replit's proxied preview.

## Key Configuration

- **Port**: 5000 (required for Replit webview)
- **Host**: `0.0.0.0` (required for Replit proxy)
- `web/next.config.ts` includes `allowedDevOrigins` for `*.replit.dev` to allow HMR in the preview pane

## Dependencies

Managed with npm. Install with:

```
cd web && npm install
```

## Tech Stack

- Next.js 16 (Turbopack, App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Zustand
- Headless UI / Heroicons
