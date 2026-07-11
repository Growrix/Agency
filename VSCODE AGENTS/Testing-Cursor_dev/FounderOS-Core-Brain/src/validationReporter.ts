import type { ParseIssue } from './types/schemas';

export function formatParseIssues(issues: ParseIssue[]): string {
  if (issues.length === 0) {
    return '';
  }

  const lines: string[] = [];
  lines.push('### Data Warnings');
  for (const issue of issues) {
    lines.push(`- ${issue.message}`);
    lines.push(`  - File: ${issue.filePath}`);
  }
  return `${lines.join('\n')}\n`;
}
