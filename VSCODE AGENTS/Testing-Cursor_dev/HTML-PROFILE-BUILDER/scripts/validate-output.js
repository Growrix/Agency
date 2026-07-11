import path from 'node:path';

import { validateNormalizedBrief } from '../lib/brief-contract.js';
import { readJsonFile, resolveInputPath } from '../lib/paths.js';
import { validateOutputBundle } from '../lib/validate-generated-output.js';
import { resolveThemeName } from '../lib/theme-map.js';

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
const htmlPath = readFlag(args, '--html');

if (!briefPath || !htmlPath) {
  console.error('Usage: node scripts/validate-output.js --brief outputs/client/revision/input-snapshot.json --html outputs/client/revision/profile.html');
  process.exit(1);
}

try {
  const resolvedBriefPath = resolveInputPath(briefPath);
  const resolvedHtmlPath = resolveInputPath(htmlPath);
  const brief = validateNormalizedBrief(readJsonFile(resolvedBriefPath));
  const outputDirectory = path.dirname(resolvedHtmlPath);
  const buildResultPath = path.join(outputDirectory, 'build-result.json');
  const qaReportPath = path.join(outputDirectory, 'qa-report.md');
  const result = validateOutputBundle({
    briefPath: resolvedBriefPath,
    htmlPath: resolvedHtmlPath,
    buildResultPath,
    qaReportPath,
    themeName: resolveThemeName(brief.colorVibe),
    model: 'manual-validation',
    buildStartedAt: new Date().toISOString(),
    buildCompletedAt: new Date().toISOString()
  });

  console.log(JSON.stringify(result.buildResult, null, 2));

  if (!result.validationResults.passed) {
    process.exit(1);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}