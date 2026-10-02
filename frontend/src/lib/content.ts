export const BRAND = {
  name: 'QuantSult',
  shortName: 'QUANTSULT',
  /**
   * Registered legal entity name. Leave empty until the owner confirms —
   * empty values are omitted from footer, contact, and structured data
   * so placeholder text never reaches site visitors.
   */
  legalName: '',
  descriptor: 'Preconstruction · Estimating · Design Support',
  tagline: 'Estimate. Design. Invest.',
  description:
    'Preconstruction estimating, takeoffs, and design coordination for contractors and developers — with investment and acquisition support when property decisions need construction intelligence.',
  serviceArea: 'United States',
  serviceAreaLine: 'Serving project teams across the United States',
  phone: '(227) 204-9141',
  phoneDisplay: '+1 (227) 204-9141',
  phoneRaw: '+12272049141',
  whatsapp: '12272049141',
  email: 'hello@csianddesign.com',
  website: 'https://csianddesign.com',
  social: {
    /** Leave empty until live Google Business Profile URL is approved. */
    googleBusiness: '',
    /** Leave empty until live LinkedIn company page URL is approved. */
    linkedIn: '',
  },
};

/** True when a brand/social value is unset or still a developer placeholder. */
export function isUnsetBrandValue(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length === 0 || trimmed.startsWith('[PLACEHOLDER');
}

/**
 * Owner-supplied values still required before launch claims can be treated as verified.
 * Fill BRAND.legalName, BRAND.social URLs, HOME_STATS, HOME_CASE_STUDIES, TEAM_SECTION.members,
 * and optional FAQ turnaround/pricing numbers when the owner confirms them.
 */
export const OWNER_PLACEHOLDERS = [
  'BRAND.legalName — registered legal entity name',
  'BRAND.social.googleBusiness / linkedIn — live profile URLs',
  'HOME_STATS — projects, states, years, repeat-client figures (homepage Proof section)',
  'HOME_CASE_STUDIES — anonymised project type, size, result (homepage Results section)',
  'TEAM_SECTION.members — founder + key roles with photos and bios (About page)',
  'Optional FAQ turnaround ranges and indicative starting price once owner confirms',
  'License jurisdictions for sealing professionals (spoken for by SITE_COPY.licensing)',
] as const;

export const SITE_COPY = {
  cta: {
    primary: 'Request an Estimate',
    secondary: `Call ${BRAND.phoneDisplay}`,
    uploadPlans: 'Upload Plans',
    reviewTrade: 'Review this trade →',
    reviewService: 'Review this service →',
    openTrade: 'Open trade page →',
    viewEstimation: 'View estimation details →',
    viewDetails: 'View details →',
  },
  contact: {
    hours: 'Monday–Friday, 8:00 AM–6:00 PM Eastern',
    responseTime: 'Typical response within one business day',
  },
  confidentiality:
    'Plans and project files are handled securely for the purpose of scoping and delivering your request. An NDA is available on request.',
  licensing:
    'Final engineering certification/sealing is provided by appropriately licensed professionals where required.',
  process: {
    eyebrow: 'How it works',
    title: 'From plans to a review-ready estimate',
    steps: [
      ['01', 'Send Plans', 'Share drawings, specs, location, and your bid or decision date.'],
      ['02', 'Scope Review', 'We confirm trades, gaps, and the deliverable that will help you bid.'],
      ['03', 'Estimate', 'We build the takeoff and pricing into an editable workbook.'],
      ['04', 'Delivery', 'You receive organized files with assumptions, exclusions, and sheet references.'],
    ],
  },
} as const;

export type ContentService = {
  slug: string;
  code: string;
  ico: string;
  name: string;
  summary: string;
  details: string;
  points: string[];
  sections?: ServiceSection[];
  calculations?: { title: string; description: string }[];
  systems?: string[];
  codes?: string[];
  whyUs?: string[];
  ctaTitle?: string;
  ctaText?: string;
  /** Replaces the default "What this supports" heading. */
  supportsTitle?: string;
  /** Optional catchphrase shown under the supports heading. */
  catchphrase?: string;
  photoSrc?: string;
  photoAlt?: string;
  sectionsEyebrow?: string;
  sectionsTitle?: string;
  /** Optional image shown beside the deliverables / sections heading. */
  sectionsPhotoSrc?: string;
  sectionsPhotoAlt?: string;
  relatedMode?: 'services' | 'trades' | 'none';
  showEstimationProjectTypes?: boolean;
};

export type ServiceSection = {
  title: string;
  items: string[];
};

