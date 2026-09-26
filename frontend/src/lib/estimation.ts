export type EstimationCategory = {
  name: string;
  description: string;
};

export type EstimationHub = {
  slug: string;
  code: string;
  name: string;
  lede: string;
  intro: string[];
  categories?: EstimationCategory[];
  whyUs?: string;
};

export type TradeEstimationPage = {
  slug: string;
  name: string;
  headline: string;
  lede: string;
  intro: string[];
  whatWeEstimate: string[];
  whatsIncluded: string[];
  whyUs: string;
  ctaTitle: string;
  ctaText: string;
  /** Matching MasterFormat division slug from `TRADES` when a sample workbook is appropriate. */
  sampleDivisionSlug?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Optional short hero headline; falls back to `name`. */
  heroHeadline?: string;
};

/** Featured trades shown under the General Construction hub intro. */
export const GC_FEATURED_TRADES: { slug: string; name: string; blurb: string }[] = [
  {
    slug: 'remodeling',
    name: 'Remodeling',
    blurb: 'Tenant improvements, residential remodels, commercial renovations, and adaptive reuse.',
  },
  {
    slug: 'new-construction',
    name: 'New Construction',
    blurb: 'Ground-up residential and commercial packages with full trade coordination from foundation to finish.',
  },
  {
    slug: 'demolition',
    name: 'Demolition',
    blurb: 'Selective and structural demolition scopes tied to renovation and new-build sequences.',
  },
  {
    slug: 'adu',
    name: 'ADUs & Accessory Dwellings',
    blurb: 'Detached and attached ADU estimating with compact foundation, framing, MEP, and finish packages.',
  },
  {
    slug: 'restoration',
    name: 'Restoration',
    blurb: 'Fire, water, and historic restoration estimates grounded in existing conditions.',
  },
  {
    slug: 'concrete',
    name: 'Concrete',
    blurb: 'Foundations, slabs, and structural concrete quantities for GC packages.',
  },
  {
    slug: 'structural',
    name: 'Structural',
    blurb: 'Steel, concrete, and wood structural takeoffs coordinated into the GC bid.',
  },
  {
    slug: 'sitework-earthwork',
    name: 'Sitework & Earthwork',
    blurb: 'Grading, excavation, and site utilities that set the stage for vertical construction.',
  },
];

export function categoryHubHref(categoryName: string): string | undefined {
  const map: Record<string, string> = {
    'Commercial Projects': '/estimation/commercial',
    'Residential Projects': '/estimation/residential',
    'Industrial Projects': '/estimation/industrial',
  };
  return map[categoryName];
}

