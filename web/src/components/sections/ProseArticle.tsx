import { Fragment } from "react";
import type { BlogBodyBlock } from "@/lib/content";

export function ProseArticle({ blocks }: { blocks: BlogBodyBlock[] }) {
  return (
    <div className="prose-article">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
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
                  <footer className="mt-2 font-sans text-sm not-italic text-[var(--color-text-muted)]">
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
          case "hr":
            return <hr key={i} />;
          default:
            return <Fragment key={i} />;
        }
      })}
    </div>
  );
}
