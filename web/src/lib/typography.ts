/** Homepage hero and section title sizing — keep in sync across h1/h2 section headings. */
export const HERO_TITLE_CLASS =
  "font-display text-3xl sm:text-4xl leading-[1.08] tracking-tight text-balance";

/** Homepage hero display title — larger multi-line marketing headline. */
export const HERO_DISPLAY_TITLE_CLASS =
  "font-display text-4xl sm:text-5xl lg:text-[2.85rem] xl:text-[3.15rem] leading-[1.05] tracking-tight text-balance";

/** Desktop marketing landing viewport hero — portfolio, FAQ, blog, additional services, etc. */
export const MARKETING_LANDING_HERO_TITLE_CLASS =
  "font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance";

/** Site-wide marketing section heading scale (matches hero). */
export const SECTION_TITLE_CLASS = HERO_TITLE_CLASS;

/** Fills and vertically centers content inside a viewport hero Section. */
export const HERO_VIEWPORT_CONTAINER_CLASS = "hero-viewport-band__inner";

/** Mobile homepage hero display title — uses `--mobile-type-display-*` via `.home-hero-mobile__title`. */
export const HERO_MOBILE_DISPLAY_TITLE_CLASS = "home-hero-mobile__title font-display";

/** Mobile homepage hero trust eyebrow — uses `--mobile-type-eyebrow-*` via `.home-hero-mobile__eyebrow`. */
export const HERO_MOBILE_EYEBROW_CLASS = "home-hero-mobile__eyebrow";

/** Mobile homepage services section title — uses `--mobile-type-display-*` via `.home-services-mobile__title`. */
export const SERVICES_MOBILE_TITLE_CLASS = "home-services-mobile__title font-display";

/** Shared mobile marketing section title — uses `--mobile-type-display-*` via `.home-mobile-marketing__title`. */
export const MOBILE_MARKETING_TITLE_CLASS = "home-mobile-marketing__title font-display";
