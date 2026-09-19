import { FOOTER_NAV_ITEMS, type Trade, type Sample } from '@/lib/data';
import { D, ICO, flowArt } from '@/lib/illustrations';
import MobileNav from './mobile-nav';
import NavLinks from './nav-links';
import { BRAND, CONTENT_SERVICES, SITE_COPY } from '@/lib/content';
import { MotionButton, MotionItem, MotionReveal, MotionStagger } from './motion';
import Link from 'next/link';
import Image from 'next/image';

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${BRAND.name} home`}>
      <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="#8B2635" />
        <text
          x="20"
          y="24"
          textAnchor="middle"
          fill="#F5F0E6"
          fontFamily="Playfair Display, Georgia, serif"
          fontSize="14"
          fontWeight="700"
        >
          CS
        </text>
      </svg>
      <span className="brand-name">{BRAND.shortName}</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <Brand />
        <MobileNav />
        <NavLinks />
      </div>
    </header>
  );
}

export function PhoneLink({
  className,
  children,
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <a className={className} href={`tel:${BRAND.phoneRaw}`} style={style}>
      {children ?? BRAND.phoneDisplay}
    </a>
  );
}

export function WhatsAppLink({
  className,
  children,
  message,
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  message?: string;
  style?: React.CSSProperties;
}) {
  const url = message
    ? `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${BRAND.whatsapp}`;
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer" style={style}>
      {children ?? (
        <>
          <span aria-hidden="true" style={{ display: 'inline-flex', width: 18, height: 18 }}>
            {WHATSAPP_ICON}
          </span>
          WhatsApp {BRAND.phoneDisplay}
        </>
      )}
    </a>
  );
}

export function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={`https://wa.me/${BRAND.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp at ${BRAND.phoneDisplay}`}
    >
      {WHATSAPP_ICON}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">{BRAND.shortName}</div>
            <p className="foot-sub">{BRAND.descriptor}</p>
            <p className="foot-description" style={{ marginTop: 14 }}>
              {BRAND.description}
            </p>
            <p className="mono foot-phone" style={{ marginTop: 14 }}>
              <PhoneLink>{BRAND.phoneDisplay}</PhoneLink>
            </p>
            <p className="mono" style={{ marginTop: 6 }}>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </p>
            <div className="foot-social" aria-label="Contact and social">
              <WhatsAppLink className="wa-link">
                <span style={{ width: 20, height: 20, display: 'inline-flex' }} aria-hidden="true">
                  {WHATSAPP_ICON}
                </span>
                <span className="sr-only">WhatsApp</span>
              </WhatsAppLink>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-4V8.5z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.7 2.2 15.3 2.2 12s0-3.6.1-4.9c.1-3.2 1.6-4.8 4.9-4.9C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 6.9 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.7-2.6 6.9-6.9.1-1.3.1-1.7.1-5s0-3.7-.1-5C23.7 2.7 21.3.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-10.8a1.4 1.4 0 11-2.9 0 1.4 1.4 0 012.9 0z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              {CONTENT_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Estimation</h5>
            <ul>
              <li>
                <Link href="/estimation/general-construction">General construction</Link>
              </li>
              <li>
                <Link href="/estimation/industrial">Industrial projects</Link>
              </li>
              <li>
                <Link href="/estimation/public-projects">Public projects</Link>
              </li>
              <li>
                <Link href="/estimation/trades">Trade contractors</Link>
              </li>
              <li>
                <Link href="/markets">Markets &amp; sectors</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              {FOOTER_NAV_ITEMS.map(([name, href]) => (
                <li key={href}>
                  <Link href={href}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Get in touch</h5>
            <ul>
              <li>
                <PhoneLink>Call {BRAND.phoneDisplay}</PhoneLink>
              </li>
              <li>
                <WhatsAppLink>WhatsApp us</WhatsAppLink>
              </li>
              <li>
                <Link href="/quote">{SITE_COPY.cta.primary} →</Link>
              </li>
            </ul>
            <p style={{ marginTop: 18 }}>
              <Link href="/contact" style={{ color: '#fff', fontWeight: 600 }}>
                Build Smarter. Invest Better. →
              </Link>
            </p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 {BRAND.name}. All rights reserved.</span>
          <span>
            <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms &amp; Conditions</Link>
          </span>
          <span>Design. Build. Invest.</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHead({
  eyebrow,
  title,
  lede,
  crumb,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  crumb?: React.ReactNode;
}) {
  return (
    <header className="page-head">
      <MotionReveal className="wrap" y={18}>
        {crumb && <div className="crumb">{crumb}</div>}
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </MotionReveal>
    </header>
  );
}

export function Svg({ markup, className }: { markup: string; className?: string }) {
  return <div className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} />;
}

export function Button({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <MotionButton className="motion-inline">
      <Link className={`btn ${dark ? 'btn-on-dark' : 'btn-primary'}`} href={href}>
        {children}
      </Link>
    </MotionButton>
  );
}

export function CTA({
  title,
  text,
  secondary = true,
}: {
  title: string;
  text: string;
  secondary?: boolean;
}) {
  return (
    <section className="cta-band">
      <MotionReveal className="wrap inner" y={18}>
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row">
          <Button href="/quote">{SITE_COPY.cta.primary} →</Button>
          {secondary && (
            <MotionButton className="motion-inline">
              <PhoneLink className="btn btn-on-dark">{SITE_COPY.cta.secondary}</PhoneLink>
            </MotionButton>
          )}
        </div>
      </MotionReveal>
    </section>
  );
}

export function ServiceCard({
  service,
  full = false,
}: {
  service: { slug: string; code: string; ico: string; name: string; summary: string; details?: string; points?: string[] };
  full?: boolean;
}) {
  return (
    <MotionItem className="motion-fill">
      <Link className="card card-link" href={`/services/${service.slug}`}>
        <div className="ico" dangerouslySetInnerHTML={{ __html: ICO[service.ico as keyof typeof ICO] }} />
        <div className="code">{service.code}</div>
        <h3>{service.name}</h3>
        <p>{full ? service.details ?? service.summary : service.summary}</p>
        {full && service.points && (
          <ul>
            {service.points.slice(0, 3).map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </Link>
    </MotionItem>
  );
}

export function TradeTile({ trade }: { trade: Trade }) {
  return (
    <MotionItem className="motion-fill">
      <Link className="tile" href={`/trades/${trade.slug}`}>
        <div className="thumb">
          <Svg markup={D[trade.slug]()} />
        </div>
        <div className="body">
          <span className="div">DIVISION {trade.div}</span>
          <span className="nm">{trade.name}</span>
          <span className="sub">{trade.short}</span>
        </div>
      </Link>
    </MotionItem>
  );
}

export function Workbook({
  sample,
  tabs = ['Summary', 'Div 03', 'Exclusions'],
  active = 'Div 03',
}: {
  sample: Sample;
  tabs?: string[];
  active?: string;
}) {
  return (
    <MotionReveal className="win" y={16}>
      <div className="win-bar">
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <span className="t">{sample.title} — estimate.xlsx</span>
      </div>
      <div className="win-tabs" aria-label="Workbook sections">
        {tabs.map((t) => (
          <span className={t === active ? 'on' : ''} key={t} aria-current={t === active ? 'page' : undefined}>
            {t}
          </span>
        ))}
      </div>
      <div className="table-scroll">
        <table>
          <caption className="sr-only">{sample.title} estimate sample</caption>
          <thead>
            <tr>
              {sample.cols.map((c, i) => (
                <th className={i === 1 || i >= 4 ? 'n' : ''} key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sample.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((c, i) => (
                  <td className={i === 1 || i >= 4 ? 'n' : i === 3 ? 'ref' : ''} key={i}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="total">
              <th scope="row" colSpan={sample.cols.length - 3}>
                {sample.total[0]}
              </th>
              <td className="n">{sample.total[1]}</td>
              <td className="n">{sample.total[2]}</td>
              <td className="n">{sample.total[3]}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="sheet-foot">
        <strong>Basis:</strong> {sample.basis}
      </div>
    </MotionReveal>
  );
}

export function FAQ({ items, openFirst = true }: { items: [string, string][]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <details open={openFirst && i === 0} key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function Spec({ title, unit, items }: { title: string; unit: string; items: readonly string[] }) {
  return (
    <div className="spec">
      <div className="spec-h">
        <h4>{title}</h4>
        <span className="u">{unit}</span>
      </div>
      <ul>
        {items.map((i) => (
          <li key={i}>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DarkProcess({ teaser = false }: { teaser?: boolean }) {
  return (
    <section className={`band band-dark on-dark${teaser ? ' process-teaser' : ''}`}>
      <div className="wrap stack-lg">
        <MotionReveal className="stack" y={16}>
          <div className="eyebrow">{SITE_COPY.process.eyebrow}</div>
          <h2>{SITE_COPY.process.title}</h2>
          {teaser && (
            <p className="lede" style={{ color: '#C9BBB3', maxWidth: '52ch' }}>
              From the working set to a review-ready package — four clear steps.
            </p>
          )}
        </MotionReveal>
        {!teaser && (
          <MotionReveal className="flow" y={14}>
            <Svg markup={flowArt()} />
          </MotionReveal>
        )}
        <MotionStagger className="steps">
          {SITE_COPY.process.steps.map(([n, h, p], i) => (
            <MotionItem className="step" key={n}>
              <b>
                <span className="step-pulse" />
                {n}
              </b>
              <h4>{h}</h4>
              <p>{p}</p>
              <span
                className="step-progress"
                style={{ '--step-progress': `${(i + 1) * 25}%` } as React.CSSProperties}
              />
            </MotionItem>
          ))}
        </MotionStagger>
        {teaser && (
          <MotionReveal y={12}>
            <Link className="process-link" href="/how-it-works">
              See the full path →
            </Link>
          </MotionReveal>
        )}
      </div>
    </section>
  );
}

export function Photo({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (fill) {
    return (
      <Image
        className={className}
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? '100vw'}
        priority={priority}
        style={{ objectFit: 'cover' }}
      />
    );
  }
  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 800}
      sizes={sizes}
      priority={priority}
      style={{ width: '100%', height: 'auto' }}
    />
  );
}

export { ICO };
