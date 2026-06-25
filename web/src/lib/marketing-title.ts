import type { ReactNode } from "react";

export type MarketingTitleSource = {
  title?: ReactNode;
  titleLead?: string;
  titleAccent?: string;
};

export type ResolvedMarketingTitle =
  | { kind: "accent"; titleLead: string; titleAccent: string }
  | { kind: "plain"; title: ReactNode };

/** Derive a lead/accent split from a full title when explicit fields are absent. */
export function inferMarketingAccentTitle(fullTitle: string): { titleLead: string; titleAccent: string } {
  const trimmed = fullTitle.trim().replace(/\s+/g, " ");
  if (!trimmed) {
    return { titleLead: "", titleAccent: "" };
  }

  const hasTrailingPeriod = trimmed.endsWith(".");
  const core = hasTrailingPeriod ? trimmed.slice(0, -1) : trimmed;

  const lastPeriod = core.lastIndexOf(". ");
  if (lastPeriod > 0 && lastPeriod < core.length - 2) {
    return {
      titleLead: `${core.slice(0, lastPeriod + 1)}.`,
      titleAccent: core.slice(lastPeriod + 2) + (hasTrailingPeriod ? "." : ""),
    };
  }

  const commaSplit = core.lastIndexOf(", ");
  if (commaSplit > core.length * 0.35 && commaSplit < core.length - 3) {
    return {
      titleLead: `${core.slice(0, commaSplit + 1)}`,
      titleAccent: core.slice(commaSplit + 2) + (hasTrailingPeriod ? "." : ""),
    };
  }

  const words = core.split(" ");
  if (words.length <= 1) {
    return { titleLead: trimmed, titleAccent: "" };
  }

  const accentWords = Math.min(4, Math.max(2, Math.ceil(words.length / 3)));
  const lead = words.slice(0, -accentWords).join(" ");
  const accent = `${words.slice(-accentWords).join(" ")}${hasTrailingPeriod ? "." : ""}`;

  return { titleLead: lead, titleAccent: accent };
}

export function resolveMarketingTitle(source: MarketingTitleSource): ResolvedMarketingTitle {
  if (source.titleLead && source.titleAccent) {
    return { kind: "accent", titleLead: source.titleLead, titleAccent: source.titleAccent };
  }

  if (typeof source.title === "string" && source.title.trim()) {
    const inferred = inferMarketingAccentTitle(source.title);
    if (inferred.titleAccent) {
      return { kind: "accent", titleLead: inferred.titleLead, titleAccent: inferred.titleAccent };
    }
    return { kind: "plain", title: source.title };
  }

  if (source.title !== undefined && source.title !== null && typeof source.title !== "string") {
    return { kind: "plain", title: source.title };
  }

  return { kind: "plain", title: source.title ?? "" };
}

/** Spread onto SectionHeading / MobileMarketingSectionHeader from a content block. */
export function marketingTitleProps(source: MarketingTitleSource) {
  const resolved = resolveMarketingTitle(source);
  if (resolved.kind === "accent") {
    return { titleLead: resolved.titleLead, titleAccent: resolved.titleAccent };
  }
  return { title: resolved.title };
}