export const ESTIMATION_HUBS: EstimationHub[] = [
  {
    slug: 'general-construction',
    code: 'GC',
    name: 'General Construction',
    lede:
      'We help General Contractors win more work with accurate quantity takeoffs, real-time pricing, and professionally prepared bid proposals.',
    intro: [
      'Backed by market intelligence enhanced by our proprietary data analytics platform and regional cost analysis, our estimates reflect local labor conditions, material pricing trends, subcontractor availability, and current bidding activity in your market. The result is clear, competitive, and well-structured bids that give you the confidence to pursue more projects while protecting your margins and profitability.',
    ],
    categories: [
      {
        name: 'Commercial Projects',
        description:
          'Our commercial estimating services are designed to help General Contractors win more bids with confidence. We combine accurate quantity takeoffs, professional bid proposals, and real-time market analysis to deliver competitive pricing that aligns with current labor and material trends while protecting profitability. Prepared in CSI Format and coordinated by trade, every estimate supports a smoother bidding process, stronger subcontractor coverage, reduced risk, and a better chance of securing commercial projects.',
      },
      {
        name: 'Residential Projects',
        description:
          'From custom homes to multi-family developments, our residential estimates provide accurate quantity takeoffs and market-driven pricing to help contractors build competitive, profitable bids. Organized in CSI Format, every estimate ensures clear trade coordination, accuracy, and confidence from planning through construction.',
      },
      {
        name: 'Industrial Projects',
        description:
          'Our industrial estimates combine detailed quantity takeoffs with real-time market pricing enhanced by our proprietary data analytics platform to help contractors bid confidently on manufacturing facilities, warehouses, processing plants, distribution centers, and other industrial developments. Prepared in CSI Format, every estimate is organized by trade with accurate material, labor, and equipment costs, enabling better cost control, reduced risk, and improved project profitability.',
      },
    ],
  },
  {
    slug: 'commercial',
    code: 'COM',
    name: 'Commercial Projects',
    lede:
      'CSI Format commercial estimating for offices, retail, hospitality, mixed-use, and tenant improvement work. Built for general contractors who need trade-coordinated bids.',
    intro: [
      'Our commercial estimating services are designed to help General Contractors win more bids with confidence. We combine accurate quantity takeoffs, professional bid proposals, and real-time market analysis to deliver competitive pricing that aligns with current labor and material trends while protecting profitability. Prepared in CSI Format and coordinated by trade, every estimate supports a smoother bidding process, stronger subcontractor coverage, reduced risk, and a better chance of securing commercial projects.',
    ],
    categories: [
      {
        name: 'Office & Corporate Buildings',
        description:
          'Core and shell, tenant demising, lobby upgrades, and floor build-outs with coordinated architectural, structural, and MEP takeoffs.',
      },
      {
        name: 'Retail & Mixed-Use',
        description:
          'Storefront packages, mall and strip-center fit-outs, restaurant build-outs, and mixed-use podium estimating with clear trade splits.',
      },
      {
        name: 'Hospitality & Lodging',
        description:
          'Hotels, motels, and short-stay facilities with guest-room typicals, FF&E-adjacent scopes, and back-of-house MEP coordination.',
      },
      {
        name: 'Tenant Improvements',
        description:
          'Occupied-building renovations, suite turnovers, and phased TI packages that account for existing conditions and after-hours productivity.',
      },
      {
        name: 'Healthcare & Medical Office',
        description:
          'Outpatient clinics, medical office buildings, and specialty suites requiring durable finishes and coordinated specialty systems.',
      },
      {
        name: 'Education & Institutional Commercial',
        description:
          'Private schools, training centers, and institutional commercial builds with phased occupancy and durable finish packages.',
      },
    ],
  },
  {
    slug: 'residential',
    code: 'RES',
    name: 'Residential Projects',
    lede:
      'CSI Format residential estimates for custom homes through multi-family developments, with market-driven pricing and clear trade coordination.',
    intro: [
      'From custom homes to multi-family developments, our residential estimates provide accurate quantity takeoffs and market-driven pricing to help contractors build competitive, profitable bids. Organized in CSI Format, every estimate ensures clear trade coordination, accuracy, and confidence from planning through construction.',
    ],
    categories: [
      {
        name: 'Custom Homes',
        description:
          'Single-family custom estates and high-end residences with detailed finish packages, specialty millwork, and sitework coordination.',
      },
      {
        name: 'Production & Spec Homes',
        description:
          'Repeated plan sets and option packages organized so production builders can price models, elevations, and option adders consistently.',
      },
      {
        name: 'Multi-Family & Apartments',
        description:
          'Garden-style, mid-rise, and podium multi-family with unit typicals, common areas, and structured parking takeoffs.',
      },
      {
        name: 'Townhomes & Condos',
        description:
          'Attached residential product with shared party walls, roof assemblies, and HOA-driven finish standards.',
      },
      {
        name: 'ADUs & Accessory Dwellings',
        description:
          'Detached and attached accessory dwelling units with foundation, framing, MEP, and finish scopes sized for smaller footprints.',
      },
      {
        name: 'Residential Renovations & Additions',
        description:
          'Whole-home remodels, room additions, and kitchen/bath packages that account for demolition and existing conditions.',
      },
    ],
  },
  {
    slug: 'industrial',
    code: 'IND',
    name: 'Industrial Projects',
    lede:
      'Detailed industrial estimating for manufacturing, logistics, processing, and specialty facilities, organized by trade in CSI Format.',
    intro: [
      'Our industrial estimates combine detailed quantity takeoffs with real-time market pricing enhanced by our proprietary data analytics platform to help contractors bid confidently on manufacturing facilities, warehouses, processing plants, distribution centers, and other industrial developments. Prepared in CSI Format, every estimate is organized by trade with accurate material, labor, and equipment costs, enabling better cost control, reduced risk, and improved project profitability.',
    ],
    categories: [
      {
        name: 'Manufacturing Facilities',
        description:
          'Production lines, heavy machinery foundations, utility systems, ventilation, and workflow optimization are critical to support efficient manufacturing operations.',
      },
      {
        name: 'Warehouses & Distribution Centers',
        description:
          'Large clear-span structures, loading docks, racking systems, concrete slabs, and truck circulation are key considerations for high-volume storage and logistics.',
      },
      {
        name: 'Processing Plants',
        description:
          'Complex piping, process equipment, structural steel, instrumentation, and mechanical systems require precise coordination across multiple trades.',
      },
      {
        name: 'Food & Beverage Facilities',
        description:
          'Sanitary construction, food-grade finishes, temperature-controlled environments, drainage systems, and strict health code compliance are essential.',
      },
      {
        name: 'Pharmaceutical Plants',
        description:
          'Cleanrooms, contamination control, HVAC filtration, specialized utility systems, and regulatory compliance drive design and construction requirements.',
      },
      {
        name: 'Chemical & Petrochemical Facilities',
        description:
          'Hazardous material handling, corrosion-resistant materials, pressure piping, fire protection, and explosion-resistant construction are major priorities.',
      },
      {
        name: 'Oil & Gas Infrastructure',
        description:
          'Storage tanks, process piping, pumping stations, structural steel, safety systems, and environmental compliance are central to these facilities.',
      },
      {
        name: 'Power Generation Facilities',
        description:
          'Equipment foundations, turbine installations, electrical distribution, cooling systems, and high-capacity structural components require accurate planning.',
      },
      {
        name: 'Water & Wastewater Treatment Plants',
        description:
          'Concrete tanks, pumping stations, filtration systems, underground utilities, process piping, and corrosion-resistant materials are key cost drivers.',
      },
      {
        name: 'Logistics & Fulfillment Centers',
        description:
          'High-bay storage, automated conveyor systems, loading infrastructure, electrical distribution, and durable flooring support efficient operations.',
      },
      {
        name: 'Cold Storage Facilities',
        description:
          'Insulated wall panels, vapor barriers, refrigeration systems, specialized flooring, and energy-efficient building envelopes are critical for temperature control.',
      },
      {
        name: 'Mining & Industrial Processing Facilities',
        description:
          'Heavy equipment foundations, conveyors, crushers, structural steel, dust control systems, and material handling infrastructure require robust construction planning.',
      },
    ],
  },
  {
    slug: 'public-projects',
    code: 'PUB',
    name: 'Public Projects',
    lede:
      'Estimating for the demands of government and municipal bidding: CSI Format estimates, compliant bid proposals, and proprietary market intelligence.',
    intro: [
      'Our public project estimating services are designed for the demands of government and municipal bidding. We deliver accurate quantity takeoffs, CSI Format estimates, and compliant bid proposals enhanced by our proprietary data analytics platform. By applying lessons from past projects, including equity considerations, scope trends, and historical cost patterns, we help contractors submit competitive bids that win work while protecting profit and long-term margins.',
    ],
    categories: [
      {
        name: 'Roads & Highways',
        description:
          'Estimating for roads, highways, and interchanges requires careful consideration of earthwork, paving, drainage, traffic control, utility coordination, and local market pricing to ensure competitive, profitable bids.',
      },
      {
        name: 'Bridges',
        description:
          'Bridge estimates account for structural steel, reinforced concrete, deep foundations, falsework, specialty equipment, erection sequencing, and project-specific engineering complexities.',
      },
      {
        name: 'Aviation Infrastructure',
        description:
          'Airport projects demand coordinated estimating for runways, taxiways, terminals, airside utilities, security requirements, phasing, and uninterrupted operational access.',
      },
      {
        name: 'Marine & Port Facilities',
        description:
          'Marine estimates consider tidal conditions, cofferdams, dredging, corrosion-resistant materials, marine equipment, environmental regulations, and specialized construction methods.',
      },
      {
        name: 'Rail & Transit',
        description:
          'Rail projects require estimating for track systems, signaling, platforms, utilities, traffic management, phased construction, and strict operational coordination.',
      },
      {
        name: 'Water & Wastewater',
        description:
          'Treatment facilities require detailed estimates for process equipment, underground utilities, piping networks, structural concrete, mechanical systems, and regulatory compliance.',
      },
      {
        name: 'Utility Infrastructure',
        description:
          'Utility projects involve underground coordination, excavation, backfill, trench safety, restoration, utility conflicts, and local labor and material pricing.',
      },
      {
        name: 'Dams & Flood Control',
        description:
          'Estimating considers earthworks, hydraulic structures, reinforced concrete, erosion control, environmental mitigation, and long-term infrastructure performance.',
      },
      {
        name: 'Tunnels',
        description:
          'Tunnel construction requires analysis of excavation methods, ground conditions, shoring systems, ventilation, waterproofing, specialty equipment, and sequencing.',
      },
      {
        name: 'Municipal Buildings',
        description:
          'Government facilities require coordinated estimates covering architectural finishes, structural systems, MEP trades, code compliance, accessibility, and public procurement standards.',
      },
      {
        name: 'Educational Facilities',
        description:
          'School and university projects require phased construction planning, occupied-campus coordination, life safety compliance, durable finishes, and budget-conscious estimating.',
      },
      {
        name: 'Healthcare Facilities',
        description:
          'Healthcare estimates account for complex MEP systems, medical equipment coordination, infection control measures, regulatory compliance, and uninterrupted facility operations.',
      },
      {
        name: 'Military & Defense',
        description:
          'Defense projects demand detailed estimating for secure facilities, hardened structures, specialized systems, restricted access, and stringent government specifications.',
      },
      {
        name: 'Correctional Facilities',
        description:
          'Correctional facilities require secure construction detailing, reinforced assemblies, controlled access systems, specialized hardware, and code-compliant life safety provisions.',
      },
      {
        name: 'Parks & Recreation',
        description:
          'Recreational projects include estimating for grading, landscaping, sports facilities, playgrounds, site amenities, irrigation systems, and public accessibility requirements.',
      },
      {
        name: 'Fire Stations & Emergency Services',
        description:
          'Fire stations and EMS facilities require estimating for apparatus bays, emergency response systems, specialized MEP infrastructure, training spaces, and resilient building design.',
      },
      {
        name: 'Police & Public Safety Facilities',
        description:
          'Police stations, public safety buildings, and dispatch centers require secure construction, detention areas, evidence storage, access control, and advanced communication systems.',
      },
      {
        name: 'Courthouses & Judicial Facilities',
        description:
          'Judicial buildings require estimates for secure circulation, courtroom fit-outs, detention areas, security infrastructure, and high-performance building systems.',
      },
    ],
    whyUs:
      'Public work demands precision, and we deliver it through CSI Format-compliant estimates, professional bid proposals, enhanced by our proprietary data analytics platform, and advanced BIM estimating that minimizes errors through enhanced quantity accuracy, coordination, and scope clarity. By analyzing historical project data alongside current market conditions, we develop the most competitive solution for every bid, helping you win public contracts with confidence while protecting your profitability.',
  },
  {
    slug: 'trades',
    code: 'TRD',
    name: 'Trade Contractors',
    lede:
      'Every successful project is built by skilled subcontractors. Winning work starts with accurate pricing and the confidence to submit competitive bids.',
    intro: [
      'Every successful project is built by skilled subcontractors. Whether you\'re an electrical contractor, HVAC contractor, concrete contractor, roofer, or painter, winning work starts with accurate pricing and the confidence to submit competitive bids.',
      'We provide detailed quantity takeoffs, trade-specific estimates, and market-driven pricing that help subcontractors bid faster, protect their margins, and secure more profitable work. Every estimate is prepared in CSI Format, giving you a clear scope that integrates seamlessly into any General Contractor\'s bid package.',
      'Every estimate is enhanced by our proprietary data analytics platform, combining real-time supplier pricing, regional labor trends, historical project data, and market intelligence. The result is a bid package that helps you price competitively, protect your margins, and win more work with confidence.',
    ],
    whyUs:
      'Estimating isn\'t just about quantities — it\'s about intelligence. Our proprietary data analytics platform combines nearly a decade of historical project data with real-time material pricing, regional labor costs, and market trends to produce CSI MasterFormat-compliant estimates that go beyond the numbers. Every takeoff is built to help trade contractors price competitively, protect their margins, and bid with confidence. By combining data-driven insights with fast turnaround times and uncompromising accuracy, we don\'t just help you win more work, we help you win the right work at the right price. So the better question isn\'t "Why us?" it\'s "Why not us?"',
  },
];

