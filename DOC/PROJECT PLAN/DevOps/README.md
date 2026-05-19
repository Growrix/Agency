# DevOps & Reliability Plan

**Deployment infrastructure, operational reliability, and disaster recovery for the Agency SaaS website.**

This document covers CI/CD pipelines, environments, infrastructure-as-code, containerization, monitoring, alerting, on-call procedures, and disaster recovery.

---

## Quick Navigation

- **[AI-first entrypoint](#ai-context)**: `ai-context.yaml`
- **[Deployment Strategy](#deployment)**: CI/CD, environments, update strategies
- **[Infrastructure as Code](#iac)**: Terraform, AWS services
- **[Monitoring & Observability](#monitoring)**: metrics, logging, alerting, tracing
- **[Reliability Patterns](#reliability)**: health checks, auto-scaling, circuit breakers, degradation
- **[Disaster Recovery](#dr)**: RTO/RPO, backups, failover
- **[On-Call Procedures](#oncall)**: escalation, runbooks, post-incident
- **[Performance Tuning](#performance)**: caching, optimization, CDN
- **[Release Process](#release)**: versioning, deployment checklist

---

## Deployment Strategy

### Current Development Deployment Baseline

The current execution decision is to deploy the frontend for development and live review while backend and API implementation remain deferred.

Current baseline:
- Host the site on Vercel as a Next.js app.
- Prefer `web/` as the Vercel Root Directory.
- Use Node.js `20.x`.
- Keep placeholder or mock-only flows visible only if they are acceptable on the live development site.
- Do not treat this as full production readiness for commerce, booking, contact persistence, or AI concierge integrations.

Recommended Vercel settings:
1. Root Directory: `web`
2. Install Command: `npm install`
3. Build Command: `npm run build`
4. Output Directory: auto-detected by Vercel
5. Environment Variables: seed from repository `.env.example`

Repository support added for this baseline:
- root `package.json` proxies dev, lint, build, and start into `web/`
- root `postinstall` installs `web/` dependencies for root-based CI or fallback deployment
- `.github/workflows/ci.yml` validates lint and production build on push and pull request
- `.env.example` documents the current frontend-only deployment variables

### Sanity Studio Runtime Isolation

Sanity Studio must be treated as a separate application inside the same repository.

Required rules:
1. Use Node.js `20.x` for both `web/` and `studio/` unless project docs explicitly approve a different major version.
2. Keep Studio install flow separate from the root and `web/` install flow.
3. Keep a dedicated `studio/package-lock.json` committed to source control.
4. Keep Studio CI separate from the public site CI.
5. Keep Studio hosting separate from the public site hosting.
6. Do not allow root `postinstall` or root deploy commands to install or build Studio.

Recommended Studio local flow:
1. `cd studio`
2. `npm install`
3. `npm run dev`

Recommended Studio hosting:
1. Create a separate Vercel project for `studio/`
2. Set Root Directory to `studio`
3. Set Install Command to `npm install`
4. Set Build Command to `npm run build`
5. Set Output Directory to `dist`
6. Attach a separate domain such as `cms.growrixos.com`

The public site and Studio may share a Git repository, but they must not share one install or deployment lifecycle.

### CI/CD Platform: GitHub Actions

**CI Pipeline** (on every push or PR):
1. Run linting (ESLint, Pylint, etc.)
2. Run unit tests (coverage > 80%)
3. Run SAST (SonarQube, Snyk)
4. Build Docker image
5. Scan image for vulnerabilities
6. Push to Amazon ECR
7. Block PR merge on failure

**CD Pipeline - Staging** (on merge to main):
1. Deploy to staging environment (blue-green)
2. Run smoke tests
3. Alert on failure

**CD Pipeline - Production** (manual approval):
1. Manual approval from DevOps lead
2. Deploy with canary strategy (5% → 25% → 100%)
3. Monitor error rate, latency, resource usage
4. Automatic rollback on degradation

### Container Registry: Amazon ECR (Elastic Container Registry)

- Private Docker registry
- Image scanning for vulnerabilities
- Lifecycle policies for old image cleanup

### Orchestration: AWS ECS on Fargate

- Serverless container management (no server provisioning)
- Auto-scaling based on CPU/memory metrics
- Managed load balancing (ALB)
- Service discovery (auto DNS)

---

## Environments

### Development
- **Platform**: local Docker Compose or minikube
- **Data**: test data only
- **Integrations**: Stripe test keys, mock Calendar API
- **URL**: http://localhost:3000
- **Retention**: no backup required

### Staging
- **Platform**: AWS ECS (Fargate)
- **Data**: production-like test data
- **Integrations**: Stripe test keys, mock Calendar API
- **URL**: https://staging.agency.com
- **Retention**: 7 days (purged weekly)

### Production
- **Platform**: AWS ECS with auto-scaling
- **Data**: real customer data
- **Integrations**: Stripe live, real Calendar API, real Email
- **URL**: https://api.agency.com
- **SLA**: 99.5% uptime
- **Retention**: per data policy (7 years for orders)

---

## Infrastructure as Code (Terraform)

**Modules**:
- VPC (virtual network, subnets, security groups)
- ECS Cluster (container orchestration)
- RDS (managed PostgreSQL database)
- S3 (file storage for products)
- CloudFront (CDN)
- ALB (application load balancer)
- Secrets Manager (secrets storage)
- IAM (identity and access management)

**Repository**: separate from application code

**Approval**: code review + plan approval before Terraform apply

**State Management**: Terraform state in S3 with versioning

---

## Database (PostgreSQL 14+)

### Deployment
- AWS RDS Multi-AZ (high availability)
- automatic failover to standby
- backup encryption at rest

### Backups
- Automated daily backups (retained 30 days)
- Point-in-time recovery (last 35 days)
- Test restore quarterly
- Encrypted at rest

### Monitoring
- Connection pool usage
- Slow query log
- Disk usage
- Replication lag (if read replicas)

### Scaling
- Read replicas for read-heavy workloads
- Connection pooling (PgBouncer or Pgpool-II)
- Query optimization and indexing

---

## Messaging & Queues

### AWS SQS (Simple Queue Service)

**Use Cases**:
- Order fulfillment jobs
- Appointment reminder jobs
- Lead routing jobs
- Email sending

**Configuration**:
- Visibility timeout: 5 min (fulfillment), 1 hour (email)
- Max receive count: 3 retries before dead-letter queue
- Dead-letter queue: separate queue for failed jobs

---

## Monitoring & Observability

### Metrics Collection: Prometheus or AWS CloudWatch

**Key Metrics**:
- HTTP request rate, latency (p50, p95, p99)
- Error rate by endpoint
- Database query latency
- Queue depth (SQS backlog)
- Container CPU and memory usage
- Stripe API latency and error rate
- Email delivery rate
- LLM (AI concierge) latency and cost
- Appointment no-show rate
- Order fulfillment time

### Alerting: PagerDuty or similar

**Alert Rules**:
- API error rate > 5% for 5 minutes
- Database connection pool > 80% capacity
- SQS dead-letter queue has messages
- Stripe API down for 1 minute
- Payment success rate < 95%
- Response time p95 > 1 second
- Pod restarts > 3 in 10 minutes

**Channels**: Slack, email, SMS for critical

### Logging: CloudWatch Logs or ELK

- Format: JSON (timestamp, level, service, tracing_id, message)
- Retention: 30 days (audit logs: 2 years)
- All services log to central platform

### Tracing: X-Ray or Jaeger

- Tracing ID assigned to every request
- Trace correlation across services
- Slow trace detection (alerts for > 1 second)

---

## Reliability Patterns

### Health Checks

- **Liveness probe**: `/health` → 200 OK (service alive?)
- **Readiness probe**: `/ready` → checks database, queue access (ready to receive traffic?)
- **Startup probe**: waits for initialization
- **Frequency**: checked every 10 seconds
- **Failure**: 3 consecutive failures → pod restart

### Auto-Scaling

- **Metric**: CPU > 70% or memory > 80%
- **Scale up**: add 1 pod per metric breach
- **Scale down**: remove 1 pod if metrics < 30% for 5 minutes
- **Constraints**: 3 pods minimum (across AZs), 20 pods maximum

### Circuit Breaker

| Service | Action if Down |
|---|---|
| **Stripe** | Fail fast, retry with exponential backoff |
| **Calendar** | Allow booking inquiry without calendar confirmation |
| **Email** | Queue for retry if temporarily down |
| **LLM** | Fall back to FAQ or "contact sales" |

### Rate Limiting

- API: 100 requests/minute per IP
- Stripe API: respect Stripe limits
- Email: batch sends, respect provider limits
- LLM: batch requests, respect API limits

### Graceful Degradation

- **Stripe down**: payments paused, customers notified, retry queued
- **Email down**: notifications queued, retry with backoff
- **Calendar down**: booking inquiry collected without calendar
- **LLM down**: FAQ shown or "contact sales" offered

---

## Disaster Recovery

### Objectives

- **RTO** (Recovery Time Objective): 4 hours
- **RPO** (Recovery Point Objective): 1 hour

### Backup & Restore

- Database: daily backups, tested restore quarterly
- File storage (S3): versioning + cross-region replication
- Configuration: Terraform in separate repo
- Secrets: Secrets Manager with versioning

### Failover Strategy

- **Database**: Multi-AZ with automatic failover (< 5 minutes)
- **API services**: auto-scaling across availability zones
- **DNS**: Route 53 health checks trigger DNS change if primary down

### Runbooks (Documented Procedures)

- Database restore from backup
- Services restart (automated)
- Data sync between primary/replica
- Stakeholder notification plan

---

## On-Call Procedures

### Escalation Policy

- **Primary**: DevOps engineer (24/7 rotation)
- **Secondary**: Backend lead (escalate after 15 minutes)
- **Incident Commander**: Manager (if > 1 hour)

### Runbooks

- **Database connection errors**: check pool, restart clients
- **High API error rate**: check deployments, rollback if needed
- **Payment failures**: check Stripe status, manual processing
- **Email failures**: check email service, verify queue
- **Appointment reminder failures**: check scheduler, verify queue

### Post-Incident

1. War room: immediate root cause analysis
2. Timeline: reconstruction of events
3. Action items: prevent recurrence
4. Post-mortem: within 48 hours

---

## Performance Tuning

### Frontend

- Image optimization: WebP, lazy loading, responsive images
- Code splitting: load only required JS/CSS per page
- Caching: service worker, CDN (CloudFront)
- Target: Lighthouse > 90 on all pages

### Backend

- Database: indexing, query optimization, Redis cache
- API: compression (gzip), ETag support, conditional requests
- Background jobs: batch updates, schedule off-peak
- Caching: Redis for frequently accessed data

### CDN: CloudFront

- Cache policy: static assets (1 year), API (no cache except public GET)
- Origin: ALB
- Edge locations: global

---

## Release Process

### Versioning: Semantic Versioning (MAJOR.MINOR.PATCH)

**Release Notes**: generated from commit messages

**Deployment Checklist**:
- [ ] Code review approved
- [ ] CI lint and build passing
- [ ] Tests passing (unit, integration, smoke) where applicable
- [ ] Security scanning passed
- [ ] Database migrations tested if backend work is included
- [ ] Vercel development deployment successful
- [ ] Smoke tests on deployed frontend passed
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Release notes written

**Post-Deployment**:
1. Monitor error rate and latency for 1 hour
2. Check critical workflows (checkout, booking, delivery)
3. Confirm no new alerts
4. Mark release as stable

---

## Security Operations

- **Secrets rotation**: quarterly via Secrets Manager
- **Certificate renewal**: 30 days before expiration (automated)
- **Dependency updates**: security updates within SLA, non-security monthly
- **Access reviews**: quarterly
- **Log retention**: audit logs 2+ years per compliance

---

## How to Use This Plan

- **DevOps engineers**: follow deployment strategy, infrastructure templates, on-call procedures
- **Frontend-only deployment owners**: use the Vercel baseline above until backend work resumes
- **Backend developers**: use health checks, structured logging, metrics instrumentation
- **QA team**: validate deployments, smoke tests, monitor stability
- **Incident response**: use runbooks and escalation procedures
- **Management**: track SLA compliance, monitor costs
