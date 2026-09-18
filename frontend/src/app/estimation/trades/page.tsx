import Link from 'next/link';
import { CTA, PageHead } from '../../components';
import { createMetadata } from '@/lib/metadata';
import { getEstimationHub, TRADE_BUBBLE_SUMMARIES } from '@/lib/estimation';
import { MotionItem, MotionStagger } from '../../motion';

export const metadata = createMetadata({
  title: 'Trade Contractor Estimation',
  description:
    'Trade-specific CSI Format estimates for remodeling, restoration, glazing, paving, roofing, HVAC, MEP, masonry, concrete, and more.',
  path: '/estimation/trades',
});

export default function TradeEstimationIndex() {
  const hub = getEstimationHub('trades');
  return (
    <>
      <PageHead
        eyebrow="Estimation · Trade contractors"
        title={hub?.name ?? 'Trade Contractors'}
        lede={hub?.lede}
        crumb={
          <>
            <Link href="/estimation">Estimation</Link> / Trade contractors
          </>
        }
      />
      <section className="band">
        <div className="wrap stack-lg">
          {hub?.intro[0] && <p className="prose">{hub.intro[0]}</p>}
          <MotionStagger className="grid-2">
            {TRADE_BUBBLE_SUMMARIES.map((trade) => (
              <MotionItem className="motion-fill" key={trade.slug}>
                <Link className="card card-link" href={`/estimation/trades/${trade.slug}`}>
                  <h3>{trade.name}</h3>
                  <p>{trade.summary}</p>
                  <span className="card-action">Open separate page →</span>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
          {hub?.whyUs && (
            <div className="note">
              <b>Why us?</b> {hub.whyUs}
            </div>
          )}
        </div>
      </section>
      <CTA title="Request a trade-specific estimate" text="Tell us your trade, project location, and bid date — then send the sheets that matter." />
    </>
  );
}
