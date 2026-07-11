export type PageKey =
  | "home"
  | "about"
  | "blog"
  | "careerListing"
  | "contactUs"
  | "coreValues"
  | "faq"
  | "listingDesigningTomorrowsCities"
  | "ourAwards"
  | "ourHistory"
  | "ourProcess"
  | "ourServices"
  | "ourTeam"
  | "portfolioStyle2"
  | "portfolioStyle1"
  | "pricingPlan"
  | "sustainableConstruction"
  | "urbanDevelopment"
  | "careerProjectAssistant"
  | "serviceCustomConstruction"
  | "withLeftSidebar"
  | "withRightSidebar"
  | "notFound";

export type NavLink = {
  label: string;
  href: string;
};

export type CardItem = {
  title: string;
  body: string;
  image?: string;
  href?: string;
  meta?: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  cycle: string;
  featured?: boolean;
  features: string[];
};

export type Section =
  | {
      type: "intro";
      heading: string;
      body: string;
      cta?: { label: string; href: string };
    }
  | {
      type: "split";
      heading: string;
      body: string;
      image: string;
      imageAlt: string;
      reverse?: boolean;
      cta?: { label: string; href: string };
    }
  | {
      type: "grid";
      heading: string;
      description?: string;
      columns: 2 | 3 | 4;
      items: CardItem[];
    }
  | {
      type: "stats";
      heading?: string;
      items: StatItem[];
    }
  | {
      type: "timeline";
      heading: string;
      items: TimelineItem[];
    }
  | {
      type: "faq";
      heading: string;
      items: FaqItem[];
    }
  | {
      type: "pricing";
      heading: string;
      plans: PricingPlan[];
    }
  | {
      type: "contact";
      heading: string;
      description: string;
      office: string;
      phone: string;
      email: string;
    };

export type SitePage = {
  key: PageKey;
  path: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  sections: Section[];
};