export const CONTENT_SERVICES: ContentService[] = [
  {
    slug: 'estimating',
    code: 'EST',
    ico: 'estimate',
    name: 'Estimating & quantity takeoffs',
    summary:
      'Traceable quantity takeoffs and cost estimates prepared in accordance with CSI MasterFormat, tailored to each trade and market.',
    supportsTitle: 'CSI Trade Expertise',
    details:
      'Every project is unique, and every trade comes with its own scope, materials, labor requirements, and construction methods. Our estimating team understands the importance of trade-specific expertise and prepares detailed quantity takeoffs and cost estimates tailored to each discipline. Whether you\'re a general contractor assembling a complete bid or a specialty subcontractor pricing a single scope of work, we provide organized, reviewable estimates with documented assumptions that help you bid with confidence. Our estimates are prepared in accordance with CSI MasterFormat for clear organization, consistency, and professional documentation across every project.',
    points: [
      'CSI MasterFormat-organized quantity takeoffs',
      'Trade-specific cost estimates with regional market pricing',
      'Current supplier and labor market data',
      'Professional bid proposals and editable workbooks',
    ],
    relatedMode: 'trades',
    showEstimationProjectTypes: true,
    photoSrc: '/images/divisions/estimation-design.jpg',
    photoAlt: 'Construction estimating and design coordination for CSI Format takeoffs',
    ctaTitle: 'Request your estimate',
    ctaText: 'Request an Estimate and tell us which trades or project type you need estimated.',
  },
  {
    slug: 'architectural-drawings',
    code: 'ARC',
    ico: 'draft',
    name: 'Architectural drawings',
    summary:
      'Code-conscious, buildable drawing packages coordinated with estimating so design, budget, and permitting stay aligned.',
    supportsTitle: 'Architectural Drawings',
    details:
      'Our architectural drawings are developed with careful consideration of applicable building codes, jurisdiction-specific regulations, and local permitting requirements, ensuring every design is tailored to the project\'s location and approval process. Working alongside our experienced construction estimators, our architectural team develops practical, buildable designs that reflect both the project\'s vision and its budget. Every layout, detail, and material selection is thoughtfully coordinated to simplify construction, minimize unnecessary revisions, and create a smoother path from design to completion. The result is a well coordinated drawing package that brings together thoughtful design, regulatory compliance, and real world construction expertise.',
    points: [
      'Planning & layout: site, floor, roof, and reflected ceiling plans',
      'Exterior design: elevations, finish details, door & window schedules',
      'Building sections, wall sections, and stair sections',
      'Code analysis, life safety, ADA, and egress documentation',
    ],
    sections: [
      {
        title: 'Planning & Layout',
        items: ['Site Plan', 'Floor Plan', 'Roof Plan', 'Reflected Ceiling Plan (RCP)'],
      },
      {
        title: 'Exterior Design',
        items: ['Building Elevations', 'Exterior Finish Details', 'Door & Window Schedules'],
      },
      {
        title: 'Building Sections',
        items: ['Building Sections', 'Wall Sections', 'Stair Section'],
      },
      {
        title: 'Construction Details',
        items: ['Architectural Details', 'Enlarged Plans', 'Interior Elevations', 'Millwork and Cabinet Details'],
      },
      {
        title: 'Schedules',
        items: ['Door Schedules', 'Window Schedules', 'Room Finish Schedules', 'Finish Legends'],
      },
      {
        title: 'Code & Compliance',
        items: ['Code Analysis', 'Occupancy Classification', 'Life Safety Plan', 'Accessibility (ADA) Compliance', 'Egress Plan'],
      },
      {
        title: 'Specifications',
        items: ['Material Specifications', 'Finish Specifications', 'General Architectural Notes'],
      },
    ],
    sectionsEyebrow: 'What we deliver',
    sectionsTitle: 'Architectural Drawing Package',
    photoSrc: '/images/services/architectural-building.jpg',
    photoAlt: 'Landmark contemporary architecture representing coordinated drawing packages',
    whyUs: [
      'Bringing together architecture, estimating, and preconstruction expertise to deliver smarter, coordinated project solutions.',
      'Where Design Meets Construction Intelligence: Our architectural team combines thoughtful design with practical construction expertise to deliver coordinated drawing packages that are functional, buildable, and tailored to your project\'s unique requirements.',
    ],
    ctaTitle: 'Discuss architectural drawings',
    ctaText: 'Share your project vision, location, and any existing documents so we can define a coordinated drawing package.',
  },
  {
    slug: 'mep-engineering',
    code: 'MEP',
    ico: 'precon',
    name: 'MEP drafting & engineering',
    summary:
      'Coordinated Mechanical, Electrical & Plumbing drawings prepared to applicable code requirements for construction across the United States.',
    supportsTitle: 'MEP Drawings',
    catchphrase: 'Coordinated Mechanical, Electrical & Plumbing Drawings Prepared to Applicable Code Requirements',
    details:
      'Our MEP drafting services deliver accurate, coordinated, and construction-ready Mechanical, Electrical, and Plumbing drawings for projects across the United States. From permit-support documentation and multidisciplinary coordination to engineering calculations and energy compliance, we provide comprehensive solutions that support every stage of the construction process. Whether your project requires California Title 24 compliance, HVAC load calculations, electrical load analysis, plumbing calculations, or jurisdiction-specific code documentation, our team develops precise MEP packages tailored to local regulations and project requirements. Every drawing is prepared to improve constructability, streamline coordination between trades, support permit approvals, and ensure efficient project execution.',
    points: [
      'Permit-support MEP documentation and trade coordination',
      'California Title 24 and energy compliance support',
      'HVAC, electrical, and plumbing engineering calculations',
      'Codes & standards aligned with IBC, NEC, IMC, IPC, ASHRAE, and ACCA',
    ],
    photoSrc: '/images/services/mep-engineer-jobsite.jpg',
    photoAlt: 'Engineer reviewing systems on an active construction job site',
    calculations: [
      {
        title: 'California Title 24 Energy Compliance',
        description:
          'Comprehensive Title 24 documentation for residential and commercial projects, including energy compliance reports, lighting compliance, HVAC efficiency calculations, and building envelope analysis required for permit approval throughout California.',
      },
      {
        title: 'Manual J Load Calculations',
        description:
          'Accurate residential heating and cooling load calculations to properly size HVAC equipment based on building orientation, insulation values, occupancy, windows, climate zone, and internal heat gains.',
      },
      {
        title: 'Manual S Equipment Selection',
        description:
          'Proper HVAC equipment sizing and selection using ACCA standards to ensure systems meet the calculated heating and cooling loads without oversizing or undersizing.',
      },
      {
        title: 'Manual D Duct Design',
        description:
          'Professional duct sizing and airflow calculations designed to optimize air distribution, maintain static pressure, and improve HVAC system efficiency.',
      },
      {
        title: 'Commercial HVAC Load Calculations',
        description:
          'Detailed cooling and heating load analyses for office buildings, healthcare facilities, retail spaces, warehouses, educational institutions, hospitality projects, and industrial facilities.',
      },
      {
        title: 'Lighting Power Density (LPD) Calculations',
        description:
          'Lighting energy calculations to verify compliance with applicable energy codes, including lighting fixture schedules, controls, and allowable power densities.',
      },
      {
        title: 'Electrical Load Calculations',
        description:
          'Electrical demand and service load calculations for residential, commercial, and industrial facilities, including panel sizing, feeder calculations, transformer sizing, and service entrance design.',
      },
      {
        title: 'Short Circuit & Coordination Studies',
        description:
          'Engineering studies to determine available fault current, protective device coordination, and equipment ratings for safe and reliable electrical system operation.',
      },
      {
        title: 'Voltage Drop Calculations',
        description:
          'Electrical system analysis to ensure voltage remains within acceptable tolerances throughout distribution systems while maximizing operational efficiency.',
      },
      {
        title: 'Plumbing Fixture Unit Calculations',
        description:
          'Domestic water supply and sanitary drainage calculations based on fixture unit demand to ensure proper pipe sizing and system performance.',
      },
      {
        title: 'Stormwater & Roof Drainage Calculations',
        description:
          'Hydraulic calculations for roof drainage systems, stormwater piping, and site drainage to meet applicable plumbing and municipal requirements.',
      },
      {
        title: 'Ventilation & Fresh Air Calculations',
        description:
          'Outside air and ventilation calculations prepared in accordance with ASHRAE standards to ensure occupant comfort, indoor air quality, and code compliance.',
      },
      {
        title: 'Energy Modeling & Building Performance Analysis',
        description:
          'Whole-building energy modeling to evaluate energy consumption, optimize building performance, and support green building initiatives, utility incentive programs, and sustainability goals.',
      },
    ],
    codes: [
      'California Title 24 (Part 6 Energy Code)',
      'International Energy Conservation Code (IECC)',
      'International Building Code (IBC)',
      'International Mechanical Code (IMC)',
      'International Plumbing Code (IPC)',
      'International Residential Code (IRC)',
      'National Electrical Code (NEC)',
      'ASHRAE Standards (90.1, 62.1, 55)',
      'ACCA Manuals J, S & D',
      'NFPA Standards',
      'Local Authority Having Jurisdiction (AHJ) requirements',
    ],
    whyUs: [
      'Successful MEP design depends on coordination. Our integrated Mechanical, Electrical, and Plumbing team works together so every system is carefully coordinated before construction begins, minimizing clashes, reducing costly revisions, and improving installation efficiency on site.',
      'We take ownership of the coordination process, treating every project as our responsibility rather than simply delivering drawings. By proactively identifying conflicts, optimizing system layouts, and ensuring compliance with applicable codes and project requirements, we help contractors, developers, and engineers move confidently from permitting to construction.',
      'Our commitment to accuracy, accountability, and seamless collaboration allows us to deliver coordinated MEP documentation that reduces the margin for error, streamlines project execution, and supports successful outcomes on projects of every size.',
    ],
    ctaTitle: 'Discuss MEP drawings & engineering',
    ctaText: 'Share your project type, jurisdiction, and required calculations so we can define a coordinated MEP package.',
  },
  {
    slug: 'structural-engineering',
    code: 'STR',
    ico: 'takeoff',
    name: 'Structural engineering',
    summary:
      'Structural engineering prepared to applicable code requirements — from concept development through analysis, systems design, and calculations.',
    supportsTitle: 'Structural Drawings & Calculations',
    details:
      'Our structural engineering services combine careful design with engineering calculations to deliver structural solutions prepared to applicable code requirements for projects across the United States. From concept development to permit-support engineering documentation, we design structural systems that optimize performance, constructability, and material efficiency while meeting industry standards. Whether your project involves reinforced concrete, structural steel, wood framing, cold-formed steel, masonry, post-tensioned concrete, precast concrete, or hybrid structural systems, our engineers develop tailored solutions based on project-specific loading conditions, site requirements, and applicable building codes. Every design is supported by comprehensive structural analysis and engineering calculations documenting the basis of design. Every structural design and engineering calculation is developed in accordance with nationally recognized building codes and engineering standards to support durability, structural integrity, and regulatory review. Our work adheres to the International Building Code (IBC), International Residential Code (IRC), ASCE 7, ACI 318, AISC Steel Construction Manual, NDS for Wood Construction, TMS Masonry Code, and applicable state and local building regulations, delivering permit-support structural documentation coordinated for construction. Final engineering certification/sealing is provided by appropriately licensed professionals where required.',
    points: [
      'Comprehensive structural analysis and engineering calculations',
      'Support for concrete, steel, wood, masonry, and hybrid systems',
      'Loading, foundation, and lateral-system design coordination',
      'Documentation aligned with IBC, IRC, ASCE 7, ACI, AISC, NDS, and TMS',
    ],
    photoSrc: '/images/services/structural-steel.jpg',
    photoAlt: 'Structural steel frame under construction on a commercial building',
    systems: [
      'Reinforced Concrete Structures',
      'Structural Steel Buildings',
      'Wood Framing',
      'Cold-Formed Steel (Light Gauge Steel)',
      'Masonry (CMU) Structures',
      'Post-Tensioned Concrete',
      'Precast Concrete Systems',
      'Hybrid Structural Systems',
      'Retaining Walls',
      'Foundations',
      'Elevated Slabs',
      'Canopies & Miscellaneous Structures',
    ],
    codes: [
      'International Building Code (IBC)',
      'International Residential Code (IRC)',
      'ASCE 7',
      'ACI 318',
      'AISC Steel Construction Manual',
      'NDS for Wood Construction',
      'TMS Masonry Code',
      'Applicable state and local building regulations',
    ],
    ctaTitle: 'Discuss structural engineering',
    ctaText: 'Share the structural system, loading conditions, and jurisdiction so we can define the right engineering package.',
  },
  {
    slug: 'permit-support-structural-drawings',
    code: 'PSD',
    ico: 'draft',
    name: 'Permit-support structural drawings',
    summary:
      'Permit-support structural plans, sections, details, and foundation drawings coordinated with engineering calculations and local AHJ requirements.',
    supportsTitle: 'Drawings prepared for plan review coordination',
    details:
      'Our permit-support structural drawing packages translate engineering intent into clear construction documents. We prepare structural plans, sections, details, foundation drawings, and notes that support plan review and field execution. Every sheet is coordinated with applicable codes and jurisdiction-specific requirements so contractors and owners can move from design into permitting with confidence. Working alongside our structural engineers and estimators, we keep drawings buildable, consistent, and aligned with the calculations that support them. Final engineering certification/sealing is provided by appropriately licensed professionals where required.',
    points: [
      'Permit-support structural plans, sections, and details',
      'Foundation plans, schedules, and connection details',
      'Drawing packages coordinated with structural calculations',
      'Documentation prepared for AHJ plan review and field use',
    ],
    photoSrc: '/images/services/structural-wood.jpg',
    photoAlt: 'Wood and steel structural framing ready for construction documentation',
    sections: [
      {
        title: 'Structural Plans',
        items: ['Framing plans', 'Foundation plans', 'Roof framing plans', 'Floor framing plans'],
      },
      {
        title: 'Sections & Details',
        items: ['Building sections', 'Connection details', 'Typical details', 'Enlarged structural details'],
      },
      {
        title: 'Schedules & Notes',
        items: ['Beam and column schedules', 'Foundation schedules', 'General structural notes', 'Material specifications'],
      },
      {
        title: 'Permit Coordination',
        items: ['Code-referenced documentation', 'AHJ plan-review sets', 'Revision-ready markups', 'Field clarification support'],
      },
    ],
    sectionsEyebrow: 'Deliverables',
    sectionsTitle: 'What we produce for permitting',
    ctaTitle: 'Discuss permit-support structural drawings',
    ctaText: 'Share the structural system, jurisdiction, and any existing calculations so we can define a permit-support drawing package.',
  },
  {
    slug: 'bim-visualization',
    code: 'BIM',
    ico: 'draft',
    name: 'BIM modeling, rendering & walkthroughs',
    summary:
      'Photorealistic visualizations and immersive walkthroughs that help stakeholders experience a project before construction begins.',
    supportsTitle: '3D Modeling, Rendering & Virtual Walkthroughs',
    details:
      'Great design deserves to be understood before it is built. Our 3D modeling, rendering, and visualization services bridge the gap between technical drawings and reality, allowing clients, developers, architects, contractors, and investors to experience a project long before construction begins. Using industry-leading visualization technologies, we transform architectural concepts, engineering drawings, and BIM models into highly detailed, photorealistic representations that accurately showcase materials, lighting, textures, spatial relationships, and overall design intent. These visualizations not only enhance presentations but also support better decision-making, reduce design revisions, and build confidence throughout the planning and approval process. Whether you\'re presenting a luxury residence, commercial development, mixed-use complex, hospitality project, healthcare facility, or industrial building, our visualization team delivers realistic imagery and immersive experiences that communicate every aspect of your project with clarity and precision.',
    points: [
      'Photorealistic renderings of interiors and exteriors',
      'Architectural walkthrough and flythrough animations',
      'BIM-based visualization for coordination and presentations',
      'Support for design reviews, investor presentations, and marketing',
    ],
    photoSrc: '/images/services/bim/exterior-render.jpg',
    photoAlt: 'Photorealistic architectural exterior rendering',
    sectionsEyebrow: 'Visualization',
    sectionsTitle: 'Walkthroughs, renders & immersive clarity',
    sections: [
      {
        title: 'Walkthrough Animations',
        items: [
          'Experience every space before construction begins',
          'Explore interiors, exteriors, circulation paths, and architectural details as though the building already exists',
          'Ideal for design reviews, investor presentations, planning approvals, marketing campaigns, and real estate sales',
        ],
      },
      {
        title: 'Our Visualization Services',
        items: [
          'Help clients make informed design decisions with confidence',
          'Reduce costly revisions before construction',
          'Accelerate stakeholder approvals',
          'Present projects with clarity through realistic, immersive visual experiences',
        ],
      },
    ],
    ctaTitle: 'Discuss visualization for your project',
    ctaText: 'Share drawings, models, or concept materials and we will define the right visualization package.',
  },
  {
    slug: 'acquisitions-investments',
    code: 'INV',
    ico: 'bid',
    name: 'Property Acquisition',
    summary:
      'Strategic property acquisition: identifying and evaluating high-potential assets through discreet, relationship-driven opportunities.',
    details:
      'We look at property differently. Every opportunity begins with understanding the property, the numbers, and the circumstances behind it. From there, our team evaluates the opportunity and determines whether there is a path forward that makes sense. For property owners, that means having the opportunity to explore a direct transaction based on the property\'s actual condition, potential, and underlying fundamentals. For us, it means identifying properties where thoughtful renovation, design, and execution can unlock significant value.',
    points: [
      'Distressed Properties',
      'Off-Market Deals',
      'Probate & Estate Sales',
      'Divorce Settlements',
      'Seller Advisory',
      'Investor Partnerships',
    ],
    whyUs: [
      'Once an opportunity fits our criteria, our construction and design expertise becomes a major part of the equation. We can evaluate what needs to be renovated, what it will realistically cost, how the property can be improved, and what the finished asset could become.',
      'Our estimating, architectural, and engineering capabilities allow us to approach renovation projects with a level of detail that goes beyond simply buying and reselling property.',
    ],
    ctaTitle: 'Have a property to discuss?',
    ctaText:
      'If you\'re considering your options for a property, we\'d be happy to take a look. Provide us with the available information, and our team will evaluate the property and its potential.',
  },
];

