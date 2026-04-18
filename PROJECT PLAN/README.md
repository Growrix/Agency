---
document_type: documentation-index
entrypoint: true
scope: folder-wide
build_stage: 0-start-here
read_first:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# PROJECT PLAN README

## Purpose
- This folder is the implementation planning system for the agency website.
- Start here before reading any other file.
- Do not read the entire folder by default.
- Use this README to identify the minimum required files for the task you are performing.

## AI Usage Rules
- Always start with this file.
- Read only the documents required for the current task.
- For any page build, read the global foundation files first, then the specific page file.
- For shop, booking, chat, or checkout work, also read the related flow files listed below.

## Global Foundation Files
- [00-master-ui-architecture.md](00-master-ui-architecture.md): site map, route map, cross-page flows, navigation, global UX model.
- [01-design-system.md](01-design-system.md): tokens, typography, color, spacing, surfaces, responsive rules.
- [02-component-system.md](02-component-system.md): reusable UI primitives, states, behavior, accessibility, responsive logic.

## Machine-Readable Task Map
```yaml
tasks:
  build-global-shell:
    read:
      - 00-master-ui-architecture.md
      - 01-design-system.md
      - 02-component-system.md
    outputs:
      - app shell
      - header
      - footer
      - mobile navigation
      - chat launcher
      - cart launcher

  build-homepage:
    read:
      - 00-master-ui-architecture.md
      - 01-design-system.md
      - 02-component-system.md
      - home-page.md

  build-services:
    read:
      - 00-master-ui-architecture.md
      - 01-design-system.md
      - 02-component-system.md
      - services-page.md
      - service-saas-applications-page.md
      - service-websites-page.md
      - service-mcp-servers-page.md
      - service-automation-page.md

  build-portfolio:
    read:
      - 00-master-ui-architecture.md
      - 01-design-system.md
      - 02-component-system.md
      - portfolio-page.md
      - case-study-page.md

  build-shop:
    read:
      - 00-master-ui-architecture.md
      - 01-design-system.md
      - 02-component-system.md
      - shop-page.md
      - product-detail-page.md
      - checkout-page.md

  build-conversion-and-contact:
    read:
      - 00-master-ui-architecture.md
      - 01-design-system.md
      - 02-component-system.md
      - pricing-page.md
      - contact-page.md
      - faq-page.md
      - book-appointment-page.md

  build-ai-assistant:
    read:
      - 00-master-ui-architecture.md
      - 01-design-system.md
      - 02-component-system.md
      - ai-concierge-page.md
      - contact-page.md
      - book-appointment-page.md

  build-company-and-trust:
    read:
      - 00-master-ui-architecture.md
      - 01-design-system.md
      - about-page.md
      - privacy-policy-page.md
      - terms-of-service-page.md
      - 404-page.md
```

## Sequential Build Workflow
1. Read [00-master-ui-architecture.md](00-master-ui-architecture.md), [01-design-system.md](01-design-system.md), and [02-component-system.md](02-component-system.md).
2. Build the shared shell first: header, footer, mobile bottom navigation, utility ribbon, chat launcher, WhatsApp action, cart entry.
3. Build the core marketing routes: [home-page.md](home-page.md), [services-page.md](services-page.md), [pricing-page.md](pricing-page.md), [about-page.md](about-page.md).
4. Build the service detail routes: [service-saas-applications-page.md](service-saas-applications-page.md), [service-websites-page.md](service-websites-page.md), [service-mcp-servers-page.md](service-mcp-servers-page.md), [service-automation-page.md](service-automation-page.md).
5. Build proof routes: [portfolio-page.md](portfolio-page.md) and [case-study-page.md](case-study-page.md).
6. Build commerce routes: [shop-page.md](shop-page.md), [product-detail-page.md](product-detail-page.md), [checkout-page.md](checkout-page.md).
7. Build conversion and assistant flows: [ai-concierge-page.md](ai-concierge-page.md), [book-appointment-page.md](book-appointment-page.md), [contact-page.md](contact-page.md), [faq-page.md](faq-page.md).
8. Finish utility and trust routes: [privacy-policy-page.md](privacy-policy-page.md), [terms-of-service-page.md](terms-of-service-page.md), [404-page.md](404-page.md).
9. Run final polish for responsive QA, accessibility, performance, motion fallback, and empty or error states.

## Minimal Read Paths
- To build one marketing page: read the three global foundation files plus the target page file.
- To build one service detail page: read the three global foundation files, [services-page.md](services-page.md), and the target service page.
- To build one shop route: read the three global foundation files plus the relevant commerce file; include [checkout-page.md](checkout-page.md) if cart or payment state is involved.
- To build AI chat or WhatsApp escalation: read the three global foundation files plus [ai-concierge-page.md](ai-concierge-page.md), [contact-page.md](contact-page.md), and [book-appointment-page.md](book-appointment-page.md).

## File Inventory By Group

### Foundation
- [00-master-ui-architecture.md](00-master-ui-architecture.md)
- [01-design-system.md](01-design-system.md)
- [02-component-system.md](02-component-system.md)

### Marketing And Services
- [home-page.md](home-page.md)
- [services-page.md](services-page.md)
- [service-saas-applications-page.md](service-saas-applications-page.md)
- [service-websites-page.md](service-websites-page.md)
- [service-mcp-servers-page.md](service-mcp-servers-page.md)
- [service-automation-page.md](service-automation-page.md)
- [pricing-page.md](pricing-page.md)
- [about-page.md](about-page.md)

### Proof
- [portfolio-page.md](portfolio-page.md)
- [case-study-page.md](case-study-page.md)

### Commerce
- [shop-page.md](shop-page.md)
- [product-detail-page.md](product-detail-page.md)
- [checkout-page.md](checkout-page.md)

### Conversion, Support, And Assistant
- [ai-concierge-page.md](ai-concierge-page.md)
- [book-appointment-page.md](book-appointment-page.md)
- [contact-page.md](contact-page.md)
- [faq-page.md](faq-page.md)

### Legal And Utility
- [privacy-policy-page.md](privacy-policy-page.md)
- [terms-of-service-page.md](terms-of-service-page.md)
- [404-page.md](404-page.md)

## Dependency Notes
- Every route implementation depends on the master architecture, design system, and component system.
- Commerce work depends on shop, product detail, and checkout staying structurally aligned.
- Portfolio detail work depends on the portfolio listing model.
- Booking, contact, AI concierge, and WhatsApp escalation should be built as one connected conversion system.

## Exit Condition
- The folder is considered ready for implementation when a builder can select a task, read only the mapped documents, and start building without scanning unrelated files.