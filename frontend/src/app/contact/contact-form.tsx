'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { upload } from '@vercel/blob/client';
import { BRAND, SITE_COPY } from '@/lib/content';
import {
  ALLOWED_FILE_ACCEPT,
  EMAIL_PATTERN,
  MAX_ATTACHMENT_BYTES,
  MAX_NOTES_LENGTH,
  formatAttachmentLimitsHelp,
  validateAttachmentList,
  validatePlanRoomUrl,
} from '@/lib/lead-shared';

type FormErrors = Record<string, string>;

type ApiErrorBody = {
  ok?: boolean;
  message?: string;
  errors?: FormErrors;
};

const PROJECT_TYPES = [
  'Commercial',
  'Industrial / warehouse',
  'Multi-family',
  'Residential',
  'Public / infrastructure',
  'Other',
] as const;

function validate(form: HTMLFormElement): FormErrors {
  const data = new FormData(form);
  const errors: FormErrors = {};
  const email = String(data.get('email') ?? '').trim();
  const type = String(data.get('type') ?? '').trim();
  const due = String(data.get('due') ?? '').trim();
  const planRoomUrl = String(data.get('planRoomUrl') ?? '').trim();
  const notes = String(data.get('notes') ?? '').trim();

  if (!String(data.get('name') ?? '').trim()) errors.name = 'Enter your name.';
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.';
  if (!type) errors.type = 'Select a project type.';
  if (due && new Date(`${due}T00:00:00`) < new Date(new Date().toDateString())) {
    errors.due = 'Choose today or a future date.';
  }
  const planRoomError = validatePlanRoomUrl(planRoomUrl);
  if (planRoomError) errors.planRoomUrl = planRoomError;

  const files = form.elements.namedItem('files') as HTMLInputElement | null;
  const fileList = files?.files ? Array.from(files.files) : [];
  const emailSized = fileList.filter((file) => file.size <= MAX_ATTACHMENT_BYTES);
  if (emailSized.length) {
    const fileError = validateAttachmentList(emailSized);
    if (fileError) errors.files = fileError;
  }
  if (!planRoomUrl && !fileList.length && notes.length < 10) {
    errors.planRoomUrl = 'Add a plan-room link, upload plans, or a short note.';
  }
  if (notes.length > MAX_NOTES_LENGTH) {
    errors.notes = `Notes must be ${MAX_NOTES_LENGTH.toLocaleString()} characters or fewer.`;
  }
  if (!data.get('contact-consent')) errors['contact-consent'] = 'Consent is required before submitting.';
  return errors;
}

