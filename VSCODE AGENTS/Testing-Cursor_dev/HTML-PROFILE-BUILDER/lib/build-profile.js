import fs from 'node:fs';
import path from 'node:path';

import { validateNormalizedBrief } from './brief-contract.js';
import { generateMockHtml } from './mock-html.js';
import { buildCopilotHandoff, buildPromptBundle, loadPromptFiles, loadTemplateSnippets } from './prompt-bundle.js';
import { ensureDirectory, readJsonFile, resolveInputPath, resolveRootPath, writeJsonFile } from './paths.js';
import { validateTheme, validateThemeAccessibility } from './theme-contract.js';
import { resolveThemeName } from './theme-map.js';
import { validateOutputBundle } from './validate-generated-output.js';

function readTheme(themeName) {
  const themePath = resolveRootPath('themes', `${themeName}.json`);
  return validateTheme(readJsonFile(themePath));
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function isRemoteAsset(assetPath) {
  return /^(https?:|data:)/i.test(assetPath);
}

function bundleAsset(assetPath, outputDirectory) {
  if (!assetPath) {
    return '';
  }

  if (isRemoteAsset(assetPath)) {
    return assetPath;
  }

  const resolvedAssetPath = resolveInputPath(assetPath);

  if (!fs.existsSync(resolvedAssetPath)) {
    throw new Error(`Referenced asset not found: ${assetPath}`);
  }

  const relativeOutputPath = path.isAbsolute(assetPath)
    ? path.join('assets', 'bundled', path.basename(assetPath))
    : assetPath.replace(/^([./\\]+)/, '');
  const outputAssetPath = path.join(outputDirectory, relativeOutputPath);

  ensureDirectory(path.dirname(outputAssetPath));
  fs.copyFileSync(resolvedAssetPath, outputAssetPath);

  return toPosixPath(relativeOutputPath);
}

function bundleBriefAssets(brief, outputDirectory) {
  return {
    ...brief,
    assets: {
      ...brief.assets,
      logoPath: bundleAsset(brief.assets.logoPath, outputDirectory),
      gallery: brief.assets.gallery.map((assetPath) => bundleAsset(assetPath, outputDirectory))
    }
  };
}

async function buildProfile({ briefPath, outputRoot }) {
  const buildStartedAt = new Date().toISOString();
  const resolvedBriefPath = resolveInputPath(briefPath);
  const brief = validateNormalizedBrief(readJsonFile(resolvedBriefPath));
  const themeName = resolveThemeName(brief.colorVibe);
  const theme = readTheme(themeName);
  validateThemeAccessibility(theme);
  const promptFiles = loadPromptFiles(brief.businessType);
  const templateSnippets = loadTemplateSnippets();
  const outputDirectory = path.join(outputRoot || resolveRootPath('outputs'), brief.clientId, brief.revision);

  ensureDirectory(outputDirectory);

  const bundledBrief = bundleBriefAssets(brief, outputDirectory);
  const promptBundle = buildPromptBundle({
    brief: bundledBrief,
    theme,
    themeName,
    promptFiles,
    templateSnippets
  });

  const snapshotPath = path.join(outputDirectory, 'input-snapshot.json');
  const promptBundlePath = path.join(outputDirectory, 'prompt-bundle.md');
  const copilotHandoffPath = path.join(outputDirectory, 'copilot-handoff.md');
  const htmlPath = path.join(outputDirectory, 'profile.html');
  const buildResultPath = path.join(outputDirectory, 'build-result.json');
  const qaReportPath = path.join(outputDirectory, 'qa-report.md');

  writeJsonFile(snapshotPath, bundledBrief);
  fs.writeFileSync(promptBundlePath, `${promptBundle}\n`, 'utf8');

  const html = generateMockHtml({ brief: bundledBrief, theme, themeName });
  const usedModel = 'local-template-renderer';

  fs.writeFileSync(htmlPath, `${html.trim()}\n`, 'utf8');
  fs.writeFileSync(
    copilotHandoffPath,
    `${buildCopilotHandoff({
      brief: bundledBrief,
      themeName,
      outputHtmlPath: htmlPath,
      outputDirectory
    })}\n`,
    'utf8'
  );

  const buildCompletedAt = new Date().toISOString();
  const { buildResult } = validateOutputBundle({
    briefPath: snapshotPath,
    htmlPath,
    buildResultPath,
    qaReportPath,
    themeName,
    model: usedModel,
    buildStartedAt,
    buildCompletedAt
  });

  return {
    outputDirectory,
    copilotHandoffPath,
    htmlPath,
    buildResultPath,
    qaReportPath,
    buildResult
  };
}

export { buildProfile };