# Knitwright — marketing site

Early-access landing page for Knitwright. Next.js 16 (App Router) · React 19 · Tailwind v4 · Motion · three.js.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck
```

## Where things live

| Path | What |
|---|---|
| `lib/content.ts` | Every word on the page (source: `landing-page-content.md`) |
| `lib/data/flats.json` | Garment flat geometry + graded measurements, exported from the Knitwright app's `lib/garment` |
| `lib/waitlist.ts` | zod schema shared by the form and the API route |
| `app/api/waitlist/route.ts` | Waitlist endpoint — validates, rate-limits, logs. **Storage is a TODO** (Resend / Supabase / Sheets adapters sketched in the file) |
| `components/sections/*` | One file per page section |
| `components/visuals/KnotScene.tsx` | Procedural 3D knot in the hero (no external model) |
| `components/visuals/Flat.tsx` | Annotated technical flat renderer |
| `app/globals.css` | Design tokens (one `:root` block) and component classes |

## Before launch

- `hello@knitwright.com` in `lib/content.ts` is a placeholder — set the real contact address.
- Privacy / Terms links point at `#privacy` / `#terms` — add the pages.
- FAQ answers marked `placeholder: true` (minimums, lead times, pricing) show a "To confirm" tag.
- Reviewer name "Adeel R." and the studio queue / capacity data are illustrative and labelled as such.
- Wire `/api/waitlist` to a real store; the in-memory rate limit is per-instance only.

## Regenerating the flats

The flats come from the app's garment IR. `scripts/dump-flats.ts` imports from the
`kitwright` repo, so run it from there (it's excluded from this project's typecheck):

```bash
cd ../kitwright
npx tsx --tsconfig ./tsconfig.json ../knitwright/scripts/dump-flats.ts ../knitwright/lib/data/flats.json
```
