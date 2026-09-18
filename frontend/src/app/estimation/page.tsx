import Link from 'next/link';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ESTIMATION_HUBS, TRADE_BUBBLE_SUMMARIES } from '@/lib/estimation';
import { MotionItem, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Estimation Services',
  description:
    'CSI Format estimating for general construction, industrial projects, public work, and trade contractors — powered by proprietary market intelligence.',
  path: '/estimation',
});

export default function EstimationPage() {
  const hubs = ESTIMATION_HUBS.filter((h) => h.slug !== 'trades');
  return (
    <>
      <PageHead
        eyebrow="Estimation"
        title="Accurate takeoffs. Competitive bids. Protected margins."
        lede="Every estimate is prepared in CSI Format and enhanced by our proprietary data analytics platform — combining real-time supplier pricing, regional labor trends, historical project data, and market intelligence."
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
                  <div className="code">{hub.slug.toUpperCase().slice(0, 8)}</div>
                  <h3>{hub.name}</h3>
                  <p>{hub.lede}</p>
                  <span className="card-action">Open section →</span>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>
      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Trade contractors</div>
            <h2>Singular estimation pages per trade</h2>
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
                  <span className="card-action">Open trade page →</span>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
          <div className="note">
            <b>Why us?</b> Estimating isn&apos;t just about quantities — it&apos;s about intelligence. We help you win the right work at the right price.{' '}
            <Link href="/estimation/trades">View all trade estimation services →</Link>
          </div>
        </div>
      </section>
      <CTA title="Ready for a bid-ready estimate?" text="Send your plans and tell us the project type or trade. We will confirm scope, timing, and next steps." />
    </>
  );
}
