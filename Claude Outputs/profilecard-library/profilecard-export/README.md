# ProfileCard — HTML Business Profile Library
## 118 Profiles · 13 Design Categories · Built with Claude AI

All files are standalone `.html` — open in any browser, share via WhatsApp, email or Google Drive.
No hosting, no framework, no dependencies (except Google Fonts CDN for web fonts).

---

## 📁 Folder Structure

| Folder | Profiles | Description |
|---|---|---|
| `00-showcases/` | 8 | Gallery HTML files — open to browse all templates |
| `00-agent-specs/` | 4 | `.md` agent specs for building more profiles |
| `01-originals/` | 22 | Café, photography, law, yoga, barbershop, real estate, food truck, dental, trainer, flower, tutoring, spa, restaurant, interior, fintech, wedding, garage, studio, architecture, travel, chef |
| `02-local-services/` | 15 | Electrical, solar, plumbing, aircon, cleaning, pest control, painting, CCTV, moving, water pump, generator, locksmith, carpet, roofing, landscaping |
| `03-corporate/` | 28 | Consulting, accounting, HR, marketing, investment, IT, logistics, insurance, events, PR, import/export, manufacturing, training, VC, recruitment, brand, finance, real estate investment, ESG, cybersecurity, law, coaching, supply chain, accelerator, banking, BPO, healthcare consulting |
| `04-glassmorphic/` | 11 | Jewellery, FinTech, Music Studio, Spa, Architecture, Realty, Marketing, Crypto, Wedding, Gaming Lounge + more |
| `05-neumorphic/` | 10 | Accounting, Clinic, Interior Design, Dark Tech, Personal Trainer, Photography, Law Firm, Yoga, Fitness, App Dev |
| `06-bento-grid/` | 4 | Digital Marketing Agency, Restaurant, EdTech Platform, Luxury Hotel |
| `07-holographic/` | 2 | Web3/NFT Studio, Creative Production House |
| `08-claymorphic/` | 9 | Kids EdTech, Organic Food, Fitness App, Travel Agency, Pet Care, Language App, Wellness App, Coffee Sub, Bakery |
| `09-skeuomorphic/` | 3 | Notary (leather), Record Store (wood+vinyl), Barbershop (tile) |
| `10-liquid-glass/` | 5 | Luxury Cars, Skincare, Art Studio, Premium Watches, Fine Dining |
| `11-tactile-maximalism/` | 3 | Streetwear (chrome), Gaming Peripherals (neon), Ice Cream (candy) |
| `12-isometric/` | 3 | Tech SaaS, Architecture Firm, Logistics Company |
| `13-3d-minimal-realism/` | 3 | Specialty Coffee, Premium Audio, Luxury Real Estate |

---

## 🚀 How to Use

### View a profile
Simply open any `.html` file in Chrome, Safari, or Firefox.

### Share via WhatsApp
Send the `.html` file as an attachment — works on WhatsApp Web and mobile.

### Host online (optional)
Drag any `.html` file to [Netlify Drop](https://app.netlify.com/drop) → get a shareable URL in 30 seconds.

### Build more profiles
Open `00-agent-specs/profilecard-builder-agent.md` → copy Section 4 (Master System Prompt) → paste into Claude as your system prompt → describe any business → get a new profile HTML file.

---

## 🎨 Design Styles Used

| Style | Signature CSS Technique |
|---|---|
| Glassmorphism | `backdrop-filter: blur(20px)` + `rgba(255,255,255,.06)` cards on dark aurora |
| Neumorphism | Dual light/shadow pair on monochromatic background |
| Skeuomorphism | `repeating-linear-gradient` CSS textures (leather, wood, tile) |
| Claymorphism | 4-layer inset+outset `box-shadow` = inflated 3D clay |
| Liquid Glass | `rgba(255,255,255,.38)` + `blur(28px) saturate(200%)` on light background |
| Tactile Maximalism | `::before` 48% gloss overlay + neon glow `box-shadow` |
| Isometric | CSS `clip-path` polygons = 3-face cube geometry |
| 3D Minimal-Realism | 5-stop `box-shadow` stack — no colour, just shadow depth |
| Bento Grid | CSS Grid `1fr 1fr` with asymmetric `span` cells |
| Holographic | Animated multi-hue `linear-gradient` on `background-clip: text` |

---

## 📄 Agent Specification Files

| File | Purpose |
|---|---|
| `profilecard-builder-agent.md` | Complete AI agent spec — 30 design styles, 20 business categories, Node.js pipeline |
| `emailcraft-builder-agent.md` | Email template builder agent spec — 15 template types, cross-client compatibility |
| `profilecard-agent-SKILL.md` | Original skill spec (v2) with Google Form intake pipeline |
| `html-profile-builder-blueprint.md` | System architecture blueprint |

---

*Built with Claude claude-sonnet-4-5 · Anthropic API*
*Mobile-first 420px · Self-contained HTML · WhatsApp-shareable*
*© 2025 ProfileCard Library*
