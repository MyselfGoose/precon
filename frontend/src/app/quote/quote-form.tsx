'use client';

import { FormEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CONTENT_SERVICES, BRAND } from '@/lib/content';
import { TRADES } from '@/lib/data';
import { TRADE_ESTIMATION_PAGES } from '@/lib/estimation';
import {
  ALLOWED_FILE_ACCEPT,
  EMAIL_PATTERN,
  MAX_MISSING_LENGTH,
  MAX_NOTES_LENGTH,
  PHONE_PATTERN,
  formatAttachmentLimitsHelp,
  validateAttachmentList,
} from '@/lib/lead-shared';

type FormErrors = Record<string, string>;

type WizardStep = 0 | 1 | 2 | 3;

type TradeGroupId = 'services' | 'hubs' | 'trades' | 'divisions';

type TradeOption = {
  id: string;
  value: string;
  label: string;
  group: TradeGroupId;
};

type ReviewSnapshot = {
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  type: string;
  stage: string;
  state: string;
  due: string;
  notes: string;
  missing: string;
  trades: string[];
  files: string[];
};

type ApiErrorBody = {
  ok?: boolean;
  message?: string;
  errors?: FormErrors;
};

const ESTIMATION_HUB_OPTIONS = [
  'General construction estimate',
  'Industrial projects',
  'Public / infrastructure projects',
] as const;

const STEP_META = [
  { id: 'details', short: 'You & Project', title: 'You and your project', description: 'Tell us who you are and the basics of the project.' },
  { id: 'services', short: 'Services', title: 'What do you need?', description: 'Select the services, trades, or divisions that apply. You can choose more than one.' },
  { id: 'scope', short: 'Scope & Files', title: 'Scope and files', description: 'Describe the decision or deliverable you need, and share files if you have them.' },
  { id: 'review', short: 'Review', title: 'Review and submit', description: 'Confirm the brief, then send it to our team.' },
] as const;

const ROLE_OPTIONS = [
  'General contractor',
  'Subcontractor',
  'Owner / developer',
  'Architect / engineer',
  'Investor',
  'Other project team member',
] as const;

const TYPE_OPTIONS = [
  'Commercial',
  'Industrial / warehouse',
  'Multi-family',
  'Residential',
  'Public / infrastructure',
  'Hospitality / recreation',
] as const;

const STAGE_OPTIONS = [
  'Early concept / feasibility',
  'Design development',
  'Permit / pricing set',
  'Bid in progress',
  'Construction / revision support',
  'Acquisition review',
] as const;

const FULL_SUPPORT_VALUE = 'Full project support';

function buildTradeOptions(): TradeOption[] {
  const services: TradeOption[] = CONTENT_SERVICES.map((s) => ({
    id: `svc-${s.slug}`,
    value: s.name,
    label: s.name,
    group: 'services',
  }));
  const hubs: TradeOption[] = ESTIMATION_HUB_OPTIONS.map((label) => ({
    id: `hub-${label}`,
    value: label,
    label,
    group: 'hubs',
  }));
  const trades: TradeOption[] = TRADE_ESTIMATION_PAGES.map((t) => ({
    id: `trade-${t.slug}`,
    value: t.name,
    label: t.name,
    group: 'trades',
  }));
  const divisions: TradeOption[] = TRADES.map((t) => ({
    id: `div-${t.slug}`,
    value: `Div ${t.div}: ${t.name}`,
    label: `Div ${t.div}: ${t.name}`,
    group: 'divisions',
  }));
  return [...services, ...hubs, ...trades, ...divisions];
}

function readField(form: HTMLFormElement, name: string): string {
  return String(new FormData(form).get(name) ?? '').trim();
}

function validateStep(form: HTMLFormElement, step: WizardStep): FormErrors {
  const data = new FormData(form);
  const errors: FormErrors = {};

  if (step === 0) {
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const location = String(data.get('state') ?? '').trim();
    const date = String(data.get('due') ?? '');
    if (!String(data.get('name') ?? '').trim()) errors.name = 'Enter your name.';
    if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.';
    if (phone && !PHONE_PATTERN.test(phone)) errors.phone = 'Enter a valid phone number or leave this field blank.';
    if (!location) errors.state = 'Add the project location.';
    if (!date) errors.due = 'Add the important project date.';
    if (date && new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) {
      errors.due = 'Choose today or a future date.';
    }
  }

  if (step === 1) {
    if (!data.getAll('trade').length) errors.trade = 'Select at least one service or division.';
  }

  if (step === 2) {
    const notes = String(data.get('notes') ?? '').trim();
    const missing = String(data.get('missing') ?? '').trim();
    if (notes.length < 20) errors.notes = 'Add at least 20 characters describing the scope or decision.';
    if (notes.length > MAX_NOTES_LENGTH) {
      errors.notes = `Scope notes must be ${MAX_NOTES_LENGTH.toLocaleString()} characters or fewer.`;
    }
    if (missing.length > MAX_MISSING_LENGTH) {
      errors.missing = `Known gaps must be ${MAX_MISSING_LENGTH.toLocaleString()} characters or fewer.`;
    }
    const files = form.elements.namedItem('files') as HTMLInputElement | null;
    if (files?.files?.length) {
      const fileError = validateAttachmentList(Array.from(files.files));
      if (fileError) errors.files = fileError;
    }
  }

  if (step === 3) {
    if (!data.get('contact-consent')) errors['contact-consent'] = 'Consent is required before submitting.';
  }

  return errors;
}

