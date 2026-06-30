---
document_type: spec-index
role: Frontend
parent_artifact: DOC/PROJECT PLAN/auth-account-cart-dashboard-e2e-plan.md
status: active
last_audit_date: 2026-07-01
---

# Customer dashboard — page specs

One-page specifications for each route under `/dashboard`. Each spec follows the same template:

- **Purpose** + audience
- **States**: loading, empty, populated, error
- **Data sources** (endpoint paths)
- **Mutations**: what the page can write and where
- **Mobile**: breakpoints + tap-target notes
- **Accessibility checklist**
- **E2E test path**

## Routes

| Route | Spec | Status |
|---|---|---|
| `/dashboard` | [overview.md](./overview.md) | active |
| `/dashboard/products` | [products.md](./products.md) | active |
| `/dashboard/downloads` | [downloads.md](./downloads.md) | active |
| `/dashboard/orders` | [orders.md](./orders.md) | active |
| `/dashboard/orders/[id]` | [order-detail.md](./order-detail.md) | active |
| `/dashboard/appointments` | [appointments.md](./appointments.md) | active |
| `/dashboard/submissions` | [submissions.md](./submissions.md) | active |
| `/dashboard/submissions/[type]/[id]` | [submission-detail.md](./submission-detail.md) | active |
| `/dashboard/support` | [support.md](./support.md) | active |
| `/dashboard/account` | [account.md](./account.md) | active |
