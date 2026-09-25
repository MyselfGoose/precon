import { Resend } from 'resend';
import { BRAND } from '@/lib/content';
import {
  EMAIL_PATTERN,
  MAX_MISSING_LENGTH,
  MAX_NOTES_LENGTH,
  PHONE_PATTERN,
  fileExtension,
  validateAttachmentList,
} from '@/lib/lead-shared';

export {
  ALLOWED_FILE_ACCEPT,
  ALLOWED_FILE_EXTENSIONS,
  EMAIL_PATTERN,
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENT_MB_LABEL,
  MAX_MISSING_LENGTH,
  MAX_NOTES_LENGTH,
  MAX_TOTAL_ATTACHMENT_BYTES,
  MAX_TOTAL_ATTACHMENT_MB_LABEL,
  PHONE_PATTERN,
  formatAttachmentLimitsHelp,
  validateAttachmentList,
} from '@/lib/lead-shared';

export type FieldErrors = Record<string, string>;

export type LeadAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export type QuoteLeadPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  type: string;
  stage: string;
  trades: string[];
  state: string;
  due: string;
  notes: string;
  missing: string;
  contactConsent: boolean;
  marketingConsent: boolean;
  website: string;
};

export type AcquisitionLeadPayload = {
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  type: string;
  condition: string;
  notes: string;
  contactConsent: boolean;
  website: string;
};

function trim(value: FormDataEntryValue | null): string {
  return String(value ?? '').trim();
}

function isChecked(value: FormDataEntryValue | null): boolean {
  return value === 'on' || value === 'true' || value === '1';
}

function enforceTextLength(value: string, max: number, fieldLabel: string, errors: FieldErrors, key: string): void {
  if (value.length > max) {
    errors[key] = `${fieldLabel} must be ${max.toLocaleString()} characters or fewer.`;
  }
}

export function validateQuoteFields(data: FormData): { errors: FieldErrors; payload: QuoteLeadPayload | null } {
  const errors: FieldErrors = {};
  const name = trim(data.get('name'));
  const company = trim(data.get('company'));
  const email = trim(data.get('email'));
  const phone = trim(data.get('phone'));
  const role = trim(data.get('role'));
  const type = trim(data.get('type'));
  const stage = trim(data.get('stage'));
  const state = trim(data.get('state'));
  const due = trim(data.get('due'));
  const notes = trim(data.get('notes'));
  const missing = trim(data.get('missing'));
  const website = trim(data.get('website'));
  const trades = data.getAll('trade').map((t) => String(t).trim()).filter(Boolean);
  const contactConsent = isChecked(data.get('contact-consent'));
  const marketingConsent = isChecked(data.get('marketing-consent'));

  if (!name) errors.name = 'Enter your name.';
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.';
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = 'Enter a valid phone number or leave this field blank.';
  if (!trades.length) errors.trade = 'Select at least one service or division.';
  if (!state) errors.state = 'Add the project location.';
  if (!due) errors.due = 'Add the important project date.';
  if (due && new Date(`${due}T00:00:00`) < new Date(new Date().toDateString())) {
    errors.due = 'Choose today or a future date.';
  }
  if (notes.length < 20) errors.notes = 'Add at least 20 characters describing the scope or decision.';
  enforceTextLength(notes, MAX_NOTES_LENGTH, 'Scope notes', errors, 'notes');
  enforceTextLength(missing, MAX_MISSING_LENGTH, 'Known gaps', errors, 'missing');
  if (!contactConsent) errors['contact-consent'] = 'Consent is required before submitting.';

  if (Object.keys(errors).length) return { errors, payload: null };

  return {
    errors,
    payload: {
      name,
      company,
      email,
      phone,
      role,
      type,
      stage,
      trades,
      state,
      due,
      notes,
      missing,
      contactConsent,
      marketingConsent,
      website,
    },
  };
}

export function validateAcquisitionFields(data: FormData): {
  errors: FieldErrors;
  payload: AcquisitionLeadPayload | null;
} {
  const errors: FieldErrors = {};
  const name = trim(data.get('name'));
  const email = trim(data.get('email'));
  const phone = trim(data.get('phone'));
  const role = trim(data.get('role'));
  const address = trim(data.get('address'));
  const type = trim(data.get('type'));
  const condition = trim(data.get('condition'));
  const notes = trim(data.get('notes'));
  const website = trim(data.get('website'));
  const contactConsent = isChecked(data.get('contact-consent'));

  if (!name) errors.name = 'Enter your name.';
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.';
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = 'Enter a valid phone number or leave this field blank.';
  if (!address) errors.address = 'Add the property address or location.';
  if (notes.length < 20) errors.notes = 'Add at least 20 characters describing the property and your situation.';
  enforceTextLength(notes, MAX_NOTES_LENGTH, 'Details', errors, 'notes');
  if (!contactConsent) errors['contact-consent'] = 'Consent is required before submitting.';

  if (Object.keys(errors).length) return { errors, payload: null };

  return {
    errors,
    payload: {
      name,
      email,
      phone,
      role,
      address,
      type,
      condition,
      notes,
      contactConsent,
      website,
    },
  };
}