const img = {
  heroOne: "/lumoria-assets/wp-content/uploads/2025/05/home-1-slider-img-1.jpg",
  heroTwo: "/lumoria-assets/wp-content/uploads/2025/05/home-3-slider-1.jpg",
  heroThree: "/lumoria-assets/wp-content/uploads/2025/08/full-screen-1.jpg",
  coreValues: "/lumoria-assets/wp-content/uploads/2025/06/Corevalues-img.jpg",
  about: "/lumoria-assets/wp-content/uploads/2025/07/about-bg.jpg",
  process1: "/lumoria-assets/wp-content/uploads/2025/06/Lattice-Process-img1.jpg",
  process2: "/lumoria-assets/wp-content/uploads/2025/06/Lattice-Process-img2.jpg",
  process3: "/lumoria-assets/wp-content/uploads/2025/06/Lattice-Process-img3.jpg",
  process4: "/lumoria-assets/wp-content/uploads/2025/06/Lattice-Process-img4.jpg",
  service1: "/lumoria-assets/wp-content/uploads/2025/06/Lattice-Services-img1.jpg",
  service2: "/lumoria-assets/wp-content/uploads/2025/06/Lattice-Services-img2.jpg",
  service3: "/lumoria-assets/wp-content/uploads/2025/08/Service-Image-10.jpg",
  service4: "/lumoria-assets/wp-content/uploads/2025/06/Lattice-Services-img4.jpg",
  service5: "/lumoria-assets/wp-content/uploads/2025/06/Lattice-Services-img5.jpg",
  service6: "/lumoria-assets/wp-content/uploads/2025/06/Service-image-6.jpg",
  team1: "/lumoria-assets/wp-content/uploads/2025/08/team-img-01.jpg",
  team2: "/lumoria-assets/wp-content/uploads/2025/08/team-img-02.jpg",
  team3: "/lumoria-assets/wp-content/uploads/2025/08/team-img-03.jpg",
  team4: "/lumoria-assets/wp-content/uploads/2025/08/team-img-04.jpg",
  team5: "/lumoria-assets/wp-content/uploads/2025/08/team-img-05.jpg",
  team6: "/lumoria-assets/wp-content/uploads/2025/08/team-img-06.jpg",
  portfolio1: "/lumoria-assets/wp-content/uploads/2025/08/portfolio-img-01.jpg",
  portfolio2: "/lumoria-assets/wp-content/uploads/2025/08/portfolio-img-02.jpg",
  portfolio3: "/lumoria-assets/wp-content/uploads/2025/08/portfolio-img-03.jpg",
  portfolio4: "/lumoria-assets/wp-content/uploads/2025/08/portfolio-img-04.jpg",
  portfolio5: "/lumoria-assets/wp-content/uploads/2025/08/portfolio-img-05.jpg",
  blog1: "/lumoria-assets/wp-content/uploads/2025/08/Blog-1.jpg",
  blog2: "/lumoria-assets/wp-content/uploads/2025/08/Blog-2.jpg",
  blog3: "/lumoria-assets/wp-content/uploads/2025/08/Blog-3.jpg",
  blog4: "/lumoria-assets/wp-content/uploads/2025/08/Blog-4.jpg",
  awards1: "/lumoria-assets/wp-content/uploads/2025/06/Awards-img-1.png",
  awards2: "/lumoria-assets/wp-content/uploads/2025/06/Awards-img-2.png",
  awards3: "/lumoria-assets/wp-content/uploads/2025/06/Awards-img-3.png",
  awards4: "/lumoria-assets/wp-content/uploads/2025/06/Awards-img-4.png",
  awards5: "/lumoria-assets/wp-content/uploads/2025/06/Awards-img-5.png",
  awards6: "/lumoria-assets/wp-content/uploads/2025/06/Awards-img-6.png",
  history1: "/lumoria-assets/wp-content/uploads/2025/06/History-img-1.jpg",
  history2: "/lumoria-assets/wp-content/uploads/2025/06/History-img-2.jpg",
  history3: "/lumoria-assets/wp-content/uploads/2025/06/History-img-3.jpg",
  history4: "/lumoria-assets/wp-content/uploads/2025/06/History-img-4.jpg",
  contact: "/lumoria-assets/wp-content/uploads/2025/06/Contact-us-contact-form-img.png",
  map: "/lumoria-assets/wp-content/uploads/2025/06/Map-iMage-1.png",
  career1: "/lumoria-assets/wp-content/uploads/2025/06/Career-img-1.jpg",
  career2: "/lumoria-assets/wp-content/uploads/2025/06/Career-img-2.jpg",
  career3: "/lumoria-assets/wp-content/uploads/2025/06/Career-img-3.jpg",
  career4: "/lumoria-assets/wp-content/uploads/2025/06/Career-img-4.jpg",
  detailCareer: "/lumoria-assets/wp-content/uploads/2025/05/Career-Detail-1.jpg",
};

const serviceCards: CardItem[] = [
  { title: "Planning And Design", body: "Urban strategies and early concept design with measurable construction outcomes.", image: img.service1, href: "/our-services" },
  { title: "Custom Construction", body: "Tailored delivery models for premium residential and mixed-use architecture.", image: img.service6, href: "/wdt-services/custom-construction" },
  { title: "Commercial Architecture", body: "Workspace systems balancing identity, circulation, and long-term flexibility.", image: img.service3, href: "/our-services" },
  { title: "Renovation And Remodeling", body: "Adaptive upgrades preserving legacy structures while improving performance.", image: img.service4, href: "/our-services" },
  { title: "Interior Detailing", body: "Material-led interior systems with bespoke furniture and lighting coordination.", image: img.service5, href: "/our-services" },
  { title: "Bidding And Delivery", body: "Transparent procurement support and contractor coordination from start to handover.", image: img.service2, href: "/our-services" },
];

const teamCards: CardItem[] = [
  { title: "Ava Mitchell", body: "Principal Architect", image: img.team1 },
  { title: "Lucas Reed", body: "Design Director", image: img.team2 },
  { title: "Maya Stone", body: "Interior Lead", image: img.team3 },
  { title: "Ethan Clarke", body: "Project Manager", image: img.team4 },
  { title: "Noah Hart", body: "Construction Planner", image: img.team5 },
  { title: "Ella Brooks", body: "Urban Strategist", image: img.team6 },
];

