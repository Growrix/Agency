# Sanity Studio

This directory is an isolated Sanity Studio application.

Rules:

- Use Node.js `20.x`
- Run Studio commands from this directory only
- Keep `package-lock.json` in this directory
- Do not add root `postinstall` coupling for Studio
- Do not make the public web CI depend on Studio install/build success
- Deploy Studio as a separate hosting project and domain

## Local Development

```bash
cd studio
npm install
npm run dev
```

Default local URL:

- `http://localhost:3333`

## Build

```bash
cd studio
npm run build
```

## Separate Deployment

Recommended hosting:

- separate Vercel project
- Root Directory: `studio`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Domain: `cms.growrixos.com`

## Ownership Split

- `web/`: public customer-facing site
- `studio/`: editorial authoring surface
- transactional app data does not belong in Studio