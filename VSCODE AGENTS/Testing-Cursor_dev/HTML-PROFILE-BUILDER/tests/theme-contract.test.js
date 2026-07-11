import test from 'node:test';
import assert from 'node:assert/strict';

import { getThemeAccessibilityChecks, validateThemeAccessibility } from '../lib/theme-contract.js';

test('validateThemeAccessibility blocks unreadable theme roles', () => {
  const brokenTheme = {
    name: 'broken-theme',
    colorPrimary: '#ffffff',
    colorAccent: '#222222',
    colorBg: '#ffffff',
    colorSurface: '#ffffff',
    colorText: '#111111',
    colorMuted: '#666666',
    colorBorder: '#dddddd',
    colorTextOnPrimary: '#ffffff',
    colorTextOnHero: '#ffffff',
    colorMutedOnHero: '#f8f8f8',
    colorHeroChipBg: '#ffffff',
    colorHeroChipText: '#ffffff',
    colorHeroChipBorder: '#dddddd',
    fontHeading: 'Playfair Display',
    fontBody: 'Lato',
    fontHeadingWeights: '400;700',
    fontBodyWeights: '400;700',
    borderRadius: '12px',
    heroGradient: 'linear-gradient(135deg, #ffffff 0%, #eeeeee 100%)'
  };

  const checks = getThemeAccessibilityChecks(brokenTheme);

  assert.equal(checks.some((check) => check.id === 'theme-hero-chip-contrast' && check.passed === false), true);
  assert.throws(() => validateThemeAccessibility(brokenTheme), /failed accessibility checks/i);
});