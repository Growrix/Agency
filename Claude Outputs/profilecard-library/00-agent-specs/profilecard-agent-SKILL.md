# ProfileCard AI Agent — Build Specification
## HTML Business Profile Generator · v2.0

---

## 1. Overview

The **ProfileCard AI Agent** generates production-ready, mobile-first HTML business profile pages from a structured client brief. Each output is a **single `.html` file** — no dependencies, no hosting required — shareable directly via WhatsApp, email, or Google Drive.

**Stack:** Node.js · Claude API (`claude-sonnet-4-5`) · Google Form (intake) · Netlify (optional deploy)

**Cost per build:** ~$0.04–$0.08 (Claude API tokens)
**Gross margin:** ~95%+
**Output quality:** Production-grade, client-deliverable

---

## 2. Architecture

```
Client Brief (JSON)
        │
        ▼
┌───────────────────┐
│   build.js (CLI)  │  node scripts/build.js --brief briefs/acme.json
└────────┬──────────┘
         │
         ▼
┌───────────────────────────────────────────────────┐
│              Claude API Call                       │
│  System prompt: /prompts/system-prompt.md         │
│  Design prompt: /prompts/{style}-prompt.md        │
│  Category prompt: /prompts/{category}-prompt.md   │
│  User message: client brief JSON                  │
└────────────────────────┬──────────────────────────┘
                         │
                         ▼
               Single HTML file (~8K tokens)
                         │
                         ▼
              /outputs/{slug}.html
                         │
              ┌──────────┴──────────┐
              │                     │
          QA Check            Netlify Deploy
       (auto-open browser)   (optional, +$0.50)
```

---

## 3. Project File Structure

```
profilecard-agent/
├── scripts/
│   ├── build.js              # Main build script
│   ├── batch-build.js        # Build multiple profiles at once
│   ├── deploy-netlify.js     # Auto-deploy to Netlify
│   └── qr-generate.js        # Generate QR code for profile URL
│
├── prompts/
│   ├── system-prompt.md      # Master system prompt (this doc, Section 6)
│   ├── glassmorphic.md       # Design style: glassmorphism
│   ├── neumorphic.md         # Design style: neumorphism
│   ├── bento-grid.md         # Design style: bento grid
│   ├── holographic.md        # Design style: dark holographic
│   ├── claymorphic.md        # Design style: claymorphism
│   ├── brutalist.md          # Design style: brutalist
│   ├── minimal.md            # Design style: ultra minimal
│   ├── local-service.md      # Category: trades & local services
│   ├── corporate.md          # Category: corporate & B2B
│   └── hospitality.md        # Category: food, hotel, lifestyle
│
├── themes/
│   ├── warm-amber.json
│   ├── dark-luxury.json
│   ├── tech-dark.json
│   ├── fresh-green.json
│   ├── glassmorphic-purple.json
│   └── neumorphic-cream.json
│
├── briefs/                   # Client brief JSON files
│   └── example-brief.json
│
├── outputs/                  # Generated HTML files
│   └── .gitkeep
│
├── .env                      # ANTHROPIC_API_KEY
└── package.json
```

---

## 4. Client Brief Schema (JSON)

Every profile build starts with a brief JSON. Collect this via Google Form, WhatsApp, or your intake form.

```json
{
  "slug": "acme-electrical",
  "business": {
    "name": "Acme Electrical",
    "tagline": "Licensed electrician · 24/7 emergency",
    "type": "local_service",
    "category": "electrical",
    "founded": "2012",
    "license": "DESA Licensed · Fully Insured"
  },
  "design": {
    "style": "glassmorphic",
    "palette": "dark-luxury",
    "mood": "professional, trustworthy, bold",
    "accent_color": "#f5c400",
    "font_style": "modern-sans"
  },
  "content": {
    "hero_headline": "Power your home. Power your life.",
    "hero_sub": "Fast, safe, licensed electrical work across all of Dhaka.",
    "availability": "24/7 Emergency",
    "rating": "4.9",
    "review_count": "380",
    "years_experience": "12"
  },
  "services": [
    { "name": "Wiring & Rewiring", "price": "৳500", "unit": "from / job", "desc": "Full house wiring, upgrades, fault finding", "tag": "Most Popular" },
    { "name": "DB Board Upgrade", "price": "৳2,500", "unit": "from", "desc": "MCB panel, earthing, surge protection" },
    { "name": "Fan & Light Install", "price": "৳400", "unit": "per unit", "desc": "All types — ceiling, exhaust, LED" }
  ],
  "coverage": ["Gulshan", "Banani", "Dhanmondi", "Mirpur", "Uttara", "Mohammadpur"],
  "stats": [
    { "number": "5,000+", "label": "Jobs Done" },
    { "number": "12yr", "label": "Experience" },
    { "number": "4.9★", "label": "Rating" }
  ],
  "contact": {
    "phone": "+880 1700-000000",
    "whatsapp": "8801700000000",
    "email": "",
    "address": "Based in Mirpur · Serves all Dhaka",
    "hours": "8am–10pm daily · 24/7 emergency",
    "instagram": "@acmeelectrical.bd"
  },
  "emergency": true,
  "cta_primary": "Call Emergency Line",
  "cta_secondary": "WhatsApp for quotes",
  "language": "en",
  "currency": "BDT"
}
```

