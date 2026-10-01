/**
 * Canonical photograph inventory — each path has exactly one allowed placement.
 * TradeTile CSI thumbs are diagram-only (no photos).
 * Keep in sync with public/images and scripts/check-image-uniqueness.mjs.
 */
export type ImagePlacement = {
  path: string;
  route: string;
  role: 'hero' | 'gallery' | 'card' | 'property' | 'markets';
  alt: string;
};

export const IMAGE_REGISTRY: ImagePlacement[] = [
  // Home
  { path: '/images/hero/home-hero.jpg', route: '/', role: 'hero', alt: 'American suburban home with wraparound porch and lawn' },
  { path: '/images/properties/commercial.jpg', route: '/', role: 'card', alt: 'Commercial building facade for Estimation & Design division' },
  { path: '/images/divisions/property-acquisition.jpg', route: '/', role: 'card', alt: 'Property acquisition opportunity' },
  { path: '/images/markets/home-industrial.jpg', route: '/', role: 'markets', alt: 'Industrial facility project' },
  { path: '/images/markets/home-residential-commercial.jpg', route: '/', role: 'markets', alt: 'Residential and commercial project' },
  { path: '/images/markets/home-public-institutional.jpg', route: '/', role: 'markets', alt: 'Public institutional building project' },

  // Marketing hubs
  { path: '/images/hero/engineering-hero.jpg', route: '/services', role: 'hero', alt: 'Engineering and design coordination' },
  { path: '/images/approach/building.jpg', route: '/about', role: 'hero', alt: 'Building exterior representing our approach' },
  { path: '/images/hero/how-it-works.jpg', route: '/how-it-works', role: 'hero', alt: 'Construction professionals delivering coordinated project work' },
  { path: '/images/projects/public-institutional.jpg', route: '/markets', role: 'hero', alt: 'Public and institutional project' },
  { path: '/images/projects/residential-commercial.jpg', route: '/estimation', role: 'hero', alt: 'Residential and commercial estimation work' },
  { path: '/images/hero/contact.jpg', route: '/contact', role: 'hero', alt: 'Contact QuantSult' },
  { path: '/images/hero/who-we-serve.jpg', route: '/who-we-serve', role: 'hero', alt: 'Clients and partners we serve' },
  { path: '/images/hero/trades-hub.jpg', route: '/trades', role: 'hero', alt: 'CSI trade estimating expertise' },
  { path: '/images/hero/quote.jpg', route: '/quote', role: 'hero', alt: 'Request a quote for estimation or design' },

  // Service detail heroes
  { path: '/images/divisions/estimation-design.jpg', route: '/services/estimating', role: 'hero', alt: 'Construction estimating and design coordination' },
  { path: '/images/services/architectural-building.jpg', route: '/services/architectural-drawings', role: 'hero', alt: 'Landmark contemporary architecture' },
  { path: '/images/services/mep-engineer-jobsite.jpg', route: '/services/mep-engineering', role: 'hero', alt: 'Engineer reviewing systems on a job site' },
  { path: '/images/services/structural-steel.jpg', route: '/services/structural-engineering', role: 'hero', alt: 'Structural steel frame under construction' },
  { path: '/images/services/structural-wood.jpg', route: '/services/permit-ready-structural-drawings', role: 'hero', alt: 'Wood and steel structural framing' },
  { path: '/images/services/bim/exterior-render.jpg', route: '/services/bim-visualization', role: 'hero', alt: 'Photorealistic architectural exterior rendering' },
  { path: '/images/hero/acquisition-hero.jpg', route: '/services/acquisitions-investments', role: 'hero', alt: 'Malibu beachfront homes representing property acquisition' },

  // BIM gallery (unique frames)
  { path: '/images/services/bim/gym-render.jpg', route: '/services/bim-visualization', role: 'gallery', alt: 'Photorealistic gym interior visualization' },
  { path: '/images/services/bim/interior-render.jpg', route: '/services/bim-visualization', role: 'gallery', alt: 'Photorealistic residential interior rendering' },
  { path: '/images/services/bim/bim-model.jpg', route: '/services/bim-visualization', role: 'gallery', alt: 'BIM model on 2D architectural plans' },

  // Acquisitions property types
  { path: '/images/properties/residential.jpg', route: '/services/acquisitions-investments', role: 'property', alt: 'Residential property type' },
  { path: '/images/properties/commercial-type.jpg', route: '/services/acquisitions-investments', role: 'property', alt: 'Commercial property type' },
  { path: '/images/properties/land-development.jpg', route: '/services/acquisitions-investments', role: 'property', alt: 'Land and development site' },
  { path: '/images/properties/special-situations.jpg', route: '/services/acquisitions-investments', role: 'property', alt: 'Special situation property' },

  // CSI division detail heroes (/trades/[slug]) — TradeTile uses diagrams only
  { path: '/images/divisions/concrete.jpg', route: '/trades/concrete', role: 'hero', alt: 'Concrete pour on a job site' },
  { path: '/images/divisions/masonry.jpg', route: '/trades/masonry', role: 'hero', alt: 'Brick and masonry wall construction' },
  { path: '/images/divisions/metals.jpg', route: '/trades/metals', role: 'hero', alt: 'Structural metals and rebar' },
  { path: '/images/divisions/wood.jpg', route: '/trades/wood', role: 'hero', alt: 'Wood framing under construction' },
  { path: '/images/divisions/thermal.jpg', route: '/trades/thermal', role: 'hero', alt: 'Roofing and thermal moisture protection' },
  { path: '/images/divisions/finishes.jpg', route: '/trades/finishes', role: 'hero', alt: 'Interior finishes installation' },
  { path: '/images/divisions/plumbing.jpg', route: '/trades/plumbing', role: 'hero', alt: 'Plumbing fittings and valves' },
  { path: '/images/divisions/hvac.jpg', route: '/trades/hvac', role: 'hero', alt: 'HVAC ductwork rough-in' },
  { path: '/images/divisions/electrical.jpg', route: '/trades/electrical', role: 'hero', alt: 'Electrical distribution work' },
  { path: '/images/divisions/earthwork.jpg', route: '/trades/earthwork', role: 'hero', alt: 'Earthwork excavator on site' },
  { path: '/images/divisions/exterior.jpg', route: '/trades/exterior', role: 'hero', alt: 'Exterior improvements and landscaping' },
  { path: '/images/divisions/utilities.jpg', route: '/trades/utilities', role: 'hero', alt: 'Underground utility installation' },

  // Estimation market hubs (unique per route)
  { path: '/images/estimation/general-construction.jpg', route: '/estimation/general-construction', role: 'hero', alt: 'General construction site with steel and concrete framing' },
  { path: '/images/estimation/gc-commercial.jpg', route: '/estimation/general-construction', role: 'card', alt: 'Commercial streetscape under general construction' },
  { path: '/images/estimation/gc-residential.jpg', route: '/estimation/general-construction', role: 'card', alt: 'Residential home under general construction' },
  { path: '/images/estimation/gc-industrial.jpg', route: '/estimation/general-construction', role: 'card', alt: 'Industrial facility under general construction' },
  { path: '/images/estimation/commercial.jpg', route: '/estimation/commercial', role: 'hero', alt: 'Commercial office building for commercial project estimating' },
  { path: '/images/estimation/com-office.jpg', route: '/estimation/commercial', role: 'card', alt: 'Modern commercial office building exterior' },
  { path: '/images/estimation/com-retail.jpg', route: '/estimation/commercial', role: 'card', alt: 'Retail storefront and commercial streetscape' },
  { path: '/images/estimation/com-mixed-use.jpg', route: '/estimation/commercial', role: 'card', alt: 'Mixed-use commercial and residential development' },
  { path: '/images/estimation/com-hospitality.jpg', route: '/estimation/commercial', role: 'card', alt: 'Hospitality hotel exterior for commercial estimating' },
  { path: '/images/estimation/com-healthcare.jpg', route: '/estimation/commercial', role: 'card', alt: 'Medical office and healthcare commercial building' },
  { path: '/images/estimation/com-ti.jpg', route: '/estimation/commercial', role: 'card', alt: 'Commercial tenant improvement interior fit-out' },
  { path: '/images/estimation/residential.jpg', route: '/estimation/residential', role: 'hero', alt: 'Residential homes for residential project estimating' },
  { path: '/images/estimation/res-single-family.jpg', route: '/estimation/residential', role: 'card', alt: 'Single-family residential home exterior' },
  { path: '/images/estimation/res-duplex.jpg', route: '/estimation/residential', role: 'card', alt: 'Duplex two-family residential building' },
  { path: '/images/estimation/res-townhomes.jpg', route: '/estimation/residential', role: 'card', alt: 'Townhome row housing residential street' },
  { path: '/images/estimation/res-multifamily.jpg', route: '/estimation/residential', role: 'card', alt: 'Multi-family apartment residential building' },
  { path: '/images/estimation/res-affordable.jpg', route: '/estimation/residential', role: 'card', alt: 'Affordable low-cost housing residential development' },
  { path: '/images/estimation/res-custom.jpg', route: '/estimation/residential', role: 'card', alt: 'Custom estate residential home' },
  { path: '/images/estimation/industrial.jpg', route: '/estimation/industrial', role: 'hero', alt: 'Industrial facility for industrial project estimating' },
  { path: '/images/estimation/ind-manufacturing.jpg', route: '/estimation/industrial', role: 'card', alt: 'Manufacturing facility production floor' },
  { path: '/images/estimation/ind-warehouse.jpg', route: '/estimation/industrial', role: 'card', alt: 'Warehouse distribution center with loading docks' },
  { path: '/images/estimation/ind-processing.jpg', route: '/estimation/industrial', role: 'card', alt: 'Industrial processing plant exterior' },
  { path: '/images/estimation/ind-food.jpg', route: '/estimation/industrial', role: 'card', alt: 'Food and beverage industrial facility' },
  { path: '/images/estimation/ind-power.jpg', route: '/estimation/industrial', role: 'card', alt: 'Power generation industrial facility' },
  { path: '/images/estimation/ind-cold-storage.jpg', route: '/estimation/industrial', role: 'card', alt: 'Cold storage industrial warehouse' },
  { path: '/images/estimation/public-projects.jpg', route: '/estimation/public-projects', role: 'hero', alt: 'Public civil infrastructure bridge and roadway' },
  { path: '/images/estimation/civil-roads.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Highway and roadway civil infrastructure' },
  { path: '/images/estimation/civil-bridges.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Bridge civil infrastructure over water' },
  { path: '/images/estimation/civil-aviation.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Airport runway and aviation infrastructure' },
  { path: '/images/estimation/civil-marine.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Marine port facility and dock infrastructure' },
  { path: '/images/estimation/civil-rail.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Rail and transit civil infrastructure' },
  { path: '/images/estimation/civil-water.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Water and wastewater treatment facility' },
  { path: '/images/estimation/civil-utilities.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Underground utility infrastructure trench work' },
  { path: '/images/estimation/fac-municipal.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Municipal government public building' },
  { path: '/images/estimation/fac-education.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Educational school public facility' },
  { path: '/images/estimation/fac-fire-station.jpg', route: '/estimation/public-projects', role: 'card', alt: 'Fire station emergency services public facility' },
  { path: '/images/estimation/trades-hub.jpg', route: '/estimation/trades', role: 'hero', alt: 'Specialty trade contractors coordinating on a commercial jobsite' },

  // Estimation specialty trade heroes
  { path: '/images/trades/remodeling.jpg', route: '/estimation/trades/remodeling', role: 'hero', alt: 'Residential remodeling interior' },
  { path: '/images/trades/new-construction.jpg', route: '/estimation/trades/new-construction', role: 'hero', alt: 'New construction building frame' },
  { path: '/images/trades/adu.jpg', route: '/estimation/trades/adu', role: 'hero', alt: 'Accessory dwelling unit construction' },
  { path: '/images/trades/restoration.jpg', route: '/estimation/trades/restoration', role: 'hero', alt: 'Historic building restoration' },
  { path: '/images/trades/glazing.jpg', route: '/estimation/trades/glazing', role: 'hero', alt: 'Curtain wall and glazing' },
  { path: '/images/trades/paving.jpg', route: '/estimation/trades/paving', role: 'hero', alt: 'Asphalt paving crew' },
  { path: '/images/trades/roofing.jpg', route: '/estimation/trades/roofing', role: 'hero', alt: 'Roofing crew installing shingles' },
  { path: '/images/trades/metal-framing.jpg', route: '/estimation/trades/metal-framing', role: 'hero', alt: 'Light-gauge metal stud framing' },
  { path: '/images/trades/hvac.jpg', route: '/estimation/trades/hvac', role: 'hero', alt: 'HVAC mechanical installation' },
  { path: '/images/trades/mep.jpg', route: '/estimation/trades/mep', role: 'hero', alt: 'MEP systems coordination' },
  { path: '/images/trades/masonry.jpg', route: '/estimation/trades/masonry', role: 'hero', alt: 'Masonry estimation job site' },
  { path: '/images/trades/concrete.jpg', route: '/estimation/trades/concrete', role: 'hero', alt: 'Concrete trade estimation site' },
  { path: '/images/trades/insulation.jpg', route: '/estimation/trades/insulation', role: 'hero', alt: 'Building insulation in wall cavities' },
  { path: '/images/trades/structural.jpg', route: '/estimation/trades/structural', role: 'hero', alt: 'Structural steel estimation work' },
  { path: '/images/trades/sitework-earthwork.jpg', route: '/estimation/trades/sitework-earthwork', role: 'hero', alt: 'Sitework and earthwork estimation' },
  { path: '/images/trades/flooring.jpg', route: '/estimation/trades/flooring', role: 'hero', alt: 'Flooring installation' },
  { path: '/images/trades/bath-tile.jpg', route: '/estimation/trades/bath-tile', role: 'hero', alt: 'Bathroom tile finish work' },
  { path: '/images/trades/lumber-woodwork.jpg', route: '/estimation/trades/lumber-woodwork', role: 'hero', alt: 'Lumber and woodwork framing' },
  { path: '/images/trades/demolition.jpg', route: '/estimation/trades/demolition', role: 'hero', alt: 'Selective demolition' },
  { path: '/images/trades/ceiling-drywall.jpg', route: '/estimation/trades/ceiling-drywall', role: 'hero', alt: 'Ceiling and drywall installation' },
  { path: '/images/trades/landscaping.jpg', route: '/estimation/trades/landscaping', role: 'hero', alt: 'Landscaping and planting' },
  { path: '/images/trades/fencing.jpg', route: '/estimation/trades/fencing', role: 'hero', alt: 'Fence installation' },
];

export function registryPaths(): Set<string> {
  return new Set(IMAGE_REGISTRY.map((entry) => entry.path));
}
