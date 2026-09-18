import Link from 'next/link';
import { CSI_TRADE_LIST, TRADES } from '@/lib/data';
import { CTA, PageHead, TradeTile } from '../components';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Trades',
  description:
    'CSI trade expertise across general construction, remodeling, restoration, MEP, structural, HVAC, and specialty trades — with detailed division takeoff pages.',
  path: '/trades',
});

export default function TradesPage() {
  return (
    <>
      <PageHead
        eyebrow="CSI Trade Expertise"
        title="Trade-specific estimating across every discipline"
        lede="Every project is unique, and every trade comes with its own scope, materials, labor requirements, and construction methods. Our estimates are prepared in accordance with CSI MasterFormat, ensuring clear organization, consistency, and professional documentation across every project."
      />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Our trades</div>
            <h2>Disciplines we estimate</h2>
            <p className="prose">
              Whether you&apos;re a general contractor assembling a complete bid or a specialty subcontractor pricing a single scope of work, we provide accurate, organized, and reliable estimates that help you bid with confidence.
            </p>
          </div>
          <div className="trade-nav" aria-label="CSI trades we support">
            {CSI_TRADE_LIST.map((trade) => (
              <span key={trade} className="trade-chip">
                {trade}
              </span>
            ))}
          </div>
          <div className="note">
            <b>Looking for singular estimation pages per trade?</b> Open our{' '}
            <Link href="/estimation/trades">trade contractor estimation section</Link> for remodeling, restoration, glazing, paving, roofing, HVAC, MEP, masonry, concrete, and more — each with what we estimate, what&apos;s included, and why contractors choose us.
          </div>
        </div>
      </section>
      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Division takeoffs</div>
            <h2>Detailed CSI division pages</h2>
            <p className="prose">
              Each division page shows the work measured, the units reported, the sheets typically used, a sample output, exclusions, and questions to resolve before pricing.
            </p>
          </div>
          <div className="trades">
            {TRADES.map((t) => (
              <TradeTile trade={t} key={t.slug} />
            ))}
          </div>
          <div className="note">
            <b>Working across divisions?</b> Full-building estimates combine the selected trades into one workbook with a summary tab, division tabs, shared assumptions, and a single exclusions list.
          </div>
        </div>
      </section>
      <CTA title="Send the set for one trade or the full building" text="Tell us which divisions matter, what stage the project is in, and when the bid or decision is due." />
    </>
  );
}