export type ServiceCategoryId =
  | 'estimating'
  | 'design-engineering'
  | 'preconstruction-support'
  | 'investment-acquisition';

export type ServiceCategory = {
  id: ServiceCategoryId;
  label: string;
  description: string;
  /** When set, the category itself is a primary destination (e.g. Estimating hub). */
  href?: string;
  serviceSlugs: string[];
  /** Secondary visual weight on Services page and homepage. */
  secondary?: boolean;
};

/** Shared IA for Services dropdown, Services page, and footer. */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'estimating',
    label: 'Estimating',
    description: 'Quantity takeoffs, cost estimates, and bid support organized to CSI MasterFormat.',
    href: '/services/estimating',
    serviceSlugs: ['estimating'],
  },
  {
    id: 'design-engineering',
    label: 'Design & Engineering',
    description: 'Architectural drawings, MEP, structural engineering, and permit-support documentation.',
    serviceSlugs: [
      'architectural-drawings',
      'mep-engineering',
      'structural-engineering',
      'permit-support-structural-drawings',
    ],
  },
  {
    id: 'preconstruction-support',
    label: 'Preconstruction Support',
    description: 'BIM modeling, coordination, rendering, and walkthroughs that keep the team aligned.',
    serviceSlugs: ['bim-visualization'],
  },
  {
    id: 'investment-acquisition',
    label: 'Investment & Acquisition',
    description: 'Construction intelligence for off-market and distressed property decisions.',
    href: '/services/acquisitions-investments',
    serviceSlugs: ['acquisitions-investments'],
    secondary: true,
  },
];

export function getServicesForCategory(category: ServiceCategory): ContentService[] {
  return category.serviceSlugs
    .map((slug) => CONTENT_SERVICES.find((service) => service.slug === slug))
    .filter((service): service is ContentService => service !== undefined);
}

