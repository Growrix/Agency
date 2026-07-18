# Client Intake & Project Workspace — E2E Plan

**Phase:** P21-client-intake-workspace  
**Status:** implemented (2026-07-18)  
**Scope:** Free demo popup, auth-gated multi-step intake, admin notification, client/admin project workspaces, Supabase Storage uploads.

## Deliverables

- Schema: `client_intake_submissions`, `projects`, `project_updates`, `project_assets`, `free_demo_campaigns`
- APIs: `/api/v1/campaigns/free-demo`, `/api/v1/intakes`, `/api/v1/me/*`, `/api/v1/admin/intakes|projects/*`
- UI: homepage `FreeDemoGate`, `IntakeForm`, `/dashboard/projects`, `/admin/intakes`, `/admin/projects`
- Notifications: Lark + Resend + in-app `notification_log` on intake submit

## Validation

- `npm run test:integration` — campaign + auth gate
- `npm run test:e2e -- tests/e2e/intake-flow.spec.ts`
- Full `npm run health:check` before release sign-off

## Ops notes

- Create Supabase Storage bucket `client-intake-assets` (private) when using Supabase persistence
- Run `npm run db:migrate` to apply normalized SQL tables