export const TRADE_ESTIMATION_PAGES: TradeEstimationPage[] = [
  {
    slug: 'remodeling',
    name: 'Remodeling Estimation Services',
    headline: 'Build Smarter. Renovate with Confidence.',
    heroHeadline: 'Renovate with Real Numbers',
    lede:
      'Whether you\'re pricing a tenant improvement, commercial renovation, residential remodel, or adaptive reuse project, our remodeling estimating services provide the accuracy and market intelligence needed to bid competitively without sacrificing profitability.',
    intro: [
      'Every estimate is prepared in CSI Format and powered by our proprietary data analytics platform, combining real-time material pricing, regional labor trends, historical project data, and market analysis to deliver reliable, bid-ready estimates.',
    ],
    whatWeEstimate: [
      'Tenant Improvements (TI)',
      'Residential Remodeling',
      'Commercial Renovations',
      'Interior Fit-Outs',
      'Kitchen & Bathroom Remodeling',
      'Adaptive Reuse Projects',
      'Building Additions',
      'Historic Renovations',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Scope Review & Clarifications',
      'Professional Bid Proposals',
      'Value Engineering Support',
      'BIM Estimating',
    ],
    whyUs:
      'Remodeling projects present unique challenges — from unforeseen existing conditions to evolving scopes and tight schedules. Our estimators account for demolition, structural modifications, material upgrades, code compliance, and labor productivity to deliver estimates that are both competitive and dependable. By combining nearly a decade of historical pricing data with live market intelligence, we help contractors reduce uncertainty, protect profit margins, and submit bids with confidence. Whether you\'re remodeling a single space or renovating an entire facility, we become an extension of your preconstruction team — delivering the speed, consistency, and accuracy needed to win more work.',
    ctaTitle: 'Request Your Remodeling Estimate',
    ctaText:
      'Partner with a team that delivers more than just numbers. Get accurate takeoffs, data-driven pricing, and professional bid proposals that help you bid smarter and build more profitably.',
  },
  {
    slug: 'new-construction',
    name: 'New Construction Estimation Services',
    headline: 'Ground-Up Estimates Built for Competitive GC Bids.',
    heroHeadline: 'Ground-Up Estimates That Win',
    lede:
      'New construction estimating for residential and commercial projects. CSI Format takeoffs, real-time pricing, and trade-coordinated bid packages from foundation through finishes.',
    intro: [
      'Custom homes, multi-family buildings, and commercial ground-up projects each require organized quantity takeoffs and cost estimates that reflect current material pricing, regional labor, and the full scope of work. We prepare them to build right the first time.',
    ],
    whatWeEstimate: [
      'Sitework and foundations for new builds',
      'Structural framing and shell packages',
      'Envelope, roofing, and exterior finishes',
      'MEP rough-in and finish systems',
      'Interior finishes and specialty packages',
      'Site utilities and hardscape (as shown)',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating (When Required)',
    ],
    whyUs:
      'New construction wins when quantities and pricing stay aligned with the market. We deliver CSI Format packages that help general contractors pursue ground-up work with confidence.',
    ctaTitle: 'Request Your New Construction Estimate',
    ctaText: 'Share the working set and bid date. We will define a clear new-construction estimating scope.',
  },
  {
    slug: 'adu',
    name: 'ADU Estimation Services',
    headline: 'Accessory Dwelling Estimates That Fit the Lot.',
    lede:
      'ADU and accessory dwelling estimating for detached studios, garage conversions, and attached units. Accurate quantities for compact footprints and full MEP packages.',
    intro: [
      'Accessory dwelling units demand careful takeoffs for foundations, framing, envelope, and complete living systems in a smaller footprint. We prepare CSI Format estimates that help contractors price ADUs competitively without missing critical scope.',
    ],
    whatWeEstimate: [
      'Detached ADU structures',
      'Garage and basement conversions',
      'Attached accessory units and junior ADUs',
      'Foundation and slab packages',
      'Framing, envelope, and roofing',
      'MEP systems sized for accessory dwellings',
      'Interior finishes and site connections',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
    ],
    whyUs:
      'ADU bids fail when compact scopes are under-measured. We deliver clear, complete estimates so accessory dwelling projects bid profitably and permit-ready.',
    ctaTitle: 'Request Your ADU Estimate',
    ctaText: 'Send the ADU drawings, site plan, and bid date. We will return an organized accessory dwelling estimate.',
  },
  {
    slug: 'restoration',
    name: 'Restoration Estimation Services',
    headline: 'Restore with Precision. Bid with Confidence.',
    lede:
      'Restoration projects require more than standard estimating. They demand a thorough understanding of existing conditions, repair methodologies, code compliance, and specialty materials.',
    intro: [
      'Our restoration estimates combine accurate quantity takeoffs with real-time market pricing to help contractors submit competitive, profitable bids. Every estimate is prepared in CSI Format and powered by our proprietary data analytics platform, leveraging historical project data, regional labor trends, and market intelligence to deliver reliable, bid-ready estimates.',
    ],
    whatWeEstimate: [
      'Fire & Smoke Damage Restoration',
      'Water & Flood Damage Restoration',
      'Historic Building Restoration',
      'Structural Repairs',
      'Concrete Restoration',
      'Masonry Restoration',
      'Building Envelope Repairs',
      'Insurance Restoration Projects',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Existing Condition Review',
      'Scope Clarifications',
      'Professional Bid Proposals',
      'BIM Estimating',
    ],
    whyUs:
      'Restoration projects often involve hidden conditions, evolving scopes, and strict code requirements. Our estimators account for repair sequencing, specialty materials, and project complexities to deliver accurate estimates that reduce risk and protect your margins. By combining nearly a decade of historical pricing data with live market intelligence, we help restoration contractors bid with confidence and maximize profitability.',
    ctaTitle: 'Request Your Restoration Estimate',
    ctaText:
      'From historic restorations to insurance repairs, our team provides the estimating expertise and data-driven insights you need to secure more restoration projects with confidence.',
  },
  {
    slug: 'glazing',
    name: 'Glazing Estimation Services',
    headline: 'Precision Glass Estimating for Competitive Bids',
    lede:
      'From storefronts to curtain wall systems, our glazing estimating services provide accurate quantity takeoffs and real-time market pricing to help contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format and supported by our proprietary data analytics platform, combining historical project data, regional pricing trends, and market intelligence.',
    ],
    whatWeEstimate: [
      'Curtain Wall Systems',
      'Storefront Systems',
      'Aluminum Framing',
      'Windows',
      'Glass Doors',
      'Skylights',
      'Glass Railings',
      'Specialty & Architectural Glazing',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Scope Review & Clarifications',
      'Professional Bid Proposals',
      'Value Engineering Support',
      'BIM Estimating',
    ],
    whyUs:
      'Glazing projects require precise measurements, coordinated systems, and accurate pricing. Our estimates account for framing systems, specialty glass, hardware, and installation requirements — helping you minimize risk, protect your margins, and bid with confidence.',
    ctaTitle: 'Request Your Glazing Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more glazing projects.',
  },
  {
    slug: 'paving',
    name: 'Paving Estimation Services',
    headline: 'Accurate Estimates Built for Every Mile',
    lede:
      'Our paving estimating services combine detailed quantity takeoffs, production-based calculations, and real-time regional pricing to help contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format and powered by our proprietary data analytics platform, delivering accurate, bid-ready documentation.',
    ],
    whatWeEstimate: [
      'Asphalt Paving',
      'Concrete Paving',
      'Roads & Highways',
      'Parking Lots',
      'Driveways',
      'Sidewalks',
      'Curbs & Gutters',
      'Mill & Overlay Projects',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Production Rate Analysis',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'BIM Estimating',
    ],
    whyUs:
      'Paving projects depend on accurate material quantities, production planning, and market-based pricing. Our estimators analyze current labor and material trends to deliver precise estimates that help you bid competitively, protect your margins, and execute projects with confidence.',
    ctaTitle: 'Request Your Paving Estimate',
    ctaText:
      'Win more paving projects with accurate takeoffs, data-driven pricing, and professional bid proposals tailored to your project.',
    sampleDivisionSlug: 'exterior',
  },
  {
    slug: 'roofing',
    name: 'Roofing Estimation Services',
    headline: 'Accurate Roofing Estimates. Profitable Bids.',
    lede:
      'Our roofing estimating services combine detailed quantity takeoffs, real-time material pricing, and proprietary data analytics to help contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, providing accurate, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'TPO Roofing',
      'EPDM Roofing',
      'Modified Bitumen',
      'Built-Up Roofing (BUR)',
      'Standing Seam Metal Roofing',
      'Asphalt Shingles',
      'Roof Insulation',
      'Roof Replacement & Repairs',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating (When Required)',
    ],
    whyUs:
      'Roofing projects demand accurate material calculations, labor planning, and current market pricing. Our estimators account for roof geometry, insulation systems, flashings, drainage components, and accessories to deliver precise estimates that help you reduce waste, protect your margins, and bid with confidence.',
    ctaTitle: 'Request Your Roofing Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, data-driven pricing, and professional bid proposals to help you win more roofing projects.',
    sampleDivisionSlug: 'thermal',
  },
  {
    slug: 'metal-framing',
    name: 'Metal Framing Estimation Services',
    headline: 'Precision Metal Framing Estimates for Better Bids',
    lede:
      'Our metal framing estimating services combine accurate quantity takeoffs, real-time material pricing, and proprietary data analytics to help contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering organized, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'Light Gauge Metal Framing',
      'Cold-Formed Steel Framing',
      'Interior Partition Framing',
      'Load-Bearing Metal Studs',
      'Shaft Wall Systems',
      'Furring Systems',
      'Suspended Framing',
      'Soffits & Bulkheads',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating',
    ],
    whyUs:
      'Metal framing requires precise material counts, framing layouts, and labor planning. Our estimators account for studs, tracks, connectors, bracing, framing accessories, and project-specific requirements to deliver accurate estimates that minimize waste, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Metal Framing Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more metal framing projects.',
  },
  {
    slug: 'hvac',
    name: 'HVAC Estimation Services',
    headline: 'Accurate HVAC Estimates. Smarter Mechanical Bids.',
    heroHeadline: 'Ductwork to Controls, Quantified',
    lede:
      'Our HVAC estimating services combine detailed quantity takeoffs, real-time supplier pricing, labor analysis, and proprietary data analytics to help mechanical contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, ensuring accurate, coordinated, and bid-ready documentation.',
    ],
    whatWeEstimate: [
      'Heating Systems',
      'Ventilation Systems',
      'Air Conditioning (HVAC)',
      'Ductwork',
      'Chillers & Boilers',
      'Rooftop Units (RTUs)',
      'Air Handling Units (AHUs)',
      'Exhaust & Ventilation Systems',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating',
    ],
    whyUs:
      'HVAC projects require accurate system coordination, equipment scheduling, and precise material calculations. Our estimators account for ductwork, piping, insulation, equipment, accessories, and installation requirements to deliver reliable estimates that reduce risk, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your HVAC Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you win more HVAC projects.',
    sampleDivisionSlug: 'hvac',
  },
  {
    slug: 'mep',
    name: 'MEP Estimation Services',
    headline: 'Fully Coordinated MEP Estimates for Better Project Outcomes',
    heroHeadline: 'Full-System MEP Takeoffs',
    lede:
      'Our MEP estimating services combine detailed quantity takeoffs, real-time pricing, and proprietary data analytics to deliver accurate, coordinated estimates for mechanical, electrical, and plumbing systems.',
    intro: [
      'Every estimate is prepared in CSI Format, helping contractors submit competitive, profitable bids with confidence.',
    ],
    whatWeEstimate: [
      'Mechanical Systems',
      'Electrical Systems',
      'Plumbing Systems',
      'Fire Protection',
      'Low Voltage & Data',
      'Building Automation Systems (BAS)',
      'Medical Gas Systems',
      'Process Piping',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'BIM Estimating & Clash Coordination',
      'Value Engineering Support',
    ],
    whyUs:
      'MEP projects demand precise coordination across multiple trades. Our estimators account for equipment, piping, ductwork, conduit, fixtures, and system interfaces while utilizing BIM coordination where required to identify conflicts before construction begins, reducing rework, saving time, protecting margins, and helping you bid with confidence.',
    ctaTitle: 'Request Your MEP Estimate',
    ctaText:
      'Partner with a team that delivers coordinated takeoffs, market-driven pricing, BIM-enabled estimating, and professional bid proposals to help you secure more MEP projects.',
    sampleDivisionSlug: 'plumbing',
  },
  {
    slug: 'masonry',
    name: 'Masonry Estimating Services',
    headline: 'Accurate Masonry Estimates Built for Stronger Bids',
    lede:
      'Our masonry estimating services combine detailed quantity takeoffs, real-time material pricing, and proprietary data analytics to help masonry contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering organized, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'CMU Blockwork',
      'Brick Masonry',
      'Stone Masonry',
      'Stone Veneer',
      'Cast Stone',
      'Retaining Walls',
      'Masonry Restoration',
      'Architectural Masonry',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating',
    ],
    whyUs:
      'Masonry projects require accurate material counts, reinforcement calculations, mortar quantities, and labor planning. Our estimators account for block, brick, stone, lintels, reinforcement, accessories, and installation requirements to deliver precise estimates that minimize waste, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Masonry Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more masonry projects.',
    sampleDivisionSlug: 'masonry',
  },
  {
    slug: 'concrete',
    name: 'Concrete Estimating Services',
    headline: 'Accurate Concrete Estimates. Stronger Foundations for Better Bids.',
    heroHeadline: 'Pour Smarter, Bid Stronger',
    lede:
      'Our concrete estimating services combine detailed quantity takeoffs, production-based calculations, real-time material pricing, and proprietary data analytics to help concrete contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering organized, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'Foundations',
      'Footings',
      'Slabs-on-Grade',
      'Elevated Slabs',
      'Concrete Walls',
      'Columns & Beams',
      'Sidewalks & Curbs',
      'Concrete Paving',
      'Retaining Walls',
      'Cast-in-Place Concrete',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating',
    ],
    whyUs:
      'Concrete projects demand precise quantity calculations, production planning, reinforcement coordination, and accurate material pricing. Our estimators account for concrete volumes, formwork, reinforcing steel, embeds, and placement requirements to deliver reliable estimates that reduce waste, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Concrete Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more concrete projects.',
    sampleDivisionSlug: 'concrete',
  },
  {
    slug: 'insulation',
    name: 'Insulation Estimation Services',
    headline: 'Accurate Insulation Estimates. Smarter, More Profitable Bids.',
    lede:
      'Our insulation estimating services combine detailed quantity takeoffs, real-time material pricing, and proprietary data analytics to help insulation contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering accurate, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'Batt Insulation',
      'Spray Foam Insulation',
      'Rigid Board Insulation',
      'Thermal Insulation',
      'Acoustic Insulation',
      'Fireproofing',
      'Mechanical & Pipe Insulation',
      'Roof Insulation',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating',
    ],
    whyUs:
      'Insulation projects require precise material calculations, coverage analysis, and labor planning. Our estimators account for thermal performance, acoustic requirements, fire ratings, insulation thicknesses, and installation methods to deliver accurate estimates that reduce waste, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Insulation Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more insulation projects.',
    sampleDivisionSlug: 'thermal',
  },
  {
    slug: 'structural',
    name: 'Structural Estimation Services',
    headline: 'Precision Structural Estimates for Stronger Projects',
    heroHeadline: 'Steel, Concrete, Timber: Quantified',
    lede:
      'Our structural estimating services combine detailed quantity takeoffs, engineering coordination, real-time material pricing, and proprietary data analytics to help contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering accurate, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'Structural Steel',
      'Reinforced Concrete',
      'Rebar & Reinforcement',
      'Wood Framing',
      'Heavy Timber',
      'Precast Concrete',
      'Masonry Structures',
      'Structural Foundations',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating & Structural Coordination',
    ],
    whyUs:
      'Structural projects demand precision, coordination, and engineering accuracy. Our estimators account for member sizing, reinforcement, connection details, fabrication requirements, erection sequencing, and material quantities to deliver dependable estimates that minimize risk, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Structural Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, BIM-enabled coordination, and professional bid proposals to help you secure more structural projects.',
    sampleDivisionSlug: 'metals',
  },
  {
    slug: 'sitework-earthwork',
    name: 'Sitework & Earthwork Estimation Services',
    headline: 'Accurate Sitework Estimates from the Ground Up',
    lede:
      'Our sitework and earthwork estimating services combine detailed quantity takeoffs, terrain analysis, production-based calculations, and proprietary data analytics to help civil contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering accurate, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'Site Preparation',
      'Clearing & Grubbing',
      'Excavation',
      'Earthwork & Grading',
      'Cut & Fill',
      'Trenching',
      'Backfilling',
      'Site Utilities',
      'Storm Drainage',
      'Erosion & Sediment Control',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor & Equipment Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating (When Required)',
    ],
    whyUs:
      'Sitework projects require accurate earthwork quantities, terrain evaluation, utility coordination, and equipment planning. Our estimators account for excavation volumes, grading requirements, haul-off, backfill, production rates, and site logistics to deliver reliable estimates that reduce risk, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Sitework & Earthwork Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more sitework and earthwork projects.',
    sampleDivisionSlug: 'earthwork',
  },
  {
    slug: 'flooring',
    name: 'Flooring Estimation Services',
    headline: 'Accurate Flooring Estimates for Competitive Bids',
    lede:
      'Our flooring estimating services combine detailed quantity takeoffs, real-time material pricing, and proprietary data analytics to help flooring contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering accurate, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'Carpet Flooring',
      'Hardwood Flooring',
      'Luxury Vinyl Tile (LVT)',
      'Vinyl Composition Tile (VCT)',
      'Laminate Flooring',
      'Rubber Flooring',
      'Epoxy Flooring',
      'Polished Concrete',
      'Resinous Flooring',
      'Specialty Flooring Systems',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating (When Required)',
    ],
    whyUs:
      'Flooring projects require precise quantity calculations, waste factors, transition details, adhesives, underlayment, and installation planning. Our estimators account for every project requirement to deliver reliable estimates that reduce material waste, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Flooring Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more flooring projects.',
    sampleDivisionSlug: 'finishes',
  },
  {
    slug: 'bath-tile',
    name: 'Bath & Tile Estimation Services',
    headline: 'Precision Tile Estimates for Better Bids',
    lede:
      'Our bath and tile estimating services combine detailed quantity takeoffs, real-time material pricing, and proprietary data analytics to help tile contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering accurate, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'Ceramic Tile',
      'Porcelain Tile',
      'Natural Stone',
      'Mosaic Tile',
      'Wall Tile',
      'Floor Tile',
      'Shower Systems',
      'Waterproofing Systems',
      'Bathroom Finishes',
      'Tile Restoration',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating (When Required)',
    ],
    whyUs:
      'Tile projects demand precise quantity calculations, layout planning, waste allowances, waterproofing coordination, and installation accuracy. Our estimators account for substrates, setting materials, trim profiles, grout, and specialty finishes to deliver reliable estimates that reduce waste, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Bath & Tile Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more bath and tile projects.',
    sampleDivisionSlug: 'finishes',
  },
  {
    slug: 'lumber-woodwork',
    name: 'Lumber & Woodwork Estimation Services',
    headline: 'Precision Lumber Estimates for Smarter Construction',
    lede:
      'Our lumber and woodwork estimating services combine detailed quantity takeoffs, real-time material pricing, and proprietary data analytics to help contractors submit competitive, profitable bids.',
    intro: [
      'Every estimate is prepared in CSI Format, delivering accurate, bid-ready documentation backed by regional market trends.',
    ],
    whatWeEstimate: [
      'Wood Framing',
      'Heavy Timber',
      'Engineered Wood Systems',
      'Roof & Floor Framing',
      'Finish Carpentry',
      'Millwork',
      'Casework',
      'Trim & Moldings',
      'Sheathing',
      'Wood Decking',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing',
      'Labor Cost Analysis',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
      'Value Engineering Support',
      'BIM Estimating (When Required)',
    ],
    whyUs:
      'Wood construction demands accurate material optimization, framing layouts, waste calculations, and installation planning. Our estimators account for lumber sizes, engineered wood products, millwork components, hardware, and project-specific requirements to deliver reliable estimates that minimize waste, protect your margins, and help you bid with confidence.',
    ctaTitle: 'Request Your Lumber & Woodwork Estimate',
    ctaText:
      'Partner with a team that delivers accurate takeoffs, market-driven pricing, and professional bid proposals to help you secure more lumber and woodwork projects.',
    sampleDivisionSlug: 'wood',
  },
  {
    slug: 'demolition',
    name: 'Demolition Estimation Services',
    headline: 'Accurate Demolition Takeoffs for Safer, Clearer Bids.',
    heroHeadline: 'Know What Comes Out',
    lede:
      'Selective demolition, gut-outs, and structural removal demand careful sequencing and quantity clarity. Our demolition estimates quantify what comes out, what stays protected, and how the work is staged so contractors can price risk and productivity with confidence.',
    intro: [
      'Demolition scopes are often underdefined on bid day. We measure removal quantities from the plan set and existing-conditions notes, separate selective demolition from structural demolition, and call out protection, haul-off, and disposal assumptions so your bid is defensible.',
    ],
    whatWeEstimate: [
      'Selective interior demolition and gut-outs',
      'Structural demolition and saw-cutting',
      'Protection of adjacent finishes and systems',
      'Debris haul-off and disposal allowances',
      'Temporary shoring coordination notes (as indicated)',
      'Hazardous-material exclusions and clarifications',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Labor & Productivity Analysis',
      'Disposal / Haul Assumptions Stated',
      'Scope Clarifications & Exclusions',
      'Professional Bid Proposals',
    ],
    whyUs:
      'Demolition pricing fails when quantities and protection scope are vague. We organize removal work by area and system, document assumptions, and deliver CSI Format estimates that help you bid competitively while protecting margin against unforeseen field conditions.',
    ctaTitle: 'Request Your Demolition Estimate',
    ctaText:
      'Share the demolition plans, existing-conditions notes, and bid date. We will return an organized takeoff and bid-ready estimate.',
  },
  {
    slug: 'ceiling-drywall',
    name: 'Ceiling & Drywall Estimation Services',
    headline: 'Framing, Board, Finish: Quantified by System.',
    lede:
      'Ceiling and drywall packages live or die on accurate framing, board counts, finish levels, and opening deductions. We deliver trade-specific takeoffs organized for metal stud, gypsum board, ACT, and related finish scopes.',
    intro: [
      'Our ceiling and drywall estimates measure walls, ceilings, soffits, and specialty assemblies from architectural and reflected ceiling plans. Quantities are organized so you can apply your production rates and finish levels without rebuilding the takeoff.',
    ],
    whatWeEstimate: [
      'Metal stud and gypsum board partitions',
      'Ceiling framing and gypsum ceilings',
      'Acoustic ceiling tile (ACT) systems',
      'Shaft walls, rated assemblies, and specialty boards',
      'Corner bead, trim, and accessory counts',
      'Finish levels and texture allowances (as specified)',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Real-Time Material Pricing Support',
      'Labor Cost Analysis',
      'Opening Deductions Documented',
      'Professional Bid Proposals',
      'Scope Review & Clarifications',
    ],
    whyUs:
      'Ceiling and drywall bids require consistent measurement rules and clear finish assumptions. We produce organized CSI Format takeoffs that subcontractors can price quickly, revise cleanly, and defend in scope reviews.',
    ctaTitle: 'Request Your Ceiling & Drywall Estimate',
    ctaText:
      'Send the architectural and RCP set with your bid date. We will deliver a trade-ready ceiling and drywall package.',
    sampleDivisionSlug: 'finishes',
  },
  {
    slug: 'landscaping',
    name: 'Landscaping Estimation Services',
    headline: 'Site Landscape Quantities That Match the Field.',
    lede:
      'Planting, hardscape, irrigation, and site amenities need quantities tied to the civil and landscape drawings. Our landscaping estimates organize material and installation scope so outdoor packages bid cleanly and profitably.',
    intro: [
      'We measure planting schedules, sod and seeding areas, hardscape paving, edging, and irrigation components from the landscape and civil set. Assumptions for soil prep, mulch depth, and plant sizes are stated so your number stays aligned with the specification.',
    ],
    whatWeEstimate: [
      'Trees, shrubs, and groundcover from planting schedules',
      'Sod, seed, and soil preparation areas',
      'Mulch, edging, and landscape finishes',
      'Hardscape paving and site amenities (as shown)',
      'Irrigation heads, laterals, and controllers (as shown)',
      'Erosion control and temporary seeding allowances',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Material & Installation Breakdown',
      'Schedule-Based Plant Counts',
      'Scope Clarifications & Exclusions',
      'Professional Bid Proposals',
    ],
    whyUs:
      'Landscape packages are easy to under-measure when schedules and plans disagree. We reconcile both, document assumptions, and deliver CSI Format estimates that help landscape contractors price competitively with clear scope.',
    ctaTitle: 'Request Your Landscaping Estimate',
    ctaText:
      'Share the landscape and civil drawings with the bid date. We will return organized planting, hardscape, and irrigation quantities.',
    sampleDivisionSlug: 'exterior',
  },
  {
    slug: 'fencing',
    name: 'Fencing Estimation Services',
    headline: 'Perimeter and Specialty Fence Packages, Measured Cleanly.',
    lede:
      'Fencing scopes need accurate lineal quantities, post and gate counts, and specification-driven material callouts. We prepare fencing estimates that contractors can price by system without guessing from incomplete site notes.',
    intro: [
      'From chain-link and ornamental metal to wood privacy and temporary construction fencing, we measure fence runs from the civil and architectural site plans, count gates and posts, and organize the estimate by system and height.',
    ],
    whatWeEstimate: [
      'Chain-link, ornamental, and wood fence systems',
      'Post, rail, and fabric / panel quantities',
      'Pedestrian and vehicle gates',
      'Hardware, tension wire, and accessories',
      'Temporary construction fencing (when shown)',
      'Footings and footing assumptions (as indicated)',
    ],
    whatsIncluded: [
      'Detailed Quantity Takeoffs',
      'CSI Format Estimates',
      'Gate & Post Schedules',
      'Material & Labor Breakdown',
      'Scope Clarifications & Exclusions',
      'Professional Bid Proposals',
    ],
    whyUs:
      'Fencing bids go wrong when runs, heights, and gate types are inferred instead of measured. We deliver clear lineal and count-based takeoffs in CSI Format so fence contractors can submit competitive, complete proposals.',
    ctaTitle: 'Request Your Fencing Estimate',
    ctaText:
      'Send the site and fence details with your bid date. We will prepare a measured fencing estimate ready for pricing.',
    sampleDivisionSlug: 'exterior',
  },
];

