import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowRightIcon,
	BoltIcon,
	CheckIcon,
	CodeBracketSquareIcon,
	CpuChipIcon,
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
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonial } from "@/components/sections/Testimonial";
import {
	FAQ_GENERAL,
	PORTFOLIO,
	PROCESS_STEPS,
	SERVICES,
	TESTIMONIALS,
} from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";

export const metadata: Metadata = {
	title: "Web Development Services | SaaS Apps, Websites, MCP Servers, Automation",
	description:
		"Compare the agency's service offerings and choose the right path for custom SaaS, websites, MCP servers, and automation.",
};

const ICONS = {
	"saas-applications": CodeBracketSquareIcon,
	websites: WindowIcon,
	"mcp-servers": CpuChipIcon,
	automation: BoltIcon,
} as const;

const FIT_NOTES: Record<string, string> = {
	"saas-applications": "Best when you need product thinking, UX systems, and engineering in the same engagement.",
	websites: "Best when brand perception, conversion architecture, and speed all matter at once.",
	"mcp-servers": "Best when agents need auditable access to your APIs, docs, or internal operations.",
	automation: "Best when repetitive ops work is slowing down sales, support, reporting, or onboarding.",
};

const GOAL_ROWS = [
	{
		label: "Primary goal",
		values: {
			"saas-applications": "Ship or rebuild a product",
			websites: "Convert and position the brand",
			"mcp-servers": "Expose trusted tools to agents",
			automation: "Remove manual operational work",
		},
	},
	{
		label: "Complexity",
		values: {
			"saas-applications": "High",
			websites: "Medium",
			"mcp-servers": "Medium to high",
			automation: "Medium",
		},
	},
	{
		label: "Typical timeline",
		values: {
			"saas-applications": "8–24 weeks",
			websites: "4–10 weeks",
			"mcp-servers": "3–12 weeks",
			automation: "2–8 weeks",
		},
	},
	{
		label: "Maintenance model",
		values: {
			"saas-applications": "Roadmap + ongoing releases",
			websites: "CRO, CMS, experiments",
			"mcp-servers": "Observability + tool governance",
			automation: "Monitoring + optimization",
		},
	},
	{
		label: "Best engagement",
		values: {
			"saas-applications": "MVP sprint or product partner",
			websites: "Launch sprint or redesign track",
			"mcp-servers": "Scoped build or platform engagement",
			automation: "Audit sprint then implementation",
		},
	},
];

const STACK_AREAS = [
	{
		title: "Frontend systems",
		detail: "Next.js, design systems, responsive UI, motion, accessibility, dashboards.",
	},
	{
		title: "Backend and APIs",
		detail: "Typed APIs, auth, billing, CMS, databases, queue-driven workflows, webhooks.",
	},
	{
		title: "AI and agent tooling",
		detail: "MCP servers, retrieval, evaluation-aware flows, approvals, and traceable automations.",
	},
	{
		title: "Commerce and growth",
		detail: "Stripe, booking, analytics, SEO, experimentation, CRM and lifecycle integration.",
	},
];

