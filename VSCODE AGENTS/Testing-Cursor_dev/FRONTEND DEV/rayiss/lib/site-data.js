export const business = {
  name: 'Rayiss Electrical & Solar',
  shortName: 'Rayiss',
  phoneDisplay: '1300 729 477',
  phoneHref: '1300729477',
  email: 'info@rayisselectrical.com.au',
  addressLine1: '3/159 Chifley St',
  addressLine2: 'Wetherill Park NSW 2164',
  hours: 'Mon-Sat 7am-5pm',
  serviceArea: 'Western Sydney, Greater Sydney, Blue Mountains, and Wollongong',
  legalLine:
    'Rayiss Electrical & Solar PTY LTD · CEC accredited · Level 2 ASP licensed',
};

export const socialLinks = [
  { label: 'Facebook', href: '/contact' },
  { label: 'Instagram', href: '/contact' },
  { label: 'LinkedIn', href: '/contact' },
];

export const solarServices = [
  {
    slug: 'residential',
    name: 'Residential solar',
    desc: 'Cut household power bills 40-70% with a system sized to your usage.',
    outcome: 'Designed around occupancy patterns and roof realities, not one-size packages.',
    includes: [
      'Roof and switchboard suitability check',
      'System sizing to daily and seasonal use',
      'Grid connection and compliance paperwork',
      'Post-install monitoring handover',
    ],
  },
  {
    slug: 'commercial',
    name: 'Commercial solar',
    desc: 'Reduce business overheads with rooftop arrays from 10kW to 100kW+.',
    outcome: 'Lower daytime operating costs while preserving uptime and safety requirements.',
    includes: [
      'Load profile review and design options',
      'Staged install planning for active sites',
      'Inverter and panel specification guidance',
      'Savings and payback assumptions for decision makers',
    ],
  },
  {
    slug: 'battery-storage',
    name: 'Battery storage',
    desc: 'Tesla Powerwall and Sungrow battery installs for night-time coverage.',
    outcome: 'Store daytime production and increase self-consumption from existing solar.',
    includes: [
      'Hybrid and retrofit battery pathways',
      'Backup expectations and critical load planning',
      'Inverter compatibility check',
      'App setup and usage walkthrough',
    ],
  },
  {
    slug: 'system-upgrades',
    name: 'System upgrades',
    desc: 'Expand arrays, replace inverters, and lift underperforming legacy systems.',
    outcome: 'Recover lost production and modernize old systems without full replacement when possible.',
    includes: [
      'Legacy array performance audit',
      'Inverter replacement planning',
      'Panel expansion for growth in demand',
      'Grid and switchboard compatibility checks',
    ],
  },
  {
    slug: 'service-maintenance',
    name: 'Service and maintenance',
    desc: 'Diagnostics, cleaning, warranty support, and fault resolution for solar systems.',
    outcome: 'Keep generation stable and address faults quickly before they become expensive.',
    includes: [
      'Performance and fault diagnostics',
      'Visual and electrical safety inspection',
      'Warranty issue triage',
      'Preventive maintenance recommendations',
    ],
  },
  {
    slug: 'finance-options',
    name: 'Finance options',
    desc: 'Guide pathways for available loan and rebate-aligned options in NSW.',
    outcome: 'Clarify viable funding paths before install commitments are made.',
    includes: [
      'Eligibility pre-check discussion',
      'Repayment scenario examples',
      'Rebate and paperwork guidance',
      'Quote packaging for finance applications',
    ],
  },
];

