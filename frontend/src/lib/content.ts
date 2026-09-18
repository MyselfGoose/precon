export const BRAND = {
  name: 'PreCon Ext',
  descriptor: 'Construction decisions, made clearer',
  description:
    'Preconstruction support built around clear scope, traceable quantities, and usable project documentation.',
  phone: '(800) 555-0100',
  email: 'hello@preconext.com',
  website: 'https://preconext.com',
};

export const SITE_COPY = {
  cta: {
    primary: 'Send your plans',
    secondary: 'Talk through your scope',
    reviewTrade: 'Review this trade',
    reviewService: 'Review this service',
  },
  process: {
    eyebrow: 'How it works',
    title: 'A disciplined path from project files to the next decision',
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
    details:
      'Every project is unique, and every trade comes with its own scope, materials, labor requirements, and construction methods. Our estimating team understands the importance of trade-specific expertise and prepares detailed quantity takeoffs and cost estimates tailored to each discipline. Whether you\'re a general contractor assembling a complete bid or a specialty subcontractor pricing a single scope of work, we provide accurate, organized, and reliable estimates that help you bid with confidence.',
    points: [
      'CSI MasterFormat-organized quantity takeoffs',
      'Trade-specific cost estimates with market intelligence',
      'Real-time material pricing and regional labor trends',
      'Professional bid proposals and editable workbooks',
    ],
    ctaTitle: 'Request your estimate',
    ctaText: 'Send your plans and tell us which trades or project type you need estimated.',
  },
  {
    slug: 'architectural-drawings',
    code: 'ARC',
    ico: 'draft',
    name: 'Architectural drawings',
    summary:
      'Code-conscious, buildable drawing packages coordinated with estimating so design, budget, and permitting stay aligned.',
    details:
      'Our architectural drawings are developed with careful consideration of applicable building codes, jurisdiction-specific regulations, and local permitting requirements, ensuring every design is tailored to the project\'s location and approval process. Working alongside our experienced construction estimators, our architectural team develops practical, buildable designs that reflect both the project\'s vision and its budget. Every layout, detail, and material selection is thoughtfully coordinated to simplify construction, minimize unnecessary revisions, and create a smoother path from design to completion.',
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
        items: ['Building Elevations', 'Exterior Finish Details', 'Door & Window Schedules', 'Building Sections'],
      },
      {
        title: 'Building Sections',
        items: ['Wall Sections', 'Stair Section'],
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
    whyUs: [
      'Bringing together architecture, estimating, and preconstruction expertise to deliver smarter, coordinated project solutions.',
      'Where Design Meets Construction Intelligence — our architectural team combines thoughtful design with practical construction expertise to deliver coordinated drawing packages that are functional, buildable, and tailored to your project\'s unique requirements.',
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
    details:
      'Our MEP drafting services deliver accurate, coordinated, and construction-ready Mechanical, Electrical, and Plumbing drawings for projects across the United States. From permit-ready documentation and multidisciplinary coordination to engineering calculations and energy compliance, we provide comprehensive solutions that support every stage of the construction process. Whether your project requires California Title 24 compliance, HVAC load calculations, electrical load analysis, plumbing calculations, or jurisdiction-specific code documentation, our team develops precise MEP packages tailored to local regulations and project requirements.',
    points: [
      'Permit-ready MEP documentation and trade coordination',
      'California Title 24 and energy compliance support',
      'HVAC, electrical, and plumbing engineering calculations',
      'Codes & standards aligned with IBC, NEC, IMC, IPC, ASHRAE, and ACCA',
    ],
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
          'Electrical system analysis ensures voltage remains within acceptable tolerances throughout distribution systems while maximizing operational efficiency.',
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
      'Successful MEP design depends on coordination. Our integrated Mechanical, Electrical, and Plumbing team works together under one roof to ensure every system is carefully coordinated before construction begins, minimizing clashes, reducing costly revisions, and improving installation efficiency on site.',
      'We take ownership of the coordination process, treating every project as our responsibility rather than simply delivering drawings. By proactively identifying conflicts, optimizing system layouts, and ensuring compliance with applicable codes and project requirements, we help contractors, developers, and engineers move confidently from permitting to construction.',
    ],
    ctaTitle: 'Discuss MEP drawings & engineering',
    ctaText: 'Share your project type, jurisdiction, and required calculations so we can define a coordinated MEP package.',
  },
  {
    slug: 'structural-engineering',
    code: 'STR',
    ico: 'takeoff',
    name: 'Structural drawings & engineering',
    summary:
      'Safe, efficient, and code-compliant structural solutions from concept development to permit-ready engineering documentation.',
    details:
      'Our structural engineering services combine innovative design with precise engineering calculations to deliver safe, efficient, and code-compliant structural solutions for projects across the United States. From concept development to permit-ready engineering documentation, we design structural systems that optimize performance, constructability, and material efficiency while meeting the highest industry standards. Whether your project involves reinforced concrete, structural steel, wood framing, cold-formed steel, masonry, post-tensioned concrete, precast concrete, or hybrid structural systems, our engineers develop tailored solutions based on project-specific loading conditions, site requirements, and applicable building codes.',
    points: [
      'Permit-ready structural plans, sections, and details',
      'Comprehensive structural analysis and engineering calculations',
      'Support for concrete, steel, wood, masonry, and hybrid systems',
      'Documentation aligned with IBC, IRC, ASCE 7, ACI, AISC, NDS, and TMS',
    ],
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
    slug: 'bim-visualization',
    code: 'BIM',
    ico: 'draft',
    name: '3D modeling, rendering & virtual walkthroughs',
    summary:
      'Photorealistic visualizations and immersive walkthroughs that help stakeholders experience a project before construction begins.',
    details:
      'Great design deserves to be understood before it is built. Our 3D modeling, rendering, and visualization services bridge the gap between technical drawings and reality, allowing clients, developers, architects, contractors, and investors to experience a project long before construction begins. Using industry-leading visualization technologies, we transform architectural concepts, engineering drawings, and BIM models into highly detailed, photorealistic representations that accurately showcase materials, lighting, textures, spatial relationships, and overall design intent.',
    points: [
      'Photorealistic renderings of interiors and exteriors',
      'Architectural walkthrough and flythrough animations',
      'BIM-based visualization for coordination and presentations',
      'Support for design reviews, investor presentations, and marketing',
    ],
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
    name: 'Acquisitions & investments',
    summary:
      'Turning property opportunities into real value — evaluating properties where renovation, design, and execution can unlock significant upside.',
    details:
      'We look at property differently. Every opportunity begins with understanding the property, the numbers, and the circumstances behind it. From there, our team evaluates the opportunity and determines whether there is a path forward that makes sense. For property owners, that means having the opportunity to explore a direct transaction based on the property\'s actual condition, potential, and underlying fundamentals. For us, it means identifying properties where thoughtful renovation, design, and execution can unlock significant value.',
    points: [
      'Understand the property first, then determine what makes sense',
      'Evaluate renovation needs, investment required, and finished-asset potential',
      'Acquisition structures built around the property\'s fundamentals',
      'Evaluate → Acquire → Design → Renovate → Create Value',
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

export const AUDIENCE_CONTENT = [
  {
    name: 'General contractors',
    code: 'GC',
    icon: 'gc',
    intro:
      'From quantity takeoffs and cost estimating to BIM coordination and construction documentation, we provide comprehensive preconstruction support that helps general contractors bid with confidence, reduce risk, and deliver successful projects—all through a single, trusted partner.',
    details:
      'Use organized takeoffs, visible pricing logic, and revision-ready documentation to decide which opportunities deserve a bid and carry the number into review.',
    items: ['Complete bid and scope support', 'Trade-by-trade quantities', 'Addenda and revision coordination', 'Editable, review-ready documentation'],
  },
  {
    name: 'Subcontractors',
    code: 'SUB',
    icon: 'sub',
    intro:
      'Behind every successful project is a skilled subcontractor whose work brings the vision to life. We understand the pressure of pricing projects accurately while balancing tight deadlines and competitive markets.',
    details:
      'Our team provides precise quantity takeoffs, trade-specific cost estimates, and dependable preconstruction support, giving you the confidence to bid smarter, protect your margins, and focus on what you do best—building with excellence.',
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
  lede: 'We believe preconstruction shouldn\'t be fragmented.',
  paragraphs: [
    'Contractors, developers, homeowners, and investors shouldn\'t have to coordinate multiple firms to move a project from concept to construction. Our mission is to bring every essential preconstruction service under one roof, creating a single, trusted partner for planning, estimating, design coordination, and construction documentation.',
    'From quantity takeoffs and cost estimating to BIM coordination, construction drawings, engineering support, and code-compliant documentation, we combine technical expertise with technology-driven workflows to help our clients make informed decisions with confidence.',
    'We are committed to raising the standard of preconstruction by replacing assumptions with data, improving collaboration through intelligent coordination, and delivering solutions that are accurate, reliable, and built around our clients\' success. Whether you\'re bidding your next project, evaluating a property acquisition, or preparing a development for construction, our goal is to provide the expertise, insight, and support you need all under one roof.',
  ],
  benefits: [
    [
      'TURNAROUND',
      'Faster Turnaround Time',
      'Well, other companies take a lot of unnecessary time while delivering the cost estimation. We complete the work on time and without errors.',
    ],
    [
      'ACCURACY',
      'Accuracy of Data',
      'We\'ll provide you with accurate data according to the instructions you give. We\'ll make sure that you don\'t have to rush after receiving the text.',
    ],
    [
      'BID EDGE',
      'Bidding Edge',
      'With our Market Analytical Proprietary Technology our estimates are powered with Market Trends — pushing the bid in the final rounds.',
    ],
    [
      'DEDICATED',
      'Dedicated Estimator',
      'For contractors and subcontractors to keep their operational cost to a minimum we offer a designated estimator, only allocated to your needs.',
    ],
    [
      'SUPPORT',
      '24/7 Support',
      'Once project files are shared with us — rest assured, it is as much our responsibility as it is yours.',
    ],
  ],
};

export const ACQUISITION_CONTENT = {
  eyebrow: 'Acquisitions & Investments',
  title: 'Turning Property Opportunities Into Real Value',
  lede: 'We look at property differently.',
  intro: [
    'Every opportunity begins with understanding the property, the numbers, and the circumstances behind it. From there, our team evaluates the opportunity and determines whether there is a path forward that makes sense.',
    'For property owners, that means having the opportunity to explore a direct transaction based on the property\'s actual condition, potential, and underlying fundamentals.',
    'For us, it means identifying properties where thoughtful renovation, design, and execution can unlock significant value.',
  ],
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
  title: 'Markets & Sectors',
  lede:
    'Our multidisciplinary expertise extends across a diverse range of industries and building sectors throughout the United States. Whether supporting a new development, renovation, expansion, or infrastructure project, we deliver coordinated preconstruction solutions tailored to the unique technical and operational requirements of each market.',
  coordinationTitle: 'Integrated Coordination Across Every Project',
  coordinationBody: [
    'Regardless of the market or project type, successful construction begins with coordinated planning. By bringing Architectural Design, Structural Engineering, MEP Engineering, and Construction Estimating together under one roof, we create fully integrated preconstruction solutions that reduce coordination gaps, minimize costly design conflicts, and streamline project delivery.',
    'Our multidisciplinary teams collaborate throughout the design process, ensuring that every structural member, mechanical system, electrical layout, plumbing network, and architectural element works together seamlessly. This coordinated approach significantly reduces the margin for error, improves constructability, shortens review cycles, and helps projects move more efficiently from concept to construction.',
    'Cost is considered from the very beginning—not after the design is complete. By integrating our estimating professionals into the design process, we continuously evaluate material quantities, construction methods, and project costs to help develop practical, buildable solutions that align with the client\'s budget while maintaining quality, performance, and code compliance.',
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
      'PreCon Ext ("we," "us," or "our") is committed to protecting your privacy and handling your personal data with transparency. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at preconext.com (the "Site") or engage with our professional construction support services.',
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
      'Our Site may contain links to third-party websites, applications, or services that are not owned or controlled by PreCon Ext. These links are provided for your convenience and informational purposes.',
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
      `By accessing and using the website at ${BRAND.website} (the "Site"), operated by PreCon Ext ("we," "us," or "our"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations.`,
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
      'PreCon Ext provides professional construction support services to contractors, architects, engineers, and developers across the United States. Our services include:',
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
          'All information presented on this Site is for general informational purposes only and does not constitute a binding offer, contract, or guarantee of services. Specific service agreements are governed by separate written contracts between PreCon Ext and the client.',
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
      'Respect the intellectual property and proprietary rights of PreCon Ext',
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
      'All content on this Site — including but not limited to text, graphics, logos, images, photographs, illustrations, software, and design elements — is the exclusive property of PreCon Ext or its content suppliers and is protected by United States and international copyright, trademark, and intellectual property laws.',
      'Without prior written consent from PreCon Ext, you may not:',
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
      'Our Site may contain links to third-party websites, resources, or services that are not owned, operated, or controlled by PreCon Ext. These links are provided solely for your convenience and reference.',
      'PreCon Ext does not endorse, guarantee, or assume responsibility for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that PreCon Ext is not responsible or liable — directly or indirectly — for any damage or loss caused or alleged to be caused by or in connection with your use of or reliance on any third-party content, products, or services.',
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
      'This Site and its contents are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, PreCon Ext disclaims all warranties, including but not limited to:',
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
      'To the fullest extent permitted by applicable law, PreCon Ext, its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to:',
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
          'This limitation applies even if PreCon Ext has been advised of the possibility of such damages. In jurisdictions that do not allow the exclusion or limitation of certain damages, our liability shall be limited to the greatest extent permitted by law.',
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
