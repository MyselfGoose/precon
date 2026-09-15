'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { TRADES } from '@/lib/data';
import { BRAND } from '@/lib/content';

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { setError('Please complete the required fields and consent.'); form.reportValidity(); return; }
    setError(''); setSent(true);
  }
  if (sent) return <div className="success-card"><div className="ico">✓</div><h2>Your project brief is ready.</h2><p>Thanks for organizing the scope. Keep this information available for your project conversation, and a PreCon Ext team member can use it to define the right next step. For urgent questions, call <a href="tel:+18005550100">{BRAND.phone}</a>.</p><Link className="btn btn-primary" href="/">Back to home</Link></div>;
  return <form className="form" onSubmit={submit}>
    <div className="field"><label htmlFor="q-name">Your name</label><input id="q-name" name="name" required type="text" placeholder="Full name"/></div>
    <div className="field"><label htmlFor="q-company">Company</label><input id="q-company" name="company" type="text" placeholder="Company name"/></div>
    <div className="field"><label htmlFor="q-email">Email</label><input id="q-email" name="email" required type="email" placeholder="you@company.com"/></div>
    <div className="field"><label htmlFor="q-phone">Phone</label><input id="q-phone" name="phone" type="tel" placeholder="(555) 555-5555"/></div>
    <div className="field"><label htmlFor="q-role">I am a</label><select id="q-role" name="role"><option>General contractor</option><option>Subcontractor</option><option>Owner / developer</option><option>Architect / engineer</option><option>Investor</option><option>Other project team member</option></select></div>
    <div className="field"><label htmlFor="q-type">Project type</label><select id="q-type" name="type"><option>Commercial</option><option>Industrial / warehouse</option><option>Multi-family</option><option>Residential</option><option>Public / infrastructure</option><option>Hospitality / recreation</option></select></div>
    <div className="field"><label htmlFor="q-trade">Divisions or services needed</label><select id="q-trade" name="trade" multiple size={5}>{TRADES.map(t=><option key={t.slug}>Div {t.div} — {t.name}</option>)}<option>Architectural drawings</option><option>MEP / structural engineering</option><option>BIM / visualization</option><option>Acquisition analysis</option><option>Full project support</option></select><span className="hint">Hold Ctrl / Cmd to select several.</span></div>
    <div className="field"><label htmlFor="q-state">Project location</label><input id="q-state" name="state" type="text" placeholder="City, State"/></div>
    <div className="field"><label htmlFor="q-due">Important date</label><input id="q-due" name="due" type="date"/><span className="hint">Bid, design, acquisition, or decision date.</span></div>
    <div className="field full"><label htmlFor="q-files">Project files</label><label className="dropzone" htmlFor="q-files"><b>Share your project files</b> PDF or ZIP up to 500 MB — or <u>browse files</u> · or paste a plan-room link in the notes</label><input id="q-files" name="files" type="file" accept=".pdf,.zip,.dwg" hidden/></div>
    <div className="field full"><label htmlFor="q-notes">Scope notes</label><textarea id="q-notes" name="notes" rows={4} placeholder="What are you trying to decide, estimate, design, coordinate, or improve? Include known scope, addenda, alternates, and constraints."/></div>
    <div className="field full"><div className="consent"><div className="consent-title">Consent — required before submitting</div><div className="check"><input required type="checkbox" id="c-contact"/><label htmlFor="c-contact"><span className="req">Required</span><br/><b>I agree to be contacted about this request.</b> PreCon Ext may email or call me to discuss the services I have requested.</label></div><div className="check"><input type="checkbox" id="c-marketing"/><label htmlFor="c-marketing"><span className="opt">Optional</span><br/><b>Send me occasional updates</b> about estimating, preconstruction, and project resources.</label></div><p className="consent-fine">By submitting this form you agree to our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>. We do not sell your personal information or project files.</p></div></div>
    {error&&<p className="form-error" role="alert">{error}</p>}<div className="field full"><button className="btn btn-primary" type="submit" style={{width:'100%'}}>Prepare my project brief</button><span className="hint" style={{textAlign:'center'}}>Bring this information to your project conversation so we can define the scope efficiently.</span></div>
  </form>;
}