const portfolioCards: CardItem[] = [
  { title: "Skyline Renewal District", body: "Multi-block urban redevelopment and facade modernization.", image: img.portfolio1, href: "/portfolio-style1" },
  { title: "Harbor Residence Collection", body: "Contemporary housing with climate-sensitive passive systems.", image: img.portfolio2, href: "/portfolio-style-2" },
  { title: "North Civic Pavilion", body: "Public architecture centered on adaptable community spaces.", image: img.portfolio3, href: "/portfolio-style1" },
  { title: "Atria Office Campus", body: "Corporate campus combining collaborative and focused work zones.", image: img.portfolio4, href: "/portfolio-style-2" },
  { title: "Greenline Cultural Center", body: "A performing arts destination with integrated landscape design.", image: img.portfolio5, href: "/portfolio-style1" },
];

const blogCards: CardItem[] = [
  { title: "Urban Development For The Next Generation", body: "How people-first city design improves livability and resilience.", image: img.blog1, href: "/urban-development-for-the-next-generation", meta: "Urban Design" },
  { title: "Sustainable Construction For Long-Term Living", body: "Material strategies and lifecycle thinking for durable buildings.", image: img.blog2, href: "/sustainable-construction-for-long-term-living", meta: "Sustainability" },
  { title: "Designing Tomorrow's Cities", body: "Balancing mobility, density, and public realm quality in growth zones.", image: img.blog3, href: "/listings/designing-tomorrows-cities", meta: "Planning" },
  { title: "Modern Architecture Fueled By Innovation", body: "Tools and methods redefining architecture delivery workflows.", image: img.blog4, href: "/blog", meta: "Innovation" },
];

const awardsCards: CardItem[] = [
  { title: "Global Design Gold", body: "Awarded for integrated urban design excellence.", image: img.awards1 },
  { title: "Sustainable Impact Prize", body: "Recognized for measurable environmental performance.", image: img.awards2 },
  { title: "Interior Craft Distinction", body: "Celebrated for material and detailing clarity.", image: img.awards3 },
  { title: "Public Space Award", body: "Honoring city-centered civic architecture.", image: img.awards4 },
  { title: "Construction Innovation Medal", body: "For implementation rigor and execution quality.", image: img.awards5 },
  { title: "Client Partnership Honor", body: "Acknowledging transparent collaboration and delivery trust.", image: img.awards6 },
];

const historyTimeline: TimelineItem[] = [
  { year: "2013", title: "Studio Founded", body: "Lumoria launched with a focus on contemporary architecture and interior planning." },
  { year: "2016", title: "Regional Expansion", body: "The team grew into a multi-disciplinary studio delivering public and private projects." },
  { year: "2019", title: "Sustainability Program", body: "Performance-first standards were integrated across all design and delivery phases." },
  { year: "2023", title: "Global Collaborations", body: "Cross-border project teams formed for mixed-use developments and civic campuses." },
];

const processTimeline: TimelineItem[] = [
  { year: "01", title: "Discover", body: "Site, context, stakeholders, and operational goals are mapped before concept work." },
  { year: "02", title: "Design", body: "Spatial systems, material studies, and technical coordination are iterated rapidly." },
  { year: "03", title: "Deliver", body: "Documentation and contractor collaboration maintain design intent through build." },
  { year: "04", title: "Evolve", body: "Post-occupancy review and lifecycle guidance ensure long-term project value." },
];

