import Link from 'next/link';
import {
  BRAND,
  getServicesForCategory,
  SERVICE_CATEGORIES,
  SITE_COPY,
} from '@/lib/content';
import { ICO } from '@/lib/illustrations';
import { CTA, PageHead, TrustReasons } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MotionItem, MotionReveal, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Services',
  description:
    'Preconstruction estimating, quantity takeoffs, design and engineering coordination, and visualization support for contractors and developers.',
  path: '/services',
});

export default function ServicesPage() {
  const primaryCategories = SERVICE_CATEGORIES.filter((category) => !category.secondary);
  const secondaryCategories = SERVICE_CATEGORIES.filter((category) => category.secondary);

  return (
    <>
      <PageHead
        eyebrow="Services"
        title={
          <>
            Preconstruction services that help you bid with{' '}
            <span className="accent-word">confidence.</span>
          </>
        }
        lede="Estimating, design coordination, and engineering support organized for contractors and developers — with investment and acquisition available when property decisions need construction intelligence."
        image="/images/hero/engineering-hero.jpg"
        imageAlt="Engineering and preconstruction coordination under one roof"
        priority
      />
      <section className="band">
        <div className="wrap stack-lg">
          {primaryCategories.map((category) => {
            const services = getServicesForCategory(category);
            return (
              <MotionReveal className="service-category" key={category.id} y={18}>
                <div className="service-category-head">
                  <div className="eyebrow">{category.label}</div>
                  <h2 style={{ fontSize: 'var(--s2)' }}>{category.label}</h2>
                  <p className="prose">{category.description}</p>
                </div>
                <MotionStagger className="grid-2">
                  {services.map((s) => (
                    <MotionItem className="motion-fill" key={s.slug}>
                      <Link className="card card-link" href={`/services/${s.slug}`}>
                        <div
                          className="ico"
                          dangerouslySetInnerHTML={{ __html: ICO[s.ico as keyof typeof ICO] }}
                        />
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
              </MotionReveal>
            );
          })}

          {secondaryCategories.map((category) => {
            const services = getServicesForCategory(category);
            return (
              <MotionReveal
                className="service-category is-secondary"
                key={category.id}
                y={18}
              >
                <div className="service-category-head">
                  <div className="eyebrow">{category.label}</div>
                  <h2 style={{ fontSize: 'var(--s2)' }}>{category.label}</h2>
                  <p className="prose">{category.description}</p>
                </div>
                <MotionStagger className="grid-2">
                  {services.map((s) => (
                    <MotionItem className="motion-fill" key={s.slug}>
                      <Link className="card card-link" href={`/services/${s.slug}`}>
                        <div
                          className="ico"
                          dangerouslySetInnerHTML={{ __html: ICO[s.ico as keyof typeof ICO] }}
                        />
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
              </MotionReveal>
            );
          })}

          <div className="note">
            <b>Markets and project types.</b> Commercial, residential, industrial, and public work are covered under{' '}
            <Link href="/who-we-serve">Who We Serve</Link>. For trade-by-trade estimating pages, open{' '}
            <Link href="/services/estimating">Estimating</Link> or browse{' '}
            <Link href="/estimation/trades">CSI trade estimation</Link>.
          </div>

          <div className="stack">
            <div className="eyebrow">Trust</div>
            <h2>Why Contractors Trust {BRAND.name}</h2>
            <p className="prose">
              Industry-standard organization, traceable quantities, and editable Excel deliverables.
            </p>
          </div>
          <TrustReasons compact />
        </div>
      </section>
      <CTA
        title="Start with the decision in front of you"
        text="Send the plans, property information, or scope you are working through and we will help define the next step."
      />
    </>
  );
}
