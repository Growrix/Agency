"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowTrendingUpIcon,
  BoltIcon,
  ChevronRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { sanityThumbSrc } from "@/lib/sanity-image";
import { PORTFOLIO_HERO_PANEL } from "@/lib/portfolio-landing-content";
import type { PortfolioFilter } from "@/lib/portfolio-landing-content";
import type { PublicPortfolioRecord } from "@/server/domain/catalog";

const OUTCOME_ICONS = [EyeIcon, ArrowTrendingUpIcon, BoltIcon];

type PortfolioHeroPanelProps = {
  projects: PublicPortfolioRecord[];
  filters: PortfolioFilter[];
  onFilterSelect?: (value: string) => void;
};

function ProjectPreviewRow({ project }: { project: PublicPortfolioRecord }) {
  const image = project.hero_image;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex items-center gap-3 rounded-md border border-transparent px-2 py-2 transition-[border-color,background-color] duration-300 hover:border-border hover:bg-background/50"
    >
      <span className="relative size-11 shrink-0 overflow-hidden rounded-md border border-border bg-[#070b12]">
        {image ? (
          <Image src={sanityThumbSrc(image.src, 44)} alt="" fill sizes="44px" className="object-cover" aria-hidden />
        ) : (
          <span className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" aria-hidden />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-primary">{project.industry}</span>
        <span className="mt-0.5 block truncate text-sm font-medium tracking-tight text-text group-hover:text-primary">
          {project.name}
        </span>
      </span>
      <ChevronRightIcon
        className="size-4 shrink-0 text-text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
        aria-hidden
      />
    </Link>
  );
}

export function PortfolioHeroPanel({ projects, filters, onFilterSelect }: PortfolioHeroPanelProps) {
  const featured = projects.slice(0, 3);
  const capabilityFilters = filters.filter((filter) => filter.value !== "all");

  return (
    <div className="relative min-w-0 w-full lg:max-w-md lg:ml-auto">
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <Card className="relative w-full overflow-hidden border-border bg-surface p-3 sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]" aria-hidden />

        {featured.length > 0 ? (
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              {PORTFOLIO_HERO_PANEL.featuredEyebrow}
            </p>
            <ul className="relative mt-2 space-y-0.5" aria-label="Featured portfolio projects">
              {featured.map((project) => (
                <li key={project.slug}>
                  <ProjectPreviewRow project={project} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {featured.length > 0 && capabilityFilters.length > 0 ? (
          <div className="relative my-3 h-px bg-border/80" aria-hidden />
        ) : null}

        {capabilityFilters.length > 0 ? (
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              {PORTFOLIO_HERO_PANEL.browseEyebrow}
            </p>
            <ul className="relative mt-2 flex flex-wrap gap-1.5" aria-label="Portfolio categories">
              {capabilityFilters.map((filter) => (
                <li key={filter.value}>
                  {onFilterSelect ? (
                    <button
                      type="button"
                      onClick={() => onFilterSelect(filter.value)}
                      className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text"
                    >
                      {filter.label}
                    </button>
                  ) : (
                    <span className="inline-flex rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-medium text-text-muted">
                      {filter.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {(featured.length > 0 || capabilityFilters.length > 0) && PORTFOLIO_HERO_PANEL.outcomes.length > 0 ? (
          <div className="relative my-3 h-px bg-border/80" aria-hidden />
        ) : null}

        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
            {PORTFOLIO_HERO_PANEL.outcomesEyebrow}
          </p>
          <ul className="relative mt-2 grid gap-1 sm:grid-cols-3" aria-label="Portfolio outcome focus">
            {PORTFOLIO_HERO_PANEL.outcomes.map((outcome, index) => {
              const Icon = OUTCOME_ICONS[index] ?? EyeIcon;
              return (
                <li key={outcome.label}>
                  <span className="flex h-full flex-col items-start gap-1.5 rounded-md border border-border/80 bg-background/40 px-2.5 py-2">
                    <Icon className="size-4 text-primary" aria-hidden />
                    <span className="text-xs font-medium leading-4 tracking-tight text-text">{outcome.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {projects.length > 0 ? (
          <p className="relative mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            {projects.length} {projects.length === 1 ? "project" : "projects"} in this portfolio
          </p>
        ) : null}
      </Card>
    </div>
  );
}
