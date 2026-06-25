import Link from "next/link";
import { LinkButton } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";

type LegalSection = {
  id: string;
  title: string;
  body: readonly string[];
};

type LegalDocumentMobileProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  intro: string;
  sections: readonly LegalSection[];
  footerTitle: string;
  footerDescription: string;
  primaryCta: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
};

export function LegalDocumentMobile({
  eyebrow,
  titleLead,
  titleAccent,
  intro,
  sections,
  footerTitle,
  footerDescription,
  primaryCta,
  secondaryLink,
}: LegalDocumentMobileProps) {
  return (
    <div className="legal-document-mobile">
      <div className="legal-document-mobile__hero">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {eyebrow}
        </Badge>
        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{titleLead}</span>
          <span className="block marketing-title-accent">{titleAccent}</span>
        </h1>
        <p className="service-detail-hero-mobile__description">{intro}</p>
      </div>

      <nav className="legal-document-mobile__toc" aria-label="On this page">
        <p className="legal-document-mobile__toc-label">On this page</p>
        <ul className="legal-document-mobile__toc-list">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="legal-document-mobile__toc-link">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="legal-document-mobile__sections">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="legal-document-mobile__section scroll-mt-24">
            <h2 className="legal-document-mobile__section-title">{section.title}</h2>
            <div className="legal-document-mobile__section-body">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="legal-document-mobile__footer">
        <h3 className="legal-document-mobile__footer-title">{footerTitle}</h3>
        <p className="legal-document-mobile__footer-description">{footerDescription}</p>
        <div className="legal-document-mobile__footer-actions">
          <LinkButton href={primaryCta.href} fullWidth>
            {primaryCta.label}
          </LinkButton>
          {secondaryLink ? (
            <Link href={secondaryLink.href} className="legal-document-mobile__footer-link">
              {secondaryLink.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
