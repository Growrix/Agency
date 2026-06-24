import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowRightIcon,
	BoltIcon,
	CheckIcon,
	CodeBracketSquareIcon,
	CpuChipIcon,
	DevicePhoneMobileIcon,
	DocumentTextIcon,
	MagnifyingGlassCircleIcon,
	SparklesIcon,
	WindowIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import {
	ServiceEcosystemGrid,
	ServicesHeroEcosystem,
} from "@/components/sections/ServicesHeroEcosystem";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import { ServicesLandingHeroMobile } from "@/components/marketing/services/ServicesLandingHeroMobile";
import { ServicesLandingGridMobile } from "@/components/marketing/services/ServicesLandingGridMobile";
import { PROCESS_STEPS } from "@/lib/content";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { marketingSection } from "@/lib/marketing-composition";
import {
	SERVICES_DELIVERY_FRAMEWORK,
	SERVICES_ECOSYSTEM_SECTION,
	SERVICES_HERO_ECOSYSTEM_LINKS,
	SERVICES_LANDING_CTA,
	SERVICES_LANDING_FAQ,
	SERVICES_LANDING_HERO,
	SERVICES_LANDING_HIGHLIGHT_SLUGS,
	SERVICES_LANDING_INTRO,
	SERVICES_SUPPORTING_SYSTEMS,
} from "@/lib/services-landing-content";
import { HERO_TITLE_CLASS, HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { listPublicPortfolio, listPublicServices } from "@/server/domain/catalog";

export const metadata: Metadata = {
	title: "Services | Choose the Right Path for Your Business",
	description:
		"Compare GrowrixOS services—websites, SaaS, mobile apps, automation, technical SEO, and AI business systems—and book a strategy call to choose the right path.",
};

const ICONS = {
	websites: WindowIcon,
	"saas-applications": CodeBracketSquareIcon,
	"mobile-apps": DevicePhoneMobileIcon,
	"ai-business-systems": SparklesIcon,
	automation: BoltIcon,
	"technical-seo": MagnifyingGlassCircleIcon,
	"html-business-profiles": DocumentTextIcon,
	"mcp-servers": CpuChipIcon,
} as const;

const FIT_NOTES: Record<string, string> = {
	websites: "Best when brand perception, conversion architecture, and speed all matter at once.",
	"saas-applications": "Best when you need a real product team across SaaS, dashboards, and companion mobile experiences.",
	"mobile-apps": "Best when you need an app launch site, companion app, or store-ready mobile surface alongside your product.",
	"ai-business-systems": "Best when you need practical AI assistants, knowledge systems, or operational workflows—not experiments.",
	automation: "Best when repetitive ops work around sales, support, reporting, or onboarding is slowing the main product.",
	"technical-seo": "Best when search visibility, analytics, and Core Web Vitals need to be configured correctly from launch.",
};

const GOAL_ROWS = [
	{
		label: "Primary goal",
		values: {
			websites: "Convert and position the brand",
			"saas-applications": "Ship or rebuild a product",
			"mobile-apps": "Launch a credible mobile surface",
			"ai-business-systems": "Implement AI where it creates measurable value",
			automation: "Remove manual operational work",
			"technical-seo": "Get found and measured from day one",
		},
	},
	{
		label: "Complexity",
		values: {
			websites: "Medium",
			"saas-applications": "High",
			"mobile-apps": "Medium to high",
			"ai-business-systems": "Medium to high",
			automation: "Medium",
			"technical-seo": "Low to medium",
		},
	},
	{
		label: "Typical timeline",
		values: {
			websites: "4–10 weeks",
			"saas-applications": "8–24 weeks",
			"mobile-apps": "4–16 weeks",
			"ai-business-systems": "2–6 weeks",
			automation: "2–8 weeks",
			"technical-seo": "3–10 days",
		},
	},
	{
		label: "Maintenance model",
		values: {
			websites: "CRO, CMS, experiments",
			"saas-applications": "Roadmap + ongoing releases",
			"mobile-apps": "Release cadence + store updates",
			"ai-business-systems": "Optimization + expansion",
			automation: "Monitoring + optimization",
			"technical-seo": "One-time setup + optional audits",
		},
	},
	{
		label: "Best engagement",
		values: {
			websites: "Launch sprint or redesign track",
			"saas-applications": "MVP sprint or product partner",
			"mobile-apps": "Launch site sprint or companion MVP",
			"ai-business-systems": "Discovery, build, or operations partner",
			automation: "Audit sprint then implementation",
			"technical-seo": "Essentials or full technical SEO sprint",
		},
	},
];

export default async function ServicesPage() {
	const portfolio = await listPublicPortfolio();
	const allServices = (await listPublicServices()).filter(
		(service) => service.slug !== "html-business-profiles" && service.slug !== "mcp-servers",
	);
	const serviceBySlug = new Map(allServices.map((service) => [service.slug, service]));
	const highlightServices = SERVICES_LANDING_HIGHLIGHT_SLUGS.map((slug) => serviceBySlug.get(slug)).filter(
		(service): service is NonNullable<typeof service> => Boolean(service),
	);

	return (
		<>
			<Section
				{...marketingSection("services", "hero")}
				layout="viewport"
				className="hero-section relative overflow-hidden"
			>
				<div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
				<Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
					<MarketingViewportGate
						mobile={
							<ServicesLandingHeroMobile
								eyebrow={SERVICES_LANDING_HERO.eyebrow}
								headlineLead={SERVICES_LANDING_HERO.headlineLead}
								headlineAccent={SERVICES_LANDING_HERO.headlineAccent}
								description={SERVICES_LANDING_HERO.description}
								primaryCta={SERVICES_LANDING_HERO.primaryCta}
								primaryHref={SERVICES_LANDING_HERO.primaryHref}
								secondaryCta={SERVICES_LANDING_HERO.secondaryCta}
								secondaryHref={SERVICES_LANDING_HERO.secondaryHref}
							/>
						}
						desktop={
							<div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
								<div className="lg:col-span-6 xl:col-span-7">
									<Badge tone="primary" dot>
										{SERVICES_LANDING_HERO.eyebrow}
									</Badge>
									<h1 className={cn("mt-5", HERO_TITLE_CLASS)}>{SERVICES_LANDING_HERO.title}</h1>
									<p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
										{SERVICES_LANDING_HERO.description}
									</p>
									<div className="mt-8 flex flex-wrap gap-3">
										<LinkButton href={SERVICES_LANDING_HERO.primaryHref} size="lg">
											{SERVICES_LANDING_HERO.primaryCta} <ArrowRightIcon className="size-4" />
										</LinkButton>
										<LinkButton href={SERVICES_LANDING_HERO.secondaryHref} variant="outline" size="lg">
											{SERVICES_LANDING_HERO.secondaryCta}
										</LinkButton>
									</div>
								</div>
								<div className="min-w-0 lg:col-span-6 lg:self-center xl:col-span-5">
									<ServicesHeroEcosystem links={[...SERVICES_HERO_ECOSYSTEM_LINKS]} />
								</div>
							</div>
						}
					/>
				</Container>
			</Section>

			<Section {...marketingSection("services", "highlights")}>
				<Container>
					<MarketingViewportGate
						mobile={
							<ServicesLandingGridMobile
								services={highlightServices}
								icons={ICONS}
								fitNotes={FIT_NOTES}
							/>
						}
						desktop={
							<>
								<SectionHeading
									eyebrow={SERVICES_LANDING_INTRO.eyebrow}
									title={SERVICES_LANDING_INTRO.title}
									description={SERVICES_LANDING_INTRO.description}
								/>
								<RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
									{highlightServices.map((service) => {
										const Icon = ICONS[service.slug as keyof typeof ICONS] ?? SparklesIcon;

										return (
											<RevealItem key={service.slug} className="h-full min-w-0">
												<Card hoverable className="flex h-full flex-col">
													<div className="flex items-start justify-between gap-4">
														<div className="inline-flex size-12 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
															<Icon className="size-6" />
														</div>
														<Badge tone="secondary">{service.delivery_timeline}</Badge>
													</div>
													<h2 className="mt-5 font-display text-2xl tracking-tight">{service.title}</h2>
													<p className="mt-3 text-sm text-text-muted leading-6">{service.description}</p>
													<p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-primary">
														{service.short_description}
													</p>
													<div className="mt-6 flex-1 space-y-2">
														{service.pillars.map((pillar) => (
															<div key={pillar} className="flex items-center gap-2 text-sm">
																<CheckIcon className="size-4 shrink-0 text-primary" />
																<span>{pillar}</span>
															</div>
														))}
													</div>
													<p className="mt-5 text-sm text-text-muted leading-6">{FIT_NOTES[service.slug]}</p>
													<Link
														href={`/services/${service.slug}`}
														className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
													>
														Explore this service <ArrowRightIcon className="size-4" />
													</Link>
												</Card>
											</RevealItem>
										);
									})}
								</RevealGroup>
							</>
						}
					/>
				</Container>
			</Section>

			<Section id="compare" {...marketingSection("services", "compare")}>
				<Container>
					<SectionHeading
						eyebrow="Comparison"
						title="See the difference before you commit to a scope."
						description="Compare the business shape of the work, where it sits in the larger launch, and when supporting systems are actually necessary."
					/>
					<div className="mt-10 hidden overflow-hidden rounded-[18px] border border-border bg-surface lg:block">
						<table className="w-full text-left text-sm">
							<thead className="bg-inset/70">
								<tr>
									<th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">
										Decision point
									</th>
									{highlightServices.map((service) => (
										<th
											key={service.slug}
											className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted"
										>
											{service.title}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{GOAL_ROWS.map((row) => (
									<tr key={row.label} className="border-t border-border align-top">
										<td className="px-5 py-4 font-display text-base tracking-tight">{row.label}</td>
										{highlightServices.map((service) => (
											<td
												key={`${row.label}-${service.slug}`}
												className="px-5 py-4 text-text-muted leading-6"
											>
												{row.values[service.slug as keyof typeof row.values]}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<RevealGroup className="mt-10 grid gap-4 lg:hidden" stagger={0.06}>
						{highlightServices.map((service) => (
							<RevealItem key={service.slug}>
								<Card>
									<div className="flex items-center justify-between gap-4">
										<h3 className="font-display text-xl tracking-tight">{service.title}</h3>
										<Badge tone="primary">{service.delivery_timeline}</Badge>
									</div>
									<dl className="mt-5 space-y-4">
										{GOAL_ROWS.map((row) => (
											<div key={`${service.slug}-${row.label}`}>
												<dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
													{row.label}
												</dt>
												<dd className="mt-1 text-sm leading-6">
													{row.values[service.slug as keyof typeof row.values]}
												</dd>
											</div>
										))}
									</dl>
								</Card>
							</RevealItem>
						))}
					</RevealGroup>
				</Container>
			</Section>

			<Section {...marketingSection("services", "ecosystem")}>
				<Container>
					<MarketingViewportGate
						mobile={
							<MobileFeatureGrid
								eyebrow={SERVICES_ECOSYSTEM_SECTION.eyebrow}
								titleLead={SERVICES_ECOSYSTEM_SECTION.titleLead}
								titleAccent={SERVICES_ECOSYSTEM_SECTION.titleAccent}
								description={SERVICES_ECOSYSTEM_SECTION.description}
								items={[...SERVICES_ECOSYSTEM_SECTION.combinations]}
							/>
						}
						desktop={
							<>
								<SectionHeading
									eyebrow={SERVICES_ECOSYSTEM_SECTION.eyebrow}
									title={SERVICES_ECOSYSTEM_SECTION.title}
									description={SERVICES_ECOSYSTEM_SECTION.description}
								/>
								<ServiceEcosystemGrid combinations={[...SERVICES_ECOSYSTEM_SECTION.combinations]} />
							</>
						}
					/>
				</Container>
			</Section>

			<Section {...marketingSection("services", "process")}>
				<Container>
					<SectionHeading
						eyebrow={SERVICES_DELIVERY_FRAMEWORK.eyebrow}
						title={SERVICES_DELIVERY_FRAMEWORK.title}
						description={SERVICES_DELIVERY_FRAMEWORK.description}
					/>
					<div className="mt-10">
						<ProcessSteps steps={PROCESS_STEPS} />
					</div>
				</Container>
			</Section>

			<Section {...marketingSection("services", "stack")} tone="inset">
				<Container>
					<SectionHeading
						eyebrow={SERVICES_SUPPORTING_SYSTEMS.eyebrow}
						title={SERVICES_SUPPORTING_SYSTEMS.title}
					/>
					<RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.06}>
						{SERVICES_SUPPORTING_SYSTEMS.areas.map((area) => (
							<RevealItem key={area.title} className="h-full">
								<Card hoverable className="h-full">
									<h3 className="font-display text-lg tracking-tight">{area.title}</h3>
									<p className="mt-3 text-sm text-text-muted leading-6">{area.detail}</p>
								</Card>
							</RevealItem>
						))}
					</RevealGroup>
				</Container>
			</Section>

			<Section {...marketingSection("services", "proof")}>
				<Container>
					<SectionHeading
						eyebrow="Proof by service"
						title="Recent work mapped to the capability behind it."
						description="Explore projects tagged by service category to see how each capability shows up in real launches."
					/>
					<RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.07}>
						{portfolio.slice(0, 3).map((project) => (
							<RevealItem key={project.slug} className="h-full">
								<PortfolioCard project={project} />
							</RevealItem>
						))}
					</RevealGroup>

					{SHOW_GOOGLE_REVIEWS ? (
						<div className="mt-12">
							<GoogleReviews
								eyebrow="Google reviews"
								title="What clients say after launch."
								description="Live reviews from the agency Google Business profile."
							/>
						</div>
					) : null}
				</Container>
			</Section>

			<Section {...marketingSection("services", "faq")} tone="inset">
				<Container width="reading">
					<SectionHeading
						eyebrow="FAQ"
						title="Questions buyers ask before choosing a service."
						description="Service selection, combinations, timelines, and what happens after launch—covered before you book a strategy call."
						align="center"
					/>
					<div className="mt-10">
						<Accordion items={[...SERVICES_LANDING_FAQ]} />
					</div>
				</Container>
			</Section>

			<CTABand
				title={SERVICES_LANDING_CTA.title}
				description={SERVICES_LANDING_CTA.description}
				primary={{
					label: SERVICES_LANDING_CTA.primaryLabel,
					href: SERVICES_LANDING_CTA.primaryHref,
				}}
				secondary={{
					label: SERVICES_LANDING_CTA.secondaryLabel,
					href: SERVICES_LANDING_CTA.secondaryHref,
				}}
			/>
		</>
	);
}
