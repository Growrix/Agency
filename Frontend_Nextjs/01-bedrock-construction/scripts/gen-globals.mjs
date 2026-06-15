import fs from 'fs';

const html = fs.readFileSync('../../sites/01-BedrockConstruction.html', 'utf8');
const m = html.match(/<style>([\s\S]*?)<\/style>/);
const css = m[1];
const header = `@import "tailwindcss";

:root{--accent:#FF5A1F;--accent-t:#FF7A47;--accent2:#FFC400;--bg:#0B0C0E;--surface:#14161A;--surface2:#1B1E23;--elevated:#1F2329;--border:#2A2F36;--borders:#3A4049;--text:#F2F4F6;--muted:#9AA2AB;--faint:#6B727B;--fd:var(--font-display);--fb:var(--font-body);--fm:var(--font-mono);--rc:18px;--rb:14px;--ri:14px;--maxw:1440px}
[data-theme=light]{--accent:#E8470B;--accent-t:#C2410C;--accent2:#B7860B;--bg:#fff;--surface:#F6F7F8;--surface2:#EEF0F2;--elevated:#fff;--border:#E1E4E8;--borders:#C9CED4;--text:#0B0C0E;--muted:#5B636B;--faint:#8A929A}

@theme inline {
  --color-accent: var(--accent);
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-text: var(--text);
  --color-muted: var(--muted);
}

@layer base {
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
  body{background:var(--bg);color:var(--text);font-family:var(--fb);min-height:100vh;transition:background .35s,color .35s}
  img{display:block;max-width:100%}
  a{color:inherit;text-decoration:none}
  button{font-family:var(--fb);cursor:pointer;border:none;background:none}
  ul{list-style:none}
  ::selection{background:var(--accent);color:#fff}
  :focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:6px}
}

@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .ticker,.metric-card{animation:none!important}
  .reveal{opacity:1!important;transform:none!important;transition:none!important}
}

@layer components {
`;

const footer = '\n}\n';
let body = css.replace(/:root\{[^}]+\}/, '').replace(/\[data-theme=light\]\{[^}]+\}/, '');
fs.writeFileSync('app/globals.css', header + body + footer);
console.log('Written app/globals.css');
