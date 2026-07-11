#!/usr/bin/env node
/**
 * Cross-framework conversion inventory generator.
 * Usage: node scripts/conversion/inventory-source.mjs <sourcePath> --track C|D|E [--out <file.json>]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname, relative, resolve } from 'path';

const args = process.argv.slice(2);
const sourcePath = args[0];
const trackIdx = args.indexOf('--track');
const outIdx = args.indexOf('--out');
const track = trackIdx >= 0 ? args[trackIdx + 1] : 'C';
const outPath = outIdx >= 0 ? args[outIdx + 1] : null;

if (!sourcePath) {
  console.error('Usage: node inventory-source.mjs <sourcePath> --track C|D|E [--out file.json]');
  process.exit(1);
}

const root = resolve(sourcePath);
if (!existsSync(root)) {
  console.error(`Source not found: ${root}`);
  process.exit(1);
}

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (name === 'node_modules' || name === '.git' || name === 'dist' || name === '.next') continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const allFiles = walk(root);
const tsx = allFiles.filter((f) => ['.tsx', '.jsx'].includes(extname(f)));
const css = allFiles.filter((f) => ['.css', '.scss'].includes(extname(f)));
const hasVite = allFiles.some((f) => f.endsWith('vite.config.ts') || f.endsWith('vite.config.js'));
const hasTailwind = allFiles.some((f) => f.includes('tailwind.config'));

const routes = [];
if (existsSync(join(root, 'src', 'App.tsx')) || existsSync(join(root, 'src', 'main.tsx'))) {
  routes.push({ path: '/', component: 'App', source: 'spa-entry' });
}
for (const page of allFiles.filter((f) => /pages[/\\][^/\\]+\.(tsx|jsx)$/.test(f))) {
  const rel = relative(root, page).replace(/\\/g, '/');
  routes.push({ path: `/${rel.split('/').pop().replace(/\.(tsx|jsx)$/, '')}`, component: rel, source: rel });
}

const inventory = {
  generatedAt: new Date().toISOString(),
  track,
  sourcePath: root,
  framework: {
    vite: hasVite,
    tailwind: hasTailwind,
    react: tsx.length > 0,
  },
  routes,
  components: tsx.map((f) => ({
    path: relative(root, f).replace(/\\/g, '/'),
    kind: f.includes('pages') ? 'page' : f.toLowerCase().includes('layout') ? 'layout' : 'component',
  })),
  tokens: {
    cssFiles: css.map((f) => relative(root, f).replace(/\\/g, '/')),
    tailwindConfig: hasTailwind ? 'tailwind.config.*' : null,
  },
  assets: allFiles
    .filter((f) => /\.(svg|png|jpg|jpeg|webp|gif|ico)$/i.test(f))
    .map((f) => ({ path: relative(root, f).replace(/\\/g, '/'), type: extname(f).slice(1) })),
  fileCount: allFiles.length,
};

const json = JSON.stringify(inventory, null, 2);
if (outPath) {
  writeFileSync(resolve(outPath), json, 'utf8');
  console.log(`Wrote ${outPath}`);
} else {
  console.log(json);
}