export const TRADE_BUBBLE_SUMMARIES: { slug: string; name: string; summary: string }[] = [
  {
    slug: 'remodeling',
    name: 'Remodeling Estimation Services',
    summary:
      'Whether it\'s a tenant improvement or a complete renovation, our remodeling estimates account for demolition, existing conditions, material upgrades, and labor productivity to deliver competitive, profitable bids.',
  },
  {
    slug: 'new-construction',
    name: 'New Construction Estimation Services',
    summary:
      'Ground-up residential and commercial estimating with CSI Format takeoffs, real-time pricing, and trade-coordinated bid packages from foundation through finishes.',
  },
  {
    slug: 'adu',
    name: 'ADU Estimation Services',
    summary:
      'Accessory dwelling and ADU estimates for detached, attached, and conversion projects. Compact footprints with complete MEP and finish packages.',
  },
  {
    slug: 'restoration',
    name: 'Restoration Estimation Services',
    summary:
      'We prepare detailed restoration estimates that consider repair methodologies, existing conditions, code upgrades, and specialty materials for accurate project pricing.',
  },
  {
    slug: 'glazing',
    name: 'Glazing Estimation Services',
    summary:
      'Our glazing estimates provide accurate quantities and market pricing for architectural glass systems, helping contractors submit competitive bids.',
  },
  {
    slug: 'paving',
    name: 'Paving Estimation Services',
    summary:
      'Detailed paving estimates backed by production rates and regional pricing help contractors maximize profitability on every project.',
  },
  {
    slug: 'roofing',
    name: 'Roofing Estimation Services',
    summary:
      'Our roofing estimates combine accurate takeoffs with real-time material pricing to help roofing contractors bid confidently and protect their margins.',
  },
  {
    slug: 'metal-framing',
    name: 'Metal Framing Estimation Services',
    summary:
      'Our metal estimating services combine accurate quantity takeoffs, real-time market pricing, and CSI Format reporting to help contractors submit competitive, profitable bids with confidence.',
  },
  {
    slug: 'hvac',
    name: 'HVAC Estimation Services',
    summary:
      'Our HVAC estimates combine supplier pricing, labor analysis, and system coordination to help mechanical contractors build profitable bids.',
  },
  {
    slug: 'mep',
    name: 'MEP Estimation Services',
    summary:
      'Comprehensive MEP estimates ensure every mechanical, electrical, and plumbing system is accurately quantified and coordinated before construction begins.',
  },
  {
    slug: 'masonry',
    name: 'Masonry Estimating Services',
    summary:
      'Our masonry estimates account for material quantities, labor productivity, mortar requirements, reinforcement, and market pricing to produce reliable bid proposals.',
  },
  {
    slug: 'concrete',
    name: 'Concrete Estimating Services',
    summary:
      'We deliver comprehensive concrete estimates using detailed quantity takeoffs, production-based calculations, and regional pricing intelligence, helping contractors win profitable projects.',
  },
  {
    slug: 'insulation',
    name: 'Insulation Estimation Services',
    summary:
      'From commercial insulation packages to industrial thermal systems, our estimates help contractors secure more work while protecting margins through accurate quantities and market-driven pricing.',
  },
  {
    slug: 'structural',
    name: 'Structural Estimation Services',
    summary:
      'Structural estimates combine engineering coordination, production analysis, and real-time pricing to deliver accurate bid packages.',
  },
  {
    slug: 'sitework-earthwork',
    name: 'Sitework & Earthwork Estimating',
    summary:
      'We provide comprehensive sitework estimates using terrain analysis, production rates, and regional pricing to help civil contractors submit profitable bids.',
  },
  {
    slug: 'flooring',
    name: 'Flooring Estimation Services',
    summary:
      'Detailed flooring takeoffs supported by market pricing help contractors submit competitive, profitable bids.',
  },
  {
    slug: 'bath-tile',
    name: 'Bath & Tile Estimation Services',
    summary:
      'Accurate tile estimates help contractors reduce waste, improve planning, and submit competitive proposals.',
  },
  {
    slug: 'lumber-woodwork',
    name: 'Lumber & Woodwork Estimation Services',
    summary:
      'Our wood estimating services optimize material procurement while minimizing waste through detailed quantity takeoffs.',
  },
  {
    slug: 'demolition',
    name: 'Demolition Estimation Services',
    summary:
      'Selective and structural demolition estimates with clear protection, haul-off, and disposal assumptions for defensible bids.',
  },
  {
    slug: 'ceiling-drywall',
    name: 'Ceiling & Drywall Estimation Services',
    summary:
      'Framing, gypsum board, ACT, and finish-level takeoffs organized for ceiling and drywall subcontractors.',
  },
  {
    slug: 'landscaping',
    name: 'Landscaping Estimation Services',
    summary:
      'Planting, hardscape, irrigation, and site amenity quantities measured from landscape and civil drawings.',
  },
  {
    slug: 'fencing',
    name: 'Fencing Estimation Services',
    summary:
      'Fence runs, posts, gates, and accessories measured by system for clean, competitive fencing proposals.',
  },
];

