/**
 * Homepage section rhythm — single source of truth for tone, size, layout, and spacing.
 * Hero is the only full-viewport band; all other sections scroll as standard content.
 */

export type HomeSectionTone = "default" | "inset";
export type HomeSectionSize = "hero" | "standard" | "compact";
export type HomeSectionLayout = "content" | "viewport";
export type HomeSectionSpacing = "default" | "split";

export type HomeSectionId =
  | "hero"
  | "digital-products"
  | "services"
  | "html-preview"
  | "html-profiles"
  | "featured-templates"
  | "three-path"
  | "featured-builds"
  | "trust-strip"
  | "process"
  | "ai-concierge"
  | "testimonials"
  | "field-notes"
  | "ready-made-solutions"
  | "final-cta";

export type HomeSectionConfig = {
  tone: HomeSectionTone;
  size: HomeSectionSize;
  layout: HomeSectionLayout;
  spacing: HomeSectionSpacing;
};

export const HOME_SECTIONS: Record<HomeSectionId, HomeSectionConfig> = {
  hero: { tone: "default", size: "hero", layout: "viewport", spacing: "default" },
  "digital-products": { tone: "default", size: "standard", layout: "content", spacing: "split" },
  services: { tone: "default", size: "standard", layout: "content", spacing: "split" },
  "html-preview": { tone: "inset", size: "standard", layout: "content", spacing: "split" },
  "html-profiles": { tone: "default", size: "standard", layout: "content", spacing: "split" },
  "featured-templates": { tone: "default", size: "standard", layout: "content", spacing: "split" },
  "three-path": { tone: "inset", size: "standard", layout: "content", spacing: "split" },
  "ready-made-solutions": { tone: "inset", size: "standard", layout: "content", spacing: "split" },
  "featured-builds": { tone: "default", size: "standard", layout: "content", spacing: "split" },
  "trust-strip": { tone: "inset", size: "compact", layout: "content", spacing: "default" },
  process: { tone: "inset", size: "standard", layout: "content", spacing: "split" },
  "ai-concierge": { tone: "default", size: "standard", layout: "content", spacing: "split" },
  testimonials: { tone: "inset", size: "standard", layout: "content", spacing: "split" },
  "field-notes": { tone: "default", size: "standard", layout: "content", spacing: "split" },
  "final-cta": { tone: "default", size: "compact", layout: "content", spacing: "default" },
};

export function homeSection(id: HomeSectionId): HomeSectionConfig {
  return HOME_SECTIONS[id];
}

export type HomeSectionShellProps = HomeSectionConfig;
