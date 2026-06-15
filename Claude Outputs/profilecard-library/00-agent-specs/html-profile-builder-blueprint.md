# HTML Business Profile Builder — Full System Blueprint
### Build Guide for VS Code + GitHub Copilot

> **Goal:** A semi-automated system where you collect a client brief, trigger an AI agent, and ship a polished mobile HTML business profile in under 30 minutes — no manual coding per client.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [The 5-Phase Pipeline](#4-the-5-phase-pipeline)
5. [Agent Architecture](#5-agent-architecture)
6. [Building the Intake System](#6-building-the-intake-system)
7. [The Master Agent Prompt](#7-the-master-agent-prompt)
8. [Theme Library](#8-theme-library)
9. [The Builder Script (Node.js)](#9-the-builder-script-nodejs)
10. [QA Checklist](#10-qa-checklist)
11. [Delivery Workflow](#11-delivery-workflow)
12. [Copilot Workflow Tips](#12-copilot-workflow-tips)
13. [Scaling Plan](#13-scaling-plan)
14. [Pricing Reference](#14-pricing-reference)

---

## 1. System Overview

```
CLIENT → fills Google Form
       ↓
YOU → run builder script in VS Code terminal
       ↓
AGENT (Claude API or Copilot) → reads brief JSON → writes HTML file
       ↓
YOU → QA in browser (5 min)
       ↓
SHIP → send .html file via WhatsApp / email
       ↓ (optional upsell)
DEPLOY → drag to Netlify → send live URL + QR code
```

**Key principle:** The agent does all the creative + coding work. You are the project manager who feeds it the brief and checks the output.

**One agent run = one deliverable.** Each client gets a unique, production-quality `.html` file with their actual content, branding, and contact details baked in. No templates to manually fill. No CMS. No database.

---

## 2. Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Code editor | VS Code | Main workspace |
| AI assistant | GitHub Copilot | In-editor autocomplete + inline chat |
| Agent model | Claude API (`claude-sonnet-4-5`) | Generates the HTML output |
| Runtime | Node.js (v18+) | Runs the builder script |
| HTTP client | `node-fetch` or Axios | Calls the Claude API |
| Intake | Google Forms + Apps Script | Collects client brief as JSON |
| QA preview | VS Code Live Server extension | Real-time browser preview |
| Delivery | WhatsApp Business / Google Drive | File to client |
| Optional hosting | Netlify Drop (free) | Drag-and-drop live URL |
| Optional QR | `qrcode` npm package | Auto-generate QR code |

**No framework needed.** This is a Node.js CLI tool — no React, no build step, no server. Just run a script, get a file.

---

## 3. Folder Structure

```
html-profile-builder/
│
├── briefs/                         ← Client brief JSON files (one per client)
│   ├── brew-and-bean.json
│   ├── luminary-studio.json
│   └── nexus-digital.json
│
├── outputs/                        ← Generated HTML profiles (one per client)
│   ├── brew-and-bean.html
│   ├── luminary-studio.html
│   └── nexus-digital.html
│
├── themes/                         ← Theme config files (define color palettes + fonts)
│   ├── warm-cafe.json
│   ├── dark-luxury.json
│   ├── tech-modern.json
│   ├── fresh-green.json
│   └── minimal-white.json
│
├── prompts/                        ← Agent system prompts (one per business category)
│   ├── system-prompt.md            ← Master system prompt (always included)
│   ├── cafe-prompt.md
│   ├── photography-prompt.md
│   ├── agency-prompt.md
│   └── retail-prompt.md
│
├── templates/                      ← HTML section snippets (agent uses as reference)
│   ├── hero-section.html
│   ├── menu-section.html
│   ├── services-section.html
│   ├── team-section.html
│   └── contact-section.html
│
├── scripts/
│   ├── build.js                    ← Main builder script (run this per client)
│   ├── qr-generate.js              ← Generates QR code for hosted URL
│   ├── deploy-netlify.js           ← Auto-deploys to Netlify via API
│   └── form-sync.js                ← Pulls latest Google Form responses
│
├── qa/
│   └── checklist.md                ← QA checklist to run before delivery
│
├── .env                            ← API keys (NEVER commit to Git)
├── .gitignore
├── package.json
└── README.md
```

---

## 4. The 5-Phase Pipeline

### Phase 1 — Intake (5–10 min)

Client fills a Google Form. You get the response as JSON automatically via Apps Script webhook, or you copy it manually into a `.json` file in `/briefs/`.

You **never** type client content by hand. It all flows from the form.

### Phase 2 — Agent Build (2–3 min)

You run one command in the VS Code terminal:

```bash
node scripts/build.js --brief briefs/brew-and-bean.json
```

The script:
1. Reads the brief JSON
2. Loads the correct system prompt based on `businessType`
3. Loads the matching theme based on `colorVibe`
4. Calls the Claude API with the assembled prompt
5. Writes the returned HTML to `/outputs/brew-and-bean.html`
6. Opens it in your default browser automatically

### Phase 3 — QA (5 min)

Open the file in VS Code with Live Server. Check it on mobile using Chrome DevTools or your actual phone. Run through the checklist in `/qa/checklist.md`.

### Phase 4 — Revise (0–10 min)

If client needs changes: update the brief JSON, re-run the build script. Takes under 2 minutes. No manual HTML editing.

### Phase 5 — Deliver

- **Basic:** Send `.html` file via WhatsApp or email
- **Pro:** Drag to Netlify Drop → send URL
- **Premium:** Run `node scripts/qr-generate.js` → send URL + QR code image

---

## 5. Agent Architecture

The agent is a **single-call, structured-output agent.** No multi-step reasoning loop needed for the basic system. One prompt in, one complete HTML file out.

### Agent Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Single call vs multi-step | Single call | Simpler, faster, cheaper. HTML is one file. |
| Output format | Raw HTML string | No JSON wrapper needed. Parse the `<html>` block. |
| Context injection | Brief JSON + theme JSON + system prompt | Gives agent everything it needs in one shot |
| Model | `claude-sonnet-4-5` | Fast, high quality, cost-effective for HTML generation |
| Max tokens | 8000 | Enough for a full mobile profile (~500 lines HTML) |
| Temperature | 0.3 | Low variance — consistent professional output |

### Agent Input Structure

```
[SYSTEM PROMPT]           ← Who the agent is, rules, output format
[THEME CONFIG]            ← Colors, fonts, CSS variables to use
[SECTION TEMPLATES]       ← Reference HTML snippets (optional, for quality)
[CLIENT BRIEF]            ← All client-specific data as JSON
[BUILD INSTRUCTION]       ← "Now generate the complete HTML file"
```

### Agent Output

The agent returns a single string — a complete, valid HTML file starting with `<!DOCTYPE html>`. The script extracts this and writes it to `/outputs/`.

### Optional: Multi-Agent System (Advanced)

For Premium tier clients, you can run a two-agent pipeline:

```
Agent 1 — Planner
  Input:  client brief
  Output: JSON plan (sections to include, layout order, design rationale)
  
Agent 2 — Builder  
  Input:  Agent 1's plan + brief + theme
  Output: Complete HTML file
```

This produces higher quality for complex profiles (restaurants with large menus, agencies with team pages, etc.) at the cost of 2 API calls and ~10 extra seconds.

---

## 6. Building the Intake System

### 6a. Google Form Fields

Create a Google Form with these exact fields. The field names become the JSON keys.

```
SECTION 1: Business Identity
  businessName        (Short answer)
  tagline             (Short answer)
  businessType        (Multiple choice: cafe | restaurant | photography | agency | retail | salon | other)
  colorVibe           (Multiple choice: warm | dark | fresh | minimal | bold)

SECTION 2: Contact & Location
  phone               (Short answer)
  whatsapp            (Short answer)
  email               (Short answer)
  address             (Paragraph)
  googleMapsLink      (Short answer)

SECTION 3: Social Media
  facebook            (Short answer)
  instagram           (Short answer)
  website             (Short answer — optional)

SECTION 4: Services / Menu / Products
  servicesJSON        (Paragraph — see format below)

SECTION 5: Hours
  mondayFriday        (Short answer e.g. "9am – 9pm")
  saturday            (Short answer)
  sunday              (Short answer)
  publicHolidays      (Short answer)

SECTION 6: About / Story
  aboutText           (Paragraph — 2-3 sentences)

SECTION 7: Team (optional)
  teamJSON            (Paragraph — see format below)

SECTION 8: Logo & Images
  logoUpload          (File upload)
```

**Services JSON format** (instruct the client or fill this for them):

```json
[
  { "name": "Signature Cold Brew", "description": "12hr steeped, over ice", "price": "৳320" },
  { "name": "Hazelnut Latte", "description": "Double shot, oat milk", "price": "৳280" }
]
```

**Team JSON format:**

```json
[
  { "name": "Rafiq Khan", "role": "Founder & Lead Dev", "initials": "RK" },
  { "name": "Sara Hassan", "role": "UI/UX Designer", "initials": "SH" }
]
```

### 6b. Brief JSON File Format

Save responses as `/briefs/client-name.json`:

```json
{
  "businessName": "Brew & Bean",
  "tagline": "Artisan Coffee & Café",
  "businessType": "cafe",
  "colorVibe": "warm",
  "phone": "+880 1700-000000",
  "whatsapp": "8801700000000",
  "email": "hello@brewandbean.com",
  "address": "House 12, Road 64, Gulshan-2, Dhaka 1212",
  "googleMapsLink": "https://maps.google.com/?q=...",
  "facebook": "https://facebook.com/brewandbean",
  "instagram": "https://instagram.com/brewandbean",
  "website": "",
  "services": [
    { "name": "Signature Cold Brew", "description": "12hr steeped, over ice", "price": "৳320" },
    { "name": "Hazelnut Latte", "description": "Double shot, oat milk", "price": "৳280" },
    { "name": "Avocado Toast", "description": "Sourdough, chilli flakes, egg", "price": "৳450" }
  ],
  "hours": {
    "mondayFriday": "7:00am – 10:00pm",
    "saturday": "8:00am – 11:00pm",
    "sunday": "8:00am – 11:00pm",
    "publicHolidays": "9:00am – 9:00pm"
  },
  "aboutText": "We are Dhaka's finest artisan coffee destination, serving specialty brews and freshly baked goods since 2019.",
  "team": [],
  "tier": "professional"
}
```

---

## 7. The Master Agent Prompt

Save this as `/prompts/system-prompt.md`. This is the core instruction set for the agent.

---

### `system-prompt.md`

```
You are an expert HTML/CSS developer and mobile UI designer. 
Your job is to generate complete, self-contained, production-quality HTML business profile pages.

## Your Output Rules

1. Output ONLY the raw HTML. Start with <!DOCTYPE html>. No explanation, no markdown, no code fences.
2. The file must be completely self-contained — all CSS inside <style>, all JS inside <script>.
3. Load fonts from Google Fonts via a <link> tag. Never use Arial, Roboto, or Inter.
4. The profile must look like a premium mobile app. max-width: 420px, centered on desktop.
5. All prices, contact details, and content must come EXACTLY from the client brief JSON provided.
6. Do NOT invent or assume any content not present in the brief.
7. The design must be unique to the business type and color vibe specified.
8. All phone numbers must be wrapped in <a href="tel:..."> tags.
9. The WhatsApp button must link to https://wa.me/{whatsapp} with a pre-filled message.
10. All social links must open in a new tab with target="_blank".
11. The page must be responsive and work perfectly on screens 320px–480px wide.
12. Use semantic HTML5 elements (header, main, section, footer, nav).
13. Include a <meta name="description"> tag with the business tagline.
14. Include <meta property="og:title"> and <meta property="og:description"> for sharing.

## Design Rules by Business Type

### cafe / restaurant
- Warm, inviting aesthetic. Use serif fonts for headings (Playfair Display, Cormorant).
- Include: hero with logo, menu items with prices, opening hours, location, WhatsApp order CTA.
- Highlight "Open Now" status if hours indicate current time.

### photography / studio
- Elegant, editorial. Dark or light. Cormorant Garamond + Montserrat.
- Include: hero, stats (shoots done, years experience), service packages with prices, portfolio grid placeholder, contact.

### agency / tech
- Clean, modern. Space Mono or DM Sans. Bold accent colors.
- Include: hero with availability status, services grid, tech stack tags, team members, process steps, contact.

### retail / shop
- Bright, friendly. Clear product sections, pricing, delivery info.

### salon / beauty
- Soft, luxurious. Include: services with prices, booking CTA, team, hours.

## Section Order (customize based on businessType)

1. Hero (logo/name/tagline/rating)
2. Quick info chips (status, location, delivery)
3. Main content (menu / services / portfolio)
4. About
5. Team (if provided)
6. Hours
7. Location / Map link
8. Contact & social links
9. CTA button (WhatsApp / book / call)
10. Footer

## Theme Application

Apply the theme config exactly as provided. Use the CSS variables:
--color-primary, --color-accent, --color-bg, --color-surface, --color-text, --font-heading, --font-body

## Quality Bar

The output must look as good as a ৳20,000 custom website. 
Every pixel must be intentional. No generic AI output. No Lorem Ipsum. Real content only.
```

---

### Category-specific addon prompts

Save each as `/prompts/cafe-prompt.md`, `/prompts/photography-prompt.md`, etc. These are appended after the system prompt.

**`cafe-prompt.md`:**
```
This is a café or restaurant profile. Additional rules:
- Show a dot-pattern or subtle texture on the hero section using CSS background-image.
- Add a "🟢 Open Now" pill in the top-right of the hero.
- Each menu item must show: name (bold), description (italic, muted), price (accent color, right-aligned).
- Add a sticky bottom bar with a WhatsApp order button if the client has a WhatsApp number.
- Use ৳ symbol for all prices unless a different currency is specified in the brief.
```

**`photography-prompt.md`:**
```
This is a photography or creative studio profile. Additional rules:
- Use a 3-stat bar (shoots done / years experience / satisfaction rate) below the hero.
- Each service package shows: name, detail line, price on the right.
- The portfolio section is a 2x2 grid of placeholder cards labeled by genre (Weddings, Portraits, etc.).
- The CTA says "Book a Session" and links to WhatsApp.
- Use geometric decorative elements (CSS circles, border-radius tricks) in the hero.
```

**`agency-prompt.md`:**
```
This is a digital agency or tech services profile. Additional rules:
- Add an animated "Available for Projects" pill with a pulsing green dot.
- Services are shown as a 2-column card grid, each card has: icon (emoji), name, description, starting price.
- Include a Tech Stack section: flex-wrap of small tag chips.
- Include a 4-step process section (numbered 01-04).
- Team members show: avatar initials circle, name, role, colored badge.
- CTA says "Get a Free Quote →" and links to WhatsApp.
```

---

## 8. Theme Library

Save each as `/themes/{name}.json`. The builder script loads the matching theme based on `colorVibe` in the brief.

### `warm-cafe.json`
```json
{
  "name": "warm-cafe",
  "colorPrimary": "#bf6c30",
  "colorAccent": "#7a3d1c",
  "colorBg": "#fdf7f2",
  "colorSurface": "#fef4eb",
  "colorText": "#2c1810",
  "colorMuted": "#a07860",
  "colorBorder": "#f0d9c4",
  "fontHeading": "Playfair Display",
  "fontBody": "Lato",
  "fontHeadingWeights": "400;700",
  "fontBodyWeights": "300;400;700",
  "borderRadius": "12px",
  "heroGradient": "linear-gradient(150deg, #bf6c30 0%, #7a3d1c 55%, #4a200e 100%)"
}
```

### `dark-luxury.json`
```json
{
  "name": "dark-luxury",
  "colorPrimary": "#c8a856",
  "colorAccent": "#f0ece4",
  "colorBg": "#0c0b09",
  "colorSurface": "#111007",
  "colorText": "#f0ece4",
  "colorMuted": "rgba(240,236,228,0.45)",
  "colorBorder": "#1e1c14",
  "fontHeading": "Cormorant Garamond",
  "fontBody": "Montserrat",
  "fontHeadingWeights": "300;600",
  "fontBodyWeights": "400;600;700",
  "borderRadius": "4px",
  "heroGradient": "linear-gradient(135deg, #1c1407 0%, #0c0b09 100%)"
}
```

### `tech-modern.json`
```json
{
  "name": "tech-modern",
  "colorPrimary": "#6366f1",
  "colorAccent": "#10b981",
  "colorBg": "#f5f5fa",
  "colorSurface": "#ffffff",
  "colorText": "#07071a",
  "colorMuted": "#888888",
  "colorBorder": "#eaecf5",
  "fontHeading": "Space Mono",
  "fontBody": "DM Sans",
  "fontHeadingWeights": "400;700",
  "fontBodyWeights": "300;400;600",
  "borderRadius": "12px",
  "heroGradient": "linear-gradient(135deg, #07071a 0%, #0d0d28 100%)"
}
```

### `fresh-green.json`
```json
{
  "name": "fresh-green",
  "colorPrimary": "#16a34a",
  "colorAccent": "#15803d",
  "colorBg": "#f0fdf4",
  "colorSurface": "#ffffff",
  "colorText": "#052e16",
  "colorMuted": "#6b7280",
  "colorBorder": "#bbf7d0",
  "fontHeading": "Fraunces",
  "fontBody": "Plus Jakarta Sans",
  "fontHeadingWeights": "400;700",
  "fontBodyWeights": "400;600",
  "borderRadius": "14px",
  "heroGradient": "linear-gradient(150deg, #16a34a 0%, #052e16 100%)"
}
```

### `minimal-white.json`
```json
{
  "name": "minimal-white",
  "colorPrimary": "#111111",
  "colorAccent": "#555555",
  "colorBg": "#ffffff",
  "colorSurface": "#f8f8f8",
  "colorText": "#111111",
  "colorMuted": "#777777",
  "colorBorder": "#e5e5e5",
  "fontHeading": "Instrument Serif",
  "fontBody": "Inter",
  "fontHeadingWeights": "400",
  "fontBodyWeights": "400;500",
  "borderRadius": "8px",
  "heroGradient": "linear-gradient(150deg, #222222 0%, #111111 100%)"
}
```

---

## 9. The Builder Script (Node.js)

Save as `/scripts/build.js`. This is the core of the system.

```javascript
// scripts/build.js
// Usage: node scripts/build.js --brief briefs/client-name.json

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ──────────────────────────────────────────────
const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-sonnet-4-5-20251001';
const MAX_TOKENS = 8000;

// ── Parse CLI args ───────────────────────────────────────
const args = process.argv.slice(2);
const briefArg = args.find(a => a.startsWith('--brief='))?.split('=')[1]
               || args[args.indexOf('--brief') + 1];

if (!briefArg) {
  console.error('Usage: node scripts/build.js --brief briefs/client-name.json');
  process.exit(1);
}

// ── Load files ───────────────────────────────────────────
const briefPath = path.resolve(__dirname, '..', briefArg);
const brief = JSON.parse(fs.readFileSync(briefPath, 'utf8'));

const systemPromptPath = path.join(__dirname, '../prompts/system-prompt.md');
const systemPrompt = fs.readFileSync(systemPromptPath, 'utf8');

const categoryPromptPath = path.join(__dirname, `../prompts/${brief.businessType}-prompt.md`);
const categoryPrompt = fs.existsSync(categoryPromptPath)
  ? fs.readFileSync(categoryPromptPath, 'utf8')
  : '';

// ── Load theme ───────────────────────────────────────────
const themeMap = {
  warm:    'warm-cafe',
  dark:    'dark-luxury',
  tech:    'tech-modern',
  fresh:   'fresh-green',
  minimal: 'minimal-white',
  bold:    'tech-modern',
};
const themeName = themeMap[brief.colorVibe] || 'minimal-white';
const themePath = path.join(__dirname, `../themes/${themeName}.json`);
const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

// ── Assemble prompt ──────────────────────────────────────
const fullSystemPrompt = `${systemPrompt}\n\n${categoryPrompt}`;

const userMessage = `
## Theme Configuration
Apply this theme exactly:
${JSON.stringify(theme, null, 2)}

## Client Brief
Build a complete HTML business profile for this client:
${JSON.stringify(brief, null, 2)}

## Build Instruction
Generate the complete, self-contained HTML file now.
Output ONLY the raw HTML. Start with <!DOCTYPE html>.
Do not include any explanation, markdown code fences, or comments.
`;

// ── Call Claude API ──────────────────────────────────────
console.log(`\n🔨 Building profile for: ${brief.businessName}`);
console.log(`   Theme: ${themeName} | Type: ${brief.businessType} | Tier: ${brief.tier}`);
console.log('   Calling Claude API...\n');

const startTime = Date.now();

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': CLAUDE_API_KEY,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: 0.3,
    system: fullSystemPrompt,
    messages: [
      { role: 'user', content: userMessage }
    ],
  }),
});

if (!response.ok) {
  const err = await response.text();
  console.error('API error:', err);
  process.exit(1);
}

const data = await response.json();
const htmlOutput = data.content[0].text;

// ── Validate output ──────────────────────────────────────
if (!htmlOutput.includes('<!DOCTYPE html>')) {
  console.error('❌ Agent did not return valid HTML. Raw output saved for inspection.');
  fs.writeFileSync('outputs/debug-output.txt', htmlOutput);
  process.exit(1);
}

// ── Write output file ────────────────────────────────────
const slug = brief.businessName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const outputPath = path.join(__dirname, '../outputs', `${slug}.html`);
fs.mkdirSync(path.join(__dirname, '../outputs'), { recursive: true });
fs.writeFileSync(outputPath, htmlOutput, 'utf8');

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

console.log(`✅ Profile built successfully in ${elapsed}s`);
console.log(`   Output: outputs/${slug}.html`);
console.log(`   Tokens used: ${data.usage.input_tokens} in / ${data.usage.output_tokens} out`);
console.log(`   Estimated cost: ~$${((data.usage.input_tokens * 0.000003) + (data.usage.output_tokens * 0.000015)).toFixed(4)} USD\n`);
```

### `package.json`

```json
{
  "name": "html-profile-builder",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "node scripts/build.js",
    "qr": "node scripts/qr-generate.js",
    "deploy": "node scripts/deploy-netlify.js"
  },
  "dependencies": {
    "qrcode": "^1.5.3",
    "dotenv": "^16.4.5"
  }
}
```

### `.env`
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
NETLIFY_TOKEN=your-netlify-token-here
```

### `.gitignore`
```
.env
node_modules/
outputs/
briefs/
```

> ⚠️ Never commit `.env`, `briefs/`, or `outputs/` to Git. Briefs contain client PII. Outputs are deliverables.

---

## 10. QA Checklist

Save as `/qa/checklist.md`. Run through this before every delivery.

```markdown
# QA Checklist — Run Before Every Delivery

## Visual Check
- [ ] Open HTML file in Chrome browser
- [ ] Resize window to 375px width (iPhone size) — does everything fit?
- [ ] No horizontal scrollbar at 375px
- [ ] Hero section looks good — logo/name visible, no text overflow
- [ ] All sections render — no blank areas or missing content
- [ ] Fonts loaded correctly (not falling back to system fonts)
- [ ] Colors match the requested vibe (warm/dark/fresh/etc.)
- [ ] CTA button visible and prominent

## Content Check
- [ ] Business name is correct (spelling, capitalization)
- [ ] Tagline matches brief
- [ ] All menu items / services listed with correct prices
- [ ] Phone number is correct
- [ ] Address is correct
- [ ] Opening hours are correct and formatted well
- [ ] No Lorem Ipsum or placeholder text anywhere

## Functionality Check
- [ ] WhatsApp button opens correct number (+880...)
- [ ] Phone number link opens dialer when tapped
- [ ] Facebook/Instagram links open correct pages
- [ ] Google Maps link opens correct location
- [ ] No broken links (right-click → Inspect → Console — no 404 errors)

## Mobile Simulation
- [ ] Open Chrome DevTools (F12) → Toggle Device Toolbar (Ctrl+Shift+M)
- [ ] Test at 375px (iPhone SE) — looks good?
- [ ] Test at 414px (iPhone Plus) — looks good?
- [ ] Test at 360px (Android) — looks good?
- [ ] Scrolling feels smooth — no jumping or stuck sections

## File Check
- [ ] File size under 200kb (should be ~50–100kb typically)
- [ ] Open the file offline (disconnect WiFi) — does it still load?
  - If not: fonts are loading from Google Fonts, which requires internet.
  - That is acceptable. Note this to the client.
- [ ] File name is clean: `business-name.html` (no spaces)

## Final Step
- [ ] Screenshot the hero on mobile view → send to client as preview before final delivery
- [ ] Get client approval on the screenshot before sending the HTML file
```

---

## 11. Delivery Workflow

### Standard Delivery (all tiers)

1. Rename file: `BusinessName-Profile.html`
2. Send via WhatsApp: *"Here is your business profile! Open this file in any browser on your phone or computer. Share it with customers as a download link."*
3. Optional: Upload to Google Drive → share the link

### Pro/Premium Delivery — Live URL via Netlify

```bash
# Option A: Manual (30 seconds)
# Go to app.netlify.com/drop
# Drag the .html file onto the page
# Copy the generated URL (e.g. https://sparkling-muffin-abc123.netlify.app)

# Option B: Automated via script
node scripts/deploy-netlify.js --file outputs/business-name.html
```

### QR Code Generation

```javascript
// scripts/qr-generate.js
import QRCode from 'qrcode';
import path from 'path';

const url = process.argv[2]; // pass the Netlify URL
const outputPath = process.argv[3] || 'outputs/qr-code.png';

await QRCode.toFile(outputPath, url, {
  width: 400,
  margin: 2,
  color: { dark: '#000000', light: '#FFFFFF' }
});

console.log(`✅ QR code saved to ${outputPath}`);
```

```bash
node scripts/qr-generate.js https://your-site.netlify.app outputs/brew-and-bean-qr.png
```

Send the QR code PNG to the client. They can print it on their menu, business card, or shop window.

---

## 12. Copilot Workflow Tips

### Use Copilot for the Builder Script

When writing `build.js`, type comments and let Copilot complete the code:

```javascript
// Read brief JSON from the path passed via --brief CLI argument
// Load system prompt from prompts/system-prompt.md
// Load category-specific prompt based on brief.businessType
// Load theme JSON based on brief.colorVibe mapped to theme filename
// Assemble the full prompt with theme + brief injected
// Call Claude API with the assembled prompt
// Extract HTML from response and write to outputs/ folder
// Log token usage and estimated cost
```

### Use Copilot Chat (Ctrl+Shift+I) for Quick Tasks

- `@workspace How do I add a --preview flag that opens the output in the browser?`
- `@workspace Add error handling to build.js if the API key is missing`
- `@workspace Write a script that watches the briefs/ folder and auto-builds when a new JSON is added`

### Use Inline Chat (Ctrl+I) for Prompt Refinement

Highlight the `userMessage` string in `build.js` and press Ctrl+I:
- `Make this prompt more specific about enforcing the WhatsApp CTA button`
- `Add instructions to always include a copyright footer with the current year`

### Create VS Code Tasks

Add to `.vscode/tasks.json` so you can run builds from the Command Palette:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build Profile",
      "type": "shell",
      "command": "node scripts/build.js --brief ${input:briefFile}",
      "group": "build",
      "presentation": { "reveal": "always" }
    }
  ],
  "inputs": [
    {
      "id": "briefFile",
      "description": "Path to client brief JSON",
      "type": "promptString",
      "default": "briefs/client-name.json"
    }
  ]
}
```

Now press `Ctrl+Shift+B` → `Build Profile` → type the brief filename.

---

## 13. Scaling Plan

### Phase 1 — Manual (Month 1–2)
- Process 5–15 clients manually
- Google Form → copy JSON → run script → send file
- Goal: validate quality, collect testimonials, understand revision patterns

### Phase 2 — Semi-Automated (Month 2–4)
- Google Apps Script webhook: form submission → auto-writes JSON to Google Drive → you pull and run script
- Add a revision log: each time a brief changes, version the output (`v1`, `v2`)
- Build a simple local dashboard (HTML page listing all clients + output links)

### Phase 3 — Self-Service (Month 4+)
- Build a web form (React or simple HTML) that clients fill directly
- Backend: Node.js/Express server that receives form → calls Claude API → returns download link
- Host on Railway, Render, or Vercel (all free tier)
- Clients pay via bKash / Nagad / Stripe → unlock the download

### Potential SaaS Features
- Profile editor (client can update their own content)
- Analytics (how many times was the profile viewed)
- Multiple themes selectable by client
- Auto-renewal subscription for monthly profile updates

---

## 14. Pricing Reference

| Tier | Price (BDT) | Price (USD) | Delivery | Revisions | Extras |
|---|---|---|---|---|---|
| Starter | ৳2,500 | ~$23 | 1 day | 1 round | HTML file only |
| Professional | ৳6,000 | ~$55 | 2 days | 2 rounds | Netlify URL |
| Premium | ৳12,000 | ~$110 | 3 days | Unlimited (7d) | URL + QR code |

### Upsells
| Add-on | Price |
|---|---|
| Netlify hosted URL | ৳500 |
| QR code PNG (print-ready) | ৳300 |
| WhatsApp order integration | ৳500 |
| Monthly update retainer | ৳1,000/month |
| Rush delivery (same day) | ৳1,500 extra |

### Cost Per Profile (your cost)
| Item | Cost |
|---|---|
| Claude API (Starter) | ~$0.04 |
| Claude API (Pro/Premium) | ~$0.08 |
| Netlify hosting | Free |
| Your time (after system is built) | 20–30 min |

**Gross margin per order:** 95%+

### Target Revenue (conservative)
```
5 × Starter  (৳2,500) = ৳12,500
8 × Pro      (৳6,000) = ৳48,000
2 × Premium (৳12,000) = ৳24,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Monthly Total           = ৳84,500 (~$770 USD)
```

---

## Quick Start Checklist

```
[ ] Install Node.js v18+
[ ] Clone / create the folder structure above
[ ] Run: npm install
[ ] Add your ANTHROPIC_API_KEY to .env
[ ] Create your first brief JSON in /briefs/
[ ] Run: node scripts/build.js --brief briefs/your-first-client.json
[ ] Open the output in Chrome — does it look great?
[ ] Install VS Code extensions: Live Server, GitHub Copilot, Prettier
[ ] Set up the Google Form for intake
[ ] Build your first 3 real client profiles
[ ] Post the showcase in Facebook groups → get your first paying clients
```

---

*Blueprint version 1.0 — built for VS Code + GitHub Copilot + Claude API*
*Designed for the Bangladesh market — scalable globally*
