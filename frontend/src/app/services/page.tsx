import Link from 'next/link';
import { CONTENT_SERVICES, SITE_COPY } from '@/lib/content';
import { ICO } from '@/lib/illustrations';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MotionItem, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Services',
  description:
    'Estimating, architectural drawings, MEP engineering, structural engineering, 3D visualization, and property acquisition, all under one roof.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHead
        eyebrow="Services"
        title={
          <>
            Every essential preconstruction service under one <span className="accent-word">roof.</span>
          </>
        }
        lede="Estimating, drawings, engineering, visualization, and property acquisition. One partner for planning, documentation, and the decisions before construction."
        image="/images/hero/engineering-hero.jpg"
        imageAlt="Engineering and preconstruction coordination under one roof"
        priority
      />
      <section className="band">
        <div className="wrap stack-lg">
          <MotionStagger className="grid-2">
            {CONTENT_SERVICES.map((s) => (
              <MotionItem className="motion-fill" key={s.slug}>
                <Link className="card card-link" href={`/services/${s.slug}`}>
                  <div className="ico" dangerouslySetInnerHTML={{ __html: ICO[s.ico as keyof typeof ICO] }} />
                  <div className="code">{s.code}</div>
                  <h3>{s.name}</h3>
                  <p>{s.summary}</p>
                  <ul>
                    {s.points.slice(0, 3).map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <span className="card-action">{SITE_COPY.cta.reviewService}</span>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
          <div className="note">
            <b>Markets We Serve.</b> Residential, commercial, industrial, government &amp; public, infrastructure
            &amp; civil, and hospitality &amp; recreation. See <Link href="/markets">Markets We Serve</Link>.
            For trade-by-trade estimation pages, open <Link href="/estimation">Estimation</Link>.
          </div>
        </div>
      </section>
      <CTA
        title="Start with the decision in front of you"
        text="Send the plans, property information, or scope you are working through and we will help define the next step."
      />
    </>
  );
}
