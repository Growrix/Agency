import fs from "node:fs";
import path from "node:path";

/**
 * Injects a noindex/nofollow robots meta tag into every standalone preview HTML
 * document so the ~94 fictional-brand template files never compete with real
 * product pages in search results. Also neutralizes leftover example.com
 * canonicals from demo templates. Safe to re-run: it skips files already tagged.
 */

const root = process.cwd();
const targets = [
  "public/previews",
  "shop/html-template-websites",
];

const ROBOTS_META = '<meta name="robots" content="noindex,nofollow"/>';

function collectHtmlFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) {
    return files;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(full);
    }
  }

  return files;
}

let injected = 0;
let canonicalsStripped = 0;
let skipped = 0;

for (const target of targets) {
  for (const filePath of collectHtmlFiles(path.join(root, target))) {
    let content = fs.readFileSync(filePath, "utf8");
    let changed = false;

    // Drop demo canonicals that point at placeholder domains.
    const canonicalPattern = /\s*<link[^>]+rel=["']canonical["'][^>]*example\.com[^>]*>/gi;
    if (canonicalPattern.test(content)) {
      content = content.replace(canonicalPattern, "");
      canonicalsStripped += 1;
      changed = true;
    }

    if (!/<meta[^>]+name=["']robots["']/i.test(content)) {
      const headMatch = /<head[^>]*>/i.exec(content);
      if (headMatch) {
        const insertAt = headMatch.index + headMatch[0].length;
        content = `${content.slice(0, insertAt)}\n${ROBOTS_META}${content.slice(insertAt)}`;
        injected += 1;
        changed = true;
      }
    } else {
      skipped += 1;
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
    }
  }
}

console.log(`robots meta injected: ${injected}`);
console.log(`canonicals stripped: ${canonicalsStripped}`);
console.log(`already tagged (skipped): ${skipped}`);
