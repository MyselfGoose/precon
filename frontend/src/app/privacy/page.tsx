import { PRIVACY_SECTIONS } from '@/lib/content';
import { PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
export const metadata = createMetadata({ title: 'Privacy Policy', description: 'Read how PreCon Ext handles information shared through this website and project requests.', path: '/privacy' });
export default function Privacy(){return <><PageHead eyebrow="Legal" title="Privacy Policy" lede="How PreCon Ext collects, uses, and protects information about visitors, clients, and project teams."/><section className="band"><div className="wrap legal"><p className="meta">This policy applies to information shared through this website and project requests.</p><div className="toc"><b>Contents</b><ol>{PRIVACY_SECTIONS.map(([h])=><li key={h}>{h}</li>)}</ol></div>{PRIVACY_SECTIONS.map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}</div></section></>}
