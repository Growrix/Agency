export type HeroMotionTier = "full" | "mobile" | "lite" | "reduced";

export type HeroCopyPhase =
  | "badge"
  | "subhead"
  | "cta"
  | "trust"
  | "highlights"
  | "showcase"
  | "features";

export const HERO_MOTION_TIMINGS = {
  backgroundFade: 0,
  particlesIn: 0.2,
  gridEmerge: 0.4,
  wavesActivate: 0.8,
  headlineStart: 0.2,
  lineBuildMs: 800,
  glowSweepMs: 500,
  subheadDurationMs: 900,
  shimmerIntervalMs: 8000,
} as const;

/** Seconds relative to hero-copy-sequence-start */
export const HERO_COPY_SEQUENCE = {
  badge: 0,
  badgeDuration: 0.45,
  headlineStart: 0.2,
  headlineLineGap: 0.85,
  accentDuration: 0.85,
  subheadAfterAccent: 0.15,
  subheadDuration: 0.9,
  ctaAfterSubhead: 0.35,
  ctaStagger: 0.08,
  ctaDuration: 0.62,
  trustAfterCta: 0.25,
  trustDuration: 0.7,
  trustChildStagger: 0.1,
  highlightsAfterTrust: 0.2,
  highlightsDuration: 0.62,
  showcaseAfterHeadlineStart: 0.35,
  showcaseDuration: 0.72,
  featuresAfterTrust: 0.2,
  featuresDuration: 0.62,
} as const;

export const HERO_PARTICLE_COUNTS: Record<HeroMotionTier, number> = {
  full: 800,
  mobile: 200,
  lite: 80,
  reduced: 0,
};

export const HERO_ORB_COUNT: Record<HeroMotionTier, number> = {
  full: 12,
  mobile: 8,
  lite: 6,
  reduced: 0,
};

export const HERO_PARALLAX_DEPTH = {
  particles: 30,
  orbs: 20,
  headline: 8,
  ctas: 5,
  card: 15,
  grid: 12,
} as const;

export const HERO_MOTION_COLORS = {
  teal: "#2dd4bf",
  cyan: "#22d3ee",
  deepBlue: "#1e3a8a",
  purple: "#7c3aed",
  mint: "#6ee7b7",
} as const;

export const HERO_LOAD_SEQUENCE = {
  background: 0,
  particles: 0.2,
  grid: 0.4,
  waves: 0.8,
  headline: 0,
} as const;

function tierGapScale(tier: HeroMotionTier): number {
  return tier === "mobile" || tier === "lite" ? 0.92 : 1;
}

export function getAccentTimelineOffset(titleLineCount: number): number {
  return titleLineCount * HERO_COPY_SEQUENCE.headlineLineGap;
}

export function getCopyPhaseDuration(phase: HeroCopyPhase): number {
  const s = HERO_COPY_SEQUENCE;
  switch (phase) {
    case "badge":
      return s.badgeDuration;
    case "subhead":
      return s.subheadDuration;
    case "cta":
      return s.ctaDuration;
    case "trust":
      return s.trustDuration;
    case "highlights":
      return s.highlightsDuration;
    case "showcase":
      return s.showcaseDuration;
    case "features":
      return s.featuresDuration;
    default:
      return 0.62;
  }
}

export function getCopyPhaseDelay(
  phase: HeroCopyPhase,
  tier: HeroMotionTier,
  titleLineCount = 2,
): number {
  const s = HERO_COPY_SEQUENCE;
  const scale = tierGapScale(tier);
  const headlineStart = s.headlineStart * scale;
  const accentOffset = getAccentTimelineOffset(titleLineCount);
  const subheadAt = headlineStart + accentOffset + s.subheadAfterAccent * scale;
  const subheadEnd = subheadAt + s.subheadDuration * scale;
  const ctaAt = subheadEnd + s.ctaAfterSubhead * scale;
  const ctaEnd = ctaAt + s.ctaDuration * scale;
  const trustAt = ctaEnd + s.trustAfterCta * scale;
  const trustEnd = trustAt + s.trustDuration * scale;
  const highlightsAt = trustEnd + s.highlightsAfterTrust * scale;
  const showcaseAt = headlineStart + s.showcaseAfterHeadlineStart * scale;
  const featuresAt = trustEnd + s.featuresAfterTrust * scale;

  switch (phase) {
    case "badge":
      return s.badge;
    case "showcase":
      return showcaseAt;
    case "subhead":
      return subheadAt;
    case "cta":
      return ctaAt;
    case "trust":
      return trustAt;
    case "highlights":
      return highlightsAt;
    case "features":
      return featuresAt;
    default:
      return 0;
  }
}
