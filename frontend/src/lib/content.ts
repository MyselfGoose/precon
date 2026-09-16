export const BRAND = {
  name: 'PreCon Ext',
  descriptor: 'Construction decisions, made clearer',
  description:
    'Preconstruction support built around clear scope, traceable quantities, and usable project documentation.',
  phone: '(800) 555-0100',
  email: 'Project conversations start with a useful brief',
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
};

export const CONTENT_SERVICES: ContentService[] = [
  {
    slug: 'estimating',
    code: 'EST',
    ico: 'estimate',
    name: 'Estimating & quantity takeoffs',
    summary: 'Traceable quantities, transparent assumptions, and editable bid workbooks that make pricing easier to review and defend.',
    details:
      'We turn plan sets and specifications into a structured estimate your team can review, adjust, and carry into a real bid conversation. Quantities, pricing categories, assumptions, and exclusions stay visible rather than buried in a single number.',
    points: ['Trade- and CSI-organized quantity takeoffs', 'Material, labor, equipment, and allowance structure', 'Sheet references, assumptions, and exclusions', 'Editable workbooks for commercial, residential, industrial, and public work'],
  },
  {
    slug: 'architectural-drawings',
    code: 'ARC',
    ico: 'draft',
    name: 'Architectural drawings',
    summary: 'Coordinated drawing packages that communicate scope clearly for review, permitting, pricing, and construction.',
    details:
      'Our architectural support covers the drawings and schedules needed to communicate a buildable project clearly, from planning and layouts through details, code analysis, and specifications.',
    points: ['Site, floor, roof, and reflected ceiling plans', 'Elevations, sections, details, and schedules', 'Accessibility, life safety, and egress documentation', 'Material, finish, and general architectural notes'],
  },
  {
    slug: 'mep-engineering',
    code: 'MEP',
    ico: 'precon',
    name: 'MEP drafting & engineering',
    summary: 'Coordinated mechanical, electrical, and plumbing documentation that clarifies systems, scope, and review requirements.',
    details:
      'We support MEP design documentation and calculations with coordinated drawings that help reduce clashes, clarify scope, and move projects toward approval and construction.',
    points: ['Mechanical, electrical, and plumbing plans', 'HVAC load and system documentation', 'Electrical load, voltage drop, and coordination studies', 'Plumbing fixture units, drainage, ventilation, and energy support'],
  },
  {
    slug: 'structural-engineering',
    code: 'STR',
    ico: 'takeoff',
    name: 'Structural drawings & engineering',
    summary: 'Structural documentation coordinated with the architectural set and the practical needs of pricing and construction.',
    details:
      'Our structural support addresses concrete, steel, masonry, wood framing, foundations, and related systems with practical coordination for the field and estimating team.',
    points: ['Structural plans, sections, and details', 'Concrete, steel, masonry, and wood systems', 'Foundation and framing documentation', 'Coordination with architectural and MEP packages'],
  },
  {
    slug: 'bim-visualization',
    code: 'BIM',
    ico: 'draft',
    name: 'BIM, 3D modeling & visualization',
    summary: 'Models, renderings, and walkthroughs that make design intent, coordination, and constructability easier to review.',
    details:
      'Three-dimensional coordination and visualization help owners, designers, and contractors evaluate decisions before they become expensive field changes.',
    points: ['3D building and system modeling', 'Coordination support and clash review', 'Renderings and presentation views', 'Walkthroughs for design and stakeholder review'],
  },
  {
    slug: 'acquisitions-investments',
    code: 'INV',
    ico: 'bid',
    name: 'Acquisitions & investment analysis',
    summary: 'Property and renovation analysis that helps owners and investors understand scope, cost, and execution risk before committing.',
    details:
      'We evaluate a property’s condition, improvement requirements, investment needs, and potential before determining whether an acquisition structure makes sense.',
    points: ['Property and opportunity evaluation', 'Renovation scope and cost analysis', 'Acquisition structure support', 'Evaluate → Acquire → Design → Renovate → Create Value'],
  },
];

