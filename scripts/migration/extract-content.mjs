#!/usr/bin/env node
/** Extract JS data arrays from HTML into content JSON files for Next.js migration. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const [htmlPath, outDir] = process.argv.slice(2);
if (!htmlPath || !outDir) {
  console.error('Usage: node extract-content.mjs <source.html> <output-content-dir>');
  process.exit(1);
}

const html = readFileSync(resolve(htmlPath), 'utf8');
mkdirSync(resolve(outDir), { recursive: true });
mkdirSync(resolve(outDir, 'pages'), { recursive: true });

function extractVar(name) {
  const re = new RegExp(`var\\s+${name}\\s*=\\s*(\\[[\\s\\S]*?\\]|\\{[\\s\\S]*?\\});`);
  const m = html.match(re);
  if (!m) return null;
  try {
    return Function(`"use strict"; return (${m[1]});`)();
  } catch (e) {
    console.warn(`Failed to parse ${name}:`, e.message);
    return null;
  }
}

const mappings = [
  ['BLOG', 'blog.json'],
  ['CASES', 'case-studies.json'],
  ['STATES', 'states.json'],
];

for (const [varName, fileName] of mappings) {
  const data = extractVar(varName);
  if (data) {
    const path = resolve(outDir, fileName);
    writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Wrote ${path}`);
  }
}

console.log('Done.');
