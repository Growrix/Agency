export type LegalCopyMode = "strict" | "corrected";

export const brandConfig = {
  siteName: "Growrix Auto",
  siteTagline: "Automotive Shop",
  supportEmail: "support@growrixauto.com",
  growrixUrl: "https://www.growrixos.com",
  legal: {
    mode: "corrected" as LegalCopyMode,
    strictPrefix: "All right reserverd",
    correctedPrefix: "All rights reserved",
    strictSuffix: "Built & Maintanance by",
    correctedSuffix: "Built & Maintenance by",
  },
};

export function getLegalCopy(mode: LegalCopyMode = brandConfig.legal.mode) {
  if (mode === "strict") {
    return {
      prefix: `${brandConfig.legal.strictPrefix} ${brandConfig.siteName}, ${brandConfig.legal.strictSuffix}`,
      mode,
    };
  }

  return {
    prefix: `${brandConfig.legal.correctedPrefix} ${brandConfig.siteName}. ${brandConfig.legal.correctedSuffix}`,
    mode,
  };
}