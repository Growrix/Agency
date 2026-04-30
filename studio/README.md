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

`npm run dev` now uses a Windows-safe bootstrap script that:

- enforces Node 20.x
- checks required dependencies
- runs `npm install` if critical packages are missing
- launches `sanity dev` through `npm exec` for stable command execution

Default local URL:

- `http://localhost:3333`

## Content Models

Studio now includes schema coverage for:

- Blog (`blogPost`, `author`, `category`)
- Services (`servicePage`)
- Portfolio (`caseStudy`)
- Shop (`shopCategory`, `shopItem`)
- Site settings (`siteSettings`)

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

## Exact Vercel Studio Deployment Steps

1. In Vercel, create a new project from the same repository.
2. Set Root Directory to `studio`.
3. Set Framework Preset to `Other`.
4. Set Install Command to `npm install`.
5. Set Build Command to `npm run build`.
6. Set Output Directory to `dist`.
7. Deploy once and verify the generated `*.vercel.app` Studio URL loads.
8. Add custom domain `cms.growrixos.com` to this Studio project.
9. In Sanity project settings, add Studio domain to CORS and allowed origins.
10. Validate Studio login and a publish flow from the new domain.

## Ownership Split

- `web/`: public customer-facing site
- `studio/`: editorial authoring surface
- transactional app data does not belong in Studio