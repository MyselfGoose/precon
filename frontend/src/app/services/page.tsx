import Image from 'next/image';
import Link from 'next/link';
import { CONTENT_SERVICES, ENGINEERING_SERVICES, FEATURED_PROJECTS, WHY_WORK_WITH_US } from '@/lib/content';
import { ICO } from '@/lib/illustrations';
import { Button, CTA, Photo } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MotionItem, MotionReveal, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Services',
  description:
    'Accurate designs, smarter decisions, stronger builds — architectural drawings, structural and MEP engineering, BIM, visualization, estimating, and property acquisition.',
  path: '/services',
});

export default function ServicesPage() {
  const designServices = CONTENT_SERVICES.filter((s) => s.slug !== 'acquisitions-investments');

  return (
    <>
      <section className="hero">
        <MotionReveal className="wrap hero-grid" y={24}>
          <div className="stack">
            <div className="eyebrow">Engineering &amp; Design</div>
            <h1>Accurate Designs. Smarter Decisions. Stronger Builds.</h1>
            <p className="lede">
              Code-conscious drawings, coordinated engineering, and bid-ready estimates — technical precision that
              helps contractors, developers, and owners move from concept to construction with confidence.
            </p>
            <div className="btn-row">
              <Button href="/quote">Request a Quote →</Button>
              <a className="btn btn-ghost" href="#services-list">
                View Our Services
              </a>
            </div>
            <p className="mono" style={{ color: 'var(--muted)', fontSize: '.78rem', letterSpacing: '.1em' }}>
              Design. Engineer. Build Better.
            </p>
          </div>
          <div className="media hero-photo">
            <Photo
              src="/images/hero/engineering-hero.jpg"
              alt="Modern commercial glass building representing engineering and design"
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 55vw"
            />
          </div>
        </MotionReveal>
      </section>

      <section className="band band-ground">
        <div className="wrap">
          <MotionStagger className="icon-strip">
            {ENGINEERING_SERVICES.map((service) => (
              <MotionItem className="item" key={service.title}>
                <div className="ico" dangerouslySetInnerHTML={{ __html: ICO[service.icon as keyof typeof ICO] }} />
                <span>{service.title}</span>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band" id="services-list">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            <div className="eyebrow">Our Engineering &amp; Design Services</div>
            <h2>Everything you need before construction starts.</h2>
            <p className="prose">
              From quantity takeoffs and cost estimating to BIM coordination, construction drawings, engineering
              support, and code-compliant documentation — a single, trusted partner for planning and design.
            </p>
          </MotionReveal>
          <div className="faq" style={{ maxWidth: '100%' }}>
            {designServices.map((service) => (
              <details key={service.slug} open={service.slug === 'estimating'}>
                <summary>{service.name}</summary>
                <p>{service.details}</p>
                <ul style={{ paddingLeft: 18, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 16 }}>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link className="btn btn-text" href={`/services/${service.slug}`}>
                  Review this service →
                </Link>
              </details>
            ))}
          </div>
          <div className="note">
            <b>Property Acquisition.</b> Looking for distressed assets, off-market deals, or strategic property
            opportunities? See our{' '}
            <Link href="/services/acquisitions-investments">Property Acquisition</Link> division.
          </div>
        </div>
      </section>

      <section className="band band-dark on-dark">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            <div className="eyebrow">Why Work With Us?</div>
            <h2>Clarity, compliance, and delivery you can plan around.</h2>
          </MotionReveal>
          <MotionStagger className="value-grid">
            {WHY_WORK_WITH_US.map((item) => (
              <MotionItem className="value-card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            <div className="eyebrow">Featured Projects</div>
            <h2>Work across markets and building types.</h2>
          </MotionReveal>
          <div className="project-grid">
            {FEATURED_PROJECTS.map((project) => (
              <article className="project-card" key={project.title}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1000px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <span className="label">{project.title}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Request an Estimate"
        text="Send your plans and tell us which trades, drawings, or engineering support you need. We will confirm scope and next steps."
      />
    </>
  );
}
