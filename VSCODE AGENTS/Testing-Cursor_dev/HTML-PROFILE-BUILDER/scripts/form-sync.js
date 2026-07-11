import fs from 'node:fs';
import path from 'node:path';

import { normalizeRawBrief } from '../lib/normalize-brief.js';
import { ensureDirectory, readJsonFile, resolveInputPath, resolveRootPath, writeJsonFile } from '../lib/paths.js';

function readFlag(args, flagName) {
  const exactIndex = args.indexOf(flagName);

  if (exactIndex >= 0) {
    return args[exactIndex + 1];
  }

  const prefixed = args.find((arg) => arg.startsWith(`${flagName}=`));
  return prefixed ? prefixed.split('=').slice(1).join('=') : undefined;
}

const args = process.argv.slice(2);
const inputPath = readFlag(args, '--input');

if (!inputPath) {
  console.error('Usage: node scripts/form-sync.js --input briefs/inbox/raw-client.json [--output briefs/ready/client.json]');
  process.exit(1);
}

try {
  const rawBrief = readJsonFile(resolveInputPath(inputPath));
  const normalizedBrief = normalizeRawBrief(rawBrief);
  const outputPath = resolveInputPath(
    readFlag(args, '--output') || path.join('briefs', 'ready', `${normalizedBrief.clientId}.json`)
  );

  ensureDirectory(path.dirname(outputPath));
  writeJsonFile(outputPath, normalizedBrief);

  if (!fs.existsSync(resolveRootPath('briefs', 'ready'))) {
    ensureDirectory(resolveRootPath('briefs', 'ready'));
  }

  console.log(`Normalized brief written to ${outputPath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}