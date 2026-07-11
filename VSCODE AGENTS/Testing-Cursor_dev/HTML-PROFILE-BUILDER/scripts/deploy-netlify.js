import fs from 'node:fs';
import path from 'node:path';

import { resolveInputPath, writeJsonFile } from '../lib/paths.js';

function readFlag(args, flagName) {
  const exactIndex = args.indexOf(flagName);

  if (exactIndex >= 0) {
    return args[exactIndex + 1];
  }

  const prefixed = args.find((arg) => arg.startsWith(`${flagName}=`));
  return prefixed ? prefixed.split('=').slice(1).join('=') : undefined;
}

const args = process.argv.slice(2);
const filePath = readFlag(args, '--file');
const deployedUrl = readFlag(args, '--url');

if (!filePath || !deployedUrl) {
  console.error('Usage: node scripts/deploy-netlify.js --file outputs/client/revision/profile.html --url https://your-site.netlify.app');
  process.exit(1);
}

try {
  const resolvedFilePath = resolveInputPath(filePath);

  if (!fs.existsSync(resolvedFilePath)) {
    throw new Error(`HTML file not found: ${resolvedFilePath}`);
  }

  const receiptPath = path.join(path.dirname(resolvedFilePath), 'deploy-receipt.json');
  writeJsonFile(receiptPath, {
    provider: 'netlify',
    mode: 'manual_receipt',
    file: resolvedFilePath,
    deployed_url: deployedUrl,
    recorded_at: new Date().toISOString()
  });

  console.log(`Deploy receipt written to ${receiptPath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}