export async function collectAttachments(data: FormData): Promise<{ attachments: LeadAttachment[]; error?: string }> {
  const files = data.getAll('files').filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (!files.length) return { attachments: [] };

  const validationError = validateAttachmentList(files);
  if (validationError) return { attachments: [], error: validationError };

  const attachments: LeadAttachment[] = [];
  for (const file of files) {
    const ext = fileExtension(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name.replace(/[^\w.\- ()[\]]+/g, '_').slice(0, 180) || `attachment${ext}`,
      content: buffer,
      contentType: file.type || 'application/octet-stream',
    });
  }

  return { attachments };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rowsHtml(rows: Array<[string, string]>): string {
  return rows
    .filter(([, v]) => v.trim().length > 0)
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#555;white-space:nowrap;"><b>${escapeHtml(label)}</b></td><td style="padding:6px 0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`)
    .join('');
}

function rowsText(rows: Array<[string, string]>): string {
  return rows
    .filter(([, v]) => v.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

export function buildQuoteEmail(payload: QuoteLeadPayload, attachmentNames: string[]): { subject: string; html: string; text: string } {
  const rows: Array<[string, string]> = [
    ['Name', payload.name],
    ['Company', payload.company],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['Role', payload.role],
    ['Project type', payload.type],
    ['Stage', payload.stage],
    ['Services / divisions', payload.trades.join(', ')],
    ['Location', payload.state],
    ['Important date', payload.due],
    ['Scope notes', payload.notes],
    ['Known gaps', payload.missing],
    ['Marketing consent', payload.marketingConsent ? 'Yes' : 'No'],
    ['Attachments', attachmentNames.length ? attachmentNames.join(', ') : 'None'],
  ];

  return {
    subject: `Quote request - ${payload.name}${payload.company ? ` (${payload.company})` : ''}`,
    html: `<div style="font-family:Georgia,serif;font-size:15px;line-height:1.5;color:#111;"><p>New project quote request from the website.</p><table>${rowsHtml(rows)}</table></div>`,
    text: `New project quote request from the website.\n\n${rowsText(rows)}`,
  };
}

export function buildAcquisitionEmail(
  payload: AcquisitionLeadPayload,
  attachmentNames: string[],
): { subject: string; html: string; text: string } {
  const rows: Array<[string, string]> = [
    ['Name', payload.name],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['Role', payload.role],
    ['Property address', payload.address],
    ['Property type', payload.type],
    ['Condition', payload.condition],
    ['Details', payload.notes],
    ['Attachments', attachmentNames.length ? attachmentNames.join(', ') : 'None'],
  ];

  return {
    subject: `Property acquisition - ${payload.address}`,
    html: `<div style="font-family:Georgia,serif;font-size:15px;line-height:1.5;color:#111;"><p>New property acquisition inquiry from the website.</p><table>${rowsHtml(rows)}</table></div>`,
    text: `New property acquisition inquiry from the website.\n\n${rowsText(rows)}`,
  };
}

export type SendLeadResult =
  | { ok: true; id: string }
  | { ok: false; status: number; message: string; errors?: FieldErrors };

function leadConfig(): { apiKey: string; to: string; from: string } | { error: string } {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? '';
  if (!apiKey) {
    return {
      error:
        'Lead delivery is not configured (missing RESEND_API_KEY). Set it in the environment and try again, or call us directly.',
    };
  }
  const to = process.env.LEAD_TO_EMAIL?.trim() || BRAND.email;
  const from = process.env.LEAD_FROM_EMAIL?.trim() || `CSI & Design <onboarding@resend.dev>`;
  return { apiKey, to, from };
}

/** Simple in-memory rate limit per IP (best-effort on serverless). */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const rateBuckets = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const prior = (rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (prior.length >= RATE_MAX) {
    rateBuckets.set(ip, prior);
    return false;
  }
  prior.push(now);
  rateBuckets.set(ip, prior);
  return true;
}

export async function sendLeadEmail(input: {
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  attachments: LeadAttachment[];
  /** Honeypot: if filled, pretend success without sending. */
  website: string;
}): Promise<SendLeadResult> {
  if (input.website) {
    return { ok: true, id: 'sent' };
  }

  const config = leadConfig();
  if ('error' in config) {
    return { ok: false, status: 503, message: config.error };
  }

  const resend = new Resend(config.apiKey);
  const { data, error } = await resend.emails.send({
    from: config.from,
    to: [config.to],
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
    attachments: input.attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  });

  if (error) {
    console.error('Resend lead email failed', error);
    return {
      ok: false,
      status: 502,
      message: 'We could not deliver your request just now. Please try again or call us directly.',
    };
  }

  return { ok: true, id: data?.id ?? 'sent' };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
