import Link from 'next/link';
import { CTA, PageHead, Photo } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ABOUT_CONTENT, BRAND } from '@/lib/content';
import { MotionItem, MotionReveal, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'About',
  description:
    'Learn how CSI & Design brings every essential preconstruction service under one roof — estimating, design coordination, and construction documentation.',
  path: '/about',
});

export default function About() {
  return (
    <>
      <PageHead
        eyebrow={`About ${BRAND.name}`}
        title={ABOUT_CONTENT.lede}
        lede="A single, trusted partner for planning, estimating, design coordination, and construction documentation."
      />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="split">
            <MotionReveal className="stack" y={16}>
              <p className="prose">{ABOUT_CONTENT.paragraphs[0]}</p>
              <p className="prose">{ABOUT_CONTENT.paragraphs[1]}</p>
            </MotionReveal>
            <MotionReveal className="media project-photo" delay={0.08} y={18}>
              <Photo
                src="/images/approach/building.jpg"
                alt="CSI & Design preconstruction partnership"
                fill
                sizes="(max-width: 1000px) 100vw, 48vw"
              />
            </MotionReveal>
          </div>

          <div className="stack">
            <div className="eyebrow">Why contractors choose us</div>
            <h2>Built around accuracy, speed, and accountability</h2>
          </div>
          <MotionStagger className="reasons">
            {ABOUT_CONTENT.benefits.map(([code, title, text]) => (
              <MotionItem className="reason" key={code}>
                <div className="code">{code}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </MotionItem>
            ))}
          </MotionStagger>

          <div className="grid-2">
            <div className="stack">
              <h3>How we work</h3>
              <p className="prose">{ABOUT_CONTENT.paragraphs[2]}</p>
              <p className="prose">
                Explore <Link href="/estimation">estimation</Link>, <Link href="/services">services</Link>, or{' '}
                <Link href="/how-it-works">how it works</Link>.
              </p>
            </div>
            <div className="note">
              <b>Built around your project.</b> Whether you are bidding, planning a development, evaluating a property,
              or coordinating a technical package, we shape the support around the decisions in front of you.
            </div>
          </div>
        </div>
      </section>
      <CTA
        title="Bring the next project into focus"
        text="Share the information you have and we will help identify the right starting point."
      />
    </>
  );
}