export function getPrimaryServices(): ContentService[] {
  return SERVICE_CATEGORIES.filter((category) => !category.secondary).flatMap(getServicesForCategory);
}

export type AudienceSection = {
  id: string;
  name: string;
  code: string;
  icon: string;
  problem: string;
  services: string[];
  deliverables: string[];
};

export const AUDIENCE_SECTIONS: AudienceSection[] = [
  {
    id: 'general-contractors',
    name: 'General Contractors',
    code: 'GC',
    icon: 'gc',
    problem: 'Need traceable estimates before bid submission?',
    services: [
      'Full-set and trade-package estimating',
      'CSI MasterFormat quantity takeoffs',
      'Addenda and revision coordination',
      'Design and engineering support when the set needs clarification',
    ],
    deliverables: [
      'Editable Excel estimate workbook',
      'Sheet-referenced quantities',
      'Documented assumptions and exclusions',
      'Summary ready for bid review',
    ],
  },
  {
    id: 'subcontractors',
    name: 'Subcontractors',
    code: 'SUB',
    icon: 'sub',
    problem: 'Need trade-specific takeoffs without adding estimating overhead?',
    services: [
      'Single-trade and multi-trade takeoffs',
      'Labor and material breakdowns',
      'Scope clarifications against the drawings',
      'Bid-ready trade packages for GC submission',
    ],
    deliverables: [
      'Trade-level Excel workbook',
      'Quantity schedule with drawing references',
      'Clear inclusions and exclusions',
      'Pricing structure you can adjust',
    ],
  },
  {
    id: 'developers',
    name: 'Developers',
    code: 'DEV',
    icon: 'precon',
    problem: 'Need cost visibility before committing to a project?',
    services: [
      'Early cost models and feasibility estimates',
      'Design coordination with estimating',
      'Market pricing aligned to project location',
      'Acquisition diligence when property decisions need construction input',
    ],
    deliverables: [
      'Division-level cost summary',
      'Assumptions tied to design stage',
      'Editable files for internal review',
      'Clear path from estimate to next design decision',
    ],
  },
  {
    id: 'architects',
    name: 'Architects',
    code: 'ARC',
    icon: 'arch',
    problem: 'Need estimating and engineering coordination during design?',
    services: [
      'Estimating alongside drawing development',
      'Structural and MEP coordination support',
      'Quantity feedback that informs detailing',
      'Permit-support documentation when required',
    ],
    deliverables: [
      'Coordinated estimate aligned to the set',
      'Quantity notes designers can act on',
      'Documented open questions',
      'Working files for the project team',
    ],
  },
];

/** @deprecated Prefer AUDIENCE_SECTIONS. Kept for residual imports during migration. */
export const AUDIENCE_CONTENT = AUDIENCE_SECTIONS.map((section) => ({
  name: section.name,
  code: section.code,
  icon: section.icon,
  intro: section.problem,
  details: section.services.join(' '),
  items: section.deliverables,
}));

export const TRADE_CONTENT = [
  'General construction',
  'Remodeling',
  'Restoration',
  'Marine work',
  'Glazing',
  'Paving',
  'Roofing',
  'Metal framing',
  'Government infrastructure',
  'HVAC',
  'MEP',
  'Ceiling and drywall',
  'Excavation',
  'Insulation',
  'Demolition',
  'Structural',
  'Landscaping',
  'Bridge work',
  'Airport construction',
  'Roads and public tenders',
  'Flooring',
  'Bath and tile',
  'Lumber and woodwork',
  'Fencing',
];

export const ABOUT_CONTENT = {
  lede: 'We believe preconstruction shouldn\'t be fragmented.',
  paragraphs: [
    'Contractors, developers, and investors shouldn\'t have to coordinate multiple firms to move a project from concept to construction. Our mission is to bring every essential preconstruction service under one roof — a single partner for planning, estimating, design coordination, and construction documentation.',
    'From quantity takeoffs and cost estimating to BIM, drawings, and engineering support prepared to applicable code requirements, we help teams make informed decisions with clear documentation.',
    'Whether you\'re bidding your next project, evaluating a property, or preparing a development for construction, we focus on documented assumptions, traceable quantities, and deliverables your team can use.',
  ],
  benefits: [
    [
      'TURNAROUND',
      'Deadline-aligned delivery',
      'From scope confirmation to final delivery, we align our process with your bid deadline.',
    ],
    [
      'ACCURACY',
      'Clear documentation',
      'Clear assumptions, exclusions, and pricing documentation your team can review and defend.',
    ],
    [
      'DATA',
      'Data-driven estimating',
      'We provide project-specific estimates by using supplier pricing, regional labor rates, historical project data and market research.',
    ],
    [
      'DEDICATED',
      'Dedicated Estimator',
      'For contractors and subcontractors looking to keep operational cost down, we offer a designated estimator allocated to your needs.',
    ],
    [
      'SUPPORT',
      'Responsive Support',
      'Once project files are shared with us, the work is as much our responsibility as it is yours.',
    ],
  ],
  biddingEdge: {
    code: 'DATA',
    title: 'Data-driven estimating',
    lede: 'Project-specific estimates grounded in supplier, labor, and market research.',
    body: 'We provide project-specific estimates by using supplier pricing, regional labor rates, historical project data and market research.',
  },
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  location?: string;
  expertise?: string;
  photoSrc?: string;
  photoAlt?: string;
  linkedIn?: string;
};

/**
 * Meet the Team (DOCX #20). Publish members only after the owner supplies
 * verified names, bios, photos, and outsourcing disclosures.
 */
export const TEAM_SECTION = {
  eyebrow: 'Meet the Team',
  title: 'The people behind the takeoff.',
  lede:
    'Estimators, designers, and coordinators who treat your bid deadline as their own. Named profiles will appear here once the owner approves biographies and headshots.',
  pendingNote:
    'Owner action required: publish at least the Founder / Managing Director with photo, short biography, years of experience, location, and market expertise. Add Senior Estimator, Architect/Engineer, or Project Coordinator profiles when available. If any technical work is delivered through partner firms, state that structure transparently rather than implying everyone is in-house.',
  members: [] as TeamMember[],
};

