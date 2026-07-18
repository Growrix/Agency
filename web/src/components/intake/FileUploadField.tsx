"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

type Props = {
  files: File[];
  onChange: (files: File[]) => void;
  className?: string;
};

export function FileUploadField({ files, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files, ...Array.from(list)];
    onChange(next.slice(0, 10));
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className={cn(
          "rounded-md border border-dashed border-border bg-inset/20 px-4 py-8 text-center transition-colors",
          dragOver && "border-primary bg-primary/5",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          addFiles(event.dataTransfer.files);
        }}
      >
        <p className="text-sm text-text">Drag logos, brand guides, photos, or PDFs here</p>
        <p className="mt-1 text-xs text-text-muted">Up to 10 files · 25 MB each</p>
        <Button type="button" size="sm" variant="outline" className="mt-4" onClick={() => inputRef.current?.click()}>
          Choose files
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(event) => addFiles(event.target.files)}
        />
      </div>
      {files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-sm border border-border/60 px-3 py-2 text-sm">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                className="text-text-muted hover:text-destructive"
                onClick={() => onChange(files.filter((_, i) => i !== index))}
                aria-label={`Remove ${file.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
