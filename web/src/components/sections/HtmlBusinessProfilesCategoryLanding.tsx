import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { HtmlBusinessProfilesCategoryHero } from "@/components/sections/HtmlBusinessProfilesCategoryHero";
import { ShopProductHtmlMobilePreviewCard } from "@/components/shop/ShopProductHtmlMobilePreviewCard";
import type { listPublicShopProducts } from "@/server/domain/catalog";

const HTML_PROFILE_FAQ = [
  {
    question: "Can I preview profiles before purchasing?",
    answer: "Yes. Every profile includes a live preview so you can review the layout, style, and content flow before buying.",
  },
  {
    question: "Are these connected to checkout?",
    answer: "Yes. Each profile links directly to a product page and checkout flow.",
  },
  {
    question: "Can you customize the template?",
    answer: "Yes. We offer branding setup, content population, and integration add-ons.",
  },
  {
    question: "Do you provide hosting?",
    answer: "Hosting and deployment support are available under Business Launch packages.",
  },
  {
    question: "Can this become a full website later?",
    answer: "Yes. Every profile is built as a foundation you can expand into a full website.",
  },
  {
    question: "How quickly can you deliver?",
    answer: "Most customization projects begin within 24 business hours after requirements are confirmed.",
  },
] as const;

const HTML_PROFILE_INCLUDED = [
  "Mobile responsive",
  "Clean HTML structure",
  "SEO-friendly layout",
  "Fast loading",
  "Commercial license",
  "Easy content editing",
  "Upgrade-ready architecture",
] as const;

const HTML_PROFILE_CUSTOMIZATION = [
  {
    title: "Branding",
    items: ["Logo", "Colors", "Fonts"],
  },
  {
    title: "Content Setup",
    items: ["Pages", "Business Information", "Images"],
  },
  {
    title: "Integrations",
    items: ["Forms", "Booking Systems", "Maps", "Analytics"],
  },
  {
    title: "Expansion",
    items: ["Additional Pages", "Blog", "Service Pages", "Full Website Upgrade"],
  },
] as const;

const HTML_PROFILE_UPGRADE_PATH = [
  "Template",
  "Branded Profile",
  "Business Launch",
  "Full Website",
  "Custom SaaS / Portal",
] as const;

