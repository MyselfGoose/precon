import { CTA, PageHead, PhoneLink, WhatsAppLink, Svg } from '../components';
import QuoteForm from './quote-form';
import { D } from '@/lib/illustrations';
import { BRAND, SITE_COPY } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Request a Construction Estimate',
  description:
    'Upload plans and request a construction estimate from QuantSult. Share project type, location, scope, and timing for a focused preconstruction conversation.',
  path: '/quote',
});

export default function Quote() {
  return (
    <>
      <PageHead
        eyebrow={SITE_COPY.cta.primary}
        title="A clear brief. A useful next step."
        lede="Four short steps: who you are, what you need, the scope you know, and a quick review. We use the brief to organize the conversation — formal work starts only with a written agreement."
        image="/images/hero/quote.jpg"
        imageAlt="Project plans ready for a quote request"
        priority
      />
      <section className="band">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 44, alignItems: 'start' }}>
            <QuoteForm />
            <aside className="stack-lg">
              <div className="stack">
                <div className="eyebrow">What happens next</div>
                <h3>Scope first. Commitment second.</h3>
                <p className="prose">
                  Your brief helps us see what is known, what is missing, which service fits, and which deadline
                  matters. We follow up with a clear next step — not a pressure pitch.
                </p>
              </div>
              <div className="stack">
                <div className="eyebrow">Prefer email or a call?</div>
                <a className="btn btn-ghost" href={`mailto:${BRAND.email}`} style={{ alignSelf: 'flex-start' }}>
                  {BRAND.email}
                </a>
                <PhoneLink className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
                  Call {BRAND.phoneDisplay}
                </PhoneLink>
                <WhatsAppLink className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
                  WhatsApp (optional) →
                </WhatsAppLink>
                <p className="prose">
                  The form with plan upload is the fastest path. Email and phone are equally welcome. WhatsApp remains
                  available if you prefer it.
                </p>
              </div>
              <div className="note">
                <b>Files we accept.</b> PDF, ZIP, or DWG up to 3.5 MB each (4 MB total). For larger sets, paste a
                plan-room or cloud link in the notes field on the files step.
              </div>
              <div className="draw">
                <Svg markup={D.concrete()} />
                <div className="draw-cap">
                  <b>What we do with it</b>
                  <span>Organized scope, assumptions, and next steps</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <CTA
        title="Need help before you fill this out?"
        text="Talk through the scope first, then send the information that will make the follow-up useful."
      />
    </>
  );
}
