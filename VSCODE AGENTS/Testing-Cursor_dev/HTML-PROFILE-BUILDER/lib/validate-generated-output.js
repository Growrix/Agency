import fs from 'node:fs';
import path from 'node:path';

import { readJsonFile, resolveRootPath, writeJsonFile } from './paths.js';
import { getThemeAccessibilityChecks, validateTheme } from './theme-contract.js';

function hasValue(value) {
  if (Array.isArray(value)) {
    return value.some((entry) => hasValue(entry));
  }

  return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
}

function escapeForHtmlMatch(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildCheck(id, passed, detail) {
  return { id, passed, detail };
}

function htmlIncludesValue(html, value) {
  return html.includes(value) || html.includes(escapeForHtmlMatch(value));
}

function includesAll(html, values) {
  return values.every((value) => htmlIncludesValue(html, value));
}

function isRemoteAsset(assetPath) {
  return /^(https?:|data:)/i.test(assetPath);
}

function getLocalImageSources(html) {
  return [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)].map((match) => match[1]);
}

function validateGeneratedHtml({ brief, html, theme, outputDirectory }) {
  const checks = [];
  const requiredSectionsRendered = [];
  const omittedSections = [];

  checks.push(buildCheck('doctype', html.trim().startsWith('<!DOCTYPE html>'), 'HTML must begin with <!DOCTYPE html>.'));
  checks.push(buildCheck('root-tags', /<html[\s>]/i.test(html) && /<head[\s>]/i.test(html) && /<body[\s>]/i.test(html), 'HTML must include html, head, and body tags.'));
  checks.push(buildCheck('meta-description', html.includes('<meta name="description"'), 'HTML must include meta description.'));
  checks.push(buildCheck('open-graph-meta', html.includes('<meta property="og:title"') && html.includes('<meta property="og:description"'), 'HTML must include Open Graph title and description.'));
  checks.push(buildCheck('no-markdown-fences', !html.includes('```'), 'HTML must not contain markdown fences.'));
  checks.push(buildCheck('business-identity', includesAll(html, [brief.businessName, brief.tagline]), 'HTML must include the business name and tagline.'));

  if (brief.contact.phone) {
    checks.push(buildCheck('phone-link', html.includes(`href="tel:${brief.contact.phone}"`), 'Phone link must target tel:phone.'));
  }

  if (brief.contact.whatsapp) {
    checks.push(buildCheck('whatsapp-link', html.includes(`https://wa.me/${brief.contact.whatsapp}`), 'WhatsApp link must target wa.me.'));
  }

  if (brief.location.googleMapsLink) {
    checks.push(buildCheck('maps-link', html.includes(brief.location.googleMapsLink), 'Map link must be present when provided.'));
  }

  if (brief.social.facebook) {
    checks.push(buildCheck('facebook-link', html.includes(brief.social.facebook), 'Facebook link must be present when provided.'));
  }

  if (brief.social.instagram) {
    checks.push(buildCheck('instagram-link', html.includes(brief.social.instagram), 'Instagram link must be present when provided.'));
  }

  if (brief.social.website) {
    checks.push(buildCheck('website-link', html.includes(brief.social.website), 'Website link must be present when provided.'));
  }

  if (includesAll(html, [brief.businessName, brief.tagline])) {
    requiredSectionsRendered.push('hero');
  }

  if (htmlIncludesValue(html, brief.aboutText)) {
    requiredSectionsRendered.push('about');
  }

  if (htmlIncludesValue(html, brief.location.address) && htmlIncludesValue(html, brief.contact.email)) {
    requiredSectionsRendered.push('contact');
  }

  if (brief.services.length > 0) {
    const servicePass = brief.services.every((service) => includesAll(html, [service.name, service.description, service.price]));
    checks.push(buildCheck('services-content', servicePass, 'Every service must render name, description, and price.'));

    if (servicePass) {
      requiredSectionsRendered.push('services');
    }
  }

  if (includesAll(html, [brief.hours.mondayFriday, brief.hours.saturday, brief.hours.sunday, brief.hours.publicHolidays])) {
    requiredSectionsRendered.push('hours');
  }

  if (brief.team.length > 0) {
    const teamPass = brief.team.every((member) => includesAll(html, [member.name, member.role, member.initials]));
    checks.push(buildCheck('team-content', teamPass, 'Every team member must render name, role, and initials.'));

    if (teamPass) {
      requiredSectionsRendered.push('team');
    }
  }

  const optionalChecks = [
    { key: 'statusLabel', values: [brief.optionalSections.statusLabel] },
    { key: 'ratingLabel', values: [brief.optionalSections.ratingLabel] },
    { key: 'deliveryInfo', values: [brief.optionalSections.deliveryInfo] },
    { key: 'bookingLink', values: [brief.optionalSections.bookingLink] },
    {
      key: 'proofStats',
      values: brief.optionalSections.proofStats.flatMap((entry) => [entry.label, entry.value])
    },
    { key: 'portfolioLabels', values: brief.optionalSections.portfolioLabels },
    { key: 'techStack', values: brief.optionalSections.techStack },
    { key: 'processSteps', values: brief.optionalSections.processSteps }
  ];

  for (const optionalCheck of optionalChecks) {
    if (!hasValue(optionalCheck.values)) {
      omittedSections.push(optionalCheck.key);
      continue;
    }

    checks.push(
      buildCheck(
        `optional-${optionalCheck.key}`,
        includesAll(html, optionalCheck.values),
        `Optional section ${optionalCheck.key} must render when data is provided.`
      )
    );
  }

  const forbiddenMarkers = ['Lorem ipsum', 'COMING_SOON', 'TODO', 'placeholder'];
  checks.push(
    buildCheck(
      'no-placeholder-markers',
      !forbiddenMarkers.some((marker) => html.includes(marker)),
      'HTML must not contain placeholder markers.'
    )
  );

  if (theme) {
    checks.push(...getThemeAccessibilityChecks(theme));
  }

  if (outputDirectory) {
    const localImages = getLocalImageSources(html).filter((source) => !isRemoteAsset(source));
    checks.push(
      buildCheck(
        'local-image-assets',
        localImages.every((source) => fs.existsSync(path.resolve(outputDirectory, source))),
        'Every local image source must resolve inside the output bundle.'
      )
    );
  }

  const passed = checks.every((check) => check.passed);

  return {
    passed,
    checks,
    requiredSectionsRendered,
    omittedSections
  };
}