export default function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const data = new FormData(form);
      const fileInput = form.elements.namedItem('files') as HTMLInputElement | null;
      const allFiles = fileInput?.files ? Array.from(fileInput.files) : [];
      const emailFiles = allFiles.filter((file) => file.size <= MAX_ATTACHMENT_BYTES);
      const largeFiles = allFiles.filter((file) => file.size > MAX_ATTACHMENT_BYTES);

      data.delete('files');
      for (const file of emailFiles) data.append('files', file);

      for (const file of largeFiles) {
        try {
          const result = await upload(file.name, file, {
            access: 'private',
            handleUploadUrl: '/api/blob',
          });
          data.append('blobUrl', result.url);
        } catch {
          setSubmitError(
            `“${file.name}” is larger than 3.5 MB. Paste a plan-room link instead, or attach a smaller file.`,
          );
          return;
        }
      }

      const response = await fetch('/api/leads/contact', { method: 'POST', body: data });
      const payload = (await response.json()) as ApiErrorBody;
      if (!response.ok) {
        setErrors(payload.errors ?? {});
        setSubmitError(payload.message ?? 'We could not send your request. Please try again or call us.');
        return;
      }
      setDone(true);
      form.reset();
      setSelectedFiles([]);
    } catch {
      setSubmitError('Network error. Check your connection and try again, or call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="success-card" role="status">
        <span className="ico" aria-hidden="true">
          ✓
        </span>
        <h2>Message sent</h2>
        <p>
          Thanks — we received your inquiry and will follow up at the email you provided. Prefer a full estimate
          brief? Use <Link href="/quote">{SITE_COPY.cta.primary}</Link>.
        </p>
        <button className="btn btn-ghost" type="button" onClick={() => setDone(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate aria-describedby="contact-form-status">
      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} />
        {errors.name ? (
          <span className="form-error" id="error-c-name">
            {errors.name}
          </span>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input
          id="c-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <span className="form-error">{errors.email}</span> : null}
      </div>
      <div className="field">
        <label htmlFor="c-type">Project type</label>
        <select id="c-type" name="type" required defaultValue="" aria-invalid={Boolean(errors.type)}>
          <option value="" disabled>
            Select project type
          </option>
          {PROJECT_TYPES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.type ? <span className="form-error">{errors.type}</span> : null}
      </div>
      <div className="field">
        <label htmlFor="c-due">
          Bid due date <span className="optional">(optional)</span>
        </label>
        <input id="c-due" name="due" type="date" aria-invalid={Boolean(errors.due)} />
        {errors.due ? <span className="form-error">{errors.due}</span> : null}
      </div>
      <div className="field full">
        <label htmlFor="c-plan-room">Plans or plan-room link</label>
        <input
          id="c-plan-room"
          name="planRoomUrl"
          type="url"
          inputMode="url"
          placeholder="https://…"
          aria-invalid={Boolean(errors.planRoomUrl)}
          aria-describedby="hint-c-plan-room"
        />
        <span className="hint" id="hint-c-plan-room">
          Paste a plan-room or cloud link for large sets. Client plans are confidential and never used in acquisition
          activity.
        </span>
        {errors.planRoomUrl ? <span className="form-error">{errors.planRoomUrl}</span> : null}
      </div>
      <div className="field full">
        <label htmlFor="c-files">Or attach files</label>
        <label className="dropzone" htmlFor="c-files">
          <b>Upload plans</b>
          {formatAttachmentLimitsHelp()}. For larger files, paste a plan-room or cloud link above.
        </label>
        <input
          id="c-files"
          name="files"
          type="file"
          accept={ALLOWED_FILE_ACCEPT}
          multiple
          className="sr-only"
          onChange={(event) => {
            const files = event.currentTarget.files;
            setSelectedFiles(files ? Array.from(files).map((file) => file.name) : []);
          }}
        />
        {selectedFiles.length ? (
          <ul className="file-list" id="c-file-list">
            {selectedFiles.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : null}
        {errors.files ? <span className="form-error">{errors.files}</span> : null}
      </div>
      <div className="field full">
        <label htmlFor="c-notes">Notes (optional)</label>
        <textarea id="c-notes" name="notes" rows={3} aria-invalid={Boolean(errors.notes)} />
        {errors.notes ? <span className="form-error">{errors.notes}</span> : null}
      </div>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="field full">
        <label className="check">
          <input type="checkbox" name="contact-consent" required />
          <span>
            I agree to the <Link href="/privacy">Privacy Policy</Link> and{' '}
            <Link href="/terms">Terms of Service</Link>.
          </span>
        </label>
        {errors['contact-consent'] ? <span className="form-error">{errors['contact-consent']}</span> : null}
      </div>
      <div className="field full" id="contact-form-status" aria-live="polite">
        {(Object.keys(errors).length > 0 || submitError) && (
          <p className="form-error" role="alert">
            {submitError ?? 'Review the highlighted fields before continuing.'}
          </p>
        )}
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: '100%' }}>
          {submitting ? 'Sending…' : 'Send message'}
        </button>
        <span className="hint" style={{ textAlign: 'center' }}>
          {SITE_COPY.confidentiality}
        </span>
        <span className="hint" style={{ textAlign: 'center' }}>
          Or call {BRAND.phoneDisplay} · {SITE_COPY.contact.hours}
        </span>
      </div>
    </form>
  );
}
