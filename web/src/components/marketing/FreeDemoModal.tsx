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
    body: "Insights tailored to your goals.",
    icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  },
  {
    title: "Actionable Roadmap",
    body: "Launch faster and smarter.",
    icon: (
      <>
        <circle cx={12} cy={12} r={9} />
        <circle cx={12} cy={12} r={5} />
        <circle cx={12} cy={12} r={1.4} fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "Custom Plan",
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
    body: "Free. No credit card.",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

/** Mock-matching gift hero: ribbon box, inner teal glow, floating browser + sparkles (no AI badge). */
function FreeDemoHero({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  const stage = compact ? "h-[88px] w-[140px]" : "h-[112px] w-[180px] sm:h-[120px] sm:w-[200px]";
  const box = compact ? "h-[72px] w-[72px]" : "h-[88px] w-[88px] sm:h-[96px] sm:w-[96px]";

  const float = (delay: number, distance: number): Variants =>
    reduced
      ? { animate: { y: 0 } }
      : {
          animate: {
            y: [0, -distance, 0],
            transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay },
          },
        };

  const sparkle = (delay: number): Variants =>
    reduced
      ? { animate: { opacity: 0.85, scale: 1 } }
      : {
          animate: {
            opacity: [0.35, 1, 0.35],
            scale: [0.85, 1.15, 0.85],
            transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay },
          },
        };

  return (
    <div className={cn("relative mx-auto", stage)} aria-hidden>
      {/* Soft floor glow */}
      <div className="pointer-events-none absolute inset-x-6 bottom-1 h-8 rounded-full bg-primary/35 blur-xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-2xl" />

      {/* Sparkles */}
      <motion.span className="absolute left-[18%] top-[8%] text-primary" variants={sparkle(0)} animate="animate">
        <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
          <path d="M12 2l1.2 6.3L19 9l-5.8 1.7L12 17l-1.2-6.3L5 9l5.8-0.7L12 2z" />
        </svg>
      </motion.span>
      <motion.span className="absolute right-[14%] top-[18%] text-primary" variants={sparkle(0.6)} animate="animate">
        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
          <path d="M12 2l1.2 6.3L19 9l-5.8 1.7L12 17l-1.2-6.3L5 9l5.8-0.7L12 2z" />
        </svg>
      </motion.span>
      <motion.span className="absolute bottom-[22%] left-[10%] text-primary" variants={sparkle(1.1)} animate="animate">
        <svg viewBox="0 0 24 24" className="h-2 w-2 fill-current">
          <path d="M12 2l1.2 6.3L19 9l-5.8 1.7L12 17l-1.2-6.3L5 9l5.8-0.7L12 2z" />
        </svg>
      </motion.span>

      {/* Floating strategy chip (replaces AI badge from mock) */}
      <motion.div
        className="absolute left-0 top-[18%] z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-primary/50 bg-surface/95 shadow-(--shadow-2) sm:h-10 sm:w-10"
        variants={float(0.15, 6)}
        animate="animate"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-primary" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      </motion.div>

      {/* Floating browser window */}
      <motion.div
        className="absolute bottom-[16%] right-0 z-10 flex h-9 w-11 items-center justify-center rounded-lg border border-primary/50 bg-surface/95 shadow-(--shadow-2) sm:h-10 sm:w-12"
        variants={float(0.85, 5)}
        animate="animate"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-primary" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <rect x={3} y={4} width={18} height={16} rx={2} />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
        </svg>
      </motion.div>

      {/* Gift box */}
      <div className={cn("absolute left-1/2 top-1/2 z-1 -translate-x-1/2 -translate-y-[46%]", box)}>
        <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-[0_10px_22px_rgba(0,0,0,0.45)]">
          <defs>
            <linearGradient id="gift-ribbon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-hover)" />
            </linearGradient>
            <radialGradient id="gift-glow" cx="50%" cy="70%" r="55%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gift-lid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="color-mix(in srgb, var(--color-surface) 92%, white)" />
              <stop offset="100%" stopColor="var(--color-surface)" />
            </linearGradient>
          </defs>
          {/* Inner glow */}
          <ellipse cx="60" cy="78" rx="38" ry="22" fill="url(#gift-glow)" />
          {/* Box body */}
          <rect x="22" y="52" width="76" height="52" rx="7" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
          {/* Front face highlight */}
          <path d="M26 56h68v20H26z" fill="url(#gift-glow)" opacity="0.35" />
          {/* Lid */}
          <rect x="18" y="38" width="84" height="18" rx="5" fill="url(#gift-lid)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
          {/* Ribbon */}
          <rect x="54" y="38" width="12" height="66" rx="2" fill="url(#gift-ribbon)" />
          <rect x="18" y="44" width="84" height="6" fill="url(#gift-ribbon)" opacity="0.95" />
          {/* Bow */}
          <path
            d="M60 38c-9-11-22-5-15 6 2.5 3.5 9 4.5 15 4.5M60 38c9-11 22-5 15 6-2.5 3.5-9 4.5-15 4.5"
            fill="url(#gift-ribbon)"
          />
          <circle cx="60" cy="42" r="3.2" fill="var(--color-primary)" />
          {/* G mark */}
          <text
            x="60"
            y="88"
            textAnchor="middle"
            fontFamily="var(--font-display), system-ui, sans-serif"
            fontSize="22"
            fontWeight="700"
            fill="var(--color-primary)"
          >
            G
          </text>
        </svg>
      </div>
    </div>
  );
}

function PromoCta({
  onOpenForm,
  onClose,
  compact,
}: {
  onOpenForm: () => void;
  onClose: () => void;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("space-y-1.5", compact ? "pt-1" : "pt-0.5")}>
      <motion.button
        type="button"
        onClick={onOpenForm}
        whileHover={reduced ? undefined : { scale: 1.015 }}
        whileTap={reduced ? undefined : { scale: 0.985 }}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-primary to-(--c-success) font-semibold tracking-tight text-surface shadow-(--shadow-2) transition-transform duration-200 ease-(--ease-signal)",
          compact ? "px-4 py-2.5 text-[14px]" : "px-5 py-2.5 text-[15px] sm:py-3 sm:text-base",
        )}
      >
        Claim my free demo
        <span aria-hidden>→</span>
      </motion.button>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-border/80 px-3 py-1.5 text-xs text-text-muted hover:border-border-strong hover:text-text sm:text-sm"
        >
          Maybe later
        </button>
        <p className="flex items-center gap-1 text-[10px] text-text-muted sm:text-[11px]">
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x={5} y={11} width={14} height={10} rx={2} />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Secure. Private. No spam.
        </p>
      </div>
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
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
  };
  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
      };

  return (
    <motion.div className="flex min-h-0 flex-1 flex-col" variants={container} initial="hidden" animate="visible">
      <div
        className={cn(
          "min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain",
          compact ? "space-y-1.5" : "sm:space-y-2.5",
        )}
      >
        <motion.div variants={item} className="flex justify-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-text sm:text-[11px]">
            <span aria-hidden>✨</span> Limited launch offer
          </span>
        </motion.div>

        <motion.div variants={item}>
          <FreeDemoHero compact={compact} />
        </motion.div>

        <motion.div variants={item} className="text-center">
          <p className="text-[10px] uppercase tracking-[0.16em] text-primary sm:text-xs">Growrix OS Launch Special</p>
          <Dialog.Title
            className={cn(
              "mx-auto mt-1 max-w-2xl font-display tracking-tight text-text",
              compact ? "text-lg leading-snug" : "text-xl leading-snug sm:text-2xl sm:leading-tight",
            )}
          >
            First 20 founders get a <span className="text-primary">FREE website strategy demo</span>
          </Dialog.Title>
          <p className={cn("mx-auto mt-1 max-w-xl text-text-muted", compact ? "text-[11px] leading-snug" : "text-xs sm:text-sm")}>
            Share your goals, references, and files — we turn it into an accurate website plan worth{" "}
            <span className="font-semibold text-primary">$499</span>.
          </p>
        </motion.div>

        <motion.div variants={item}>
          <FreeDemoCounter withRing dense />
        </motion.div>

        <motion.ul variants={item} className={cn("grid gap-1.5", compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4 sm:gap-2")}>
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className={cn(
                "rounded-md border border-border/60 bg-inset/25 text-center",
                compact ? "px-1.5 py-1.5" : "px-2 py-2",
              )}
            >
              <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  {feature.icon}
                </svg>
              </span>
              <p className="text-[10px] font-medium text-text sm:text-[11px]">{feature.title}</p>
              <p className="mt-0.5 hidden text-[10px] leading-snug text-text-muted sm:block">{feature.body}</p>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Sticky CTA — always visible without scrolling the offer */}
      <motion.div
        variants={item}
        className="shrink-0 border-t border-border/50 bg-surface pt-2.5"
      >
        <PromoCta onOpenForm={onOpenForm} onClose={onClose} compact={compact} />
      </motion.div>
    </motion.div>
  );
}

