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
- About page (`aboutPage`)
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
- Node.js Version: `20.x` (set this in Vercel Project Settings to avoid engine-mismatch warnings)
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Domain: `cms.growrixos.com`

## Exact Vercel Studio Deployment Steps

1. In Vercel, create a new project from the same repository.
2. Set Root Directory to `studio`.
3. Set Framework Preset to `Other`.
4. Set Node.js Version to `20.x` in Vercel Project Settings.
5. Set Install Command to `npm install`.
6. Set Build Command to `npm run build`.
7. Set Output Directory to `dist`.
8. Deploy once and verify the generated `*.vercel.app` Studio URL loads.
9. Add custom domain `cms.growrixos.com` to this Studio project.
10. In Sanity project settings, add Studio domain to CORS and allowed origins.
11. Validate Studio login and a publish flow from the new domain.

### Build Log Notes

- If you see `peer react` warnings, ensure `react` and `react-dom` in this app match the Sanity peer range.
- `EBADENGINE` warnings for `preferred-pm` / `which-pm` are currently emitted by Sanity CLI transitive dependencies on Node 20.x; Studio build and deploy can still succeed.

## Ownership Split

- `web/`: public customer-facing site
- `studio/`: editorial authoring surface
- transactional app data does not belong in Studio