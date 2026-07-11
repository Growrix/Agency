import test from 'node:test';
import assert from 'node:assert/strict';

import { generateMockHtml } from '../lib/mock-html.js';
import { readJsonFile, resolveRootPath } from '../lib/paths.js';
import { validateGeneratedHtml } from '../lib/validate-generated-output.js';

test('validateGeneratedHtml passes on the mock generator output for the cafe brief', () => {
  const brief = readJsonFile(resolveRootPath('tests', 'fixtures', 'sample-cafe-normalized.json'));
  const theme = readJsonFile(resolveRootPath('themes', 'warm-cafe.json'));
  const html = generateMockHtml({ brief, theme, themeName: 'warm-cafe' });
  const validation = validateGeneratedHtml({ brief, html, theme });

  assert.equal(validation.passed, true);
  assert.ok(validation.requiredSectionsRendered.includes('hero'));
  assert.ok(validation.requiredSectionsRendered.includes('services'));
  assert.ok(validation.checks.some((check) => check.id === 'theme-hero-chip-contrast' && check.passed));
});