export const electricalServices = [
  {
    slug: 'general',
    name: 'General electrical',
    desc: 'Repairs, rewires, switchboards, and safety upgrades for homes and businesses.',
    outcome: 'Practical fixes and upgrades completed to current standards with clean handover.',
    includes: [
      'Fault finding and repairs',
      'Switchboard upgrades and compliance checks',
      'New power and lighting circuits',
      'Safety-first testing and documentation',
    ],
  },
  {
    slug: 'level-2',
    name: 'Level 2 services',
    desc: 'Network connection works including metering and service line upgrades.',
    outcome: 'Certified Level 2 works handled end to end without handoff gaps.',
    includes: [
      'Defect rectification and urgent response',
      'Overhead and underground service work',
      'Single-to-three-phase upgrades',
      'Metering and coordination support',
    ],
  },
  {
    slug: 'hot-water-heat-pumps',
    name: 'Hot water heat pumps',
    desc: 'Replace high-cost electric or gas storage with efficient heat pump systems.',
    outcome: 'Lower ongoing hot-water energy costs with rebate-aware replacement paths.',
    includes: [
      'Site suitability and replacement planning',
      'Electrical integration and commissioning',
      'Removal and disposal coordination',
      'Rebate and documentation assistance',
    ],
  },
  {
    slug: 'led-lighting-upgrades',
    name: 'LED lighting upgrades',
    desc: 'Commercial and residential upgrades with efficiency-focused design.',
    outcome: 'Reduce lighting consumption while improving reliability and light quality.',
    includes: [
      'Lighting audit and replacement mapping',
      'High-use zone prioritization',
      'Controls and switching review',
      'Rebate-ready documentation support',
    ],
  },
  {
    slug: 'ev-charger-installation',
    name: 'EV charger installation',
    desc: 'Single and three-phase EV charging installs for homes, strata, and sites.',
    outcome: 'Right-sized charging capacity with safe integration into existing supply.',
    includes: [
      'Load capacity assessment',
      'Charger model and location planning',
      'Protection and compliance setup',
      'Usage and scheduling handover',
    ],
  },
  {
    slug: 'cctv-installation',
    name: 'CCTV installation',
    desc: 'Coverage planning and install for homes, offices, and mixed-use sites.',
    outcome: 'Clear, practical coverage tuned for access points and operational blind spots.',
    includes: [
      'Camera placement and visibility planning',
      'Recording and retention setup',
      'Network and remote access configuration',
      'User walkthrough and support notes',
    ],
  },
];

export const projects = [
  {
    slug: 'wetherill-park-solar-powerwall',
    category: 'Residential solar + battery',
    title: '13.3kW Sungrow with Tesla Powerwall',
    location: 'Wetherill Park, NSW',
    summary:
      'Family home retrofit focused on reducing high evening consumption and improving resilience.',
    challenge:
      'Quarterly bills were consistently high despite moderate daytime usage and previous efficiency work.',
    solution:
      'Installed a right-sized rooftop array with battery storage and updated monitoring for load visibility.',
    result:
      'Day-to-day grid reliance dropped significantly, with visible bill reduction and better evening coverage.',
    stats: [
      { label: 'Bill before', value: '$720/qtr' },
      { label: 'Bill after', value: '$90/qtr' },
      { label: 'Payback estimate', value: '5.8 years' },
    ],
  },
  {
    slug: 'smithfield-level-2-upgrade',
    category: 'Level 2 commercial',
    title: 'Three-phase upgrade and meter works',
    location: 'Smithfield, NSW',
    summary:
      'Warehouse capacity upgrade requiring Level 2 scope with no operational downtime.',
    challenge:
      'Existing service capacity was limiting equipment expansion and tenancy turnover speed.',
    solution:
      'Coordinated phased service upgrade and meter integration aligned to site operating windows.',
    result:
      'Capacity targets achieved without shutdown delays, enabling staged occupancy improvements.',
    stats: [
      { label: 'Final capacity', value: '250A' },
      { label: 'Phases', value: '3' },
      { label: 'Operational downtime', value: '0 hours' },
    ],
  },
  {
    slug: 'liverpool-ev-charging-rollout',
    category: 'EV infrastructure',
    title: '30-bay EV charging rollout',
    location: 'Liverpool, NSW',
    summary:
      'Multi-bay charging rollout for an apartment complex with staged access constraints.',
    challenge:
      'Needed to expand charging access while managing shared supply and resident access windows.',
    solution:
      'Installed staged circuits with charger configuration tuned for multi-user load behavior.',
    result:
      'Residents gained consistent charging access with predictable usage windows and clear support handover.',
    stats: [
      { label: 'Chargers', value: '30' },
      { label: 'Per-bay output', value: '22kW' },
      { label: 'Delivery timeline', value: '11 days' },
    ],
  },
];

