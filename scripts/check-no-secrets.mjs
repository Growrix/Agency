/**
 * Fail CI / local checks if high-risk secret patterns appear in git-tracked files.
 * Scans `git ls-files` only (working tree + index tracked paths).
 *
 * Usage: node scripts/check-no-secrets.mjs
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const DENY_PATTERNS = [
  {
    id: "resend_live_key",
    re: /\bre_[A-Za-z0-9]{20,}\b/g,
    allow: [/re_example\b/, /re_test\b/, /re_xxxxxxxx\b/, /re_YOUR_/i, /re_\.{3}/],
  },
  {
    id: "openai_sk_proj",
    re: /\bsk-proj-[A-Za-z0-9_-]{20,}\b/g,
    allow: [/sk-proj-\.{3}/, /sk-proj-YOUR_/i],
  },
  {
    id: "openai_sk",
    re: /\bsk-[A-Za-z0-9]{20,}\b/g,
    allow: [/sk-proj-/, /sk_test_/, /sk_live_/, /sk-example/i, /sk-YOUR_/i],
  },
  {
    id: "clerk_secret",
    re: /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/g,
    allow: [/sk_test_fake\b/, /sk_test_checkout_/, /sk_test_portal_/, /sk_test_webhook_/, /sk_test_1234567890\b/, /sk_live_…/, /sk_test_…/],
  },
  {
    id: "supabase_db_url_with_password",
    re: /postgresql:\/\/[^:\s]+:[^@\s]+@/gi,
    allow: [
      /\[YOUR-PASSWORD\]/i,
      /\[password\]/i,
      /:password@/i,
      /:YOUR_PASSWORD@/i,
      /:\[PASSWORD\]@/i,
      /:<password>@/i,
      /:<YOUR-PASSWORD>@/i,
    ],
  },
  {
    id: "supabase_publishable_literal",
    re: /\bsb_publishable_[A-Za-z0-9_]{20,}\b/g,
    allow: [/sb_publishable_YOUR_/i, /sb_publishable_xxx/i],
  },
  {
    id: "supabase_secret_literal",
    re: /\bsb_secret_[A-Za-z0-9_]{10,}\b/g,
    allow: [/sb_secret_YOUR_/i, /sb_secret_xxx/i],
  },
  {
    id: "google_maps_aiza",
    re: /\bAIza[0-9A-Za-z_-]{30,}\b/g,
    allow: [/AIzaSyXXXXXXXX/i, /AIzaSyYOUR_/i],
  },
  {
    id: "jwt_like",
    re: /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g,
    allow: [/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.\.\./],
  },
  {
    id: "authorization_bearer_secret",
    re: /Authorization:\s*Bearer\s+(?!\$)(?!\<)[A-Za-z0-9_\-.]{16,}/gi,
    allow: [/Bearer\s+YOUR_/i, /Bearer\s+<[^>]+>/, /Bearer\s+\$\{?RESEND/i],
  },
];

const SKIP_PATH_PREFIXES = [
  "VSCODE AGENTS/",
  "Frontend_Nextjs/",
  "sites/",
  "AI-BOS/mcp/",
  "node_modules/",
  "Ongoing DOCS/Pingdom tests/",
];

const SKIP_BASENAMES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "check-no-secrets.mjs",
]);

function isSkipped(relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  if (SKIP_BASENAMES.has(path.basename(normalized))) return true;
  return SKIP_PATH_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

function isAllowed(match, allowList) {
  return allowList.some((re) => re.test(match));
}

function listTrackedFiles() {
  const out = execSync("git ls-files -z", { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  return out.split("\0").filter(Boolean);
}

const findings = [];
const files = listTrackedFiles().filter((f) => !isSkipped(f));

for (const rel of files) {
  const abs = path.join(root, rel);
  let content;
  try {
    content = fs.readFileSync(abs, "utf8");
  } catch {
    continue;
  }
  // Skip binary-ish
  if (content.includes("\u0000")) continue;

  for (const rule of DENY_PATTERNS) {
    rule.re.lastIndex = 0;
    let m;
    while ((m = rule.re.exec(content)) !== null) {
      const hit = m[0];
      if (isAllowed(hit, rule.allow)) continue;
      const line = content.slice(0, m.index).split(/\r?\n/).length;
      findings.push({
        file: rel,
        line,
        rule: rule.id,
        sample: hit.length > 24 ? `${hit.slice(0, 12)}…${hit.slice(-4)}` : hit,
      });
    }
  }
}

if (findings.length > 0) {
  console.error("Secret scan FAILED — potential credentials in tracked files:\n");
  for (const f of findings) {
    console.error(`  [${f.rule}] ${f.file}:${f.line}  (${f.sample})`);
  }
  console.error("\nRemove secrets, use placeholders, keep real values in Vercel / .env.local only.");
  process.exit(1);
}

console.log(`Secret scan passed (${files.length} tracked files scanned).`);