### Brief Fields Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `slug` | string | ✅ | URL-safe filename, e.g. `acme-electrical` |
| `business.name` | string | ✅ | Business name |
| `business.type` | enum | ✅ | `local_service` \| `corporate` \| `hospitality` \| `personal` |
| `business.category` | string | ✅ | `electrical`, `consulting`, `cafe`, etc. |
| `design.style` | enum | ✅ | See Section 5 |
| `design.palette` | enum | ✅ | See themes/ folder |
| `design.mood` | string | ✅ | Natural language mood description |
| `design.accent_color` | hex | — | Override primary accent |
| `services` | array | ✅ | Min 3, max 8 services |
| `contact.whatsapp` | string | ✅ | Number without + for wa.me link |
| `emergency` | boolean | — | Show emergency CTA block |
| `language` | enum | — | `en` \| `bn` (Bengali) |

---

## 5. Design Styles

Each style has a corresponding prompt file in `/prompts/`. Pass the style name in the brief to activate it.

| Style Key | Visual Description | Best For |
|---|---|---|
| `glassmorphic` | Frosted glass cards, blur backdrop, transparent layers on gradient/dark BG | Tech, luxury, finance, spa |
| `neumorphic` | Soft UI, inset/outset clay shadows, single-tone backgrounds | Healthcare, professional services, personal brands |
| `bento-grid` | Asymmetric grid of cards, mixed sizes, each with own personality | Agencies, digital, multi-service |
| `holographic` | Iridescent gradients, aurora/prism effects, dark base | Beauty, fashion, NFT, creative |
| `claymorphic` | 3D puffy rounded shapes, pastel + vivid, inflated UI | EdTech, food, wellness, consumer apps |
| `brutalist` | Raw borders, oversized type, harsh contrast, anti-aesthetic | Consulting, agency, bold brands |
| `ultra-minimal` | Vast whitespace, ruled lines, one accent, serif type | Law, investment, executive coaching |
| `dashboard-ui` | Metric tiles, charts, data rows, monospace type | Finance, analytics, corporate |
| `newspaper` | Masthead, editorial columns, print aesthetic | Law firm, publishing, media |
| `art-deco` | Geometric ornament, gold lines, Cinzel/Cormorant type | Recruitment, banking, luxury |

---

## 6. Master System Prompt

> Save as `/prompts/system-prompt.md` — this is injected at the start of every Claude API call.

```
You are ProfileCard Builder, an expert HTML/CSS developer specialising in mobile-first business profile pages.

## Your Output
Generate a single, complete, production-ready HTML file. The file must:
- Be entirely self-contained (no external CSS/JS except Google Fonts via CDN)
- Be mobile-first, max-width 420px, centered on desktop
- Render perfectly on iOS Safari and Android Chrome
- Have no syntax errors
- Weigh under 60KB (uncompressed)
- Contain no placeholder text, no TODO comments
- Use real emojis where appropriate for visual warmth

## Design Standards
- Apply the requested design style (glassmorphic, neumorphic, bento, etc.) faithfully and at a premium level
- Typography: Import max 2 Google Font families; use font stacks intentionally
- Color: Derive the full palette from the brief's accent_color and mood
- Spacing: Generous padding (min 16px body), breathing room between sections
- Animations: Subtle CSS only — no JavaScript animations. Acceptable: blink, float, pulse, fade-in
- Icons: Use emoji as inline icons (no icon fonts, no SVG icons)

## Structure (in order)
1. Hero section — brand name, tagline, availability badge, visual identity element
2. Trust signals — ratings, years, certifications (chips/badges)
3. Services section — price + description for each service
4. Unique section — varies by category (emergency CTA / portfolio / team / stats dashboard)
5. CTA section — primary button (phone/WhatsApp), secondary button (email/enquiry)
6. Contact section — address, hours, social
7. Footer

## Quality Rules
- Every section must have visible content — no empty states
- Prices must be formatted correctly for the currency (BDT uses ৳, USD uses $)
- WhatsApp links: href="https://wa.me/{number}"
- Phone links: href="tel:+{number}"
- All buttons must have href attributes — never href="#"
- The hero must be visually dominant and immediately communicate the brand
- Section labels should be subtle (small, uppercase, tracked) not H2-dominant
- Color contrast: text must be readable — don't put white text on light backgrounds

## Output
Return ONLY the HTML file content. Start with <!DOCTYPE html>. No preamble, no explanation, no markdown fences.
```

