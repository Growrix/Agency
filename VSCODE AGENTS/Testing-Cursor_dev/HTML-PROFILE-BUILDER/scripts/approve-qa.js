import { approveQaDelivery } from '../lib/qa-approval.js';
import { resolveInputPath } from '../lib/paths.js';

function readFlag(args, flagName) {
  const exactIndex = args.indexOf(flagName);

  if (exactIndex >= 0) {
    return args[exactIndex + 1];
  }

  const prefixed = args.find((arg) => arg.startsWith(`${flagName}=`));
  return prefixed ? prefixed.split('=').slice(1).join('=') : undefined;
}

const args = process.argv.slice(2);
const resultPath = readFlag(args, '--result');
const approvedBy = readFlag(args, '--by');

if (!resultPath || !approvedBy) {
  console.error('Usage: node scripts/approve-qa.js --result outputs/client/revision/build-result.json --by "Reviewer Name" [--notes "Ready for delivery"] [--report outputs/client/revision/qa-report.md]');
  process.exit(1);
}

try {
  const resolvedResultPath = resolveInputPath(resultPath);
  const resolvedReportPath = resolveInputPath(
    readFlag(args, '--report') || resolvedResultPath.replace(/build-result\.json$/i, 'qa-report.md')
  );

  const updatedBuildResult = approveQaDelivery({
    buildResultPath: resolvedResultPath,
    qaReportPath: resolvedReportPath,
    approvedBy,
    notes: readFlag(args, '--notes') || '',
    approvedAt: readFlag(args, '--approved-at') || new Date().toISOString()
  });

  console.log(JSON.stringify(updatedBuildResult, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}