## CSI & Design frontend

Next.js App Router site for CSI & Design — estimation, design, and property acquisition.

### Dev

```bash
npm install
npm run dev
```

After large route or content changes, clear the Next cache and restart:

```bash
npm run fresh
```

### Production env (Vercel)

Set these on the Production environment for project `precon` (`rootDirectory`: `frontend`):

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Without it, quote and acquisition forms return 503 |
| `LEAD_FROM_EMAIL` | Yes | Must use a **verified** Resend domain (not `onboarding@resend.dev`) |
| `LEAD_TO_EMAIL` | Recommended | Defaults to `hello@csianddesign.com` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Defaults to `https://csianddesign.com` |

Copy `.env.example` for local keys. After deploy, smoke-test:

- `POST /api/leads/quote`
- `POST /api/leads/acquisition`

### Brand contacts

- Phone / WhatsApp: +1 (227) 204-9141 (`tel:+12272049141`, `https://wa.me/12272049141`)
- Email: hello@csianddesign.com
