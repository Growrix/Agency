"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const DESKTOP_SIDEBAR_QUERY = "(min-width: 1024px)";
const STICKY_GAP_PX = 12;

type SidebarLayoutState = "static" | "fixed" | "absolute-bottom";

function readSiteChromeHeightPx() {
  const spacer = document.querySelector<HTMLElement>("[data-testid='site-top-chrome-spacer']");
  if (spacer) {
    return spacer.getBoundingClientRect().height;
  }

  const styles = getComputedStyle(document.documentElement);
  const raw = styles.getPropertyValue("--site-chrome-height").trim();
  const rootFont = Number.parseFloat(styles.fontSize) || 16;
  const remMatch = /^([\d.]+)rem$/.exec(raw);
  if (remMatch) {
    return Number.parseFloat(remMatch[1] ?? "") * rootFont;
  }

  return 64;
}

export function ShopStickyFilterSidebar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const columnRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [layout, setLayout] = useState<{
    state: SidebarLayoutState;
    width: number;
    left: number;
    top: number;
    height: number;
  }>({
    state: "static",
    width: 0,
    left: 0,
    top: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const column = columnRef.current;
    const panel = panelRef.current;
    if (!column || !panel) {
      return;
    }

    const sync = () => {
      if (!window.matchMedia(DESKTOP_SIDEBAR_QUERY).matches) {
        setLayout((current) => (current.state === "static" ? current : { ...current, state: "static" }));
        return;
      }

      const stickyTop = readSiteChromeHeightPx() + STICKY_GAP_PX;
      const columnRect = column.getBoundingClientRect();
      const panelHeight = panel.offsetHeight;

      if (columnRect.top >= stickyTop) {
        setLayout({
          state: "static",
          width: 0,
          left: 0,
          top: 0,
          height: panelHeight,
        });
        return;
      }

      if (columnRect.bottom <= stickyTop + panelHeight) {
        setLayout({
          state: "absolute-bottom",
          width: column.offsetWidth,
          left: 0,
          top: 0,
          height: panelHeight,
        });
        return;
      }

      setLayout({
        state: "fixed",
        width: column.offsetWidth,
        left: columnRect.left,
        top: stickyTop,
        height: panelHeight,
      });
    };

    const observer = new ResizeObserver(sync);
    observer.observe(column);
    observer.observe(panel);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const { state, width, left, top, height } = layout;

  return (
    <div ref={columnRef} className="relative min-w-0 self-stretch">
      {state === "fixed" ? <div aria-hidden="true" style={{ height }} className="w-full" /> : null}
      <aside
        ref={panelRef}
        className={cn(
          "space-y-6 rounded-2xl border border-border bg-surface p-5",
          state === "fixed" && "fixed z-30 overflow-y-auto overscroll-contain",
          state === "absolute-bottom" && "absolute inset-x-0 bottom-0",
          className,
        )}
        style={
          state === "fixed"
            ? {
                top,
                left,
                width,
                maxHeight: `calc(100dvh - ${top}px - 1rem)`,
              }
            : undefined
        }
      >
        {children}
      </aside>
    </div>
  );
}