export function getEstimationHub(slug: string): EstimationHub | undefined {
  return ESTIMATION_HUBS.find((h) => h.slug === slug);
}

const TRADE_IMAGES: Record<string, { src: string; alt: string }> = {
  remodeling: {
    src: '/images/trades/remodeling.jpg',
    alt: 'Residential remodeling and renovation interior under construction',
  },
  'new-construction': {
    src: '/images/trades/new-construction.jpg',
    alt: 'New construction building frame rising on a job site',
  },
  adu: {
    src: '/images/trades/adu.jpg',
    alt: 'Accessory dwelling unit and backyard residential construction',
  },
  restoration: {
    src: '/images/trades/restoration.jpg',
    alt: 'Historic building restoration and repair work on site',
  },
  glazing: {
    src: '/images/trades/glazing.jpg',
    alt: 'Curtain wall and architectural glass glazing installation',
  },
  paving: {
    src: '/images/trades/paving.jpg',
    alt: 'Asphalt paving crew and paver machine laying roadway asphalt',
  },
  roofing: {
    src: '/images/trades/roofing.jpg',
    alt: 'Roofing crew installing shingles on a residential roof',
  },
  'metal-framing': {
    src: '/images/trades/metal-framing.jpg',
    alt: 'Light-gauge metal stud framing and cement board on a renovation build',
  },
  hvac: {
    src: '/images/trades/hvac.jpg',
    alt: 'Sheet-metal HVAC ductwork hung during mechanical rough-in',
  },
  mep: {
    src: '/images/trades/mep.jpg',
    alt: 'Electrical panel and MEP systems work in progress',
  },
  masonry: {
    src: '/images/trades/masonry.jpg',
    alt: 'Brick and masonry wall under construction',
  },
  concrete: {
    src: '/images/trades/concrete.jpg',
    alt: 'Construction worker pouring concrete through a hose on a job site',
  },
  insulation: {
    src: '/images/trades/insulation.jpg',
    alt: 'Building insulation installed in wall cavities',
  },
  structural: {
    src: '/images/trades/structural.jpg',
    alt: 'Structural rebar and steel reinforcement work on a concrete deck',
  },
  'sitework-earthwork': {
    src: '/images/trades/sitework-earthwork.jpg',
    alt: 'Excavator performing sitework and earthwork on a construction site',
  },
  flooring: {
    src: '/images/trades/flooring.jpg',
    alt: 'Flooring installation of hardwood in a residential interior',
  },
  'bath-tile': {
    src: '/images/trades/bath-tile.jpg',
    alt: 'Bathroom tile installation and finish work',
  },
  'lumber-woodwork': {
    src: '/images/trades/lumber-woodwork.jpg',
    alt: 'Wood framing and dimensional lumber structure under construction',
  },
  demolition: {
    src: '/images/trades/demolition.jpg',
    alt: 'Selective demolition work on a renovation project',
  },
  'ceiling-drywall': {
    src: '/images/trades/ceiling-drywall.jpg',
    alt: 'Drywall and ceiling installation in a commercial space',
  },
  landscaping: {
    src: '/images/trades/landscaping.jpg',
    alt: 'Landscaping and planting work on a residential site',
  },
  fencing: {
    src: '/images/trades/fencing.jpg',
    alt: 'Fence installation along a residential property line',
  },
};