export default function ServicesPage() {
	return (
		<>
			<Section className="pt-12 sm:pt-16 pb-14 relative overflow-hidden">
				<div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
				<Container>
					<div className="max-w-3xl">
						<Badge tone="primary" dot>Services</Badge>
						<h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
							Choose the delivery model that fits the problem, not just the tech.
						</h1>
						<p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
							SaaS products, websites, MCP servers, and automation systems built with the same standard: clear strategy,
							rigorous execution, and a conversion path that makes sense.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<LinkButton href="/book-appointment" size="lg">
								Discuss my project <ArrowRightIcon className="size-4" />
							</LinkButton>
							<LinkButton href="#compare" variant="outline" size="lg">Compare services</LinkButton>
						</div>
					</div>

					<RevealGroup className="mt-12 grid gap-4 lg:grid-cols-4 sm:grid-cols-2" stagger={0.06}>
						{SERVICES.map((service) => {
							const Icon = ICONS[service.slug as keyof typeof ICONS];

							return (
								<RevealItem key={service.slug} className="h-full">
									<Card hoverable className="h-full flex flex-col">
										<div className="flex items-start justify-between gap-4">
											  <div className="inline-flex size-12 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
												<Icon className="size-6" />
											</div>
											<Badge tone="secondary">{service.timeline}</Badge>
										</div>
										<h2 className="mt-5 font-display text-2xl tracking-tight">{service.name}</h2>
										<p className="mt-3 text-sm text-text-muted leading-6">{service.long}</p>
										<p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-primary">
											{service.typical}
										</p>
										<div className="mt-6 space-y-2 flex-1">
											{service.pillars.map((pillar) => (
												<div key={pillar} className="flex items-center gap-2 text-sm">
													  <CheckIcon className="size-4 text-primary" />
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
				</Container>
			</Section>

			<Section id="compare" tone="inset">
				<Container>
					<SectionHeading
						eyebrow="Comparison"
						title="See the difference before you commit to a scope."
						description="The fastest way to choose the right engagement is to compare the business shape of the work, not just the deliverables."
					/>
					  <div className="mt-10 hidden lg:block overflow-hidden rounded-[18px] border border-border bg-surface">
						<table className="w-full text-left text-sm">
							  <thead className="bg-inset/70">
								<tr>
									  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Decision point</th>
									{SERVICES.map((service) => (
										<th key={service.slug} className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">
											{service.name}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{GOAL_ROWS.map((row) => (
									  <tr key={row.label} className="border-t border-border align-top">
										<td className="px-5 py-4 font-display text-base tracking-tight">{row.label}</td>
										{SERVICES.map((service) => (
											  <td key={`${row.label}-${service.slug}`} className="px-5 py-4 text-text-muted leading-6">
												{row.values[service.slug as keyof typeof row.values]}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<RevealGroup className="mt-10 grid gap-4 lg:hidden" stagger={0.06}>
						{SERVICES.map((service) => (
							<RevealItem key={service.slug}>
								<Card>
									<div className="flex items-center justify-between gap-4">
										<h3 className="font-display text-xl tracking-tight">{service.name}</h3>
										<Badge tone="primary">{service.timeline}</Badge>
									</div>
									<dl className="mt-5 space-y-4">
										{GOAL_ROWS.map((row) => (
											<div key={`${service.slug}-${row.label}`}>
												<dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{row.label}</dt>
												<dd className="mt-1 text-sm leading-6">{row.values[service.slug as keyof typeof row.values]}</dd>
											</div>
										))}
									</dl>
								</Card>
							</RevealItem>
						))}
					</RevealGroup>
				</Container>
			</Section>

			<Section>
				<Container>
					<SectionHeading
						eyebrow="Delivery system"
						title="A consistent build method across every service."
						description="Discovery, strategy, design, engineering, launch, and post-launch optimization are handled as one system instead of disconnected vendors."
					/>
					<div className="mt-10">
						<ProcessSteps steps={PROCESS_STEPS} />
					</div>
				</Container>
			</Section>

			<Section tone="inset">
				<Container>
					<SectionHeading
						eyebrow="Stack and integrations"
						title="The surrounding systems matter as much as the page or app itself."
					/>
					<RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.06}>
						{STACK_AREAS.map((area) => (
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

			<Section>
				<Container>
					<SectionHeading
						eyebrow="Proof by service"
						title="Recent work mapped to the capability behind it."
						description="Each service leads to a different kind of business outcome, so the proof should stay attached to the service type."
					/>
					<RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.07}>
						{PORTFOLIO.slice(0, 3).map((project) => (
							<RevealItem key={project.slug} className="h-full">
								<Card hoverable className="h-full">
									  <div className={`h-2 rounded-full bg-linear-to-r ${project.accent}`} aria-hidden />
									  <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
										{project.industry}
									</p>
									<h3 className="mt-2 font-display text-2xl tracking-tight">{project.name}</h3>
									  <p className="mt-3 text-sm text-text-muted leading-6">{project.summary}</p>
									<div className="mt-5 flex items-center justify-between gap-4">
										<Badge tone="accent">{project.metric}</Badge>
										<Link href={`/portfolio/${project.slug}`} className="text-sm font-medium text-primary hover:text-primary-hover">
											View case study
										</Link>
									</div>
								</Card>
							</RevealItem>
						))}
					</RevealGroup>

					<RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.07}>
						{TESTIMONIALS.map((testimonial) => (
							<RevealItem key={testimonial.author} className="h-full">
								<Testimonial data={testimonial} className="h-full" />
							</RevealItem>
						))}
					</RevealGroup>
				</Container>
			</Section>

			<Section tone="inset">
				<Container width="reading">
					<SectionHeading
						eyebrow="FAQ"
						title="Questions buyers usually ask before choosing a service."
						align="center"
					/>
					<div className="mt-10">
						<Accordion items={FAQ_GENERAL.slice(0, 5)} />
					</div>
				</Container>
			</Section>

			<CTABand
				title="Need help choosing the right service path?"
				description="Tell us the business problem, the current bottleneck, and the timeline. We will map it to the right delivery model quickly."
				primary={{ label: "Book Appointment", href: "/book-appointment" }}
				secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
			/>
		</>
	);
}
