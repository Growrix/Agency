import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { MarketingAccentTitle } from "@/components/marketing/MarketingAccentTitle";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { HtmlBusinessProfilesCategoryHero } from "@/components/sections/HtmlBusinessProfilesCategoryHero";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobilePricingCards } from "@/components/marketing/MobilePricingCards";
import { MobilePrincipleList } from "@/components/marketing/mobile/MobilePrincipleList";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { MobileStackGroups } from "@/components/marketing/mobile/MobileStackGroups";
import { ProcessStepsMobile } from "@/components/marketing/ProcessStepsMobile";
import { ProductLedFinalCTAMobile } from "@/components/marketing/ProductLedFinalCTAMobile";
import { HtmlBusinessProfilesCategoryCatalogMobile } from "@/components/marketing/categories/HtmlBusinessProfilesCategoryCatalogMobile";
import { HtmlBusinessProfilesIncludedMobile } from "@/components/marketing/categories/HtmlBusinessProfilesIncludedMobile";
import { ServiceFaqMobile } from "@/components/marketing/services/ServiceFaqMobile";
import { ShopProductHtmlMobilePreviewCard } from "@/components/shop/ShopProductHtmlMobilePreviewCard";
import {
  HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS,
  HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION,
  HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA,
  HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION,
  HTML_BUSINESS_PROFILES_CATEGORY_FAQ,
  HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION,
  HTML_BUSINESS_PROFILES_CATEGORY_FEATURED_LIMIT,
  HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA,
  HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION,
  HTML_BUSINESS_PROFILES_CATEGORY_PATH,
  HTML_BUSINESS_PROFILES_CATEGORY_PRICING_SECTION,
  HTML_BUSINESS_PROFILES_CATEGORY_PRICING_TIERS,
  HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION,
  HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION,
  buildHtmlBusinessProfilesUpgradeSteps,
} from "@/lib/html-business-profiles-category-content";
import { marketingSection } from "@/lib/marketing-composition";
import type { listPublicShopProducts } from "@/server/domain/catalog";

