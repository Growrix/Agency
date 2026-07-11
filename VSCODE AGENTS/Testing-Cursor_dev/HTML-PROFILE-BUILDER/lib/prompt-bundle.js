import fs from 'node:fs';
import path from 'node:path';

import { resolveRootPath } from './paths.js';

function readTextFile(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim();
}

function loadPromptFiles(businessType) {
  const systemPromptPath = resolveRootPath('prompts', 'system-prompt.md');
  const categoryPromptPath = resolveRootPath('prompts', `${businessType}-prompt.md`);

  return {
    systemPrompt: readTextFile(systemPromptPath),
    categoryPrompt: fs.existsSync(categoryPromptPath) ? readTextFile(categoryPromptPath) : ''
  };
}

function loadTemplateSnippets() {
  const templatesDirectory = resolveRootPath('templates');

  if (!fs.existsSync(templatesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(templatesDirectory)
    .filter((fileName) => fileName.endsWith('.html'))
    .sort()
    .map((fileName) => ({
      fileName,
      content: readTextFile(path.join(templatesDirectory, fileName))
    }));
}

function buildPromptBundle({ brief, theme, themeName, promptFiles, templateSnippets }) {
  const templateSection = templateSnippets.length
    ? templateSnippets
        .map((snippet) => `### ${snippet.fileName}\n${snippet.content}`)
        .join('\n\n')
    : 'No template snippets loaded.';

  return [
    '# System Prompt',
    promptFiles.systemPrompt,
    '# Category Prompt',
    promptFiles.categoryPrompt || 'No category prompt loaded.',
    '# Theme Configuration',
    `Theme name: ${themeName}`,
    JSON.stringify(theme, null, 2),
    '# Template Snippets',
    templateSection,
    '# Client Brief',
    JSON.stringify(brief, null, 2),
    '# Build Instruction',
    'Generate one complete self-contained HTML document. Output only raw HTML beginning with <!DOCTYPE html>. Omit unsupported optional sections instead of inventing content.'
  ].join('\n\n');
}

function buildCopilotHandoff({ brief, themeName, outputHtmlPath, outputDirectory }) {
  return [
    '# Copilot Handoff',
    '',
    'Use Phase 3: HTML Profile Builder Developer for this refinement pass.',
    '',
    '## Target Files',
    `- Output directory: ${outputDirectory}`,
    `- HTML file to refine: ${outputHtmlPath}`,
    '',
    '## Locked Rules',
    '- Use only the brief data already captured in input-snapshot.json.',
    '- Do not invent stats, offers, social links, prices, ratings, testimonials, process steps, or portfolio labels.',
    '- Keep the file self-contained HTML with CSS inside <style>.',
    '- Preserve required meta tags, semantic structure, and link rules.',
    `- Keep the selected theme aligned with ${themeName}.`,
    '',
    '## Workflow',
    '- Read input-snapshot.json, prompt-bundle.md, and the current profile.html.',
    '- Improve the design quality, spacing, hierarchy, and conversion clarity without breaking the brief contract.',
    '- Save changes directly into profile.html.',
    '- Re-run validate-output.js after refinement.',
    '- Approve QA only after the output is still valid.',
    '',
    '## Brief Snapshot',
    JSON.stringify(brief, null, 2)
  ].join('\n');
}

export { buildCopilotHandoff, buildPromptBundle, loadPromptFiles, loadTemplateSnippets };