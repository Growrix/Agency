import dotenv from 'dotenv';

import { buildProfile } from '../lib/build-profile.js';
import { resolveRootPath } from '../lib/paths.js';

dotenv.config({ path: resolveRootPath('.env'), quiet: true });

function readFlag(args, flagName) {
  const exactIndex = args.indexOf(flagName);

  if (exactIndex >= 0) {
    return args[exactIndex + 1];
  }

  const prefixed = args.find((arg) => arg.startsWith(`${flagName}=`));
  return prefixed ? prefixed.split('=').slice(1).join('=') : undefined;
}

const args = process.argv.slice(2);
const briefPath = readFlag(args, '--brief');

if (!briefPath) {
  console.error('Usage: node scripts/build.js --brief briefs/ready/client.json [--output-root outputs]');
  process.exit(1);
}

try {
  const result = await buildProfile({
    briefPath,
    outputRoot: readFlag(args, '--output-root')
  });

  console.log(`Build complete: ${result.outputDirectory}`);
  console.log(`Status: ${result.buildResult.status}`);
  console.log(`Delivery class: ${result.buildResult.delivery_class}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}