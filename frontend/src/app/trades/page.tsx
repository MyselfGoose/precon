import Link from 'next/link';
import { CSI_TRADE_LIST, TRADES } from '@/lib/data';
import { getCsiTradeNavItems } from '@/lib/estimation';
import { Button, CTA, PageHead, TradeTile } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Trades',
  description:
    'CSI trade expertise across general construction, remodeling, restoration, MEP, structural, HVAC, and specialty trades, with detailed division takeoff pages.',
  path: '/trades',
});

const specialtyTrades = getCsiTradeNavItems(CSI_TRADE_LIST);

export default function TradesPage() {
  return (
    <>
      <PageHead
        eyebrow="CSI Trade Expertise"
        title={
          <>
            CSI trade expertise, every division <span className="accent-word">covered.</span>
          </>
        }
        lede="Estimates prepared in CSI MasterFormat. Clear organization, consistency, and professional documentation whether you need one specialty scope or a full-building workbook."
        image="/images/divisions/estimation-design.jpg"
        imageAlt="US construction crew estimating and coordinating on a job site"
        priority
        actions={
          <>
            <Button href="/estimation/trades">Browse specialty estimation →</Button>
            <Link className="btn btn-ghost" href="#divisions">
              Jump to division takeoffs
            </Link>
          </>
        }
      />

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