function buildQaReport({ brief, validationResults }) {
  const checklist = fs.readFileSync(resolveRootPath('qa', 'checklist.md'), 'utf8').trim();

  return [
    `# QA Report - ${brief.businessName}`,
    '',
    `- Client ID: ${brief.clientId}`,
    `- Revision: ${brief.revision}`,
    `- Automated validation passed: ${validationResults.passed ? 'yes' : 'no'}`,
    '',
    '## Manual Approval',
    '- Approved by:',
    '- Approved at:',
    '- Notes:',
    '',
    '## Automated Checks',
    ...validationResults.checks.map((check) => `- [${check.passed ? 'x' : ' '}] ${check.id}: ${check.detail}`),
    '',
    checklist
  ].join('\n');
}

function createBuildResult({ brief, themeName, model, validationResults, buildStartedAt, buildCompletedAt }) {
  return {
    status: validationResults.passed ? 'passed' : 'failed',
    delivery_class: 'blocked',
    manual_qa_pending: true,
    manual_qa: {
      approved_by: '',
      approved_at: '',
      notes: ''
    },
    client_id: brief.clientId,
    revision: brief.revision,
    theme_name: themeName,
    business_type: brief.businessType,
    required_sections_rendered: validationResults.requiredSectionsRendered,
    omitted_sections: validationResults.omittedSections,
    validation_results: validationResults,
    model,
    build_started_at: buildStartedAt,
    build_completed_at: buildCompletedAt
  };
}

function validateOutputBundle({ briefPath, htmlPath, buildResultPath, qaReportPath, themeName, model, buildStartedAt, buildCompletedAt }) {
  const brief = readJsonFile(briefPath);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const theme = validateTheme(readJsonFile(resolveRootPath('themes', `${themeName}.json`)));
  const validationResults = validateGeneratedHtml({
    brief,
    html,
    theme,
    outputDirectory: path.dirname(htmlPath)
  });
  const resultPayload = createBuildResult({
    brief,
    themeName,
    model,
    validationResults,
    buildStartedAt,
    buildCompletedAt
  });
  const qaReport = buildQaReport({ brief, validationResults });

  if (buildResultPath) {
    writeJsonFile(buildResultPath, resultPayload);
  }

  if (qaReportPath) {
    fs.writeFileSync(qaReportPath, `${qaReport}\n`, 'utf8');
  }

  return { buildResult: resultPayload, qaReport, validationResults };
}

export { buildQaReport, createBuildResult, validateGeneratedHtml, validateOutputBundle };