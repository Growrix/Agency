# HalalDSE — Bangladesh's Shariah-Native Investment Intelligence Platform
### System Architecture, Product Plan & Automation Blueprint

> **Status:** Living spec. Built to be read by AI coding tools (Cursor, Claude Code, Copilot) and by you.
> **Stack of record:** Next.js (App Router) · React · TypeScript · Tailwind · shadcn/ui · Supabase (Postgres) · Prisma · Clerk · n8n · Gemini/Claude APIs · Expo (mobile).
> **Founding principle:** Decision *support* and *compliance*, never buy/sell signals. The thing that burned the founder (and millions of retail investors) was signal-chasing. We do not rebuild that.

---

## 1. Product thesis (one paragraph)

Bangladesh has millions of retail investors, an overwhelmingly Muslim population, and a stock market that is cheap (P/E ~9), recovering (DSEX +46% YoY into 2026), but riddled with manipulated "junk"/Z-category stocks and pump-and-dump tip groups that systematically transfer retail capital to manipulators. The global halal-investing apps (Musaffa, Zoya, Islamicly, Akinda) cover the US, UK, India, GCC, Malaysia, Indonesia — **none cover the Dhaka Stock Exchange.** Local DSE tools (amarstock, LankaBangla, IDLC/UniCap dashboards) are price tickers and static Shariah lists, not personal portfolio intelligence. **The wedge is a DSE-native platform that unifies: (1) portfolio tracking that actually computes realized/unrealized P&L correctly, (2) live Shariah compliance per holding with purification + zakat, (3) a manipulation/junk-stock guardrail layer, and (4) plain-language AI education — built for the Bangladeshi Muslim retail investor and the diaspora.**

---

## 2. The validated problem (the pain points we solve)

Each pain point below is something the founder personally hit *and* a market-wide problem. Every feature in §6 maps back to one of these.

| # | Pain point | Evidence |
|---|------------|----------|
| P1 | **Investors can't tell their *real* position.** Spreadsheets show "realized P&L" (e.g. -33k) while the true economic loss (capital eroded + unrealized) is many times larger and sits hidden in dead holdings. | Founder's sheet: realized -33k, but cash-flow trail shows ~539k deployed vs ~9.5k cash + two stuck holdings. |
| P2 | **No native way to know if a DSE stock is halal *right now*.** Compliance changes monthly; lists are buried on broker sites. Investors who *want* to be compliant unknowingly hold conventional funds/insurance. | DSES rebalances monthly via S&P/Rating Intelligence; ~35–39% of DSE is compliant; founder held a bank-linked fund + conventional insurance while believing he avoided non-compliant assets. |
| P3 | **Pump-and-dump tip groups are the default "research."** WhatsApp/Telegram groups push 3–5 day "targets" on junk stocks; members are exit liquidity. | Founder's sheet contains a verbatim tip-group log ("target price… upside %… holding 3–5 trading days… institutions shaking out… will explode"). |
| P4 | **No guardrail against junk/Z-category/non-operational "ghost" stocks.** ~123 of 391 listed firms are Z-category; 51 hide financials; ~20 are shut but still trading and manipulable. | BSEC fined manipulators ~Tk1,488 cr in 18 months; DSE published a list of 30 closed firms; Baraka Power (a founder holding) downgraded to Z for >6-month production halt. |
| P5 | **No purification or zakat tooling in BDT context.** Compliant investing requires purifying the impermissible income fraction and computing zakat on holdings; nobody automates this for DSE. | Standard AAOIFI requirement; global apps do this for other markets, none for BDT/DSE. |
| P6 | **Emotional, undisciplined trading with borrowed money.** High churn, averaging down into losers, capital from interest-free loans put into volatile junk. | Founder: ~3.2M of cumulative buys on ~539k net capital (≈6x churn); ~27% of capital borrowed from friends. |
| P7 | **No personal record-keeping standard.** Everyone reinvents a fragile per-stock spreadsheet with #DIV/0! errors and inconsistent cost-basis logic. | Founder's sheet has multiple #DIV/0! cells and two conflicting P&L definitions. |

