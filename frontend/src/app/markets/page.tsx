import Link from 'next/link';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MARKETS_CONTENT, MARKET_SECTORS } from '@/lib/content';
import { MotionItem, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Markets & Sectors',
  description:
    'CSI & Design delivers coordinated architectural, structural, MEP, and estimating solutions across residential, commercial, industrial, government, infrastructure, and hospitality markets.',
  path: '/markets',
});

export default function MarketsPage() {
  return (
    <>
      <PageHead eyebrow="Markets & Sectors" title={MARKETS_CONTENT.title} lede={MARKETS_CONTENT.lede} />
      <section className="band">
        <div className="wrap stack-lg">
          <MotionStagger className="grid-3">
            {MARKET_SECTORS.map((sector) => (
              <MotionItem className="card motion-fill" key={sector.slug}>
                <div className="code">{sector.slug.toUpperCase().slice(0, 8)}</div>
                <h3>{sector.name}</h3>
                <p>{sector.summary}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>
      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Integrated delivery</div>
            <h2>{MARKETS_CONTENT.coordinationTitle}</h2>
          </div>
          <div className="stack">
            {MARKETS_CONTENT.coordinationBody.map((p) => (
              <p className="prose" key={p.slice(0, 48)}>
                {p}
              </p>
            ))}
          </div>
          <div className="note">
            <b>One accountable team.</b> {MARKETS_CONTENT.closing}
          </div>
          <p className="prose">
            Looking for trade-specific estimating? Explore our{' '}
            <Link href="/estimation">estimation services</Link> or review{' '}
            <Link href="/services">construction drawings and engineering</Link>.
          </p>
        </div>
      </section>
      <CTA
        title="Tell us about your market and project"
        text="Share the sector, project type, and decision in front of you — we will define the right coordinated package."
      />
    </>
  );
}
