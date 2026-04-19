"use client";

import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE_SIGNAL = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "whileInView" | "transition" | "variants">;

export function Reveal({
  children,
  delay = 0,
  y = 14,
  duration = 0.55,
  className,
  once = true,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px 0px -60px 0px" }}
      transition={{ duration, ease: EASE_SIGNAL, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_SIGNAL } },
};

export function RevealGroup({
  children,
  className,
  stagger,
  once = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  as?: "div" | "ol" | "ul";
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }
  const variants: Variants = stagger
    ? { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } } }
    : groupVariants;
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px 0px -60px 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}

function parseStat(value: string) {
  const m = value.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  if (!m) return null;
  const num = Number(m[2].replace(/,/g, ""));
  if (!Number.isFinite(num)) return null;
  return { prefix: m[1], num, suffix: m[3] };
}

export function CountUp({
  value,
  duration = 1.4,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const reduced = useReducedMotion();
  const parsed = parseStat(value);
  const [display, setDisplay] = useState<string>(() => {
    if (!parsed) return value;
    if (reduced) return value;
    return `${parsed.prefix}0${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed) return;
    if (reduced || !inView) {
      setDisplay(value);
      return;
    }
    const decimals = (parsed.num.toString().split(".")[1] ?? "").length;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      const current = parsed.num * eased;
      const formatted =
        decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString();
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced, parsed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export { AnimatePresence, motion };
