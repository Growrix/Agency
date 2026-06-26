"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { HERO_MOTION_TIMINGS } from "./hero-motion-config";
import { useHeroMotionOptional } from "./HeroMotionContext";

type HomeHeroKineticHeadlineProps = {
  titleLines: readonly string[];
  titleAccent: string;
  className?: string;
  variant?: "desktop" | "mobile";
};

function buildAriaLabel(lines: readonly string[], accent: string) {
  return [...lines, accent].join(" ");
}

function renderWord(word: string, wordKey: string) {
  return (
    <span key={wordKey} className="hero-kinetic-word">
      {word.split("").map((char, charIndex) => (
        <span key={`${wordKey}-${charIndex}`} className="hero-kinetic-char" aria-hidden="true">
          {char}
        </span>
      ))}
    </span>
  );
}

function renderLineWords(text: string, lineKey: string) {
  const words = text.split(" ").filter(Boolean);
  return words.map((word, wordIndex) => renderWord(word, `${lineKey}-${wordIndex}`));
}

export function HomeHeroKineticHeadline({
  titleLines,
  titleAccent,
  className,
  variant = "desktop",
}: HomeHeroKineticHeadlineProps) {
  const reduced = useReducedMotion();
  const motion = useHeroMotionOptional();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);
  const ariaLabel = buildAriaLabel(titleLines, titleAccent);

  const titleLineEntries = useMemo(
    () => titleLines.map((text, index) => ({ text, depth: index })),
    [titleLines],
  );

  useEffect(() => {
    if (reduced || motion?.tier === "reduced" || !headlineRef.current || animatedRef.current) {
      return;
    }

    let cancelled = false;
    let shimmerInterval: ReturnType<typeof setInterval> | undefined;
    let fallbackTimer: number | undefined;

    const revealAllChars = () => {
      const root = headlineRef.current;
      if (!root) {
        return;
      }
      root.querySelectorAll(".hero-kinetic-char").forEach((char) => {
        (char as HTMLElement).style.opacity = "1";
        (char as HTMLElement).style.transform = "none";
      });
      if (accentRef.current) {
        accentRef.current.style.opacity = "1";
        accentRef.current.style.transform = "none";
      }
    };

    const animate = async () => {
      if (animatedRef.current || cancelled || !headlineRef.current) {
        return;
      }

      animatedRef.current = true;
      const { gsap } = await import("gsap");
      if (cancelled || !headlineRef.current) {
        revealAllChars();
        return;
      }

      const root = headlineRef.current;
      const lines = root.querySelectorAll(".hero-kinetic-line:not(.hero-kinetic-accent)");

      gsap.set(root.querySelectorAll(".hero-kinetic-line:not(.hero-kinetic-accent) .hero-kinetic-char"), {
        opacity: 0,
        y: 12,
        rotateZ: -4,
        scale: 0.9,
      });

      if (accentRef.current) {
        gsap.set(accentRef.current, { opacity: 0, y: 14, scale: 0.96 });
      }

      const master = gsap.timeline({ delay: HERO_MOTION_TIMINGS.headlineStart });

      lines.forEach((line, lineIndex) => {
        const words = line.querySelectorAll(".hero-kinetic-word");
        words.forEach((word, wordIndex) => {
          const chars = word.querySelectorAll(".hero-kinetic-char");
          master.to(
            chars,
            {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              scale: 1,
              duration: HERO_MOTION_TIMINGS.lineBuildMs / 1000 / Math.max(chars.length, 1),
              stagger: 0.025,
              ease: "power3.out",
            },
            lineIndex * 0.85 + wordIndex * 0.12,
          );

          master.to(
            word,
            {
              duration: HERO_MOTION_TIMINGS.glowSweepMs / 1000,
              ease: "power2.inOut",
              onStart: () => word.classList.add("hero-kinetic-word--glow"),
              onComplete: () => word.classList.remove("hero-kinetic-word--glow"),
            },
            ">+0.05",
          );
        });
      });

      if (accentRef.current) {
        master.to(
          accentRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          titleLines.length * 0.85,
        );
      }

      shimmerInterval = setInterval(() => {
        root.classList.add("hero-kinetic-headline--shimmer");
        window.setTimeout(() => root.classList.remove("hero-kinetic-headline--shimmer"), 700);
      }, HERO_MOTION_TIMINGS.shimmerIntervalMs);
    };

    const scheduleAnimation = () => {
      fallbackTimer = window.setTimeout(() => {
        if (!animatedRef.current) {
          revealAllChars();
        }
      }, 3500);

      void animate().finally(() => {
        if (fallbackTimer) {
          window.clearTimeout(fallbackTimer);
        }
      });
    };

    if (motion?.loadTimelineReady) {
      scheduleAnimation();
    } else {
      const onReady = () => scheduleAnimation();
      window.addEventListener("hero-headline-ready", onReady, { once: true });
      fallbackTimer = window.setTimeout(() => {
        window.removeEventListener("hero-headline-ready", onReady);
        scheduleAnimation();
      }, 1500);
    }

    return () => {
      cancelled = true;
      if (shimmerInterval) {
        clearInterval(shimmerInterval);
      }
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, [reduced, motion?.tier, motion?.loadTimelineReady, titleLines, titleAccent]);

  if (reduced || motion?.tier === "reduced") {
    return (
      <h1 aria-label={ariaLabel} className={`hero-kinetic-headline ${className ?? ""}`}>
        {titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className="block marketing-title-accent hero-kinetic-accent">{titleAccent}</span>
      </h1>
    );
  }

  return (
    <h1
      ref={headlineRef}
      aria-label={ariaLabel}
      className={`hero-kinetic-headline hero-kinetic-headline--${variant} ${className ?? ""}`}
    >
      {titleLineEntries.map((line) => (
        <span key={line.text} className="hero-kinetic-line block" data-depth={line.depth}>
          {renderLineWords(line.text, line.text)}
        </span>
      ))}
      <span
        ref={accentRef}
        className="hero-kinetic-line hero-kinetic-accent marketing-title-accent block"
        data-depth={2}
      >
        {titleAccent}
      </span>
    </h1>
  );
}
