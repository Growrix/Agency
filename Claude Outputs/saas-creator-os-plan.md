# SaaS Creator OS — Build Plan
### An AI development operating system built *inside* Claude Code (not as a separate web app)

> **What this is:** the plan to turn your "SaaS Builder Bluebook / Creator OS" idea into a real, working system — built as a Claude Code **plugin** you install into any project. It cures the exact pain you named: *"I get confused what to do next, so my project never ends."*
>
> **Who it's for:** you, building solo with Claude Code / Cursor / Codex, as the visual validator.
>
> **The one rule that matters:** don't build a 12-system web platform first. That becomes another never-ending project — the disease, not the cure. **Claude Code already has the parts to *be* this OS.** You configure it; you don't rebuild it.

---

## 0. Plain-English primer — the 6 building blocks of Claude Code

You need to know these 6 things, because the whole OS is made of them. One sentence each.

| Block | What it actually is | Where it lives |
|-------|--------------------|----------------|
| **CLAUDE.md** | A rules file Claude reads at the start of every session and keeps in mind the whole time. Your "always true" laws. | `CLAUDE.md` at project root |
| **Skill** | A saved, named procedure. You run it by typing `/name`, *or* Claude runs it automatically when the task matches its description. (Old "slash commands" were merged into Skills.) | `.claude/skills/<name>/SKILL.md` |
| **Subagent** | A separate Claude with its own fresh memory, its own tools, and its own job — like hiring a specialist so the main conversation stays clean. | `.claude/agents/<name>.md` |
| **Hook** | A script that runs *automatically* at a specific moment (session start, before a tool, after a file edit, when Claude tries to finish). It's not a request — it just fires. Exit code `2` = hard stop Claude must obey. | `.claude/settings.json` |
| **State files** | Plain text files (YAML/JSON/Markdown) that store *where the project is right now*. This is your "database" — version-controlled, no server needed. | `state/` folder |
| **Plugin** | A bundle of all of the above (skills + subagents + hooks) packaged as one installable unit you drop into any repo. This is how the OS becomes reusable. | a git repo, installed via `/plugin` |

That's it. The OS is: **rules (CLAUDE.md) + specialists (subagents) + procedures (skills) + auto-enforcement (hooks) + a memory of progress (state files), all shipped as a plugin.**

---

## 1. The reframe — your ChatGPT vision, mapped to what Claude Code already does

Your ChatGPT plan invented "12 systems" and an "AI orchestrator." Good thinking — but every one of those already has a home in Claude Code. You don't build them; you express them. Here's the exact mapping:

| Your "System" (from the ChatGPT plan) | Built in Claude Code as |
|---|---|
| The OS kernel / "never skip ahead" laws | **CLAUDE.md** (constitution) + **hooks** (enforcement) |
| System 1 — Organization (workspace → tasks) | **State files** + folder structure (the ledger) |
| System 2 — Discovery Engine (acts like a CTO) | `discovery` **subagent** + `/discover` **skill** |
| System 3 — PRD Generator | `prd` subagent + `/plan` skill |
| System 4 — Architecture Generator | `architect` subagent + `/architect` skill |
| System 5 — Blueprint Generator (per feature) | `blueprint` subagent + `/blueprint` skill |
| System 6 — Prompt Factory | `prompt-factory` subagent + `/promptpack` skill |
| System 7 — Build Orchestrator | `/next` + `/execute` skills (the main thread sequences) |
| System 8 — AI Validator | `validator` subagent + `/validate` skill + **DoD hook** |
| System 9 — Project Timeline | `planner` subagent + `/status` skill + state files |
| System 10 — Knowledge Engine | `knowledge` subagent + the **Bibles** (skills) |
| System 11 — Reusable Assets | the **plugin** itself + asset libraries |
| System 12 — Launch Center | `/ship` skill + launch-checklist hook |
| "No Done button" (completion is *earned*) | a **Stop/PreToolUse hook** that runs the DoD check and blocks with exit code 2 |
| "Reuse across all future projects" | package everything as a **plugin**, install with one command |

**Nothing in your vision is lost. All of it gets simpler and actually buildable.** And notice the bridge to what you already have: your GrowrixOS HTML pipeline is *Research → Planning → Design → Build → QA*. The SaaS OS is the same DNA, just more phases because full-stack apps have more moving parts.

---

## 2. The lifecycle (the spine of the whole system)

