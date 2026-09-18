import { AUDIENCE_CONTENT } from '@/lib/content';
import { CTA, PageHead, Spec } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ICO } from '@/lib/illustrations';
import Link from 'next/link';

export const metadata = createMetadata({
  title: 'Who We Serve',
  description:
    'PreCon Ext supports general contractors, subcontractors, heavy civil teams, MEP, structural, and HVAC contractors with trade-specific preconstruction support.',
  path: '/who-we-serve',
});

export default function Who() {
  return (
    <>
      <PageHead
        eyebrow="Who we serve"
        title="Support shaped around your role in the bid"
        lede="From general contractors assembling complete bids to specialty subcontractors protecting margins under tight deadlines, we provide precise quantity takeoffs and dependable preconstruction support."
      />
      <section className="band">
        <div className="wrap stack-lg">
          {AUDIENCE_CONTENT.map((a) => (
            <div className="split" style={{ alignItems: 'start' }} key={a.code}>
              <div className="stack">
                <div className="ico" style={{ width: 56, height: 56 }} dangerouslySetInnerHTML={{ __html: ICO[a.icon as keyof typeof ICO] }} />
                <div className="code">{a.code}</div>
                <h2 style={{ fontSize: 'var(--s2)' }}>{a.name}</h2>
                <p className="prose">{a.intro}</p>
                <p className="prose">{a.details}</p>
              </div>
              <Spec title="Typical support" unit={a.code} items={a.items} />
            </div>
          ))}
          <div className="note">
            <b>Need a trade-specific estimation page?</b> Browse{' '}
            <Link href="/estimation/trades">singular estimation pages per trade</Link> or review our{' '}
            <Link href="/trades">CSI trade expertise</Link>.
          </div>
        </div>
      </section>
      <CTA title="Tell us what your team needs to decide" text="Share your role, project stage, scope, and timing so the first conversation starts in the right place." />
    </>
  );
}
