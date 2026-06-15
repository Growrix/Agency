#!/usr/bin/env node
/** Inventory inline SVG patterns in HTML for icon component extraction */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const args = process.argv.slice(2);
const manifestIdx = args.indexOf('--manifest');
let manifestPath = null;
if (manifestIdx !== -1) {
  manifestPath = args[manifestIdx + 1];
  args.splice(manifestIdx, 2);
}

const sourcePath = args[0];
if (!sourcePath) {
  console.error('Usage: node extract-icons.mjs <source.html> [--manifest icons.json]');
  process.exit(1);
}

const html = readFileSync(resolve(sourcePath), 'utf8');
const svgRegex = /<svg[\s\S]*?<\/svg>/gi;
const svgs = [];
let m;
while ((m = svgRegex.exec(html)) !== null) {
  const svg = m[0].replace(/\s+/g, ' ').trim();
  if (svg.length > 8000) continue;
  svgs.push(svg);
}

const counts = new Map();
for (const svg of svgs) {
  const key = svg.slice(0, 120);
  counts.set(key, { svg, count: (counts.get(key)?.count || 0) + 1 });
}

const sorted = [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 40);

const suggested = [
  { name: 'IconCheck', pattern: 'm5 13 4 4L19 7' },
  { name: 'IconStar', pattern: 'M12 2l2.9 6.9H22' },
  { name: 'IconPhone', pattern: 'M22 16.9v3a2' },
  { name: 'IconSun', pattern: 'circle cx="12" cy="12" r="4"' },
  { name: 'IconMenu', pattern: 'M3 6h18M3 12h18' },
  { name: 'IconClose', pattern: 'M18 6 6 18M6 6l12 12' },
  { name: 'BrandMark', pattern: 'viewBox="0 0 32 32"' },
];

const manifest = {
  source: sourcePath,
  totalSvgInstances: svgs.length,
  uniquePatterns: sorted.length,
  topPatterns: sorted.map((s, i) => ({ id: i + 1, count: s.count, preview: s.svg.slice(0, 80) })),
  suggestedComponents: suggested,
};

const json = JSON.stringify(manifest, null, 2);
if (manifestPath) {
  mkdirSync(dirname(resolve(manifestPath)), { recursive: true });
  writeFileSync(resolve(manifestPath), json, 'utf8');
  console.log(`Wrote ${manifestPath}`);
} else {
  console.log(json);
}