export const AUDIENCE_CONTENT = [
  { name: 'General contractors', code: 'GC', icon: 'gc', intro: 'Add estimating capacity without adding another permanent overhead line.', details: 'Use organized takeoffs, visible pricing logic, and revision-ready documentation to decide which opportunities deserve a bid and carry the number into review.', items: ['Complete bid and scope support', 'Trade-by-trade quantities', 'Addenda and revision coordination', 'Editable, review-ready documentation'] },
  { name: 'Subcontractors', code: 'SUB', icon: 'sub', intro: 'Get a trade-specific quantity and pricing basis your team can use under a real bid deadline.', details: 'Protect margin by separating quantities, labor, material, and scope questions before they become missed items or last-minute allowances.', items: ['Single-trade takeoffs', 'Labor and material breakdowns', 'Scope clarifications and exclusions', 'Bid-ready trade support'] },
  { name: 'Heavy civil & infrastructure', code: 'CIV', icon: 'precon', intro: 'Organize complex civil scopes for tenders, budgets, and execution planning.', details: 'Keep quantities, units, alternates, and assumptions legible across roads, utilities, airports, bridges, and public work.', items: ['Roads and bridges', 'Utilities and public works', 'Excavation and sitework', 'Tender and addenda support'] },
  { name: 'Architects, owners & developers', code: 'AOD', icon: 'arch', intro: 'Connect design intent to a practical scope, cost, and construction path.', details: 'Use early estimates, coordinated drawings, engineering support, and visualization to make decisions before they become expensive changes.', items: ['Concept and feasibility budgets', 'Drawing and code coordination', 'Value-focused design review', 'Development and renovation planning'] },
  { name: 'MEP, structural & specialty teams', code: 'TECH', icon: 'draft', intro: 'Bring discipline-specific clarity to technical documentation, coordination, and pricing.', details: 'Support complex systems with the calculations, drawings, takeoffs, and scope documentation other project teams need to review your work.', items: ['MEP documentation', 'Structural systems', 'HVAC and energy support', 'Trade-specific estimates'] },
];

export const TRADE_CONTENT = [
  'General construction', 'Remodeling', 'Restoration', 'Marine work', 'Glazing', 'Paving', 'Roofing', 'Metal framing',
  'Government infrastructure', 'HVAC', 'MEP', 'Ceiling and drywall', 'Excavation', 'Insulation', 'Demolition', 'Structural',
  'Landscaping', 'Bridge work', 'Airport construction', 'Roads and public tenders', 'Flooring', 'Bath and tile', 'Lumber and woodwork', 'Fencing',
];

export const ABOUT_CONTENT = {
  lede: 'Preconstruction decisions are stronger when the scope, quantities, and documentation agree.',
  paragraphs: [
    'Contractors, developers, owners, and project teams often have to make a high-consequence decision with incomplete drawings, compressed deadlines, or disconnected consultants. We provide focused estimating, documentation, and coordination support around the information you actually have.',
    'From quantity takeoffs and cost estimating to BIM coordination, construction drawings, engineering support, and code-conscious documentation, we keep the work practical: clear scope, traceable quantities, stated assumptions, and files your team can review and use.',
    'Our standard is simple: make the basis visible, separate what is known from what is assumed, and deliver documentation that helps the next person make a better decision.',
  ],
  benefits: [
    ['CLEAR BASIS', 'A number you can review', 'Quantities, rates, assumptions, and exclusions are separated so your team can challenge or update the basis without starting over.'],
    ['USEFUL FILES', 'Deliverables built for handoff', 'Workbooks, summaries, drawings, and coordination notes are organized for the people who need to review or act on them next.'],
    ['BID CONFIDENCE', 'Fewer unknowns at bid time', 'A disciplined scope review surfaces gaps, alternates, and open questions before they become avoidable risk.'],
    ['DIRECT SUPPORT', 'One accountable conversation', 'A clear point of contact keeps scope questions, revisions, and decisions from being scattered across vendors.'],
    ['PRACTICAL SCOPE', 'Support that fits the decision', 'We define the useful deliverable before work begins instead of selling a larger package than the project needs.'],
  ],
};

export const ACQUISITION_STEPS = ['Evaluate', 'Acquire', 'Design', 'Renovate', 'Create Value'];

