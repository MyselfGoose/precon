'use client';

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CONTENT_SERVICES, BRAND } from '@/lib/content';
import { TRADES } from '@/lib/data';
import { TRADE_ESTIMATION_PAGES } from '@/lib/estimation';

type FormErrors = Record<string, string>;
type StepId = 1 | 2 | 3 | 4;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s.-]{7,}$/;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

const ESTIMATION_HUB_OPTIONS = [
  'General construction estimate',
  'Industrial projects',
  'Public / infrastructure projects',
] as const;

const ROLE_OPTIONS = [
  'General contractor',
  'Subcontractor',
  'Owner / developer',
  'Architect / engineer',
  'Investor',
  'Other project team member',
] as const;

const PROJECT_TYPES = [
  'Commercial',
  'Industrial / warehouse',
  'Multi-family',
  'Residential',
  'Public / infrastructure',
  'Hospitality / recreation',
] as const;

const PROJECT_STAGES = [
  'Early concept / feasibility',
  'Design development',
  'Permit / pricing set',
  'Bid in progress',
  'Construction / revision support',
  'Acquisition review',
] as const;

const FULL_PROJECT_SUPPORT = 'Full project support';

const ESTIMATING_SERVICE = 'Estimating & quantity takeoffs';

const STEPS: { id: StepId; label: string; title: string; hint: string }[] = [
  { id: 1, label: 'You', title: 'Who should we reply to?', hint: 'We’ll use this to follow up on your brief.' },
  { id: 2, label: 'Need', title: 'What do you need?', hint: 'Pick every service that applies. Add trades only if you need estimating detail.' },
  { id: 3, label: 'Project', title: 'About the project', hint: 'Location, timing, files, and what you already know.' },
  { id: 4, label: 'Send', title: 'Review and send', hint: 'Confirm the brief, then we’ll organize the next conversation.' },
];

type ApiErrorBody = {
  ok?: boolean;
  message?: string;
  errors?: FormErrors;
};

function validateFiles(files: FileList | null): string | undefined {
  if (!files?.length) return undefined;
  let total = 0;
  for (const file of Array.from(files)) {
    total += file.size;
    if (file.size > MAX_FILE_BYTES) {
      return `Each file must be smaller than ${MAX_FILE_BYTES / (1024 * 1024)} MB for email delivery. Paste a plan-room link in the notes for larger sets.`;
    }
  }
  if (total > MAX_TOTAL_BYTES) {
    return `Total attachments must be under ${MAX_TOTAL_BYTES / (1024 * 1024)} MB. Paste a plan-room link in the notes for larger sets.`;
  }
  return undefined;
}

function validateAll(form: HTMLFormElement): FormErrors {
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
  const fileError = validateFiles(files?.files ?? null);
  if (fileError) errors.files = fileError;

  return errors;
}

function validateStep(step: StepId, form: HTMLFormElement): FormErrors {
  const data = new FormData(form);
  const errors: FormErrors = {};

  if (step === 1) {
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    if (!String(data.get('name') ?? '').trim()) errors.name = 'Enter your name.';
    if (!emailPattern.test(email)) errors.email = 'Enter a valid email address.';
    if (phone && !phonePattern.test(phone)) errors.phone = 'Enter a valid phone number or leave this field blank.';
  }

  if (step === 2) {
    if (!data.getAll('trade').length) errors.trade = 'Select at least one service or division.';
  }

  if (step === 3) {
    const location = String(data.get('state') ?? '').trim();
    const notes = String(data.get('notes') ?? '').trim();
    const date = String(data.get('due') ?? '');
    if (!location) errors.state = 'Add the project location.';
    if (!date) errors.due = 'Add the important project date.';
    if (date && new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) {
      errors.due = 'Choose today or a future date.';
    }
    if (notes.length < 20) errors.notes = 'Add at least 20 characters describing the scope or decision.';
    const files = form.elements.namedItem('files') as HTMLInputElement | null;
    const fileError = validateFiles(files?.files ?? null);
    if (fileError) errors.files = fileError;
  }

  if (step === 4) {
    if (!data.get('contact-consent')) errors['contact-consent'] = 'Consent is required before submitting.';
  }

  return errors;
}