export const ACQUISITION_CONTENT = {
  eyebrow: 'Property Acquisition',
  title: 'Turning Property Opportunities Into Real Value',
  lede: 'We look at property differently.',
  intro: [
    'Every opportunity begins with understanding the property, the numbers, and the circumstances behind it. From there, our team evaluates the opportunity and determines whether there is a path forward that makes sense.',
    'For property owners, that means having the opportunity to explore a direct transaction based on the property\'s actual condition, potential, and underlying fundamentals.',
    'For us, it means identifying properties where thoughtful renovation, design, and execution can unlock significant value.',
  ],
  features: [
    { title: 'Property-First Evaluation', description: 'Understand condition, potential, and fundamentals before structure' },
    { title: 'Direct Conversations', description: "Explore options based on the property's actual situation" },
    { title: 'Construction Advantage', description: 'Estimating, architecture, and engineering inform the plan' },
    { title: 'Value Through Execution', description: 'Renovation and design that unlock lasting asset value' },
  ] as const,
  approachTitle: 'An Offer Built Around the Property',
  approachItems: [
    'Evaluate current condition and investment required',
    'Analyze potential before proposing a path forward',
    'Determine an appropriate acquisition structure',
    'Present the opportunity for consideration',
    'Understand the property first, then determine what makes sense',
  ] as const,
  propertyTypes: [
    { title: 'Residential', subtitle: 'Single-family, multi-family, and value-add homes', image: '/images/properties/residential.jpg' },
    { title: 'Commercial', subtitle: 'Office, retail, mixed-use, and income assets', image: '/images/properties/commercial-type.jpg' },
    { title: 'Land & Development', subtitle: 'Sites positioned for growth and entitlements', image: '/images/properties/land-development.jpg' },
    {
      title: 'Special Situations',
      subtitle: 'Probate, divorce, and other circumstances where timing, discretion, and clarity matter',
      image: '/images/properties/special-situations.jpg',
    },
  ] as const,
  specialCasesTitle: 'Probate, Divorce & Special Situations',
  specialCasesIntro:
    'Not every property opportunity comes from a conventional listing. Probate estates, divorce settlements, and other special circumstances often require a different kind of conversation — one grounded in privacy, fairness, and a clear understanding of the property\'s real condition and potential.',
  specialCases: [
    {
      title: 'Probate',
      description:
        'When a property is tied to an estate, heirs and executors need a practical path forward. We evaluate the property\'s condition, estimate the investment required to improve it, and help determine whether a direct acquisition makes sense — without unnecessary complexity or delay.',
    },
    {
      title: 'Divorce',
      description:
        'Divorce-related property decisions often involve timing pressure and the need for a fair, well-documented valuation. We assess condition, renovation cost, and upside so both parties can consider a clear option based on fundamentals rather than speculation.',
    },
    {
      title: 'Other Special Circumstances',
      description:
        'Inherited properties, distressed assets, off-market situations, and other unique circumstances each start the same way: understand the property first, then determine what makes sense for everyone involved.',
    },
  ] as const,
  values: [
    { title: 'Market Insight', description: 'Data-backed evaluation of condition, cost, and upside.' },
    { title: 'Trusted Network', description: 'Relationships that surface opportunities for thoughtful review.' },
    { title: 'Streamlined Process', description: 'Clear steps from evaluation to acquisition decision.' },
    { title: 'Aligned Outcomes', description: 'Structures built around the property and the people involved.' },
  ] as const,
  offerTitle: 'An Offer Built Around the Property',
  offerBody: [
    'We don\'t believe every property should be approached the same way.',
    'Our team evaluates the property, considers its current condition, estimates the investment required to improve it, and analyzes its potential.',
    'From that evaluation, we can determine an appropriate acquisition structure and present the opportunity for consideration.',
    'The objective is simple: understand the property first, then determine what makes sense.',
  ],
  advantageTitle: 'Where Our Advantage Begins',
  advantageIntro:
    'Once an opportunity fits our criteria, our construction and design expertise becomes a major part of the equation.',
  advantageItems: [
    'What needs to be renovated.',
    'What it will realistically cost.',
    'How the property can be improved.',
    'What the finished asset could become.',
  ],
  advantageClose:
    'Our estimating, architectural, and engineering capabilities allow us to approach renovation projects with a level of detail that goes beyond simply buying and reselling property. We identify the opportunity, understand the investment required, and develop a strategy designed to create meaningful value.',
  stepsTitle: 'From Acquisition to Transformation',
  steps: ['Evaluate', 'Acquire', 'Design', 'Renovate', 'Create Value'] as const,
  stepsBody:
    'We look for properties where the right combination of acquisition discipline, construction expertise, and thoughtful design can transform an existing asset into something substantially better. That is where we see opportunity.',
  ctaTitle: 'Have a Property to Discuss?',
  ctaText:
    'If you\'re considering your options for a property, we\'d be happy to take a look. Provide us with the available information, and our team will evaluate the property and its potential.',
};

export const HOME_PILLARS = [
  {
    title: 'Traceable Estimates',
    description: 'CSI MasterFormat takeoffs and cost estimates built from current supplier and labor market data.',
    icon: 'estimate',
  },
  {
    title: 'Integrated Design',
    description: 'Architectural, structural, MEP, and BIM coordinated for constructability.',
    icon: 'draft',
  },
  {
    title: 'Construction Intelligence',
    description: 'Labor, material, and regional market insight that strengthens every decision.',
    icon: 'precon',
  },
  {
    title: 'Strategic Acquisitions',
    description: 'Off-market opportunities and property acquisition with long-term value.',
    icon: 'bid',
  },
] as const;

export const HOME_TRUST_BAR = [
  'CSI MasterFormat',
  'U.S. Market Focus',
  'Editable Excel',
  'Trade-Specific Estimates',
] as const;

export const HOME_COMPAT_TOOLS = [
  'Bluebeam',
  'PlanSwift',
  'On-Screen Takeoff',
  'Excel',
] as const;

export const HOME_WHAT_WE_DO = [
  {
    title: 'Estimating',
    description: 'Quantity takeoffs and cost estimates organized to CSI MasterFormat.',
    href: '/services/estimating',
    icon: 'estimate',
    code: 'EST',
  },
  {
    title: 'Design & Engineering',
    description: 'Architectural, structural, MEP, and BIM documentation for permitting and construction.',
    href: '/services',
    icon: 'draft',
    code: 'DES',
  },
  {
    title: 'Preconstruction Support',
    description: 'Coordination, documentation, and bid support that keeps the team aligned.',
    href: '/services/bim-visualization',
    icon: 'precon',
    code: 'PCS',
  },
] as const;

export const HOME_WHO_WE_SERVE = [
  {
    title: 'General Contractors',
    description: 'Need traceable estimates before bid submission?',
    href: '/who-we-serve#general-contractors',
    icon: 'gc',
  },
  {
    title: 'Subcontractors',
    description: 'Need trade-specific takeoffs without adding estimating overhead?',
    href: '/who-we-serve#subcontractors',
    icon: 'sub',
  },
  {
    title: 'Developers',
    description: 'Need cost visibility before committing to a project?',
    href: '/who-we-serve#developers',
    icon: 'precon',
  },
  {
    title: 'Architects',
    description: 'Need estimating and engineering coordination during design?',
    href: '/who-we-serve#architects',
    icon: 'arch',
  },
] as const;

export const HOME_TRADE_CHIPS = [
  { label: 'Concrete', href: '/trades/concrete' },
  { label: 'Masonry', href: '/trades/masonry' },
  { label: 'Metals', href: '/trades/metals' },
  { label: 'Drywall', href: '/trades/finishes' },
  { label: 'Roofing', href: '/trades/thermal' },
  { label: 'HVAC', href: '/trades/hvac' },
  { label: 'Plumbing', href: '/trades/plumbing' },
  { label: 'Electrical', href: '/trades/electrical' },
  { label: 'Earthwork', href: '/trades/earthwork' },
  { label: 'Flooring', href: '/trades/finishes' },
  { label: 'Landscaping', href: '/trades/exterior' },
] as const;

/** Homepage Investment & Acquisition section (client #17; supports Preconstruction lead). */
export const HOME_INVESTMENT_ACQUISITION = {
  eyebrow: 'Investment & Acquisition',
  title: 'Construction intelligence for property decisions.',
  body: 'We evaluate and identify off-market and distressed opportunities with construction feasibility.',
  supporting:
    "Property isn't just found. You understand what it will cost to build, renovate or reposition it.",
  cta: 'Explore Acquisition',
  href: '/services/acquisitions-investments',
  image: '/images/divisions/property-acquisition.jpg',
  imageAlt: 'Property site evaluated with construction and acquisition diligence',
} as const;

/** @deprecated Prefer HOME_INVESTMENT_ACQUISITION; kept only if residual imports remain. */
export const HOME_DIVISIONS = [
  {
    title: 'Estimation & Design',
    description:
      'Cost estimation, architectural drawings, structural and MEP engineering, BIM coordination, and visualization. Buildable packages for contractors and developers.',
    href: '/services',
    image: '/images/properties/commercial.jpg',
    cta: 'Explore Our Services',
  },
  {
    title: 'Property Acquisition',
    description:
      'Distressed assets, off-market deals, seller advisory, investor partnerships, and market analysis. Discreet sourcing with construction-backed diligence.',
    href: '/services/acquisitions-investments',
    image: '/images/divisions/property-acquisition.jpg',
    cta: 'Discuss Opportunities',
  },
] as const;

/**
 * Homepage proof stats. Keep empty until the owner verifies every figure.
 * When non-empty, the homepage Proof section renders automatically.
 */
export const HOME_STATS: readonly { value: string; label: string }[] = [];

/**
 * Homepage case studies / testimonials. Keep empty until the owner approves
 * anonymised project type, size, and result for each entry.
 */
export const HOME_CASE_STUDIES: readonly {
  projectType: string;
  size: string;
  result: string;
}[] = [];

