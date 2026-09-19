import {
  buildAcquisitionEmail,
  checkRateLimit,
  clientIp,
  collectAttachments,
  sendLeadEmail,
  validateAcquisitionFields,
} from '@/lib/leads';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  const ip = clientIp(request);
  if (!checkRateLimit(ip)) {
    return Response.json(
      { ok: false, message: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 },
    );
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ ok: false, message: 'Invalid form submission.' }, { status: 400 });
  }

  const { errors, payload } = validateAcquisitionFields(data);
  if (!payload) {
    return Response.json({ ok: false, message: 'Review the highlighted fields.', errors }, { status: 400 });
  }

  const { attachments, error: fileError } = await collectAttachments(data);
  if (fileError) {
    return Response.json({ ok: false, message: fileError, errors: { files: fileError } }, { status: 400 });
  }

  const email = buildAcquisitionEmail(
    payload,
    attachments.map((a) => a.filename),
  );
  const result = await sendLeadEmail({
    replyTo: payload.email,
    subject: email.subject,
    html: email.html,
    text: email.text,
    attachments,
    website: payload.website,
  });

  if (!result.ok) {
    return Response.json({ ok: false, message: result.message, errors: result.errors }, { status: result.status });
  }

  return Response.json({ ok: true, id: result.id });
}