---

## 7. Design Style Prompts

> Each file goes in `/prompts/`. They are appended after the system prompt.

### `/prompts/glassmorphic.md`
```
## Design Style: Glassmorphism

Apply a premium glassmorphic design system:

BACKGROUND: Dark gradient base (e.g. deep purple/navy/teal). Add 2-3 large blurred radial gradient "aurora" blobs positioned behind the glass elements.

GLASS CARDS: Use `background: rgba(255,255,255,0.06–0.12)`, `border: 1px solid rgba(255,255,255,0.08–0.15)`, `backdrop-filter: blur(12–20px)`, `border-radius: 14–20px`.

HERO: Full glass treatment. Gradient text for the headline using `background-clip: text`.

TYPOGRAPHY: Clean modern sans-serif (Syne, Plus Jakarta Sans, or DM Sans). Light weights for body, heavy for display.

DEPTH: Layer 3 levels — background blobs → mid glass cards → foreground text. Each level should feel distinctly separated.

ACCENTS: One vivid accent color (the brief's accent_color) for CTAs, stats numbers, and highlights. Use sparingly on glass borders.

BORDERS: Subtle hairline borders with linear-gradient shimmer on the top edge of cards: `border-top: 1px solid rgba(255,255,255,0.2)`.

BUTTONS: Primary button uses a solid gradient of the accent color. Secondary is outlined glass.

DO NOT: Use solid white backgrounds anywhere. Do not use box-shadow with dark colors. Keep shadows colored (rgba of the accent).
```

### `/prompts/neumorphic.md`
```
## Design Style: Neumorphism / Soft UI

Apply a premium neumorphic (soft UI) design system:

BACKGROUND: Single flat background color — the UI is MONOCHROMATIC. Choose from: warm cream (#e8e4dc), soft gray (#e0e5ec), light blue-gray (#dde8f0), warm stone (#e5e0d8). Everything sits on this one background.

SHADOW SYSTEM: All neumorphic elements use TWO shadows:
  - Light shadow (top-left): `rgba(255,255,255,0.7–0.9)` at -4px/-4px or similar
  - Dark shadow (bottom-right): `rgba(0,0,0,0.08–0.15)` at 4px/4px or similar
  Example: `box-shadow: -4px -4px 10px rgba(255,255,255,0.8), 4px 4px 10px rgba(0,0,0,0.12)`

PRESSED/INSET elements: Use inset shadows for active states, input fields, or secondary elements:
  `box-shadow: inset -2px -2px 6px rgba(255,255,255,0.8), inset 2px 2px 6px rgba(0,0,0,0.1)`

BORDER RADIUS: Generous — 14–20px for cards, 50px for pills/chips.

TYPOGRAPHY: Rounded, humanist sans-serif (Nunito, Poppins, Plus Jakarta Sans). Medium-heavy weights.

COLORS: Derive accent from brief. Use VERY sparingly — only for key numbers, CTAs, active states. Body text is 40–60% opacity of a dark tone.

HERO: Neumorphic raised panel effect. Name and tagline in bold weight, accent color for one key word.

BUTTONS: Primary = raised neumorphic with a colored label (not filled). Avoid filled buttons that break the mono palette — OR use a subtle gradient fill if brief calls for it.

DO NOT: Use glassmorphism blur. Do not use dark backgrounds (standard neumorphism is always light). Do not use drop shadows with color.
```