/** Homepage FAQ — turnaround and pricing stay qualitative until the owner confirms numbers. */
export const HOME_FAQ: [string, string][] = [
  [
    'How do you make an estimate defensible?',
    'Every quantity is tied to a drawing, scale, or stated assumption. Exclusions and open questions are visible in the deliverable, so your team can explain the number instead of guessing when a bid is reviewed.',
  ],
  [
    'What do I need to send you?',
    'Start with the PDF plan set and specifications you have. Include the trades, project location, and important date. If the set is incomplete, say so. We will identify what needs to be confirmed.',
  ],
  [
    'How quickly can you help?',
    'Timing depends on the size and completeness of the set. After we confirm scope, we align delivery to your bid or decision date. Rush service is available on request when capacity allows. Share your deadline with the plans and we will confirm a practical schedule before work starts.',
  ],
  [
    'How does pricing work?',
    'Fees are scoped from your files and explained before work starts — typically per project, per trade, or per SF depending on the package. You receive a clear engagement rather than an open-ended subscription. Ask for a fee outline when you send the set.',
  ],
  [
    'What if the drawings change?',
    'Addenda and revisions during the bid period can be coordinated with the original scope. A redesign or materially changed project after award is reviewed as new work.',
  ],
  [
    'How are project files handled?',
    'Plans and project files are handled securely for the purpose of scoping and delivering your request. An NDA is available on request. We use what you share to understand and respond to the work — do not send information that is not needed for the project conversation.',
  ],
];

export const ESTIMATION_DESIGN_LIST = [
  'Cost Estimation',
  'CSI MasterFormat',
  'Architectural Drawings',
  'Structural Design & Calcs',
  'MEP Drafting',
  'BIM Coordination',
  'Renderings & Walkthroughs',
] as const;

export const ACQUISITION_LIST = [
  'Distressed Properties',
  'Off-Market Deals',
  'Probate & Estate Sales',
  'Divorce Settlements',
  'Seller Advisory',
  'Investor Partnerships',
] as const;

export const ENGINEERING_SERVICES = [
  { title: 'Architectural Drawings', icon: 'draft' },
  { title: 'Structural Design & Calculations', icon: 'takeoff' },
  { title: 'MEP Drafting', icon: 'precon' },
  { title: 'BIM Coordination & Modeling', icon: 'draft' },
  { title: 'Renderings & Walkthroughs', icon: 'estimate' },
  { title: 'U.S. Code Alignment', icon: 'bid' },
] as const;

export const WHY_WORK_WITH_US = [
  { title: 'Code Conscious', description: 'Prepared to applicable U.S. code requirements on every deliverable.' },
  { title: 'Data Driven', description: 'Supplier pricing and regional labor factors you can defend.' },
  { title: 'Experienced Team', description: 'Estimators, designers, and engineers working as one team.' },
  { title: 'Deadline Aligned', description: 'Clear scopes and schedules you can plan around.' },
] as const;

export const TRUST_REASONS = [
  {
    title: 'CSI MasterFormat',
    description: 'Organized according to industry-standard divisions.',
    icon: 'estimate',
  },
  {
    title: 'Traceable Quantities',
    description: 'Every major quantity can be traced back to drawings and sheets.',
    icon: 'takeoff',
  },
  {
    title: 'Editable Excel Deliverables',
    description: 'Your team receives working files, not locked PDFs.',
    icon: 'bid',
  },
  {
    title: 'Trade-Level Expertise',
    description: 'Dedicated estimating across individual construction trades.',
    icon: 'sub',
  },
  {
    title: 'U.S. Market Focus',
    description: 'Pricing and project assumptions aligned to the project location.',
    icon: 'precon',
  },
] as const;

export const SAMPLE_ESTIMATE_SUMMARY = {
  label: 'Sample – illustrative pricing',
  project: 'Warehouse shell · 18,650 SF',
  filename: 'estimate.xlsx',
  downloadHref: '/samples/sample-estimate.xlsx',
  downloadLabel: 'Download sample estimate',
  columns: ['Division', 'Material', 'Labor', 'Total'] as const,
  rows: [
    ['03 Concrete', '$142,800', '$96,400', '$239,200'],
    ['04 Masonry', '$48,600', '$61,200', '$109,800'],
    ['05 Metals', '$86,400', '$54,900', '$141,300'],
    ['06 Wood & Plastics', '$22,100', '$31,500', '$53,600'],
    ['07 Thermal & Moisture', '$38,750', '$29,400', '$68,150'],
    ['09 Finishes', '$41,200', '$52,800', '$94,000'],
  ] as const,
  total: ['Sample total', '$380,850', '$326,200', '$707,050'] as const,
  included: [
    'Quantity takeoffs',
    'Material & labor pricing',
    'Drawing references',
    'Assumptions',
    'Exclusions',
    'Summary sheet',
    'Editable Excel workbook',
  ] as const,
  tracesBack:
    'Every major quantity references the sheet it came from, so a number questioned in bid review is quick to verify.',
  toolCompatibility:
    'Takeoffs in Bluebeam Revu, PlanSwift, and On-Screen Takeoff. Estimates arrive as editable Excel workbooks with formulas intact.',
} as const;

export const FEATURED_PROJECTS = [
  { title: 'Commercial', image: '/images/markets/home-commercial.jpg' },
  { title: 'Residential', image: '/images/markets/home-residential-commercial.jpg' },
  { title: 'Industrial', image: '/images/markets/home-industrial.jpg' },
  { title: 'Public', image: '/images/markets/home-public-institutional.jpg' },
] as const;

export const MARKET_SECTORS = [
  {
    slug: 'commercial',
    name: 'Commercial',
    summary:
      'Integrated preconstruction solutions for offices, retail, mixed-use, and commercial renovations.',
  },
  {
    slug: 'residential',
    name: 'Residential',
    summary:
      'Coordinated architectural, structural, MEP, and estimating support for homes, multi-family, and residential developments.',
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    summary:
      'Technical coordination for manufacturing, warehouses, processing plants, and industrial facilities.',
  },
  {
    slug: 'public',
    name: 'Public',
    summary:
      'Estimating and documentation support for municipal, educational, healthcare, and public facilities.',
  },
] as const;

export const MARKETS_CONTENT = {
  title: 'Markets We Serve',
  lede:
    'We focus on the project types where coordinated estimating and design support matter most: commercial, residential, industrial, and public work throughout the United States.',
  specialtyNote: 'Additional specialty estimating available by trade and project scope.',
  coordinationTitle: 'Integrated Coordination Across Every Project',
  coordinationBody: [
    'Successful construction begins with coordinated planning. Bringing architectural design, structural engineering, MEP, and estimating together reduces gaps, design conflicts, and review cycles.',
    'Cost is considered early — not after design is complete — so material quantities, methods, and budget stay aligned while maintaining quality and applicable code requirements.',
  ],
  closing:
    'From concept to construction, our integrated approach delivers coordinated architectural, structural, MEP, and estimating solutions that reduce risk, save time, and maximize project value.',
};

export const ACQUISITION_STEPS = ['Evaluate', 'Acquire', 'Design', 'Renovate', 'Create Value'] as const;

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: { title: string; paragraphs?: string[]; bullets?: string[] }[];
};

