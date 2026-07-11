import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import { resolveRootPath } from '../lib/paths.js';

function collectJavaScriptFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  return fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      return collectJavaScriptFiles(fullPath);
    }

    return entry.name.endsWith('.js') ? [fullPath] : [];
  });
}

const targets = ['lib', 'scripts', 'tests'].flatMap((segment) => collectJavaScriptFiles(resolveRootPath(segment)));

for (const filePath of targets) {
  const result = spawnSync(process.execPath, ['--check', filePath], { stdio: 'inherit' });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`Typecheck passed for ${targets.length} JavaScript files.`);