const faqItems: FaqItem[] = [
  { question: "How long does a typical architecture project take?", answer: "Most projects move through discovery to delivery in 4-12 months depending on scale, approvals, and technical complexity." },
  { question: "Do you handle permits and authority approvals?", answer: "Yes. We coordinate drawings, compliance documentation, and submission workflows with local authorities." },
  { question: "Can Lumoria work with existing contractors?", answer: "Absolutely. We support tender evaluation and then collaborate with your preferred construction team." },
  { question: "Do you offer interior and architecture together?", answer: "Our teams are integrated, so architecture, interior detailing, and material systems are planned as one experience." },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Concept",
    price: "$4,900",
    cycle: "per project",
    features: [
      "Design discovery workshop",
      "Initial layout options",
      "Material mood direction",
      "Budget guidance",
    ],
  },
  {
    name: "Design Plus",
    price: "$9,800",
    cycle: "per project",
    featured: true,
    features: [
      "Complete concept package",
      "Detailed design development",
      "3D visualization set",
      "Permit-ready drawing pack",
    ],
  },
  {
    name: "Delivery",
    price: "$15,400",
    cycle: "per project",
    features: [
      "End-to-end coordination",
      "Tender and contractor support",
      "Site review milestones",
      "Post-handover checklist",
    ],
  },
];

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/our-services" },
  { label: "Portfolio", href: "/portfolio-style-2" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

export const footerColumns: Array<{ heading: string; links: NavLink[] }> = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/our-team" },
      { label: "Our History", href: "/our-history" },
      { label: "Core Values", href: "/core-values" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Our Services", href: "/our-services" },
      { label: "Custom Construction", href: "/wdt-services/custom-construction" },
      { label: "Our Process", href: "/our-process" },
      { label: "Pricing Plan", href: "/pricing-plan" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Career Listing", href: "/career-listing" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

export const sitePages: Record<PageKey, SitePage> = {
  home: {
    key: "home",
    path: "/",
    label: "Home",
    eyebrow: "Architecture And Interior Studio",
    title: "Designing Spaces That Shape Tomorrow",
    description: "Lumoria builds high-performing architecture and interiors with a refined, material-driven process.",
    heroImage: img.heroTwo,
    sections: [
      { type: "split", heading: "Contemporary Design Rooted In Context", body: "We combine architecture, interior, and technical coordination to deliver spaces that feel intentional at every scale.", image: img.about, imageAlt: "Modern architectural facade", cta: { label: "Explore Services", href: "/our-services" } },
      { type: "stats", heading: "Studio Snapshot", items: [
        { value: "180+", label: "Projects Delivered" },
        { value: "42", label: "Design Awards" },
        { value: "12", label: "Cities Served" },
        { value: "97%", label: "Client Retention" },
      ] },
      { type: "grid", heading: "What We Do", description: "Integrated services from concept to handover.", columns: 3, items: serviceCards },
      { type: "grid", heading: "Featured Projects", description: "Selected work across residential, commercial, and civic sectors.", columns: 3, items: portfolioCards },
      { type: "pricing", heading: "Pricing Framework", plans: pricingPlans },
    ],
  },
  about: {
    key: "about",
    path: "/about",
    label: "About",
    eyebrow: "Who We Are",
    title: "A Studio Built On Craft, Clarity, And Collaboration",
    description: "We translate complex briefs into architecture and interiors that remain elegant in use and durable over time.",
    heroImage: img.about,
    sections: [
      { type: "split", heading: "A Multi-Disciplinary Team", body: "Architects, interior specialists, and technical coordinators work in one unified workflow from first brief to final finish.", image: img.heroOne, imageAlt: "Studio hero" },
      { type: "timeline", heading: "Our Story", items: historyTimeline },
      { type: "grid", heading: "Leadership Team", columns: 3, items: teamCards },
    ],
  },
  blog: {
    key: "blog",
    path: "/blog",
    label: "Blog",
    eyebrow: "Insights",
    title: "Ideas On Architecture, Interiors, And Urban Change",
    description: "Read practical lessons from active projects, material research, and city-scale design thinking.",
    heroImage: img.blog1,
    sections: [
      { type: "grid", heading: "Latest Articles", columns: 2, items: blogCards },
    ],
  },
  careerListing: {
    key: "careerListing",
    path: "/career-listing",
    label: "Career Listing",
    eyebrow: "Join Lumoria",
    title: "Open Roles For Architects And Builders",
    description: "Find opportunities across design, technical delivery, and project management disciplines.",
    heroImage: img.career1,
    sections: [
      { type: "grid", heading: "Current Openings", columns: 2, items: [
        { title: "Project Assistant", body: "Coordinate project documentation and stakeholder communication.", image: img.career1, href: "/wdt-careers/project-assistant" },
        { title: "Resident Architect", body: "Lead site implementation quality and design intent control.", image: img.career2 },
        { title: "Design Engineer", body: "Support technical detailing and multi-disciplinary reviews.", image: img.career3 },
        { title: "Interior Expert", body: "Drive concept-to-execution interior experience quality.", image: img.career4 },
      ] },
    ],
  },
  contactUs: {
    key: "contactUs",
    path: "/contact-us",
    label: "Contact Us",
    eyebrow: "Start A Project",
    title: "Tell Us About Your Space",
    description: "Share your goals and timeline. We will suggest the right service path and next workshop step.",
    heroImage: img.contact,
    sections: [
      { type: "contact", heading: "Contact Details", description: "Our team responds within one business day.", office: "78 Wellington Square, Design District", phone: "+1 (555) 016-882", email: "studio@lumoria.local" },
      { type: "split", heading: "Studio Location", body: "Visit us by appointment to review site plans, concepts, and material boards in person.", image: img.map, imageAlt: "Map illustration" },
    ],
  },
  coreValues: {
    key: "coreValues",
    path: "/core-values",
    label: "Core Values",
    eyebrow: "What Drives Us",
    title: "Principles Behind Every Project",
    description: "Our decisions are guided by durability, clarity, and people-first design outcomes.",
    heroImage: img.coreValues,
    sections: [
      { type: "grid", heading: "Core Principles", columns: 3, items: [
        { title: "Integrity", body: "Transparent communication from planning through delivery." },
        { title: "Craft", body: "Precise detailing that elevates how spaces feel and perform." },
        { title: "Responsibility", body: "Sustainable choices measured across full project lifecycle." },
        { title: "Collaboration", body: "Clients and project partners are integrated into key decisions." },
        { title: "Innovation", body: "Smart design systems that reduce friction and future maintenance." },
        { title: "Longevity", body: "Timeless forms and robust material choices for lasting value." },
      ] },
    ],
  },
  faq: {
    key: "faq",
    path: "/faq",
    label: "FAQ",
    eyebrow: "Need Clarity",
    title: "Frequently Asked Questions",
    description: "Answers about process, pricing, timelines, and engagement models.",
    heroImage: img.heroThree,
    sections: [
      { type: "faq", heading: "Questions We Hear Most", items: faqItems },
    ],
  },
  listingDesigningTomorrowsCities: {
    key: "listingDesigningTomorrowsCities",
    path: "/listings/designing-tomorrows-cities",
    label: "Designing Tomorrow's Cities",
    eyebrow: "Feature Story",
    title: "Designing Tomorrow's Cities",
    description: "A closer look at mixed-use planning strategies that keep city growth human-centered.",
    heroImage: img.blog3,
    sections: [
      { type: "intro", heading: "Cities Need More Than Density", body: "Great urban design aligns transport, climate comfort, and social activity so districts remain vibrant over time.", cta: { label: "Read More Insights", href: "/blog" } },
      { type: "stats", items: [
        { value: "38%", label: "Energy savings in pilot district" },
        { value: "24", label: "Integrated mobility nodes" },
        { value: "6", label: "Public realm phases" },
      ] },
    ],
  },
  ourAwards: {
    key: "ourAwards",
    path: "/our-awards",
    label: "Our Awards",
    eyebrow: "Recognition",
    title: "Award-Winning Architecture Practice",
    description: "Independent recognition for design quality, sustainability, and client outcomes.",
    heroImage: img.awards1,
    sections: [
      { type: "grid", heading: "Recent Awards", columns: 3, items: awardsCards },
    ],
  },
  ourHistory: {
    key: "ourHistory",
    path: "/our-history",
    label: "Our History",
    eyebrow: "Studio Timeline",
    title: "From Local Studio To Global Collaborations",
    description: "Key milestones in Lumoria's design journey.",
    heroImage: img.history1,
    sections: [
      { type: "timeline", heading: "Milestones", items: historyTimeline },
      { type: "grid", heading: "History Gallery", columns: 2, items: [
        { title: "Foundation", body: "First studio and early residential commissions.", image: img.history1 },
        { title: "Expansion", body: "Scaling to multi-disciplinary teams.", image: img.history2 },
        { title: "Innovation", body: "Digital workflows and sustainability benchmarks.", image: img.history3 },
        { title: "Today", body: "International partnerships and larger civic projects.", image: img.history4 },
      ] },
    ],
  },
  ourProcess: {
    key: "ourProcess",
    path: "/our-process",
    label: "Our Process",
    eyebrow: "How We Work",
    title: "A Structured Process With Creative Flexibility",
    description: "Four clear phases keep projects aligned and on schedule.",
    heroImage: img.process1,
    sections: [
      { type: "timeline", heading: "Process Steps", items: processTimeline },
      { type: "grid", heading: "Process Visuals", columns: 4, items: [
        { title: "Discover", body: "Site and stakeholder mapping", image: img.process1 },
        { title: "Design", body: "Concept and systems integration", image: img.process2 },
        { title: "Deliver", body: "Documentation and execution", image: img.process3 },
        { title: "Evolve", body: "Post-handover improvement", image: img.process4 },
      ] },
    ],
  },
  ourServices: {
    key: "ourServices",
    path: "/our-services",
    label: "Our Services",
    eyebrow: "Capabilities",
    title: "Full-Scope Architecture And Interior Services",
    description: "From strategy and concept to delivery and optimization.",
    heroImage: img.service1,
    sections: [
      { type: "grid", heading: "Service Portfolio", columns: 3, items: serviceCards },
    ],
  },
  ourTeam: {
    key: "ourTeam",
    path: "/our-team",
    label: "Our Team",
    eyebrow: "People",
    title: "Meet The Lumoria Team",
    description: "Design and delivery specialists working as one integrated studio.",
    heroImage: img.team1,
    sections: [
      { type: "grid", heading: "Studio Members", columns: 3, items: teamCards },
    ],
  },
  portfolioStyle2: {
    key: "portfolioStyle2",
    path: "/portfolio-style-2",
    label: "Portfolio Style 2",
    eyebrow: "Portfolio",
    title: "Portfolio Grid Style 2",
    description: "A balanced card grid of recent architecture and interior projects.",
    heroImage: img.portfolio2,
    sections: [
      { type: "grid", heading: "Selected Works", columns: 3, items: portfolioCards },
    ],
  },
  portfolioStyle1: {
    key: "portfolioStyle1",
    path: "/portfolio-style1",
    label: "Portfolio Style 1",
    eyebrow: "Portfolio",
    title: "Portfolio Grid Style 1",
    description: "Expanded project cards with supporting narrative highlights.",
    heroImage: img.portfolio1,
    sections: [
      { type: "grid", heading: "Project Stories", columns: 2, items: portfolioCards },
    ],
  },
  pricingPlan: {
    key: "pricingPlan",
    path: "/pricing-plan",
    label: "Pricing Plan",
    eyebrow: "Plans",
    title: "Choose A Service Package",
    description: "Flexible pricing models for projects at different scales.",
    heroImage: img.heroThree,
    sections: [
      { type: "pricing", heading: "Plan Options", plans: pricingPlans },
      { type: "faq", heading: "Pricing Questions", items: faqItems },
    ],
  },
  sustainableConstruction: {
    key: "sustainableConstruction",
    path: "/sustainable-construction-for-long-term-living",
    label: "Sustainable Construction",
    eyebrow: "Journal",
    title: "Sustainable Construction For Long-Term Living",
    description: "Practical methods for high-performance buildings that age gracefully.",
    heroImage: img.blog2,
    sections: [
      { type: "intro", heading: "Durability Is A Design Decision", body: "Long-term value is built through early material choices, passive strategies, and lifecycle planning from day one." },
      { type: "split", heading: "Material Systems", body: "Design teams can reduce embodied carbon while improving comfort with thoughtful specification and detailing.", image: img.service5, imageAlt: "Sustainable construction image" },
    ],
  },
  urbanDevelopment: {
    key: "urbanDevelopment",
    path: "/urban-development-for-the-next-generation",
    label: "Urban Development",
    eyebrow: "Journal",
    title: "Urban Development For The Next Generation",
    description: "Future-ready planning principles for resilient urban neighborhoods.",
    heroImage: img.blog1,
    sections: [
      { type: "intro", heading: "People-Centered District Design", body: "Neighborhoods work best when mobility, green space, mixed-use zoning, and daylight access are designed as one system." },
      { type: "split", heading: "Integrated Planning", body: "Design frameworks that combine climate resilience and social interaction produce better long-term outcomes.", image: img.heroThree, imageAlt: "Urban district view" },
    ],
  },
  careerProjectAssistant: {
    key: "careerProjectAssistant",
    path: "/wdt-careers/project-assistant",
    label: "Project Assistant",
    eyebrow: "Career Detail",
    title: "Project Assistant",
    description: "Support project leaders across scheduling, communication, and document control.",
    heroImage: img.detailCareer,
    sections: [
      { type: "intro", heading: "Role Overview", body: "You will coordinate teams, maintain schedule visibility, and ensure the right information reaches stakeholders on time." },
      { type: "stats", items: [
        { value: "Full-Time", label: "Employment Type" },
        { value: "On-Site", label: "Work Model" },
        { value: "3+ Years", label: "Experience" },
      ] },
      { type: "contact", heading: "Apply For This Role", description: "Send your portfolio and CV. Our recruitment team will review within one week.", office: "Talent Desk, Lumoria Studio", phone: "+1 (555) 016-887", email: "careers@lumoria.local" },
    ],
  },
  serviceCustomConstruction: {
    key: "serviceCustomConstruction",
    path: "/wdt-services/custom-construction",
    label: "Custom Construction",
    eyebrow: "Service Detail",
    title: "Custom Construction",
    description: "Tailored construction pathways for residential and commercial architecture projects.",
    heroImage: img.service6,
    sections: [
      { type: "split", heading: "Made For Your Project Context", body: "We define delivery pathways based on budget profile, site constraints, and design ambition.", image: img.service6, imageAlt: "Custom construction" },
      { type: "grid", heading: "What Is Included", columns: 2, items: [
        { title: "Detailed Scoping", body: "Early-phase trade and feasibility consultation." },
        { title: "Technical Coordination", body: "Continuous alignment of architecture and engineering." },
        { title: "Construction Oversight", body: "Milestone-based quality and issue tracking." },
        { title: "Handover Support", body: "Completion audits and operations onboarding." },
      ] },
    ],
  },
  withLeftSidebar: {
    key: "withLeftSidebar",
    path: "/with-left-sidebar",
    label: "With Left Sidebar",
    eyebrow: "Blog Layout",
    title: "Article Layout With Left Sidebar",
    description: "Editorial page presentation with supplementary context modules.",
    heroImage: img.blog3,
    sections: [
      { type: "split", heading: "Main Article", body: "This layout mirrors a content-first article with supporting sidebar modules for categories and featured posts.", image: img.blog3, imageAlt: "Article hero", reverse: true },
      { type: "grid", heading: "Sidebar Modules", columns: 2, items: [
        { title: "Categories", body: "Architecture, Interior, Urban Planning" },
        { title: "Recent Posts", body: "Latest research and studio updates" },
      ] },
    ],
  },
  withRightSidebar: {
    key: "withRightSidebar",
    path: "/with-right-sidebar",
    label: "With Right Sidebar",
    eyebrow: "Blog Layout",
    title: "Article Layout With Right Sidebar",
    description: "Alternative editorial composition with right-aligned supporting content.",
    heroImage: img.blog4,
    sections: [
      { type: "split", heading: "Main Article", body: "A narrative article block with companion widgets, tags, and related post references.", image: img.blog4, imageAlt: "Article image" },
      { type: "grid", heading: "Sidebar Modules", columns: 2, items: [
        { title: "Related Stories", body: "Curated reading based on the current topic." },
        { title: "Project Tags", body: "Interior, Civic, Residential, Sustainability" },
      ] },
    ],
  },
  notFound: {
    key: "notFound",
    path: "/404",
    label: "404",
    eyebrow: "Not Found",
    title: "This Page Does Not Exist",
    description: "The requested page could not be found. Return to the homepage or continue browsing Lumoria sections.",
    heroImage: img.heroThree,
    sections: [
      { type: "intro", heading: "Try One Of These", body: "Use the menu to continue to services, portfolio, blog, or contact pages.", cta: { label: "Go To Homepage", href: "/" } },
    ],
  },
};
