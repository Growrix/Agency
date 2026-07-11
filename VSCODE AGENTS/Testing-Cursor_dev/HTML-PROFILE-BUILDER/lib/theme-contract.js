import { z } from 'zod';

const cssColorSchema = z.string().min(1);

const themeSchema = z.object({
  name: z.string().min(1),
  colorPrimary: cssColorSchema,
  colorAccent: cssColorSchema,
  colorBg: cssColorSchema,
  colorSurface: cssColorSchema,
  colorText: cssColorSchema,
  colorMuted: cssColorSchema,
  colorBorder: cssColorSchema,
  colorTextOnPrimary: cssColorSchema,
  colorTextOnHero: cssColorSchema,
  colorMutedOnHero: cssColorSchema,
  colorHeroChipBg: cssColorSchema,
  colorHeroChipText: cssColorSchema,
  colorHeroChipBorder: cssColorSchema,
  fontHeading: z.string().min(1),
  fontBody: z.string().min(1),
  fontHeadingWeights: z.string().min(1),
  fontBodyWeights: z.string().min(1),
  borderRadius: z.string().min(1),
  heroGradient: z.string().min(1)
});

function expandHexColor(color) {
  const normalized = color.replace('#', '').trim();

  if (normalized.length === 3) {
    return normalized
      .split('')
      .map((character) => `${character}${character}`)
      .join('');
  }

  return normalized;
}

function parseCssColor(color) {
  const trimmed = color.trim();

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
    const normalized = expandHexColor(trimmed);

    return {
      r: Number.parseInt(normalized.slice(0, 2), 16),
      g: Number.parseInt(normalized.slice(2, 4), 16),
      b: Number.parseInt(normalized.slice(4, 6), 16),
      a: 1
    };
  }

  const rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);

  if (rgbMatch) {
    const parts = rgbMatch[1].split(',').map((part) => part.trim());

    if (parts.length === 3 || parts.length === 4) {
      return {
        r: Number.parseFloat(parts[0]),
        g: Number.parseFloat(parts[1]),
        b: Number.parseFloat(parts[2]),
        a: parts.length === 4 ? Number.parseFloat(parts[3]) : 1
      };
    }
  }

  throw new Error(`Unsupported CSS color: ${color}`);
}

function compositeForeground(foreground, background) {
  if (foreground.a >= 1) {
    return foreground;
  }

  return {
    r: (foreground.r * foreground.a) + (background.r * (1 - foreground.a)),
    g: (foreground.g * foreground.a) + (background.g * (1 - foreground.a)),
    b: (foreground.b * foreground.a) + (background.b * (1 - foreground.a)),
    a: 1
  };
}

function toLinearChannel(channel) {
  const normalized = channel / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(color) {
  const resolved = color.a < 1 ? compositeForeground(color, { r: 255, g: 255, b: 255, a: 1 }) : color;
  const red = toLinearChannel(resolved.r);
  const green = toLinearChannel(resolved.g);
  const blue = toLinearChannel(resolved.b);

  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function contrastRatio(foregroundColor, backgroundColor) {
  const background = parseCssColor(backgroundColor);
  const foreground = compositeForeground(parseCssColor(foregroundColor), background);
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));

  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

function extractGradientStops(gradient) {
  return [...gradient.matchAll(/#(?:[0-9a-f]{3}|[0-9a-f]{6})\b|rgba?\([^)]*\)/gi)].map((match) => match[0]);
}

function buildContrastCheck({ id, foreground, background, minimum, detail }) {
  const ratio = contrastRatio(foreground, background);

  return {
    id,
    passed: ratio >= minimum,
    detail: `${detail} Contrast ${ratio}:1 (minimum ${minimum}:1).`
  };
}

function getThemeAccessibilityChecks(theme) {
  const gradientStops = extractGradientStops(theme.heroGradient);
  const checks = [
    buildContrastCheck({
      id: 'theme-surface-text-contrast',
      foreground: theme.colorText,
      background: theme.colorSurface,
      minimum: 4.5,
      detail: 'Surface text must remain readable on the default content surface.'
    }),
    buildContrastCheck({
      id: 'theme-surface-muted-contrast',
      foreground: theme.colorMuted,
      background: theme.colorSurface,
      minimum: 4.5,
      detail: 'Muted text must remain readable on the default content surface.'
    }),
    buildContrastCheck({
      id: 'theme-primary-text-contrast',
      foreground: theme.colorTextOnPrimary,
      background: theme.colorPrimary,
      minimum: 4.5,
      detail: 'Primary action text must remain readable on the primary action background.'
    }),
    buildContrastCheck({
      id: 'theme-hero-chip-contrast',
      foreground: theme.colorHeroChipText,
      background: theme.colorHeroChipBg,
      minimum: 4.5,
      detail: 'Hero chips must remain readable when rendered inside the hero.'
    })
  ];

  for (const [index, stop] of gradientStops.entries()) {
    checks.push(
      buildContrastCheck({
        id: `theme-hero-text-stop-${index + 1}`,
        foreground: theme.colorTextOnHero,
        background: stop,
        minimum: 3,
        detail: `Hero heading text must remain readable across gradient stop ${index + 1}.`
      })
    );
    checks.push(
      buildContrastCheck({
        id: `theme-hero-muted-stop-${index + 1}`,
        foreground: theme.colorMutedOnHero,
        background: stop,
        minimum: 3,
        detail: `Hero supporting text must remain readable across gradient stop ${index + 1}.`
      })
    );
  }

  return checks;
}

function validateTheme(value) {
  return themeSchema.parse(value);
}

function validateThemeAccessibility(theme) {
  const checks = getThemeAccessibilityChecks(theme);
  const failedChecks = checks.filter((check) => !check.passed);

  if (failedChecks.length > 0) {
    throw new Error(
      `Theme "${theme.name}" failed accessibility checks: ${failedChecks
        .map((check) => `${check.id} - ${check.detail}`)
        .join('; ')}`
    );
  }

  return checks;
}

export { contrastRatio, getThemeAccessibilityChecks, themeSchema, validateTheme, validateThemeAccessibility };