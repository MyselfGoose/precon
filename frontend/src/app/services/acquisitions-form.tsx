'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/content';

type FormErrors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s.-]{7,}$/;

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
  const address = String(data.get('address') ?? '').trim();
  const notes = String(data.get('notes') ?? '').trim();
  if (!String(data.get('name') ?? '').trim()) errors.name = 'Enter your name.';
  if (!emailPattern.test(email)) errors.email = 'Enter a valid email address.';
  if (phone && !phonePattern.test(phone)) errors.phone = 'Enter a valid phone number or leave this field blank.';
  if (!address) errors.address = 'Add the property address or location.';
  if (notes.length < 20) errors.notes = 'Add at least 20 characters describing the property and your situation.';
  if (!data.get('contact-consent')) errors['contact-consent'] = 'Consent is required before submitting.';
  return errors;
}

export default function PropertyForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length) {
      const first = form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLElement | null;
      first?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData(form);
      const response = await fetch('/api/leads/acquisition', { method: 'POST', body });
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
        <h2>Your property inquiry has been sent.</h2>
        <p>
          Our acquisitions team received your details and will evaluate the opportunity. Prefer to talk sooner? Call{' '}
          <a href={`tel:${BRAND.phoneRaw}`}>{BRAND.phoneDisplay}</a>.
        </p>
        <Link className="btn btn-primary" href="/">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate aria-describedby="property-form-status">
      <div className="field" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor="p-website">Website</label>
        <input id="p-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="p-name">Your name</label>
        <input
          id="p-name"
          name="name"
          required
          type="text"
          autoComplete="name"
          placeholder="Full name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'error-p-name' : undefined}
        />
        {errors.name && (
          <span className="form-error" id="error-p-name">
            {errors.name}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="p-email">Email</label>
        <input
          id="p-email"
          name="email"
          required
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'error-p-email' : undefined}
        />
        {errors.email && (
          <span className="form-error" id="error-p-email">
            {errors.email}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="p-phone">
          Phone <span className="optional">(optional)</span>
        </label>
        <input
          id="p-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 555-5555"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'error-p-phone' : undefined}
        />
        {errors.phone && (
          <span className="form-error" id="error-p-phone">
            {errors.phone}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="p-role">I am a</label>
        <select id="p-role" name="role">
          <option>Property owner</option>
          <option>Broker / agent</option>
          <option>Investor</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field full">
        <label htmlFor="p-address">Property address or location</label>
        <input
          id="p-address"
          name="address"
          required
          type="text"
          placeholder="Street, City, State"
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? 'error-p-address' : undefined}
        />
        {errors.address && (
          <span className="form-error" id="error-p-address">
            {errors.address}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="p-type">Property type</label>
        <select id="p-type" name="type">
          <option>Residential</option>
          <option>Multi-family</option>
          <option>Commercial</option>
          <option>Industrial</option>
          <option>Mixed-use</option>
          <option>Land / other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="p-condition">
          Current condition <span className="optional">(optional)</span>
        </label>
        <select id="p-condition" name="condition">
          <option>Occupied / performing</option>
          <option>Needs renovation</option>
          <option>Distressed / deferred maintenance</option>
          <option>Vacant</option>
          <option>Not sure</option>
        </select>
      </div>
      <div className="field full">
        <label htmlFor="p-notes">Property details & situation</label>
        <textarea
          id="p-notes"
          name="notes"
          required
          rows={4}
          placeholder="Describe the property, its condition, why you are exploring options, and any information that would help us evaluate the opportunity."
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? 'error-p-notes' : undefined}
        />
        {errors.notes && (
          <span className="form-error" id="error-p-notes">
            {errors.notes}
          </span>
        )}
      </div>
      <div className="field full">
        <div className="consent">
          <div className="consent-title">Consent — required before submitting</div>
          <div className="check">
            <input
              required
              type="checkbox"
              id="p-consent"
              name="contact-consent"
              aria-invalid={Boolean(errors['contact-consent'])}
              aria-describedby={errors['contact-consent'] ? 'error-p-consent' : undefined}
            />
            <label htmlFor="p-consent">
              <span className="req">Required</span>
              <br />
              <b>I agree to be contacted about this property.</b> CSI & Design may email or call me to discuss the
              opportunity.
            </label>
          </div>
          <p className="consent-fine">
            By submitting you agree to our <Link href="/privacy">Privacy Policy</Link> and{' '}
            <Link href="/terms">Terms of Service</Link>. Your inquiry is emailed to our acquisitions team.
          </p>
        </div>
        {errors['contact-consent'] && (
          <span className="form-error" id="error-p-consent">
            {errors['contact-consent']}
          </span>
        )}
      </div>
      <div className="field full" id="property-form-status" aria-live="polite">
        {(Object.keys(errors).length > 0 || submitError) && (
          <p className="form-error" role="alert">
            {submitError ?? 'Review the highlighted fields before continuing.'}
          </p>
        )}
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: '100%' }}>
          {submitting ? 'Sending…' : 'Submit property for evaluation'}
        </button>
        <span className="hint" style={{ textAlign: 'center' }}>
          We email your inquiry to {BRAND.email}. Or call {BRAND.phoneDisplay}.
        </span>
      </div>
    </form>
  );
}
