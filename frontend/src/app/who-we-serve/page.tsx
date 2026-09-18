import Link from 'next/link';
import { AUDIENCE_CONTENT } from '@/lib/content';
import { CTA, PageHead, Photo, Spec } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ICO } from '@/lib/illustrations';
import { MotionReveal } from '../motion';

export const metadata = createMetadata({
  title: 'Who We Serve',
  description:
    'CSI & Design supports general contractors, subcontractors, heavy civil teams, MEP, structural, and HVAC contractors with trade-specific preconstruction support.',
  path: '/who-we-serve',
});

const AUDIENCE_IMAGES = [
  '/images/projects/industrial.jpg',
  '/images/divisions/estimation-design.jpg',
  '/images/projects/public-institutional.jpg',
  '/images/hero/engineering-hero.jpg',
  '/images/projects/residential-commercial.jpg',
  '/images/approach/building.jpg',
] as const;

export default function Who() {
  return (
    <>
      <PageHead
        eyebrow="Who we serve"
        title="Support shaped around your role in the bid"
        lede="From general contractors assembling complete bids to specialty subcontractors protecting margins under tight deadlines — precise takeoffs and dependable preconstruction support."
      />
      <section className="band">
        <div className="wrap stack-lg">
          {AUDIENCE_CONTENT.map((a, index) => {
            const reverse = index % 2 === 1;
            const image = AUDIENCE_IMAGES[index % AUDIENCE_IMAGES.length];
            return (
              <MotionReveal className={`audience-row${reverse ? ' audience-row-reverse' : ''}`} y={18} key={a.code}>
                <div className="stack">
                  <div
                    className="ico"
                    style={{ width: 48, height: 48, color: 'var(--cherry)' }}
                    dangerouslySetInnerHTML={{ __html: ICO[a.icon as keyof typeof ICO] }}
                  />
                  <div className="code">{a.code}</div>
                  <h2 style={{ fontSize: 'var(--s2)' }}>{a.name}</h2>
                  <p className="prose">{a.intro}</p>
                  <Spec title="Typical support" unit={a.code} items={a.items} />
                </div>
                <div className="media project-photo">
                  <Photo src={image} alt={`${a.name} — CSI & Design support`} fill sizes="(max-width: 1000px) 100vw, 42vw" />
                </div>
              </MotionReveal>
            );
          })}
          <div className="note">
            <b>Need a trade-specific estimation page?</b> Browse{' '}
            <Link href="/estimation/trades">singular estimation pages per trade</Link> or review our{' '}
            <Link href="/trades">CSI trade expertise</Link>.
          </div>
        </div>
      </section>
      <CTA
        title="Tell us what your team needs to decide"
        text="Share your role, project stage, scope, and timing so the first conversation starts in the right place."
      />
    </>
  );
}
