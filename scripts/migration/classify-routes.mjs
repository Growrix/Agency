#!/usr/bin/env node
/** Classify HTML data-route views as prose, interactive, or dynamic */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const INTERACTIVE = new Set(['quote', 'calculator', 'inspection', 'rebates', 'contact']);
const DYNAMIC = new Set(['blog-article', 'case-study']);
const PROSE_SKIP = new Set(['home', '404']);

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
let outPath = null;
if (outIdx !== -1) {
  outPath = args[outIdx + 1];
  args.splice(outIdx, 2);
}

const sourcePath = args[0];
if (!sourcePath) {
  console.error('Usage: node classify-routes.mjs <source.html> [--out routes.json]');
  process.exit(1);
}

const html = readFileSync(resolve(sourcePath), 'utf8');
const routes = [...new Set([...html.matchAll(/data-route="([^"]+)"/g)].map((m) => m[1]))].sort();

function classify(route) {
  if (PROSE_SKIP.has(route)) return { route, tier: 'shell', nextPattern: route === 'home' ? '/' : 'not-found' };
  if (INTERACTIVE.has(route)) return { route, tier: 'interactive', nextPattern: `/${route}`, component: `${route.charAt(0).toUpperCase()}${route.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}View` };
  if (DYNAMIC.has(route)) return { route, tier: 'dynamic', nextPattern: route === 'blog-article' ? '/blog/[slug]' : '/case-studies/[slug]' };
  if (route === 'blog') return { route, tier: 'index', nextPattern: '/blog' };
  if (route === 'case-studies') return { route, tier: 'index', nextPattern: '/case-studies' };
  return { route, tier: 'prose', nextPattern: `/${route}`, contentFile: `content/pages/${route}.json` };
}

const classified = routes.map(classify);
const result = {
  source: sourcePath,
  routes: classified,
  interactive: classified.filter((r) => r.tier === 'interactive'),
  prose: classified.filter((r) => r.tier === 'prose'),
  dynamic: classified.filter((r) => r.tier === 'dynamic'),
};

const json = JSON.stringify(result, null, 2);
if (outPath) {
  mkdirSync(dirname(resolve(outPath)), { recursive: true });
  writeFileSync(resolve(outPath), json, 'utf8');
  console.log(`Wrote ${outPath} (${routes.length} routes: ${result.interactive.length} interactive)`);
} else {
  console.log(json);
}
