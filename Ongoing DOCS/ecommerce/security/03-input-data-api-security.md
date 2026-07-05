# Input Data API Security

Document status: security contract
Owner: Security and backend

## Purpose

Define controls for API validation, browser security, file upload safety, data protection, and abuse prevention.

## API Controls

- Validate body, query, params, headers, and file metadata.
- Enforce authentication and authorization before protected data access.
- Use allowlists for enum fields and sort/filter keys.
- Apply rate limits by IP, session, account, and endpoint risk.
- Use consistent error responses that do not leak sensitive resource existence.
- Protect admin and checkout mutations with stronger throttling.

## Browser Controls

- Content Security Policy.
- Secure headers.
- Output encoding for user-generated content.
- CSRF protection where cookie auth is used.
- Same-site and secure cookies.

## Data Controls

- Encrypt sensitive secrets at rest where applicable.
- Avoid sensitive data in logs, analytics, errors, and client payloads.
- Minimize personal data collection.
- Define retention and deletion/anonymization procedures.

## Upload Controls

- Validate type, size, and extension.
- Scan files where feasible.
- Store private files away from public buckets.
- Require entitlement for digital downloads.

## Acceptance Criteria

- API inputs are validated at boundaries.
- Customer and admin data is protected from injection, leakage, and abuse.
- File uploads and generated downloads are controlled by policy.
