export const BRAND = {
  name: 'CSI & Design',
  shortName: 'CSI & DESIGN',
  descriptor: 'Estimation · Design · Acquisition',
  description:
    'Estimation, design, and property acquisition under one roof: clear scope, coordinated documentation, and strategic opportunities.',
  phone: '(227) 204-9141',
  phoneDisplay: '+1 (227) 204-9141',
  phoneRaw: '+12272049141',
  whatsapp: '12272049141',
  email: 'hello@csianddesign.com',
  website: 'https://csianddesign.com',
};

export const SITE_COPY = {
  cta: {
    primary: 'Request a Quote',
    secondary: `Call ${BRAND.phoneDisplay}`,
    reviewTrade: 'Review this trade →',
    reviewService: 'Review this service →',
    openTrade: 'Open trade page →',
    viewEstimation: 'View estimation details →',
    viewDetails: 'View details →',
  },
  process: {
    eyebrow: 'How it works',
    title: 'A coordinated path from project information to action',
    steps: [
      ['STEP 01', 'Send the working set', 'Share the drawings, specifications, scope notes, location, and date that drive the decision.'],
      ['STEP 02', 'Confirm the brief', 'We identify the requested service, available information, open questions, and the deliverable that will be useful.'],
      ['STEP 03', 'Build and document', 'We develop the takeoff, pricing structure, drawings, engineering support, or coordination package against the agreed scope.'],
      ['STEP 04', 'Review with confidence', 'You receive organized files with assumptions, exclusions, references, and a clear path for revisions or next decisions.'],
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
      'Accurate quantity takeoffs and cost estimates prepared in accordance with CSI MasterFormat, tailored to each trade and market.',
    supportsTitle: 'CSI Trade Expertise',
    details:
      'Every project is unique, and every trade comes with its own scope, materials, labor requirements, and construction methods. Our estimating team prepares detailed quantity takeoffs and cost estimates tailored to each discipline. General contractors assembling a complete bid and specialty subcontractors pricing a single scope of work receive accurate, organized estimates built to support confident bidding. All estimates follow CSI MasterFormat for clear organization, consistency, and professional documentation across every project.',
    points: [
      'CSI MasterFormat-organized quantity takeoffs',
      'Trade-specific cost estimates with market intelligence',
      'Real-time material pricing and regional labor trends',
      'Professional bid proposals and editable workbooks',
    ],
    relatedMode: 'trades',
    showEstimationProjectTypes: true,
    photoSrc: '/images/divisions/estimation-design.jpg',
    photoAlt: 'Construction estimating and design coordination for CSI Format takeoffs',
    ctaTitle: 'Request your estimate',
    ctaText: 'Request a Quote and tell us which trades or project type you need estimated.',
  },
  {
    slug: 'architectural-drawings',
    code: 'ARC',
    ico: 'draft',
    name: 'Architectural drawings',
    summary:
      'Code-conscious, buildable drawing packages coordinated with estimating so design, budget, and permitting stay aligned.',
    supportsTitle: 'Architectural drawings that build',
    details:
      'Our architectural drawings account for applicable building codes, jurisdiction-specific regulations, and local permitting requirements. Each design reflects the project\'s location and approval process. Working alongside our construction estimators, the architectural team develops practical, buildable designs that align with the project\'s vision and budget. Layouts, details, and material selections are coordinated to simplify construction, minimize revisions, and shorten the path from design to completion. The finished package ties code compliance, real-world construction knowledge, and design intent into one coordinated set.',
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
      'Architecture, estimating, and preconstruction expertise combined for coordinated project solutions.',
      'Our architectural team pairs design intent with construction expertise to deliver coordinated drawing packages that are functional, buildable, and matched to your project\'s requirements.',
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
      'Coordinated Mechanical, Electrical & Plumbing drawings for efficient, code-compliant construction across the United States.',
    supportsTitle: 'MEP Drawings',
    catchphrase:
      'Coordinated Mechanical, Electrical & Plumbing Drawings for Efficient, Code-Compliant Construction',
    details:
      'Our MEP drafting services deliver accurate, coordinated, construction-ready Mechanical, Electrical, and Plumbing drawings for projects across the United States. Scope ranges from permit-ready documentation and multidisciplinary coordination to engineering calculations and energy compliance. The team produces precise MEP packages covering California Title 24 compliance, HVAC load calculations, electrical load analysis, plumbing calculations, and jurisdiction-specific code documentation, all tailored to local regulations and project requirements. Every drawing targets improved constructability, tighter trade coordination, faster permit approvals, and efficient project execution.',
    points: [
      'Permit-ready MEP documentation and trade coordination',
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
      'Successful MEP design depends on coordination. Our integrated Mechanical, Electrical, and Plumbing team works under one roof to coordinate every system before construction begins, minimizing clashes, reducing costly revisions, and improving installation efficiency on site.',
      'We own the coordination process and treat every project as our responsibility. We identify conflicts early, optimize system layouts, and verify compliance with applicable codes so contractors, developers, and engineers can move from permitting to construction with confidence.',
      'Accuracy, accountability, and tight collaboration produce coordinated MEP documentation that reduces errors, compresses project timelines, and supports successful outcomes at every scale.',
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
      'Safe, efficient, and code-compliant structural engineering from concept development through analysis, systems design, and calculations.',
    supportsTitle: 'Engineering that carries the load',
    details:
      'Our structural engineering services combine design with precise calculations to deliver safe, efficient, and code-compliant structural solutions for projects across the United States. From concept development to engineering documentation, we design systems that optimize performance, constructability, and material efficiency. Our engineers work across reinforced concrete, structural steel, wood framing, cold-formed steel, masonry, post-tensioned concrete, precast concrete, and hybrid systems, developing solutions based on project-specific loading conditions, site requirements, and applicable building codes. Every design is supported by structural analysis so the system you build is the system the calculations intended.',
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
    slug: 'permit-ready-structural-drawings',
    code: 'PSD',
    ico: 'draft',
    name: 'Permit-ready structural drawings',
    summary:
      'Permit-ready structural plans, sections, details, and foundation drawings coordinated with engineering calculations and local AHJ requirements.',
    supportsTitle: 'Drawings ready for the building department',
    details:
      'Our permit-ready structural drawing packages translate engineering intent into clear construction documents. We prepare structural plans, sections, details, foundation drawings, and notes that support plan review and field execution. Every sheet is coordinated with applicable codes and jurisdiction-specific requirements so contractors and owners can move from design into permitting with confidence. Working alongside our structural engineers and estimators, we keep drawings buildable, consistent, and aligned with the calculations that support them.',
    points: [
      'Permit-ready structural plans, sections, and details',
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
        items: ['Code-referenced documentation', 'AHJ-ready drawing sets', 'Revision-ready markups', 'Field clarification support'],
      },
    ],
    sectionsEyebrow: 'Deliverables',
    sectionsTitle: 'What we produce for permitting',
    ctaTitle: 'Discuss permit-ready structural drawings',
    ctaText: 'Share the structural system, jurisdiction, and any existing calculations so we can define a permit-ready drawing package.',
  },
  {
    slug: 'bim-visualization',
    code: 'BIM',
    ico: 'draft',
    name: 'BIM modeling, rendering & walkthroughs',
    summary:
      'Photorealistic visualizations and immersive walkthroughs that help stakeholders experience a project before construction begins.',
    supportsTitle: 'See the build before it starts',
    details:
      'Design should be understood before it is built. Our BIM modeling, rendering, and visualization services connect technical drawings to reality, giving clients, developers, architects, contractors, and investors a clear view of the project before construction begins. We transform architectural concepts, engineering drawings, and BIM models into photorealistic representations that show materials, lighting, textures, spatial relationships, and design intent. Across luxury residences, commercial interiors, hospitality, healthcare, and industrial facilities, clear visualization drives better decisions, fewer revisions, and faster approvals.',
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
          'Explore interiors, exteriors, circulation paths, and architectural details',
          'Ideal for design reviews, investor presentations, planning approvals, marketing, and real estate sales',
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
      'We look at property differently. Every opportunity begins with understanding the property, the numbers, and the circumstances behind it. From there, our team evaluates the opportunity and determines whether a path forward makes sense. For property owners, that means exploring a direct transaction based on the property\'s actual condition, potential, and underlying fundamentals. For us, it means identifying properties where targeted renovation, design, and execution can unlock significant value.',
    points: [
      'Distressed Properties',
      'Off-Market Deals',
      'Seller Advisory',
      'Investor Partnerships',
      'Property Acquisition',
      'Market Analysis',
    ],
    whyUs: [
      'Once an opportunity fits our criteria, our construction and design expertise becomes a major part of the equation. We can evaluate what needs to be renovated, what it will realistically cost, how the property can be improved, and what the finished asset could become.',
      'Our estimating, architectural, and engineering capabilities allow us to approach renovation projects with a level of detail that goes beyond buying and reselling property.',
    ],
    ctaTitle: 'Have a property to discuss?',
    ctaText:
      'If you\'re considering your options for a property, we\'d be happy to take a look. Provide us with the available information, and our team will evaluate the property and its potential.',
  },
];

export const AUDIENCE_CONTENT = [
  {
    name: 'General contractors',
    code: 'GC',
    icon: 'gc',
    intro:
      'From quantity takeoffs and cost estimating to BIM coordination and construction documentation, we provide full-scope preconstruction support that helps general contractors bid with confidence, reduce risk, and deliver successful projects. One firm, one point of contact.',
    details:
      'Use organized takeoffs, visible pricing logic, and revision-ready documentation to decide which opportunities deserve a bid and carry the number into review.',
    items: ['Complete bid and scope support', 'Trade-by-trade quantities', 'Addenda and revision coordination', 'Editable, review-ready documentation'],
  },
  {
    name: 'Subcontractors',
    code: 'SUB',
    icon: 'sub',
    intro:
      'Subcontractors carry the project from paper to reality. We understand the pressure of pricing work accurately while balancing tight deadlines and competitive markets.',
    details:
      'Our team provides precise quantity takeoffs, trade-specific cost estimates, and dependable preconstruction support so you can bid smarter, protect your margins, and stay focused on the field.',
    items: ['Single-trade takeoffs', 'Labor and material breakdowns', 'Scope clarifications and exclusions', 'Bid-ready trade support'],
  },
  {
    name: 'Heavy civil & infrastructure',
    code: 'CIV',
    icon: 'precon',
    intro:
      'We provide accurate estimates, quantity takeoffs, and preconstruction support for roads, bridges, utilities, and public infrastructure projects, helping contractors bid competitively and execute with confidence.',
    details:
      'Keep quantities, units, alternates, and assumptions legible across roads, utilities, airports, bridges, and public work.',
    items: ['Roads and bridges', 'Utilities and public works', 'Excavation and sitework', 'Tender and addenda support'],
  },
  {
    name: 'MEP contractors',
    code: 'MEP',
    icon: 'draft',
    intro:
      'Our MEP estimating services deliver accurate quantity takeoffs and cost estimates for mechanical, electrical, and plumbing systems, helping contractors bid confidently with coordinated, trade-specific preconstruction support.',
    details:
      'Support complex systems with the calculations, drawings, takeoffs, and scope documentation other project teams need to review your work.',
    items: ['Mechanical systems', 'Electrical systems', 'Plumbing systems', 'BIM coordination when required'],
  },
  {
    name: 'Structural contractors',
    code: 'STR',
    icon: 'takeoff',
    intro:
      'We provide detailed structural estimates and quantity takeoffs for concrete, steel, masonry, wood framing, and other structural systems, helping contractors build accurate bids with confidence from the ground up.',
    details:
      'Structural estimates combine engineering coordination, production analysis, and real-time pricing to deliver accurate bid packages.',
    items: ['Concrete, steel, masonry, and wood', 'Reinforcement and connection details', 'Production-based estimating', 'BIM-enabled coordination'],
  },
  {
    name: 'HVAC contractors',
    code: 'HVAC',
    icon: 'estimate',
    intro:
      'Our HVAC estimating services provide accurate quantity takeoffs and cost estimates for heating, ventilation, and air conditioning systems, helping mechanical contractors bid efficiently, reduce risk, and improve project profitability.',
    details:
      'HVAC estimates combine supplier pricing, labor analysis, and system coordination to help mechanical contractors build profitable bids.',
    items: ['Equipment and ductwork takeoffs', 'Labor and productivity analysis', 'System coordination', 'Market-driven pricing'],
  },
];

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
  lede: 'Preconstruction should not be fragmented.',
  paragraphs: [
    'Contractors, developers, homeowners, and investors should not have to coordinate multiple firms to move a project from concept to construction. We bring every core preconstruction service under one roof: planning, estimating, design coordination, and construction documentation from a single partner.',
    'Quantity takeoffs, cost estimating, BIM coordination, construction drawings, engineering support, and code-compliant documentation all run through one team. Technical expertise and technology-driven workflows help clients make informed decisions faster.',
    'We replace assumptions with data, improve collaboration through coordinated workflows, and deliver solutions that are accurate, reliable, and built around client success. Bidding a project, evaluating a property acquisition, or preparing a development for construction all start with the same need: expertise, insight, and support in one place.',
  ],
  benefits: [
    [
      'TURNAROUND',
      'Faster Turnaround Time',
      'Other firms pad turnaround schedules. We deliver cost estimates on time and without errors.',
    ],
    [
      'ACCURACY',
      'Accuracy of Data',
      'You receive accurate data matched to your instructions. No scrambling after delivery.',
    ],
    [
      'BID EDGE',
      'Bidding Edge',
      'With our Market Analytical Proprietary Technology, estimates incorporate live market trends, giving your bid an edge in final rounds.',
    ],
    [
      'DEDICATED',
      'Dedicated Estimator',
      'Contractors and subcontractors get a designated estimator allocated exclusively to their workload, keeping operational costs low.',
    ],
    [
      'SUPPORT',
      '24/7 Support',
      'Once project files are shared with us, they are as much our responsibility as they are yours.',
    ],
  ],
};

