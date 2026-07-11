# SUPERSEDED

Canonical planning root is now:

`f:\PROJECTS\testing\BLOG-AUTOMATION\`

Canonical blueprint now lives at:

`f:\PROJECTS\testing\BLOG-AUTOMATION\DOC\PLAN\BLOG-AUTOMATION-BLUEPRINT.md`

This file is now a legacy ideation copy and should not be used as the execution source of truth.

# 📰 BLOG AUTOMATION SYSTEM — Complete E2E Blueprint
> Real-world production grade. Sanity-first. CMS-agnostic. Human-grade content.
> Stack: Node.js + n8n + Claude API + DataForSEO + Sanity + VS Code

---

## 0. HOW PROFESSIONALS ACTUALLY DO THIS

Most developers fail at blog automation because they treat it as a writing problem.
It is not. It is a **data pipeline problem**.

The real-world flow professionals use:

```
Data In (SERP + Keywords + Competitor content)
          ↓
Intelligence Layer (what to write, how to beat what's ranking)
          ↓
Structured Writing (section by section, not one shot)
          ↓
Quality Layer (E-E-A-T, humanization, fact pass)
          ↓
SEO Layer (on-page, schema, internal links)
          ↓
Publish + Distribute
          ↓
Monitor + Update Loop
```

What makes posts rank AND generate ad revenue:

```
RANKING FACTORS              AD REVENUE FACTORS
────────────────             ──────────────────
Topical authority            High CPC niche selection
E-E-A-T signals              2000-3500 word posts
Keyword intent match         Proper ad slot placement
Internal link clusters       PageSpeed > 85
SERP feature targeting       Low bounce rate content
Original data/insights       Return visitor content
Schema markup                Brand safety (advertiser-safe)
Core Web Vitals              Session duration > 2 min
```

---

## 1. SYSTEM ARCHITECTURE

```
┌────────────────────────────────────────────────────────────────────┐
│                     BLOG AUTOMATION SYSTEM                          │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    n8n ORCHESTRATION LAYER                   │   │
│  │  (visual workflows, schedules, triggers, error handling)     │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                              │                                       │
│      ┌───────────────────────┼────────────────────────┐            │
│      ▼                       ▼                        ▼            │
│  ┌──────────┐         ┌────────────┐          ┌────────────┐       │
│  │ Keyword  │         │   Blog     │          │ Publisher  │       │
│  │ Research │         │  Factory   │          │ & Scheduler│       │
│  │  Engine  │         │  (Writer)  │          │            │       │
│  └──────────┘         └────────────┘          └────────────┘       │
│       │                     │                        │              │
│       ▼                     ▼                        ▼              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    CMS ADAPTER LAYER                         │   │
│  │         Sanity │ WordPress │ Ghost │ Contentful              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              ANALYTICS & FEEDBACK LOOP                       │   │
│  │         GSC │ GA4 │ Performance Monitor │ Update Trigger     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

---

## 2. COMPLETE FILE TREE

```
blog-automation/
│
├── 📄 package.json
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 README.md
│
│
├── 📁 config/
│   ├── 📄 site.config.js           ← Site identity, niche, targets
│   ├── 📄 cms.config.js            ← Active CMS + credentials
│   ├── 📄 seo.config.js            ← SEO rules, targets, schema types
│   ├── 📄 monetization.config.js   ← Ad network, slot IDs, RPM targets
│   └── 📄 schedule.config.js       ← Publishing schedule
│
│
├── 📁 keyword-engine/
│   ├── 📄 index.js                 ← Entry: keyword research runner
│   ├── 📄 seed-expander.js         ← Seed → hundreds of keyword ideas
│   ├── 📄 volume-fetcher.js        ← DataForSEO API → volume + difficulty
│   ├── 📄 intent-classifier.js     ← Informational/commercial/transactional
│   ├── 📄 serp-analyzer.js         ← Scrape top 10 for any keyword
│   ├── 📄 competitor-analyzer.js   ← What are competitors ranking for
│   ├── 📄 gap-finder.js            ← Keywords they rank for, you don't
│   ├── 📄 cluster-builder.js       ← Group keywords into topic clusters
│   ├── 📄 opportunity-scorer.js    ← Score by: volume × (1/difficulty) × CPC
│   └── 📄 keyword-db.js            ← Store all keyword data in SQLite
│
│
├── 📁 blog-planner/
│   ├── 📄 index.js                 ← Blog plan generator entry
│   ├── 📄 pillar-planner.js        ← Plan pillar pages (broad topics)
│   ├── 📄 cluster-planner.js       ← Plan cluster articles per pillar
│   ├── 📄 content-calendar.js      ← Generate monthly calendar
│   ├── 📄 brief-generator.js       ← Full content brief per post
│   ├── 📄 title-generator.js       ← 10 title variants, pick best
│   ├── 📄 outline-generator.js     ← H2/H3 structure from SERP data
│   └── 📄 internal-link-planner.js ← Plan internal link architecture
│
│
├── 📁 post-creator/
│   ├── 📄 index.js                 ← Post creation orchestrator
│   ├── 📄 research-compiler.js     ← Compile all research for a brief
│   ├── 📄 section-writer.js        ← Write section by section (not one shot)
│   ├── 📄 intro-writer.js          ← Hook intro (AIDA formula)
│   ├── 📄 conclusion-writer.js     ← Strong CTA conclusion
│   ├── 📄 faq-writer.js            ← FAQ section from PAA questions
│   ├── 📄 humanizer.js             ← Remove AI patterns, add personality
│   ├── 📄 fact-checker.js          ← Flag unsupported claims
│   ├── 📄 eeat-enhancer.js         ← Add E-E-A-T signals
│   ├── 📄 stats-inserter.js        ← Insert real statistics + citations
│   ├── 📄 image-planner.js         ← Plan image needs per post
│   └── 📄 quality-scorer.js        ← Score before publish (must pass)
│
│
├── 📁 seo-optimizer/
│   ├── 📄 index.js                 ← SEO optimization runner
│   ├── 📄 on-page-optimizer.js     ← Title, meta, headers, density
│   ├── 📄 schema-generator.js      ← Article, FAQ, HowTo, Review schema
│   ├── 📄 internal-linker.js       ← Insert internal links from planner
│   ├── 📄 readability-checker.js   ← Flesch score, sentence variety
│   ├── 📄 npl-optimizer.js         ← Add NLP entities Google expects
│   └── 📄 seo-scorer.js            ← Final SEO score (must be > 82/100)
│
│
├── 📁 image-engine/
│   ├── 📄 index.js                 ← Image generation orchestrator
│   ├── 📄 featured-image.js        ← Generate hero/featured image
│   ├── 📄 inline-images.js         ← Generate in-content images
│   ├── 📄 infographic-builder.js   ← Data → simple infographic
│   ├── 📄 image-optimizer.js       ← WebP, resize, compress
│   └── 📄 alt-text-writer.js       ← SEO-optimized alt text
│
│
├── 📁 cms-adapters/
│   ├── 📄 adapter-factory.js       ← Returns correct adapter from config
│   ├── 📄 base-adapter.js          ← Abstract interface all adapters implement
│   │
│   ├── 📁 sanity/
│   │   ├── 📄 sanity-adapter.js    ← Full Sanity implementation
│   │   ├── 📄 sanity-client.js     ← @sanity/client wrapper
│   │   ├── 📄 portable-text.js     ← Convert content → Sanity blocks
│   │   ├── 📄 asset-uploader.js    ← Upload images to Sanity
│   │   └── 📄 schema-map.js        ← Field mapping config
│   │
│   ├── 📁 wordpress/
│   │   ├── 📄 wp-adapter.js        ← Full WordPress REST API implementation
│   │   ├── 📄 wp-client.js         ← Authenticated WP API client
│   │   ├── 📄 wp-media.js          ← Upload images to WP media library
│   │   └── 📄 wp-categories.js     ← Category + tag management
│   │
│   ├── 📁 ghost/
│   │   ├── 📄 ghost-adapter.js     ← Ghost Admin API implementation
│   │   └── 📄 ghost-client.js      ← Ghost API client
│   │
│   └── 📁 contentful/
│       ├── 📄 contentful-adapter.js
│       └── 📄 contentful-client.js
│
│
├── 📁 publisher/
│   ├── 📄 index.js                 ← Publish orchestrator
│   ├── 📄 pre-publish-checks.js    ← Final quality gate before publish
│   ├── 📄 publisher.js             ← Push to CMS via adapter
│   ├── 📄 scheduler.js             ← Queue posts, publish at scheduled time
│   ├── 📄 cache-invalidator.js     ← Clear CDN/Next.js cache post-publish
│   ├── 📄 sitemap-notifier.js      ← Ping Google + submit to GSC
│   └── 📄 post-publish-hooks.js    ← Trigger social share, newsletter
│
│
├── 📁 quality-gates/
│   ├── 📄 index.js                 ← Run all quality checks
│   ├── 📄 word-count-gate.js       ← Minimum word count check
│   ├── 📄 seo-gate.js              ← SEO score threshold
│   ├── 📄 readability-gate.js      ← Flesch reading score
│   ├── 📄 originality-gate.js      ← AI detection score check
│   ├── 📄 fact-gate.js             ← Flagged facts reviewed
│   ├── 📄 eeat-gate.js             ← E-E-A-T signals present
│   └── 📄 monetization-gate.js     ← Ad-safe content check
│
│
├── 📁 analytics/
│   ├── 📄 index.js                 ← Analytics runner
│   ├── 📄 gsc-connector.js         ← Google Search Console API
│   ├── 📄 ga4-connector.js         ← Google Analytics 4 API
│   ├── 📄 performance-tracker.js   ← Track clicks, CTR, position
│   ├── 📄 revenue-tracker.js       ← Ad revenue per post tracking
│   ├── 📄 update-trigger.js        ← Flag posts needing refresh
│   └── 📄 report-generator.js      ← Weekly performance report
│
│
├── 📁 prompts/
│   ├── 📄 research.prompt.js       ← Research compilation prompt
│   ├── 📄 outline.prompt.js        ← Content outline generation
│   ├── 📄 section-writer.prompt.js ← Section-by-section writing
│   ├── 📄 intro.prompt.js          ← Hook intro (AIDA)
│   ├── 📄 conclusion.prompt.js     ← CTA conclusion
│   ├── 📄 faq.prompt.js            ← FAQ from PAA
│   ├── 📄 humanizer.prompt.js      ← Remove AI tells
│   ├── 📄 eeat.prompt.js           ← Add expertise signals
│   ├── 📄 title.prompt.js          ← Title generation
│   └── 📄 meta.prompt.js           ← Meta description
│
│
├── 📁 storage/
│   ├── 📄 db.js                    ← SQLite manager
│   ├── 📄 queries.js               ← All SQL queries
│   └── 📁 migrations/
│       ├── 📄 001_keywords.sql
│       ├── 📄 002_briefs.sql
│       ├── 📄 003_posts.sql
│       ├── 📄 004_schedule.sql
│       └── 📄 005_analytics.sql
│
│
├── 📁 n8n-workflows/               ← Import into n8n directly
│   ├── 📄 01-keyword-research.json
│   ├── 📄 02-brief-generation.json
│   ├── 📄 03-post-creation.json
│   ├── 📄 04-seo-optimization.json
│   ├── 📄 05-publish-schedule.json
│   ├── 📄 06-analytics-report.json
│   └── 📄 07-content-refresh.json
│
│
├── 📁 dashboard/
│   ├── 📄 server.js                ← Express :5000
│   └── 📁 public/
│       ├── 📄 index.html           ← Full control panel UI
│       ├── 📄 app.js
│       └── 📄 styles.css
│
│
└── 📁 utils/
    ├── 📄 ai.js                    ← Claude API wrapper
    ├── 📄 dataforseo.js            ← DataForSEO API client
    ├── 📄 serp-scraper.js          ← Playwright SERP scraper
    ├── 📄 logger.js                ← Winston logger
    ├── 📄 retry.js                 ← Exponential backoff
    └── 📄 slugify.js               ← URL slug generator
```

---

## 3. THE 7 CORE MODULES — DETAILED SPECS

---

### MODULE 1 — KEYWORD RESEARCH ENGINE

**The real-world tool stack professionals use:**

```
DataForSEO API          ← $50-150/mo. Industry standard. Used by Ahrefs/Semrush internally.
                          Returns: volume, difficulty, CPC, SERP features, PAA questions
                          
Playwright              ← Free. Scrapes actual SERP for any keyword.
                          Returns: top 10 URLs, titles, meta descriptions, featured snippets

No Ahrefs/Semrush needed — DataForSEO gives you 90% of the data at 10% of the cost.
```

**keyword-engine/seed-expander.js**

```javascript
// Input:  ["plumbing tips", "pipe repair"]
// Output: 200+ keyword ideas

// Step 1: DataForSEO Keyword Ideas endpoint
//   → related keywords, synonyms, questions, long-tails

// Step 2: Claude expands with niche-specific angles
//   Prompt: "Given niche [X], generate 50 keyword angles
//            covering: problems, solutions, how-to, best of, vs,
//            reviews, costs, near me, DIY, professional"

// Step 3: PAA (People Also Ask) scraping
//   Playwright → Google SERP → extract PAA questions
//   These become H3 headings and FAQ items

// Output schema:
{
  keyword: "how to fix a leaking pipe",
  type: "how-to",
  seedKeyword: "pipe repair",
  source: "dataforseo-related"
}
```

**keyword-engine/volume-fetcher.js**

```javascript
// DataForSEO: Keywords Data API → Google Search Volume
// Batch: up to 1000 keywords per request
// Returns per keyword:
{
  keyword: "how to fix a leaking pipe",
  monthlySearches: 8100,
  difficulty: 28,          // 0-100 (lower = easier to rank)
  cpc: 2.40,               // cost per click ($) — proxy for commercial value
  serpFeatures: ["featured_snippet", "paa"],
  trend: "stable"          // rising | stable | declining
}
```

**keyword-engine/opportunity-scorer.js**

```javascript
// The scoring formula professionals actually use:

function score(keyword) {
  const volumeScore    = Math.log10(keyword.monthlySearches) / 5    // 0-1
  const diffScore      = (100 - keyword.difficulty) / 100            // 0-1 (lower diff = higher score)
  const cpcScore       = Math.min(keyword.cpc / 10, 1)              // 0-1
  const featuredBonus  = keyword.serpFeatures.includes('featured_snippet') ? 0.2 : 0
  const trendBonus     = keyword.trend === 'rising' ? 0.1 : 0

  return (volumeScore * 0.3) + (diffScore * 0.4) + (cpcScore * 0.2) + featuredBonus + trendBonus
}

// Prioritize: difficulty < 35, volume > 500, CPC > $1.00
// These posts will rank AND earn ad revenue
```

**keyword-engine/cluster-builder.js**

```javascript
// Groups keywords into topic clusters using Claude + semantic similarity
// 
// Output structure:
{
  pillar: "Pipe Repair Guide",
  pillarKeyword: "pipe repair",
  clusters: [
    {
      clusterTopic: "Leaking Pipes",
      primaryKeyword: "how to fix a leaking pipe",
      supportingKeywords: [
        "leaking pipe under sink",
        "burst pipe repair",
        "temporary pipe repair"
      ],
      estimatedTraffic: 12000,
      difficulty: "easy"
    }
  ]
}

// Why clusters matter:
// Google rewards TOPICAL AUTHORITY — covering a topic completely
// One pillar + 8-12 cluster articles = fast ranking for all of them
```

---

### MODULE 2 — BLOG PLANNER

**blog-planner/brief-generator.js** — The Most Important File

```javascript
// A content brief is what professional content agencies give writers.
// It contains EVERYTHING needed to write a post that ranks.

// Output — a complete brief JSON:
{
  // Identity
  title: "How to Fix a Leaking Pipe: Complete Step-by-Step Guide (2025)",
  slug: "how-to-fix-leaking-pipe",
  targetKeyword: "how to fix a leaking pipe",
  secondaryKeywords: ["leaking pipe repair", "fix burst pipe", "pipe leak stop"],
  lsiKeywords: ["plumber", "water damage", "pipe fitting", "PTFE tape"],

  // SERP Intelligence
  searchIntent: "informational",
  serpFeatures: ["featured_snippet", "how_to_schema", "paa"],
  targetFeaturedSnippet: true,
  competitorUrls: [
    { url: "https://competitor1.com/fix-pipe", wordCount: 2100, score: 78 },
    { url: "https://competitor2.com/pipe-repair", wordCount: 1800, score: 72 }
  ],
  targetWordCount: 2500,          // beat competitors by 20%

  // Content Blueprint (from SERP analysis)
  mustCoverTopics: [
    "Types of pipe leaks",
    "Tools needed",
    "Step-by-step repair process",
    "When to call a plumber",
    "Prevention tips"
  ],
  paaQuestions: [
    "Can I fix a leaking pipe myself?",
    "How much does it cost to fix a leaking pipe?",
    "What causes pipes to leak?"
  ],

  // SEO Directives
  titleTag: "How to Fix a Leaking Pipe in 2025 (Step-by-Step Guide)",
  metaDescription: "Learn how to fix a leaking pipe yourself with our complete guide. Save money with these proven DIY steps. Tools list, tips and when to call a plumber.",
  h1: "How to Fix a Leaking Pipe: A Complete Step-by-Step Guide",
  suggestedH2s: [
    "Types of Pipe Leaks You Can Fix Yourself",
    "Tools and Materials You'll Need",
    "How to Fix a Leaking Pipe: Step-by-Step",
    "How to Fix Specific Types of Leaks",
    "When to Call a Professional Plumber",
    "How to Prevent Pipe Leaks in the Future",
    "Frequently Asked Questions"
  ],

  // Monetization
  estimatedCPC: 2.40,
  adPlacementNotes: "Insert first ad after intro (paragraph 3). Second ad mid-content after step 3. Third ad before conclusion.",

  // E-E-A-T Requirements
  expertiseSignals: [
    "Mention author is a licensed plumber OR cite plumber sources",
    "Include specific product recommendations with model numbers",
    "Reference local building codes where applicable",
    "Add safety warnings (OSHA-style)"
  ],

  // Internal Linking
  internalLinks: [
    { anchor: "pipe wrench", targetSlug: "/tools/pipe-wrench-guide" },
    { anchor: "water damage", targetSlug: "/water-damage-prevention" }
  ],

  // Images Needed
  images: [
    { position: "featured", description: "Plumber fixing leaking pipe under sink" },
    { position: "after-intro", description: "Diagram: types of pipe leaks" },
    { position: "step-3", description: "Hand applying PTFE tape to pipe joint" }
  ],

  // Schema
  schemaType: "HowTo",
  faqSchema: true
}
```

**blog-planner/content-calendar.js**

```javascript
// Generates a monthly publishing calendar based on:
// 1. Keyword opportunity scores (highest priority first)
// 2. Topical cluster completion (finish a cluster before starting next)
// 3. Publishing frequency from config (e.g. 3x per week)
// 4. Seasonal relevance (frozen pipes in winter, etc.)

// Output:
[
  { date: "2025-01-06", brief: "how-to-fix-leaking-pipe", priority: 1, cluster: "leaking-pipes" },
  { date: "2025-01-08", brief: "leaking-pipe-under-sink", priority: 2, cluster: "leaking-pipes" },
  { date: "2025-01-10", brief: "burst-pipe-repair", priority: 3, cluster: "leaking-pipes" },
  // ...
]
```

---

### MODULE 3 — POST CREATOR (THE WRITING ENGINE)

**The #1 mistake: asking AI to write the whole post in one prompt.**
**The professional way: write section by section with full context per section.**

**post-creator/index.js** — Orchestration

```javascript
async function createPost(brief) {

  console.log(`\n📝 Creating: ${brief.title}`)

  // Step 1: Compile all research
  const research = await researchCompiler.run(brief)
  // Fetches: top 10 SERP content summaries, statistics, PAA answers,
  //          competitor gaps, Reddit/Quora discussions on topic

  // Step 2: Generate enhanced outline
  const outline = await outlineGenerator.run(brief, research)

  // Step 3: Write intro (most important — determines bounce rate)
  const intro = await introWriter.run(brief, research)

  // Step 4: Write each section individually
  const sections = []
  for (const h2 of outline.sections) {
    const section = await sectionWriter.run(h2, brief, research, sections)
    // Pass previous sections → writer maintains consistency
    sections.push(section)
    console.log(`  ✅ Section: ${h2.heading}`)
  }

  // Step 5: Write FAQ
  const faq = await faqWriter.run(brief.paaQuestions, research)

  // Step 6: Write conclusion with CTA
  const conclusion = await conclusionWriter.run(brief, sections)

  // Step 7: Assemble full post
  let post = assemblePost({ intro, sections, faq, conclusion })

  // Step 8: Humanize — remove AI patterns
  post = await humanizer.run(post, brief)

  // Step 9: Add E-E-A-T signals
  post = await eeatEnhancer.run(post, brief)

  // Step 10: Insert real statistics
  post = await statsInserter.run(post, brief, research)

  // Step 11: Quality score — must pass before continuing
  const quality = await qualityScorer.run(post, brief)
  if (quality.score < 75) {
    post = await rewrite(post, quality.issues, brief) // targeted rewrite
  }

  return { post, brief, quality, outline }
}
```

**post-creator/section-writer.js** — Core Writing Logic

```javascript
// The prompt that produces human-grade content:

const SECTION_PROMPT = (section, brief, research, previousSections) => `
You are a senior content writer with 10+ years experience in ${brief.niche}.
You write for real humans. Your content is practical, specific, and based on real experience.

CURRENT TASK: Write the "${section.heading}" section of a blog post.

POST CONTEXT:
- Title: ${brief.title}
- Target Keyword: ${brief.targetKeyword}
- Audience: ${brief.targetAudience}
- Word count for this section: ${section.targetWords} words

RESEARCH AVAILABLE:
${research.summary}
Key Statistics: ${research.stats.join(', ')}
Competitor coverage gaps: ${research.gaps.join(', ')}

WHAT COMPETITORS ARE MISSING (write this, they don't have it):
${section.competitorGaps}

PREVIOUS SECTIONS WRITTEN (maintain consistency):
${previousSections.map(s => s.heading).join(' → ')}

STRICT WRITING RULES:
1. Start with a concrete, specific sentence — not a vague generality
2. Use "you" to speak directly to the reader
3. Include at least ONE specific example, number, or case
4. Use short paragraphs (2-4 sentences max)
5. Add ONE practical tip that isn't in competitors' content
6. NO filler phrases: "In this section we will", "It's important to note", "As mentioned above"
7. NO hedging: "might", "could", "perhaps", "some experts say"
8. Write with conviction. Be specific. Be useful.
9. End the section with a transition that flows naturally into the next section

${section.h3s ? 'Include these H3 subheadings: ' + section.h3s.join(', ') : ''}

OUTPUT: Only the section content. No heading. No preamble. Just the content.
`
```

**post-creator/humanizer.js** — Critical for Ad Revenue & Ranking

```javascript
// AI-written content that reads as AI gets:
//   - Lower Google ranking (helpful content update)
//   - Rejected by ad networks (Mediavine/AdThrive)
//   - High bounce rate (readers can tell)

// What humanizer.js does:

const HUMANIZE_PROMPT = (content) => `
You are editing an article to sound like it was written by an experienced human expert.

FIND AND FIX THESE AI WRITING PATTERNS:

1. SENTENCE VARIETY
   AI writes sentences of similar length. 
   Vary: short punchy sentences. Then longer ones that build on an idea and provide depth.
   Mix: 8-word sentences. 25-word sentences. Fragments. Yes, fragments.

2. REMOVE THESE EXACT PHRASES (replace with natural alternatives):
   - "In conclusion" → end naturally or use "Bottom line:"
   - "It's worth noting" → just say it
   - "Comprehensive guide" → delete
   - "In the realm of" → delete, rewrite
   - "When it comes to" → rewrite directly
   - "This article will" / "We will explore" → start with the content
   - "Delve into" → use "look at" or "examine"
   - Lists of exactly 3 items, every time → vary to 2, 4, 5 items

3. ADD HUMAN ELEMENTS:
   - One first-person observation ("I've seen this go wrong when...")
   - One direct reader challenge ("Here's what most people get wrong:")
   - One opinion stated as fact ("The best approach is X, not Y")
   - One relatable scenario ("Imagine you're at 2am with a burst pipe...")

4. CONTRACTIONS:
   Use: you'll, it's, don't, you're, we've, isn't, that's
   AI avoids contractions. Humans use them constantly.

5. CASUAL CONNECTORS (use sparingly):
   "Look, the reality is..."
   "Here's the thing:"
   "And yes, this matters more than you think."

OUTPUT: The humanized version. Same structure, same information. Human voice.
`
```

**post-creator/eeat-enhancer.js** — Ranking Signal

```javascript
// E-E-A-T = Experience, Expertise, Authoritativeness, Trustworthiness
// Google uses this to rank helpful content

// What it adds:
// 1. Author expertise mention in intro
//    "Having repaired over 200 pipe leaks as a licensed plumber..."
//    OR cite specific experts: "According to [Name], Master Plumber at [Company]..."

// 2. Experience signals
//    "In my experience fixing pipes in Dhaka's older buildings..."
//    "After testing 12 different pipe sealants, here's what actually works..."

// 3. Specific product recommendations with reasoning
//    Not: "Use a good pipe wrench"
//    Yes: "The Ridgid 31015 12-inch pipe wrench handles most residential jobs.
//          For tight spaces, the 10-inch version (Ridgid 31010) is better."

// 4. Safety and legal caveats where appropriate
//    "Note: If your home was built before 1986, pipes may contain lead.
//     Always call a licensed plumber before working on older pipe systems."

// 5. Last-updated date injection
//    "Last updated: January 2025 | Reviewed by [Author Name]"

// 6. Sources and citations
//    Link to: official government sites, university research, manufacturer specs
//    These are TRUST signals to Google
```

**post-creator/stats-inserter.js** — Credibility + SEO

```javascript
// Posts with real statistics:
//   - Get more backlinks (journalists cite them)
//   - Rank for featured snippets (Google loves specific numbers)
//   - Higher reader trust → lower bounce rate → better rankings

// How it works:
// 1. Research compiler already collected relevant stats from SERP analysis
// 2. Stats-inserter finds natural insertion points in the content
// 3. Inserts stat + citation in format:
//    "According to the EPA, household leaks waste an average of 
//     10,000 gallons of water per year [EPA WaterSense, 2024]."
// 4. Adds citation to references section at end of post

// Stat sources it pulls from:
//   - Government websites (.gov domains) ← highest trust
//   - Academic research (.edu domains)
//   - Industry associations
//   - Official manufacturer data
//   - Already found in top-10 SERP results (from research compiler)
```

---

### MODULE 4 — SEO OPTIMIZER

**seo-optimizer/on-page-optimizer.js**

```javascript
// Runs after post is written. Checks and fixes:

const SEO_CHECKLIST = {
  // Title Tag
  titleLength: { min: 50, max: 60, includesKeyword: true, includesYear: true },

  // Meta Description  
  metaLength: { min: 145, max: 160, includesKeyword: true, includesCTA: true },

  // Keyword Placement
  keywordInH1: true,
  keywordInFirstParagraph: true,     // within first 100 words
  keywordInLastParagraph: true,
  keywordDensity: { min: 0.5, max: 1.5 },  // percentage
  lsiKeywordsUsed: true,

  // Content Structure
  h2Count: { min: 4, max: 8 },
  h3Count: { min: 4 },
  averageSectionWords: { min: 200, max: 400 },
  totalWordCount: { min: 1800 },

  // Engagement Elements
  hasFaqSection: true,
  hasTldrOrSummary: true,      // featured snippet opportunity
  hasNumberedList: true,        // featured snippet opportunity
  hasTableOrComparison: true,   // featured snippet opportunity

  // Internal Links
  internalLinkCount: { min: 3, max: 8 },

  // Images
  hasAltTextAllImages: true,
  hasFeaturedImage: true,
  imageAltIncludesKeyword: true,   // for at least 1 image
}
```

**seo-optimizer/schema-generator.js**

```javascript
// Generates JSON-LD schema markup automatically based on content type

// For How-To posts:
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Fix a Leaking Pipe",
  "description": "...",
  "totalTime": "PT30M",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "15" },
  "step": [ { "@type": "HowToStep", "name": "Step 1...", "text": "..." } ]
}

// For FAQ sections (added to every post):
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}

// For Review posts:
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": { "@type": "Rating", "ratingValue": "4.5", "bestRating": "5" }
}

// Schema = direct path to rich snippets in Google
// Rich snippets = higher CTR = more traffic = more ad revenue
```

**seo-optimizer/npl-optimizer.js** — NLP Entities

```javascript
// Google uses NLP to understand content. 
// Posts that include expected NLP entities rank higher.

// Process:
// 1. Get entity list from Google Natural Language API
//    Input: top 3 competitor articles on same keyword
//    Output: list of entities Google associates with this topic
//    e.g. for "pipe repair": [plumber, pipe wrench, PTFE tape, 
//         water pressure, pipe fitting, soldering, PVC, copper pipe]

// 2. Check which entities are already in the post
// 3. Prompt Claude to naturally incorporate missing important entities
//    "The post is missing these expected entities: [list].
//     Add them naturally where relevant."

// Why this works:
// Google's NLP can tell if content is comprehensive or shallow
// Adding expected entities signals topical depth → better rankings
```

---

### MODULE 5 — CMS ADAPTERS

**The Adapter Pattern — how real-world CMS-agnostic systems work:**

**cms-adapters/base-adapter.js** — The Contract

```javascript
// Every CMS adapter MUST implement these methods:
class BaseAdapter {
  async connect(credentials)           {}  // establish connection, test auth
  async publishPost(postData)          {}  // publish a post, return { id, url }
  async saveDraft(postData)            {}  // save as draft, return { id }
  async updatePost(id, postData)       {}  // update existing post
  async deletePost(id)                 {}  // delete/unpublish
  async getPost(id)                    {}  // fetch post by ID
  async getAllSlugs()                   {}  // all existing slugs (for internal linking)
  async uploadAsset(buffer, filename)  {}  // upload image, return { url, id }
  async getCategories()                {}  // list available categories
  async createCategory(name, slug)     {}  // create if doesn't exist
  async schedulePost(postData, date)   {}  // schedule for future publish
}
```

**cms-adapters/sanity/sanity-adapter.js** — Sanity Implementation

```javascript
// Converts our universal post format → Sanity document

// Universal Post Format (what post-creator outputs):
{
  title: "How to Fix a Leaking Pipe",
  slug: "how-to-fix-leaking-pipe",
  intro: "...",
  sections: [{ heading: "...", content: "...", level: 2 }],
  faq: [{ question: "...", answer: "..." }],
  conclusion: "...",
  seo: { metaTitle: "...", metaDescription: "...", focusKeyword: "..." },
  schema: { type: "HowTo", data: {...} },
  images: [{ position: "featured", url: "...", alt: "..." }],
  categories: ["Pipe Repair"],
  tags: ["DIY", "Plumbing"],
  publishAt: "2025-01-06T10:00:00Z"
}

// Sanity Adapter converts to:
{
  _type: "post",
  title: "...",
  slug: { _type: "slug", current: "how-to-fix-leaking-pipe" },
  body: [/* Portable Text blocks */],
  seo: { metaTitle: "...", metaDescription: "...", focusKeyword: "..." },
  mainImage: { _type: "image", asset: { _ref: "image-..." } },
  categories: [{ _type: "reference", _ref: "category-id" }],
  publishedAt: "2025-01-06T10:00:00Z"
}
```

**cms-adapters/wordpress/wp-adapter.js** — WordPress Implementation

```javascript
// WordPress REST API v2
// Endpoint: POST /wp-json/wp/v2/posts

// Universal post → WordPress format:
{
  title: { rendered: "How to Fix a Leaking Pipe" },
  content: { rendered: "<h2>...</h2><p>...</p>" },  // HTML, not blocks
  status: "publish",          // publish | draft | future
  date: "2025-01-06T10:00:00",
  slug: "how-to-fix-leaking-pipe",
  categories: [categoryId],
  tags: [tagId1, tagId2],
  featured_media: mediaId,
  meta: {
    _yoast_wpseo_title: "...",          // Yoast SEO plugin
    _yoast_wpseo_metadesc: "...",
    _yoast_wpseo_focuskw: "...",
    schema_json: JSON.stringify(schema) // Custom field for schema
  }
}

// Also handles:
// - Yoast SEO / RankMath meta fields
// - ACF (Advanced Custom Fields) if used
// - Gutenberg blocks or classic editor HTML
```

---

### MODULE 6 — PUBLISHER & SCHEDULER

**publisher/pre-publish-checks.js** — The Quality Gate

```javascript
// Nothing publishes without passing these checks:

const QUALITY_GATES = [
  {
    name: "Word Count",
    check: (post) => post.wordCount >= config.minWordCount,
    failMessage: "Post too short for ad revenue eligibility"
  },
  {
    name: "SEO Score",
    check: (post) => post.seoScore >= 82,
    failMessage: "SEO score below threshold"
  },
  {
    name: "Readability",
    check: (post) => post.fleschScore >= 45,  // 45-65 = standard reading level
    failMessage: "Content too complex or too simple"
  },
  {
    name: "Images Present",
    check: (post) => post.images.length >= 1,
    failMessage: "No featured image"
  },
  {
    name: "Internal Links",
    check: (post) => post.internalLinks.length >= 2,
    failMessage: "Insufficient internal links"
  },
  {
    name: "E-E-A-T Signals",
    check: (post) => post.eeatScore >= 3,    // at least 3 signals present
    failMessage: "Insufficient E-E-A-T signals"
  },
  {
    name: "Duplicate Check",
    check: async (post) => !(await deduplicator.isDuplicate(post)),
    failMessage: "Too similar to existing content"
  }
]

// If any gate fails → post goes to REVIEW queue, not publish queue
// Admin gets notification with specific failure reasons
```

**publisher/scheduler.js**

```javascript
// Publishing schedule management

// Post Queue States:
//   draft      → in post-creator
//   review     → failed quality gate, needs human check
//   approved   → passed all gates, ready to publish
//   scheduled  → approved + has a publish datetime
//   published  → live on site
//   updating   → being refreshed (analytics triggered)

// Smart scheduling:
// 1. Never publish more than 1 post per day (prevents content cannibalization)
// 2. Publish at peak traffic times (config.schedule.peakHours)
// 3. Complete a topic cluster before moving to next cluster
//    (topical authority builds faster this way)
// 4. High-priority (high opportunity score) posts jump the queue
```

---

### MODULE 7 — ANALYTICS & CONTENT REFRESH

**analytics/update-trigger.js** — The Refresh Loop

```javascript
// This is what separates good blogs from great ones.
// Most automated blogs publish and forget.
// Professionals update content constantly.

// Weekly check (GSC data):
// Trigger update if any of:
//   - Impressions high, clicks low (CTR problem → fix title/meta)
//   - Position 5-15 for target keyword (near page 1 — update can push to top 3)
//   - Traffic dropped 20%+ vs previous month (Google algo shift)
//   - Post is 12+ months old (freshness signal needed)
//   - Competitor published a newer, longer post on same keyword

// Update pipeline (lighter than full creation):
// 1. Check what changed in SERP since post was published
// 2. Add new sections for new PAA questions
// 3. Update statistics to current year
// 4. Improve sections where competitors now outrank
// 5. Update "last updated" date → Google re-crawls
// 6. Republish → cache invalidate → sitemap ping

// Result: posts maintain rankings for years instead of months
```

---

## 4. N8N WORKFLOW ARCHITECTURE

How n8n connects all modules:

```
n8n Workflow 1: KEYWORD RESEARCH PIPELINE
────────────────────────────────────────────
Schedule Trigger (Weekly Monday 9am)
  → HTTP Request: POST /api/keyword-engine/run
  → Wait for completion
  → IF new opportunities found:
      → Create Notion/Airtable rows for review
      → Send Slack/Email: "X new keyword opportunities found"
  → Store results in SQLite

n8n Workflow 2: CONTENT BRIEF GENERATION
────────────────────────────────────────────
Trigger: New approved keyword in database
  → HTTP Request: POST /api/blog-planner/generate-brief
  → Generate full content brief
  → HTTP Request: POST /api/blog-planner/generate-outline
  → Store brief in SQLite
  → Notify: "Brief ready for: [title]"

n8n Workflow 3: POST CREATION PIPELINE
────────────────────────────────────────────
Trigger: Approved brief in queue
  → HTTP Request: POST /api/post-creator/create
  → Wait (this takes 5-15 minutes)
  → HTTP Request: POST /api/seo-optimizer/optimize
  → HTTP Request: POST /api/image-engine/generate
  → HTTP Request: POST /api/quality-gates/check
  → IF passed: → move to scheduler queue
  → IF failed: → notify for human review

n8n Workflow 4: PUBLISH SCHEDULE
────────────────────────────────────────────
Cron: Every day at 10:00 AM
  → Check scheduler queue for posts due today
  → IF post due:
      → HTTP Request: POST /api/publisher/publish
      → Wait for confirmation
      → HTTP Request: POST /api/publisher/invalidate-cache
      → HTTP Request: POST /api/publisher/ping-sitemap
      → Notify: "Published: [title] — [URL]"

n8n Workflow 5: ANALYTICS REPORT
────────────────────────────────────────────
Cron: Every Monday 8:00 AM
  → HTTP Request: GET /api/analytics/weekly-report
  → Format report
  → Send email with:
      - Top performing posts this week
      - Posts needing update (positions dropped)
      - Revenue estimate from ad impressions
      - Next week's publish schedule

n8n Workflow 6: CONTENT REFRESH
────────────────────────────────────────────
Cron: Every Sunday
  → Fetch all posts from CMS
  → For each post: check GSC performance
  → IF update criteria met:
      → Add to update queue
      → Notify: "X posts need refreshing"
  → Run updates during low-traffic hours
```

---

## 5. WHAT MAKES POSTS RANK AND EARN — REAL TACTICS

### Topical Authority Strategy

```
Publish order matters. Do this:

Week 1-3: Pillar Page
  "Complete Guide to Pipe Repair" (3000+ words)
  
Week 4-6: Cluster Articles (all link back to pillar)
  "How to Fix a Leaking Pipe" 
  "How to Fix a Burst Pipe"
  "How to Fix Copper Pipe Leak"
  
Week 7-8: More Clusters
  "Pipe Repair Cost Guide"
  "Best Pipe Repair Kits"
  "Emergency Pipe Repair"

Result: Google sees you as THE authority on pipe repair.
        ALL articles rank faster. Even new ones rank within weeks.
```

### Content Length by Intent

```
Informational (how-to, what-is):  2000-3000 words
Commercial (best X, X vs Y):      2500-3500 words  
Transactional (buy X, X price):   1200-1800 words
Local (plumber near me):           800-1200 words

More is not always better. Match the intent. Match what's ranking.
```

### Ad Revenue Optimization

```
For Google AdSense / Mediavine / AdThrive RPM:

HIGH RPM NICHES ($15-40 RPM):
  Finance, Insurance, Legal, Health, Real Estate, Home Improvement

CONTENT FORMAT for high RPM:
  - 2000+ words (more ad slots = more impressions)
  - Tutorial/how-to format (high session duration)
  - Step-by-step structure (readers scroll more)
  - Internal links to related posts (multiple page views per session)

AD PLACEMENT STRATEGY:
  - After intro paragraph (above the fold) ← highest RPM
  - After 2nd or 3rd H2 section
  - Before conclusion
  - In-image ads on images
  - Sticky sidebar (desktop)

TRAFFIC REQUIREMENTS:
  AdSense:   10,000+ monthly page views (entry level, $2-5 RPM)
  Mediavine: 50,000+ monthly sessions ($15-25 RPM)
  AdThrive:  100,000+ monthly page views ($20-40 RPM)

BLOG AUTOMATION GOAL:
  Publish 3x/week × 52 weeks = 156 posts
  Average 1000 views/post × 156 posts = 156,000 monthly views
  At Mediavine rates: 156,000 × $0.018 = $2,808/month from ads alone
```

### Featured Snippet Strategy

```
Featured snippets = Position 0 = 30%+ CTR = massive traffic

Types to target:
  Paragraph snippet:   "What is X?" → 2-3 sentence direct answer right after H2
  List snippet:        "How to X?" → Numbered list H3s
  Table snippet:       "X vs Y?" → HTML table comparing options
  How-to snippet:      Step-by-step with HowTo schema markup

How to win them:
  1. Put the direct answer IMMEDIATELY after the H2 heading
  2. Use the exact question as the H2 or H3
  3. Keep the answer to 40-60 words for paragraph snippets
  4. Use proper schema markup (HowTo, FAQ)
  5. Your page must be on page 1 already (or near it)
```

---

## 6. DATABASE SCHEMA

```sql
-- 001_keywords.sql
CREATE TABLE keywords (
  id TEXT PRIMARY KEY,
  keyword TEXT UNIQUE,
  monthly_searches INTEGER,
  difficulty INTEGER,
  cpc REAL,
  intent TEXT,
  serp_features TEXT,          -- JSON array
  trend TEXT,
  opportunity_score REAL,
  cluster_id TEXT,
  status TEXT DEFAULT 'discovered',  -- discovered|approved|briefed|published
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE keyword_clusters (
  id TEXT PRIMARY KEY,
  pillar_keyword TEXT,
  pillar_name TEXT,
  cluster_keywords TEXT,        -- JSON array of keyword IDs
  status TEXT DEFAULT 'planned',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 002_briefs.sql
CREATE TABLE content_briefs (
  id TEXT PRIMARY KEY,
  keyword_id TEXT,
  title TEXT,
  slug TEXT,
  target_keyword TEXT,
  secondary_keywords TEXT,      -- JSON
  serp_data TEXT,               -- JSON: top 10 competitors
  paa_questions TEXT,           -- JSON array
  suggested_outline TEXT,       -- JSON
  target_word_count INTEGER,
  schema_type TEXT,
  status TEXT DEFAULT 'draft',  -- draft|approved|in-progress|complete
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 003_posts.sql
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  brief_id TEXT,
  title TEXT,
  slug TEXT,
  content TEXT,                 -- Full post content (markdown)
  seo_data TEXT,                -- JSON: title, meta, schema
  word_count INTEGER,
  seo_score INTEGER,
  readability_score INTEGER,
  eeat_score INTEGER,
  quality_score INTEGER,
  status TEXT DEFAULT 'draft',  -- draft|review|approved|scheduled|published
  cms_id TEXT,                  -- ID in the target CMS
  cms_url TEXT,
  scheduled_for DATETIME,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 004_schedule.sql
CREATE TABLE publish_queue (
  id TEXT PRIMARY KEY,
  post_id TEXT,
  publish_at DATETIME,
  cms_type TEXT,
  status TEXT DEFAULT 'pending', -- pending|published|failed
  attempts INTEGER DEFAULT 0,
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 005_analytics.sql
CREATE TABLE post_analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT,
  recorded_date DATE,
  clicks INTEGER,
  impressions INTEGER,
  ctr REAL,
  avg_position REAL,
  sessions INTEGER,
  avg_session_duration INTEGER,
  bounce_rate REAL,
  ad_impressions INTEGER,
  estimated_revenue REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 7. CONFIG FILES

**config/site.config.js**

```javascript
module.exports = {
  name: "Your Blog Name",
  domain: "https://yourblog.com",
  niche: "home improvement",
  subNiches: ["plumbing", "electrical", "flooring"],
  location: "United States",       // affects local keyword research
  language: "en-US",
  targetAudience: "DIY homeowners aged 30-55",
  brandVoice: "Expert but approachable. Like advice from a knowledgeable friend.",
  competitors: [
    "https://thisoldhouse.com",
    "https://familyhandyman.com"
  ],
  author: {
    name: "Your Name",
    title: "Licensed Contractor",  // for E-E-A-T
    bio: "...",
    credentials: "20+ years in home improvement"
  }
}
```

**config/monetization.config.js**

```javascript
module.exports = {
  adNetwork: "adsense",            // adsense | mediavine | adthrive
  targetRPM: 15,                   // target revenue per 1000 impressions
  minWordsForAds: 1800,            // posts under this don't get ads
  adPlacements: {
    afterIntro: true,
    midContent: true,
    beforeConclusion: true,
    sidebar: true,
    inImage: false
  },
  highCPCTopics: [
    "insurance", "finance", "legal", "health",
    "home improvement", "software", "education"
  ],
  targetMonthlyRevenue: 3000       // planning target
}
```

---

## 8. BUILD ORDER — 6 WEEK EXECUTION PLAN

```
WEEK 1 — Foundation + Keyword Engine
──────────────────────────────────────────────────────────────────
Day 1:  project setup, package.json, config files, SQLite schema
Day 2:  utils/ai.js (Claude wrapper) + utils/dataforseo.js client
Day 3:  keyword-engine/seed-expander.js + volume-fetcher.js
Day 4:  keyword-engine/serp-analyzer.js (Playwright SERP scraping)
Day 5:  keyword-engine/opportunity-scorer.js + cluster-builder.js
        keyword-engine/competitor-analyzer.js + gap-finder.js
        CHECKPOINT: run against 5 seed keywords → get scored, clustered list

WEEK 2 — Blog Planner
──────────────────────────────────────────────────────────────────
Day 1:  blog-planner/brief-generator.js (the full brief format)
Day 2:  blog-planner/outline-generator.js (from SERP data)
Day 3:  blog-planner/title-generator.js (10 variants, scored)
        blog-planner/internal-link-planner.js
Day 4:  blog-planner/content-calendar.js
Day 5:  blog-planner/pillar-planner.js + cluster-planner.js
        CHECKPOINT: input 1 keyword → get complete content brief + outline

WEEK 3 — Post Creator (Writing Engine)
──────────────────────────────────────────────────────────────────
Day 1:  post-creator/research-compiler.js (aggregates all research)
Day 2:  prompts/ — all writing prompts (iterate until quality is high)
        post-creator/section-writer.js
Day 3:  post-creator/intro-writer.js + conclusion-writer.js
        post-creator/faq-writer.js
Day 4:  post-creator/humanizer.js + eeat-enhancer.js
Day 5:  post-creator/stats-inserter.js + quality-scorer.js
        post-creator/index.js (full orchestration)
        CHECKPOINT: brief in → full post out. Read it. Is it human-grade?

WEEK 4 — SEO + Images + Quality Gates
──────────────────────────────────────────────────────────────────
Day 1:  seo-optimizer/on-page-optimizer.js + seo-scorer.js
Day 2:  seo-optimizer/schema-generator.js (HowTo, FAQ, Article)
Day 3:  seo-optimizer/internal-linker.js + npl-optimizer.js
Day 4:  image-engine/ (featured + inline + optimizer + alt text)
Day 5:  quality-gates/index.js (all gates)
        CHECKPOINT: post passes all quality gates before continuing

WEEK 5 — CMS Adapters + Publisher
──────────────────────────────────────────────────────────────────
Day 1:  cms-adapters/base-adapter.js + adapter-factory.js
        cms-adapters/sanity/ (full implementation)
Day 2:  cms-adapters/wordpress/ (full implementation)
Day 3:  cms-adapters/ghost/ + contentful/
Day 4:  publisher/publisher.js + scheduler.js
        publisher/cache-invalidator.js + sitemap-notifier.js
Day 5:  publisher/pre-publish-checks.js + post-publish-hooks.js
        CHECKPOINT: post → Sanity live. Switch config → same post → WordPress live.

WEEK 6 — n8n Workflows + Analytics + Dashboard
──────────────────────────────────────────────────────────────────
Day 1:  n8n setup + all 6 workflow JSON files created and tested
Day 2:  analytics/gsc-connector.js + performance-tracker.js
Day 3:  analytics/update-trigger.js + report-generator.js
Day 4:  dashboard (control panel UI at localhost:5000)
Day 5:  Full E2E test:
          seed keyword → keyword research → brief → post → SEO → publish
          → analytics tracking → update trigger
        CHECKPOINT: full pipeline runs unattended, produces ranking-ready post
```

---

## 9. EXTERNAL SERVICES + REAL COSTS

| Service | Purpose | Cost/Month | Priority |
|---|---|---|---|
| **Anthropic Claude API** | Writing, humanizing, research | ~$30-80 | Required |
| **DataForSEO** | Keyword volume + difficulty + SERP | $50-150 | Required |
| **OpenAI DALL-E 3** | Image generation | ~$20-40 | High |
| **n8n (self-hosted)** | Workflow automation | Free (Docker) | Required |
| **Playwright** | SERP scraping | Free | Required |
| **Google Search Console API** | Performance tracking | Free | High |
| **Google Analytics 4 API** | Traffic analytics | Free | Medium |
| **Redis** | Queue management | Free (Docker) | Required |
| **VPS** | Host automation engine | $10-20 | Production |

**Total running cost: ~$100-300/month**
**Break-even: ~5,000-15,000 monthly page views at Mediavine rates**
**At scale: blog earning $2,000-10,000/month covers this easily**

---

## 10. SUCCESS CRITERIA

- [ ] Feed 5 seed keywords → get 200+ scored, clustered keywords in database
- [ ] Approve 1 keyword → full content brief generated automatically
- [ ] Run post creator → 2500-word post that reads like a human wrote it
- [ ] SEO score > 82/100 before publish
- [ ] Change cms.config.js type → same post publishes to WordPress, Sanity, Ghost
- [ ] n8n workflows run on schedule without manual intervention
- [ ] Published post appears in Google Search Console within 48 hours
- [ ] Analytics dashboard shows per-post performance weekly
- [ ] Update trigger fires when position drops → content refreshed automatically

---

## 11. VS CODE DEVELOPMENT SETUP

```bash
# Clone / init project
mkdir blog-automation && cd blog-automation
npm init -y

# Install all dependencies
npm install @anthropic-ai/sdk @sanity/client axios better-sqlite3 
npm install bullmq ioredis node-cron express playwright winston zod
npm install sharp cheerio dotenv nodemon ts-morph

# n8n (run via Docker alongside)
docker run -d --name n8n -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Start development
npm run dev          # nodemon start.js

# n8n dashboard
open http://localhost:5678

# Blog automation dashboard
open http://localhost:5000
```

**VS Code Extensions to Install:**
```
- REST Client          (test API endpoints)
- SQLite Viewer        (inspect your database)
- Thunder Client       (test n8n webhook triggers)
- GitLens              (track changes per session)
- Error Lens           (inline error display)
```

---

*Complete. Execution-ready. Real-world grade.*
*Build in order. Test each checkpoint. The keyword engine and brief generator*
*are the foundation — invest the most time getting those right.*
