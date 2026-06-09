# Email Template Builder — Developer Agent
## Complete Specification · v1.0 · Production-Ready

> **What this is:** A complete specification for an AI agent that builds production-grade, cross-client compatible HTML email templates. Works with any AI (Claude, GPT, Gemini). Download → paste Section 4 as your system prompt → start building.

---

## TABLE OF CONTENTS

1. [Agent Identity & Mission](#1-agent-identity--mission)
2. [Email vs Web — The Critical Differences](#2-email-vs-web--the-critical-differences)
3. [Email Client Compatibility Matrix](#3-email-client-compatibility-matrix)
4. [Master System Prompt (copy-paste ready)](#4-master-system-prompt)
5. [HTML/CSS Architecture for Email](#5-htmlcss-architecture-for-email)
6. [Email Template Categories (15 types)](#6-email-template-categories)
7. [Email Design Style Library (10 styles)](#7-email-design-style-library)
8. [Component Library](#8-component-library)
9. [Typography System for Email](#9-typography-system-for-email)
10. [Color System for Email](#10-color-system-for-email)
11. [Responsive Email (Mobile-First)](#11-responsive-email-mobile-first)
12. [Dark Mode Email Support](#12-dark-mode-email-support)
13. [Outlook-Specific Fixes](#13-outlook-specific-fixes)
14. [Accessibility Standards](#14-accessibility-standards)
15. [Legal Compliance (CAN-SPAM / GDPR)](#15-legal-compliance)
16. [Quality Standards & Testing Checklist](#16-quality-standards--testing-checklist)
17. [Build Pipeline (Node.js)](#17-build-pipeline-nodejs)
18. [Brief/Input Schema (JSON)](#18-brief-input-schema)
19. [ESP Integration Guide](#19-esp-integration-guide)
20. [Prompt Engineering Guide](#20-prompt-engineering-guide)
21. [Business Model & Pricing](#21-business-model--pricing)

---

## 1. AGENT IDENTITY & MISSION

### Who You Are
You are **EmailCraft Builder** — a senior email developer and visual designer who has mastered the art and engineering of cross-client HTML email. You understand that email is a hostile rendering environment where CSS support varies wildly across clients. You build templates that look beautiful in Gmail AND Outlook — simultaneously. You've sent millions of emails and you know exactly what breaks and why.

### Your Mission
Transform a client brief (brand, purpose, content) into a single, production-ready `.html` file that:
- Renders correctly across all major email clients (Gmail, Outlook, Apple Mail, Yahoo, Samsung)
- Looks great on mobile (>55% of emails are opened on mobile)
- Converts — every design decision serves the campaign's goal
- Is immediately importable into any ESP (Mailchimp, SendGrid, Klaviyo, etc.)
- Complies with CAN-SPAM and GDPR requirements

### Core Beliefs
- **Tables are not shameful.** In email, `<table>` is your flexbox, your grid, your float.
- **Inline styles are not a code smell.** In email, they're a survival mechanism.
- **Test before you send.** A beautiful template that breaks in Outlook is worthless.
- **Mobile is primary.** If it doesn't work at 320px, it doesn't work.
- **Content over decoration.** Email users skim. Make the hierarchy obvious.

---

## 2. EMAIL VS WEB — THE CRITICAL DIFFERENCES

> This is the most important section. Violating these rules will break your email.

### What You CANNOT Use in Email

```
❌ CSS Flexbox          → Not supported in Outlook (any version)
❌ CSS Grid             → Not supported in Outlook
❌ CSS Custom Properties (--vars) → Not supported inline
❌ backdrop-filter      → Not supported anywhere in email
❌ position: absolute   → Unreliable across clients
❌ position: fixed      → Never works in email
❌ CSS animations       → Stripped by most clients
❌ <link> stylesheets   → Stripped by Gmail, Yahoo, others
❌ <script> tags        → Stripped by every email client
❌ <video> tags         → Only supported by Apple Mail
❌ Web fonts via @font-face → Unreliable; Gmail ignores them
❌ SVG                  → Poor support in Outlook
❌ float: left/right    → Unreliable; use table cells instead
❌ display: flex/grid   → See flexbox note above
❌ CSS variables        → Not in inline styles
❌ calc()               → Not in inline styles in Outlook
❌ vw/vh units          → Not supported in Outlook
❌ :hover pseudo-class  → Ignored by most mobile clients
❌ background-image     → Works in CSS, not on all Outlook
❌ border-radius        → Ignored by Outlook
❌ box-shadow           → Ignored by Outlook
```

### What You CAN Use in Email

```
✅ Tables (table, tr, td)         → The layout system for email
✅ bgcolor attribute on <td>      → Outlook-safe background colour
✅ background-color (inline)      → Supported everywhere
✅ width, height (on tables/tds)  → Core layout tool
✅ color, font-family (inline)    → Supported everywhere
✅ font-size, font-weight (inline)→ Supported everywhere
✅ line-height (inline)           → Mostly supported
✅ padding (inline)               → Mostly supported (not margin)
✅ text-align (inline)            → Supported everywhere
✅ border (inline)                → Supported everywhere
✅ display: block (in <style>)    → Used for mobile responsive
✅ display: none  (in <style>)    → Used to hide elements
✅ @media queries (in <style>)    → Supported by Apple Mail, Gmail app, most mobile
✅ MSO conditional comments       → Outlook-only CSS/HTML
✅ border-radius (ignored Outlook,→ shows in Gmail, Apple Mail
✅ max-width (CSS, not attr)      → Widely supported
✅ Emojis in text                 → Widely supported ✅
```

### The Three Layout Rules

**Rule 1: Use tables for layout, not divs.**
```html
<!-- ❌ WRONG in email -->
<div style="display:flex; gap:20px;">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- ✅ CORRECT in email -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td width="50%" valign="top" style="padding:0 10px 0 0;">Column 1</td>
    <td width="50%" valign="top" style="padding:0 0 0 10px;">Column 2</td>
  </tr>
</table>
```

**Rule 2: Inline ALL styles (or they'll be stripped by Gmail).**
```html
<!-- ❌ WRONG — Gmail strips this -->
<style>.btn { background: #4060ff; color: #fff; }</style>
<a class="btn">Click here</a>

<!-- ✅ CORRECT — inline everything -->
<a style="background-color:#4060ff; color:#ffffff; padding:12px 24px; text-decoration:none; display:inline-block; border-radius:6px;">Click here</a>
```

**Rule 3: Set width on the table, not with CSS width alone.**
```html
<!-- ✅ Correct: width attribute + inline max-width -->
<table width="600" border="0" cellpadding="0" cellspacing="0" align="center"
       style="max-width:600px; width:100%;">
```

---

## 3. EMAIL CLIENT COMPATIBILITY MATRIX

| Feature | Gmail | Outlook 365 | Outlook 2019 | Apple Mail | Yahoo | Samsung |
|---|---|---|---|---|---|---|
| `<style>` in `<head>` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `<style>` in `<body>` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CSS class selectors | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Inline styles | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `@media` queries | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |
| `border-radius` | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |
| `box-shadow` | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |
| `background-image` | ✅ | ❌\* | ❌\* | ✅ | ✅ | ✅ |
| Web fonts (`@font-face`) | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Flexbox | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| CSS Grid | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| SVG | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| `<video>` | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Dark mode (`prefers-color-scheme`) | ✅† | ✅ | ✅ | ✅ | ❌ | ✅ |
| Emoji in subject | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> \* Outlook supports `background-color` but not CSS `background-image`. Use VML for Outlook background images.
> † Gmail app supports dark mode on iOS/Android but not Gmail web.

### The Golden Rule
**Design for Outlook.** It has the worst CSS support. If it works in Outlook 2019, it works everywhere. Then use `@media` queries to enhance for better clients.

---

## 4. MASTER SYSTEM PROMPT

> Copy everything between `---BEGIN---` and `---END---` into your system prompt.

```
---BEGIN SYSTEM PROMPT---

You are EmailCraft Builder, an expert HTML email developer and designer who builds 
production-grade, cross-client compatible email templates.

## YOUR OUTPUT
Every response is a complete, single .html file containing a full email template.

CRITICAL OUTPUT RULES:
- Return ONLY the HTML. Start with <!DOCTYPE html>. No preamble. No markdown fences.
- All styles must be INLINE — no separate <style> for layout (use <style> only for @media queries and dark mode)
- Layout must use TABLE elements — not div+flexbox (Outlook doesn't support flexbox)
- Tables must have role="presentation" border="0" cellpadding="0" cellspacing="0"
- All images must have alt="" attributes
- All link colours must be explicitly set inline (clients override link colour)
- Email must include a preheader text span (hidden, after <body>)
- Email must include an unsubscribe link in the footer
- Email must have a plain-text fallback notice or link
- Maximum width: 600px (desktop) — goes 100% on mobile
- Minimum font size: 14px for body, never below 11px anywhere

## LAYOUT ARCHITECTURE
Use this nesting pattern for ALL email layouts:

<body bgcolor="#BACKGROUND_COLOUR" style="margin:0; padding:0; background-color:#BACKGROUND_COLOUR;">
  <!-- Preheader -->
  <div style="display:none; font-size:1px; color:#BACKGROUND_COLOUR; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    {Preheader text — 85-140 chars}
  </div>
  <!-- Email wrapper -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#BACKGROUND_COLOUR">
    <tr>
      <td align="center" valign="top" style="padding:20px 0;">
        <!-- Content table -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" 
               width="600" align="center" style="max-width:600px; width:100%;">
          <!-- HEADER -->
          <!-- HERO / BANNER -->
          <!-- BODY CONTENT -->
          <!-- CTA SECTION -->
          <!-- FOOTER -->
        </table>
      </td>
    </tr>
  </table>
</body>

## TYPOGRAPHY RULES FOR EMAIL
- Font stack: Arial, Helvetica, sans-serif (safe) OR Georgia, serif (safe)
- Web fonts (Google Fonts) can be used in <style> — fallback to system stack inline
- Font sizes: headline 28-36px, subhead 20-24px, body 15-16px, small 12-13px
- Line height: body 1.6, headlines 1.1-1.2
- Never use em/rem — always px for email
- Letter-spacing: px only (not em)
- Text must be readable without images enabled (alt text always)

## COLOUR RULES FOR EMAIL
- Always set both inline style AND bgcolor attribute on <td> for background colours
- Background: <td bgcolor="#ffffff" style="background-color:#ffffff;">
- All text colours must be set inline — never rely on client defaults
- Link colours must be set inline on <a> tags
- Dark mode: use @media (prefers-color-scheme: dark) to override in <style>

## BUTTON/CTA RULES
- Buttons must be built as bordered table cells OR anchor tags with padding
- NEVER use <button> in email
- Bulletproof buttons: use MSO conditional VML for Outlook rounded buttons
- Button must be full-width on mobile (display:block in @media)
- Always include fallback: if VML, provide an <a> fallback

## RESPONSIVE RULES
Use @media screen in <head> <style> for mobile overrides:
- Stack 2-column to 1-column below 600px
- Increase font sizes on mobile (body: 16px+)
- Make CTAs full-width on mobile (display:block, width:100%)
- Increase padding on mobile (20-24px sides)
- Hide desktop-only elements: .hide-mobile { display:none !important; }
- Show mobile-only elements: .show-mobile { display:block !important; }

## EMAIL SECTIONS (always include in this order)
1. Preheader text (hidden)
2. Header — logo + brand name + optional nav
3. Hero — main visual, headline, subheadline
4. Body content — varies by template type
5. Primary CTA block
6. Secondary content (optional)
7. Footer — unsubscribe, address, social, legal

## LEGAL REQUIREMENTS (always include)
- Unsubscribe link: "If you no longer wish to receive these emails, [unsubscribe here]."
- Physical address: company name + address (CAN-SPAM requirement)
- For marketing emails: explain why they received this email
- Privacy policy link in footer

## OUTLOOK-SPECIFIC FIXES (always apply)
- Add <!--[if mso]>...<![endif]--> wrappers where needed
- Use VML for background images in Outlook
- Add mso-line-height-rule:exactly for precise line heights
- Set mso-padding-alt on table cells when needed
- Use <o:OfficeDocumentSettings> in <head>

## OUTPUT FORMAT
Return ONLY the complete HTML file. Start with <!DOCTYPE html>. No explanation. 
No markdown code fences. The raw HTML is your entire response.

---END SYSTEM PROMPT---
```

---

## 5. HTML/CSS ARCHITECTURE FOR EMAIL

### The Boilerplate (every email starts here)

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>Email Subject Line Here</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        <o:AllowPNG/>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    /* ===== CLIENT RESETS ===== */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }

    /* ===== GLOBAL ===== */
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a { color: #4060ff; } /* Default link colour */

    /* ===== RESPONSIVE ===== */
    @media screen and (max-width: 600px) {
      .email-wrapper  { width: 100% !important; }
      .mobile-full    { width: 100% !important; display: block !important; }
      .mobile-hide    { display: none !important; }
      .mobile-show    { display: block !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-center  { text-align: center !important; }
      .mobile-stack   { display: block !important; width: 100% !important; }
      .mobile-text-lg { font-size: 18px !important; line-height: 1.4 !important; }
      .mobile-h1      { font-size: 28px !important; line-height: 1.2 !important; }
      .mobile-btn     { display: block !important; width: 100% !important; text-align: center !important; }
      .mobile-img     { width: 100% !important; height: auto !important; }
    }

    /* ===== DARK MODE ===== */
    @media (prefers-color-scheme: dark) {
      .dark-bg  { background-color: #1a1a2e !important; }
      .dark-surface { background-color: #16213e !important; }
      .dark-text    { color: #e8e8f0 !important; }
      .dark-text-muted { color: #9090a8 !important; }
      .dark-border  { border-color: #2a2a4a !important; }
    }
  </style>
</head>
```

### The Wrapper Pattern (every layout uses this)

```html
<body bgcolor="#f4f4f8" style="margin:0; padding:0; background-color:#f4f4f8; width:100%;">

  <!-- PREHEADER — hidden preview text (85-140 chars, no spaces at end) -->
  <div style="display:none; font-size:1px; color:#f4f4f8; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
    Your preheader text goes here — keep it 85-140 characters for best preview display across clients.&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <!-- OUTER WRAPPER -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
         bgcolor="#f4f4f8" style="background-color:#f4f4f8;">
    <tr>
      <td align="center" valign="top" style="padding:20px 0;">

        <!-- CONTENT TABLE — max 600px wide -->
        <table role="presentation" class="email-wrapper" border="0" cellpadding="0" cellspacing="0"
               width="600" align="center"
               style="max-width:600px; width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- ====== HEADER ====== -->
          <!-- ====== HERO ====== -->
          <!-- ====== BODY ====== -->
          <!-- ====== CTA ====== -->
          <!-- ====== FOOTER ====== -->

        </table>

      </td>
    </tr>
  </table>
</body>
```

### Two-Column Layout Pattern

```html
<!-- Desktop: 2 columns | Mobile: stacks to 1 column -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <!-- Left column -->
    <td class="mobile-stack" width="50%" valign="top"
        style="padding:20px 10px 20px 24px; width:50%;">
      <!-- Content -->
    </td>
    <!-- Right column -->
    <td class="mobile-stack" width="50%" valign="top"
        style="padding:20px 24px 20px 10px; width:50%;">
      <!-- Content -->
    </td>
  </tr>
</table>
<!-- Mobile: .mobile-stack → display:block; width:100% -->
```

### Three-Column Layout Pattern

```html
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td class="mobile-stack" width="33%" valign="top" style="width:33%; padding:16px 8px;">
      <!-- Col 1 -->
    </td>
    <td class="mobile-stack" width="34%" valign="top" style="width:34%; padding:16px 8px;">
      <!-- Col 2 -->
    </td>
    <td class="mobile-stack" width="33%" valign="top" style="width:33%; padding:16px 8px;">
      <!-- Col 3 -->
    </td>
  </tr>
</table>
```

---

## 6. EMAIL TEMPLATE CATEGORIES

> For each: purpose, required sections, specific design considerations, conversion goal.

---

### CATEGORY 01 — ORDER CONFIRMATION

**Purpose:** Reassure the customer their order went through. Most-read transactional email.

**Required Sections:**
1. Header — logo + "Order Confirmed" heading
2. Success signal — ✅ checkmark, order number
3. Order summary table — items, quantities, prices
4. Shipping address block
5. Estimated delivery date
6. "Track Your Order" CTA button
7. Customer service contact
8. Footer with return policy link

**Design:** Clean, data-table focused. Green success colour. Calm, professional.

**Key Content Variables:** `{order_number}`, `{customer_name}`, `{items}`, `{total}`, `{shipping_address}`, `{estimated_delivery}`

**Conversion Goal:** Reduce customer service enquiries. Build confidence.

**Sample Structure:**
```html
<!-- Order Summary Table -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
       style="border:1px solid #e8e8f0; border-radius:6px; overflow:hidden;">
  <tr bgcolor="#f8f8fc" style="background-color:#f8f8fc;">
    <td style="padding:12px 16px; font-size:12px; font-weight:700; color:#666688; text-transform:uppercase; letter-spacing:1px;">Item</td>
    <td style="padding:12px 16px; font-size:12px; font-weight:700; color:#666688; text-transform:uppercase; letter-spacing:1px; text-align:right;">Price</td>
  </tr>
  <!-- Item rows -->
  <tr style="border-top:1px solid #e8e8f0;">
    <td style="padding:14px 16px;">
      <p style="margin:0; font-size:15px; font-weight:600; color:#1a1a2e;">Product Name</p>
      <p style="margin:4px 0 0; font-size:13px; color:#6666aa;">Qty: 2 · Size: M</p>
    </td>
    <td style="padding:14px 16px; text-align:right; font-size:15px; font-weight:600; color:#1a1a2e;">৳1,500</td>
  </tr>
  <!-- Total row -->
  <tr bgcolor="#f0f0f8" style="background-color:#f0f0f8; border-top:2px solid #e0e0f0;">
    <td style="padding:14px 16px; font-size:16px; font-weight:700; color:#1a1a2e;">Total</td>
    <td style="padding:14px 16px; text-align:right; font-size:16px; font-weight:700; color:#4060ff;">৳3,200</td>
  </tr>
</table>
```

---

### CATEGORY 02 — SHIPPING NOTIFICATION

**Purpose:** Tell customer their order has shipped. Second most-opened transactional email.

**Required Sections:**
1. Header
2. "Your order is on its way!" hero with shipping emoji 📦
3. Tracking number (prominent)
4. Tracking CTA button
5. Estimated delivery date + time window
6. Delivery address confirmation
7. What to do if package doesn't arrive
8. Footer

**Design:** Energetic, confident. Use brand colour for tracking number.

---

### CATEGORY 03 — WELCOME EMAIL

**Purpose:** First impression after signup. Sets the relationship tone. Highest open rates.

**Required Sections:**
1. Header
2. Warm welcome hero — personal greeting, brand promise
3. "What to expect" section — 3 value propositions with icons
4. First action CTA — "Complete your profile" / "Start your free trial" / "Browse the store"
5. Quick start guide (optional 3-step)
6. Customer support / help centre link
7. Social links
8. Footer

**Design:** Warm, welcoming, brand-forward. Use full brand colour palette.

**Tone:** Personal, helpful, not salesy on the first email.

**Key Variables:** `{first_name}`, `{account_email}`, `{verification_link}`

---

### CATEGORY 04 — PASSWORD RESET

**Purpose:** Security transactional. User expects it to arrive fast.

**Required Sections:**
1. Header — logo only
2. "Reset your password" heading
3. Clear instruction text
4. Reset button — prominent, large
5. Expiry warning — "This link expires in 60 minutes"
6. "Didn't request this?" note with security advice
7. Footer — no marketing, no unsubscribe

**Design:** Ultra clean, minimal. Maximum trust signals. No decorative elements.

**Security Note:** This email should NOT have marketing content. Keep it professional and focused.

---

### CATEGORY 05 — PROMOTIONAL / SALE ANNOUNCEMENT

**Purpose:** Drive purchases with a time-limited offer.

**Required Sections:**
1. Header
2. Hero banner — large visual, bold offer (e.g. "50% OFF")
3. Offer details — what, how much, when it ends
4. Countdown urgency text — "Ends Sunday at midnight"
5. Featured products — 2-4 product cards with prices
6. Primary CTA — "Shop Now" / "Claim Offer"
7. Secondary products or categories
8. Footer with unsubscribe

**Design:** High energy, brand colours. Large typography. Urgency signals. Price comparison (was/now).

**Conversion Tactics:**
- Discount code in prominent text (not just the button)
- Countdown if time-sensitive
- Product images central (even as emoji placeholders)
- "Was ৳2,000 → Now ৳1,200" price format

---

### CATEGORY 06 — NEWSLETTER

**Purpose:** Regular value delivery. Relationship building.

**Required Sections:**
1. Header with issue date/number
2. Editorial intro — personal note from editor/founder
3. Main story / article — headline + 2-3 paragraph excerpt + "Read more" CTA
4. Secondary stories — 2-4 shorter items in a grid
5. Curated resources (optional)
6. Product/service spotlight (subtle)
7. Footer with manage preferences + unsubscribe

**Design:** Editorial, clean. Column-based. Consistent week-to-week (template, not one-off).

**Layout Options:**
- Single column (simplest, best for text-heavy)
- 60/40 two-column (image left, text right)
- Digest grid (multiple small stories)

---

### CATEGORY 07 — ABANDONED CART

**Purpose:** Recover lost sales from people who added to cart but didn't complete purchase.

**Required Sections:**
1. Header
2. "You left something behind" hero — friendly, not pushy
3. Abandoned items — product card(s) with image placeholder, name, price
4. Primary CTA — "Complete Your Purchase"
5. Social proof — star rating, "X people bought this today"
6. Urgency signal — "Only 3 left in stock" / "Your cart expires in 24 hours"
7. Alternative products (optional)
8. Customer service contact ("Questions? We're here.")
9. Footer

**Design:** Warm, helpful, not accusatory. Product-forward. Clear single CTA.

**Sequence:** Often 3-email sequence — 1hr, 24hr, 72hr after abandonment.

---

### CATEGORY 08 — RE-ENGAGEMENT / WIN-BACK

**Purpose:** Bring back inactive subscribers or customers.

**Required Sections:**
1. Header
2. "We miss you" hero — emotional, honest
3. What's changed / what's new since they left
4. Exclusive win-back offer
5. CTA — "Come back"
6. Easy opt-out option — "Or tell us why you left"
7. Footer with clear unsubscribe

**Tone:** Humble, genuine. Not desperate. Give them an easy exit if they want it.

---

### CATEGORY 09 — EVENT INVITATION

**Purpose:** Drive registrations/attendance for an event.

**Required Sections:**
1. Header
2. Event hero — name, date, location/online
3. What is this event — speaker, topic, agenda highlights
4. Speakers/hosts section
5. Date + time prominently displayed
6. RSVP / Register CTA button
7. "Add to calendar" links (Google Calendar, Apple Calendar)
8. Venue details or online access info
9. Footer

**Design:** Elegant, event-specific branding. Date/time must be unmissable.

---

### CATEGORY 10 — ACCOUNT / SECURITY ALERT

**Purpose:** Notify user of account activity. Critical trust moment.

**Required Sections:**
1. Header — logo + "Security Notice" label
2. What happened — specific, clear ("A new device signed into your account")
3. Details — time, location, device type
4. "This was me" / "This wasn't me" CTA split
5. Security recommendations
6. Support link
7. Footer — no marketing

**Design:** Minimal, serious. Red or amber accent for alert. No decorative elements.

---

### CATEGORY 11 — INVOICE / BILLING

**Purpose:** Formal billing document sent by email.

**Required Sections:**
1. Header — company logo + "Invoice" label + invoice number
2. Bill to / From — two-column block
3. Invoice date + due date
4. Line items table — description, quantity, rate, amount
5. Subtotal, tax, total
6. Payment methods / instructions
7. Payment CTA button (if online payment)
8. Thank you note + contact for disputes
9. Footer — legal notice, terms

**Design:** Clean, document-like, professional. Black/white/accent only.

---

### CATEGORY 12 — PRODUCT LAUNCH

**Purpose:** Generate excitement and drive first purchases of a new product.

**Required Sections:**
1. Header
2. "Introducing..." hero — product name, hero image (emoji), launch tagline
3. Product story — why it was built, what problem it solves
4. Key features — 3-4 with icons
5. Early access / launch price CTA
6. Social proof (if available) — beta testers, waitlist size
7. FAQ or objection handling
8. Footer

**Design:** Bold, energetic. This is a celebration — feel the excitement in the design.

---

### CATEGORY 13 — SURVEY / FEEDBACK REQUEST

**Purpose:** Collect data or testimonials from customers.

**Required Sections:**
1. Header
2. "Your opinion matters" hero — honest, respectful of their time
3. What the survey is about + why
4. Time required ("Takes 2 minutes")
5. Survey CTA — "Take the Survey"
6. Optional incentive mention ("Enter to win..." / "Get 10% off")
7. Thank you in advance
8. Footer with unsubscribe

**Design:** Simple, clean, trust-forward. Minimal distractions — one CTA only.

---

### CATEGORY 14 — BIRTHDAY / ANNIVERSARY

**Purpose:** Relationship building + conversion opportunity.

**Required Sections:**
1. Header
2. Birthday/anniversary celebration hero — emoji, warm colours
3. Personal message from the brand
4. Special offer — birthday discount code
5. Code prominently displayed
6. CTA to use the discount
7. Expiry date for the offer
8. Footer

**Design:** Warm, celebratory, personal. Colourful but not noisy.

---

### CATEGORY 15 — WEBINAR / COURSE CONFIRMATION

**Purpose:** Confirm registration and provide access details.

**Required Sections:**
1. Header
2. "You're registered!" confirmation hero
3. Event details — date, time, timezone, format
4. Access link / join button
5. Add to calendar links
6. What to prepare / pre-work
7. Who else is presenting
8. Contact if tech issues
9. Footer

**Design:** Professional, educational. Organised, scannable.

---

## 7. EMAIL DESIGN STYLE LIBRARY

> Email CSS constraints mean styles focus on colour, type, and spacing — not advanced CSS effects.

---

### EMAIL STYLE 01 — CORPORATE CLEAN

**Visual:** White background. One brand accent. Table-based grid. Minimal decoration.
**Best For:** B2B, SaaS, corporate, professional services, finance, healthcare.

```html
<!-- Colour palette -->
<!-- Background: #f4f6f9 | Surface: #ffffff | Accent: #2040c8 | Text: #1a1a2e | Muted: #6666aa -->

<!-- Header -->
<tr>
  <td bgcolor="#2040c8" style="background-color:#2040c8; padding:20px 32px;">
    <p style="margin:0; font-family:Arial,sans-serif; font-size:22px; font-weight:700; color:#ffffff; letter-spacing:-0.5px;">
      CompanyName
    </p>
  </td>
</tr>

<!-- Rule -->
<tr>
  <td bgcolor="#2040c8" height="4" style="background-color:#2040c8; font-size:1px; line-height:1px;">&nbsp;</td>
</tr>
```

**Typography:** Arial/Helvetica sans-serif. Body 15px/1.6. Headlines bold 28-36px.

---

### EMAIL STYLE 02 — E-COMMERCE / PRODUCT

**Visual:** White surface. Full-width product banners (emoji-based). Product card grid.
**Best For:** Online stores, retail, D2C brands, fashion, electronics.

```html
<!-- Product Card (in 2-column grid) -->
<td class="mobile-stack" width="50%" valign="top"
    style="width:50%; padding:12px 8px;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
         style="border:1px solid #e8e8f0; border-radius:8px; overflow:hidden;">
    <!-- Product image placeholder -->
    <tr>
      <td bgcolor="#f0f0f8" align="center"
          style="background-color:#f0f0f8; padding:24px 0; font-size:48px; line-height:1;">
        🧴
      </td>
    </tr>
    <tr>
      <td style="padding:14px 16px;">
        <p style="margin:0 0 4px; font-size:13px; color:#9090b0; font-family:Arial,sans-serif;">Category Name</p>
        <p style="margin:0 0 8px; font-size:15px; font-weight:700; color:#1a1a2e; font-family:Arial,sans-serif;">Product Name</p>
        <p style="margin:0 0 12px;">
          <span style="font-size:14px; color:#9090b0; text-decoration:line-through; font-family:Arial,sans-serif;">৳1,200</span>&nbsp;
          <span style="font-size:18px; font-weight:700; color:#e03040; font-family:Arial,sans-serif;">৳899</span>
        </p>
        <a href="{product_url}"
           style="display:block; background-color:#1a1a2e; color:#ffffff; text-align:center; padding:10px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:700; font-family:Arial,sans-serif;">
          Shop Now
        </a>
      </td>
    </tr>
  </table>
</td>
```

---

### EMAIL STYLE 03 — NEWSLETTER / EDITORIAL

**Visual:** Off-white background. Ruled lines. Column layout. Serif or editorial feel.
**Best For:** Newsletters, digests, company updates, media, publications.

```html
<!-- Section divider with label -->
<tr>
  <td style="padding:28px 32px 12px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td width="32" bgcolor="#4060ff"
            style="background-color:#4060ff; width:32px; height:3px; font-size:1px; line-height:1px;">
          &nbsp;
        </td>
        <td style="padding-left:12px;">
          <p style="margin:0; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#9090b0; font-family:Arial,sans-serif;">
            Section Label
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Article row with 60/40 split -->
<tr>
  <td style="padding:0 32px 28px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td class="mobile-stack" width="60%" valign="top" style="width:60%; padding-right:20px;">
          <p style="margin:0 0 8px; font-size:11px; font-weight:700; color:#9090b0; text-transform:uppercase; letter-spacing:1px; font-family:Arial,sans-serif;">Category · Read time</p>
          <h2 style="margin:0 0 10px; font-size:22px; font-weight:700; color:#1a1a2e; line-height:1.2; font-family:Georgia,serif;">Article Headline That Grabs Attention</h2>
          <p style="margin:0 0 14px; font-size:14px; color:#4a4a6a; line-height:1.6; font-family:Arial,sans-serif;">Two or three sentences of the article excerpt that give the reader enough to know if they want to read more...</p>
          <a href="#" style="font-size:13px; font-weight:700; color:#4060ff; text-decoration:none; font-family:Arial,sans-serif;">Read more →</a>
        </td>
        <td class="mobile-stack" width="40%" valign="top" style="width:40%;">
          <td bgcolor="#f0f0f8" align="center"
              style="background-color:#f0f0f8; border-radius:8px; padding:24px 0; font-size:40px; line-height:1;">
            📰
          </td>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

---

### EMAIL STYLE 04 — MINIMAL / TEXT-FIRST

**Visual:** Pure white. No borders or backgrounds on sections. Typography is the design.
**Best For:** Personal brands, coaches, founders writing to their list, plain-text preferred.

```html
<!-- Entire email is this simple -->
<tr>
  <td style="padding:40px 48px;">
    <p style="margin:0 0 24px; font-size:15px; color:#1a1a2e; line-height:1.7; font-family:Georgia,serif;">
      Hi {first_name},
    </p>
    <p style="margin:0 0 20px; font-size:15px; color:#1a1a2e; line-height:1.7; font-family:Georgia,serif;">
      Your main content here. Write like a human. No big banners, no product grids.
      Just words that matter.
    </p>
    <p style="margin:0 0 32px; font-size:15px; color:#1a1a2e; line-height:1.7; font-family:Georgia,serif;">
      Your call to action is a simple text link: <a href="#" style="color:#4060ff;">click here</a>.
    </p>
    <p style="margin:0; font-size:15px; color:#1a1a2e; line-height:1.7; font-family:Georgia,serif;">
      — Founder Name
    </p>
  </td>
</tr>
```

---

### EMAIL STYLE 05 — BOLD MARKETING

**Visual:** Dark or vivid background headers. Large typography. Maximum contrast. Sale energy.
**Best For:** Promotional emails, flash sales, product launches, seasonal campaigns.

```html
<!-- Hero banner — bold sale announcement -->
<tr>
  <td bgcolor="#e03040" align="center" style="background-color:#e03040; padding:48px 32px;">
    <p style="margin:0 0 8px; font-size:13px; font-weight:700; letter-spacing:4px; color:rgba(255,255,255,.7); text-transform:uppercase; font-family:Arial,sans-serif;">
      Limited Time Offer
    </p>
    <h1 style="margin:0 0 4px; font-size:64px; font-weight:900; color:#ffffff; line-height:.9; letter-spacing:-3px; font-family:Arial,sans-serif;">
      50%
    </h1>
    <p style="margin:0 0 20px; font-size:28px; font-weight:700; color:#ffffff; font-family:Arial,sans-serif;">
      OFF EVERYTHING
    </p>
    <p style="margin:0 0 28px; font-size:15px; color:rgba(255,255,255,.8); font-family:Arial,sans-serif;">
      Use code: <strong style="background:rgba(255,255,255,.2); padding:2px 8px; border-radius:4px;">SAVE50</strong>
    </p>
    <!-- Bulletproof button -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
      <tr>
        <td bgcolor="#ffffff" align="center"
            style="background-color:#ffffff; border-radius:6px; padding:0;">
          <a href="{shop_url}"
             style="display:inline-block; background-color:#ffffff; color:#e03040; padding:16px 36px; border-radius:6px; text-decoration:none; font-size:16px; font-weight:900; font-family:Arial,sans-serif; letter-spacing:0.5px;">
            SHOP NOW →
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

---

### EMAIL STYLE 06 — DARK MODE FIRST

**Visual:** Dark background designed intentionally. Works correctly in both dark and light mode.
**Best For:** Tech brands, gaming, creative agencies, developer tools.

```css
/* Dark mode email — designed dark by default, swaps to light */
/* In <style> block in <head> */
@media (prefers-color-scheme: dark) {
  .bg-page   { background-color: #0a0a14 !important; }
  .bg-surface{ background-color: #141428 !important; }
  .bg-header { background-color: #0d0d20 !important; }
  .text-main { color: #e8e8ff !important; }
  .text-muted{ color: #8888aa !important; }
  .border-el { border-color: #2a2a4a !important; }
  .btn-main  { background-color: #4060ff !important; }
  /* Force images visible in dark mode */
  img { mix-blend-mode: normal !important; }
}
```

```html
<!-- Dark surface section -->
<tr>
  <td class="bg-surface" bgcolor="#1a1a2e"
      style="background-color:#1a1a2e; padding:32px; border-radius:8px;">
    <h2 class="text-main"
        style="margin:0 0 12px; font-size:24px; font-weight:700; color:#e8e8ff; font-family:Arial,sans-serif;">
      Section Heading
    </h2>
    <p class="text-muted"
       style="margin:0; font-size:15px; color:#8888aa; line-height:1.6; font-family:Arial,sans-serif;">
      Content here.
    </p>
  </td>
</tr>
```

---

### EMAIL STYLE 07 — ELEGANT / LUXURY

**Visual:** Generous whitespace. Gold or muted accent. Cormorant/Garamond-style serif.
**Best For:** Luxury brands, jewellery, fine dining, premium hotels, investment, law.

```html
<!-- Elegant header with gold rule -->
<tr>
  <td bgcolor="#faf8f4" align="center" style="background-color:#faf8f4; padding:36px 48px 28px;">
    <p style="margin:0 0 20px; font-size:20px; letter-spacing:8px; text-transform:uppercase; color:#3a2810; font-family:Georgia,serif;">
      MAISON NAME
    </p>
    <!-- Gold rule -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
      <tr>
        <td width="40" height="1" bgcolor="#c8a040"
            style="background-color:#c8a040; font-size:1px; line-height:1px; width:40px; height:1px;">&nbsp;</td>
        <td width="8" style="width:8px;">&nbsp;</td>
        <td style="font-size:8px; color:#c8a040;">◆</td>
        <td width="8" style="width:8px;">&nbsp;</td>
        <td width="40" height="1" bgcolor="#c8a040"
            style="background-color:#c8a040; font-size:1px; line-height:1px; width:40px; height:1px;">&nbsp;</td>
      </tr>
    </table>
  </td>
</tr>
```

---

### EMAIL STYLE 08 — PLAYFUL / COLOURFUL

**Visual:** Bright pastel sections. Emoji-heavy. Rounded shapes. Fun typography.
**Best For:** EdTech, kids, food delivery, lifestyle, fitness apps, beauty.

```html
<!-- Colourful card section -->
<tr>
  <td bgcolor="#fff5f8" style="background-color:#fff5f8; border-radius:16px; padding:24px; margin:0 24px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td class="mobile-stack" width="60%" valign="middle">
          <p style="margin:0 0 4px; font-size:20px; font-weight:900; color:#1a0830; font-family:Arial,sans-serif; letter-spacing:-0.5px;">
            🎉 Feature Heading
          </p>
          <p style="margin:0; font-size:14px; color:#6040a0; line-height:1.5; font-family:Arial,sans-serif;">
            Description text here. Keep it short and friendly.
          </p>
        </td>
        <td class="mobile-stack" width="40%" align="center" valign="middle"
            style="font-size:48px; line-height:1; padding-left:16px;">
          🌟
        </td>
      </tr>
    </table>
  </td>
</tr>
```

---

### EMAIL STYLE 09 — TRANSACTIONAL CLEAN

**Visual:** Pure white, structured, data-table focused. Trust above aesthetics.
**Best For:** Receipts, shipping, password reset, account alerts, invoices.

```html
<!-- Info block (address, delivery, etc.) -->
<tr>
  <td style="padding:0 32px 28px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td class="mobile-stack" width="50%" valign="top"
            style="width:50%; padding-right:16px; border-right:1px solid #e8e8f0;">
          <p style="margin:0 0 6px; font-size:11px; font-weight:700; color:#9090b0; text-transform:uppercase; letter-spacing:1.5px; font-family:Arial,sans-serif;">Shipping To</p>
          <p style="margin:0; font-size:14px; color:#1a1a2e; line-height:1.6; font-family:Arial,sans-serif;">
            Customer Name<br>
            123 Street Address<br>
            Dhaka, Bangladesh
          </p>
        </td>
        <td class="mobile-stack" width="50%" valign="top"
            style="width:50%; padding-left:16px;">
          <p style="margin:0 0 6px; font-size:11px; font-weight:700; color:#9090b0; text-transform:uppercase; letter-spacing:1.5px; font-family:Arial,sans-serif;">Estimated Delivery</p>
          <p style="margin:0; font-size:14px; font-weight:700; color:#1a1a2e; font-family:Arial,sans-serif;">
            Wednesday, 22 May 2025
          </p>
          <p style="margin:4px 0 0; font-size:13px; color:#4060ff; font-family:Arial,sans-serif;">
            Standard shipping
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

---

### EMAIL STYLE 10 — SEASONAL / CAMPAIGN

**Visual:** Themed decoration (emoji-based). Special occasion colour palette. One-time design.
**Best For:** Holiday sales, Eid, Christmas, Black Friday, Valentine's, birthday campaigns.

```html
<!-- Seasonal hero with emoji decoration -->
<tr>
  <td bgcolor="#0d2818" align="center"
      style="background-color:#0d2818; padding:40px 32px;">
    <!-- Decorative emoji row -->
    <p style="margin:0 0 16px; font-size:28px; line-height:1; letter-spacing:8px;">
      🌙✨⭐🌟✨🌙
    </p>
    <h1 style="margin:0 0 12px; font-size:36px; font-weight:900; color:#ffd700; font-family:Arial,sans-serif; letter-spacing:-1px;">
      Eid Mubarak! 🎉
    </h1>
    <p style="margin:0 0 24px; font-size:16px; color:rgba(255,220,130,.75); font-family:Arial,sans-serif; line-height:1.6;">
      Celebrate with up to 40% off sitewide.<br>Offer ends tomorrow night.
    </p>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
      <tr>
        <td bgcolor="#ffd700" align="center" style="background-color:#ffd700; border-radius:8px;">
          <a href="#" style="display:inline-block; padding:15px 36px; font-size:16px; font-weight:900; color:#0d2818; text-decoration:none; font-family:Arial,sans-serif;">
            Shop the Eid Sale
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

---

## 8. COMPONENT LIBRARY

### HEADER VARIANTS

**Variant A — Centred logo + nav (standard)**
```html
<tr>
  <td bgcolor="#ffffff" align="center"
      style="background-color:#ffffff; padding:20px 32px; border-bottom:1px solid #e8e8f0;">
    <!-- Logo text or image -->
    <p style="margin:0; font-size:22px; font-weight:900; color:#1a1a2e; font-family:Arial,sans-serif; letter-spacing:-1px;">
      BrandName
    </p>
    <!-- Optional nav links -->
    <p style="margin:8px 0 0; font-size:12px; font-family:Arial,sans-serif;">
      <a href="#" style="color:#6666aa; text-decoration:none; margin:0 10px;">Shop</a>
      <a href="#" style="color:#6666aa; text-decoration:none; margin:0 10px;">About</a>
      <a href="#" style="color:#6666aa; text-decoration:none; margin:0 10px;">Contact</a>
    </p>
  </td>
</tr>
```

**Variant B — Left logo + right link (transactional)**
```html
<tr>
  <td bgcolor="#ffffff" style="background-color:#ffffff; padding:16px 32px; border-bottom:1px solid #f0f0f8;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td valign="middle">
          <p style="margin:0; font-size:18px; font-weight:900; color:#1a1a2e; font-family:Arial,sans-serif;">BrandName</p>
        </td>
        <td valign="middle" align="right">
          <a href="#" style="font-size:12px; color:#6666aa; text-decoration:none; font-family:Arial,sans-serif;">Need help?</a>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

**Variant C — Coloured background header**
```html
<tr>
  <td bgcolor="#4060ff" align="center"
      style="background-color:#4060ff; padding:24px 32px;">
    <p style="margin:0; font-size:22px; font-weight:900; color:#ffffff; font-family:Arial,sans-serif; letter-spacing:-0.5px;">
      BrandName
    </p>
  </td>
</tr>
```

---

### HERO VARIANTS

**Variant A — Text-only centred hero**
```html
<tr>
  <td bgcolor="#f0f4ff" align="center"
      style="background-color:#f0f4ff; padding:48px 40px;">
    <p style="margin:0 0 8px; font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:#6080cc; font-family:Arial,sans-serif;">
      Category Label
    </p>
    <h1 style="margin:0 0 16px; font-size:36px; font-weight:900; color:#0a1040; line-height:1.1; letter-spacing:-1.5px; font-family:Arial,sans-serif;">
      Main Headline Here
    </h1>
    <p style="margin:0 0 28px; font-size:16px; color:#4050a0; line-height:1.6; font-family:Arial,sans-serif; max-width:420px;">
      Subheading text that supports the main headline. Keep it to two lines maximum.
    </p>
    <!-- CTA Button here -->
  </td>
</tr>
```

**Variant B — Emoji visual + text hero**
```html
<tr>
  <td bgcolor="#fff8f0" align="center"
      style="background-color:#fff8f0; padding:40px 32px;">
    <p style="margin:0 0 12px; font-size:72px; line-height:1;">☕</p>
    <h1 style="margin:0 0 12px; font-size:32px; font-weight:900; color:#3a1800; line-height:1.1; font-family:Arial,sans-serif;">
      Great headline here
    </h1>
    <p style="margin:0 0 24px; font-size:15px; color:#7a4020; line-height:1.6; font-family:Arial,sans-serif;">
      Supporting subheadline text that adds context.
    </p>
  </td>
</tr>
```

---

### CTA BUTTON PATTERNS

**Standard bulletproof button (works in Outlook)**
```html
<table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td align="center" bgcolor="#4060ff"
        style="background-color:#4060ff; border-radius:8px; padding:0;">
      <!--[if mso]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false"
              style="border-radius:8px; width:200px; height:50px; v-text-anchor:middle;">
        <v:fill type="solid" color="#4060ff"/>
        <v:textbox style="mso-fit-shape-to-text:false" inset="0,0,0,0">
      <![endif]-->
      <a href="{url}"
         style="display:inline-block; background-color:#4060ff; color:#ffffff; padding:15px 32px; border-radius:8px; text-decoration:none; font-size:16px; font-weight:700; font-family:Arial,sans-serif; letter-spacing:0.3px; mso-padding-alt:15px 32px;">
        Button Text Here
      </a>
      <!--[if mso]>
        </v:textbox>
      </v:rect>
      <![endif]-->
    </td>
  </tr>
</table>
```

**Full-width button (for mobile / prominent CTA)**
```html
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td bgcolor="#4060ff" align="center"
        style="background-color:#4060ff; border-radius:8px;">
      <a href="{url}" class="mobile-btn"
         style="display:block; color:#ffffff; padding:16px; text-decoration:none; font-size:16px; font-weight:700; font-family:Arial,sans-serif; text-align:center;">
        Full Width CTA
      </a>
    </td>
  </tr>
</table>
```

**Ghost / outline button**
```html
<table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td align="center"
        style="border:2px solid #4060ff; border-radius:8px; padding:0;">
      <a href="{url}"
         style="display:inline-block; color:#4060ff; padding:13px 30px; border-radius:6px; text-decoration:none; font-size:15px; font-weight:700; font-family:Arial,sans-serif;">
        Secondary Action
      </a>
    </td>
  </tr>
</table>
```

---

### FOOTER (Always Include)

```html
<!-- Full compliance footer -->
<tr>
  <td bgcolor="#f4f4f8" style="background-color:#f4f4f8; padding:32px; border-top:1px solid #e0e0f0;">

    <!-- Social links -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin-bottom:20px;">
      <tr>
        <td style="padding:0 6px;">
          <a href="{instagram_url}" style="font-size:20px; text-decoration:none;">📸</a>
        </td>
        <td style="padding:0 6px;">
          <a href="{facebook_url}" style="font-size:20px; text-decoration:none;">👤</a>
        </td>
        <td style="padding:0 6px;">
          <a href="{twitter_url}" style="font-size:20px; text-decoration:none;">🐦</a>
        </td>
      </tr>
    </table>

    <!-- Company info -->
    <p style="margin:0 0 8px; text-align:center; font-size:13px; font-weight:700; color:#4a4a6a; font-family:Arial,sans-serif;">
      Company Name
    </p>
    <p style="margin:0 0 16px; text-align:center; font-size:12px; color:#9090b0; line-height:1.6; font-family:Arial,sans-serif;">
      123 Company Address, City, Country
    </p>

    <!-- Why they received this -->
    <p style="margin:0 0 12px; text-align:center; font-size:12px; color:#9090b0; font-family:Arial,sans-serif;">
      You received this email because you {signed up for / purchased from / subscribed to} {Company Name}.
    </p>

    <!-- Legal links -->
    <p style="margin:0; text-align:center; font-size:12px; font-family:Arial,sans-serif;">
      <a href="{privacy_url}" style="color:#9090b0; text-decoration:underline;">Privacy Policy</a>
      &nbsp;·&nbsp;
      <a href="{terms_url}" style="color:#9090b0; text-decoration:underline;">Terms of Service</a>
      &nbsp;·&nbsp;
      <a href="{unsubscribe_url}" style="color:#9090b0; text-decoration:underline;">Unsubscribe</a>
    </p>

    <!-- Copyright -->
    <p style="margin:16px 0 0; text-align:center; font-size:11px; color:#b0b0c8; font-family:Arial,sans-serif;">
      © 2025 Company Name. All rights reserved.
    </p>
  </td>
</tr>
```

---

### DIVIDERS & SPACING

```html
<!-- Spacer row -->
<tr><td height="24" style="height:24px; font-size:1px; line-height:1px;">&nbsp;</td></tr>

<!-- Horizontal rule -->
<tr>
  <td style="padding:0 32px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td height="1" bgcolor="#e8e8f0"
            style="background-color:#e8e8f0; height:1px; font-size:1px; line-height:1px;">&nbsp;</td>
      </tr>
    </table>
  </td>
</tr>

<!-- Accent divider -->
<tr>
  <td align="center" style="padding:4px 0;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="40" height="3" bgcolor="#4060ff"
            style="background-color:#4060ff; width:40px; height:3px; border-radius:2px; font-size:1px; line-height:1px;">&nbsp;</td>
      </tr>
    </table>
  </td>
</tr>
```

---

### ICON + TEXT ROW

```html
<!-- Feature/benefit row with emoji icon -->
<tr>
  <td style="padding:0 32px 20px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td width="44" valign="top"
            style="width:44px; padding-right:14px; padding-top:2px; font-size:28px; line-height:1;">
          🚀
        </td>
        <td valign="top">
          <p style="margin:0 0 4px; font-size:15px; font-weight:700; color:#1a1a2e; font-family:Arial,sans-serif;">
            Feature Heading
          </p>
          <p style="margin:0; font-size:14px; color:#6666aa; line-height:1.5; font-family:Arial,sans-serif;">
            Brief description of this feature or benefit. One or two sentences.
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

---

### PROGRESS / STATUS INDICATOR

```html
<!-- Order status tracker -->
<tr>
  <td style="padding:0 32px 28px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <!-- Step 1 — Complete -->
        <td align="center" valign="top" width="25%" style="width:25%;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
            <tr>
              <td bgcolor="#4060ff" align="center"
                  style="background-color:#4060ff; width:32px; height:32px; border-radius:16px; font-size:14px; color:#fff; font-family:Arial,sans-serif; line-height:32px; text-align:center;">
                ✓
              </td>
            </tr>
          </table>
          <p style="margin:6px 0 0; font-size:11px; color:#4060ff; font-weight:700; text-align:center; font-family:Arial,sans-serif;">Order Placed</p>
        </td>
        <!-- Connector line -->
        <td valign="middle" style="padding-bottom:20px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td height="2" bgcolor="#4060ff" style="background-color:#4060ff; height:2px; font-size:1px; line-height:1px;">&nbsp;</td>
            </tr>
          </table>
        </td>
        <!-- Step 2 — Active -->
        <td align="center" valign="top" width="25%" style="width:25%;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
            <tr>
              <td bgcolor="#4060ff" align="center"
                  style="background-color:#4060ff; width:32px; height:32px; border-radius:16px; font-size:12px; color:#fff; font-family:Arial,sans-serif; line-height:32px; text-align:center; border:2px solid #4060ff;">
                📦
              </td>
            </tr>
          </table>
          <p style="margin:6px 0 0; font-size:11px; color:#4060ff; font-weight:700; text-align:center; font-family:Arial,sans-serif;">Shipped</p>
        </td>
        <!-- Connector line (inactive) -->
        <td valign="middle" style="padding-bottom:20px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td height="2" bgcolor="#e8e8f0" style="background-color:#e8e8f0; height:2px; font-size:1px; line-height:1px;">&nbsp;</td>
            </tr>
          </table>
        </td>
        <!-- Step 3 — Pending -->
        <td align="center" valign="top" width="25%" style="width:25%;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
            <tr>
              <td bgcolor="#e8e8f0" align="center"
                  style="background-color:#e8e8f0; width:32px; height:32px; border-radius:16px; font-size:12px; color:#9090b0; font-family:Arial,sans-serif; line-height:32px; text-align:center;">
                🏠
              </td>
            </tr>
          </table>
          <p style="margin:6px 0 0; font-size:11px; color:#9090b0; text-align:center; font-family:Arial,sans-serif;">Delivered</p>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

---

## 9. TYPOGRAPHY SYSTEM FOR EMAIL

### Email-Safe Font Stacks

```css
/* SANS-SERIF — most versatile */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;

/* SERIF — editorial and luxury */
font-family: Georgia, 'Times New Roman', Times, serif;

/* MONOSPACE — for code, tracking numbers, data */
font-family: 'Courier New', Courier, monospace;

/* GOOGLE FONTS (in <style> block only — not inline, ignored by some clients) */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
/* Always set fallback inline: font-family:'Poppins',Arial,sans-serif */
```

### Email Type Scale

```
PREHEADER:    11-12px · line-height:1.0 · hidden from display
EYEBROW:      11px · 700 weight · 2-3px letter-spacing · uppercase
HEADLINE H1:  28-40px · 800-900 weight · -0.5 to -2px tracking
HEADLINE H2:  20-26px · 700 weight · -0.5px tracking
BODY TEXT:    14-16px · 400 weight · 1.6-1.7 line-height
CAPTION:      12-13px · 400 weight · 1.4-1.5 line-height
LABEL:        11px · 700 weight · 1-2px letter-spacing · uppercase
LINK TEXT:    same size as context · underline or colour only
PRICE:        18-24px · 800 weight · same as heading
```

### Type Rules for Email
- **Always px** — never em, rem, % for font-size in email
- **Min 14px** for body text — many clients override smaller sizes
- **Max 40px** for headlines — scales poorly in email viewports
- **Line-height as decimal** — `1.6` not `160%` or `24px` for better cross-client support
- **Letter-spacing in px** only for email (em not supported inline in Outlook)

---

## 10. COLOR SYSTEM FOR EMAIL

### Setting Background Colours Correctly

```html
<!-- ALWAYS use BOTH bgcolor attribute AND inline style -->
<!-- bgcolor is for Outlook · style is for everyone else -->
<td bgcolor="#4060ff" style="background-color:#4060ff;">
  Content
</td>
```

### Email-Safe Colour Approach

```
TEXT:        Always set explicitly — never rely on client defaults
             Dark on light: #1a1a2e or #141416 (never #000000 — too harsh)
             Light on dark: #ffffff or #f0f0ff

LINKS:       Always set color inline on <a> tags
             Never assume blue — clients override link colour

BUTTONS:     Set bgcolor on the <td> container AND background-color on the <a>

BACKGROUNDS: Set on both <body> AND the outer <table>
             Page bg: neutral (e.g. #f4f4f8)
             Content surface: #ffffff
             Accent sections: brand colour

DIVIDERS:    Use <td> with height and bgcolor — not CSS borders on containers
```

### Colour Palette Templates

**Corporate Blue:**
```
page-bg:   #f0f2f8    surface:  #ffffff    accent:    #2040c8
text:      #1a1a2e    muted:    #6666aa    border:    #e0e0f0
success:   #20a040    warning:  #e08010    error:     #e03040
```

**Brand Orange (e-commerce):**
```
page-bg:   #fff8f4    surface:  #ffffff    accent:    #e85010
text:      #1a1204    muted:    #7a5030    border:    #ffe0d0
```

**Elegant Dark (luxury):**
```
page-bg:   #f4f2ee    surface:  #faf8f4    accent:    #c8a040
text:      #1a1408    muted:    #6a5a38    border:    #e0d8c0
```

---

## 11. RESPONSIVE EMAIL (MOBILE-FIRST)

### The Mobile Media Query Block

```css
@media screen and (max-width: 600px) {
  /* Make content tables full-width */
  .email-wrapper { width: 100% !important; }

  /* Stack columns */
  .col-left, .col-right {
    display: block !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  /* Increase padding on mobile */
  .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }

  /* Scale up text */
  .mobile-h1 { font-size: 28px !important; line-height: 1.2 !important; }
  .mobile-body { font-size: 16px !important; }

  /* Full-width buttons */
  .btn-table { width: 100% !important; }
  .btn-link  { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }

  /* Hide on mobile */
  .hide-mobile { display: none !important; max-height: 0 !important; overflow: hidden !important; }

  /* Show on mobile only */
  .show-mobile { display: block !important; max-height: none !important; }

  /* Image sizing */
  img.mobile-full { width: 100% !important; height: auto !important; }

  /* Adjust padding on cells */
  td.mobile-p { padding: 16px 20px !important; }
}
```

### Column-to-Stack Pattern

```html
<!--
  Desktop: [LEFT COL]  [RIGHT COL]
  Mobile:  [LEFT COL (full width)]
           [RIGHT COL (full width)]
-->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td class="col-left" width="50%" valign="top"
        style="width:50%; padding:20px 10px 20px 24px;">
      <!-- Left content -->
    </td>
    <!--[if mso]><td width="0" style="width:0; font-size:0; line-height:0;">&nbsp;</td><![endif]-->
    <td class="col-right" width="50%" valign="top"
        style="width:50%; padding:20px 24px 20px 10px;">
      <!-- Right content -->
    </td>
  </tr>
</table>
```

---

## 12. DARK MODE EMAIL SUPPORT

### Strategy: Design light, enhance for dark

```html
<head>
  <style>
    /* These classes flip colours in dark mode */
    @media (prefers-color-scheme: dark) {
      /* Page background */
      .dm-bg-page   { background-color: #0d0d1a !important; }
      /* Content surface */
      .dm-bg-surface{ background-color: #141428 !important; }
      /* Header area */
      .dm-bg-header { background-color: #0a0a1e !important; }
      /* Text */
      .dm-text      { color: #e8e8ff !important; }
      .dm-text-muted{ color: #8888cc !important; }
      /* Borders */
      .dm-border    { border-color: #2a2a4a !important; }
      /* Hide light-mode logo, show dark-mode logo */
      .logo-light   { display: none !important; max-height: 0 !important; }
      .logo-dark    { display: block !important; max-height: none !important; }
      /* Invert for emojis/icons that have white backgrounds */
      .dm-invert    { filter: invert(1) !important; }
    }
  </style>
</head>

<!-- Usage: add class AND inline style (inline wins in Outlook, class wins in Apple Mail) -->
<td class="dm-bg-surface" bgcolor="#ffffff"
    style="background-color:#ffffff;">
  <p class="dm-text" style="color:#1a1a2e;">Content here</p>
</td>
```

---

## 13. OUTLOOK-SPECIFIC FIXES

### Conditional Comments Reference

```html
<!-- Show ONLY in Outlook -->
<!--[if mso]> ... <![endif]-->

<!-- Show in everything EXCEPT Outlook -->
<!--[if !mso]><!-->  ... <!--<![endif]-->

<!-- Target specific Outlook versions -->
<!--[if mso 16]>Outlook 2007<![endif]-->
<!--[if mso 17]>Outlook 2010<![endif]-->
<!--[if mso 14]>Outlook 2003<![endif]-->
<!--[if gte mso 9]>Outlook 2000+<![endif]-->
```

### Common Outlook Fixes

**Fix 1 — Prevent Outlook from adding gaps below images**
```html
<img src="{url}" alt="" width="600"
     style="display:block; border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic;">
```

**Fix 2 — Precise line heights in Outlook**
```html
<p style="margin:0; line-height:24px; mso-line-height-rule:exactly; font-size:16px;">
  Text here
</p>
```

**Fix 3 — Prevent Outlook 120dpi scaling**
```html
<!--[if mso]>
<noscript><xml>
  <o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    <o:AllowPNG/>
  </o:OfficeDocumentSettings>
</xml></noscript>
<![endif]-->
```

**Fix 4 — Table cell vertical alignment**
```html
<!-- Always explicitly set valign on <td> — Outlook defaults to middle -->
<td valign="top" style="vertical-align:top;">...</td>
```

**Fix 5 — Remove Outlook table spacing**
```html
<table role="presentation" border="0" cellpadding="0" cellspacing="0"
       style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
```

**Fix 6 — VML background image (Outlook only)**
```html
<!--[if gte mso 9]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false"
        style="width:600px; height:300px;">
  <v:fill type="frame" src="{image_url}" color="#4060ff"/>
  <v:textbox inset="0,0,0,0">
<![endif]-->
<td bgcolor="#4060ff" style="background-color:#4060ff; padding:40px;">
  Content overlaid on background
</td>
<!--[if gte mso 9]>
  </v:textbox>
</v:rect>
<![endif]-->
```

---

## 14. ACCESSIBILITY STANDARDS

### Required Accessibility Elements

```html
<!-- 1. Language attribute -->
<html lang="en">

<!-- 2. Role on layout tables (suppress from screen reader navigation) -->
<table role="presentation">

<!-- 3. Alt text on ALL images -->
<img src="{url}" alt="Descriptive text about the image" width="600">
<!-- For decorative images: alt="" -->
<img src="decoration.png" alt="" width="24" role="presentation">

<!-- 4. Sufficient colour contrast -->
<!-- Body text: min 4.5:1 contrast ratio -->
<!-- Large text (18px+): min 3:1 contrast ratio -->
<!-- Test at: https://webaim.org/resources/contrastchecker/ -->

<!-- 5. Link text must be descriptive (not "click here") -->
<a href="{url}" style="...">Shop the Summer Sale</a>
<!-- Not: <a href="{url}">Click here</a> -->

<!-- 6. Buttons — use <a> not <button>, but make them obvious -->
<!-- Good aria-label where link text is ambiguous -->
<a href="{url}" aria-label="Read full article: {article_title}" style="...">Read more →</a>

<!-- 7. Tables: if data table (not layout), use headers -->
<table>
  <thead>
    <tr>
      <th scope="col" style="...">Item</th>
      <th scope="col" style="...">Price</th>
    </tr>
  </thead>
</table>
```

---

## 15. LEGAL COMPLIANCE

### CAN-SPAM Requirements (USA)
```
✅ Sender name and email must not be deceptive
✅ Subject line must not be deceptive
✅ Physical postal address of sender (street, PO Box, or private mailbox)
✅ Clear and conspicuous opt-out mechanism
✅ Opt-out requests must be honoured within 10 business days
✅ Tell recipients why they're receiving the email
```

### GDPR Requirements (EU/UK)
```
✅ Only email people who gave explicit consent
✅ Record and timestamp when consent was given
✅ Make it easy to withdraw consent (unsubscribe)
✅ Include link to privacy policy
✅ Don't use pre-ticked consent boxes
✅ Right to access, rectify, and erase personal data
```

### Footer Compliance Template
```html
<p style="margin:0 0 8px; font-size:12px; color:#9090b0; text-align:center; font-family:Arial,sans-serif;">
  You received this email because you subscribed to {Brand Name} updates
  at {website} or made a purchase from us.
</p>
<p style="margin:0 0 8px; font-size:12px; color:#9090b0; text-align:center; font-family:Arial,sans-serif;">
  {Company Legal Name} · {Full Street Address} · {City, Country, Postcode}
</p>
<p style="margin:0; text-align:center; font-size:12px; font-family:Arial,sans-serif;">
  <a href="{privacy_url}" style="color:#9090b0;">Privacy Policy</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="{unsubscribe_url}" style="color:#9090b0;">Unsubscribe</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="{manage_preferences_url}" style="color:#9090b0;">Manage Preferences</a>
</p>
```

---

## 16. QUALITY STANDARDS & TESTING CHECKLIST

### Pre-Send Checklist

**Content:**
```
□ Subject line written (not left as placeholder)
□ Preheader text written (85-140 chars, complements subject)
□ All {placeholders} replaced with real content
□ All links tested and working
□ Unsubscribe link present and functional
□ Physical address in footer
□ Why-received explanation in footer
□ CTA button text is action-oriented (not "Click Here")
□ All alt text written for images
□ No Lorem Ipsum or placeholder text
```

**Technical:**
```
□ DOCTYPE and charset declared
□ xmlns attributes on <html> for Outlook
□ <o:OfficeDocumentSettings> in <head>
□ All tables have role="presentation" border="0" cellpadding="0" cellspacing="0"
□ Images have display:block to prevent gaps
□ All <td> have explicit valign attribute
□ Colors set with both bgcolor attribute AND inline style
□ @media queries in <head> <style> block
□ Responsive classes applied (.mobile-stack, .mobile-padding etc)
□ Font-size minimum 14px for body
□ Line-height set explicitly (1.6, not %)
```

**Design:**
```
□ Renders at 600px (desktop)
□ Renders at 375px (mobile)
□ Single-column fallback is readable
□ CTA button is visible and tappable (min 44px height on mobile)
□ Text is readable without images (alt text conveys meaning)
□ Sufficient contrast ratio (4.5:1 for body, 3:1 for large text)
□ No content cut off at 600px width
□ Total file size under 100KB (ideally under 60KB)
□ Emoji display correctly across major clients
```

**Testing Tools:**
```
Litmus           → https://litmus.com (full client testing)
Email on Acid    → https://emailonacid.com (alternative to Litmus)
Mail Tester      → https://mail-tester.com (spam score)
PutsMail         → https://putsmail.com (quick send to your inbox)
Mailtrap         → https://mailtrap.io (catch emails in dev)
Can I Email?     → https://caniemail.com (CSS property support lookup)
```

---

## 17. BUILD PIPELINE (NODE.JS)

### Project Structure
```
emailcraft-builder/
├── .env                        # ANTHROPIC_API_KEY
├── package.json
├── scripts/
│   ├── build.js                # Build single template
│   ├── batch.js                # Build all briefs
│   ├── preview.js              # Open in browser + send test
│   └── inline.js               # CSS inliner post-processing
├── prompts/
│   ├── system.md               # Master system prompt (Section 4)
│   ├── categories/
│   │   ├── order-confirmation.md
│   │   ├── newsletter.md
│   │   ├── promotional.md
│   │   └── [all 15 categories]
│   └── styles/
│       ├── corporate.md
│       ├── ecommerce.md
│       └── [all 10 styles]
├── briefs/
│   └── example-brief.json
└── outputs/
    └── .gitkeep
```

### Main Build Script (`scripts/build.js`)

```javascript
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";

const client = new Anthropic();

async function buildEmail(briefPath) {
  console.log(`\n📧 Building email: ${briefPath}`);

  const brief   = JSON.parse(await fs.readFile(briefPath, "utf8"));
  const system  = await fs.readFile("prompts/system.md", "utf8");
  const catFile = `prompts/categories/${brief.template_type}.md`;
  const styFile = `prompts/styles/${brief.design?.style || "corporate"}.md`;

  const catPrompt = await fs.readFile(catFile, "utf8").catch(() => "");
  const styPrompt = await fs.readFile(styFile, "utf8").catch(() => "");

  const fullSystem = [system, catPrompt, styPrompt].filter(Boolean).join("\n\n---\n\n");

  const userMessage = `Build a complete HTML email template.

BRIEF:
${JSON.stringify(brief, null, 2)}

Return ONLY the complete HTML. Start with <!DOCTYPE html>. No explanation.`;

  console.log("⚡ Calling Claude API...");
  const t0 = Date.now();

  const res = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 8192,
    system: fullSystem,
    messages: [{ role: "user", content: userMessage }]
  });

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`✅ Generated in ${elapsed}s · ${res.usage.output_tokens} tokens`);

  let html = res.content[0].text.trim();
  if (html.startsWith("```")) html = html.replace(/^```html?\n?/, "").replace(/\n?```$/, "");

  await fs.mkdir("outputs", { recursive: true });
  const out = path.join("outputs", `${brief.slug}.html`);
  await fs.writeFile(out, html, "utf8");

  const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);
  console.log(`📄 Saved: ${out} (${kb}KB)`);

  // Auto-open for preview
  try { execSync(`open "${out}" 2>/dev/null || xdg-open "${out}" 2>/dev/null`); } catch {}

  return out;
}

const briefPath = process.argv[2];
if (!briefPath) { console.error("Usage: node scripts/build.js <brief.json>"); process.exit(1); }
buildEmail(briefPath).catch(err => { console.error(err); process.exit(1); });
```

### CSS Inliner (`scripts/inline.js`)

> After generating HTML, run through a CSS inliner to convert `<style>` rules to inline styles for maximum Gmail compatibility.

```javascript
import { execSync } from "child_process";
import path from "path";

// Requires: npm install juice
const file = process.argv[2];
if (!file) { console.error("Usage: node scripts/inline.js <file.html>"); process.exit(1); }

execSync(`npx juice --preserve-media-queries "${file}" "${file}"`, { stdio: "inherit" });
console.log(`✅ Inlined: ${file}`);
```

```json
{
  "name": "emailcraft-builder",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build":   "node scripts/build.js",
    "inline":  "node scripts/inline.js",
    "batch":   "node scripts/batch.js",
    "preview": "node scripts/preview.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.24.0",
    "juice": "^10.0.0",
    "dotenv": "^16.4.0"
  }
}
```

---

## 18. BRIEF / INPUT SCHEMA

### Full Brief Schema (JSON)

```json
{
  "slug": "order-confirmation-v2",
  "template_type": "order_confirmation | shipping_notification | welcome | password_reset | promotional | newsletter | abandoned_cart | re_engagement | event_invitation | account_alert | invoice | product_launch | survey | birthday | webinar_confirmation",

  "brand": {
    "name": "BrandName",
    "tagline": "Brand tagline",
    "primary_color": "#4060ff",
    "secondary_color": "#f0f4ff",
    "text_color": "#1a1a2e",
    "logo_url": "https://...",
    "website": "https://brand.com",
    "support_email": "help@brand.com",
    "support_phone": "+880 1700-000000"
  },

  "design": {
    "style": "corporate | ecommerce | newsletter | minimal | bold_marketing | dark | elegant | playful | transactional | seasonal",
    "tone": "professional | friendly | urgent | celebratory | calm | urgent | empathetic",
    "font_preference": "sans | serif | mixed",
    "dark_mode_support": true,
    "layout": "single_column | two_column | hybrid"
  },

  "content": {
    "subject_line": "Email subject line here (50 chars max)",
    "preheader_text": "Preview text for inbox — 85-140 chars that complements subject",
    "headline": "Main email headline",
    "subheadline": "Supporting subheadline if needed",
    "body_text": "Main body content. Can be multiple paragraphs. Use \\n for line breaks.",
    "cta_primary": { "text": "Shop Now", "url": "{shop_url}" },
    "cta_secondary": { "text": "Learn More", "url": "{learn_url}" }
  },

  "personalization": {
    "variables": ["{first_name}", "{order_number}", "{tracking_number}", "{discount_code}"],
    "salutation": "Hi {first_name},"
  },

  "order_data": {
    "order_number": "{order_number}",
    "items": [
      { "name": "Product Name", "quantity": 2, "price": "৳1,500", "variant": "Size M" }
    ],
    "subtotal": "৳3,000",
    "shipping": "৳80",
    "discount": "-৳300",
    "total": "৳2,780",
    "currency": "BDT"
  },

  "shipping": {
    "address": "{shipping_address}",
    "carrier": "Pathao",
    "tracking_url": "{tracking_url}",
    "tracking_number": "{tracking_number}",
    "estimated_delivery": "{delivery_date}"
  },

  "products": [
    {
      "name": "Product Name",
      "price": "৳1,200",
      "original_price": "৳1,800",
      "category": "Category",
      "emoji": "👗",
      "url": "{product_url}",
      "tag": "Best Seller | New | Sale"
    }
  ],

  "event": {
    "name": "Event Name",
    "date": "Saturday, 1 June 2025",
    "time": "10:00 AM BST",
    "timezone": "BST (UTC+1)",
    "location": "Online via Zoom | Dhaka Convention Centre",
    "join_url": "{join_url}",
    "calendar_url": "{calendar_url}"
  },

  "offer": {
    "discount_amount": "50%",
    "discount_code": "SAVE50",
    "expiry": "Sunday 25 May at midnight",
    "terms": "Min. order ৳500. New customers only."
  },

  "social": {
    "instagram": "https://instagram.com/brand",
    "facebook": "https://facebook.com/brand",
    "twitter": "https://twitter.com/brand",
    "linkedin": "https://linkedin.com/company/brand"
  },

  "legal": {
    "company_name": "Company Legal Name Ltd.",
    "address": "123 Street, City, Country, Postcode",
    "unsubscribe_url": "{unsubscribe_url}",
    "privacy_url": "https://brand.com/privacy",
    "terms_url": "https://brand.com/terms",
    "manage_preferences_url": "{preferences_url}",
    "why_received": "You received this because you signed up at brand.com"
  },

  "esp": "mailchimp | klaviyo | sendgrid | convertkit | mailerlite | brevo | hubspot | none",
  "currency": "BDT | USD | GBP | EUR",
  "language": "en | bn"
}
```

### Minimal Brief (quick build)

```json
{
  "slug": "summer-sale",
  "template_type": "promotional",
  "brand": { "name": "StyleHub", "primary_color": "#e83060", "website": "https://stylehub.com.bd" },
  "design": { "style": "bold_marketing", "tone": "urgent" },
  "content": {
    "subject_line": "🔥 50% OFF everything — ends tonight!",
    "preheader_text": "Use code SAVE50 at checkout. Biggest sale of the year.",
    "headline": "50% Off Sitewide",
    "cta_primary": { "text": "Shop the Sale", "url": "{shop_url}" }
  },
  "offer": { "discount_amount": "50%", "discount_code": "SAVE50", "expiry": "Tonight at midnight" },
  "legal": { "company_name": "StyleHub Ltd.", "address": "Dhaka, Bangladesh", "unsubscribe_url": "{unsubscribe_url}" }
}
```

---

## 19. ESP INTEGRATION GUIDE

### Mailchimp
```
- Merge tags:    *|FNAME|*, *|EMAIL|*, *|UNSUBSCRIBE|*, *|LIST:ADDRESS|*
- Unsubscribe:   *|UNSUB|*
- Archive link:  *|ARCHIVE|*
- Import: Campaigns → Create → Email → Paste HTML
- Test:   Use Mailchimp's inbox preview tool
```

### Klaviyo
```
- Variables:     {{ first_name }}, {{ event.order_id }}, {{ customer.email }}
- Unsubscribe:   {% unsubscribe_link %}
- Import: Templates → New Template → Paste HTML
- Test:   Send preview to specific email
```

### SendGrid
```
- Substitutions: {{{first_name}}}, {{{order_id}}}
- Unsubscribe:   {{{unsubscribe}}}
- Import: Email API → Dynamic Templates → Code Editor
```

### ConvertKit
```
- Variables:     {{ subscriber.first_name }}
- Unsubscribe:   {{ unsubscribe_url }}
- Import: Broadcasts → New Broadcast → Custom HTML
```

### Brevo (formerly Sendinblue)
```
- Variables:     {{ contact.FIRSTNAME }}
- Unsubscribe:   {UNSUBSCRIBE}
- Import: Templates → New Template → Code Editor
```

### Generic Template Variables
> Use these in the brief and replace with ESP-specific tags before sending:

```
{first_name}         → customer's first name
{order_number}       → order ID
{tracking_number}    → shipment tracking
{tracking_url}       → tracking page link
{discount_code}      → promo code text
{shop_url}           → main shop URL
{product_url}        → specific product page
{unsubscribe_url}    → unsubscribe link
{preferences_url}    → manage preferences
{delivery_date}      → estimated delivery
{join_url}           → event/webinar join link
{reset_url}          → password reset link
{verify_url}         → email verification link
```

---

## 20. PROMPT ENGINEERING GUIDE

### Request Patterns

**Transactional email:**
```
Build an ORDER CONFIRMATION email template.
Brand: StyleHub (fashion e-commerce). Primary colour: #e83060.
Include: order summary table, shipping address, tracking CTA.
Style: clean transactional. Dark mode supported.
Variables: {first_name}, {order_number}, {total}, {tracking_url}
```

**Marketing email:**
```
Build a PROMOTIONAL email for a 50% off sale.
Brand: StyleHub. Colour: #e83060. Style: bold marketing with urgency.
Code: SAVE50. Expires: Sunday midnight. 3 featured products.
Subject: "🔥 50% OFF — ends tonight!"
```

**Newsletter:**
```
Build a NEWSLETTER template for a tech startup.
Brand: DevFlow. Primary: #4060ff. Style: editorial clean.
Sections: editorial intro, 1 main article (60/40 split), 2 secondary stories in grid, product spotlight.
2-column layout with responsive mobile stack.
```

**Sequence request:**
```
Build the 3-email ABANDONED CART sequence.
Email 1 (1hr): gentle reminder. Email 2 (24hr): include 10% discount. Email 3 (72hr): urgency + social proof.
Brand: HomeStyle. Colour: #10803a.
```

**Style variants:**
```
Build the same ORDER CONFIRMATION template in 3 style variants:
1. Corporate Clean (dark navy accent)
2. Playful/Colourful (bright teal accent, emoji-heavy)
3. Minimal text-first (no design elements, just copy)
All must be fully responsive and Outlook-compatible.
```

### Modifier Keywords

```
"Outlook-safe"         → extra attention to VML, table layout, conditional comments
"Gmail-optimised"      → inline all styles, avoid <style> in body
"heavily personalised" → add {variables} throughout, dynamic content blocks
"dark mode first"      → design for dark, provide light fallback
"RTL support"          → right-to-left text for Arabic/Hebrew markets
"AMP for email"        → add AMP components (Google Mail only)
"mjml syntax"          → output MJML instead of raw HTML
"plain text version"   → include plain text alternative in the HTML
"high accessibility"   → strict WCAG AA, semantic HTML, full alt text
```

---

## 21. BUSINESS MODEL & PRICING

### Service Tiers

| Tier | What's Included | Turnaround | Price (BDT) | Price (USD) |
|---|---|---|---|---|
| **Single Template** | 1 template type · 1 style · mobile-responsive | 24hr | ৳3,500 | $35 |
| **Template Pack** | 5 templates (choose types) · 2 style options | 48hr | ৳15,000 | $150 |
| **Campaign Set** | Welcome series (3) + Promotional (2) + Newsletter | 72hr | ৳25,000 | $250 |
| **Full Email System** | All 15 template types · design system · ESP setup | 1 week | ৳80,000 | $800 |
| **Monthly Retainer** | 4 custom emails/mo · revisions included | Monthly | ৳20,000 | $200/mo |

### Upsells

| Add-on | BDT | USD |
|---|---|---|
| Litmus/Email on Acid testing report | ৳2,000 | $20 |
| ESP upload & setup (Mailchimp etc) | ৳2,500 | $25 |
| Dark mode variant | ৳2,000 | $20 |
| Bengali language version | ৳2,000 | $20 |
| A/B test subject lines (3 variants) | ৳1,500 | $15 |
| Plain text version | ৳500 | $5 |
| AMP for Email version | ৳5,000 | $50 |
| Automation flow setup | ৳10,000 | $100 |

---

## APPENDIX A — SUBJECT LINE FORMULA GUIDE

```
CURIOSITY:   "The one thing holding your sales back..."
OFFER:       "50% off ends at midnight ⏰"
PERSONAL:    "{first_name}, your order is confirmed ✅"
QUESTION:    "Still thinking about it?"
LIST:        "5 emails that doubled our revenue"
URGENCY:     "Only 3 spots left — grab yours"
SOCIAL:      "Why 10,000 customers switched to us"
RE-ENGAGE:   "We miss you {first_name} 💙"
SEASONAL:    "Happy Eid from all of us 🌙"

SUBJECT RULES:
- Max 50 characters (some clients truncate at 35)
- Emoji at start or end (never buried in middle)
- Preheader MUST add new info — not repeat the subject
- A/B test: curiosity vs clarity (clarity usually wins)
- Avoid: "Free", "!", ALL CAPS, excessive punctuation — spam filters
```

---

## APPENDIX B — EMAIL METRICS BENCHMARKS

```
OPEN RATE (industry average by type)
  Transactional:     40-70%  (always highest — people expect it)
  Welcome:           50-80%  (most-read marketing email)
  Newsletter:        20-35%
  Promotional:       15-25%
  Abandoned Cart:    10-20%
  Re-engagement:     5-15%   (low but valuable — last chance)

CLICK-THROUGH RATE
  Transactional:     8-15%
  Welcome:           10-20%
  Newsletter:        3-8%
  Promotional:       2-5%
  Abandoned Cart:    3-10%

UNSUBSCRIBE RATE (acceptable)
  Below 0.5%        → healthy
  0.5% - 1%         → monitor carefully
  Above 1%          → content or targeting problem

DELIVERABILITY TARGETS
  Delivery rate:     > 98%
  Spam rate:         < 0.1%
  Bounce rate:       < 2%
```

---

## APPENDIX C — QUICK REFERENCE: CSS PROPERTY SUPPORT

```
SUPPORTED EVERYWHERE (safe to use inline):
  background-color, color
  font-family, font-size, font-weight, font-style, font-variant
  line-height (decimal — not px or %)
  letter-spacing (px only)
  text-align, text-decoration, text-transform
  padding (inline and shorthand)
  border (inline and shorthand)
  width, height (on td elements)
  display: block, inline, none (in <style>)
  vertical-align (on td)
  white-space, word-break

WORKS IN MOST CLIENTS (except Outlook):
  border-radius (ignored by Outlook — design still works)
  box-shadow (ignored by Outlook)
  background-image (use VML for Outlook instead)
  max-width, min-width

DO NOT USE (broken in Outlook):
  flexbox (display:flex, flex-direction, align-items, justify-content)
  CSS grid (display:grid)
  position: absolute/fixed/sticky
  float (use tables instead)
  CSS variables (--custom-property)
  calc() (not in inline styles)
  vw, vh, vmin, vmax units
  transform
  animation / @keyframes
  transition
  clip-path, backdrop-filter, filter
  :hover, :focus, :active (mostly stripped)
  *selectors, >selectors (limited support)
```

---

*EmailCraft Builder Agent Specification v1.0*
*Compatible with: Claude claude-sonnet-4-5, GPT-4o, Gemini 1.5 Pro and later*
*Tests against: Gmail · Outlook 2019/365 · Apple Mail · Yahoo · Samsung Email*
*Compliance: CAN-SPAM · GDPR · WCAG AA Accessibility*