export const ACQUISITION_CONTENT = {
  eyebrow: 'Property Acquisition',
  title: 'Turning Property Opportunities Into Real Value',
  lede: 'We look at property differently.',
  intro: [
    'Every opportunity begins with understanding the property, the numbers, and the circumstances behind it. From there, our team evaluates the opportunity and determines whether there is a path forward that makes sense.',
    'For property owners, that means a direct conversation based on the property\'s actual condition, potential, and underlying fundamentals.',
    'For us, it means identifying properties where targeted renovation, design, and execution can unlock significant value.',
  ],
  features: [
    { title: 'Property-First Evaluation', description: 'Understand condition, potential, and fundamentals before structure' },
    { title: 'Direct Conversations', description: 'Explore options based on the property’s actual situation' },
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
    { title: 'Special Situations', subtitle: 'Unique circumstances where timing and clarity matter', image: '/images/properties/special-situations.jpg' },
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
    'The objective is clear: understand the property first, then determine what makes sense.',
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
    'Our estimating, architectural, and engineering capabilities let us approach renovation projects with a level of detail that goes beyond buying and reselling property. We identify the opportunity, understand the investment required, and develop a strategy designed to create lasting value.',
  stepsTitle: 'From Acquisition to Transformation',
  steps: ['Evaluate', 'Acquire', 'Design', 'Renovate', 'Create Value'] as const,
  stepsBody:
    'We look for properties where the right combination of acquisition discipline, construction expertise, and deliberate design can transform an existing asset into something substantially better. That is where we see opportunity.',
  ctaTitle: 'Have a Property to Discuss?',
  ctaText:
    'If you\'re considering your options for a property, we\'d be happy to take a look. Provide us with the available information, and our team will evaluate the property and its potential.',
};

export const HOME_PILLARS = [
  {
    title: 'Accurate Estimates',
    description: 'CSI MasterFormat takeoffs and cost estimates grounded in real market data.',
    icon: 'estimate',
  },
  {
    title: 'Integrated Design',
    description: 'Architectural, structural, MEP, and BIM coordinated under one roof.',
    icon: 'draft',
  },
  {
    title: 'Construction Intelligence',
    description: 'Labor, material, and market insight that strengthens every decision.',
    icon: 'precon',
  },
  {
    title: 'Strategic Acquisitions',
    description: 'Off-market opportunities and property acquisition with long-term value.',
    icon: 'bid',
  },
] as const;

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

export const HOME_STATS = [
  { value: '16+', label: 'Trades & Disciplines' },
  { value: '10+', label: 'Years of Data' },
  { value: 'U.S. & Canada', label: 'Code Compliance' },
  { value: '100%', label: 'Client Focused' },
] as const;

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
  'Seller Advisory',
  'Investor Partnerships',
  'Property Acquisition',
  'Market Analysis',
] as const;