export const reviews = [
  {
    name: 'Nick M.',
    context: 'Residential solar · Fairfield',
    rating: 5,
    quote:
      'Very happy with the service. Everything was explained clearly and the install process was straightforward from start to finish.',
  },
  {
    name: 'Selva K.',
    context: 'Commercial · Western Sydney',
    rating: 5,
    quote:
      'Outstanding job from planning through to delivery. Strong communication and quality workmanship across the project.',
  },
  {
    name: 'Kristian I.',
    context: 'Hybrid system · NSW',
    rating: 5,
    quote:
      'The team helped us with both the technical scope and rebate onboarding, and support after install has been responsive.',
  },
];

export const blogPosts = [
  {
    slug: 'solar-battery-orientation-guide-nsw',
    category: 'Solar',
    title: 'How roof orientation changes solar and battery sizing in NSW',
    excerpt:
      'A practical walkthrough of north, east-west, and mixed roof profiles and how they affect savings assumptions.',
    date: 'May 2026',
    readTime: '6 min read',
    body: [
      'Roof orientation has a direct impact on generation shape, not just total annual output. That matters when your goal includes battery coverage in evening windows.',
      'In practical terms, households with strong evening usage often benefit from designs that prioritize usable generation timing and inverter compatibility over simple peak panel count.',
      'A good quote should explain expected generation profile, bill offset assumptions, and where uncertainty exists before installation starts.',
    ],
    relatedHref: '/solar/residential',
    relatedLabel: 'Residential solar',
  },
  {
    slug: 'level-2-upgrade-checklist-for-business',
    category: 'Electrical',
    title: 'Level 2 upgrade checklist for growing commercial sites',
    excerpt:
      'What to validate before committing to network-side electrical works in an active business environment.',
    date: 'May 2026',
    readTime: '5 min read',
    body: [
      'Level 2 works require more than basic electrical planning. Network interfaces, metering paths, and site sequencing all affect delivery risk.',
      'For operating businesses, timing and contingency planning are usually as important as technical specification. Early planning reduces avoidable downtime exposure.',
      'Request a staged scope with clear responsibilities and completion criteria so your internal operations team can coordinate around the work.',
    ],
    relatedHref: '/electrical/level-2',
    relatedLabel: 'Level 2 services',
  },
  {
    slug: 'ev-charger-capacity-planning-at-home',
    category: 'EV Charging',
    title: 'EV charger capacity planning for homes and strata sites',
    excerpt:
      'A straightforward framework for choosing charger speed, supply upgrades, and protection setup.',
    date: 'May 2026',
    readTime: '4 min read',
    body: [
      'Most charger issues come from capacity assumptions made too early. Start with supply limits, typical charging windows, and future vehicle count.',
      'Single and three-phase options each have practical trade-offs. The right answer depends on behavior, not just maximum charge rate.',
      'Good installations include electrical protection, practical cable routing, and a handover process that makes daily use simple.',
    ],
    relatedHref: '/electrical/ev-charger-installation',
    relatedLabel: 'EV charger installation',
  },
];

export const companyPages = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get a quote', href: '/contact' },
];

export const footerColumns = [
  {
    title: 'Solar',
    items: solarServices.map((service) => ({
      label: service.name,
      href: `/solar/${service.slug}`,
    })),
  },
  {
    title: 'Electrical',
    items: electricalServices.map((service) => ({
      label: service.name,
      href: `/electrical/${service.slug}`,
    })),
  },
  {
    title: 'Company',
    items: companyPages,
  },
];

export function getSolarService(slug) {
  return solarServices.find((service) => service.slug === slug);
}

export function getElectricalService(slug) {
  return electricalServices.find((service) => service.slug === slug);
}

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export const legalRoutes = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' },
];