function focusFirstError(form: HTMLFormElement, errors: FormErrors) {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return;
  if (firstKey === 'trade') {
    form.querySelector<HTMLElement>('.need-cards, .chip-group')?.focus();
    return;
  }
  if (firstKey === 'contact-consent') {
    form.querySelector<HTMLInputElement>('#c-contact')?.focus();
    return;
  }
  if (firstKey === 'files') {
    form.querySelector<HTMLInputElement>('#q-files')?.focus();
    return;
  }
  const first = form.elements.namedItem(firstKey) as HTMLElement | null;
  first?.focus();
}

function stepForError(key: string): StepId {
  if (['name', 'email', 'phone', 'role'].includes(key)) return 1;
  if (key === 'trade') return 2;
  if (['state', 'due', 'notes', 'missing', 'files', 'type', 'stage'].includes(key)) return 3;
  return 4;
}

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
}

function needsTradeDetail(selected: string[]): boolean {
  if (selected.includes(ESTIMATING_SERVICE)) return true;
  if (selected.includes(FULL_PROJECT_SUPPORT)) return true;
  if (ESTIMATION_HUB_OPTIONS.some((hub) => selected.includes(hub))) return true;
  if (TRADE_ESTIMATION_PAGES.some((t) => selected.includes(t.name))) return true;
  if (TRADES.some((t) => selected.includes(`Div ${t.div}: ${t.name}`))) return true;
  return false;
}