export const PRIVACY_EFFECTIVE_DATE = 'October 3, 2026';

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'introduction',
    title: '1. Introduction',
    paragraphs: [
      `QuantSult ("we," "us," or "our") is committed to protecting your privacy and handling your personal data with transparency. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at ${BRAND.website.replace(/^https?:\/\//, '')} (the "Site") or engage with our professional construction support services.`,
      'We believe in keeping things clear and straightforward. This policy applies to all information collected through our Site, email correspondence, and any related services or communications.',
    ],
    subsections: [
      {
        title: 'Your Consent',
        paragraphs: [
          'By accessing or using our Site, you agree to the collection and use of information as described in this Privacy Policy. If you disagree with any part of this policy, please discontinue use of the Site.',
        ],
      },
    ],
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    paragraphs: [],
    subsections: [
      {
        title: 'Personal Information You Provide',
        paragraphs: [
          'We collect personal information that you voluntarily provide to us through direct interactions, including:',
        ],
        bullets: [
          'Project quote and acquisition requests — your name, email address, phone number, company name, project or property details, and any files you upload',
          'Direct email, phone, and WhatsApp correspondence — any information you include when contacting us',
          'Mailing list subscriptions — your email address and communication preferences (if applicable)',
        ],
      },
      {
        title: 'Automatically Collected Information',
        paragraphs: [
          'When you visit our Site, certain information is collected automatically through standard web technologies:',
        ],
        bullets: [
          'IP address and approximate geographic location',
          'Browser type, version, and language preferences',
          'Operating system and device type',
          'Referring URLs and search terms that led you to our Site',
          'Pages viewed, time spent on pages, and navigation paths',
          'Access dates, times, and session duration',
        ],
      },
      {
        title: 'Why We Collect This',
        paragraphs: [
          'Automatically collected data helps us understand how visitors use our Site, improve performance, and deliver a better experience. This data is typically aggregated and not used to personally identify you.',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    paragraphs: [
      'We use the information we collect for legitimate business purposes, including:',
    ],
    bullets: [
      'Responding to your inquiries, quote requests, and service questions',
      'Providing project Drawings, Estimates, Bid proposals, and professional consultations',
      'Communicating with you about ongoing projects and service updates',
      'Improving our website content, functionality, and user experience',
      'Analyzing Site usage patterns to optimize performance and navigation',
      'Sending relevant service information and project-related updates (with your consent)',
      'Detecting and preventing fraudulent activity or misuse of our Site',
      'Complying with applicable legal obligations and regulatory requirements',
    ],
    subsections: [
      {
        title: '',
        paragraphs: [
          'We process your data only when we have a lawful basis to do so — typically to fulfill a service you have requested, to pursue our legitimate business interests, or with your explicit consent.',
        ],
      },
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies & Tracking Technologies',
    paragraphs: [
      'Our Site may use essential cookies and similar technologies required for basic operation, security, and session management. We also use first-party analytics (Vercel Analytics) to understand aggregate traffic and conversion events such as form submissions and contact link clicks. We do not run advertising trackers on the Site.',
    ],
    subsections: [
      {
        title: 'Managing Your Cookies',
        paragraphs: [
          'You can control cookie preferences through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Note that disabling essential cookies may affect the functionality of our Site. You can also clear cookies at any time through your browser\'s "Clear Browsing Data" option.',
        ],
      },
    ],
  },
  {
    id: 'analytics',
    title: '5. Third-Party Services',
    paragraphs: [
      'Our Site uses trusted third-party services for hosting and email delivery of form submissions. These providers are contractually obligated to protect your data and use it only for the purposes we specify.',
    ],
    bullets: [
      'Website hosting and related infrastructure for serving the Site',
      'Email delivery for project quote and property acquisition requests',
      'Vercel Analytics for privacy-oriented, cookieless (or first-party) measurement of page views and conversion events such as estimate requests, phone taps, WhatsApp taps, and plan uploads',
    ],
  },
  {
    id: 'sharing',
    title: '6. Data Sharing & Disclosure',
    paragraphs: [
      'We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your trust is important to us, and we treat your data with care.',
      'We may share your information only in the following limited circumstances:',
    ],
    bullets: [
      'Service Providers — trusted vendors who assist with website hosting, email delivery, and business operations, bound by confidentiality agreements',
      'Legal Requirements — when required to comply with applicable law, court order, subpoena, or legal process',
      'Business Transfers — in connection with a merger, acquisition, or sale of assets, your data may be transferred as part of the business transaction',
      'Professional Advisors — legal, financial, or accounting professionals who provide services to our company',
      'Protection of Rights — when necessary to enforce our terms, protect our rights, or ensure the safety of our users',
    ],
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    paragraphs: [
      'We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Our general retention practices include:',
    ],
    bullets: [
      'Quote and acquisition requests — retained for up to 3 years to support ongoing client relationships and project references',
      'Uploaded plan sets and project files — retained with the related request for up to 3 years, or deleted earlier on verified request when no longer needed for the engagement or legal obligations',
      'Email correspondence — retained for the duration of the business relationship plus a reasonable archival period',
      'Essential cookie, session, and analytics event data — retained according to each technology\'s designated lifespan (session cookies are deleted when you close your browser)',
    ],
    subsections: [
      {
        title: 'File uploads and confidentiality',
        paragraphs: [
          'Files you upload (including drawings and specifications) are used only to scope, price, and deliver the requested work, or to respond to your inquiry. Plans are handled with access limited to personnel involved in the request. An NDA is available on request. To request deletion of uploaded files, contact us at the email below.',
        ],
      },
      {
        title: '',
        paragraphs: [
          'When personal data is no longer needed for its original purpose, we securely delete or anonymize it using industry-standard practices.',
        ],
      },
    ],
  },
  {
    id: 'rights',
    title: '8. Your Rights & Choices',
    paragraphs: [
      'Depending on your location, you may have the following rights regarding your personal information:',
    ],
    bullets: [
      'Right of Access — request a copy of the personal data we hold about you',
      'Right of Correction — request that we correct inaccurate or incomplete personal data',
      'Right of Deletion — request that we delete your personal data, subject to legal retention requirements',
      'Right to Opt Out — unsubscribe from marketing communications at any time',
      'Right to Data Portability — request your data in a commonly used, machine-readable format',
      'Right to Restrict Processing — request that we limit how we use your data in certain circumstances',
    ],
    subsections: [
      {
        title: 'Response Time',
        paragraphs: [
          'We will acknowledge your request within 4 hours and provide a substantive response within 30 days. If additional time is needed, we will notify you of the reason and expected timeline.',
        ],
      },
    ],
  },
  {
    id: 'security',
    title: '9. Data Security',
    paragraphs: [
      'We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it, including:',
    ],
    bullets: [
      'SSL/TLS encryption for all data transmitted between your browser and our servers',
      'Access controls limiting data access to authorized personnel only',
      'Regular security reviews and updates to our systems and practices',
      'Secure storage of personal information with appropriate safeguards',
    ],
    subsections: [
      {
        title: 'Important Notice',
        paragraphs: [
          'While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to promptly addressing any security incidents that may occur.',
        ],
      },
    ],
  },
  {
    id: 'third-party-links',
    title: '10. Third-Party Links',
    paragraphs: [
      'Our Site may contain links to third-party websites, applications, or services that are not owned or controlled by QuantSult. These links are provided for your convenience and informational purposes.',
      'We have no control over — and assume no responsibility for — the content, privacy policies, or practices of any third-party sites. We encourage you to review the privacy policies of any external websites you visit through links on our Site.',
    ],
  },
  {
    id: 'marketing',
    title: '11. Marketing Communications',
    paragraphs: [
      'With your consent, we may send you occasional communications about our services, industry insights, and company updates. We respect your inbox and will not send excessive or irrelevant messages.',
      'You can manage your communication preferences at any time:',
    ],
    bullets: [
      'Unsubscribe from marketing emails using the "unsubscribe" link at the bottom of any promotional email',
    ],
    subsections: [
      {
        title: 'Transactional Communications',
        paragraphs: [
          'Please note that opting out of marketing communications does not affect transactional messages related to active projects, quote requests, or service inquiries you have initiated.',
        ],
      },
    ],
  },
  {
    id: 'changes',
    title: '12. Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. When we make material changes, we will update the "Effective Date" at the top of this page.',
      'Your continued use of the Site after any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this page periodically to stay informed about how we protect your information.',
    ],
  },
  {
    id: 'contact',
    title: '13. Contact Information',
    paragraphs: [
      `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at ${BRAND.email} or by calling ${BRAND.phoneDisplay}.`,
    ],
  },
];

export const TERMS_EFFECTIVE_DATE = 'October 3, 2026';

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    paragraphs: [
      `By accessing and using the website at ${BRAND.website} (the "Site"), operated by QuantSult ("we," "us," or "our"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations.`,
      'These Terms apply to all visitors, users, and others who access or use the Site. We may update these Terms from time to time, and your continued use of the Site constitutes acceptance of any modifications.',
    ],
    subsections: [
      {
        title: 'Important',
        paragraphs: [
          'If you do not agree to these Terms of Service, you must not access or use our Site. Please review these Terms carefully before proceeding.',
        ],
      },
    ],
  },
  {
    id: 'services',
    title: '2. Services Overview',
    paragraphs: [
      'QuantSult provides professional construction support services to contractors, architects, engineers, and developers across the United States. Our services include:',
    ],
    bullets: [
      'Construction cost estimating and quantity takeoffs across CSI divisions',
      'Architectural drafting and construction documentation',
      'MEP engineering drawings, calculations, and energy compliance support',
      'Structural engineering and permit-support structural drawings',
      'BIM modeling, rendering, and visualization',
      'Rehabilitation property acquisition and development support',
      'Pre-construction coordination and project support',
    ],
    subsections: [
      {
        title: 'Informational Purposes',
        paragraphs: [
          'All information presented on this Site is for general informational purposes only and does not constitute a binding offer, contract, or guarantee of services. Specific service agreements are governed by separate written contracts between QuantSult and the client.',
        ],
      },
      {
        title: 'Nature of Estimates',
        paragraphs: [
          'Estimates, quantity takeoffs, and pricing information prepared by QuantSult are based on the drawings, specifications, and other information you provide, together with stated assumptions, exclusions, and market data available at the time of preparation. They are tools for bidding and decision-making — not a guaranteed construction cost, not a formal bid on our behalf, and not a warranty that actual project costs, quantities, or outcomes will match the estimate. Clients remain responsible for verifying quantities, pricing, and scope against their own means and methods before relying on any figure.',
        ],
      },
      {
        title: 'Professional Licensing',
        paragraphs: [
          'Final engineering certification/sealing is provided by appropriately licensed professionals where required.',
        ],
      },
    ],
  },
  {
    id: 'responsibilities',
    title: '3. User Responsibilities',
    paragraphs: [
      'When using our Site, you agree to conduct yourself responsibly and in accordance with all applicable laws. Specifically, you agree to:',
    ],
    bullets: [
      'Provide accurate and truthful information when submitting forms or communicating with us',
      'Use the Site for lawful purposes only',
      'Respect the intellectual property and proprietary rights of QuantSult',
      'Not misrepresent your identity or affiliation when contacting us',
    ],
    subsections: [
      {
        title: 'Prohibited Activities',
        paragraphs: [
          'You agree NOT to engage in the following activities when using our Site:',
        ],
        bullets: [
          'Attempting to gain unauthorized access to any portion of the Site, its servers, or connected systems',
          'Using automated tools (bots, scrapers, crawlers) to extract data from the Site without written permission',
          'Transmitting harmful, threatening, abusive, defamatory, or otherwise objectionable material',
          'Interfering with or disrupting the proper functioning of the Site or its infrastructure',
          'Infringing upon or restricting any other user\'s ability to use the Site',
          'Violating any applicable local, state, national, or international law or regulation',
        ],
      },
    ],
  },
  {
    id: 'ip',
    title: '4. Intellectual Property',
    paragraphs: [
      'All content on this Site — including but not limited to text, graphics, logos, images, photographs, illustrations, software, and design elements — is the exclusive property of QuantSult or its content suppliers and is protected by United States and international copyright, trademark, and intellectual property laws.',
      'Without prior written consent from QuantSult, you may not:',
    ],
    bullets: [
      'Reproduce, distribute, or publicly display any content from this Site',
      'Modify, adapt, or create derivative works based on our content',
      'Use our trademarks, logos, or branding in any way that suggests endorsement or affiliation',
      'Download or copy Site content for commercial use or the benefit of a third party',
    ],
    subsections: [
      {
        title: 'Limited License',
        paragraphs: [
          'We grant you a limited, non-exclusive, non-transferable license to access and view the content on this Site for personal, non-commercial informational purposes. This license does not include the right to collect, copy, or distribute any content.',
        ],
      },
    ],
  },
  {
    id: 'links',
    title: '5. Third-Party Links',
    paragraphs: [
      'Our Site may contain links to third-party websites, resources, or services that are not owned, operated, or controlled by QuantSult. These links are provided solely for your convenience and reference.',
      'QuantSult does not endorse, guarantee, or assume responsibility for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that QuantSult is not responsible or liable — directly or indirectly — for any damage or loss caused or alleged to be caused by or in connection with your use of or reliance on any third-party content, products, or services.',
      'We encourage you to review the terms and privacy policies of any third-party sites you visit.',
    ],
  },
  {
    id: 'availability',
    title: '6. Service Availability',
    paragraphs: [
      'We strive to maintain the availability and proper functioning of our Site at all times. However, we do not guarantee uninterrupted, timely, secure, or error-free access to the Site.',
      'The Site may be temporarily unavailable due to maintenance, updates, technical issues, or circumstances beyond our control. We reserve the right to modify, suspend, or discontinue any aspect of the Site at any time without prior notice.',
    ],
    subsections: [
      {
        title: 'Scheduled Maintenance',
        paragraphs: [
          'When possible, we schedule maintenance during off-peak hours to minimize disruption. We are not liable for any inconvenience or loss resulting from Site unavailability.',
        ],
      },
    ],
  },
  {
    id: 'disclaimer',
    title: '7. Disclaimer of Warranties',
    paragraphs: [
      'This Site and its contents are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, QuantSult disclaims all warranties, including but not limited to:',
    ],
    bullets: [
      'Implied warranties of merchantability and fitness for a particular purpose',
      'Warranties of non-infringement of third-party intellectual property rights',
      'Warranties that the Site will be uninterrupted, error-free, or free of harmful components',
      'Warranties regarding the accuracy, reliability, or completeness of any content on the Site',
    ],
    subsections: [
      {
        title: 'No Professional Advice',
        paragraphs: [
          'Content on this Site is for informational purposes and does not constitute professional advice, a bid, or a guarantee of project outcomes. Formal engagements are governed by separate written agreements. Final engineering certification/sealing is provided by appropriately licensed professionals where required.',
        ],
      },
      {
        title: 'Estimate Accuracy Disclaimer',
        paragraphs: [
          'Any sample workbooks, illustrative pricing, or marketing descriptions of estimating services are examples only. Delivered estimates reflect documented assumptions and the information available at the time of preparation. QuantSult does not warrant that estimates are free from error or that actual costs will match estimated amounts.',
        ],
      },
    ],
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by applicable law, QuantSult, its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to:',
    ],
    bullets: [
      'Your use of or inability to use this Site',
      'Any content, products, or services obtained through the Site',
      'Unauthorized access to or alteration of your transmissions or data',
      'Statements or conduct of any third party on or through the Site',
      'Errors, omissions, or inaccuracies in Site content',
      'Loss of profits, data, goodwill, or other intangible losses',
    ],
    subsections: [
      {
        title: '',
        paragraphs: [
          'This limitation applies even if QuantSult has been advised of the possibility of such damages. In jurisdictions that do not allow the exclusion or limitation of certain damages, our liability shall be limited to the greatest extent permitted by law.',
        ],
      },
    ],
  },
  {
    id: 'termination',
    title: '9. Termination',
    paragraphs: [
      'We reserve the right to suspend or terminate your access to the Site at our sole discretion, without prior notice, for any reason — including but not limited to a breach of these Terms of Service.',
      'Upon termination, your right to use the Site will cease immediately. All provisions of these Terms that by their nature should survive termination shall remain in effect, including intellectual property provisions, warranty disclaimers, limitation of liability, and indemnification.',
    ],
  },
  {
    id: 'changes',
    title: '10. Changes to Terms',
    paragraphs: [
      'We reserve the right to modify, update, or replace these Terms of Service at any time. When material changes are made, we will update the "Effective Date" at the top of this page. Changes become effective immediately upon posting to the Site.',
    ],
    subsections: [
      {
        title: 'Continued Use',
        paragraphs: [
          'Your continued use of the Site after any changes to these Terms constitutes your acceptance of the revised terms. We encourage you to review these Terms periodically to stay informed of any updates.',
        ],
      },
    ],
  },
  {
    id: 'governing-law',
    title: '11. Governing Law',
    paragraphs: [
      'These Terms of Service are governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.',
      'Any disputes arising from or relating to these Terms or your use of the Site shall be resolved in the appropriate federal or state courts within the United States. You consent to the personal jurisdiction and venue of such courts and waive any objections based on forum non conveniens.',
    ],
  },
  {
    id: 'contact',
    title: '12. Contact Information',
    paragraphs: [
      `If you have any questions, concerns, or feedback regarding these Terms of Service, we welcome you to contact us at ${BRAND.email}.`,
    ],
  },
];

/** @deprecated Prefer PRIVACY_SECTIONS structured content */
export const PRIVACY_SECTIONS_LEGACY: [string, string][] = PRIVACY_SECTIONS.map((s) => [
  s.title,
  s.paragraphs.join(' '),
]);

/** @deprecated Prefer TERMS_SECTIONS structured content */
export const TERMS_SECTIONS_LEGACY: [string, string][] = TERMS_SECTIONS.map((s) => [
  s.title,
  s.paragraphs.join(' '),
]);
