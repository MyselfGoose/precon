import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONTENT_SERVICES } from '@/lib/content';
import { SERVICES } from '@/lib/data';
import { ICO } from '@/lib/illustrations';
import { CTA, PageHead, ServiceCard } from '../../components';

export function generateStaticParams(){return [...SERVICES.map(s=>({slug:s.slug})), ...CONTENT_SERVICES.map(s=>({slug:s.slug}))];}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const content=CONTENT_SERVICES.find(s=>s.slug===slug);
  const legacy=SERVICES.find(s=>s.slug===slug);
  if(!content&&!legacy) notFound();
  if(content) return <><PageHead eyebrow={`${content.code} · Service`} title={content.name} lede={content.summary} crumb={<><Link href="/services">Services</Link> / {content.name}</>}/><section className="band"><div className="wrap stack-lg"><div className="split" style={{alignItems:'start'}}><div className="stack"><div className="ico" style={{width:64,height:64}} dangerouslySetInnerHTML={{__html:ICO[content.ico as keyof typeof ICO]}}/><div className="code">{content.code}</div><h2 style={{fontSize:'var(--s2)'}}>What it is</h2><p className="prose">{content.details}</p></div><div className="spec"><div className="spec-h"><h4>What’s included</h4><span className="u">SCOPE</span></div><ul>{content.points.map(p=><li key={p}><span>{p}</span></li>)}</ul></div></div><div className="stack"><div className="eyebrow">Related services</div>  <div className="grid-2">{CONTENT_SERVICES.filter(s=>s.slug!==content.slug).slice(0,4).map(s=><Link className="card card-link" href={`/services/${s.slug}`} key={s.slug}><div className="ico" dangerouslySetInnerHTML={{__html:ICO[s.ico as keyof typeof ICO]}}/><div className="code">{s.code}</div><h3>{s.name}</h3><p>{s.summary}</p></Link>)}</div></div></div></section><CTA title={`Discuss ${content.name.toLowerCase()}`} text="Share the project information you have and we will help define a clear scope." /></>;
  return <><PageHead eyebrow={`${legacy!.code} · Service`} title={legacy!.name} lede={legacy!.short} crumb={<><Link href="/services">Services</Link> / {legacy!.name}</>}/><section className="band"><div className="wrap stack-lg"><div className="split" style={{alignItems:'start'}}><div className="stack"><h2 style={{fontSize:'var(--s2)'}}>What it is</h2><p className="prose">{legacy!.desc}</p><h3>Who it’s for</h3><p className="prose">{legacy!.who}</p></div><div className="spec"><div className="spec-h"><h4>What’s included</h4><span className="u">SCOPE</span></div><ul>{legacy!.points.map(p=><li key={p}><span>{p}</span></li>)}</ul></div></div><div className="grid-2">{SERVICES.filter(x=>x.slug!==legacy!.slug).map(o=><ServiceCard service={o} key={o.slug}/>)}</div></div></section><CTA title={`Need ${legacy!.name.toLowerCase()}?`} text="Send the project information and we will come back with a clear next step." /></>;
}
