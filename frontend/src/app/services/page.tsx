import Link from 'next/link';
import { CONTENT_SERVICES } from '@/lib/content';
import { ICO } from '@/lib/illustrations';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MotionItem, MotionStagger } from '../motion';
export const metadata = createMetadata({ title: 'Services', description: 'Explore estimating, drafting, engineering, visualization, and acquisition support from PreCon Ext.', path: '/services' });
export default function ServicesPage(){return <><PageHead eyebrow="Services" title="The work before construction, connected" lede="PreCon Ext brings estimating, documentation, engineering, visualization, and acquisition support into one coordinated preconstruction workflow."/><section className="band"><div className="wrap stack-lg"><MotionStagger className="grid-2">{CONTENT_SERVICES.map(s=><MotionItem className="motion-fill" key={s.slug}><Link className="card card-link" href={`/services/${s.slug}`}><div className="ico" dangerouslySetInnerHTML={{__html:ICO[s.ico as keyof typeof ICO]}}/><div className="code">{s.code}</div><h3>{s.name}</h3><p>{s.summary}</p><ul>{s.points.slice(0,3).map(p=><li key={p}>{p}</li>)}</ul></Link></MotionItem>)}</MotionStagger></div></section><CTA title="Start with the decision in front of you" text="Send the plans, property information, or scope you are working through and we will help define the next step." /></>}
