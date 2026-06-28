/** Schedule heavy homepage bundles after window load so domcontentloaded resource budget stays ≤ 30. */
export function scheduleHomepageBundleLoad(callback: () => void): () => void {
  if (document.readyState === "complete") {
    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 1));
    const handle = idle(callback);
    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      }
    };
  }

  window.addEventListener("load", callback, { once: true });
  return () => window.removeEventListener("load", callback);
}
