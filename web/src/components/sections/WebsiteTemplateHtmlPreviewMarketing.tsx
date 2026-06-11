"use client";

import {
  DevicePhoneMobileIcon,
  FingerPrintIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SignalIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { HTML_MOBILE_VIEWPORT_WIDTH } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";

const MOBILE_FEATURES = [
  { icon: DevicePhoneMobileIcon, label: "390px frame", hint: "Standard mobile width" },
  { icon: SignalIcon, label: "Live HTML", hint: "Not a screenshot" },
  { icon: FingerPrintIcon, label: "Touch-ready", hint: "Built for thumbs" },
  { icon: GlobeAltIcon, label: "Responsive", hint: "Breakpoints included" },
] as const;

function MobileFeatureTile({
  icon: Icon,
  label,
  hint,
  index,
}: {
  icon: typeof SignalIcon;
  label: string;
  hint: string;
  index: number;
}) {
  return (
    <motion.div
      className="rounded-md border border-border bg-surface/80 px-3 py-2.5"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2.5">
        <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm tracking-tight">{label}</p>
          <p className="text-xs leading-5 text-text-muted">{hint}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function WebsiteTemplateHtmlMobilePreviewMarketing() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <DevicePhoneMobileIcon className="size-4 text-primary" aria-hidden />
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Mobile Preview</p>
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          Live responsive
        </motion.span>
      </div>
      <h3 className="mt-2.5 font-display text-xl sm:text-2xl tracking-tight text-balance">
        Mobile-first proof that builds buyer confidence
      </h3>
      <p className="mt-2.5 text-sm leading-6 text-text-muted">
        Preview this template in a {HTML_MOBILE_VIEWPORT_WIDTH}px device frame — verify readability, spacing, and CTA
        placement on the screen that matters most.
      </p>

      <div className="mt-3.5 grid grid-cols-2 gap-2">
        {MOBILE_FEATURES.map((feature, index) => (
          <MobileFeatureTile key={feature.label} {...feature} index={index} />
        ))}
      </div>

      <p className="mt-3.5 flex items-start gap-2 text-sm leading-6 text-text-muted">
        <SparklesIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <span>
          <span className="font-display text-text">Same HTML as desktop.</span> One template, consistent brand on every
          screen.
        </span>
      </p>
    </>
  );
}

export function WebsiteTemplateHtmlProductPreviewHighlights() {
  const items = [
    { icon: SignalIcon, label: "Live HTML", hint: "Real pages in-frame" },
    { icon: DevicePhoneMobileIcon, label: "Responsive", hint: "Desktop + mobile ready" },
    { icon: ShieldCheckIcon, label: "Buy-ready", hint: "Three launch paths" },
    { icon: GlobeAltIcon, label: "Scrollable", hint: "Explore every section" },
  ] as const;

  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Preview highlights</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-md border border-border/80 bg-inset/30 px-2.5 py-2.5">
              <Icon className="size-4 text-primary" aria-hidden />
              <p className="mt-1.5 text-xs font-semibold leading-5">{item.label}</p>
              <p className="text-[11px] leading-4 text-text-muted">{item.hint}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
