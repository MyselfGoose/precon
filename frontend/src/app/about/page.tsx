import Link from 'next/link';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ABOUT_CONTENT, BRAND } from '@/lib/content';
import { MotionItem, MotionReveal, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'About',
  description:
    'Learn how QuantSult brings every essential preconstruction service under one roof: estimating, design coordination, and construction documentation.',
  path: '/about',
});

export default function About() {
  const otherBenefits = ABOUT_CONTENT.benefits.filter(([code]) => code !== 'BID EDGE');
  const { biddingEdge } = ABOUT_CONTENT;

  return (
    <>
      <PageHead
        eyebrow={`About ${BRAND.name}`}
        title={
          <>
            Preconstruction, under one <span className="accent-word">roof.</span>
          </>
        }
        lede={ABOUT_CONTENT.lede}
        image="/images/approach/building.jpg"
        imageAlt="American Colonial-style home: QuantSult preconstruction partnership"
        priority
      />
      <section className="band">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            {ABOUT_CONTENT.paragraphs.map((paragraph) => (
              <p className="prose" key={paragraph.slice(0, 48)}>
                {paragraph}
              </p>
            ))}
          </MotionReveal>

          <MotionReveal className="bidding-edge" y={20}>
            <div className="bidding-edge-glow" aria-hidden="true" />
            <div className="bidding-edge-inner">
              <div className="bidding-edge-meta">
                <span className="code">{biddingEdge.code}</span>
                <span className="bidding-edge-spark" aria-hidden="true" />
              </div>
              <h2>{biddingEdge.title}</h2>
              <p className="bidding-edge-lede">{biddingEdge.lede}</p>
              <p>{biddingEdge.body}</p>
            </div>
          </MotionReveal>

          <div className="stack">
            <div className="eyebrow">Why choose us</div>
            <h2>What sets our preconstruction support apart</h2>
          </div>
          <MotionStagger className="reasons">
            {otherBenefits.map(([code, title, text]) => (
              <MotionItem className="reason" key={code}>
                <div className="code">{code}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </MotionItem>
            ))}
          </MotionStagger>

          <p className="prose">
            Explore <Link href="/services/estimating">estimating</Link>, <Link href="/services">services</Link>, or{' '}
            <Link href="/how-it-works">how it works</Link>.
          </p>
        </div>
      </section>
      <CTA
        title="Ready to work with a single preconstruction partner?"
        text="Share the project information you have and we will help identify the right starting point."
      />
    </>
  );
}
