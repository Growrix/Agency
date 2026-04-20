import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { PORTFOLIO } from "@/lib/content";
import { SERVICES } from "@/lib/content";
import { getPortfolioImage } from "@/lib/site-images";

type Project = (typeof PORTFOLIO)[number];

export function PortfolioCard({ project }: { project: Project }) {
  const image = getPortfolioImage(project.slug);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full overflow-hidden rounded-[20px] border border-border bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-signal hover:-translate-y-1 hover:border-border-strong hover:shadow-(--shadow-2)"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-signal group-hover:scale-[1.03]"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/78 via-black/22 to-transparent" aria-hidden />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-black/40 backdrop-blur px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white">
            {SERVICES.find((service) => service.slug === project.service)?.name ?? "Project"}
          </span>
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-black/40 backdrop-blur px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white">
          {project.metric}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="font-mono text-[11px] uppercase tracking-wider opacity-85">{project.industry}</p>
          <p className="mt-1 font-display text-2xl tracking-tight">{project.name}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-6 text-text-muted text-pretty">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
          View case study <ArrowUpRightIcon className="size-4" />
        </span>
      </div>
    </Link>
  );
}