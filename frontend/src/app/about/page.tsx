import Link from 'next/link';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ABOUT_CONTENT, BRAND } from '@/lib/content';
import { MotionReveal } from '../motion';

export const metadata = createMetadata({
  title: 'About QuantSult Preconstruction',
  description:
    'Learn how QuantSult brings estimating, design coordination, and construction documentation together for U.S. contractors and developers.',
  path: '/about',
});

export default function About() {
  const { biddingEdge } = ABOUT_CONTENT;

  return (
    <>
      <PageHead
        eyebrow={`About ${BRAND.name}`}
        title={
          <>
            Preconstruction, clearly <span className="accent-word">organized.</span>
          </>
        }
        lede={ABOUT_CONTENT.lede}
        image="/images/approach/building.jpg"
        imageAlt="Commercial construction coordination for QuantSult preconstruction partnership"
        priority
      />
      <section className="band band-ground">
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

          <p className="prose about-explore">
            Review standards on the homepage{' '}
            <Link href="/#why-trust">trust section</Link>, explore{' '}
            <Link href="/services/estimating">estimating</Link>, <Link href="/services">services</Link>, or{' '}
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
