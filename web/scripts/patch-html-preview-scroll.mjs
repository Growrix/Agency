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

const shopVolt = path.join(root, "shop/html-template-websites/08-VoltCorePower.html");
const previewVolt = path.join(root, "public/previews/html-template-websites/08-VoltCorePower.html");

if (fs.existsSync(shopVolt)) {
  fs.copyFileSync(shopVolt, previewVolt);
  console.log(`synced preview ${path.relative(root, previewVolt)}`);
}

console.log(`total patched files: ${patched}`);
