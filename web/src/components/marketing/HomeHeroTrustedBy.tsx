import { HOME_HERO_COPY, HOME_HERO_TRUSTED_NAMES } from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

type HomeHeroTrustedByProps = {
  className?: string;
};

export function HomeHeroTrustedBy({ className }: HomeHeroTrustedByProps) {
  return (
    <div className={cn(className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        {HOME_HERO_COPY.trustedByLabel}
      </p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
        {HOME_HERO_TRUSTED_NAMES.map((name) => (
          <li
            key={name}
            className="text-sm font-semibold tracking-wide text-text-muted"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