export const ENGINEERING_SERVICES = [
  { title: 'Architectural Drawings', icon: 'draft' },
  { title: 'Structural Design & Calculations', icon: 'takeoff' },
  { title: 'MEP Drafting', icon: 'precon' },
  { title: 'BIM Coordination & Modeling', icon: 'draft' },
  { title: 'Renderings & Walkthroughs', icon: 'estimate' },
  { title: 'Code Compliance (USA & Canada)', icon: 'bid' },
] as const;

export const WHY_WORK_WITH_US = [
  { title: 'Code Compliant', description: 'U.S. and Canada standards built into every deliverable.' },
  { title: 'Data Driven', description: 'Market pricing and production factors you can defend.' },
  { title: 'Experienced Team', description: 'Estimators, designers, and engineers under one roof.' },
  { title: 'On Time. Every Time.', description: 'Clear scopes and deadlines you can plan around.' },
] as const;

export const FEATURED_PROJECTS = [
  { title: 'Industrial', image: '/images/markets/home-industrial.jpg' },
  { title: 'Residential & Commercial', image: '/images/markets/home-residential-commercial.jpg' },
  { title: 'Public / Institutional', image: '/images/markets/home-public-institutional.jpg' },
] as const;

export const MARKET_SECTORS = [
  {
    slug: 'residential',
    name: 'Residential',
    summary:
      'Coordinated architectural, structural, MEP, and estimating support for homes, multi-family, and residential developments.',
  },
  {
    slug: 'commercial',
    name: 'Commercial',
    summary:
      'Integrated preconstruction solutions for offices, retail, mixed-use, and commercial renovations.',
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    summary:
      'Technical coordination for manufacturing, warehouses, processing plants, and industrial facilities.',
  },
  {
    slug: 'government-public',
    name: 'Government & Public',
    summary:
      'Compliant estimating and documentation for municipal, educational, healthcare, and public facilities.',
  },
  {
    slug: 'infrastructure-civil',
    name: 'Infrastructure & Civil',
    summary:
      'Quantity takeoffs and coordination for roads, bridges, utilities, and civil infrastructure.',
  },
  {
    slug: 'hospitality-recreation',
    name: 'Hospitality & Recreation',
    summary:
      'Design and estimating support for hospitality, recreation, and experience-driven facilities.',
  },
] as const;

