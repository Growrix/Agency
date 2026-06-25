export type HeroMotionTier = "full" | "mobile" | "lite" | "reduced";

export const HERO_MOTION_TIMINGS = {
  backgroundFade: 0,
  particlesIn: 0.2,
  gridEmerge: 0.4,
  wavesActivate: 0.8,
  headlineStart: 1.0,
  lineBuildMs: 800,
  glowSweepMs: 500,
  subheadDelay: 1.0,
  subheadDurationMs: 900,
  shimmerIntervalMs: 8000,
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
  headline: 1.0,
} as const;
