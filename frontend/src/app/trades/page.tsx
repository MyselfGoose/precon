import Link from 'next/link';
import { TRADES } from '@/lib/data';
import { Button, CTA, PageHead, TradeTile } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'CSI MasterFormat Trades',
  description:
    'CSI MasterFormat division takeoffs across concrete, masonry, metals, finishes, MEP, earthwork, and related trades — with clear measure groups, samples, and exclusions.',
  path: '/trades',
});

export default function TradesPage() {
  return (
    <>
      <PageHead
        eyebrow="CSI MasterFormat"
        title={
          <>
            CSI MasterFormat divisions, every division <span className="accent-word">covered.</span>
          </>
        }
        lede="Estimates prepared in CSI MasterFormat. Clear organization, consistency, and professional documentation whether you need one specialty scope or a full-building workbook."
        image="/images/hero/trades-hub.jpg"
        imageAlt="Trade estimating and CSI MasterFormat takeoff work"
        priority
        actions={
          <>
            <Button href="/quote">Request an Estimate →</Button>
            <Link className="btn btn-ghost" href="/estimation/trades">
              Specialty trade estimating
            </Link>
          </>
        }
      />

      <section className="band" id="divisions">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">MasterFormat division takeoffs</div>
            <h2>Detailed CSI division pages</h2>
            <p className="prose">
              Each division page shows the work measured, the units reported, the sheets typically used, a sample
              output, exclusions, and questions to resolve before pricing. For specialty trade marketing pages
              (remodeling, glazing, roofing, and more), see{' '}
              <Link href="/estimation/trades">specialty trade estimating</Link>.
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
