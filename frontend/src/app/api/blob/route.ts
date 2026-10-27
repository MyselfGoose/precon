import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { ALLOWED_FILE_EXTENSIONS, MAX_BLOB_UPLOAD_BYTES } from '@/lib/lead-shared';

export const runtime = 'nodejs';

function extensionOf(filename: string): string {
  const idx = filename.lastIndexOf('.');
  if (idx < 0) return '';
  return filename.slice(idx).toLowerCase();
}

/**
 * Client upload token endpoint for direct-to-storage (Vercel Blob).
 * Requires BLOB_READ_WRITE_TOKEN. Large files bypass the email body limit.
 */
export async function POST(request: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      {
        ok: false,
        message:
          'Large file upload isn’t available right now. Paste a plan-room link or attach files under 3.5 MB.',
      },
      { status: 503 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return Response.json({ ok: false, message: 'Invalid upload request.' }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const ext = extensionOf(pathname);
        if (!ALLOWED_FILE_EXTENSIONS.has(ext)) {
          throw new Error('Only PDF, ZIP, and DWG files are accepted.');
        }
        return {
          allowedContentTypes: [
            'application/pdf',
            'application/zip',
            'application/x-zip-compressed',
            'application/acad',
            'application/x-acad',
            'image/vnd.dwg',
            'application/octet-stream',
          ],
          maximumSizeInBytes: MAX_BLOB_UPLOAD_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Lead email carries the blob URL after form submit; no extra action required.
      },
    });
    return Response.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload authorization failed.';
    return Response.json({ ok: false, message }, { status: 400 });
  }
}
