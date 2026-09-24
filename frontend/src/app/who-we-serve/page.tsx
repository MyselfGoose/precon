import Link from 'next/link';
import { AUDIENCE_CONTENT } from '@/lib/content';
import { CTA, PageHead, Spec } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ICO } from '@/lib/illustrations';
import { MotionReveal } from '../motion';

export const metadata = createMetadata({
  title: 'Who We Serve',
  description:
    'CSI & Design supports general contractors, subcontractors, heavy civil teams, MEP, structural, and HVAC contractors with trade-specific preconstruction support.',
  path: '/who-we-serve',
});

export default function Who() {
  return (
    <>
      <PageHead
        eyebrow="Who we serve"
        title={
          <>
            Support built around your role in the <span className="accent-word">bid.</span>
          </>
        }
        lede="From general contractors assembling complete bids to specialty subcontractors protecting margins under tight deadlines. Precise takeoffs and dependable preconstruction support."
        image="/images/hero/who-we-serve.jpg"
        imageAlt="Construction professionals reviewing plans on a job site"
        priority
      />
      <section className="band">
        <div className="wrap stack-lg">
          {AUDIENCE_CONTENT.map((a) => (
            <MotionReveal className="stack audience-block" y={18} key={a.code}>
              <div
                className="ico"
                style={{ width: 48, height: 48, color: 'var(--cherry)' }}
                dangerouslySetInnerHTML={{ __html: ICO[a.icon as keyof typeof ICO] }}
              />
              <div className="code">{a.code}</div>
              <h2 style={{ fontSize: 'var(--s2)' }}>{a.name}</h2>
              <p className="prose">{a.intro}</p>
              <p className="prose">{a.details}</p>
              <Spec title="Typical support" unit={a.code} items={a.items} />
            </MotionReveal>
          ))}
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