Every project — no matter the type — walks this line. Each phase has prerequisites (can't start until the previous is approved) and a Definition of Done (objective completion, no guessing).

```
Discover → Plan → Specify → Architect → Generate Bluebook → Generate Prompt Packs
   → Execute → Validate → Test → Deploy → Launch → Operate → Improve
```

The cure for "what do I do next?" is mechanical: **the current phase + the state files always determine the next task.** You never decide; you ask `/next` and the system reads where you are and tells you the one approved next step.

---

## 3. Repo / plugin structure (every file, with its job)

This is the whole OS on disk. Build it as a git repo named `saas-creator-os`, then install it as a plugin into each product project.

```
saas-creator-os/                      ← the plugin (install once, reuse forever)
├─ .claude-plugin/
│  └─ plugin.json                     ← plugin manifest (name, version, components)
│
├─ agents/                            ← the specialists (subagents)
│  ├─ discovery.md                    ← interrogates the idea like a CTO
│  ├─ prd.md                          ← writes the PRD
│  ├─ architect.md                    ← folder structure, DB, API, infra
│  ├─ blueprint.md                    ← per-feature spec + DoD + prompt pack
│  ├─ prompt-factory.md               ← turns a feature into phase prompts
│  ├─ validator.md                    ← checks a feature against its DoD → PASS/FAIL
│  ├─ planner.md                      ← timeline, milestones, burn-down
│  └─ knowledge.md                    ← captures lessons, updates the Bibles
│
├─ skills/                            ← the procedures you (or Claude) invoke
│  ├─ discover/SKILL.md               ← /discover  "<idea>"
│  ├─ plan/SKILL.md                   ← /plan      (PRD + roadmap)
│  ├─ architect/SKILL.md              ← /architect
│  ├─ blueprint/SKILL.md              ← /blueprint <feature>
│  ├─ promptpack/SKILL.md             ← /promptpack <feature>
│  ├─ next/SKILL.md                   ← /next      ← the anti-lost command
│  ├─ execute/SKILL.md                ← /execute   <task>
│  ├─ validate/SKILL.md               ← /validate  <feature>
│  ├─ approve/SKILL.md                ← /approve   <feature> (records human sign-off)
│  ├─ status/SKILL.md                 ← /status    (progress + what's left)
│  ├─ ship/SKILL.md                   ← /ship      (launch checklist)
│  └─ bibles/                         ← the Knowledge Library (loaded on demand)
│     ├─ auth-bible/SKILL.md
│     ├─ database-bible/SKILL.md
│     ├─ stripe-bible/SKILL.md
│     ├─ nextjs-bible/SKILL.md
│     ├─ supabase-bible/SKILL.md
│     ├─ testing-bible/SKILL.md
│     ├─ devops-bible/SKILL.md
│     └─ … (one per discipline, grown over time)
│
├─ hooks/                             ← the auto-enforcement scripts
│  ├─ resume.sh                       ← SessionStart: load state, print "you are here"
│  ├─ inject-phase.sh                 ← UserPromptSubmit: remind Claude of current phase
│  ├─ check.sh                        ← PostToolUse: typecheck + lint after every edit
│  └─ dod-gate.sh                     ← Stop: block "done" until DoD = 100% + approved
│
├─ blueprints/                        ← project-TYPE variants (the workflow per build kind)
│  ├─ marketing-site.yaml
│  ├─ saas-platform.yaml
│  ├─ ai-saas.yaml
│  ├─ ecommerce.yaml
│  ├─ marketplace.yaml
│  └─ mobile-app.yaml
│
├─ templates/                         ← boilerplate (Next.js setup, Supabase, Stripe…)
├─ libraries/                         ← reusable assets harvested from finished projects
└─ settings.json                      ← registers the hooks

# …and inside each ACTUAL product you build:
my-product/
├─ CLAUDE.md                          ← the kernel (laws) for this project
└─ state/                             ← this project's live ledger
   ├─ project.yaml                    ← idea, type, deadline, current phase
   ├─ backlog.yaml                    ← ordered features/tasks
   ├─ features/<name>.yaml            ← per-feature DoD + status + approval
   └─ progress.json                   ← computed % complete, burn-down
```

---

## 4. The kernel — `CLAUDE.md` (the constitution)

This is the most important single file. It loads every session and never gets forgotten. Keep it short and absolute. Sketch:

```markdown
# SaaS Creator OS — Operating Laws

## Identity
You are operating inside the SaaS Creator OS. You do not freelance.
You execute the approved lifecycle. Mohammad is the visual validator.

## The lifecycle (never skip, never reorder)
Discover → Plan → Specify → Architect → Bluebook → Prompt Packs →
Execute → Validate → Test → Deploy → Launch → Operate → Improve.

## Source of truth
`state/project.yaml` and `state/backlog.yaml` define WHERE we are and WHAT'S NEXT.
Read them before acting. Never invent the next task — derive it from state.

## Hard rules
1. Never start a phase whose prerequisites are not "approved" in state.
2. A feature is COMPLETE only when its DoD = 100% AND human approval is recorded.
   There is no "done" by assertion. The dod-gate hook enforces this.
3. After any code edit, the check hook runs typecheck + lint. Fix failures before moving on.
4. When unsure what to do, run /next. Do not guess.
5. Explain choices in plain language (Mohammad is a hands-on builder, not a jargon machine).

## Conventions
- Stack: Next.js (App Router) · TypeScript (strict) · Tailwind · shadcn/ui ·
  Supabase/Postgres · Prisma · Clerk · TanStack Query · Zustand.
- Engines (pure logic) live in packages/core, fully unit-tested.
- Real data only. No mock/placeholder unless a state file explicitly says "stub".
```

> Plain-language note: think of `CLAUDE.md` as the company handbook that every new specialist reads on day one and keeps on their desk forever.

---

## 5. The specialists — subagents (with real frontmatter)

Each subagent is a markdown file in `agents/`. The top part (between `---`) is settings; the body is its job description. Two examples that show the pattern:

**The Discovery agent** (your "CTO that interrogates the idea"):
```markdown
---
name: discovery
description: Interrogates a new product idea like a senior CTO and produces vision, users, business model, risks, competitors, and success metrics. Use at the very start of a project.
tools: Read, Write, WebSearch, WebFetch
model: sonnet
---
You are a senior CTO running product discovery. Ask one question at a time about:
users, business model, geography, payments, roles, mobile, admin, AI, compliance.
When you have enough, write the answers into state/project.yaml under `discovery:`.
Never write code. Never skip to solutions.
```

**The Validator** (your "no Done button" enforcer — runs read-only checks):
```markdown
---
name: validator
description: Verifies a single feature against its Definition of Done. Use after a feature is built and before it can be marked complete. Returns PASS or FAIL with specific reasons.
tools: Read, Grep, Glob, Bash
model: sonnet
---
You are the DoD Validator. Read state/features/<feature>.yaml.
For each DoD item, verify it concretely (file exists, route resolves, types compile,
test passes, RLS present). Mark each item done:true/false with evidence.
Output a single verdict: PASS only if every item is true, else FAIL with the gaps.
You may run read-only commands. You may NOT edit code.
```

The same pattern produces `prd`, `architect`, `blueprint`, `prompt-factory`, `planner`, and `knowledge`. **Why subagents and not just one big Claude?** Each gets a clean, separate memory, so the architect doesn't get distracted by the validator's logs, and your main conversation stays focused. That isolation is the whole point.

---

## 6. The procedures — skills (your control surface)

Skills are what you type. The two that carry the most weight:

**`/next` — the cure for "what do I do next?":**
```markdown
---
name: next
description: Tells me the single next approved task based on the blueprint and current state. Use whenever I'm unsure what to do next.
---
1. Read state/project.yaml (current phase) and state/backlog.yaml (ordered tasks).
2. Find the first task whose prerequisites are all "approved".
3. Output ONLY that one task: its name, why it's next, what "done" means for it,
   and which skill to run to do it (e.g. /blueprint, /execute, /validate).
Do not list everything. One next step. That's the job.
```

**`/validate` — gate a feature:**
```markdown
---
name: validate
description: Runs the DoD validator on a feature and updates its state file.
argument-hint: <feature-name>
---
Invoke the `validator` subagent on $ARGUMENTS. Write the per-item results back to
state/features/$ARGUMENTS.yaml. If PASS, tell me to run /approve. If FAIL, list the
exact gaps and which /execute step fixes each.
```

The rest (`/discover`, `/plan`, `/architect`, `/blueprint`, `/promptpack`, `/execute`, `/approve`, `/status`, `/ship`) follow the same shape: a short instruction that calls the right subagent and reads/writes the right state file.

**The Bibles** (`skills/bibles/*`) are special: they're knowledge skills with rich bodies (the standard, the checklist, common mistakes, how Stripe/Linear/GitHub do it, and a prompt pack). They load *only when relevant* — when you build auth, Claude pulls `auth-bible` automatically because its description matches. This keeps context lean and your expertise consistent every single time.

---

## 7. The enforcement — hooks (this is what makes it an *engine*, not a doc)

Hooks are scripts that fire automatically. They're registered in `settings.json`:

```json
{
  "hooks": {
    "SessionStart":     [{ "hooks": [{ "type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/hooks/resume.sh" }] }],
    "UserPromptSubmit": [{ "hooks": [{ "type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/hooks/inject-phase.sh" }] }],
    "PostToolUse":      [{ "matcher": "Write|Edit", "hooks": [{ "type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/hooks/check.sh", "timeout": 180 }] }],
    "Stop":             [{ "hooks": [{ "type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/hooks/dod-gate.sh" }] }]
  }
}
```

What each one does, in plain words — and why it kills a specific failure mode:

| Hook | When it fires | What it does | Pain it kills |
|------|--------------|--------------|---------------|
| `resume.sh` (SessionStart) | Every time you open the project | Reads `state/project.yaml`, prints "**You are here:** Phase 6 / feature: auth / next: build RLS" | "Projects never end" — you resume in 5 seconds, never re-orient from scratch |
| `inject-phase.sh` (UserPromptSubmit) | Every message you send | Quietly prepends the current phase + next task so Claude never drifts off-plan | The AI wandering ahead / off-track |
| `check.sh` (PostToolUse) | After every file write | Runs `tsc --noEmit` + lint; feeds failures back to Claude to fix now | Silent broken code piling up |
| `dod-gate.sh` (Stop) | When Claude tries to finish | Reads the active feature's DoD; if it's not 100% + human-approved, **exits with code 2** to block "done" | The "fake done" problem — completion must be *earned* |

> The magic number is **exit code 2**: when a hook exits with 2, Claude Code treats it as a hard stop and obeys it every time. That's how "there is no Done button" becomes real instead of a slogan.

---

## 8. The ledger — state files (your database, as plain files)

No server, no Supabase needed for the OS itself. Progress lives in version-controlled files. A feature looks like this:

```yaml
# state/features/auth.yaml
feature: authentication
phase: execute
status: in_progress
prerequisites: [architecture_approved, db_schema_approved]
dod:
  - id: db_schema        ; done: true   ; evidence: prisma/schema.prisma:User
  - id: clerk_wired      ; done: true   ; evidence: middleware.ts
  - id: protected_routes ; done: false  ; evidence: ""
  - id: rls_policies     ; done: false  ; evidence: ""
  - id: tests_pass       ; done: false  ; evidence: ""
  - id: a11y_focus       ; done: false  ; evidence: ""
prompt_pack: prompts/auth/      # the copy-paste prompts for Cursor/Codex
approved_by_human: false
```

`progress.json` is computed from all the feature files: % complete, what's blocked, burn-down against the deadline in `project.yaml`. `/status` just renders this. **Because it's all files, every project's full history is in git** — and your "knowledge engine" (System 10) is just the `knowledge` subagent appending lessons to the right Bible after each project.

---

## 9. Project-type variants (different workflow per build kind)

Your insight that a marketing site ≠ a SaaS ≠ ecommerce is handled by **lifecycle manifests** in `blueprints/`. Each one says which phases and modules apply, so the OS adapts:

```yaml
# blueprints/marketing-site.yaml
phases: [Discover, Plan, Architect, Execute, Validate, Test, Deploy, Launch]
modules: [pages, seo, analytics, contact-form, cms-lite]
skip: [billing, rbac, realtime, ai]          # not needed → never asked about
```
```yaml
# blueprints/ai-saas.yaml
phases: [all]
modules: [auth, rbac, billing, database, storage, ai-rag, dashboard, admin, notifications]
bibles: [auth, database, stripe, ai, supabase, testing, devops]
```

At `/discover`, the discovery agent picks the manifest, so an AI SaaS gets the billing + RAG phases and a marketing site doesn't waste your time on them. **One OS, many workflows** — exactly what you asked for.

---

## 10. Packaging for reuse — the plugin (this is the "minimize pain forever" part)

Once the folders above exist, wrap them with a manifest:

```json
// .claude-plugin/plugin.json
{
  "name": "saas-creator-os",
  "version": "0.1.0",
  "description": "AI development operating system: idea → launch, with enforced lifecycle.",
  "agents": "./agents",
  "skills": "./skills",
  "hooks": "./settings.json"
}
```

Push to a git repo. Now in *any* new product, you run `/plugin` to install it, type `/discover "<my idea>"`, and the entire OS — agents, skills, hooks, Bibles — is there. **You build the OS once. Every future project inherits it.** Improvements you make flow to all projects on the next install. That is the leverage you were reaching for.

---

## 11. The human's job (just 4 things, exactly as you wanted)

Everything else is generated. You only ever:

1. **Answer business questions** → during `/discover`.
2. **Look at the output** → visual validation (plan mode shows you the plan before any code runs).
3. **Approve or reject** → `/approve <feature>` records your sign-off (and only then does the DoD gate open).
4. **Trigger deploy/launch** → `/ship`.

The system never asks *"what do you want to build next?"* It asks *"here is the next approved task — go?"*

---

## 12. Build roadmap for the OS itself (minimal-first — don't over-build the meta-tool)

Resist the urge to build all 12 systems at once. Build the **anti-lost core** first; it already fixes 80% of your pain in ~3 days. Expand only as each piece earns its keep.

| Stage | Time | Build | Payoff |
|-------|------|-------|--------|
| **0** | ½ day | Repo + `plugin.json` + `CLAUDE.md` kernel + empty `state/` model | foundation |
| **1** | 2–3 days | `/discover`, `/plan`, `/next`, `/status` + `resume.sh` hook | **You can never be "lost" again. Resume any project in seconds.** ← ship this first |
| **2** | 3–4 days | `architect`, `blueprint`, `prompt-factory` agents + their skills | one idea → full plan → copy-paste prompt packs |
| **3** | 2–3 days | `validator` + `dod-gate.sh` + `check.sh` hooks | **"No Done button" is now enforced, not hoped for** |
| **4** | ongoing | Bibles (`auth`, `database`, `stripe`, …) — add one each time you hit that topic | consistent expertise, compounding |
| **5** | 2–3 days | project-type manifests + `libraries/` + finalize as installable plugin | reuse across every future project |
| **6** | later | the HTML "Bluebook" dashboard that *renders* `state/` as a website | the visual cockpit you originally pictured — but as a *read-out of a working engine*, not a thing you maintain by hand |

> Stage 6 is where your original "build it as a website" idea comes back — correctly. The website becomes a **window into the OS's state files**, generated from real data, instead of a giant app you hand-maintain. Build the engine first; the dashboard is a weekend project on top.

---

## 13. Prove it on a real project (dogfood)

Don't test the OS on a toy. Point it at the **DSE halal-investing platform** from your other plan:

```
/discover "DSE-native halal investing tracker — portfolio P&L, Shariah status, junk-stock guardrails"
/plan          → PRD + roadmap written to state/
/architect     → folder structure + Prisma schema + n8n workflow plan
/blueprint portfolio-import   → spec + DoD + prompt pack for the sheet importer
/next          → "build the P&L engine in packages/core"
/execute …     → you paste the prompt pack into Cursor/Claude Code; build
/validate portfolio-import    → PASS/FAIL against DoD
/approve portfolio-import     → sign off; /next unlocks the Shariah overlay
```

By the time that app is built, the OS has been battle-tested *and* you've shipped a real product. Two birds.

---

## 14. First commit (do this today)

1. `mkdir saas-creator-os && cd saas-creator-os && git init`
2. Create `.claude-plugin/plugin.json` and the `CLAUDE.md` kernel from §4.
3. Create `state/project.yaml` with one field: `phase: discover`.
4. Write **four** files: `skills/discover/SKILL.md`, `skills/next/SKILL.md`, `skills/status/SKILL.md`, and `hooks/resume.sh`.
5. Open a test project, install the plugin, run `/discover "anything"`, then `/next`.

The moment `/next` answers correctly from your state file, the core of the operating system is alive — and you have a starting point and an ending point for every project you build from here on.

---

### The principle to keep
You were about to build a cathedral (a 12-system platform) to solve a navigation problem ("what's next?"). The navigation problem is solved by **state files + `/next` + a resume hook** — three small things. Build those first. Let the cathedral assemble itself, one earned stage at a time, on top of an engine that already works.
