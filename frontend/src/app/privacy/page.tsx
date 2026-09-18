import { PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { BRAND, PRIVACY_EFFECTIVE_DATE, PRIVACY_SECTIONS, type LegalSection } from '@/lib/content';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'Learn how CSI & Design collects, uses, and protects your personal information.',
  path: '/privacy',
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

export default function Privacy() {
  return (
    <>
      <PageHead
        eyebrow="Legal"
        title="Privacy Policy"
        lede={`Your privacy matters to us. Learn how ${BRAND.name} collects, uses, and protects your personal information.`}
      />
      <section className="band">
        <div className="wrap legal">
          <p className="meta">Effective Date: {PRIVACY_EFFECTIVE_DATE}</p>
          <p>
            {BRAND.name} is committed to safeguarding your personal data. This policy outlines what information we collect, why we collect it, how it is used and protected, and the rights you have regarding your data. We do not sell your personal information to third parties.
          </p>
          <div className="toc">
            <b>Table of Contents</b>
            <ol>
              {PRIVACY_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </div>
          {PRIVACY_SECTIONS.map((section) => (
            <LegalBlock key={section.id} section={section} />
          ))}
        </div>
      </section>
    </>
  );
}
