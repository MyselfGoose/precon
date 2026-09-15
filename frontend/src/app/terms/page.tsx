import { TERMS_SECTIONS } from '@/lib/content';
import { PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
export const metadata = createMetadata({ title: 'Terms of Service', description: 'Review the terms for using the PreCon Ext website and requesting professional project support.', path: '/terms' });
export default function Terms(){return <><PageHead eyebrow="Legal" title="Terms of Service" lede="The rules for using the PreCon Ext website and understanding the professional services described here."/><section className="band"><div className="wrap legal"><p className="meta">Formal engagements are governed by separate written agreements.</p><div className="toc"><b>Contents</b><ol>{TERMS_SECTIONS.map(([h])=><li key={h}>{h}</li>)}</ol></div>{TERMS_SECTIONS.map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}</div></section></>}
