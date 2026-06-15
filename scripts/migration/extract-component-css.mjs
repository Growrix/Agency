#!/usr/bin/env node
/** Extract component CSS blocks from HTML <style> for @layer components porting */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
let outPath = null;
if (outIdx !== -1) {
  outPath = args[outIdx + 1];
  args.splice(outIdx, 2);
}

const sourcePath = args[0];
if (!sourcePath) {
  console.error('Usage: node extract-component-css.mjs <source.html> [--out component-css.css]');
  process.exit(1);
}

const html = readFileSync(resolve(sourcePath), 'utf8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
if (!styleMatch) {
  console.error('No <style> block found');
  process.exit(1);
}

const css = styleMatch[1];
const tokenEnd = css.indexOf('*, *::before');
const componentCss = tokenEnd > 0 ? css.slice(tokenEnd) : css;

const priorityBlocks = [
  '.skip-link', '.btn', '.form__', '.announce', '.header', '.navbar', '.mega',
  '.drawer', '.hero', '.trust-bar', '.calc-preview', '.calc-box', '.section-head',
  '.scard', '.pillar', '.rebates-band', '.why-us', '.stats', '.cstudy', '.quote-card',
  '.brands', '.finance-card', '.areas', '.bcard', '.faq', '.cta-band', '.page-hero',
  '.content', '.footer', '.sticky-cta', '.bottomnav', '.fab', '.toast', '.review',
  '.cert', '.rebate-result', '.info-box', '.feature-list', '.empty-404', '.chip',
  '.badge', '.card-grid', '.split', '.container', '.view.is-loading', '[data-reveal',
];

const lines = componentCss.split('\n');
const blocks = [];
let current = [];
let inBlock = false;
let braceDepth = 0;

for (const line of lines) {
  const isRootOrTheme = /^\s*:root\s*\{/.test(line) || /^\s*\[data-theme/.test(line);
  if (isRootOrTheme && !inBlock) continue;

  const selectorMatch = line.match(/^(\.[a-zA-Z0-9_-]+|\[[^\]]+\]|@media|@keyframes)/);
  if (selectorMatch && braceDepth === 0 && current.length > 0) {
    blocks.push(current.join('\n'));
    current = [];
  }

  current.push(line);
  braceDepth += (line.match(/\{/g) || []).length;
  braceDepth -= (line.match(/\}/g) || []).length;
  if (braceDepth === 0 && current.length > 0 && line.includes('}')) {
    blocks.push(current.join('\n'));
    current = [];
  }
}

const filtered = blocks.filter((b) =>
  priorityBlocks.some((p) => b.includes(p)) && !b.includes('.assistant') && !b.includes('.lightbox') && !b.includes('.shop__')
);

const output = `/* Extracted component CSS — paste into app/globals.css @layer components */\n\n${filtered.join('\n\n')}\n`;
const classNames = [...new Set(filtered.flatMap((b) => [...b.matchAll(/\.([a-z][a-z0-9_-]*)/gi)].map((m) => m[1])))];

if (outPath) {
  mkdirSync(dirname(resolve(outPath)), { recursive: true });
  writeFileSync(resolve(outPath), output, 'utf8');
  console.log(`Wrote ${outPath} (${filtered.length} blocks, ${classNames.length} classes)`);
} else {
  console.log(output);
}