---

## 3. Target users

1. **Primary — DSE Muslim retail investor** (the founder's exact profile). Has a BO account, trades via a broker app (e.g. their brokerage's terminal), keeps records in a spreadsheet, wants to be Shariah-compliant, has been burned by tips.
2. **Secondary — the cautious newcomer.** Wants to start investing halal but is scared off by complexity and manipulation stories (this is literally what global-app reviews say: *"I was about to exit the stock market out of confusion until I found a way to filter halal stocks"*).
3. **Tertiary — Bangladeshi diaspora** (Gulf, UK, US, Malaysia) investing back home or wanting BDT exposure, willing to pay in USD.
4. **B2B2C later — brokerages & Islamic banks** who want a white-labeled compliant-portfolio layer.

---

## 4. Competitive gap (why this wins)

| Player | Markets | Portfolio | Shariah | DSE? | Manipulation guardrail |
|--------|---------|-----------|---------|------|------------------------|
| Musaffa | 60–90+ global | ✅ | ✅ AAOIFI | ❌ | ❌ |
| Zoya | US/UK + | ✅ broker sync | ✅ | ❌ | ❌ |
| Islamicly | India + global | ✅ | ✅ | ❌ | ❌ |
| amarstock / LankaBangla | DSE | ❌ (ticker only) | partial/static | ✅ | ❌ |
| IDLC/UniCap dashboards | DSE | ❌ | ✅ list only | ✅ | ❌ |
| **HalalDSE (this)** | **DSE-first** | **✅ correct P&L** | **✅ live + purify + zakat** | **✅ native** | **✅ Z/junk/anomaly flags** |

No one occupies the intersection. That intersection is the moat.

---

## 5. Product principles (non-negotiable)