export function HtmlBusinessProfilesCategoryLanding({
  products,
}: {
  products: Awaited<ReturnType<typeof listPublicShopProducts>>;
}) {
  const featuredProfiles = products.slice(0, HTML_BUSINESS_PROFILES_CATEGORY_FEATURED_LIMIT);
  const whyItems = HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.cards.map((card) => ({
    title: card.title,
    description: `${card.description} Result: ${card.result}`,
  }));

  return (
    <>
      <HtmlBusinessProfilesCategoryHero products={products} />

      <Section
        id={HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS.profiles}
        {...marketingSection("category-business-profiles", "catalog")}
      >
        <Container>
          <MarketingViewportGate
            mobile={<HtmlBusinessProfilesCategoryCatalogMobile products={featuredProfiles} />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.eyebrow}
                  titleLead={HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.titleLead}
                  titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.titleAccent}
                  description={HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.description}
                />
                <div className="mt-10 grid w-full min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {featuredProfiles.map((product) => (
                    <div key={product.slug} className="min-w-0">
                      <ShopProductHtmlMobilePreviewCard product={product} />
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <LinkButton href={HTML_BUSINESS_PROFILES_CATEGORY_PATH} variant="outline">
                    {HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.viewAllCta}{" "}
                    <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section
        id={HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS.pricing}
        {...marketingSection("category-business-profiles", "pricing")}
      >
        <Container>
          <MarketingViewportGate
            mobile={
              <MobilePricingCards
                eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_PRICING_SECTION.eyebrow}
                titleLead={HTML_BUSINESS_PROFILES_CATEGORY_PRICING_SECTION.titleLead}
                titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_PRICING_SECTION.titleAccent}
                cards={HTML_BUSINESS_PROFILES_CATEGORY_PRICING_TIERS}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_PRICING_SECTION.eyebrow}
                  titleLead={HTML_BUSINESS_PROFILES_CATEGORY_PRICING_SECTION.titleLead}
                  titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_PRICING_SECTION.titleAccent}
                  align="center"
                />
                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                  {HTML_BUSINESS_PROFILES_CATEGORY_PRICING_TIERS.map((plan) => {
                    const featured = "featured" in plan && Boolean(plan.featured);

                    return (
                    <Card
                      key={plan.title}
                      className={`flex h-full flex-col ${featured ? "contrast-surface bg-contrast text-contrast-text border-white/10 ring-1 ring-primary/40 shadow-(--shadow-2)" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-xl tracking-tight">{plan.title}</h3>
                        {featured ? <Badge tone="primary">Most Popular</Badge> : null}
                      </div>
                      <p className="mt-3 font-display text-4xl tracking-tight">{plan.investment}</p>
                      <p className={`mt-3 text-sm leading-6 ${featured ? "text-white/75" : "text-text-muted"}`}>
                        {plan.description}
                      </p>
                      <ul className="mt-5 flex-1 space-y-2">
                        {plan.bestFor.map((item) => (
                          <li
                            key={item}
                            className={`flex items-start gap-2 text-sm ${featured ? "text-white/80" : "text-text-muted"}`}
                          >
                            <CheckIcon className="size-4 shrink-0 mt-0.5 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6">
                        <LinkButton href={plan.cta.href} variant={featured ? "primary" : "outline"} fullWidth>
                          {plan.cta.label}
                        </LinkButton>
                      </div>
                    </Card>
                    );
                  })}
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("category-business-profiles", "why")}>
        <Container>
          <MarketingViewportGate
            mobile={
              <MobilePrincipleList
                eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.eyebrow}
                titleLead={HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.titleLead}
                titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.titleAccent}
                description={HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.description}
                items={whyItems}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.eyebrow}
                  titleLead={HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.titleLead}
                  titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.titleAccent}
                  description={HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.description}
                  align="center"
                />
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION.cards.map((card) => (
                    <Card key={card.title} hoverable className="flex h-full flex-col">
                      <h3 className="font-display text-xl tracking-tight">{card.title}</h3>
                      <p className="mt-3 min-h-40 text-sm leading-6 text-text-muted">{card.description}</p>
                      <p className="mt-auto border-t border-border pt-4 text-sm leading-6 text-text">
                        <strong>Result:</strong> {card.result}
                      </p>
                    </Card>
                  ))}
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("category-business-profiles", "included")}>
        <Container>
          <MarketingViewportGate
            mobile={<HtmlBusinessProfilesIncludedMobile />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION.eyebrow}
                  titleLead={HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION.titleLead}
                  titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION.titleAccent}
                  align="center"
                />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION.items.map((item) => (
                    <Card key={item} className="p-4">
                      <div className="flex items-start gap-2">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        <p className="text-sm leading-6 text-text-muted">{item}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section
        id={HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS.customization}
        {...marketingSection("category-business-profiles", "customization")}
      >
        <Container>
          <MarketingViewportGate
            mobile={
              <div className="home-mobile-marketing">
                <MobileMarketingSectionHeader
                  eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION.eyebrow}
                  titleLead={HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION.titleLead}
                  titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION.titleAccent}
                  align="left"
                  className="home-mobile-marketing__header--left max-w-none"
                />
                <MobileStackGroups groups={HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION.groups} />
              </div>
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION.eyebrow}
                  titleLead={HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION.titleLead}
                  titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION.titleAccent}
                  align="center"
                />
                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                  {HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION.groups.map((group) => (
                    <Card key={group.category} className="h-full">
                      <h3 className="font-display text-lg tracking-tight">{group.category}</h3>
                      <ul className="mt-4 space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text-muted">
                            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("category-business-profiles", "upgrade")}>
        <Container width="reading">
          <MarketingViewportGate
            mobile={
              <ProcessStepsMobile
                steps={buildHtmlBusinessProfilesUpgradeSteps()}
                eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION.eyebrow}
                titleLead={HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION.titleLead}
                titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION.titleAccent}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION.eyebrow}
                  titleLead={HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION.titleLead}
                  titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION.titleAccent}
                  align="center"
                />
                <div className="mt-10 space-y-3">
                  {HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION.steps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary">
                        {index + 1}
                      </div>
                      <p className="font-display text-lg tracking-tight">{step}</p>
                    </div>
                  ))}
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("category-business-profiles", "consultation")}>
        <Container width="reading">
          <MarketingViewportGate
            mobile={
              <ProductLedFinalCTAMobile
                eyebrow="Consultation"
                titleLead={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.titleLead}
                titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.titleAccent}
                description={`${HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.description} ${HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.responseNote}`}
                primaryLabel={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.primaryCta}
                primaryHref={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.primaryHref}
                secondaryLabel={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.secondaryCta}
                secondaryHref={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.secondaryHref}
              />
            }
            desktop={
              <Card className="p-8 text-center">
                <h2 className="font-display text-3xl tracking-tight">
                  <MarketingAccentTitle
                    lead={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.titleLead}
                    accent={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.titleAccent}
                  />
                </h2>
                <p className="mt-3 text-base leading-7 text-text-muted">
                  {HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.description}
                </p>
                <p className="mt-3 text-sm text-text-muted">
                  {HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.responseNote}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <LinkButton href={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.primaryHref}>
                    {HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.primaryCta}
                  </LinkButton>
                  <LinkButton href={HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.secondaryHref} variant="outline">
                    {HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA.secondaryCta}
                  </LinkButton>
                </div>
              </Card>
            }
          />
        </Container>
      </Section>

      <Section
        id={HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS.faq}
        {...marketingSection("category-business-profiles", "faq")}
      >
        <Container width="reading">
          <MarketingViewportGate
            mobile={
              <ServiceFaqMobile
                eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION.eyebrow}
                title={HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION.title}
                titleLead={HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION.titleLead}
                titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION.titleAccent}
                items={HTML_BUSINESS_PROFILES_CATEGORY_FAQ}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION.eyebrow}
                  titleLead={HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION.titleLead}
                  titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION.titleAccent}
                  align="center"
                />
                <div className="mt-10">
                  <Accordion items={HTML_BUSINESS_PROFILES_CATEGORY_FAQ} />
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <MarketingViewportGate
        mobile={
          <ProductLedFinalCTAMobile
            eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.eyebrow}
            titleLead={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.titleLead}
            titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.titleAccent}
            description={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.description}
            primaryLabel={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.primaryLabel}
            primaryHref={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.primaryHref}
            secondaryLabel={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.secondaryLabel}
            secondaryHref={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.secondaryHref}
          />
        }
        desktop={
          <Section {...marketingSection("category-business-profiles", "cta")}>
            <Container width="reading">
              <Card className="p-8 text-center">
                <h2 className="font-display text-2xl tracking-tight">
                  {HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.titleLead}{" "}
                  {HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.titleAccent}
                </h2>
                <p className="mt-3 text-base leading-7 text-text-muted">
                  {HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <LinkButton href={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.primaryHref}>
                    {HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.primaryLabel}
                  </LinkButton>
                  <LinkButton href={HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.secondaryHref} variant="outline">
                    {HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA.secondaryLabel}
                  </LinkButton>
                </div>
              </Card>
            </Container>
          </Section>
        }
      />
    </>
  );
}
