# Foundation Attached Starter Runbook

## Runtime root
- Run all commands from `Templates/foundation-attached-starter/`.

## Commands
- `npm install`
- `npm run dev`
- `npm run dev:linked`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run verify`

## Local modes
- Standalone fallback: run `npm run dev` and the starter will use local mock data.
- Attached mode: run `Foundation-Core` on `http://localhost:3000`, then run `npm run dev:linked` here so the starter can consume the runtime APIs from `http://localhost:3000` while serving itself on `http://localhost:3001`.