export const MARKETS_CONTENT = {
  title: 'Markets We Serve',
  lede:
    'Our multidisciplinary expertise covers a wide range of industries and building sectors throughout the United States. New developments, renovations, expansions, and infrastructure projects all receive coordinated preconstruction solutions tailored to the technical and operational requirements of each market.',
  coordinationTitle: 'Integrated Coordination Across Every Project',
  coordinationBody: [
    'Regardless of the market or project type, successful construction begins with coordinated planning. Bringing Architectural Design, Structural Engineering, MEP Engineering, and Construction Estimating together under one roof reduces coordination gaps, minimizes costly design conflicts, and accelerates project delivery.',
    'Our multidisciplinary teams collaborate throughout design so every structural member, mechanical system, electrical layout, plumbing network, and architectural element aligns. This coordinated approach cuts the margin for error, improves constructability, shortens review cycles, and moves projects more efficiently from concept to construction.',
    'Cost enters the conversation at project start, not after design is complete. Our estimating professionals work inside the design process, continuously evaluating material quantities, construction methods, and project costs to develop practical, buildable solutions that align with the client\'s budget while maintaining quality, performance, and code compliance.',
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

export const PRIVACY_EFFECTIVE_DATE = 'September 18, 2026';

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'introduction',
    title: '1. Introduction',
    paragraphs: [
      'CSI & Design ("we," "us," or "our") is committed to protecting your privacy and handling your personal data with transparency. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at csianddesign.com (the "Site") or engage with our professional construction support services.',
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
          'Contact form submissions — your name, email address, phone number, company name, and project details',
          'Quote and consultation requests — project scope, service type, and budget information',
          'Email correspondence — any information you include when contacting us directly',
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
      'Our Site uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us recognize your browser and remember certain preferences.',
    ],
    subsections: [
      {
        title: 'Types of Cookies We Use',
        bullets: [
          'Essential Cookies — required for the Site to function properly (e.g., session management, security)',
          'Analytics Cookies — help us understand how visitors interact with our Site by collecting anonymous usage data',
          'Functional Cookies — remember your preferences such as language or region to provide a personalized experience',
          'Performance Cookies — monitor Site performance and help us identify and fix issues',
        ],
      },
      {
        title: 'Managing Your Cookies',
        paragraphs: [
          'You can control cookie preferences through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Note that disabling certain cookies may affect the functionality of our Site. You can also clear cookies at any time through your browser\'s "Clear Browsing Data" option.',
        ],
      },
    ],
  },
  {
    id: 'analytics',
    title: '5. Analytics & Third-Party Services',
    paragraphs: [
      'We may use third-party analytics services, such as Google Analytics, to collect and analyze information about how our Site is used. These services help us understand visitor behavior, measure Site performance, and improve our content and services.',
    ],
    bullets: [
      'Google Analytics collects data such as pages visited, time on site, and traffic sources using cookies and similar technologies',
      'Analytics data is typically processed in aggregated, anonymous form',
      'We do not merge analytics data with personally identifiable information',
      'You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on, available at tools.google.com/dlpage/gaoptout.',
    ],
    subsections: [
      {
        title: 'Third-Party Services',
        paragraphs: [
          'Our Site may use additional third-party services for hosting, email delivery, and form processing. These providers are contractually obligated to protect your data and use it only for the purposes we specify.',
        ],
      },
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
      'Service Providers — trusted vendors who assist with website hosting, email delivery, analytics, and business operations, bound by confidentiality agreements',
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
      'Contact form submissions and quote requests — retained for up to 3 years to support ongoing client relationships and project references',
      'Email correspondence — retained for the duration of the business relationship plus a reasonable archival period',
      'Analytics data — retained in aggregated, anonymized form and reviewed periodically',
      'Cookie data — retained according to each cookie\'s designated lifespan (session cookies are deleted when you close your browser)',
    ],
    subsections: [
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
      'Our Site may contain links to third-party websites, applications, or services that are not owned or controlled by CSI & Design. These links are provided for your convenience and informational purposes.',
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
      `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at ${BRAND.email} or by calling ${BRAND.phone}.`,
    ],
  },
];

