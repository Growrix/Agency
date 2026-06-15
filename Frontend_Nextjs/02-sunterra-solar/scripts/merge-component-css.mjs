import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const cssPath = path.join(root, '.migration/component-css.css');
const globalsPath = path.join(root, 'app/globals.css');

let raw = fs.readFileSync(cssPath, 'utf8');
const pass3Idx = raw.indexOf('/* PASS3 CSS */');
if (pass3Idx > 0) raw = raw.slice(0, pass3Idx);

const lines = raw
  .split('\n')
  .map((l) => l.replace(/^    /, ''))
  .filter((l) => !l.includes('Extracted component CSS'));

const componentCss = lines.join('\n').trim();

const fabExtra = `
  .fab {
    position: fixed;
    right: var(--space-4);
    bottom: calc(var(--bottomnav-height) + var(--sticky-cta-height) + var(--space-4));
    z-index: 115;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: var(--space-3);
  }
  @media (min-width: 1024px) { .fab { bottom: var(--space-6); right: var(--space-6); } }
  .fab__main {
    width: 3.5rem; height: 3.5rem;
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: var(--radius-full);
    background: var(--color-primary); color: var(--color-on-primary);
    box-shadow: var(--shadow-lg);
    transition: background-color var(--duration-fast) var(--ease-out), transform var(--duration-base) var(--ease-spring);
  }
  .fab__main:hover { background: var(--color-primary-hover); }
  .fab__main[aria-expanded="true"] { background: var(--color-secondary); }
  .fab__item {
    display: flex; align-items: center; gap: var(--space-3);
    padding: var(--space-2) var(--space-4) var(--space-2) var(--space-3);
    background: var(--color-bg); border: 1px solid var(--color-border);
    border-radius: var(--radius-full); box-shadow: var(--shadow-md);
    color: var(--color-text); font-size: var(--text-sm); font-weight: var(--font-semibold);
    text-decoration: none; opacity: 0; transform: translateY(8px) scale(0.95);
    animation: fab-in var(--duration-base) var(--ease-spring) forwards;
  }
  .fab__item:nth-child(2) { animation-delay: 50ms; }
  .fab__item:nth-child(3) { animation-delay: 100ms; }
  .fab__item:hover { border-color: var(--color-primary); color: var(--color-primary); }
  @keyframes fab-in { to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) {
    .fab__item { animation: none; opacity: 1; transform: none; }
    .fab__main svg { transition: none; }
  }
`;

let globals = fs.readFileSync(globalsPath, 'utf8');

if (!globals.includes('--radius-xl')) {
  globals = globals.replace('--radius-lg: 16px;', '--radius-lg: 16px;\n  --radius-xl: 24px;');
}
if (!globals.includes('--shadow-xl')) {
  globals = globals.replace(
    '--shadow-lg: 0 12px 32px rgb(12 45 74 / 0.12);',
    '--shadow-lg: 0 12px 32px rgb(12 45 74 / 0.12);\n  --shadow-xl: 0 24px 60px rgb(12 45 74 / 0.18);',
  );
}
if (!globals.includes('--ease-spring')) {
  globals = globals.replace(
    '--ease-out: cubic-bezier(0.22, 1, 0.36, 1);',
    '--ease-out: cubic-bezier(0.22, 1, 0.36, 1);\n  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);',
  );
}
if (!globals.includes('--font-medium')) {
  globals = globals.replace('--font-semibold: 600;', '--font-medium: 500;\n  --font-semibold: 600;');
}

globals = globals.replace(
  /  body \{[\s\S]*?padding-bottom:[\s\S]*?\}\n  @media \(min-width: 1024px\) \{[\s\S]*?\}\n/,
  `  body {
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: var(--leading-normal);
    background: var(--color-bg);
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
    padding-bottom: calc(var(--bottomnav-height) + var(--sticky-cta-height));
  }
  @media (min-width: 1024px) {
    body { padding-bottom: 0; }
  }
`,
);

globals = globals.replace(/\n  \[data-reveal\] \{[\s\S]*?\[data-reveal\]\.is-revealed \{ opacity: 1; transform: none; \}\n/, '\n');

if (!globals.includes('@layer components')) {
  globals = `${globals.trimEnd()}\n\n@layer components {\n${componentCss}\n${fabExtra}\n}\n`;
}

fs.writeFileSync(globalsPath, globals);
console.log('Merged component CSS into globals.css');
