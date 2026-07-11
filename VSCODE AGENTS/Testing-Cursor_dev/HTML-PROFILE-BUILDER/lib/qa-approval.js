import fs from 'node:fs';

import { readJsonFile, writeJsonFile } from './paths.js';

function replaceReportLine(content, prefix, value) {
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matcher = new RegExp(`^${escapedPrefix}.*$`, 'm');

  if (matcher.test(content)) {
    return content.replace(matcher, `${prefix}${value}`);
  }

  return `${content.trimEnd()}\n${prefix}${value}\n`;
}

function approveQaDelivery({ buildResultPath, qaReportPath, approvedBy, notes = '', approvedAt = new Date().toISOString() }) {
  const buildResult = readJsonFile(buildResultPath);

  if (buildResult.status !== 'passed') {
    throw new Error('Only a successful build can be approved for delivery.');
  }

  const updatedBuildResult = {
    ...buildResult,
    delivery_class: 'baseline_prototype',
    manual_qa_pending: false,
    manual_qa: {
      approved_by: approvedBy,
      approved_at: approvedAt,
      notes
    }
  };

  writeJsonFile(buildResultPath, updatedBuildResult);

  const originalReport = fs.readFileSync(qaReportPath, 'utf8');
  const updatedReport = [
    ['- Approved by: ', approvedBy],
    ['- Approved at: ', approvedAt],
    ['- Notes: ', notes]
  ].reduce((content, [prefix, value]) => replaceReportLine(content, prefix, value), originalReport);

  fs.writeFileSync(qaReportPath, `${updatedReport.trimEnd()}\n`, 'utf8');

  return updatedBuildResult;
}

export { approveQaDelivery };