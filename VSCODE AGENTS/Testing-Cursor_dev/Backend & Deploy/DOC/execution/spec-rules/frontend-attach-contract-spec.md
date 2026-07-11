# Frontend Attach Contract Spec

## Purpose
Define the machine-readable boundary between Foundation Core and screenshot-driven frontend templates.

## Contract Shape
The attach contract MUST be emitted as `frontend-attach-contract.json` and cover the sections below.

```json
{
  "contract_version": 1,
  "runtime_root": "Foundation-Core",
  "template_modes": ["foundation_attached", "standalone_template"],
  "auth": {},
  "content": {},
  "forms": {},
  "media": {},
  "preview": {},
  "revalidation": {},
  "feature_flags": {},
  "env": {
    "public": [],
    "server": []
  },
  "fallback_mode": {
    "mock_adapters": true
  }
}
```

## Required Sections
- `contract_version`: integer version for downstream compatibility checks.
- `runtime_root`: declared Foundation Core runtime root.
- `template_modes`: allowed integration modes.
- `auth`: normalized session, user, role, and modal/fallback auth route contract.
- `content`: published data DTO endpoints and preview semantics.
- `forms`: submission endpoints, validation rules, and anti-spam behavior.
- `media`: upload/select/read contract and asset DTO shape.
- `preview`: draft-mode enablement, preview token rules, and preview endpoints.
- `revalidation`: events or routes used to invalidate caches.
- `feature_flags`: optional-module gating surface.
- `env`: split public and server variables.
- `fallback_mode`: exact mock/fixture behavior when Foundation Core is unavailable.

## Rules
- Templates consume normalized contracts only, never vendor SDK internals.
- Public templates must not require server-only env vars in client code.
- Imported templates must expose same-origin template-local facades for enabled contract modules before client-side UI consumes them.
- `standalone_template` mode must remain executable without Foundation Core by using documented mock adapters.
- Error responses must use a standard envelope and code taxonomy.
- Contract additions require a version bump when they are breaking.

## Validation
- Every downstream template agent must be able to implement against this contract without scanning Foundation Core internals.
- Every required section must be present even when a module is disabled; disabled modules declare `enabled: false` and fallback behavior.
- A completed import-attach run must prove both attached mode and fallback mode through template-local facades, not just through a direct health handshake.

## Failure Modes
- `ATTACH_CONTRACT_SECTION_MISSING`
- `ATTACH_CONTRACT_ENV_SPLIT_INVALID`
- `ATTACH_CONTRACT_FALLBACK_UNDEFINED`
- `ATTACH_CONTRACT_VENDOR_LEAK`