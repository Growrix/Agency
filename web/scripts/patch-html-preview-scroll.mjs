import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dirs = [
  "shop/html-template-websites",
  "public/previews/html-template-websites",
];

const replacements = [
  [/window\.scrollTo\(\{top:0,behavior:'smooth'\}\)/g, "window.self===window.top&&window.scrollTo({top:0,behavior:'smooth'})"],
  [/window\.scrollTo\(\{top:0, behavior:'smooth'\}\)/g, "window.self===window.top&&window.scrollTo({top:0,behavior:'smooth'})"],
  [/window\.scrollTo\(0, 0\)/g, "window.self===window.top&&window.scrollTo(0,0)"],
  [/window\.scrollTo\(\{top:0\}\)/g, "window.self===window.top&&window.scrollTo({top:0})"],
];

let patched = 0;

for (const dir of dirs) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) {
    continue;
  }

  for (const file of fs.readdirSync(full)) {
    if (!file.endsWith(".html")) {
      continue;
    }

    const filePath = path.join(full, file);
    let content = fs.readFileSync(filePath, "utf8");
    let changed = false;

    for (const [pattern, replacement] of replacements) {
      const next = content.replace(pattern, replacement);
      if (next !== content) {
        content = next;
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      patched += 1;
      console.log(`patched ${path.relative(root, filePath)}`);
    }
  }
}

const shopTemplatesDir = path.join(root, "shop/html-template-websites");
const previewTemplatesDir = path.join(root, "public/previews/html-template-websites");
let synced = 0;

if (fs.existsSync(shopTemplatesDir)) {
  fs.mkdirSync(previewTemplatesDir, { recursive: true });

  for (const file of fs.readdirSync(shopTemplatesDir)) {
    if (!file.endsWith(".html")) {
      continue;
    }

    const sourcePath = path.join(shopTemplatesDir, file);
    const destinationPath = path.join(previewTemplatesDir, file);
    fs.copyFileSync(sourcePath, destinationPath);
    synced += 1;
  }
}

console.log(`total patched files: ${patched}`);
console.log(`total synced preview files: ${synced}`);
