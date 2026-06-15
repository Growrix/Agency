#!/usr/bin/env node
/**
 * Parse a single-file HTML template and emit a migration inventory.
 * Usage: node scripts/migration/inventory-html.mjs <source.html> [--out path.json]
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, basename, resolve } from 'node:path';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
let outPath = null;
if (outIdx !== -1) {
  outPath = args[outIdx + 1];
  args.splice(outIdx, 2);
}

const sourcePath = args[0];
if (!sourcePath) {
  console.error('Usage: node inventory-html.mjs <source.html> [--out migration-map.json]');
  process.exit(1);
}

const html = readFileSync(resolve(sourcePath), 'utf8');
const fileName = basename(sourcePath);

const serialMatch = fileName.match(/^(\d+)\.\s+([a-z0-9-]+)-website\.html$/i);
const serial = serialMatch ? serialMatch[1].padStart(2, '0') : null;
const siteName = serialMatch ? serialMatch[2] : null;
const targetFolder = serial && siteName ? `${serial}-${siteName}` : null;

const sectionRegex = /<!--\s*=+\s*SECTION:\s*(.+?)\s*=+\s*-->/g;
const sections = [];
let m;
while ((m = sectionRegex.exec(html)) !== null) {
  sections.push({ name: m[1].trim(), index: m.index });
}

const routeRegex = /data-route="([^"]+)"/g;
const routes = [...new Set([...html.matchAll(routeRegex)].map((r) => r[1]))].sort();

const initRegex = /function\s+(init[A-Z][a-zA-Z0-9_]*)\s*\(/g;
const inits = [...new Set([...html.matchAll(initRegex)].map((r) => r[1]))].sort();

const dataArrayRegex = /var\s+([A-Z][A-Z0-9_]*)\s*=\s*(\[|\{)/g;
const dataArrays = [...new Set([...html.matchAll(dataArrayRegex)].map((r) => r[1]))].sort();

const tokenBlockMatch = html.match(/:root\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
const darkBlockMatch = html.match(/\[data-theme="dark"\]\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);

function parseTokens(block) {
  if (!block) return {};
  const tokens = {};
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let t;
  while ((t = re.exec(block)) !== null) {
    tokens[`--${t[1]}`] = t[2].trim();
  }
  return tokens;
}

const lightTokens = parseTokens(tokenBlockMatch ? tokenBlockMatch[1] : '');
const darkTokens = parseTokens(darkBlockMatch ? darkBlockMatch[1] : '');

const routeToPath = (route) => {
  if (route === 'home') return '/';
  if (route === '404') return '/not-found';
  if (route === 'blog-article') return '/blog/[slug]';
  if (route === 'case-study') return '/case-studies/[slug]';
  return `/${route}`;
};

const inventory = {
  source: sourcePath,
  fileName,
  targetFolder,
  targetPath: targetFolder ? `Frontend_Nextjs/${targetFolder}/` : null,
  generatedAt: new Date().toISOString(),
  sections: sections.map((s) => ({
    name: s.name,
    suggestedComponent: s.name.replace(/\s+/g, ''),
  })),
  routes: routes.map((r) => ({ htmlRoute: r, nextPath: routeToPath(r) })),
  initFunctions: inits.map((fn) => ({
    html: fn,
    suggestedHook: fn.replace(/^init/, 'use'),
  })),
  contentExtractions: dataArrays.map((name) => ({
    htmlVariable: name,
    suggestedFile: `content/${name.toLowerCase().replace(/_/g, '-')}.json`,
  })),
  designTokens: {
    lightCount: Object.keys(lightTokens).length,
    darkCount: Object.keys(darkTokens).length,
    light: lightTokens,
    dark: darkTokens,
  },
};

const json = JSON.stringify(inventory, null, 2);

if (outPath) {
  mkdirSync(dirname(resolve(outPath)), { recursive: true });
  writeFileSync(resolve(outPath), json, 'utf8');

  const mdPath = outPath.replace(/\.json$/i, '.md');
  const md = `# Migration Map

Source: \`${sourcePath}\`
Target: \`${inventory.targetPath ?? 'unknown'}\`
Generated: ${inventory.generatedAt}

## Routes (${routes.length})

${inventory.routes.map((r) => `- \`${r.htmlRoute}\` → \`${r.nextPath}\``).join('\n')}

## Sections (${sections.length})

${inventory.sections.map((s) => `- ${s.name} → \`components/sections/${s.suggestedComponent}.tsx\``).join('\n')}

## Init functions (${inits.length})

${inventory.initFunctions.map((i) => `- \`${i.html}\` → \`${i.suggestedHook}\``).join('\n')}

## Content extractions (${dataArrays.length})

${inventory.contentExtractions.map((c) => `- \`${c.htmlVariable}\` → \`${c.suggestedFile}\``).join('\n')}

## Design tokens

Light: ${Object.keys(lightTokens).length} | Dark: ${Object.keys(darkTokens).length}

## Next steps

- Run \`classify-routes.mjs\` for interactive vs prose routes
- Run \`extract-component-css.mjs\` for BEM component CSS port
- Run \`extract-icons.mjs\` for SVG icon manifest
`;
  writeFileSync(mdPath, md, 'utf8');
  console.log(`Wrote ${outPath}`);
  console.log(`Wrote ${mdPath}`);
} else {
  console.log(json);
}
