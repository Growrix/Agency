/**
 * Ops smoke: validate RESEND_API_KEY + send a test email.
 * Loads web/.env.local then root .env (no values printed).
 *
 * Usage:
 *   node scripts/verify-resend.mjs
 *   node scripts/verify-resend.mjs --send
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const send = process.argv.includes("--send");

function loadEnvFile(filePath, into) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in into)) into[key] = value;
  }
}

const env = {};
loadEnvFile(path.join(root, "web", ".env.local"), env);
loadEnvFile(path.join(root, ".env"), env);

const key = env.RESEND_API_KEY || "";
const from = env.CONTACT_FROM_EMAIL || "";
const toRaw = env.CONTACT_TO_EMAIL || "";
const to = toRaw
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function mask(value) {
  if (!value) return "(empty)";
  if (value.length <= 6) return "***";
  return `${value.slice(0, 4)}…(len=${value.length})`;
}

console.log("RESEND_API_KEY:", mask(key));
console.log("CONTACT_FROM_EMAIL:", from || "(empty)");
console.log("CONTACT_TO_EMAIL:", to.length ? to.join(", ") : "(empty)");

if (!key) {
  console.error("FAIL: RESEND_API_KEY missing");
  process.exit(1);
}

const domainsRes = await fetch("https://api.resend.com/domains", {
  headers: { Authorization: `Bearer ${key}` },
});
const domainsText = await domainsRes.text();
if (!domainsRes.ok) {
  console.error(`FAIL: domains probe HTTP ${domainsRes.status} ${domainsText}`);
  process.exit(1);
}

const domainsJson = JSON.parse(domainsText);
const domains = (domainsJson.data || []).map((d) => `${d.name}:${d.status}`);
console.log("domains:", domains.join(", ") || "(none)");

if (!send) {
  console.log("Auth OK. Re-run with --send to deliver a test email.");
  process.exit(0);
}

if (!from || to.length === 0) {
  console.error("FAIL: CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL required for --send");
  process.exit(1);
}

const sendRes = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to,
    subject: `[Growrixos] Resend verify ${new Date().toISOString()}`,
    html: "<p>verify-resend.mjs smoke — delivery OK if you received this.</p>",
  }),
});
const sendText = await sendRes.text();
if (!sendRes.ok) {
  console.error(`FAIL: send HTTP ${sendRes.status} ${sendText}`);
  process.exit(1);
}

console.log("send OK:", sendText);
process.exit(0);
