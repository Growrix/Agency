import Link from "next/link";
import { ClockIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { WHATSAPP_HREF } from "@/lib/nav";

export function UtilityRibbon() {
  return (
    <div className="hidden md:block bg-[var(--color-contrast)] text-[var(--color-contrast-text)]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12 py-2 text-[12px] tracking-wide">
        <div className="flex items-center gap-5 text-white/75">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
            Booking discovery calls for Q2
          </span>
          <span className="hidden lg:inline-flex items-center gap-1.5">
            <ClockIcon className="size-3.5" aria-hidden />
            Avg response under 2 business hours
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link href={WHATSAPP_HREF} className="inline-flex items-center gap-1.5 text-white/85 hover:text-white">
            <ChatBubbleLeftRightIcon className="size-3.5" aria-hidden />
            WhatsApp
          </Link>
          <Link href="/shop" className="text-[var(--color-secondary)] hover:opacity-90">
            Spring bundle: 20% off MCP starters →
          </Link>
        </div>
      </div>
    </div>
  );
}
