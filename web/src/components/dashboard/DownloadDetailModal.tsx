"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Button } from "@/components/primitives/Button";

type DownloadLite = {
  id: string;
  order_id: string;
  product_slug: string;
  file_label?: string;
  download_count: number;
  max_downloads: number;
  status: string;
  created_at: string;
  last_downloaded_at?: string;
};

type Props = {
  download: DownloadLite | null;
  onClose: () => void;
  onAuthorized: () => void;
};

function formatDateTime(value: string | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function DownloadDetailModal({ download, onClose, onAuthorized }: Props) {
  const [working, setWorking] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleDownload() {
    if (!download) return;
    setWorking(true);
    setFeedback(null);
    try {
      const response = await fetch(`/api/v1/downloads/${download.id}/signed-url`, {
        method: "POST",
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as {
        data?: { download_url: string };
        error?: { message?: string };
      } | null;
      if (!response.ok || !payload?.data?.download_url) {
        setFeedback(payload?.error?.message ?? "Download could not be authorized.");
        return;
      }
      window.location.assign(payload.data.download_url);
      onAuthorized();
    } finally {
      setWorking(false);
    }
  }

  const remaining = download ? Math.max(download.max_downloads - download.download_count, 0) : 0;
  const exhausted = download ? download.download_count >= download.max_downloads : false;

  return (
    <Dialog open={Boolean(download)} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-overlay/60" aria-hidden />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-md border border-border bg-surface p-5 shadow-(--shadow-3)">
          <div className="flex items-center justify-between gap-3">
            <Dialog.Title className="font-display text-lg">Download details</Dialog.Title>
            <button
              type="button"
              className="text-sm text-text-muted hover:text-text"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {download ? (
            <>
              <p className="mt-3 text-sm text-text">
                {download.file_label ?? download.product_slug}
              </p>

              <dl className="mt-3 space-y-2 rounded-sm border border-border/50 bg-inset/30 px-3 py-2 text-sm">
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <dt className="text-text-muted">Status</dt>
                  <dd className="text-text">{download.status}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <dt className="text-text-muted">Usage</dt>
                  <dd className="text-text">
                    {download.download_count} / {download.max_downloads} used
                    {!exhausted ? ` · ${remaining} remaining` : " · no downloads left"}
                  </dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <dt className="text-text-muted">Issued</dt>
                  <dd className="text-text">{formatDateTime(download.created_at)}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <dt className="text-text-muted">Last opened</dt>
                  <dd className="text-text">{formatDateTime(download.last_downloaded_at)}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <dt className="text-text-muted">Order</dt>
                  <dd className="break-all text-text">{download.order_id}</dd>
                </div>
              </dl>

              {feedback ? <p className="mt-3 text-sm text-destructive">{feedback}</p> : null}

              <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                  Close
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={working || exhausted}
                  onClick={() => void handleDownload()}
                >
                  {working ? "Authorizing..." : exhausted ? "Limit reached" : "Open download"}
                </Button>
              </div>
            </>
          ) : null}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
