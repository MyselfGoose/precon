import Link from 'next/link';
import { CTA, PageHead, PhoneLink, WhatsAppLink } from '../components';
import { BRAND } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Contact',
  description: `Call or WhatsApp ${BRAND.phoneDisplay}, or send a project request to CSI & Design.`,
  path: '/contact',
});

export default function Contact() {
  return (
    <>
      <PageHead
        eyebrow={`Contact ${BRAND.name}`}
        title="Bring the next project decision into focus"
        lede="Share the project information you have. We will help identify the right service, scope, and next step — whether you need an estimate, design package, or a property acquisition conversation."
      />
      <section className="band">
        <div className="wrap contact-grid">
          <div className="stack-lg">
            <div className="grid-2">
              <div className="contact-block">
                <span className="k">Phone</span>
                <PhoneLink className="v">{BRAND.phoneDisplay}</PhoneLink>
                <span className="hint">Call when the scope is easier to explain out loud</span>
              </div>
              <div className="contact-block">
                <span className="k">WhatsApp</span>
                <WhatsAppLink className="v">{BRAND.phoneDisplay}</WhatsAppLink>
                <span className="hint">Message us anytime at the same number</span>
              </div>
              <div className="contact-block">
                <span className="k">Project request</span>
                <Link className="v" href="/quote">
                  Request a Quote
                </Link>
                <span className="hint">Capture the project type, service, files, timing, and open questions</span>
              </div>
              <div className="contact-block">
                <span className="k">Email</span>
                <a className="v" href={`mailto:${BRAND.email}`}>
                  {BRAND.email}
                </a>
                <span className="hint">Serving project teams across the United States</span>
              </div>
            </div>
            <div className="note">
              <b>Have project information ready?</b> Use the <Link href="/quote">project request form</Link> to capture
              the scope, service, timing, and gaps in one place — or WhatsApp us at {BRAND.phoneDisplay}.
            </div>
          </div>
          <div className="media" style={{ minHeight: 420, position: 'relative', borderRadius: 4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero/home-hero.jpg"
              alt="American suburban home — CSI & Design estimation, design, and acquisition"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
      <CTA title="Ready to make the next decision?" text="Send your plans and start with a project conversation built around the work." />
    </>
  );
}
