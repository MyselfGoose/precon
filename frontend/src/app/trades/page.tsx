import Link from 'next/link';
import { CSI_TRADE_LIST, TRADES } from '@/lib/data';
import { getCsiTradeNavItems } from '@/lib/estimation';
import { Button, CTA, PageHead, Photo, TradeTile } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MotionReveal, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Trades',
  description:
    'CSI trade expertise across general construction, remodeling, restoration, MEP, structural, HVAC, and specialty trades — with detailed division takeoff pages.',
  path: '/trades',
});

const specialtyTrades = getCsiTradeNavItems(CSI_TRADE_LIST);

export default function TradesPage() {
  return (
    <>
      <PageHead
        eyebrow="CSI Trade Expertise"
        title="Trade-specific estimating across every discipline"
        lede="Estimates prepared in CSI MasterFormat — clear organization, consistency, and professional documentation whether you need one specialty scope or a full-building workbook."
      />

      <section className="band">
        <div className="wrap stack-lg">
          <div className="split">
            <MotionReveal className="stack" y={16}>
              <div className="eyebrow">Two ways in</div>
              <h2>Specialty estimation pages, plus CSI MasterFormat division takeoffs</h2>
              <p className="prose">
                Use a specialty estimation page when you are pricing a trade scope from our CSI expertise list, or open a
                MasterFormat division page for measured units, sheet references, sample output, and exclusions.
              </p>
              <div className="btn-row">
                <Button href="/estimation/trades">Browse specialty estimation →</Button>
                <Link className="btn btn-ghost" href="#divisions">
                  Jump to division takeoffs
                </Link>
              </div>
            </MotionReveal>
            <MotionReveal className="media project-photo" delay={0.08} y={18}>
              <Photo
                src="/images/divisions/estimation-design.jpg"
                alt="Construction estimating and design coordination"
                fill
                sizes="(max-width: 1000px) 100vw, 48vw"
              />
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">CSI specialty estimation</div>
            <h2>Every trade in our expertise window</h2>
            <p className="prose">
              Each chip opens a dedicated estimation page or the matching public-project / general-construction category.
              Infrastructure specialties deep-link into Public Projects categories where that content already lives.
            </p>
          </div>
          <div className="trade-nav" aria-label="CSI specialty estimation trades">
            {specialtyTrades.map((trade) => (
              <Link key={trade.label} href={trade.href} className="trade-chip trade-chip-link" title={trade.label}>
                {trade.shortLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="divisions">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">MasterFormat division takeoffs</div>
            <h2>Detailed CSI division pages</h2>
            <p className="prose">
              Separate from the specialty estimation pages above: each division page shows the work measured, the units
              reported, the sheets typically used, a sample output, exclusions, and questions to resolve before pricing.
            </p>
          </div>
          <MotionStagger className="trades">
            {TRADES.map((t) => (
              <TradeTile trade={t} key={t.slug} />
            ))}
          </MotionStagger>
          <div className="note">
            <b>Working across divisions?</b> Full-building estimates combine the selected trades into one workbook with
            a summary tab, division tabs, shared assumptions, and a single exclusions list.
          </div>
        </div>
      </section>

      <CTA
        title="Send the set for one trade or the full building"
        text="Tell us which divisions matter, what stage the project is in, and when the bid or decision is due."
      />
    </>
  );
}
