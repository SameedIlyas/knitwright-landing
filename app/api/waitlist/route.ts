import { NextResponse } from "next/server";
import { fieldErrors, waitlistSchema } from "@/lib/waitlist";

/**
 * POST /api/waitlist — validates with zod and records the request.
 *
 * TODO(storage): point this at a real store in one edit. Keys live in env vars only,
 * never in client code.
 *
 *   // Resend (email to the team + confirmation to the brand)
 *   // const resend = new Resend(process.env.RESEND_API_KEY);
 *   // await resend.emails.send({ from: "Knitwright <hello@knitwright.com>", to: data.email, ... });
 *
 *   // Supabase
 *   // const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
 *   // await supabase.from("waitlist").insert(data);
 *
 *   // Google Sheets (via a service account)
 *   // await sheets.spreadsheets.values.append({ spreadsheetId: process.env.SHEET_ID, ... });
 */

// Best-effort per-instance rate limit. Swap for a shared store (Upstash, Redis) in production.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const next = [...recent, now];
  hits.set(ip, next);
  return next.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Check the highlighted fields.", fields: fieldErrors(parsed.error) }, { status: 422 });
  }

  const { website, ...data } = parsed.data;
  if (website) {
    // Honeypot tripped: answer as if it worked, store nothing.
    return NextResponse.json({ ok: true });
  }

  // Log without the email so the log itself doesn't become a list of addresses.
  console.info("[waitlist] request", { brand: data.brand, category: data.category, volume: data.volume, at: new Date().toISOString() });

  return NextResponse.json({ ok: true, category: data.category });
}
