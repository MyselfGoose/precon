import Link from 'next/link';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ESTIMATION_HUBS, TRADE_BUBBLE_SUMMARIES } from '@/lib/estimation';
import { SITE_COPY } from '@/lib/content';
import { MotionItem, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Estimation Services',
  description:
    'CSI Format estimating for general construction, industrial projects, public work, and trade contractors, powered by proprietary market intelligence.',
  path: '/estimation',
});

export default function EstimationPage() {
  const hubs = ESTIMATION_HUBS.filter((h) => h.slug !== 'trades');
  return (
    <>
      <PageHead
        eyebrow="Estimation"
        title={
          <>
            Accurate takeoffs. Competitive bids. Protected <span className="accent-word">margins.</span>
          </>
        }
        lede="We provide detailed quantity takeoffs, trade-specific estimates, and market-driven pricing that help subcontractors bid faster, protect their margins, and secure more profitable work. Every estimate is prepared in CSI Format and enhanced by our proprietary data analytics platform."
        image="/images/projects/residential-commercial.jpg"
        imageAlt="Commercial and residential construction representing CSI Format estimating"
        priority
      />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">By project type</div>
            <h2>Start with the work you bid</h2>
          </div>
          <MotionStagger className="grid-3">
            {hubs.map((hub) => (
              <MotionItem className="motion-fill" key={hub.slug}>
                <Link className="card card-link" href={`/estimation/${hub.slug}`}>
                  <div className="code">{hub.code}</div>
                  <h3>{hub.name}</h3>
                  <p>{hub.lede}</p>
                  <span className="card-action">{SITE_COPY.cta.viewDetails}</span>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>
      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">CSI Trade Expertise</div>
            <h2>CSI Trades</h2>
            <p className="prose">
              Detailed quantity takeoffs, trade-specific estimates, and market-driven pricing that help subcontractors bid faster, protect their margins, and secure more profitable work.
            </p>
          </div>
          <MotionStagger className="grid-2">
            {TRADE_BUBBLE_SUMMARIES.map((trade) => (
              <MotionItem className="motion-fill" key={trade.slug}>
                <Link className="card card-link" href={`/estimation/trades/${trade.slug}`}>
                  <h3>{trade.name}</h3>
                  <p>{trade.summary}</p>
                  <span className="card-action">{SITE_COPY.cta.openTrade}</span>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
          <div className="note">
            <b>Why us?</b> Estimating starts with quantities. Intelligence wins the bid. We help you win the right work at the right price.{' '}
            <Link href="/estimation/trades">View all trade estimation services →</Link>
          </div>
        </div>
      </section>
      <CTA title="Ready for a bid-ready estimate?" text="Send your plans and tell us the project type or trade. We will confirm scope, timing, and next steps." />
    </>
  );
}
