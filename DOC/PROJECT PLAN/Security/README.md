# Security & Compliance Plan

**Comprehensive security architecture, compliance controls, and operational security for the Agency SaaS website.**

This document defines authentication, authorization, data protection, encryption, compliance frameworks (PCI-DSS, GDPR, CCPA, WCAG), threat model, audit logging, incident response, and vulnerability management.

---

## Quick Navigation

- **[AI-first entrypoint](#ai-context)**: `ai-context.yaml`
- **[Authentication](#auth)**: JWT stateless, password policy, MFA
- **[Authorization](#authz)**: role-based access control, resource ownership
- **[Data Protection](#data)**: encryption at rest and in transit, retention, classification
- **[Compliance](#compliance)**: PCI-DSS, GDPR, CCPA, WCAG
- **[Threat Model](#threats)**: external and internal threats, mitigations
- **[Audit & Logging](#audit)**: immutable trails, centralized aggregation, monitoring
- **[Incident Response](#incident)**: severity classification, handling procedures
- **[Secrets Management](#secrets)**: storage, rotation, access control
- **[Vulnerability Management](#vulnscan)**: scanning, patching, testing

---

## Authentication

### JWT-Based Stateless Authentication

**Flow**:
1. User calls `POST /auth/login` with email + password
2. Backend validates credentials against bcrypt hash
3. Backend generates JWT with `iat`, `exp`, `user_id`, `role`
4. Frontend stores JWT in httpOnly cookie
5. Frontend includes JWT in `Authorization: Bearer {token}` header
6. Backend validates JWT signature and expiration before processing
7. JWT expires in 24 hours; refresh token expires in 30 days

**JWT Claims**:
```json
{
  "iat": 1618518000,
  "exp": 1618604400,
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "role": "subscriber"
}
```

### Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 digit
- At least 1 special character
- No common patterns (password, 123456, qwerty)

### Session Management

- **Storage**: httpOnly cookie (immune to XSS)
- **Secure flag**: HTTPS only
- **SameSite**: Strict (CSRF protection)
- **Refresh token**: rotated on each refresh
- **Revocation**: user can revoke all sessions from dashboard
- **Auto-logout**: after 24 hours of inactivity

### Multi-Factor Authentication

- Optional for subscribers, **required for admins**
- TOTP (Time-based One-Time Password) supported (Google Authenticator, Authy)
- SMS 2FA considered for future phase
- Bypass codes generated for account recovery

---

## Authorization

### Role-Based Access Control (RBAC)

| Role | Permissions |
|---|---|
| **Public** | Browse marketing, view services/portfolio, browse shop, initiate inquiries |
| **Subscriber** | + view own order/appointment history, update profile |
| **Customer** | + download purchased products, request refunds |
| **Admin** | + manage all content, view all orders/appointments/inquiries, access analytics, configure settings |

### Permission Enforcement

- All APIs validate role before allowing access
- All database queries include role-based filtering
- All admin actions logged to audit trail
- No wildcard permissions; all permissions explicit

### Resource Ownership

- Users can only access their own orders, appointments, profile
- Admin can access all resources
- Cross-tenant access is impossible

---

## Data Protection

### Encryption at Rest

- **Database**: encrypted at storage layer (AWS RDS encryption enabled)
- **Backups**: encrypted at rest
- **File storage (S3)**: encryption enabled
- **Secrets**: stored in AWS Secrets Manager, encrypted with AWS KMS

### Encryption in Transit

- All HTTP traffic redirected to HTTPS
- HTTP Strict Transport Security (HSTS) header enabled
- TLS 1.2 or higher enforced
- Modern cipher suites only

### Sensitive Data Handling

| Data | Handling |
|---|---|
| **Password** | bcrypt with cost 12 (hardened against brute force) |
| **Payment info** | Never stored; delegated to Stripe (PCI compliance) |
| **API keys** | Not logged or displayed in UI |
| **Email, phone** | Treated as sensitive; not displayed in logs |

### Data Retention

| Data Type | Retention | Reason |
|---|---|---|
| Orders | 7 years | Tax regulation |
| Appointments | 2 years | Historical tracking |
| Inquiries | 1 year | Support history |
| Audit logs | 2+ years | Compliance |
| Deleted data | 30 days (soft-delete) | GDPR right to be forgotten |

### Data Classification

- **Public**: marketing content, public portfolio
- **Internal**: service definitions, product catalogs
- **Confidential**: customer orders, appointments, emails, phone numbers
- **Restricted**: password hashes, API keys, secrets, payment tokens
- **PII**: email, name, phone, booking preferences

---

## Compliance

### PCI-DSS (Payment Card Industry Data Security Standard)

- **Applicable**: yes (handles payment data via Stripe)
- **Scope**: minimized; Stripe handles card data, we never store full card numbers, expiry, or CVV
- **Verification**: annual compliance assessment
- **Requirement**: maintain PCI compliance or face fines

### GDPR (General Data Protection Regulation)

- **Applicable**: yes (EU visitor data)
- **Requirements**:
  - Privacy policy published and up to date
  - Explicit consent for marketing emails
  - Data processing agreement with all sub-processors
  - Users can download their data anytime
  - User deletion honored within 30 days
  - Data breach notification within 72 hours

### CCPA (California Consumer Privacy Act)

- **Applicable**: yes (California residents)
- **Requirements**:
  - Privacy policy includes CCPA rights
  - Right to know: residents can request what data is collected
  - Right to delete: residents can request deletion
  - Right to opt-out: residents can opt-out of data sales

### WCAG 2.1 (Web Content Accessibility Guidelines)

- **Applicable**: yes (public website)
- **Compliance Level**: AA
- **Requirements**:
  - Color contrast ratios (WCAG AA minimum)
  - Keyboard navigation for all functionality
  - Screen reader support (semantic HTML, ARIA labels)
  - Alt text on all images

---

## Threat Model

### External Threats

| Threat | Description | Mitigation |
|---|---|---|
| **SQL/NoSQL Injection** | Malicious queries embedded in input | Parameterized queries, input validation |
| **XSS (Cross-Site Scripting)** | Malicious scripts in user input | Input sanitization, output encoding, CSP |
| **CSRF (Cross-Site Request Forgery)** | Attacker forces user action without consent | CSRF token, SameSite cookie attribute |
| **DDoS (Distributed Denial of Service)** | Attacker floods API with requests | Rate limiting, WAF, auto-scaling |
| **Brute Force Authentication** | Attacker tries many passwords | bcrypt cost 12, rate limiting, account lockout |
| **Man-in-the-Middle** | Attacker intercepts network traffic | HTTPS with TLS 1.2+, HSTS header |

### Internal Threats

| Threat | Description | Mitigation |
|---|---|---|
| **Unauthorized Access** | Insider attempts to access restricted data | RBAC, audit logging, least privilege |
| **Data Exfiltration** | Insider attempts to export sensitive data | No bulk export without approval, audit logging |
| **Misconfiguration** | Accidental exposure of secrets or data | IaC validation, secrets manager, scanning |

---

## Audit & Logging

### Immutable Audit Trail

All of the following events are logged:
- Admin actions (create, update, delete)
- Auth events (login, logout, failed login, token refresh)
- Data access (query, export)
- Integration calls (Stripe, Email, Calendar, Chat)
- Errors (with stack trace and context)

**Retention**: 2+ years  
**Access**: only authorized admins

### Centralized Log Aggregation

- Logging platform (CloudWatch, DataDog, Segment, etc.)
- Structured JSON logging with `tracing_id`
- Real-time alerting on suspicious patterns
- Log retention per compliance requirements

### Monitoring Alerts

- Authentication failures > 10 in 1 hour
- Admin actions during off-hours
- Data export by non-admin
- Failed payment attempts > 5% in 1 hour
- API error rate > 5% in 5 minutes
- Unauthorized access attempts
- Secrets accessed outside normal window

---

## Incident Response

### Severity Classification

| Severity | Examples | Response Time |
|---|---|---|
| **Critical** | Data breach, payment compromise, complete outage | Immediate |
| **High** | Partial data loss, unauthorized insider access, compliance violation | Within 1 hour |
| **Medium** | Failed payment processing, component outage (non-critical) | Within 4 hours |

### Incident Handling

1. **Detection**: automated alerts or user report
2. **Declaration**: severity assigned, on-call team notified
3. **Containment**: affected systems isolated if necessary
4. **Investigation**: root cause analysis, timeline reconstruction
5. **Remediation**: fix applied, tested, deployed
6. **Notification**: users and regulators (if legally required) notified
7. **Post-Mortem**: lessons learned documented

### Data Breach Notification Timeline

- **GDPR**: 72 hours of discovery
- **CCPA**: 30 days of discovery
- **Notification content**: breach description, data type, individuals affected, remediation

---

## Secrets Management

### Storage

- All secrets stored in **AWS Secrets Manager**
- Never commit secrets to version control
- `git-secrets` hook enforces no-commit policy

### Rotation Policy

- All secrets rotated **quarterly**
- API keys rotated **annually**
- Database passwords rotated **quarterly**
- Stripe keys rotated on API version update

### Access Control

- Only production code and authorized admins can access
- All secret access logged
- Least privilege: each service only accesses its own secrets

### Emergency Access

- On-call engineer can access all secrets (with approval and logging)
- Master password stored offline in secure location
- Quarterly drill of emergency access procedure

---

## Vulnerability Management

### Scanning

- Dependencies scanned **weekly** (npm audit, pip audit, snyk)
- Container images scanned before deployment
- OWASP Top 10 assessment **quarterly**
- Penetration testing **annually**

### Patching Policy

| Severity | Timeframe |
|---|---|
| Critical | Within 24 hours |
| High | Within 1 week |
| Medium | Within 2 weeks |
| Low | Next release cycle |

### Responsible Disclosure

- Security issues reported to `security@agency.com`
- 90-day window for fix before public disclosure
- Security researchers credited on website

### Security Testing

- **SAST**: Static analysis on every commit (SonarQube, Snyk)
- **DAST**: Dynamic analysis on staging environment
- **Fuzzing**: API endpoints tested
- **Code review**: all code reviewed by another engineer
- **Penetration testing**: annual professional + quarterly internal

---

## How to Use This Plan

- **Backend developers**: implement authentication, authorization, and audit logging as specified
- **Frontend developers**: use JWT tokens, enforce HTTPS, handle sensitive data carefully
- **DevOps**: deploy with encryption, secrets management, and monitoring
- **Security team**: conduct quarterly assessments, manage incident response
- **Compliance**: use this as basis for compliance documentation and audits
