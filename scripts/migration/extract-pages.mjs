#!/usr/bin/env node
/** Extract data-route prose views from HTML into content/pages/*.json */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const args = process.argv.slice(2);
const skipIdx = args.indexOf('--skip');
const skip = new Set(
  skipIdx !== -1
    ? args[skipIdx + 1].split(',')
    : ['home', 'blog', 'blog-article', 'case-studies', 'case-study', 'quote', 'calculator', '404'],
);
if (skipIdx !== -1) args.splice(skipIdx, 2);

const [htmlPath, outDir] = args;
if (!htmlPath || !outDir) {
  console.error('Usage: node extract-pages.mjs <source.html> <output-pages-dir> [--skip route1,route2]');
  process.exit(1);
}

const html = readFileSync(resolve(htmlPath), 'utf8');
mkdirSync(resolve(outDir), { recursive: true });

const routeRe = /<section class="view" data-route="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g;
const slugs = [];
let m;

while ((m = routeRe.exec(html)) !== null) {
  const route = m[1];
  if (skip.has(route)) continue;
  const block = m[2];
  const titleMatch = block.match(/<h1 class="page-hero__title"[^>]*>([^<]+)<\/h1>/);
  const ledeMatch = block.match(/<p class="page-hero__lede">([^<]+)<\/p>/);
  const crumbMatch = block.match(/aria-current="page">([^<]+)<\/span>/);

  let proseHtml = '';
  const contentStart = block.indexOf('<div class="content">');
  if (contentStart !== -1) {
    const inner = block.slice(contentStart);
    const proseDiv = inner.match(/<div class="container[^"]*"[^>]*>([\s\S]*)<\/div>\s*<\/div>\s*$/);
    if (proseDiv) proseHtml = proseDiv[1].trim();
  }

  const prose = [];
  if (proseHtml) {
    const parts = proseHtml
      .split(/(?=<(?:p|h2|h3|ul|ol|div class="(?:faq|why-us__list|areas|split|form__steps)))/i)
      .map((p) => p.trim())
      .filter(Boolean);
    for (const part of parts) prose.push(part);
    if (prose.length === 0) prose.push(proseHtml);
  }

  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : route;
  const lede = ledeMatch ? ledeMatch[1] : '';
  const breadcrumb = crumbMatch ? crumbMatch[1] : title;

  const page = {
    slug: route,
    title,
    description: lede,
    hero: { title, lede, breadcrumb },
    prose: prose.length ? prose : [`<p>${lede || `Content for ${route}.`}</p>`],
  };

  writeFileSync(join(resolve(outDir), `${route}.json`), JSON.stringify(page, null, 2));
  slugs.push(route);
}

console.log(`Created ${slugs.length} pages: ${slugs.join(', ')}`);
