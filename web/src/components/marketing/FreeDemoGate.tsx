"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleHomepageBundleLoad } from "@/lib/homepage-deferred-load";

const FreeDemoPopup = dynamic(
  () => import("@/components/marketing/FreeDemoPopup").then((mod) => mod.FreeDemoPopup),
  { ssr: false },
);

export function FreeDemoGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Mount early so the 5s offer timer can start without waiting for full window load.
    return scheduleHomepageBundleLoad(() => setReady(true), {
      timing: "after-domcontentloaded",
      useIdle: false,
    });
  }, []);

  if (!ready) {
    return null;
  }

  return <FreeDemoPopup />;
}