export function getTradeEstimation(slug: string): TradeEstimationPage | undefined {
  const page = TRADE_ESTIMATION_PAGES.find((t) => t.slug === slug);
  if (!page) return undefined;
  const image = TRADE_IMAGES[slug];
  if (!image) return page;
  return {
    ...page,
    imageSrc: page.imageSrc ?? image.src,
    imageAlt: page.imageAlt ?? image.alt,
  };
}

export function categoryAnchorId(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Maps every client CSI trade list label to a real destination (trade page or hub anchor). */
const CSI_TRADE_HREFS: Record<string, string> = {
  'General Construction-GC': '/estimation/general-construction',
  Remodeling: '/estimation/trades/remodeling',
  Restoration: '/estimation/trades/restoration',
  'Marine work': `/estimation/public-projects#${categoryAnchorId('Marine & Port Facilities')}`,
  Glazing: '/estimation/trades/glazing',
  Paving: '/estimation/trades/paving',
  Roofing: '/estimation/trades/roofing',
  'Metal framing': '/estimation/trades/metal-framing',
  'Government Infrastructure': `/estimation/public-projects#${categoryAnchorId('Municipal Buildings')}`,
  'HVAC-Heating cooling and ventilation': '/estimation/trades/hvac',
  'MEP-Mechanical Electrical Plumbing': '/estimation/trades/mep',
  'Ceiling/drywall': '/estimation/trades/ceiling-drywall',
  Excavation: '/estimation/trades/sitework-earthwork',
  Insulation: '/estimation/trades/insulation',
  Demolition: '/estimation/trades/demolition',
  Structural: '/estimation/trades/structural',
  Landscaping: '/estimation/trades/landscaping',
  'Bridge work': `/estimation/public-projects#${categoryAnchorId('Bridges')}`,
  'Airport construction': `/estimation/public-projects#${categoryAnchorId('Aviation Infrastructure')}`,
  'Roads & Tenders Governmental': `/estimation/public-projects#${categoryAnchorId('Roads & Highways')}`,
  Flooring: '/estimation/trades/flooring',
  'Bath & Tiles': '/estimation/trades/bath-tile',
  'Lumber wood work': '/estimation/trades/lumber-woodwork',
  Fencing: '/estimation/trades/fencing',
};

export type CsiTradeNavItem = {
  label: string;
  href: string;
  shortLabel: string;
};

function shortTradeLabel(label: string): string {
  if (label.includes('-')) {
    return label.split('-')[0] ?? label;
  }
  return label;
}

export function getCsiTradeNavItems(labels: readonly string[]): CsiTradeNavItem[] {
  return labels.map((label) => {
    const href = CSI_TRADE_HREFS[label];
    if (!href) {
      throw new Error(`CSI trade "${label}" is missing a navigation destination.`);
    }
    return {
      label,
      shortLabel: shortTradeLabel(label),
      href,
    };
  });
}
