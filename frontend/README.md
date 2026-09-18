## PreCon Ext frontend

This is a lightweight Next.js App Router site for PreCon Ext, a construction estimating and preconstruction support consultancy.

## Development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

If localhost does not show recent work (but deploy does), you are almost certainly on a stale Next cache or looking at a different git checkout than the one that was edited. Use:

```bash
npm run whereami   # confirms primary checkout + worktrees
npm run fresh      # kills :3000, clears .next, starts a clean dev server
```

Always develop from `/home/goose/goose/projects/hassan/client` — not from `copilot-worktrees/` clones. Agents have previously committed in worktrees that got pushed/deployed while local `main` stayed behind.

Before shipping, run the project checks:

```bash
npm run lint
npm run build
```

## Where things live

- `src/app/**/page.tsx` owns route composition and metadata. Dynamic service and trade pages are generated from route data.
- `src/lib/content.ts` owns current buyer-facing copy, brand language, process copy, and legal page sections.
- `src/lib/data.ts` owns trade measurements, workbook samples, navigation arrays, and legacy service records still supported by the dynamic service route.
- `src/app/components.tsx` owns shared UI primitives such as `PageHead`, `CTA`, `FAQ`, `ServiceSummaryCard`, `TradeTile`, `Spec`, and `Workbook`.
- `src/app/globals.css` owns the visual system, responsive breakpoints, and shared interaction states.
- `src/lib/illustrations.ts` generates the lightweight inline SVG drawings used by the homepage and trade/contact surfaces. Keep them dependency-free and deterministic.

The mobile navigation and project brief form are the only intentionally client-side interactions. The inquiry form currently prepares information in the browser; it does not send email or upload files. Keep copy and privacy disclosures aligned with that limitation until a server submission path is added.
