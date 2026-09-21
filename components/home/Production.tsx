import { PRODUCTION, STUDIO } from "@/lib/content";
import { KnitLogo } from "@/components/ui/logo";
import { Display, Frame } from "./ui";

const CARD = "rounded-[2rem] bg-cobalt-wash p-6 sm:p-7";

/** Bento of production cards around the studio console, the one screen brands never see. */
export function Production() {
  return (
    <section id="production" data-nav-theme="light" className="scroll-mt-24 bg-canvas py-28 sm:py-36">
      <Frame>
        <Display className="max-w-[18ch] text-[clamp(2.6rem,1.4rem+4vw,5.4rem)] leading-[1] tracking-[-0.05em] text-ink-2">{PRODUCTION.title}</Display>
        <p className="mt-6 max-w-[44rem] text-[clamp(1.05rem,0.95rem+0.4vw,1.35rem)] font-light leading-relaxed text-ink-2">{PRODUCTION.body}</p>

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="flex flex-col gap-4 lg:col-span-3 lg:row-span-2">
            {PRODUCTION.escrow.milestones.map((m, i) => (
              <div key={m.label} className={`${CARD} flex-1`}>
                <div className="rounded-3xl bg-white p-5 shadow-[0_10px_30px_-20px_rgba(15,16,18,0.4)]">
                  <p className="font-medium">{m.label}</p>
                  <p className="mt-1 text-sm text-muted">Milestone {i + 1} of {PRODUCTION.escrow.milestones.length}</p>
                  <span
                    className={`mt-5 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      i === 0 ? "bg-ok-wash text-ok" : i === 3 ? "bg-warn-wash text-warn" : "bg-cobalt-wash text-cobalt"
                    }`}
                  >
                    {m.state}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={`${CARD} lg:col-span-4`}>
            <p className="text-lg font-light tracking-tight">{PRODUCTION.costing.title}</p>
            <CostDonut />
          </div>

          <div className="flex flex-col justify-between gap-8 rounded-[2rem] bg-ink p-7 text-white lg:col-span-5">
            <p className="thread-text text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)] font-light leading-[1.08] tracking-[-0.03em]">
              {PRODUCTION.escrow.title}
            </p>
            <p className="max-w-[30rem] leading-relaxed text-white/70">{PRODUCTION.why}</p>
          </div>

          <div className="lg:col-span-9">
            <Console />
          </div>
        </div>
      </Frame>
    </section>
  );
}

function CostDonut() {
  const lines = PRODUCTION.costing.lines;
  const r = 52;
  const c = 2 * Math.PI * r;
  const shades = ["#2b46f0", "#5b70f4", "#8296ff", "#b3c0ff", "#0f1012"];
  const arcs = lines.map((l, i) => {
    const offset = lines.slice(0, i).reduce((s, x) => s + x.weight, 0);
    return { ...l, dash: l.weight * c, offset: offset * c, color: shades[i % shades.length] };
  });
  return (
    <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row lg:flex-col xl:flex-row">
      <svg viewBox="0 0 140 140" className="size-40 shrink-0 -rotate-90" role="img" aria-label="Illustrative split of a per-unit quote">
        {arcs.map((a) => (
          <circle
            key={a.name}
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={a.color}
            strokeWidth="22"
            strokeDasharray={`${Math.max(a.dash - 2, 0)} ${c}`}
            strokeDashoffset={-a.offset}
          />
        ))}
      </svg>
      <ul className="flex w-full flex-col gap-2 text-sm">
        {arcs.map((a) => (
          <li key={a.name} className="flex items-center gap-2.5">
            <span className="size-2.5 rounded-full" style={{ background: a.color }} />
            <span className="flex-1">{a.name}</span>
            <span className="tabular-nums text-muted">{Math.round(a.weight * 100)}%</span>
          </li>
        ))}
        <li className="pt-1 text-xs text-muted">Illustrative shape, not a price list.</li>
      </ul>
    </div>
  );
}

/** The studio's console in a laptop-style window. */
function Console() {
  return (
    <div className="rounded-[2rem] bg-[#1b1c20] p-2 shadow-[0_40px_90px_-40px_rgba(15,16,18,0.7)]">
      <div className="overflow-hidden rounded-[1.6rem] bg-white">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
          <KnitLogo className="h-4 w-auto" />
          <p className="text-xs text-muted">{STUDIO.title}</p>
        </div>
        <div className="grid md:grid-cols-[1fr_15rem]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Spec</th>
                  <th className="px-3 py-3 font-medium">Style</th>
                  <th className="px-3 py-3 font-medium">Brand</th>
                  <th className="px-3 py-3 font-medium">Stage</th>
                  <th className="px-5 py-3 text-right font-medium">Due in</th>
                </tr>
              </thead>
              <tbody>
                {STUDIO.queue.map((q, i) => (
                  <tr key={q.id} className={`border-t border-hairline ${i === 0 ? "bg-cobalt-wash/60" : ""}`}>
                    <td className="px-5 py-3 font-mono text-xs">{q.id}</td>
                    <td className="px-3 py-3">{q.style}</td>
                    <td className="px-3 py-3 text-muted">{q.brand}</td>
                    <td className="px-3 py-3">{q.stage}</td>
                    <td className="px-5 py-3 text-right font-mono text-xs tabular-nums">{q.sla}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4 border-t border-hairline p-5 md:border-l md:border-t-0">
            <p className="text-sm font-medium">Line load</p>
            {STUDIO.lines.map((l) => (
              <div key={l.name}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-muted">{l.name}</span>
                  <span className="tabular-nums">{Math.round(l.load * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-canvas">
                  <div className="h-full rounded-full bg-cobalt" style={{ width: `${l.load * 100}%` }} />
                </div>
              </div>
            ))}
            <p className="mt-auto text-xs leading-relaxed text-muted">{STUDIO.place}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
