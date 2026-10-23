/** Client-safe attachment and field limits shared by forms and API validation. */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_PATTERN = /^[+()\d\s.-]{7,}$/;
/** http(s) URLs for plan-room / cloud document links. */
export const PLAN_ROOM_URL_PATTERN = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

/**
 * Per-file and total caps for email attachments (under typical Vercel body limits ~4.5 MB).
 * Larger sets should use the plan-room link field or direct-to-storage upload when enabled.
 */
export const MAX_ATTACHMENT_BYTES = Math.floor(3.5 * 1024 * 1024);
export const MAX_TOTAL_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const MAX_ATTACHMENT_MB_LABEL = '3.5';
export const MAX_TOTAL_ATTACHMENT_MB_LABEL = '4';
/** Direct-to-storage target when BLOB_READ_WRITE_TOKEN is configured (100 MB first). */
export const MAX_BLOB_UPLOAD_BYTES = 100 * 1024 * 1024;
export const MAX_BLOB_UPLOAD_MB_LABEL = '100';
export const ALLOWED_FILE_EXTENSIONS = new Set(['.pdf', '.zip', '.dwg']);
export const ALLOWED_FILE_ACCEPT = '.pdf,.zip,.dwg';
export const MAX_NOTES_LENGTH = 5000;
export const MAX_MISSING_LENGTH = 2000;
export const MAX_PLAN_ROOM_URL_LENGTH = 2048;

export function validatePlanRoomUrl(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > MAX_PLAN_ROOM_URL_LENGTH) {
    return `Plan-room link must be ${MAX_PLAN_ROOM_URL_LENGTH.toLocaleString()} characters or fewer.`;
  }
  if (!PLAN_ROOM_URL_PATTERN.test(trimmed)) {
    return 'Enter a valid http(s) plan-room or cloud link.';
  }
  return undefined;
}

function extensionOf(filename: string): string {
  const idx = filename.lastIndexOf('.');
  if (idx < 0) return '';
  return filename.slice(idx).toLowerCase();
}

export function formatAttachmentLimitsHelp(): string {
  return `PDF, ZIP, or DWG up to ${MAX_ATTACHMENT_MB_LABEL} MB each (${MAX_TOTAL_ATTACHMENT_MB_LABEL} MB total)`;
}

export function validateAttachmentList(files: Iterable<File>): string | undefined {
  let total = 0;
  for (const file of files) {
    if (!file.size) continue;
    const ext = extensionOf(file.name);
    if (!ALLOWED_FILE_EXTENSIONS.has(ext)) {
      return 'Only PDF, ZIP, and DWG files are accepted.';
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return `Each file must be smaller than ${MAX_ATTACHMENT_MB_LABEL} MB for email delivery. Use the plan-room link field for larger sets.`;
    }
    total += file.size;
    if (total > MAX_TOTAL_ATTACHMENT_BYTES) {
      return `Total attachments must be under ${MAX_TOTAL_ATTACHMENT_MB_LABEL} MB. Use the plan-room link field for larger sets.`;
    }
  }
  return undefined;
}

export function fileExtension(filename: string): string {
  return extensionOf(filename);
}
