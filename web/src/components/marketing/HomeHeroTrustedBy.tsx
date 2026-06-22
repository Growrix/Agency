import Image from "next/image";
import { HOME_HERO_COPY, HOME_HERO_TRUSTED_LOGOS } from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

type HomeHeroTrustedByProps = {
  className?: string;
};

const logoSizeClass = (variant: "wordmark" | "mark") =>
  variant === "wordmark" ? "h-7 max-w-[4.5rem]" : "h-7 max-w-[1.75rem]";

export function HomeHeroTrustedBy({ className }: HomeHeroTrustedByProps) {
  return (
    <div className={cn(className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        {HOME_HERO_COPY.trustedByLabel}
      </p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
        {HOME_HERO_TRUSTED_LOGOS.map((logo) => (
          <li key={logo.name}>
            {"srcDark" in logo && logo.srcDark ? (
              <>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={cn("w-auto object-contain object-left dark:hidden", logoSizeClass(logo.variant))}
                />
                <Image
                  src={logo.srcDark}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={cn("hidden w-auto object-contain object-left dark:block", logoSizeClass(logo.variant))}
                />
              </>
            ) : (
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={cn("w-auto object-contain object-left", logoSizeClass(logo.variant))}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