export const TERMS_EFFECTIVE_DATE = 'September 18, 2026';

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    paragraphs: [
      `By accessing and using the website at ${BRAND.website} (the "Site"), operated by CSI & Design ("we," "us," or "our"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations.`,
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
      'CSI & Design provides professional construction support services to contractors, architects, engineers, and developers across the United States. Our services include:',
    ],
    bullets: [
      'Construction cost estimating and quantity takeoffs across all CSI divisions',
      'Architectural drafting and construction documentation',
      'Civil and site planning support',
      'Engineering and technical documentation',
      'Metal fabrication and shop drawings',
      'Rehabilitation property acquisition and development support',
      'Pre-construction coordination and project support',
    ],
    subsections: [
      {
        title: 'Informational Purposes',
        paragraphs: [
          'All information presented on this Site is for general informational purposes only and does not constitute a binding offer, contract, or guarantee of services. Specific service agreements are governed by separate written contracts between CSI & Design and the client.',
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
      'Respect the intellectual property and proprietary rights of CSI & Design',
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
      'All content on this Site — including but not limited to text, graphics, logos, images, photographs, illustrations, software, and design elements — is the exclusive property of CSI & Design or its content suppliers and is protected by United States and international copyright, trademark, and intellectual property laws.',
      'Without prior written consent from CSI & Design, you may not:',
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
      'Our Site may contain links to third-party websites, resources, or services that are not owned, operated, or controlled by CSI & Design. These links are provided solely for your convenience and reference.',
      'CSI & Design does not endorse, guarantee, or assume responsibility for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that CSI & Design is not responsible or liable — directly or indirectly — for any damage or loss caused or alleged to be caused by or in connection with your use of or reliance on any third-party content, products, or services.',
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
      'This Site and its contents are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, CSI & Design disclaims all warranties, including but not limited to:',
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
          'Content on this Site is for informational purposes and does not constitute professional advice, a bid, or a guarantee of project outcomes. Formal engagements are governed by separate written agreements.',
        ],
      },
    ],
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by applicable law, CSI & Design, its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to:',
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
          'This limitation applies even if CSI & Design has been advised of the possibility of such damages. In jurisdictions that do not allow the exclusion or limitation of certain damages, our liability shall be limited to the greatest extent permitted by law.',
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
      'These Terms of Service are governed by and construed in accordance with the laws of ( ADD LOCATION ), without regard to its conflict of law provisions.',
      'Any disputes arising from or relating to these Terms or your use of the Site shall be resolved in the appropriate federal or state courts located in ( ADD LOCATION ). You consent to the personal jurisdiction and venue of such courts and waive any objections based on forum non conveniens.',
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