function focusFirstError(form: HTMLFormElement, errors: FormErrors): void {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return;
  if (firstKey === 'trade') {
    form.querySelector<HTMLInputElement>('input[name="trade"]')?.focus();
  } else if (firstKey === 'contact-consent') {
    form.querySelector<HTMLInputElement>('#c-contact')?.focus();
  } else {
    const first = form.elements.namedItem(firstKey) as HTMLElement | null;
    first?.focus();
  }
}

function formatDueDate(value: string): string {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const baseId = useId();

  const tradeOptions = useMemo(() => buildTradeOptions(), []);
  const tradeByValue = useMemo(() => {
    const map = new Map<string, TradeOption>();
    for (const option of tradeOptions) map.set(option.value, option);
    return map;
  }, [tradeOptions]);

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<WizardStep>(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [openGroups, setOpenGroups] = useState<Record<TradeGroupId, boolean>>({
    services: true,
    hubs: false,
    trades: false,
    divisions: false,
  });
  const [review, setReview] = useState<ReviewSnapshot | null>(null);

  const syncSelectedTrades = useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    const values = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="trade"]:checked')).map(
      (input) => input.value,
    );
    setSelectedTrades(values);
  }, []);

  const buildReviewSnapshot = useCallback((): ReviewSnapshot | null => {
    const form = formRef.current;
    if (!form) return null;
    return {
      name: readField(form, 'name'),
      company: readField(form, 'company'),
      email: readField(form, 'email'),
      phone: readField(form, 'phone'),
      role: readField(form, 'role'),
      type: readField(form, 'type'),
      stage: readField(form, 'stage'),
      state: readField(form, 'state'),
      due: readField(form, 'due'),
      notes: readField(form, 'notes'),
      missing: readField(form, 'missing'),
      trades: selectedTrades,
      files: selectedFiles,
    };
  }, [selectedFiles, selectedTrades]);

  const goToStep = useCallback((next: WizardStep) => {
    setStep(next);
    setErrors({});
    setSubmitError(null);
    if (next === 3) {
      setReview(buildReviewSnapshot());
    }
  }, [buildReviewSnapshot]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const heading = form.querySelector<HTMLElement>(`.wizard-step.is-active .wizard-step-heading h3`);
    heading?.focus({ preventScroll: true });
  }, [step]);

  const groupCounts = useMemo(() => {
    const counts: Record<TradeGroupId, number> = { services: 0, hubs: 0, trades: 0, divisions: 0 };
    for (const value of selectedTrades) {
      if (value === FULL_SUPPORT_VALUE) continue;
      const option = tradeByValue.get(value);
      if (option) counts[option.group] += 1;
    }
    return counts;
  }, [selectedTrades, tradeByValue]);

  const fullSupportSelected = selectedTrades.includes(FULL_SUPPORT_VALUE);

  function toggleGroup(group: TradeGroupId): void {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  }

  function removeTrade(value: string): void {
    const form = formRef.current;
    if (!form) return;
    const input = form.querySelector<HTMLInputElement>(`input[name="trade"][value="${CSS.escape(value)}"]`);
    if (input) {
      input.checked = false;
      syncSelectedTrades();
    }
  }

  function handleContinue(): void {
    const form = formRef.current;
    if (!form) return;
    const nextErrors = validateStep(form, step);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length) {
      focusFirstError(form, nextErrors);
      return;
    }
    if (step < 3) {
      goToStep((step + 1) as WizardStep);
    }
  }

  function handleBack(): void {
    if (step === 0) return;
    goToStep((step - 1) as WizardStep);
  }

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;

    for (let s = 0; s <= 3; s += 1) {
      const stepErrors = validateStep(form, s as WizardStep);
      if (Object.keys(stepErrors).length) {
        setErrors(stepErrors);
        setSubmitError('Review the highlighted fields before continuing.');
        goToStep(s as WizardStep);
        window.setTimeout(() => focusFirstError(form, stepErrors), 0);
        return;
      }
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const body = new FormData(form);
      const response = await fetch('/api/leads/quote', { method: 'POST', body });
      const payload = (await response.json().catch(() => null)) as ApiErrorBody | null;
      if (!response.ok || !payload?.ok) {
        if (payload?.errors) {
          setErrors(payload.errors);
          const errorKeys = Object.keys(payload.errors);
          const stepForError = ((): WizardStep => {
            const key = errorKeys[0] ?? '';
            if (['name', 'email', 'phone', 'state', 'due', 'company', 'role', 'type', 'stage'].includes(key)) return 0;
            if (key === 'trade') return 1;
            if (['notes', 'missing', 'files'].includes(key)) return 2;
            return 3;
          })();
          goToStep(stepForError);
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

  const progressPct = ((step + 1) / STEP_META.length) * 100;

  const tradeGroups: { id: TradeGroupId; label: string; hint: string; options: TradeOption[] }[] = [
    {
      id: 'services',
      label: 'Services',
      hint: 'Estimating, drawings, engineering, visualization, acquisition',
      options: tradeOptions.filter((o) => o.group === 'services'),
    },
    {
      id: 'hubs',
      label: 'Estimation hubs',
      hint: 'General, industrial, and public project estimating',
      options: tradeOptions.filter((o) => o.group === 'hubs'),
    },
    {
      id: 'trades',
      label: 'Specialty trades',
      hint: 'Trade-specific estimating packages',
      options: tradeOptions.filter((o) => o.group === 'trades'),
    },
    {
      id: 'divisions',
      label: 'CSI MasterFormat divisions',
      hint: 'Division-level takeoff support',
      options: tradeOptions.filter((o) => o.group === 'divisions'),
    },
  ];

  return (
    <form
      ref={formRef}
      className="form wizard"
      onSubmit={submit}
      noValidate
      aria-describedby="form-status"
    >
      <div className="field" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor="q-website">Website</label>
        <input id="q-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <nav className="wizard-progress" aria-label="Request progress">
        {STEP_META.map((meta, index) => {
          const stepIndex = index as WizardStep;
          const isCurrent = step === stepIndex;
          const isComplete = step > stepIndex;
          const canJump = isComplete;
          return (
            <button
              key={meta.id}
              type="button"
              className={`wizard-progress-step${isCurrent ? ' is-current' : ''}${isComplete ? ' is-complete' : ''}`}
              aria-current={isCurrent ? 'step' : undefined}
              disabled={!canJump && !isCurrent}
              onClick={() => {
                if (canJump) goToStep(stepIndex);
              }}
            >
              <span className="wizard-progress-dot" aria-hidden="true">
                {isComplete ? '✓' : index + 1}
              </span>
              <span className="wizard-progress-label">{meta.short}</span>
            </button>
          );
        })}
      </nav>

      <div className="wizard-progress-mobile">
        <div className="wizard-progress-mobile-meta">
          <b>
            Step {step + 1} of {STEP_META.length}
          </b>
          <span>{STEP_META[step].short}</span>
        </div>
        <div
          className="wizard-progress-bar"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEP_META.length}
          aria-valuenow={step + 1}
          aria-label={`Step ${step + 1} of ${STEP_META.length}: ${STEP_META[step].short}`}
        >
          <div className="wizard-progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="wizard-body">
        {/* Step 1: You & Project */}
        <div
          className={`wizard-step${step === 0 ? ' is-active' : ''}`}
          role="group"
          aria-labelledby={`${baseId}-step-0-title`}
          aria-hidden={step !== 0}
          inert={step !== 0 ? true : undefined}
        >
          <div className="wizard-step-heading">
            <h3 id={`${baseId}-step-0-title`} tabIndex={-1}>
              {STEP_META[0].title}
            </h3>
            <p>{STEP_META[0].description}</p>
          </div>

          <div className="wizard-group">
            <div className="wizard-group-label">Your details</div>
            <div className="wizard-fields">
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
                <label htmlFor="q-company">Company</label>
                <input id="q-company" name="company" type="text" autoComplete="organization" placeholder="Company name" />
              </div>
              <div className="field full">
                <label htmlFor="q-role">I am a</label>
                <select id="q-role" name="role" defaultValue={ROLE_OPTIONS[0]}>
                  {ROLE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="wizard-group">
            <div className="wizard-group-label">Project context</div>
            <div className="wizard-fields">
              <div className="field">
                <label htmlFor="q-type">Project type</label>
                <select id="q-type" name="type" defaultValue={TYPE_OPTIONS[0]}>
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="q-stage">
                  Project stage <span className="optional">(optional)</span>
                </label>
                <select id="q-stage" name="stage" defaultValue={STAGE_OPTIONS[0]}>
                  {STAGE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
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
            </div>
          </div>
        </div>

        {/* Step 2: Services */}
        <div
          className={`wizard-step${step === 1 ? ' is-active' : ''}`}
          role="group"
          aria-labelledby={`${baseId}-step-1-title`}
          aria-hidden={step !== 1}
          inert={step !== 1 ? true : undefined}
        >
          <div className="wizard-step-heading">
            <h3 id={`${baseId}-step-1-title`} tabIndex={-1}>
              {STEP_META[1].title}
            </h3>
            <p>{STEP_META[1].description}</p>
          </div>

          <label className={`trade-quick-pick${fullSupportSelected ? ' is-selected' : ''}`}>
            <input
              type="checkbox"
              id="q-trade-full"
              name="trade"
              value={FULL_SUPPORT_VALUE}
              onChange={syncSelectedTrades}
            />
            <span className="trade-quick-body">
              <b>Full project support</b>
              <span>Not sure which service fits? Select this and we will help define the right scope.</span>
            </span>
          </label>

          {selectedTrades.length > 0 && (
            <div className="trade-chips" aria-live="polite">
              {selectedTrades.map((value) => (
                <span className="trade-chip-selected" key={value}>
                  <span>{value === FULL_SUPPORT_VALUE ? 'Full project support' : (tradeByValue.get(value)?.label ?? value)}</span>
                  <button type="button" aria-label={`Remove ${value}`} onClick={() => removeTrade(value)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <fieldset
            className="trade-fieldset"
            aria-invalid={Boolean(errors.trade)}
            aria-describedby={errors.trade ? 'error-trade' : 'hint-trade'}
          >
            <legend className="sr-only">Services or trades needed</legend>
            <div className="trade-accordion">
              {tradeGroups.map((group) => {
                const isOpen = openGroups[group.id];
                const count = groupCounts[group.id];
                const panelId = `${baseId}-panel-${group.id}`;
                const headerId = `${baseId}-header-${group.id}`;
                return (
                  <div className="trade-accordion-item" key={group.id}>
                    <button
                      type="button"
                      className="trade-accordion-header"
                      id={headerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleGroup(group.id)}
                    >
                      <span className="trade-accordion-title">
                        <b>{group.label}</b>
                        <span className={count > 0 ? 'has-count' : undefined}>
                          {count > 0 ? `${count} selected` : group.hint}
                        </span>
                      </span>
                      <span className="trade-accordion-chevron" aria-hidden="true">
                        +
                      </span>
                    </button>
                    <div
                      className={`trade-accordion-panel${isOpen ? ' is-open' : ''}`}
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      inert={!isOpen ? true : undefined}
                    >
                      <div className="trade-accordion-options">
                        {group.options.map((option) => (
                          <div className="check" key={option.id}>
                            <input
                              type="checkbox"
                              id={`q-trade-${option.id}`}
                              name="trade"
                              value={option.value}
                              onChange={syncSelectedTrades}
                            />
                            <label htmlFor={`q-trade-${option.id}`}>{option.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <span className="hint" id="hint-trade">
            Select every service or trade that applies. Open a category to see options.
          </span>
          {errors.trade && (
            <span className="form-error" id="error-trade">
              {errors.trade}
            </span>
          )}
        </div>

        {/* Step 3: Scope & Files */}
        <div
          className={`wizard-step${step === 2 ? ' is-active' : ''}`}
          role="group"
          aria-labelledby={`${baseId}-step-2-title`}
          aria-hidden={step !== 2}
          inert={step !== 2 ? true : undefined}
        >
          <div className="wizard-step-heading">
            <h3 id={`${baseId}-step-2-title`} tabIndex={-1}>
              {STEP_META[2].title}
            </h3>
            <p>{STEP_META[2].description}</p>
          </div>

          <div className="field full">
            <label htmlFor="q-notes">Scope notes</label>
            <textarea
              id="q-notes"
              name="notes"
              required
              rows={5}
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
              aria-invalid={Boolean(errors.missing)}
              aria-describedby={errors.missing ? 'error-missing' : undefined}
            />
            {errors.missing && (
              <span className="form-error" id="error-missing">
                {errors.missing}
              </span>
            )}
          </div>

          <div className="field full">
            <label htmlFor="q-files">
              Project files <span className="optional">(optional)</span>
            </label>
            <label className="dropzone" htmlFor="q-files">
              <b>Share your project files</b>
              {formatAttachmentLimitsHelp()}, or <u>browse files</u>
              <br />
              Paste a plan-room link in the notes for larger sets
            </label>
            <input
              id="q-files"
              name="files"
              type="file"
              accept={ALLOWED_FILE_ACCEPT}
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
        </div>

        {/* Step 4: Review & Submit */}
        <div
          className={`wizard-step${step === 3 ? ' is-active' : ''}`}
          role="group"
          aria-labelledby={`${baseId}-step-3-title`}
          aria-hidden={step !== 3}
          inert={step !== 3 ? true : undefined}
        >
          <div className="wizard-step-heading">
            <h3 id={`${baseId}-step-3-title`} tabIndex={-1}>
              {STEP_META[3].title}
            </h3>
            <p>{STEP_META[3].description}</p>
          </div>

          <div className="review-sections">
            <div className="review-section">
              <div className="review-section-head">
                <h4>You and your project</h4>
                <button type="button" className="review-edit" onClick={() => goToStep(0)}>
                  Edit
                </button>
              </div>
              <dl className="review-dl">
                <dt>Name</dt>
                <dd>{review?.name || '—'}</dd>
                <dt>Email</dt>
                <dd>{review?.email || '—'}</dd>
                {review?.phone ? (
                  <>
                    <dt>Phone</dt>
                    <dd>{review.phone}</dd>
                  </>
                ) : null}
                {review?.company ? (
                  <>
                    <dt>Company</dt>
                    <dd>{review.company}</dd>
                  </>
                ) : null}
                <dt>Role</dt>
                <dd>{review?.role || '—'}</dd>
                <dt>Project type</dt>
                <dd>{review?.type || '—'}</dd>
                <dt>Stage</dt>
                <dd>{review?.stage || '—'}</dd>
                <dt>Location</dt>
                <dd>{review?.state || '—'}</dd>
                <dt>Important date</dt>
                <dd>{review?.due ? formatDueDate(review.due) : '—'}</dd>
              </dl>
            </div>

            <div className="review-section">
              <div className="review-section-head">
                <h4>Services needed</h4>
                <button type="button" className="review-edit" onClick={() => goToStep(1)}>
                  Edit
                </button>
              </div>
              {review?.trades.length ? (
                <div className="trade-chips">
                  {review.trades.map((value) => (
                    <span className="trade-chip-selected" key={value}>
                      <span>{value}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="review-empty">No services selected.</p>
              )}
            </div>

            <div className="review-section">
              <div className="review-section-head">
                <h4>Scope and files</h4>
                <button type="button" className="review-edit" onClick={() => goToStep(2)}>
                  Edit
                </button>
              </div>
              <p className="review-scope">{review?.notes || '—'}</p>
              {review?.missing ? (
                <>
                  <div className="wizard-group-label" style={{ marginTop: 4 }}>
                    Known gaps
                  </div>
                  <p className="review-scope">{review.missing}</p>
                </>
              ) : null}
              {review?.files.length ? (
                <ul className="file-list">
                  {review.files.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p className="review-empty">No files attached.</p>
              )}
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

          <div className="wizard-talk">
            <div className="wizard-group-label">Prefer to talk?</div>
            <a className="btn btn-ghost btn-sm" href={`tel:${BRAND.phoneRaw}`}>
              Call {BRAND.phoneDisplay}
            </a>
            <a
              className="btn btn-ghost btn-sm"
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {BRAND.phoneDisplay} →
            </a>
          </div>
        </div>

        <div className="field full" id="form-status" aria-live="polite">
          {(Object.keys(errors).length > 0 || submitError) && (
            <p className="form-error" role="alert">
              {submitError ?? 'Review the highlighted fields before continuing.'}
            </p>
          )}
        </div>

        <div className="wizard-nav">
          {step > 0 ? (
            <button type="button" className="btn btn-ghost" onClick={handleBack} disabled={submitting}>
              Back
            </button>
          ) : (
            <span className="wizard-nav-spacer" aria-hidden="true" />
          )}
          {step < 3 ? (
            <button type="button" className="btn btn-primary" onClick={handleContinue}>
              Continue
            </button>
          ) : (
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Submit request'}
            </button>
          )}
        </div>

        {step === 3 && (
          <span className="hint" style={{ textAlign: 'center' }}>
            We email your brief to {BRAND.email}. Prefer to talk? Call {BRAND.phoneDisplay}.
          </span>
        )}
      </div>
    </form>
  );
}
