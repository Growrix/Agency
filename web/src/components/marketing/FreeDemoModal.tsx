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
    title: "AI-Powered Strategy",
    body: "Smart insights tailored to your business.",
    icon: (
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    ),
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

function FreeDemoHero() {
  const reduced = useReducedMotion();
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
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center" aria-hidden>
      {/* Soft glow */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
      {/* Floating AI icon */}
      <motion.div
        className="absolute -left-2 top-2 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-surface shadow-(--shadow-2)"
        variants={float(0.2, 6)}
        animate="animate"
      >
        <span className="text-xs font-semibold tracking-tight text-primary">AI</span>
      </motion.div>
      {/* Floating browser icon */}
      <motion.div
        className="absolute -right-1 bottom-3 flex h-10 w-12 items-center justify-center rounded-lg border border-primary/40 bg-surface shadow-(--shadow-2)"
        variants={float(0.9, 5)}
        animate="animate"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <rect x={3} y={4} width={18} height={16} rx={2} />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
        </svg>
      </motion.div>
      {/* Gift box */}
      <svg viewBox="0 0 120 120" className="relative h-28 w-28 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
        <defs>
          <linearGradient id="gift-ribbon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-primary-hover)" />
          </linearGradient>
        </defs>
        {/* Box body */}
        <rect x={20} y={52} width={80} height={56} rx={6} fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth={1.5} />
        {/* Lid */}
        <rect x={16} y={40} width={88} height={16} rx={4} fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth={1.5} />
        {/* Vertical ribbon */}
        <rect x={54} y={40} width={12} height={68} rx={2} fill="url(#gift-ribbon)" />
        {/* Horizontal ribbon */}
        <rect x={16} y={46} width={88} height={6} fill="url(#gift-ribbon)" opacity={0.9} />
        {/* Bow */}
        <path d="M60 40c-8-10-20-4-14 6 2 3 8 4 14 4M60 40c8-10 20-4 14 6-2 3-8 4-14 4" fill="url(#gift-ribbon)" />
        {/* G logo mark */}
        <text x={60} y={86} textAnchor="middle" fontFamily="var(--font-display), system-ui, sans-serif" fontSize={20} fontWeight={700} fill="var(--color-primary)">G</text>
      </svg>
    </div>
  );
}

function PromoPanel({ onOpenForm, onClose }: { onOpenForm: () => void; onClose: () => void }) {
  const reduced = useReducedMotion();
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <motion.div
      className="space-y-5"
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
        <FreeDemoHero />
      </motion.div>

      <motion.div variants={item} className="text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Growrix OS Launch Special</p>
        <Dialog.Title className="mx-auto mt-2 max-w-md font-display text-2xl tracking-tight text-text sm:text-[28px] sm:leading-tight">
          First 20 founders get a{" "}
          <span className="text-primary">FREE AI-powered website strategy demo</span>
        </Dialog.Title>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
          Share your business goals, references, and files — we turn it into an accurate website plan worth{" "}
          <span className="font-semibold text-primary">$499</span>.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <FreeDemoCounter withRing />
      </motion.div>

      <motion.ul variants={item} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="rounded-md border border-border/60 bg-inset/30 p-3 text-center">
            <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                {feature.icon}
              </svg>
            </span>
            <p className="text-xs font-medium text-text">{feature.title}</p>
            <p className="mt-1 text-[11px] leading-snug text-text-muted">{feature.body}</p>
          </li>
        ))}
      </motion.ul>

      <motion.div variants={item} className="space-y-2">
        <motion.button
          type="button"
          onClick={onOpenForm}
          whileHover={reduced ? undefined : { scale: 1.02 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-primary to-(--c-success) px-5 py-3 text-base font-semibold tracking-tight text-surface shadow-(--shadow-2) transition-transform duration-200 ease-(--ease-signal)"
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

      <motion.p variants={item} className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted">
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
        initial: { opacity: 0, scale: 0.94, y: 8 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.42, ease: EASE },
      };

  const desktopPanel = (
    <motion.div {...panelMotion}>
      <Dialog.Panel
        className={cn(
          "w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-(--shadow-3) sm:p-8",
          showForm && "max-w-3xl",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
            {showForm ? "Project intake" : "Limited launch offer"}
          </p>
          <button
            type="button"
            className="-mr-1 -mt-1 rounded-md px-2 py-1 text-text-muted transition-colors hover:bg-inset hover:text-text"
            onClick={onClose}
            aria-label="Close free demo modal"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">
          {showForm ? <IntakeForm onSuccess={onClose} isFreeDemo /> : <PromoPanel onOpenForm={onOpenForm} onClose={onClose} />}
        </div>
      </Dialog.Panel>
    </motion.div>
  );

  const mobilePanel = (
    <motion.div {...panelMotion}>
      <Dialog.Panel className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-(--shadow-3)">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <Dialog.Title className="font-display text-lg">
            {showForm ? "Tell us about your project" : "Free demo launch"}
          </Dialog.Title>
          <button type="button" className="text-text-muted hover:text-text" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-4">
          {showForm ? <IntakeForm onSuccess={onClose} isFreeDemo /> : <PromoPanel onOpenForm={onOpenForm} onClose={onClose} />}
        </div>
      </Dialog.Panel>
    </motion.div>
  );

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50" initialFocus={undefined}>
      <motion.div
        className="fixed inset-0 bg-overlay/60 backdrop-blur-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden
      />
      <MarketingViewportGate
        mobile={
          <div className="fixed inset-x-0 bottom-0 flex items-end justify-center">
            {mobilePanel}
          </div>
        }
        desktop={
          <div className="fixed inset-0 flex items-center justify-center p-4">{desktopPanel}</div>
        }
      />
    </Dialog>
  );
}
