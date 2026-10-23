import Link from 'next/link';
import { CTA, PageHead, PhoneLink, WhatsAppLink } from '../components';
import { BRAND, SITE_COPY, isUnsetBrandValue } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';
import ContactForm from './contact-form';

export const metadata = createMetadata({
  title: 'Contact Construction Estimating Team',
  description: `Call or WhatsApp ${BRAND.phoneDisplay}, or send a short project inquiry to QuantSult. Serving project teams across the United States.`,
  path: '/contact',
});

export default function Contact() {
  const showLegalName = !isUnsetBrandValue(BRAND.legalName);

  return (
    <>
      <PageHead
        eyebrow={`Contact ${BRAND.name}`}
        title={
          <>
            Tell us about the <span className="accent-word">project.</span>
          </>
        }
        lede="Name, email, project type, bid due date, and a plans or plan-room link — we will help identify the right next step."
        image="/images/hero/contact.jpg"
        imageAlt="Contact QuantSult about estimating, design, or acquisition"
        priority
      />
      <section className="band">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 44, alignItems: 'start' }}>
            <ContactForm />
            <aside className="contact-aside">
              {showLegalName ? (
                <div className="contact-block">
                  <span className="k">Legal name</span>
                  <span className="v">{BRAND.legalName}</span>
                  <span className="hint">{BRAND.serviceAreaLine}</span>
                </div>
              ) : (
                <div className="contact-block">
                  <span className="k">Service area</span>
                  <span className="v">{BRAND.serviceArea}</span>
                  <span className="hint">{BRAND.serviceAreaLine}</span>
                </div>
              )}
              <div className="contact-block">
                <span className="k">Phone</span>
                <PhoneLink className="v">{BRAND.phoneDisplay}</PhoneLink>
                <span className="hint">{SITE_COPY.contact.hours}</span>
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
                <span className="hint">
                  {BRAND.name} operates at {BRAND.website.replace(/^https?:\/\//, '')}
                </span>
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
                <b>Need a full estimate brief?</b> Use{' '}
                <Link href="/quote">{SITE_COPY.cta.primary}</Link> for the detailed four-step quote form.
              </div>
            </aside>
          </div>
        </div>
      </section>
      <CTA
        title="Ready to make the next decision?"
        text="Start with a short contact message, or open the full estimate request when you have the working set ready."
        uploadSecondary
      />
    </>
  );
}
