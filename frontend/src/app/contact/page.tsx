import Link from 'next/link';
import { CTA, PageHead, PhoneLink, WhatsAppLink } from '../components';
import { BRAND, SITE_COPY } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';
import QuoteForm from '../quote/quote-form';

export const metadata = createMetadata({
  title: 'Contact',
  description: `Call or WhatsApp ${BRAND.phoneDisplay}, or submit a project request to QuantSult.`,
  path: '/contact',
});

export default function Contact() {
  return (
    <>
      <PageHead
        eyebrow={`Contact ${BRAND.name}`}
        title={
          <>
            Tell us about the <span className="accent-word">project.</span>
          </>
        }
        lede="Share the plans, location, and bid date. We will help identify the right scope and next step."
        image="/images/hero/contact.jpg"
        imageAlt="Contact QuantSult about estimation, design, or acquisition"
        priority
      />
      <section className="band">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 44, alignItems: 'start' }}>
            <QuoteForm submitLabel="Submit Project" />
            <aside className="contact-aside">
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
                <span className="k">Email</span>
                <a className="v" href={`mailto:${BRAND.email}`}>
                  {BRAND.email}
                </a>
                <span className="hint">Project teams across the United States</span>
              </div>
              <div className="contact-meta">
                <b>Business hours</b>
                {SITE_COPY.contact.hours}
              </div>
              <div className="contact-meta">
                <b>Response time</b>
                {SITE_COPY.contact.responseTime}
              </div>
              <div className="note">
                <b>Prefer a dedicated estimate page?</b> You can also use{' '}
                <Link href="/quote">{SITE_COPY.cta.primary}</Link> — same form, same team.
              </div>
            </aside>
          </div>
        </div>
      </section>
      <CTA
        title="Ready to make the next decision?"
        text="Upload your plans and start a project conversation built around the work."
        uploadSecondary
      />
    </>
  );
}