export function FreeDemoModal({ open, showForm, onClose, onOpenForm }: Props) {
  const reduced = useReducedMotion();
  const panelMotion = reduced
    ? { initial: false, animate: undefined }
    : {
        initial: { opacity: 0, scale: 0.97, y: 8 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.38, ease: EASE },
      };

  const desktopPanel = (
    <motion.div {...panelMotion} className="flex w-full max-w-4xl justify-center">
      <Dialog.Panel
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-3)",
          showForm ? "max-h-[min(90dvh,860px)]" : "max-h-[min(92dvh,720px)]",
        )}
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-20 rounded-md px-2 py-1 text-text-muted transition-colors hover:bg-inset hover:text-text"
          onClick={onClose}
          aria-label="Close free demo modal"
        >
          ✕
        </button>

        {showForm ? (
          <>
            <div className="shrink-0 border-b border-border/50 px-6 py-3 pr-12 sm:px-8">
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Project intake</p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4 sm:px-8">
              <IntakeForm onSuccess={onClose} isFreeDemo />
            </div>
          </>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col px-6 pb-3 pt-4 sm:px-10 sm:pb-4 sm:pt-5">
            <PromoPanel onOpenForm={onOpenForm} onClose={onClose} />
          </div>
        )}
      </Dialog.Panel>
    </motion.div>
  );

  const mobilePanel = (
    <motion.div {...panelMotion} className="flex w-full flex-col">
      <Dialog.Panel
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-(--shadow-3)",
          showForm ? "max-h-[min(92dvh,760px)]" : "h-[min(88dvh,640px)] max-h-[88dvh]",
        )}
      >
        <button
          type="button"
          className="absolute right-2.5 top-2.5 z-20 rounded-md px-2 py-1 text-text-muted hover:text-text"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {showForm ? (
          <>
            <div className="shrink-0 border-b border-border/60 px-4 py-3 pr-10">
              <Dialog.Title className="font-display text-base">Tell us about your project</Dialog.Title>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
              <IntakeForm onSuccess={onClose} isFreeDemo />
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-0 flex-col px-3.5 pb-2.5 pt-3">
            <PromoPanel onOpenForm={onOpenForm} onClose={onClose} compact />
          </div>
        )}
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
          <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-dvh items-end justify-center pb-[max(env(safe-area-inset-bottom),0.25rem)]">
            {mobilePanel}
          </div>
        }
        desktop={
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 py-6 sm:p-8 sm:py-8">
            {desktopPanel}
          </div>
        }
      />
    </Dialog>
  );
}
