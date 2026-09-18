import Image from 'next/image';
import Link from 'next/link';
import { ICO } from '@/lib/illustrations';
import { Button, CTA, Photo } from './components';
import {
  ACQUISITION_LIST,
  BRAND,
  ESTIMATION_DESIGN_LIST,
  HOME_DIVISIONS,
  HOME_PILLARS,
  HOME_STATS,
} from '@/lib/content';
import { createMetadata } from '@/lib/metadata';
import { MotionItem, MotionReveal, MotionStagger } from './motion';

export const metadata = createMetadata({
  title: 'Preconstruction Solutions for a Stronger Tomorrow',
  description:
    'From detailed estimates and architectural design to strategic property acquisition — CSI & Design provides the expertise, data, and relationships to move your project from vision to value.',
  path: '/',
});

export default function Home() {
  return (
    <>
      <section className="hero">
        <MotionReveal className="wrap hero-grid" y={28}>
          <div className="stack">
            <div className="eyebrow">Precision · Insight · Results</div>
            <h1>
              Preconstruction Solutions for a Stronger <span className="accent-word">Tomorrow.</span>
            </h1>
            <p className="lede">
              From detailed estimates and architectural design to strategic property acquisition — we provide the
              expertise, data, and relationships to move your project from vision to value.
            </p>
            <div className="btn-row">
              <Button href="/quote">Request an Estimate →</Button>
              <Link className="btn btn-ghost" href="/services">
                Explore Our Services
              </Link>
            </div>
          </div>
          <MotionReveal className="hero-art media hero-photo" delay={0.12} y={18}>
            <Photo
              src="/images/hero/home-hero.jpg"
              alt="Modern American commercial architecture at sunset"
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 55vw"
            />
          </MotionReveal>
        </MotionReveal>
      </section>

      <section className="band">
        <div className="wrap">
          <MotionStagger className="pillars">
            {HOME_PILLARS.map((pillar) => (
              <MotionItem className="pillar" key={pillar.title}>
                <div className="ico" dangerouslySetInnerHTML={{ __html: ICO[pillar.icon as keyof typeof ICO] }} />
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band band-dark on-dark">
        <div className="wrap stack-lg">
          <MotionReveal className="split" y={18}>
            <div className="stack">
              <div className="eyebrow">Our Divisions</div>
              <h2>Two Paths. One Strategic Advantage.</h2>
              <p className="prose">
                Estimation and design give you buildable clarity. Property acquisition turns the right assets into
                long-term value. Together, they create a single partner for decisions that matter.
              </p>
              <div className="btn-row">
                <Link className="btn btn-on-dark" href="/services">
                  Learn More →
                </Link>
              </div>
            </div>
            <div />
          </MotionReveal>
          <MotionStagger className="division-grid">
            {HOME_DIVISIONS.map((division, index) => (
              <MotionItem key={division.title}>
                <Link
                  className={`division-card ${index === 0 ? 'cherry' : 'rose'}`}
                  href={division.href}
                >
                  <Image
                    src={division.image}
                    alt={division.title}
                    fill
                    sizes="(max-width: 1000px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="overlay" aria-hidden="true" />
                  <span className="body">
                    <h3>{division.title}</h3>
                    <p>{division.description}</p>
                    <span className="card-action" style={{ color: '#fff' }}>
                      {division.cta} →
                    </span>
                  </span>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            <div className="eyebrow">Experience</div>
            <h2>Built on Experience.</h2>
          </MotionReveal>
          <div className="stats-light">
            {HOME_STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <b>{stat.value}</b>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            <div className="eyebrow">What We Deliver</div>
            <h2>Estimation, design, and acquisition — clearly defined.</h2>
          </MotionReveal>
          <div className="service-lists">
            <article className="service-list-card">
              <div className="media">
                <Photo
                  src="/images/divisions/estimation-design.jpg"
                  alt="Construction site representing estimation and design"
                  fill
                  sizes="(max-width: 1000px) 100vw, 50vw"
                />
              </div>
              <div className="body">
                <h3>Estimation &amp; Design</h3>
                <ul>
                  {ESTIMATION_DESIGN_LIST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="btn btn-primary" href="/quote" style={{ alignSelf: 'flex-start' }}>
                  Request an Estimate →
                </Link>
              </div>
            </article>
            <article className="service-list-card">
              <div className="media">
                <Photo
                  src="/images/divisions/property-acquisition.jpg"
                  alt="Modern residential property for acquisition"
                  fill
                  sizes="(max-width: 1000px) 100vw, 50vw"
                />
              </div>
              <div className="body">
                <h3>Property Acquisition</h3>
                <ul>
                  {ACQUISITION_LIST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  className="btn btn-primary"
                  href="/services/acquisitions-investments"
                  style={{ alignSelf: 'flex-start', background: 'var(--ebony)', borderColor: 'var(--ebony)' }}
                >
                  Discuss Opportunities →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="tagline-band">
        <div className="wrap">
          <h2>Design. Build. Invest.</h2>
        </div>
      </section>

      <CTA
        title="Ready to move your project forward?"
        text={`Share your plans or property details with ${BRAND.name}. We will help identify the right next step — estimate, design package, or acquisition conversation.`}
      />
    </>
  );
}
