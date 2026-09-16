'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { TRADES } from '@/lib/data';
import { BRAND } from '@/lib/content';

type FormErrors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s.-]{7,}$/;

function validate(form: HTMLFormElement): FormErrors {
  const data = new FormData(form);
  const errors: FormErrors = {};
  const email = String(data.get('email') ?? '').trim();
  const phone = String(data.get('phone') ?? '').trim();
  const location = String(data.get('state') ?? '').trim();
  const notes = String(data.get('notes') ?? '').trim();
  const selectedServices = data.getAll('trade');
  const date = String(data.get('due') ?? '');
  if (!String(data.get('name') ?? '').trim()) errors.name = 'Enter your name.';
  if (!emailPattern.test(email)) errors.email = 'Enter a valid email address.';
  if (phone && !phonePattern.test(phone)) errors.phone = 'Enter a valid phone number or leave this field blank.';
  if (!selectedServices.length) errors.trade = 'Select at least one service or division.';
  if (!location) errors.state = 'Add the project location.';
  if (!date) errors.due = 'Add the important project date.';
  if (date && new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) errors.due = 'Choose today or a future date.';
  if (notes.length < 20) errors.notes = 'Add at least 20 characters describing the scope or decision.';
  if (!data.get('contact-consent')) errors['contact-consent'] = 'Consent is required before preparing the project brief.';
  const files = form.elements.namedItem('files') as HTMLInputElement | null;
  if (files?.files && Array.from(files.files).some(file => file.size > 500 * 1024 * 1024)) errors.files = 'Each file must be smaller than 500 MB.';
  return errors;
}

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLElement | null;
      first?.focus();
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 350);
  }

  if (sent) return <div className="success-card" role="status" aria-live="polite"><div className="ico" aria-hidden="true">✓</div><h2>Your project brief is prepared.</h2><p>Your information has been organized in this browser, but no message or file has been sent yet. Keep this brief available for your project conversation, or call <a href="tel:+18005550100">{BRAND.phone}</a> if the scope is easier to explain out loud.</p><Link className="btn btn-primary" href="/">Back to home</Link></div>;

  return <form className="form" onSubmit={submit} noValidate aria-describedby="form-status">
    <div className="field"><label htmlFor="q-name">Your name</label><input id="q-name" name="name" required type="text" autoComplete="name" placeholder="Full name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'error-name' : undefined}/>{errors.name&&<span className="form-error" id="error-name">{errors.name}</span>}</div>
    <div className="field"><label htmlFor="q-company">Company</label><input id="q-company" name="company" type="text" autoComplete="organization" placeholder="Company name"/></div>
    <div className="field"><label htmlFor="q-email">Email</label><input id="q-email" name="email" required type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'error-email' : undefined}/>{errors.email&&<span className="form-error" id="error-email">{errors.email}</span>}</div>
    <div className="field"><label htmlFor="q-phone">Phone <span className="optional">(optional)</span></label><input id="q-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-5555" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'error-phone' : undefined}/>{errors.phone&&<span className="form-error" id="error-phone">{errors.phone}</span>}</div>
    <div className="field"><label htmlFor="q-role">I am a</label><select id="q-role" name="role"><option>General contractor</option><option>Subcontractor</option><option>Owner / developer</option><option>Architect / engineer</option><option>Investor</option><option>Other project team member</option></select></div>
    <div className="field"><label htmlFor="q-type">Project type</label><select id="q-type" name="type"><option>Commercial</option><option>Industrial / warehouse</option><option>Multi-family</option><option>Residential</option><option>Public / infrastructure</option><option>Hospitality / recreation</option></select></div>
    <div className="field"><label htmlFor="q-stage">Project stage <span className="optional">(optional)</span></label><select id="q-stage" name="stage"><option>Early concept / feasibility</option><option>Design development</option><option>Permit / pricing set</option><option>Bid in progress</option><option>Construction / revision support</option><option>Acquisition review</option></select></div>
    <div className="field"><label htmlFor="q-trade">Divisions or services needed</label><select id="q-trade" name="trade" multiple size={5} aria-invalid={Boolean(errors.trade)} aria-describedby={errors.trade ? 'error-trade' : 'hint-trade'}>{TRADES.map(t=><option key={t.slug}>Div {t.div} — {t.name}</option>)}<option>Architectural drawings</option><option>MEP / structural engineering</option><option>BIM / visualization</option><option>Acquisition analysis</option><option>Full project support</option></select><span className="hint" id="hint-trade">Hold Ctrl / Cmd to select several.</span>{errors.trade&&<span className="form-error" id="error-trade">{errors.trade}</span>}</div>
    <div className="field"><label htmlFor="q-state">Project location</label><input id="q-state" name="state" required type="text" autoComplete="address-level2" placeholder="City, State" aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? 'error-state' : undefined}/>{errors.state&&<span className="form-error" id="error-state">{errors.state}</span>}</div>
    <div className="field"><label htmlFor="q-due">Important date</label><input id="q-due" name="due" required type="date" aria-invalid={Boolean(errors.due)} aria-describedby={errors.due ? 'error-due' : 'hint-due'}/><span className="hint" id="hint-due">Bid, design, acquisition, or decision date.</span>{errors.due&&<span className="form-error" id="error-due">{errors.due}</span>}</div>
    <div className="field full"><label htmlFor="q-files">Project files <span className="optional">(optional)</span></label><label className="dropzone" htmlFor="q-files"><b>Share your project files</b> PDF, ZIP, or DWG up to 500 MB — or <u>browse files</u> · paste a plan-room link in the notes</label><input id="q-files" name="files" type="file" accept=".pdf,.zip,.dwg" multiple hidden aria-invalid={Boolean(errors.files)} />{errors.files&&<span className="form-error" id="error-files">{errors.files}</span>}</div>
    <div className="field full"><label htmlFor="q-notes">Scope notes</label><textarea id="q-notes" name="notes" required rows={4} placeholder="What are you trying to decide, estimate, design, coordinate, or improve? Include known scope, addenda, alternates, and constraints." aria-invalid={Boolean(errors.notes)} aria-describedby={errors.notes ? 'error-notes' : undefined}/>{errors.notes&&<span className="form-error" id="error-notes">{errors.notes}</span>}</div>
    <div className="field full"><label htmlFor="q-missing">Known gaps or questions <span className="optional">(optional)</span></label><textarea id="q-missing" name="missing" rows={3} placeholder="What is missing from the set? Are there alternates, unresolved details, or assumptions you want reviewed?" /></div>
    <div className="field full"><div className="consent"><div className="consent-title">Consent — required before preparing</div><div className="check"><input required type="checkbox" id="c-contact" name="contact-consent"/><label htmlFor="c-contact"><span className="req">Required</span><br/><b>I agree to be contacted about this request.</b> PreCon Ext may email or call me to discuss the services I have requested.</label></div><div className="check"><input type="checkbox" id="c-marketing" name="marketing-consent"/><label htmlFor="c-marketing"><span className="opt">Optional</span><br/><b>Send me occasional updates</b> about estimating, preconstruction, and project resources.</label></div><p className="consent-fine">By preparing this brief you agree to our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>. No message or file is sent by this browser-only form.</p></div>{errors['contact-consent']&&<span className="form-error" id="error-contact-consent">{errors['contact-consent']}</span>}</div>
    <div className="field full" id="form-status" aria-live="polite">{Object.keys(errors).length>0&&<p className="form-error" role="alert">Review the highlighted fields before continuing.</p>}<button className="btn btn-primary" type="submit" disabled={submitting} style={{width:'100%'}}>{submitting?'Preparing your brief…':'Prepare my project brief'}</button><span className="hint" style={{textAlign:'center'}}>This prepares information locally; it does not send an email or upload files.</span></div>
  </form>;
}
