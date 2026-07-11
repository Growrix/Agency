import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeRawBrief } from '../lib/normalize-brief.js';
import { readJsonFile, resolveRootPath } from '../lib/paths.js';

test('normalizeRawBrief converts the draft raw schema to the locked schema', () => {
  const rawBrief = readJsonFile(resolveRootPath('tests', 'fixtures', 'sample-cafe-raw.json'));
  const normalized = normalizeRawBrief(rawBrief);

  assert.equal(normalized.clientId, 'brew-and-bean');
  assert.equal(normalized.deliveryTier, 'professional');
  assert.equal(normalized.assets.logoPath, 'assets/logos/brew-and-bean/logo.svg');
  assert.equal(normalized.services.length, 2);
  assert.equal(normalized.optionalSections.deliveryInfo, 'Pickup available');
});