1. **Compliance & education, not signals.** No "buy XYZ / target ৳N". We surface facts, status, and risk — the user decides. This is safer legally *and* it's the antidote to the disease.
2. **Halal by default.** Shariah status is first-class data on every screen, not a buried tab.
3. **Truth about risk.** If a stock is Z-category, non-operational, or showing manipulation-pattern anomalies, we say so loudly.
4. **Plain language, bilingual (Bangla + English).** The audience is retail, not analysts.
5. **Real data only.** Dogfood on the founder's live portfolio from day one. No mock data, ever.
6. **Transparent methodology.** Publish exactly which Shariah standard and data sources we use; aim to have a scholar/board endorse it (every credible competitor does this — it's the trust currency).

---

## 6. Feature set (mapped to pain points, phased)

### MVP (replaces the spreadsheet) — solves P1, P7
- **Portfolio core:** holdings, transactions (buy/sell/dividend), correct **realized vs unrealized P&L**, average-cost with charges baked in (the DSE 0.4%-ish round-trip cost the founder already tracks).
- **Sheet/CSV import:** a parser for the founder's *exact* Google-Sheets-export format → instant migration of real data (see §14).
- **Live-ish valuation:** EOD (and intraday-delayed) prices auto-applied; portfolio value, day change, total return.
- **Cash ledger:** deposits/withdrawals, so "money I put in vs money I have now" is unambiguous (fixes P1).

### V1 (the halal layer) — solves P2, P5
- **Per-holding Shariah status** (Compliant / Non-compliant / Under review) sourced from the monthly DSES screen, with the *reason* and the financial ratios.
- **Portfolio halal score:** "% of your capital is in Shariah-compliant assets."
- **Compliance-change alerts:** if a held stock drops out of the DSES list at rebalance, notify + explain.
- **Purification calculator:** computes the impermissible income fraction (dividend purification ratio) to donate; keeps a running purification ledger.
- **Zakat snapshot:** zakatable value of the portfolio on a chosen lunar date, with the standard treatment for trading vs long-term holdings.

### V2 (the guardrail layer — the differentiator) — solves P3, P4, P6
- **Junk/Z guardrail:** flags Z-category, non-operational/"ghost", and financials-not-published stocks before the user buys or while held.
- **Surveillance/anomaly flags:** ingests DSE trading-suspension and "unusual price movement" notices; flags stocks showing pump patterns (e.g. circuit-hitting on no news, volume spikes on Z stocks).
- **"Speculation score" for your own behavior:** churn rate, average holding period, concentration, % in junk, % on borrowed capital — a mirror that nudges toward investing vs gambling (directly addresses P6).
- **Tip-group reality check:** paste a tip ("Buy X, target Y, 3–5 days") → the app shows X's category, Shariah status, fundamentals, and a neutral "here's what the data says" panel. Not advice — context.

### V3 (intelligence & scale)
- **AI portfolio health narrative** (bilingual, plain language).
- **Factual research assistant** grounded in the app's own data (fundamentals, disclosures) — answers "what does this company do / what's its debt / is it compliant and why", *not* "should I buy".
- **Daily AI market digest** (index, sector moves, your holdings, new flags).
- **Mobile app** (Expo, sharing the logic layer).
- **Community education** (halal-investing academy content — copy the proven Musaffa/Zoya playbook).

---

## 7. System architecture

```
┌─────────────────────────────────────────────────────────────┐
│  CLIENTS                                                      │
│  Next.js (App Router, RSC) web  ·  Expo/React Native mobile  │
│  Tailwind + shadcn/ui  ·  TanStack Query  ·  Zustand (UI)    │
└───────────────┬──────────────────────────────┬──────────────┘
                │ (server actions / route handlers)            │
┌───────────────▼──────────────┐   ┌────────────▼─────────────┐
│  APP BACKEND (Next.js)        │   │  AUTH (Clerk)            │
│  - Portfolio/P&L engine       │   │  - sessions, orgs        │
│  - Shariah engine             │   │  - webhook → users table │
│  - Risk/guardrail engine      │   └──────────────────────────┘
│  - Zakat/purification engine  │
└───────────────┬──────────────┘
                │ Prisma
┌───────────────▼─────────────────────────────────────────────┐
│  DATA (Supabase / Postgres)                                  │
│  users · portfolios · holdings · transactions · cashflows    │
│  securities · prices_daily · shariah_status · fundamentals   │
│  risk_flags · watchlists · alerts · purification · zakat     │
│  + Row Level Security; Supabase Realtime for live updates    │
└───────────────▲─────────────────────────────────────────────┘
                │ writes (upserts)
┌───────────────┴─────────────────────────────────────────────┐
│  AUTOMATION (n8n)  — the data & alert backbone               │
│  W1 EOD price ingest   W2 monthly Shariah refresh            │
│  W3 Z/surveillance monitor   W4 daily AI digest             │
│  W5 price/target alerts   W6 purification/zakat reminders    │
└───────────────▲──────────────────────────────┬──────────────┘
                │ scrape / fetch                │ AI calls
┌───────────────┴──────────────┐   ┌────────────▼─────────────┐
│  DATA SOURCES                 │   │  AI (Gemini / Claude)    │
│  dsebd.org (official EOD,     │   │  - narratives, digests   │
│   categories, notices)        │   │  - factual RAG assistant │
│  amarstock / LankaBangla      │   │  - anomaly explainer     │
│  DSES monthly list (DSE/IDLC) │   │  (NO signals, NO fatwas) │
└───────────────────────────────┘   └──────────────────────────┘
```

**Why this shape:** the app code owns *product logic and user data*; n8n owns *scheduled ingestion, fan-out alerting, and AI orchestration*. Keeping ingestion in n8n (not in Next.js cron) means data-source breakages, retries, and schedule changes are visual and don't require redeploys — which matters because DSE has no official free API and scrapers break.

---

## 8. Data sources & ingestion (real, no mock)

There is **no official free DSE API**, so ingestion = scraping the official site + community libraries, normalized into our `securities`/`prices_daily` tables.

| Need | Source | Method |
|------|--------|--------|
| EOD prices, OHLC, volume | `dsebd.org` (Latest Share Price, Day-End Archive) | scrape (HTML tables) via n8n HTTP + parse |
| Real-time-ish quotes | `dsebd.org` live page; `amarstock` | poll every N min during trade hours (10:00–14:30 BST, Sun–Thu) |
| Node helper | `bd-stock-api` (faysal515, GitHub) — unofficial JSON crawler of dsebd | wrap as a microservice or copy parsing logic |
| Python helper | `bdshare` (PyPI) — `get_current_trade_data`, `get_hist_data` | small Python ingest worker if you prefer |
| Company fundamentals/financials | LankaBangla portal; company disclosures on dsebd | scrape; store in `fundamentals` |
| **DSES Shariah constituents (monthly)** | DSE DSES index page; IDLC / UniCap Shariah dashboards | scrape at each monthly rebalance |
| Z-category list, suspensions, "unusual movement" notices | dsebd announcements / category pages; DSE's published closed-firms list | scrape daily → `risk_flags` |
| (Later, paid) normalized feed | ICE Consolidated Feed for DSE | when revenue justifies it |

**Engineering notes**
- Treat scrapers as untrusted: validate row shapes, alert on schema drift, keep last-good snapshot.
- Trading calendar: Bangladesh market runs **Sunday–Thursday**; bake holidays into the schedule.
- Respect source terms; cache aggressively; plan to migrate to a licensed feed as you scale (de-risks the business).

---

## 9. Database schema (Prisma — concrete)

```prisma
model User {
  id            String   @id            // Clerk user id
  email         String   @unique
  displayName   String?
  locale        String   @default("bn")
  portfolios    Portfolio[]
  watchlists    Watchlist[]
  alerts        Alert[]
  createdAt     DateTime @default(now())
}

model Security {
  id            String   @id @default(cuid())
  tradingCode   String   @unique          // e.g. "SAIHAMCOT", "KBPPWBIL"
  name          String
  sector        String?
  category      String?                    // A / B / N / Z
  isOperational Boolean  @default(true)
  prices        PriceDaily[]
  fundamentals  Fundamental[]
  shariah       ShariahStatus[]
  riskFlags     RiskFlag[]
  holdings      Holding[]
  updatedAt     DateTime @updatedAt
}

model PriceDaily {
  id          String   @id @default(cuid())
  securityId  String
  security    Security @relation(fields: [securityId], references: [id])
  date        DateTime
  open        Float?
  high        Float?
  low         Float?
  close       Float
  ltp         Float?     // last traded price (intraday)
  volume      BigInt?
  value       Float?     // turnover (mn)
  trades      Int?
  @@unique([securityId, date])
  @@index([securityId, date])
}

model ShariahStatus {
  id              String   @id @default(cuid())
  securityId      String
  security        Security @relation(fields: [securityId], references: [id])
  asOf            DateTime                   // rebalance date
  status          ShariahCompliance          // COMPLIANT / NON_COMPLIANT / UNDER_REVIEW
  source          String                     // "DSES", "IDLC", "internal"
  reason          String?                    // why (sector / ratio fail)
  debtRatio       Float?                     // interest-bearing debt / mkt cap
  nonHalalIncome  Float?                     // %
  purificationPct Float?                     // dividend purification ratio
  @@unique([securityId, asOf, source])
}

enum ShariahCompliance { COMPLIANT NON_COMPLIANT UNDER_REVIEW }

model RiskFlag {
  id          String   @id @default(cuid())
  securityId  String
  security    Security @relation(fields: [securityId], references: [id])
  type        RiskType                       // Z_CATEGORY / NON_OPERATIONAL / FINANCIALS_NOT_PUBLISHED / SUSPENDED / UNUSUAL_MOVEMENT
  severity    Int                            // 1–5
  detail      String?
  raisedAt    DateTime @default(now())
  clearedAt   DateTime?
  @@index([securityId, type])
}

enum RiskType { Z_CATEGORY NON_OPERATIONAL FINANCIALS_NOT_PUBLISHED SUSPENDED UNUSUAL_MOVEMENT }

model Fundamental {
  id            String   @id @default(cuid())
  securityId    String
  security      Security @relation(fields: [securityId], references: [id])
  asOf          DateTime
  eps           Float?
  navPerShare   Float?
  peRatio       Float?
  paidUpCapital Float?
  totalDebt     Float?
  reserve       Float?
  @@unique([securityId, asOf])
}

model Portfolio {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  name        String   @default("My Portfolio")
  holdings    Holding[]
  transactions Transaction[]
  cashflows   Cashflow[]
  createdAt   DateTime @default(now())
}

model Holding {
  id          String   @id @default(cuid())
  portfolioId String
  portfolio   Portfolio @relation(fields: [portfolioId], references: [id])
  securityId  String
  security    Security  @relation(fields: [securityId], references: [id])
  quantity    Int
  avgCost     Float                          // charges included
  @@unique([portfolioId, securityId])
}

model Transaction {
  id          String   @id @default(cuid())
  portfolioId String
  portfolio   Portfolio @relation(fields: [portfolioId], references: [id])
  securityId  String
  type        TxType                         // BUY / SELL / DIVIDEND / BONUS / RIGHT
  date        DateTime
  quantity    Int?
  rate        Float?
  charges     Float    @default(0)
  amount      Float                          // signed net
  note        String?
  @@index([portfolioId, date])
}

enum TxType { BUY SELL DIVIDEND BONUS RIGHT }

model Cashflow {
  id          String   @id @default(cuid())
  portfolioId String
  portfolio   Portfolio @relation(fields: [portfolioId], references: [id])
  date        DateTime
  type        CashType                       // DEPOSIT / WITHDRAWAL / FEE
  amount      Float
  note        String?                        // "Loan – Imtiyaz", "Self purpose"
  isBorrowed  Boolean  @default(false)       // powers borrowed-capital risk metric
}

enum CashType { DEPOSIT WITHDRAWAL FEE }

model Watchlist {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  name      String   @default("Watchlist")
  items     Json                              // [securityId]
}

model Alert {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  kind       AlertKind                        // PRICE_TARGET / COMPLIANCE_CHANGE / RISK_FLAG / DIGEST
  securityId String?
  config     Json
  channel    String   @default("push")        // push / email / telegram
  active     Boolean  @default(true)
}

enum AlertKind { PRICE_TARGET COMPLIANCE_CHANGE RISK_FLAG DIGEST }

model PurificationLedger {
  id          String   @id @default(cuid())
  userId      String
  securityId  String
  asOf        DateTime
  dividend    Float
  purifyPct   Float
  amountDue   Float
  donated     Boolean  @default(false)
}

model ZakatSnapshot {
  id           String   @id @default(cuid())
  userId       String
  lunarDate    DateTime
  zakatableVal Float
  zakatDue     Float                          // 2.5% of zakatable
  createdAt    DateTime @default(now())
}
```

---

## 10. The engines (where the product logic lives)

**P&L engine** — the thing that fixes the founder's spreadsheet:
- Average-cost basis with charges folded in; clean separation of **realized P&L** (closed lots) and **unrealized P&L** (open lots marked to latest close).
- A **"true economic position"** view: total deposited − total withdrawn vs current (cash + market value of holdings). This single number is what most investors never compute and what hides catastrophic losses behind a small "realized" figure.

**Shariah engine:**
- Joins each `Holding` to the latest `ShariahStatus`. Portfolio halal % = compliant market value / total market value.
- Flags conventional banks/insurers/funds (sector screen) and ratio failures, with the reason shown.
- Drives purification (per dividend) and zakat (snapshot).

**Risk/guardrail engine:**
- Surfaces active `RiskFlag`s on any held or watched security.
- Computes the personal "speculation score" from transactions/cashflows (churn, avg hold days, concentration HHI, % junk, % borrowed).

**Zakat/purification engine:** standard AAOIFI-style treatment; configurable lunar date; trading-stock vs investment-holding logic.

---

## 11. AI layer (Gemini / Claude) — strict guardrails

**What AI does:**
- **Portfolio health narrative** — turns the engines' numbers into 4–5 plain bilingual sentences ("Your portfolio is 68% Shariah-compliant; 2 holdings are Z-category; your average holding period is 6 days, which is closer to trading than investing.").
- **Factual research assistant (RAG)** — grounded *only* in our `fundamentals`, `shariah_status`, `risk_flags`, and disclosures. Answers "what does this company do / what's its debt / why is it non-compliant". 
- **Anomaly explainer** — "This stock hit the upper circuit 4 days running on a Z-category company with no published financials — a pattern regulators associate with manipulation."
- **Daily digest** — index + sectors + your holdings + new flags.

**What AI must NEVER do (hard rules in the system prompt of every call):**
- No buy/sell/hold recommendations or price targets.
- No fatwas — for Shariah it cites the DSES methodology and the named scholars/standard; it does not issue rulings.
- Always attach the "information, not financial advice" disclaimer.
- Ground every factual claim in retrieved data; if not retrievable, say so.

> Use **Google AI Studio (Gemini)** for the high-volume cheap tasks (digests, narratives, summarization) and **Claude** for the assistant/reasoning where quality matters. Both behind a thin provider-abstraction so you can route per task.

---

## 12. Automation with n8n (and why n8n here)

n8n beats hand-coded cron/edge-functions for *this* layer because the work is scheduled, breakage-prone scraping + fan-out alerting + AI orchestration — exactly what visual, retryable workflows are for. Keep product logic in code; keep the plumbing in n8n.

| Workflow | Trigger | Steps |
|----------|---------|-------|
| **W1 EOD price ingest** | Cron, ~15:00 BST Sun–Thu | HTTP scrape dsebd day-end → parse → upsert `prices_daily` → call app endpoint to recompute portfolios → done |
| **W2 Monthly Shariah refresh** | Cron, monthly (rebalance) | scrape DSES list (+ IDLC) → upsert `shariah_status` → diff vs prior → for each user holding that changed, enqueue COMPLIANCE_CHANGE alert |
| **W3 Z / surveillance monitor** | Cron, daily | scrape category list + suspension/"unusual movement" notices → upsert `risk_flags` → alert affected holders/watchers |
| **W4 Daily AI digest** | Cron, morning | pull market + per-user holdings → Gemini summarize (bilingual) → push/email |
| **W5 Price & target alerts** | Cron, every ~10 min in trade hours | poll quotes → match against `alerts` (PRICE_TARGET) → push |
| **W6 Purification/zakat reminders** | Event (dividend in W1) / Cron (zakat date) | compute amount due → write ledger → remind user |

Self-host n8n (Docker) next to the app; it writes to Supabase via the Postgres node or via signed app endpoints.

---

## 13. AI-driven development workflow (how to actually build this fast)

You build with Cursor + Claude Code + Copilot + AI Studio. Optimize for that:

1. **Spec-driven repo.** Keep this file + the Prisma schema + API contracts in `/docs`. AI tools read them as context, so they generate code that fits the system instead of guessing.
2. **Monorepo (Turborepo):**
   ```
   apps/web        → Next.js (App Router)
   apps/mobile     → Expo (React Native), imports shared logic
   packages/db     → Prisma schema + client + migrations
   packages/core   → P&L / Shariah / risk / zakat engines (pure TS, unit-tested)
   packages/ui     → shadcn-based shared components
   automation/n8n  → exported workflow JSON (version-controlled)
   services/ingest → (optional) Python bdshare worker or Node bd-stock-api wrapper
   ```
3. **Tool division of labour:** Claude Code for scaffolding modules, multi-file refactors, and the engines (it can hold the whole `packages/core` in context); Cursor for inline edits and "fix this component"; Copilot for autocomplete; AI Studio/Gemini for quick data-shaping prototypes and prompt tuning.
4. **Engines first, pure and tested.** `packages/core` has zero I/O — pure functions over typed inputs. AI tools write these reliably and the tests lock correctness (especially the P&L logic — get this provably right since real money depends on it).
5. **Data pipeline before UI.** Prove real DSE data flows into Postgres (W1) before building screens. Real-data-first is your stated requirement and it de-risks everything.

---

## 14. The very first thing to build (dogfood on real money)

**A parser for the founder's exact Google-Sheets-export format.** The export is one HTML file per tab; each per-stock tab has a fixed shape (Date, Rate, Qty, Total, Charges, Actual Cost / then SELL columns / Gross & Net P&L). Write a deterministic importer that:
- reads each ticker tab → emits `Transaction` rows (buys, sells, charges) and `Cashflow` rows (from the REPORT ledger, with `isBorrowed` set for the loan entries),
- recomputes realized + unrealized P&L *correctly*, and
- shows the **true economic position** next to the sheet's "realized" figure.

The moment that runs, the platform is already more useful than the spreadsheet, on live data — and you've validated the core engine against a known, messy, real dataset.

---

## 15. Phased roadmap

| Phase | Window | Deliverable | Pain solved |
|-------|--------|-------------|-------------|
| **0** | Wk 1–2 | Supabase + Prisma + `securities`/`prices_daily`; n8n W1 ingest; real DSE EOD data flowing | foundation |
| **1** | Wk 3–5 | Portfolio core + sheet importer + correct P&L + cash ledger; Clerk auth | P1, P7 |
| **2** | Wk 6–8 | Shariah overlay (W2) + halal % + purification + zakat + compliance alerts | P2, P5 |
| **3** | Wk 9–11 | Guardrail layer (W3): Z/junk/surveillance flags + speculation score + tip reality-check | P3, P4, P6 |
| **4** | Wk 12–14 | AI layer (W4): health narrative, factual assistant, daily digest; Expo mobile shell | intelligence |
| **5** | ongoing | Monetization, academy content, scholar endorsement, scale, licensed data feed | growth |

---

## 16. Monetization

- **Free:** 1 portfolio, basic tracking, per-holding Shariah status, basic flags. (Acquisition + the founder's own use.)
- **Pro (~৳300–500/mo or ~৳3,000/yr):** unlimited portfolios, real-time-ish alerts, purification + zakat automation, AI digest & assistant, full guardrail layer, advanced screener.
- **Diaspora (USD tier):** same Pro, priced in USD for Gulf/UK/US users.
- **B2B2C white-label:** license the compliant-portfolio + guardrail layer to brokerages/Islamic banks.
- Never run ad-driven "tip" monetization — it would betray the entire premise.

---

## 17. Compliance, legal & trust

- **Position as information & tooling, not investment advice or brokerage.** Clear, persistent disclaimers. No trade execution in early phases (and if added later, via licensed broker partners, not you).
- **Shariah credibility:** publish the standard (AAOIFI-aligned, mirroring DSES/S&P methodology) and pursue a recognized scholar or board endorsement — this is the single biggest trust lever and every serious competitor has it.
- **Data licensing:** scraping is fine to start; build toward a licensed DSE/ICE feed as revenue allows, both for reliability and to remove legal risk.
- **Privacy:** portfolio data is sensitive; RLS in Supabase, encryption at rest, and never sell or expose user holdings.

---

## 18. Immediate next steps

1. Stand up Supabase + Prisma; create `securities` and `prices_daily`; load a static ticker master for DSE.
2. Build n8n **W1** (EOD ingest) and confirm real prices land in Postgres for a week. ✅ real-data milestone.
3. Write `packages/core` P&L engine with unit tests; run the **sheet importer** on the founder's real export.
4. Ship the portfolio dashboard (web) showing **true economic position**.
5. Add the Shariah overlay (W2) — and the founder's own portfolio becomes the first compliance report.

> Build order is deliberately: **real data → correct accounting → halal truth → risk guardrails → AI.** Each layer is useful on its own, and each is a thing millions of DSE investors currently have no tool for.
