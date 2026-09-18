import { PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { BRAND, TERMS_EFFECTIVE_DATE, TERMS_SECTIONS, type LegalSection } from '@/lib/content';

export const metadata = createMetadata({
  title: 'Terms of Service',
  description: 'Review the terms for using the CSI & Design website and understanding our professional construction support services.',
  path: '/terms',
});

function LegalBlock({ section }: { section: LegalSection }) {
  return (
    <section id={section.id}>
      <h2>{section.title}</h2>
      {section.paragraphs.map((p) => (
        <p key={p.slice(0, 64)}>{p}</p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul>
          {section.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {section.subsections?.map((sub, i) => (
        <div key={`${section.id}-sub-${i}`}>
          {sub.title ? <h3>{sub.title}</h3> : null}
          {sub.paragraphs?.map((p) => (
            <p key={p.slice(0, 64)}>{p}</p>
          ))}
          {sub.bullets && sub.bullets.length > 0 && (
            <ul>
              {sub.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

export default function Terms() {
  return (
    <>
      <PageHead
        eyebrow="Legal"
        title="Terms of Service"
        lede={`These Terms of Service outline the rules and regulations for using the ${BRAND.name} website. By accessing this website, you agree to comply with these terms.`}
      />
      <section className="band">
        <div className="wrap legal">
          <p className="meta">Effective Date: {TERMS_EFFECTIVE_DATE}</p>
          <p>
            Our Site provides information about our professional construction support services — including estimating, drafting, engineering documentation, and project coordination. Formal service engagements are governed by separate written agreements.
          </p>
          <div className="toc">
            <b>Table of Contents</b>
            <ol>
              {TERMS_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </div>
          {TERMS_SECTIONS.map((section) => (
            <LegalBlock key={section.id} section={section} />
          ))}
        </div>
      </section>
    </>
  );
}
