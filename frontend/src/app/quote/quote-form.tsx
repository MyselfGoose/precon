'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { CONTENT_SERVICES, BRAND } from '@/lib/content';
import { TRADES } from '@/lib/data';
import { TRADE_ESTIMATION_PAGES } from '@/lib/estimation';

type FormErrors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s.-]{7,}$/;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

const ESTIMATION_HUB_OPTIONS = [
  'General construction estimate',
  'Industrial projects',
  'Public / infrastructure projects',
] as const;

type ApiErrorBody = {
  ok?: boolean;
  message?: string;
  errors?: FormErrors;
};

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
  if (date && new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) {
    errors.due = 'Choose today or a future date.';
  }
  if (notes.length < 20) errors.notes = 'Add at least 20 characters describing the scope or decision.';
  if (!data.get('contact-consent')) errors['contact-consent'] = 'Consent is required before submitting.';
  const files = form.elements.namedItem('files') as HTMLInputElement | null;
  if (files?.files?.length) {
    let total = 0;
    for (const file of Array.from(files.files)) {
      total += file.size;
      if (file.size > MAX_FILE_BYTES) {
        errors.files = `Each file must be smaller than ${MAX_FILE_BYTES / (1024 * 1024)} MB for email delivery. Paste a plan-room link in the notes for larger sets.`;
        break;
      }
    }
    if (!errors.files && total > MAX_TOTAL_BYTES) {
      errors.files = `Total attachments must be under ${MAX_TOTAL_BYTES / (1024 * 1024)} MB. Paste a plan-room link in the notes for larger sets.`;
    }
  }
  return errors;
}

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length) {
      const firstKey = Object.keys(nextErrors)[0];
      if (firstKey === 'trade') {
        form.querySelector<HTMLInputElement>('input[name="trade"]')?.focus();
      } else if (firstKey === 'contact-consent') {
        form.querySelector<HTMLInputElement>('#c-contact')?.focus();
      } else {
        const first = form.elements.namedItem(firstKey) as HTMLElement | null;
        first?.focus();
      }
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData(form);
      const response = await fetch('/api/leads/quote', { method: 'POST', body });
      const payload = (await response.json().catch(() => null)) as ApiErrorBody | null;
      if (!response.ok || !payload?.ok) {
        if (payload?.errors) setErrors(payload.errors);
        setSubmitError(payload?.message ?? 'We could not send your request. Please try again or call us.');
        return;
      }
      setSent(true);
    } catch {
      setSubmitError('Network error. Check your connection and try again, or call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="success-card" role="status" aria-live="polite">
        <div className="ico" aria-hidden="true">
          ✓
        </div>
        <h2>Your request has been sent.</h2>
        <p>
          Our team received your project brief and will follow up shortly. If the scope is easier to explain out loud, call{' '}
          <a href={`tel:${BRAND.phoneRaw}`}>{BRAND.phoneDisplay}</a>.
        </p>
        <Link className="btn btn-primary" href="/">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate aria-describedby="form-status">
      <div className="field" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor="q-website">Website</label>
        <input id="q-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="q-name">Your name</label>
        <input
          id="q-name"
          name="name"
          required
          type="text"
          autoComplete="name"
          placeholder="Full name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'error-name' : undefined}
        />
        {errors.name && (
          <span className="form-error" id="error-name">
            {errors.name}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="q-company">Company</label>
        <input id="q-company" name="company" type="text" autoComplete="organization" placeholder="Company name" />
      </div>
      <div className="field">
        <label htmlFor="q-email">Email</label>
        <input
          id="q-email"
          name="email"
          required
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'error-email' : undefined}
        />
        {errors.email && (
          <span className="form-error" id="error-email">
            {errors.email}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="q-phone">
          Phone <span className="optional">(optional)</span>
        </label>
        <input
          id="q-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'error-phone' : undefined}
        />
        {errors.phone && (
          <span className="form-error" id="error-phone">
            {errors.phone}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="q-role">I am a</label>
        <select id="q-role" name="role">
          <option>General contractor</option>
          <option>Subcontractor</option>
          <option>Owner / developer</option>
          <option>Architect / engineer</option>
          <option>Investor</option>
          <option>Other project team member</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="q-type">Project type</label>
        <select id="q-type" name="type">
          <option>Commercial</option>
          <option>Industrial / warehouse</option>
          <option>Multi-family</option>
          <option>Residential</option>
          <option>Public / infrastructure</option>
          <option>Hospitality / recreation</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="q-stage">
          Project stage <span className="optional">(optional)</span>
        </label>
        <select id="q-stage" name="stage">
          <option>Early concept / feasibility</option>
          <option>Design development</option>
          <option>Permit / pricing set</option>
          <option>Bid in progress</option>
          <option>Construction / revision support</option>
          <option>Acquisition review</option>
        </select>
      </div>
      <div className="field full">
        <fieldset
          className="trade-fieldset"
          aria-invalid={Boolean(errors.trade)}
          aria-describedby={errors.trade ? 'error-trade' : 'hint-trade'}
        >
          <legend>Services or trades needed</legend>
          <div className="trade-checkboxes">
            <div className="trade-group">
              <div className="trade-group-label">Services</div>
              {CONTENT_SERVICES.map((s) => (
                <div className="check" key={s.slug}>
                  <input type="checkbox" id={`q-trade-${s.slug}`} name="trade" value={s.name} />
                  <label htmlFor={`q-trade-${s.slug}`}>{s.name}</label>
                </div>
              ))}
            </div>
            <div className="trade-group">
              <div className="trade-group-label">Estimation hubs</div>
              {ESTIMATION_HUB_OPTIONS.map((label) => (
                <div className="check" key={label}>
                  <input type="checkbox" id={`q-trade-hub-${label}`} name="trade" value={label} />
                  <label htmlFor={`q-trade-hub-${label}`}>{label}</label>
                </div>
              ))}
            </div>
            <div className="trade-group">
              <div className="trade-group-label">Specialty trades</div>
              {TRADE_ESTIMATION_PAGES.map((t) => (
                <div className="check" key={t.slug}>
                  <input type="checkbox" id={`q-trade-${t.slug}`} name="trade" value={t.name} />
                  <label htmlFor={`q-trade-${t.slug}`}>{t.name}</label>
                </div>
              ))}
            </div>
            <div className="trade-group">
              <div className="trade-group-label">CSI MasterFormat divisions</div>
              {TRADES.map((t) => (
                <div className="check" key={t.slug}>
                  <input
                    type="checkbox"
                    id={`q-trade-div-${t.slug}`}
                    name="trade"
                    value={`Div ${t.div}: ${t.name}`}
                  />
                  <label htmlFor={`q-trade-div-${t.slug}`}>
                    Div {t.div}: {t.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="trade-group">
              <div className="check">
                <input type="checkbox" id="q-trade-full" name="trade" value="Full project support" />
                <label htmlFor="q-trade-full">Full project support</label>
              </div>
            </div>
          </div>
        </fieldset>
        <span className="hint" id="hint-trade">
          Select every service or trade that applies.
        </span>
        {errors.trade && (
          <span className="form-error" id="error-trade">
            {errors.trade}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="q-state">Project location</label>
        <input
          id="q-state"
          name="state"
          required
          type="text"
          autoComplete="address-level2"
          placeholder="City, State"
          aria-invalid={Boolean(errors.state)}
          aria-describedby={errors.state ? 'error-state' : undefined}
        />
        {errors.state && (
          <span className="form-error" id="error-state">
            {errors.state}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="q-due">Important date</label>
        <input
          id="q-due"
          name="due"
          required
          type="date"
          aria-invalid={Boolean(errors.due)}
          aria-describedby={errors.due ? 'error-due' : 'hint-due'}
        />
        <span className="hint" id="hint-due">
          Bid, design, acquisition, or decision date.
        </span>
        {errors.due && (
          <span className="form-error" id="error-due">
            {errors.due}
          </span>
        )}
      </div>
      <div className="field full">
        <label htmlFor="q-files">
          Project files <span className="optional">(optional)</span>
        </label>
        <label className="dropzone" htmlFor="q-files">
          <b>Share your project files</b> PDF, ZIP, or DWG up to 8 MB each (20 MB total), or <u>browse files</u> · paste a
          plan-room link in the notes for larger sets
        </label>
        <input
          id="q-files"
          name="files"
          type="file"
          accept=".pdf,.zip,.dwg"
          multiple
          hidden
          aria-invalid={Boolean(errors.files)}
          aria-describedby={errors.files ? 'error-files' : selectedFiles.length ? 'q-file-list' : undefined}
          onChange={(event) => {
            const files = event.currentTarget.files;
            setSelectedFiles(files ? Array.from(files).map((file) => file.name) : []);
          }}
        />
        {selectedFiles.length > 0 && (
          <ul className="file-list" id="q-file-list">
            {selectedFiles.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
        {errors.files && (
          <span className="form-error" id="error-files">
            {errors.files}
          </span>
        )}
      </div>
      <div className="field full">
        <label htmlFor="q-notes">Scope notes</label>
        <textarea
          id="q-notes"
          name="notes"
          required
          rows={4}
          placeholder="What are you trying to decide, estimate, design, coordinate, or improve? Include known scope, addenda, alternates, and constraints."
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? 'error-notes' : undefined}
        />
        {errors.notes && (
          <span className="form-error" id="error-notes">
            {errors.notes}
          </span>
        )}
      </div>
      <div className="field full">
        <label htmlFor="q-missing">
          Known gaps or questions <span className="optional">(optional)</span>
        </label>
        <textarea
          id="q-missing"
          name="missing"
          rows={3}
          placeholder="What is missing from the set? Are there alternates, unresolved details, or assumptions you want reviewed?"
        />
      </div>
      <div className="field full">
        <div className="consent">
          <div className="consent-title">Consent (required before submitting)</div>
          <div className="check">
            <input
              required
              type="checkbox"
              id="c-contact"
              name="contact-consent"
              aria-invalid={Boolean(errors['contact-consent'])}
              aria-describedby={errors['contact-consent'] ? 'error-contact-consent' : undefined}
            />
            <label htmlFor="c-contact">
              <span className="req">Required</span>
              <br />
              <b>I agree to be contacted about this request.</b> CSI & Design may email or call me to discuss the services I
              have requested.
            </label>
          </div>
          <div className="check">
            <input type="checkbox" id="c-marketing" name="marketing-consent" />
            <label htmlFor="c-marketing">
              <span className="opt">Optional</span>
              <br />
              <b>Send me occasional updates</b> about estimating, preconstruction, and project resources.
            </label>
          </div>
          <p className="consent-fine">
            By submitting you agree to our <Link href="/privacy">Privacy Policy</Link> and{' '}
            <Link href="/terms">Terms of Service</Link>. Your request is emailed to our team.
          </p>
        </div>
        {errors['contact-consent'] && (
          <span className="form-error" id="error-contact-consent">
            {errors['contact-consent']}
          </span>
        )}
      </div>
      <div className="field full" id="form-status" aria-live="polite">
        {(Object.keys(errors).length > 0 || submitError) && (
          <p className="form-error" role="alert">
            {submitError ?? 'Review the highlighted fields before continuing.'}
          </p>
        )}
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: '100%' }}>
          {submitting ? 'Sending…' : 'Submit request'}
        </button>
        <span className="hint" style={{ textAlign: 'center' }}>
          We email your brief to {BRAND.email}. Prefer to talk? Call {BRAND.phoneDisplay}.
        </span>
      </div>
    </form>
  );
}
