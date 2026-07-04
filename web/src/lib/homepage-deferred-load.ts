type HomepageBundleLoadTiming = "after-load" | "after-domcontentloaded";

type HomepageBundleLoadOptions = {
  timing?: HomepageBundleLoadTiming;
  useIdle?: boolean;
};

function scheduleIdleCallback(callback: () => void): () => void {
  const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 1));
  const handle = idle(callback);

  return () => {
    if (window.cancelIdleCallback && typeof handle === "number") {
      window.cancelIdleCallback(handle);
      return;
    }
    if (typeof handle === "number") {
      clearTimeout(handle);
    }
  };
}

/**
 * Schedule homepage bundles with controlled timing.
 * - after-load: conservative for heavy sections to protect DCL resource budget.
 * - after-domcontentloaded: earlier start for critical above-the-fold bundles.
 */
export function scheduleHomepageBundleLoad(
  callback: () => void,
  options: HomepageBundleLoadOptions = {},
): () => void {
  const timing = options.timing ?? "after-load";
  const useIdle = options.useIdle ?? true;

  const run = () => {
    callback();
    return () => {};
  };

  if (timing === "after-domcontentloaded") {
    if (document.readyState === "loading") {
      let cancelIdle = () => {};
      const onReady = () => {
        cancelIdle = useIdle ? scheduleIdleCallback(callback) : run();
      };
      window.addEventListener("DOMContentLoaded", onReady, { once: true });

      return () => {
        window.removeEventListener("DOMContentLoaded", onReady);
        cancelIdle();
      };
    }

    return useIdle ? scheduleIdleCallback(callback) : run();
  }

  if (document.readyState === "complete") {
    return useIdle ? scheduleIdleCallback(callback) : run();
  }

  window.addEventListener("load", callback, { once: true });
  return () => window.removeEventListener("load", callback);
}
