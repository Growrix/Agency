import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HomeDesktopSplitSectionProps = {
  rail: ReactNode;
  content: ReactNode;
  reverse?: boolean;
  className?: string;
};

export function HomeDesktopSplitSection({
  rail,
  content,
  reverse = false,
  className,
}: HomeDesktopSplitSectionProps) {
  return (
    <div
      className={cn(
        "home-desktop-marketing__split",
        reverse && "home-desktop-marketing__split--reverse",
        className,
      )}
    >
      <div className="home-desktop-marketing__split-rail">{rail}</div>
      <div className="home-desktop-marketing__split-content">{content}</div>
    </div>
  );
}
