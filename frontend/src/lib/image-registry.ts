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
  { path: '/images/projects/industrial.jpg', route: '/estimation/trades', role: 'hero', alt: 'Industrial trade estimation' },
  { path: '/images/hero/contact.jpg', route: '/contact', role: 'hero', alt: 'Contact CSI & Design' },
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
