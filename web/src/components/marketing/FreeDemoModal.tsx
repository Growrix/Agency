"use client";

import { Dialog } from "@headlessui/react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { FreeDemoCounter } from "@/components/marketing/FreeDemoCounter";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  showForm: boolean;
  onClose: () => void;
  onOpenForm: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    title: "Expert Strategy",
    body: "Insights tailored to your business goals.",
    icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  },
  {
    title: "Actionable Roadmap",
    body: "Clear plan to launch faster and smarter.",
    icon: (
      <>
        <circle cx={12} cy={12} r={9} />
        <circle cx={12} cy={12} r={5} />
        <circle cx={12} cy={12} r={1.4} fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "Custom Recommendations",
    body: "Design, tech & content that converts.",
    icon: (
      <>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M8 13h8M8 17h5" />
      </>
    ),
  },
  {
    title: "No Obligation",
    body: "100% free. No credit card required.",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

function FreeDemoHero({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  const size = compact ? "h-16 w-16" : "h-20 w-20 sm:h-24 sm:w-24";
  const float = (delay: number, distance: number): Variants =>
    reduced
      ? { animate: { y: 0 } }
      : {
          animate: {
            y: [0, -distance, 0],
            transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
          },
        };

  return (
    <div className={cn("relative mx-auto flex items-center justify-center", size)} aria-hidden>
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
      <motion.div
        className="absolute -left-1 top-1 flex h-8 w-8 items-center justify-center rounded-lg border border-primary/40 bg-surface shadow-(--shadow-2) sm:h-9 sm:w-9"
        variants={float(0.2, 5)}
        animate="animate"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-primary" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          <circle cx={12} cy={12} r={3.5} />
        </svg>
      </motion.div>
      <motion.div
        className="absolute -right-1 bottom-1 flex h-8 w-10 items-center justify-center rounded-md border border-primary/40 bg-surface shadow-(--shadow-2) sm:h-9 sm:w-11"
        variants={float(0.9, 4)}
        animate="animate"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-primary" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <rect x={3} y={4} width={18} height={16} rx={2} />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
        </svg>
      </motion.div>
      <svg viewBox="0 0 120 120" className={cn("relative drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]", size)}>
        <defs>
          <linearGradient id="gift-ribbon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-primary-hover)" />
          </linearGradient>
        </defs>
        <rect x={20} y={52} width={80} height={56} rx={6} fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth={1.5} />
        <rect x={16} y={40} width={88} height={16} rx={4} fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth={1.5} />
        <rect x={54} y={40} width={12} height={68} rx={2} fill="url(#gift-ribbon)" />
        <rect x={16} y={46} width={88} height={6} fill="url(#gift-ribbon)" opacity={0.9} />
        <path d="M60 40c-8-10-20-4-14 6 2 3 8 4 14 4M60 40c8-10 20-4 14 6-2 3-8 4-14 4" fill="url(#gift-ribbon)" />
        <text x={60} y={86} textAnchor="middle" fontFamily="var(--font-display), system-ui, sans-serif" fontSize={20} fontWeight={700} fill="var(--color-primary)">
          G
        </text>
      </svg>
    </div>
  );
}

function PromoPanel({
  onOpenForm,
  onClose,
  compact = false,
}: {
  onOpenForm: () => void;
  onClose: () => void;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
  };
  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
      };

  return (
    <motion.div
      className={cn(compact ? "space-y-3" : "space-y-4 sm:space-y-5")}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={item} className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-text">
          <span aria-hidden>✨</span> Limited launch offer
        </span>
      </motion.div>

      <motion.div variants={item}>
        <FreeDemoHero compact={compact} />
      </motion.div>

      <motion.div variants={item} className="text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Growrix OS Launch Special</p>
        <Dialog.Title
          className={cn(
            "mx-auto mt-1.5 max-w-xl font-display tracking-tight text-text",
            compact ? "text-xl leading-snug" : "text-2xl sm:text-[1.65rem] sm:leading-tight",
          )}
        >
          First 20 founders get a{" "}
          <span className="text-primary">FREE website strategy demo</span>
        </Dialog.Title>
        <p className={cn("mx-auto mt-1.5 max-w-lg text-text-muted", compact ? "text-xs" : "text-sm")}>
          Share your business goals, references, and files — we turn it into an accurate website plan worth{" "}
          <span className="font-semibold text-primary">$499</span>.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <FreeDemoCounter withRing />
      </motion.div>

      <motion.ul
        variants={item}
        className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4 sm:gap-3")}
      >
        {FEATURES.map((feature) => (
          <li key={feature.title} className="rounded-md border border-border/60 bg-inset/30 p-2.5 text-center sm:p-3">
            <span className="mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary sm:h-8 sm:w-8">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 sm:h-4 sm:w-4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                {feature.icon}
              </svg>
            </span>
            <p className="text-[11px] font-medium text-text sm:text-xs">{feature.title}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-text-muted sm:text-[11px]">{feature.body}</p>
          </li>
        ))}
      </motion.ul>

      <motion.div variants={item} className="space-y-1.5 sm:space-y-2">
        <motion.button
          type="button"
          onClick={onOpenForm}
          whileHover={reduced ? undefined : { scale: 1.02 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-primary to-(--c-success) px-5 py-2.5 text-[15px] font-semibold tracking-tight text-surface shadow-(--shadow-2) transition-transform duration-200 ease-(--ease-signal) sm:py-3 sm:text-base"
        >
          Claim my free demo
          <span aria-hidden>→</span>
        </motion.button>
        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-sm text-text-muted underline-offset-4 hover:text-text hover:underline"
        >
          Maybe later
        </button>
      </motion.div>

      <motion.p variants={item} className="flex items-center justify-center gap-1.5 pb-0.5 text-[11px] text-text-muted">
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x={5} y={11} width={14} height={10} rx={2} />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        Secure. Private. No spam.
      </motion.p>
    </motion.div>
  );
}

export function FreeDemoModal({ open, showForm, onClose, onOpenForm }: Props) {
  const reduced = useReducedMotion();
  const panelMotion = reduced
    ? { initial: false, animate: undefined }
    : {
        initial: { opacity: 0, scale: 0.96, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.4, ease: EASE },
      };

  const desktopPanel = (
    <motion.div {...panelMotion} className="flex max-h-full w-full max-w-3xl justify-center">
      <Dialog.Panel
        className={cn(
          "flex max-h-[min(88dvh,860px)] w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-3)",
          showForm && "max-w-3xl",
        )}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border/50 px-6 py-3 sm:px-8 sm:py-4">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
            {showForm ? "Project intake" : "Limited launch offer"}
          </p>
          <button
            type="button"
            className="-mr-1 -mt-0.5 rounded-md px-2 py-1 text-text-muted transition-colors hover:bg-inset hover:text-text"
            onClick={onClose}
            aria-label="Close free demo modal"
          >
            ✕
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4 sm:px-8 sm:py-5">
          {showForm ? (
            <IntakeForm onSuccess={onClose} isFreeDemo />
          ) : (
            <PromoPanel onOpenForm={onOpenForm} onClose={onClose} />
          )}
        </div>
      </Dialog.Panel>
    </motion.div>
  );

  const mobilePanel = (
    <motion.div {...panelMotion} className="flex w-full max-h-[min(90dvh,720px)] flex-col">
      <Dialog.Panel className="flex max-h-[min(90dvh,720px)] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-(--shadow-3)">
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-3">
          <Dialog.Title className="font-display text-base">
            {showForm ? "Tell us about your project" : "Free demo launch"}
          </Dialog.Title>
          <button type="button" className="text-text-muted hover:text-text" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
          {showForm ? (
            <IntakeForm onSuccess={onClose} isFreeDemo />
          ) : (
            <PromoPanel onOpenForm={onOpenForm} onClose={onClose} compact />
          )}
        </div>
      </Dialog.Panel>
    </motion.div>
  );

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <motion.div
        className="fixed inset-0 bg-overlay/60 backdrop-blur-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden
      />
      <MarketingViewportGate
        mobile={
          <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-dvh items-end justify-center pb-[max(env(safe-area-inset-bottom),0.5rem)]">
            {mobilePanel}
          </div>
        }
        desktop={
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-6 py-8 sm:p-8 sm:py-10">
            {desktopPanel}
          </div>
        }
      />
    </Dialog>
  );
}