export default function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  const [step, setStep] = useState<StepId>(1);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [role, setRole] = useState('');
  const [projectType, setProjectType] = useState('');
  const [stage, setStage] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [due, setDue] = useState('');
  const [notes, setNotes] = useState('');
  const [missing, setMissing] = useState('');
  const [tradeQuery, setTradeQuery] = useState('');
  const [csiOpen, setCsiOpen] = useState(false);

  const currentStep = STEPS.find((s) => s.id === step) ?? STEPS[0];
  const showTradeDetail = needsTradeDetail(selectedTrades);

  const filteredSpecialtyTrades = useMemo(() => {
    const q = tradeQuery.trim().toLowerCase();
    if (!q) return TRADE_ESTIMATION_PAGES;
    return TRADE_ESTIMATION_PAGES.filter(
      (t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q),
    );
  }, [tradeQuery]);

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  function goToStep(next: StepId) {
    setErrors({});
    setSubmitError(null);
    setStep(next);
  }

  function handleNext() {
    const form = formRef.current;
    if (!form) return;
    const nextErrors = validateStep(step, form);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length) {
      focusFirstError(form, nextErrors);
      return;
    }
    goToStep((step + 1) as StepId);
  }

  function handleBack() {
    if (step === 1) return;
    goToStep((step - 1) as StepId);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateAll(form);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length) {
      const firstKey = Object.keys(nextErrors)[0];
      const targetStep = stepForError(firstKey);
      if (targetStep !== step) setStep(targetStep);
      window.setTimeout(() => focusFirstError(form, nextErrors), 0);
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData(form);
      const response = await fetch('/api/leads/quote', { method: 'POST', body });
      const payload = (await response.json().catch(() => null)) as ApiErrorBody | null;
      if (!response.ok || !payload?.ok) {
        if (payload?.errors) {
          setErrors(payload.errors);
          const firstKey = Object.keys(payload.errors)[0];
          if (firstKey) setStep(stepForError(firstKey));
        }
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
      <div className="brief-success" role="status" aria-live="polite">
        <div className="success-card brief-success-card">
          <div className="ico" aria-hidden="true">
            ✓
          </div>
          <h2>Your project brief has been sent.</h2>
          <p>
            Our team received your request and will follow up shortly. Prefer to talk through the scope? Call{' '}
            <a href={`tel:${BRAND.phoneRaw}`}>{BRAND.phoneDisplay}</a> or message us on WhatsApp.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/">
              Back to home
            </Link>
            <Link className="btn btn-ghost" href="/services">
              Browse services →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="form brief-form"
      onSubmit={submit}
      noValidate
      aria-describedby={`${formId}-status`}
    >
      <div className="field" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor="q-website">Website</label>
        <input id="q-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <nav className="brief-progress" aria-label="Brief progress">
        <ol>
          {STEPS.map((s) => {
            const done = s.id < step;
            const current = s.id === step;
            return (
              <li key={s.id} className={current ? 'is-current' : done ? 'is-done' : undefined}>
                <button
                  type="button"
                  className="brief-progress-btn"
                  aria-current={current ? 'step' : undefined}
                  disabled={s.id > step}
                  onClick={() => {
                    if (s.id < step) goToStep(s.id);
                  }}
                >
                  <span className="brief-progress-num" aria-hidden="true">
                    {done ? '✓' : s.id}
                  </span>
                  <span className="brief-progress-label">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="brief-step-head">
        <div className="eyebrow">
          Step {step} of {STEPS.length}
        </div>
        <h2 ref={stepHeadingRef} tabIndex={-1} className="brief-step-title">
          {currentStep.title}
        </h2>
        <p className="brief-step-hint">{currentStep.hint}</p>
      </div>

      {/* Step 1 — You */}
      <div className={`brief-step${step === 1 ? ' is-active' : ''}`} hidden={step !== 1} aria-hidden={step !== 1}>
        <div className="field">
          <label htmlFor="q-name">Your name</label>
          <input
            id="q-name"
            name="name"
            required
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="q-company">
            Company <span className="optional">(optional)</span>
          </label>
          <input
            id="q-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
          />
          {errors.phone && (
            <span className="form-error" id="error-phone">
              {errors.phone}
            </span>
          )}
        </div>
        <div className="field full">
          <span className="field-label-text" id="role-label">
            I am a <span className="optional">(optional)</span>
          </span>
          <input type="hidden" name="role" value={role} />
          <div className="chip-group" role="group" aria-labelledby="role-label">
            {ROLE_OPTIONS.map((option) => {
              const selected = role === option;
              return (
                <button
                  key={option}
                  type="button"
                  className={`chip${selected ? ' is-selected' : ''}`}
                  aria-pressed={selected}
                  onClick={() => setRole(selected ? '' : option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 2 — Need */}
      <div className={`brief-step${step === 2 ? ' is-active' : ''}`} hidden={step !== 2} aria-hidden={step !== 2}>
        <div className="field full">
          <fieldset
            className="trade-fieldset"
            aria-invalid={Boolean(errors.trade)}
            aria-describedby={errors.trade ? 'error-trade' : 'hint-trade'}
          >
            <legend className="sr-only">Services or trades needed</legend>

            {selectedTrades.map((value) => (
              <input key={value} type="hidden" name="trade" value={value} />
            ))}

            <div className="need-section-label">Services</div>
            <div className="need-cards" tabIndex={-1}>
              {CONTENT_SERVICES.map((service) => {
                const selected = selectedTrades.includes(service.name);
                return (
                  <label key={service.slug} className={`need-card${selected ? ' is-selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => setSelectedTrades((prev) => toggleValue(prev, service.name))}
                    />
                    <span className="need-card-code">{service.code}</span>
                    <span className="need-card-name">{service.name}</span>
                    <span className="need-card-summary">{service.summary}</span>
                  </label>
                );
              })}
              <label
                className={`need-card need-card-accent${selectedTrades.includes(FULL_PROJECT_SUPPORT) ? ' is-selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedTrades.includes(FULL_PROJECT_SUPPORT)}
                  onChange={() => setSelectedTrades((prev) => toggleValue(prev, FULL_PROJECT_SUPPORT))}
                />
                <span className="need-card-code">FULL</span>
                <span className="need-card-name">{FULL_PROJECT_SUPPORT}</span>
                <span className="need-card-summary">
                  Coordinated estimating, design, and documentation across the project — tell us what decision you need
                  supported.
                </span>
              </label>
            </div>

            <div className="need-section-label" style={{ marginTop: 22 }}>
              Estimation hubs
            </div>
            <div className="chip-group">
              {ESTIMATION_HUB_OPTIONS.map((label) => {
                const selected = selectedTrades.includes(label);
                return (
                  <label key={label} className={`chip chip-check${selected ? ' is-selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => setSelectedTrades((prev) => toggleValue(prev, label))}
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>

            {showTradeDetail && (
              <div className="need-detail">
                <div className="need-section-label">Specialty trades</div>
                <label className="brief-search" htmlFor="q-trade-search">
                  <span className="sr-only">Search specialty trades</span>
                  <input
                    id="q-trade-search"
                    type="search"
                    value={tradeQuery}
                    onChange={(e) => setTradeQuery(e.target.value)}
                    placeholder="Search trades…"
                    autoComplete="off"
                  />
                </label>
                <div className="chip-group">
                  {filteredSpecialtyTrades.map((trade) => {
                    const selected = selectedTrades.includes(trade.name);
                    return (
                      <label key={trade.slug} className={`chip chip-check${selected ? ' is-selected' : ''}`}>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => setSelectedTrades((prev) => toggleValue(prev, trade.name))}
                        />
                        <span>{trade.name.replace(/ Estimation Services$/, '')}</span>
                      </label>
                    );
                  })}
                  {filteredSpecialtyTrades.length === 0 && (
                    <p className="hint" style={{ margin: 0 }}>
                      No trades match that search.
                    </p>
                  )}
                </div>

                <div className="csi-disclosure">
                  <button
                    type="button"
                    className="csi-disclosure-toggle"
                    aria-expanded={csiOpen}
                    onClick={() => setCsiOpen((open) => !open)}
                  >
                    <span>Advanced: CSI MasterFormat divisions</span>
                    <span aria-hidden="true">{csiOpen ? '−' : '+'}</span>
                  </button>
                  {csiOpen && (
                    <div className="chip-group csi-chips">
                      {TRADES.map((trade) => {
                        const value = `Div ${trade.div}: ${trade.name}`;
                        const selected = selectedTrades.includes(value);
                        return (
                          <label key={trade.slug} className={`chip chip-check${selected ? ' is-selected' : ''}`}>
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => setSelectedTrades((prev) => toggleValue(prev, value))}
                            />
                            <span>
                              Div {trade.div}: {trade.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </fieldset>
          <span className="hint" id="hint-trade">
            Select every service that applies. Specialty trades appear when estimating is involved.
          </span>
          {errors.trade && (
            <span className="form-error" id="error-trade">
              {errors.trade}
            </span>
          )}
        </div>
      </div>

      {/* Step 3 — Project */}
      <div className={`brief-step${step === 3 ? ' is-active' : ''}`} hidden={step !== 3} aria-hidden={step !== 3}>
        <div className="field">
          <label htmlFor="q-type">
            Project type <span className="optional">(optional)</span>
          </label>
          <select id="q-type" name="type" value={projectType} onChange={(e) => setProjectType(e.target.value)}>
            <option value="">Choose…</option>
            {PROJECT_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="q-stage">
            Project stage <span className="optional">(optional)</span>
          </label>
          <select id="q-stage" name="stage" value={stage} onChange={(e) => setStage(e.target.value)}>
            <option value="">Choose…</option>
            {PROJECT_STAGES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            value={due}
            onChange={(e) => setDue(e.target.value)}
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
            <b>Share your project files</b> PDF, ZIP, or DWG up to 8 MB each (20 MB total), or <u>browse files</u> · paste
            a plan-room link in the notes for larger sets
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
              {selectedFiles.map((fileName) => (
                <li key={fileName}>{fileName}</li>
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? 'error-notes' : 'hint-notes'}
          />
          <span className="hint" id="hint-notes">
            A short paragraph is enough — at least 20 characters.
          </span>
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
            value={missing}
            onChange={(e) => setMissing(e.target.value)}
          />
        </div>
      </div>

      {/* Step 4 — Review */}
      <div className={`brief-step${step === 4 ? ' is-active' : ''}`} hidden={step !== 4} aria-hidden={step !== 4}>
        <div className="brief-review field full">
          <div className="brief-review-block">
            <div className="brief-review-head">
              <h3>Contact</h3>
              <button type="button" className="btn-text" onClick={() => goToStep(1)}>
                Change
              </button>
            </div>
            <dl className="brief-review-dl">
              <div>
                <dt>Name</dt>
                <dd>{name || '—'}</dd>
              </div>
              {company ? (
                <div>
                  <dt>Company</dt>
                  <dd>{company}</dd>
                </div>
              ) : null}
              <div>
                <dt>Email</dt>
                <dd>{email || '—'}</dd>
              </div>
              {phone ? (
                <div>
                  <dt>Phone</dt>
                  <dd>{phone}</dd>
                </div>
              ) : null}
              {role ? (
                <div>
                  <dt>Role</dt>
                  <dd>{role}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="brief-review-block">
            <div className="brief-review-head">
              <h3>Need</h3>
              <button type="button" className="btn-text" onClick={() => goToStep(2)}>
                Change
              </button>
            </div>
            {selectedTrades.length ? (
              <ul className="brief-review-tags">
                {selectedTrades.map((trade) => (
                  <li key={trade}>{trade}</li>
                ))}
              </ul>
            ) : (
              <p className="hint">No services selected yet.</p>
            )}
          </div>

          <div className="brief-review-block">
            <div className="brief-review-head">
              <h3>Project</h3>
              <button type="button" className="btn-text" onClick={() => goToStep(3)}>
                Change
              </button>
            </div>
            <dl className="brief-review-dl">
              {projectType ? (
                <div>
                  <dt>Type</dt>
                  <dd>{projectType}</dd>
                </div>
              ) : null}
              {stage ? (
                <div>
                  <dt>Stage</dt>
                  <dd>{stage}</dd>
                </div>
              ) : null}
              <div>
                <dt>Location</dt>
                <dd>{location || '—'}</dd>
              </div>
              <div>
                <dt>Important date</dt>
                <dd>{due || '—'}</dd>
              </div>
              {selectedFiles.length ? (
                <div>
                  <dt>Files</dt>
                  <dd>{selectedFiles.join(', ')}</dd>
                </div>
              ) : null}
              <div>
                <dt>Scope</dt>
                <dd>{notes || '—'}</dd>
              </div>
              {missing ? (
                <div>
                  <dt>Gaps</dt>
                  <dd>{missing}</dd>
                </div>
              ) : null}
            </dl>
          </div>
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
                <b>I agree to be contacted about this request.</b> CSI & Design may email or call me to discuss the
                services I have requested.
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

        <p className="brief-reassure">
          Scope first. Commitment second. Formal services begin only through a separate written agreement.
        </p>
      </div>

      <div className="brief-nav field full" id={`${formId}-status`} aria-live="polite">
        {(Object.keys(errors).length > 0 || submitError) && (
          <p className="form-error" role="alert">
            {submitError ?? 'Review the highlighted fields before continuing.'}
          </p>
        )}
        <div className="brief-nav-row">
          {step > 1 ? (
            <button type="button" className="btn btn-ghost" onClick={handleBack} disabled={submitting}>
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Continue →
            </button>
          ) : (
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Submit brief'}
            </button>
          )}
        </div>
        <span className="hint" style={{ textAlign: 'center' }}>
          We email your brief to {BRAND.email}. Prefer to talk? Call {BRAND.phoneDisplay}.
        </span>
      </div>
    </form>
  );
}
