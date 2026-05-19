import { Fragment } from "react";
import Image from "next/image";
import type { BlogBodyBlock } from "@/lib/content";

export function getProseHeadingId(text: string, index: number) {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "section"}-${index}`;
}

export function ProseArticle({ blocks }: { blocks: BlogBodyBlock[] }) {
  return (
    <div className="prose-article">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return (
              <h2 key={i} id={getProseHeadingId(b.text, i)} className="scroll-mt-28">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={getProseHeadingId(b.text, i)} className="scroll-mt-28">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <p>{b.text}</p>
                {b.cite && (
                  <footer className="mt-2 font-sans text-sm not-italic text-text-muted">
                    — {b.cite}
                  </footer>
                )}
              </blockquote>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{b.code}</code>
              </pre>
            );
          case "image":
            return (
              <figure key={i} className="my-10">
                <div className="relative w-full overflow-hidden rounded-[16px] border border-border bg-inset aspect-16/10">
                  <Image
                    src={b.url}
                    alt={b.alt}
                    fill
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {b.caption && (
                  <figcaption className="mt-3 text-sm text-text-muted">{b.caption}</figcaption>
                )}
              </figure>
            );
          case "hr":
            return <hr key={i} />;
          default:
            return <Fragment key={i} />;
        }
      })}
    </div>
  );
}
