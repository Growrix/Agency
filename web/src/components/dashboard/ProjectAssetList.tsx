"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";

type Asset = {
  id: string;
  kind: "file" | "drive_link" | "reference_site";
  url?: string;
  storage_path?: string;
  label?: string;
  file_name?: string;
  created_at: string;
};

type Props = {
  projectId: string;
  assets: Asset[];
  apiAssetsBase: string;
  onChanged: () => void;
};

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function ProjectAssetList({ projectId, assets, apiAssetsBase, onChanged }: Props) {
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function downloadAsset(asset: Asset) {
    if (asset.kind !== "file" || !asset.storage_path) return;
    setWorkingId(asset.id);
    setError(null);
    try {
      const response = await fetch(`/api/v1/projects/${projectId}/assets/${asset.id}/signed-url`, {
        method: "POST",
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as {
        data?: { download_url?: string };
        error?: { message?: string };
      } | null;
      if (!response.ok || !payload?.data?.download_url) {
        throw new Error(payload?.error?.message ?? "Download failed.");
      }
      window.open(payload.data.download_url, "_blank", "noopener,noreferrer");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Download failed.");
    } finally {
      setWorkingId(null);
    }
  }

  async function removeAsset(assetId: string) {
    setWorkingId(assetId);
    setError(null);
    try {
      const response = await fetch(`${apiAssetsBase}?assetId=${encodeURIComponent(assetId)}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to remove asset.");
      }
      onChanged();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to remove asset.");
    } finally {
      setWorkingId(null);
    }
  }

  if (assets.length === 0) {
    return <p className="text-sm text-text-muted">No shared assets yet.</p>;
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <ul className="divide-y divide-border/60 rounded-md border border-border/60">
        {assets.map((asset) => (
          <li key={asset.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
            <div>
              <p className="font-medium text-text">{asset.label ?? asset.file_name ?? asset.url ?? "Asset"}</p>
              <p className="text-xs text-text-muted">
                {asset.kind.replace(/_/g, " ")} · {formatDateTime(asset.created_at)}
              </p>
            </div>
            <div className="flex gap-2">
              {asset.kind === "file" ? (
                <Button type="button" size="sm" variant="outline" disabled={workingId === asset.id} onClick={() => void downloadAsset(asset)}>
                  Download
                </Button>
              ) : asset.url ? (
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center rounded-sm border border-border px-3 text-sm hover:bg-inset/30"
                >
                  Open
                </a>
              ) : null}
              <Button type="button" size="sm" variant="ghost" disabled={workingId === asset.id} onClick={() => void removeAsset(asset.id)}>
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectAssetComposer({
  apiAssetsBase,
  onPosted,
}: {
  apiAssetsBase: string;
  onPosted: () => void;
}) {
  const [kind, setKind] = useState<"file" | "drive_link" | "reference_site">("reference_site");
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setWorking(true);
    setError(null);
    try {
      let response: Response;
      if (kind === "file") {
        if (!file) {
          throw new Error("Choose a file to upload.");
        }
        const formData = new FormData();
        formData.set("kind", "file");
        formData.set("file", file);
        if (label.trim()) formData.set("label", label.trim());
        response = await fetch(apiAssetsBase, { method: "POST", body: formData, credentials: "same-origin" });
      } else {
        response = await fetch(apiAssetsBase, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind, url, label: label || undefined }),
        });
      }
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to add asset.");
      }
      setUrl("");
      setLabel("");
      setFile(null);
      onPosted();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to add asset.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <form className="space-y-3 rounded-md border border-border/60 bg-surface p-4" onSubmit={(event) => void handleSubmit(event)}>
      <p className="text-sm font-medium text-text">Share more references or files</p>
      <select className="signal-input" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}>
        <option value="reference_site">Reference website</option>
        <option value="drive_link">Drive / folder link</option>
        <option value="file">File upload</option>
      </select>
      {kind === "file" ? (
        <input type="file" className="signal-input" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      ) : (
        <input className="signal-input" placeholder="https://" value={url} onChange={(event) => setUrl(event.target.value)} />
      )}
      <input className="signal-input" placeholder="Label (optional)" value={label} onChange={(event) => setLabel(event.target.value)} />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" size="sm" disabled={working}>
        {working ? "Saving…" : "Add asset"}
      </Button>
    </form>
  );
}