export function HtmlBusinessProfilesCategoryLanding({
  products,
}: {
  products: Awaited<ReturnType<typeof listPublicShopProducts>>;
}) {
  const featuredProfiles = products.slice(0, 8);

  return (
    <>
      <HtmlBusinessProfilesCategoryHero products={products} />

      <Section id="profiles" size="standard" layout="content" spacing="split" tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Featured profiles"
            title="Browse Popular HTML Business Profiles"
            description="Business profile templates built for real businesses."
          />
          <div className="mt-10 grid w-full min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProfiles.map((product) => (
              <div key={product.slug} className="min-w-0">
                <ShopProductHtmlMobilePreviewCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <LinkButton href="/digital-products/category/html-business-profiles" variant="outline">
              View All Business Profiles <ArrowUpRightIcon className="size-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section id="pricing" size="standard" layout="content" spacing="split">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Choose a profile. Customize it. Launch faster."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                tier: "Template Only",
                price: "$19",
                desc: "For developers, agencies, and DIY users.",
                includes: ["HTML files", "Responsive design", "Documentation", "Commercial usage"],
                cta: "Download Template",
                href: "/digital-products/category/html-business-profiles",
              },
              {
                tier: "Branded Setup",
                price: "$49",
                desc: "You provide logo, colors, and content. We customize and deliver.",
                includes: ["Branding setup", "Content insertion", "Basic customization", "Delivery ready"],
                cta: "Request Branding",
                href: "/contact?intent=customize_template&category=html-business-profiles",
                featured: true,
              },
              {
                tier: "Business Launch",
                price: "$299-$799",
                desc: "Done-for-you launch support for businesses that want everything prepared.",
                includes: ["Full content setup", "Contact forms", "Images", "SEO basics", "Deployment support", "Launch assistance"],
                cta: "Request Quote",
                href: "/contact?intent=done-for-you&category=html-business-profiles",
              },
            ].map((plan) => (
              <Card
                key={plan.tier}
                className={`flex h-full flex-col ${plan.featured ? "contrast-surface bg-contrast text-contrast-text border-white/10 ring-1 ring-primary/40 shadow-(--shadow-2)" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl tracking-tight">{plan.tier}</h3>
                  {plan.featured ? <Badge tone="primary">Most Popular</Badge> : null}
                </div>
                <p className="mt-3 font-display text-4xl tracking-tight">{plan.price}</p>
                <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-white/75" : "text-text-muted"}`}>{plan.desc}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {plan.includes.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${plan.featured ? "text-white/80" : "text-text-muted"}`}>
                      <CheckIcon className="size-4 shrink-0 mt-0.5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <LinkButton href={plan.href} variant={plan.featured ? "primary" : "outline"} fullWidth>
                    {plan.cta}
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="content" spacing="split">
        <Container>
          <SectionHeading
            eyebrow="Why business profiles"
            title="Why Choose a Business Profile Instead of a Full Website?"
            description="Not every business needs a custom website from day one. Launch with a professional business profile now, establish your online presence quickly, and expand when your business is ready."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Launch Faster",
                subtitle: "Launch Faster. Start Showing Up Online Sooner.",
                description:
                  "Go live in days instead of waiting weeks or months for a traditional website project. Every profile is pre-structured for a specific business category, helping you present your services professionally from the start.",
                label: "Perfect for",
                items: [
                  "New businesses launching quickly",
                  "Service providers needing an online presence",
                  "Agencies validating new offers",
                  "Founders testing a new business idea",
                ],
                result:
                  "Start promoting your business sooner and stop losing opportunities while waiting for a website to be built.",
              },
              {
                title: "Lower Cost",
                subtitle: "Professional Presence Without the Agency Price Tag.",
                description:
                  "A custom website isn&apos;t always the first step. Start with a professionally designed business profile from just $19 and only invest in additional services when your business genuinely needs them.",
                label: "Benefits",
                items: [
                  "Affordable starting point",
                  "No large upfront commitment",
                  "Immediate launch value",
                  "Upgrade only when required",
                ],
                result:
                  "Preserve your budget for marketing, operations, and growth while still looking credible online.",
              },
              {
                title: "Easy Upgrade Path",
                subtitle: "Start Small. Expand When You&apos;re Ready.",
                description:
                  "Your business profile isn&apos;t a dead-end template. It can evolve into a branded website, lead generation platform, booking system, customer portal, or even a full SaaS product over time.",
                label: "Growth Path",
                items: [
                  "Template → Branded Profile → Business Launch → Full Website → Custom Platform",
                  "",
                  "",
                  "",
                ],
                result:
                  "Build once, grow gradually, and avoid restarting your online presence every time your business reaches a new stage.",
              },
            ].map((card) => (
              <Card key={card.title} hoverable className="flex h-full flex-col">
                <h3 className="font-display text-xl tracking-tight">{card.title}</h3>
                <p className="mt-1 min-h-12 text-base font-medium leading-6 text-text">{card.subtitle}</p>
                <p className="mt-3 min-h-40 text-sm leading-6 text-text-muted">{card.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">{card.label}</p>
                <ul className="mt-2 min-h-32 space-y-2">
                  {card.items.map((item, index) => (
                    <li key={`${card.title}-${index}`} className="flex items-start gap-2 text-sm leading-6 text-text-muted">
                      {item ? <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" /> : <span className="size-4 shrink-0" />}
                      {item || <span className="opacity-0">placeholder</span>}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-border pt-4 text-sm leading-6 text-text">
                  <strong>Result:</strong> {card.result}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="content" spacing="split" tone="inset">
        <Container>
          <SectionHeading eyebrow="What's included" title="Every profile includes" align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HTML_PROFILE_INCLUDED.map((item) => (
              <Card key={item} className="p-4">
                <div className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-text-muted">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="customization" size="standard" layout="content" spacing="split">
        <Container>
          <SectionHeading
            eyebrow="Customization options"
            title="Need changes? We can customize any profile."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {HTML_PROFILE_CUSTOMIZATION.map((group) => (
              <Card key={group.title} className="h-full">
                <h3 className="font-display text-lg tracking-tight">{group.title}</h3>
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
        </Container>
      </Section>

      <Section size="standard" layout="content" spacing="split" tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="Upgrade path" title="Start small. Grow later." align="center" />
          <div className="mt-10 space-y-3">
            {HTML_PROFILE_UPGRADE_PATH.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary">
                  {index + 1}
                </div>
                <p className="font-display text-lg tracking-tight">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="content" spacing="split">
        <Container width="reading">
          <Card className="p-8 text-center">
            <h2 className="font-display text-3xl tracking-tight">Need More Than a Business Profile?</h2>
            <p className="mt-3 text-base leading-7 text-text-muted">
              If you need custom functionality, booking systems, automation, or a complete website, let&apos;s discuss your project.
            </p>
            <p className="mt-3 text-sm text-text-muted">Average response time: under 24 business hours.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href="/book-appointment">Book Consultation</LinkButton>
              <LinkButton href="/digital-products/category/html-business-profiles" variant="outline">
                Browse Profiles
              </LinkButton>
            </div>
          </Card>
        </Container>
      </Section>

      <Section id="faq" size="standard" layout="content" spacing="split" tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title="HTML Business Profiles questions, answered." align="center" />
          <div className="mt-10">
            <Accordion items={[...HTML_PROFILE_FAQ]} />
          </div>
        </Container>
      </Section>

    </>
  );
}
