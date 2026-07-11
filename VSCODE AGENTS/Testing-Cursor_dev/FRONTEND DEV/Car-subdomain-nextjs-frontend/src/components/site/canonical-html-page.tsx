import Script from "next/script";
import { getParsedHtmlPage } from "@/lib/source-html";

type CanonicalHtmlPageProps = {
  fileName: string;
};

export function CanonicalHtmlPage({ fileName }: CanonicalHtmlPageProps) {
  const page = getParsedHtmlPage(fileName);

  return (
    <>
      {page.stylesheets.map((sheet, index) => (
        <link
          key={`${sheet.href}-${index}`}
          rel="stylesheet"
          href={sheet.href}
          id={sheet.id}
          type={sheet.type}
        />
      ))}
      <div id="source-body-root" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
      {page.scripts.map((script) => {
        if (script.src) {
          return <Script key={script.key} src={script.src} strategy="afterInteractive" />;
        }

        if (!script.inline) {
          return null;
        }

        return (
          <Script
            key={script.key}
            id={`inline-${script.key}`}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: script.inline }}
          />
        );
      })}
    </>
  );
}