### `/prompts/bento-grid.md`
```
## Design Style: Bento Grid

Apply a premium bento grid design system (inspired by Apple's product pages):

GRID STRUCTURE: Use CSS Grid with varied cell sizes. Mix 1x1, 1x2, 2x1, and 2x2 cells. Each cell is a self-contained "card" with its own micro-design.

BACKGROUND: Dark background (#08080a or #0d0d12) OR light (#f5f5f2). Cards sit on this base.

CARDS: Each bento cell has:
  - `border-radius: 20–28px`
  - `overflow: hidden`
  - Its own background (dark tones, accent, or white)
  - Generous internal padding (20–24px)

HERO CELL: Full-width or 2-column cell at top. Contains brand name in large display type. May have a gradient or pattern background.

STAT CELLS: Small 1x1 cells with one big number + label. Colored backgrounds (accent variants).

SERVICE CELLS: Medium cells listing 2–3 services in a row.

CTA CELL: Full-width at bottom. Gradient background, large action button.

TYPOGRAPHY: Mix type weights dramatically within cells. One display font (Syne, Unbounded, or Space Grotesk) + one clean sans.

CELL VARIETY: Each cell should feel slightly different in density, background, and type scale. No two adjacent cells should be identical.

DO NOT: Make all cells the same size. Do not use line separators between sections — the grid IS the structure.
```

### `/prompts/holographic.md`
```
## Design Style: Dark Holographic / Iridescent

Apply a premium dark holographic design system:

BASE: Very dark background (#04020a, #060010). Near-black, not pure black.

HOLOGRAPHIC GRADIENT: Use multi-stop linear gradients cycling through iridescent hues:
  `background: linear-gradient(135deg, #ff00aa, #7700ff, #0044ff, #00ccff, #00ffaa)`
  Apply to: hero overlays (very low opacity 0.15–0.3), text gradients, button fills, card borders.

AURORA EFFECT: Large blurred radial gradients at very low opacity (0.1–0.2) for background depth:
  `radial-gradient(ellipse, rgba(120,0,255,0.2) 0%, transparent 60%)`

GRADIENT TEXT: Headlines use `background: linear-gradient(...)` + `background-clip: text`. Always at least 3 colors.

CARDS: Very dark semi-transparent (`rgba(255,255,255,0.03–0.06)`) with iridescent border:
  `border: 1px solid` using a subtle gradient via `border-image` OR a pseudo-element overlay.

SHIMMER BORDER TRICK: Use `::before` pseudo-element with a gradient to simulate iridescent card border.

TYPOGRAPHY: Futuristic sans-serif (Syne, Neue Haas Grotesk, or Space Grotesk). Heavy weights.

ACCENTS: Prismatic — never just one accent color. Use at least 3 hue stops even for small highlights.

BUTTONS: Gradient fill cycling 3+ hues. White text.

DO NOT: Use plain single-color accents. Do not use light backgrounds. Do not use serif fonts.
```

### `/prompts/claymorphic.md`
```
## Design Style: Claymorphism / 3D Clay UI

Apply a premium claymorphic design system:

CONCEPT: UI elements look "inflated" and three-dimensional, like they're made of soft clay. Rounded, tactile, friendly.

BACKGROUND: Soft pastel gradient — two complementary pastels:
  e.g. `background: linear-gradient(135deg, #ffd6e0, #ddd6ff)` or `#fff0e0` to `#e0f5ff`.

CLAY CARDS: Key technique is multi-layered box-shadow to simulate inflation:
  ```css
  box-shadow:
    0 1px 0 rgba(255,255,255,0.9) inset,  /* top highlight */
    0 -1px 0 rgba(0,0,0,0.05) inset,       /* bottom subtle shadow */
    0 8px 24px rgba(0,0,0,0.12),            /* ambient shadow */
    0 2px 6px rgba(0,0,0,0.08);             /* close shadow */
  border-radius: 20–28px;
  ```

COLORS: Each card or UI element has a distinct pastel/vivid fill. Use a palette of 5–6 colors that all work together.

EMOJI AS ICONS: Large emoji (28–36px) used as the primary icon for each service/feature. They look naturally 3D.

TYPOGRAPHY: Ultra-rounded font (Nunito ExtraBold, Fredoka One, or Plus Jakarta Sans 800). Text is bold, friendly, and large.

3D PILL BUTTONS: Buttons have the clay shadow treatment. Primary CTA is vivid (accent color), with a thick shadow beneath.

HERO: Gradient background, large bold headline, floating emoji elements around it (using absolute positioning, rotated slightly).

DEPTH: Add a subtle `transform: translateY(0)` with `:hover` transform on desktop, but keep the base design non-interactive.

DO NOT: Use flat shadows. Do not use dark backgrounds. Do not use thin fonts or serif type.
```

---

## 8. Build Script (`scripts/build.js`)

```javascript
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from .env

async function buildProfile(briefPath) {
  console.log(`\n🔨 Building profile from: ${briefPath}\n`);

  // 1. Load client brief
  const brief = JSON.parse(await fs.readFile(briefPath, "utf8"));
  const { slug, design } = brief;

  // 2. Load prompts
  const systemPrompt = await fs.readFile("prompts/system-prompt.md", "utf8");
  const stylePrompt = await fs.readFile(
    `prompts/${design.style}.md`,
    "utf8"
  ).catch(() => "");
  const categoryPrompt = await fs.readFile(
    `prompts/${brief.business.type}.md`,
    "utf8"
  ).catch(() => "");

  const combinedSystem = [systemPrompt, stylePrompt, categoryPrompt]
    .filter(Boolean)
    .join("\n\n---\n\n");

  // 3. Build user message
  const userMessage = `Build a complete HTML business profile page for the following client:

${JSON.stringify(brief, null, 2)}

Design style: ${design.style}
Mood: ${design.mood}
Accent color: ${design.accent_color || "derive from mood"}

Return ONLY the complete HTML file. No explanation. No markdown fences. Start with <!DOCTYPE html>.`;

  // 4. Call Claude API
  console.log(`⚡ Calling Claude API (claude-sonnet-4-5)...`);
  const startTime = Date.now();

  const message = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 8192,
    messages: [{ role: "user", content: userMessage }],
    system: combinedSystem,
  });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`✅ Generated in ${elapsed}s`);

  // 5. Extract HTML
  let html = message.content[0].text.trim();
  if (html.startsWith("```")) {
    html = html.replace(/^```html?\n?/, "").replace(/\n?```$/, "");
  }

  // 6. Save output
  await fs.mkdir("outputs", { recursive: true });
  const outputPath = path.join("outputs", `${slug}.html`);
  await fs.writeFile(outputPath, html, "utf8");

  const sizeKB = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);
  console.log(`📄 Saved: ${outputPath} (${sizeKB}KB)`);

  // 7. Auto-open for QA (Mac/Linux)
  try {
    execSync(`open "${outputPath}" 2>/dev/null || xdg-open "${outputPath}" 2>/dev/null`);
    console.log(`🌐 Opened in browser for QA`);
  } catch {}

  return outputPath;
}