export const PRIVACY_SECTIONS: [string, string][] = [
  ['1. Introduction', 'PreCon Ext (\"we,\" \"us,\" or \"our\") is committed to protecting your privacy and handling personal data transparently. This policy explains how we collect, use, disclose, and safeguard information when you visit this website or engage with our professional construction support services.'],
  ['2. Information We Collect', 'We may receive information you provide through email, phone conversations, project communications, and the project brief form. The current browser-only form prepares the information locally and does not send a message or upload files. If you contact us through another channel, this can include your name, email address, phone number, company, project details, service needs, and budget information. We may also collect standard device and usage information such as IP address, browser, operating system, referring URL, pages viewed, access times, and session duration.'],
  ['3. How We Use Information', 'We use information to respond to inquiries, provide drawings, estimates, bid proposals, and consultations, communicate about active projects, improve website performance and content, understand usage patterns, and send relevant service or project updates where permitted. Information entered into the current project brief form remains in your browser unless you separately share it with us.'],
  ['4. Cookies and Tracking', 'We may use cookies and similar technologies to keep the Site working, understand traffic, remember preferences, and improve the user experience. You can adjust cookie controls through your browser settings, although some Site features may be affected.'],
  ['5. Analytics and Third Parties', 'We may use analytics and service providers that process information on our behalf. Those providers may receive limited technical or usage data needed to provide their services and must handle it according to their applicable terms and obligations.'],
  ['6. Sharing and Disclosure', 'We do not sell your personal information. We may share information with service providers, professional advisers, authorities when legally required, or a successor involved in a business transaction. We disclose only what is reasonably necessary for the relevant purpose.'],
  ['7. Data Retention', 'We retain information for as long as needed to provide services, communicate with you, satisfy legal and accounting obligations, resolve disputes, and enforce agreements. Retention periods vary by the type and purpose of the information.'],
  ['8. Your Rights and Choices', 'Depending on where you live, you may have rights to request access, correction, deletion, portability, restriction of processing, or information about how data is used. You may also opt out of marketing communications at any time. Contact us using the details published on this Site to make a request.'],
  ['9. Security', 'We use reasonable administrative, technical, and organizational safeguards designed to protect information. No internet transmission or storage system can be guaranteed completely secure, so please avoid sending information that is not needed for your request.'],
  ['10. Marketing Communications', 'You may unsubscribe from marketing messages using the link or instructions in the message. Service-related communications may still be sent when necessary to respond to a request or manage an engagement.'],
  ['11. Children’s Privacy', 'This Site is not directed to children and we do not knowingly collect personal information from children.'],
  ['12. Policy Changes', 'We may update this policy as our practices or legal obligations change. The updated version will be posted on this page with a revised effective date.'],
  ['13. Contact', 'For privacy questions or requests, use the project request form to share your name and contact details. We will use that information only to respond to your request and manage the conversation that follows.'],
];

export const TERMS_SECTIONS: [string, string][] = [
  ['1. Acceptance of Terms', 'By accessing and using this website, you acknowledge that you have read, understood, and agree to these Terms of Service and applicable laws. If you do not agree, do not use the Site.'],
  ['2. Services Overview', 'PreCon Ext provides professional construction support for contractors, architects, engineers, developers, owners, and related project teams. Services may include cost estimating and quantity takeoffs across CSI divisions, architectural drafting, civil and site planning support, engineering and technical documentation, metal fabrication and shop drawings, rehabilitation property acquisition support, and preconstruction coordination. Formal service engagements are governed by separate written agreements.'],
  ['3. Informational Purposes', 'Information on this Site is general information and is not a binding offer, contract, or guarantee of services, pricing, schedule, approval, or project outcome.'],
  ['4. User Responsibilities', 'Provide accurate information, use the Site lawfully, respect proprietary rights, and do not misrepresent your identity or affiliation when contacting us.'],
  ['5. Prohibited Activities', 'Do not attempt unauthorized access, scrape or extract Site content without written permission, transmit harmful or defamatory material, disrupt the Site or its infrastructure, interfere with another user, or violate applicable law.'],
  ['6. Intellectual Property', 'Text, graphics, logos, illustrations, software, and design elements on this Site belong to PreCon Ext or its content suppliers and are protected by intellectual-property laws. You may view the Site for personal, non-commercial informational purposes, but may not reproduce, distribute, modify, or commercially reuse content without written permission.'],
  ['7. Third-Party Links', 'The Site may reference third-party websites or services. PreCon Ext is not responsible for their content, availability, privacy practices, or terms.'],
  ['8. Service Availability', 'We may change, suspend, or discontinue Site content or features without notice. We do not guarantee that the Site will always be available, complete, current, or free from errors.'],
  ['9. Disclaimer of Warranties', 'The Site and its content are provided on an “as available” basis without warranties of any kind, express or implied, to the fullest extent permitted by law.'],
  ['10. Limitation of Liability', 'To the fullest extent permitted by law, PreCon Ext is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the Site or reliance on its content.'],
  ['11. Termination and Changes', 'We may restrict or terminate access when appropriate. We may update these Terms from time to time; continued use after publication of changes constitutes acceptance.'],
  ['12. Governing Law and Contact', 'These Terms are governed by applicable law in the jurisdiction identified in the final published agreement. Questions about these Terms should be directed to PreCon Ext using the contact information published on this Site.'],
];
