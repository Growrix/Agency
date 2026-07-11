import { isValidElement, type ReactNode } from "react";
import { BaselineContent, type BaselineContentProps } from "@/components/site/baseline-content";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

type PageShellProps = {
  children: ReactNode;
};

/**
 * Mirrors the baseline `Car-subdomain/public/index.html` shell exactly:
 *  body.dark-scheme
 *   └─ #wrapper
 *      ├─ a#back-to-top
 *      ├─ #de-loader              (preloader element used by designesia.js)
 *      ├─ header.transparent
 *      ├─ #content
 *      │   └─ #top                (in-page top anchor)
 *      │   └─ {children}
 *      └─ footer
 */
export function PageShell({ children }: PageShellProps) {
  const baselineHtml =
    isValidElement<BaselineContentProps>(children) && children.type === BaselineContent
      ? children.props.html
      : null;

  return (
    <div id="wrapper">
      <a href="#" id="back-to-top" aria-label="Back to top" />

      {/* preloader begin */}
      <div id="de-loader" />
      {/* preloader end */}

      <SiteHeader />

      {/* content begin */}
      {baselineHtml ? (
        <div className="no-bottom no-top" id="content" dangerouslySetInnerHTML={{ __html: baselineHtml }} />
      ) : (
        <div className="no-bottom no-top" id="content">
          <div id="top" />
          {children}
        </div>
      )}
      {/* content end */}

      <SiteFooter />
    </div>
  );
}