// CLI entry point
const briefPath = process.argv[2];
if (!briefPath) {
  console.error("Usage: node scripts/build.js <path-to-brief.json>");
  process.exit(1);
}

buildProfile(briefPath).catch(console.error);
```

---

## 9. Batch Build Script (`scripts/batch-build.js`)

```javascript
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const briefsDir = "briefs";
const files = fs.readdirSync(briefsDir).filter(f => f.endsWith(".json"));

console.log(`\n📦 Batch building ${files.length} profiles...\n`);

for (const file of files) {
  const briefPath = path.join(briefsDir, file);
  console.log(`\n--- Building: ${file} ---`);
  try {
    execSync(`node scripts/build.js ${briefPath}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`❌ Failed: ${file}`);
  }
}

console.log(`\n✅ Batch complete. Check /outputs folder.`);
```

---

## 10. Netlify Deploy Script (`scripts/deploy-netlify.js`)

```javascript
import { execSync } from "child_process";
import fs from "fs";

const outputsDir = "outputs";
const htmlFiles = fs.readdirSync(outputsDir).filter(f => f.endsWith(".html"));

console.log(`🚀 Deploying ${htmlFiles.length} profiles to Netlify...`);

// Requires: npm install -g netlify-cli && netlify login
htmlFiles.forEach(file => {
  const slug = file.replace(".html", "");
  const siteName = `profilecard-${slug}`;
  
  try {
    const result = execSync(
      `netlify deploy --dir=outputs --prod --site=${siteName} --message="Auto-deploy ${slug}" 2>&1`
    ).toString();
    
    const urlMatch = result.match(/https:\/\/[^\s]+\.netlify\.app/);
    if (urlMatch) {
      console.log(`✅ ${slug}: ${urlMatch[0]}`);
    }
  } catch {
    console.log(`❌ ${slug}: deploy failed (site may not exist yet)`);
  }
});
```

---

## 11. QR Code Generator (`scripts/qr-generate.js`)

```javascript
import QRCode from "qrcode";
import fs from "fs/promises";
import path from "path";

async function generateQR(url, outputName) {
  const qrPath = path.join("outputs", `${outputName}-qr.png`);
  await QRCode.toFile(qrPath, url, {
    width: 400,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" }
  });
  console.log(`QR Code saved: ${qrPath}`);
}

const [, , url, name] = process.argv;
if (!url || !name) {
  console.error("Usage: node scripts/qr-generate.js <url> <name>");
  process.exit(1);
}
generateQR(url, name);
```

---

## 12. Package.json

```json
{
  "name": "profilecard-agent",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "build": "node scripts/build.js",
    "batch": "node scripts/batch-build.js",
    "deploy": "node scripts/deploy-netlify.js",
    "qr": "node scripts/qr-generate.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.24.0",
    "qrcode": "^1.5.3"
  },
  "devDependencies": {
    "dotenv": "^16.4.0"
  }
}
```

---

## 13. Environment Setup

```bash
# 1. Clone / setup
mkdir profilecard-agent && cd profilecard-agent
npm install

# 2. Set API key
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env

# 3. Build a single profile
node scripts/build.js briefs/my-client.json

# 4. Build all briefs
npm run batch

# 5. Deploy to Netlify
npm run deploy

# 6. Generate QR code
npm run qr https://my-profile.netlify.app acme-electrical
```

---

## 14. Google Form → Brief JSON Pipeline

Use **Google Apps Script** to auto-convert form submissions to briefs:

```javascript
// In Google Apps Script (attached to your Form spreadsheet)
function onFormSubmit(e) {
  const row = e.values;
  const brief = {
    slug: row[1].toLowerCase().replace(/\s+/g, "-"),
    business: {
      name: row[1],
      tagline: row[2],
      type: row[3],
      category: row[4]
    },
    design: {
      style: row[5] || "glassmorphic",
      mood: row[6] || "professional, modern",
      accent_color: row[7] || "#4060ff"
    },
    services: JSON.parse(row[8] || "[]"),
    contact: {
      phone: row[9],
      whatsapp: row[9].replace(/[^0-9]/g, ""),
      address: row[10]
    }
  };

  // Save to Drive
  const folder = DriveApp.getFolderById("YOUR_FOLDER_ID");
  const file = folder.createFile(
    `${brief.slug}.json`,
    JSON.stringify(brief, null, 2),
    MimeType.PLAIN_TEXT
  );

  Logger.log("Brief created: " + file.getUrl());
}
```

---

## 15. Pricing Model (for your service)

| Tier | Design Style | Turnaround | Price (BD) | Price (Intl) |
|---|---|---|---|---|
| Starter | Glassmorphic / Minimal | 24hr | ৳2,500 | $29 |
| Professional | Neumorphic / Bento / Clay | 12hr | ৳6,000 | $69 |
| Premium | Custom style + 2 revisions | 6hr | ৳12,000 | $149 |
| Agency | White-label batch builds | Same-day | ৳50,000/mo | $499/mo |

**Upsells:**
- Netlify URL: ৳500 / $5
- QR Code PNG: ৳300 / $3
- Bengali language version: ৳1,500 / $15
- WhatsApp auto-reply integration: ৳1,000 / $10
- Monthly content update: ৳1,000/mo / $12/mo

---

## 16. QA Checklist (before delivery)

```
□ Opens without errors in Chrome and Safari
□ Renders correctly at 375px, 390px, 414px width
□ All buttons have valid href (no href="#")
□ WhatsApp link opens correctly
□ Phone link works
□ No placeholder text remaining
□ All prices formatted correctly (৳ or $)
□ Hero section is visually striking
□ Font loads correctly (check without internet)
□ File size under 60KB
□ No horizontal scroll on mobile
□ Contrast ratio acceptable (WCAG AA)
□ Footer shows business name + year
```

---

## 17. Sample Intake Form Questions

**Google Form field map:**
1. Business Name
2. Tagline / What do you do in one line?
3. Business Type (dropdown: Local Service / Corporate / Restaurant / Personal Brand)
4. Category (dropdown: Electrical / Plumbing / Consulting / etc.)
5. Design Style (dropdown: Glassmorphic / Neumorphic / Bento / Holographic / Clay / Let us choose)
6. Mood / Feel (dropdown: Premium Dark / Light & Clean / Bold & Energetic / Soft & Warm)
7. Primary Color (color picker or text)
8. Services (3-8 lines: name · price · description)
9. Phone / WhatsApp Number
10. Location / Address
11. Opening Hours
12. Rating & No. of Reviews (optional)
13. Instagram / Facebook (optional)
14. Upload logo? (File upload — optional)

---

*ProfileCard Agent v2.0 · Built with Claude claude-sonnet-4-5 · Anthropic API*
