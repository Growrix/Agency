import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

import { approveQaDelivery } from '../lib/qa-approval.js';
import { buildProfile } from '../lib/build-profile.js';
import { readJsonFile, resolveRootPath } from '../lib/paths.js';

test('buildProfile writes the locked output bundle with the local renderer', async () => {
  const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'html-profile-builder-'));

  const result = await buildProfile({
    briefPath: resolveRootPath('tests', 'fixtures', 'sample-agency-normalized.json'),
    outputRoot: tempDirectory
  });

  const buildResult = readJsonFile(result.buildResultPath);
  const copilotHandoff = fs.readFileSync(result.copilotHandoffPath, 'utf8');
  const html = fs.readFileSync(path.join(result.outputDirectory, 'profile.html'), 'utf8');
  const bundledLogoPath = path.join(result.outputDirectory, 'assets', 'logos', 'nexus-digital', 'logo.svg');

  assert.equal(fs.existsSync(path.join(result.outputDirectory, 'profile.html')), true);
  assert.equal(fs.existsSync(path.join(result.outputDirectory, 'input-snapshot.json')), true);
  assert.equal(fs.existsSync(path.join(result.outputDirectory, 'prompt-bundle.md')), true);
  assert.equal(fs.existsSync(path.join(result.outputDirectory, 'copilot-handoff.md')), true);
  assert.equal(fs.existsSync(path.join(result.outputDirectory, 'qa-report.md')), true);
  assert.equal(fs.existsSync(bundledLogoPath), true);
  assert.equal(buildResult.status, 'passed');
  assert.equal(buildResult.delivery_class, 'blocked');
  assert.equal(buildResult.manual_qa_pending, true);
  assert.equal(buildResult.model, 'local-template-renderer');
  assert.match(copilotHandoff, /Phase 3: HTML Profile Builder Developer/);
  assert.match(copilotHandoff, /profile\.html/);
  assert.match(html, /src="assets\/logos\/nexus-digital\/logo\.svg"/);
});

test('approveQaDelivery promotes a successful build to baseline_prototype', async () => {
  const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'html-profile-builder-approval-'));

  const result = await buildProfile({
    briefPath: resolveRootPath('tests', 'fixtures', 'sample-cafe-normalized.json'),
    outputRoot: tempDirectory
  });

  const approved = approveQaDelivery({
    buildResultPath: result.buildResultPath,
    qaReportPath: result.qaReportPath,
    approvedBy: 'QA Reviewer',
    notes: 'Ready for delivery',
    approvedAt: '2026-05-18T12:00:00.000Z'
  });

  const report = fs.readFileSync(result.qaReportPath, 'utf8');

  assert.equal(approved.delivery_class, 'baseline_prototype');
  assert.equal(approved.manual_qa_pending, false);
  assert.equal(approved.manual_qa.approved_by, 'QA Reviewer');
  assert.match(report, /Approved by: QA Reviewer/);
  assert.match(report, /Ready for delivery/);
});