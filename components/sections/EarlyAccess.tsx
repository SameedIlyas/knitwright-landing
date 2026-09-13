import { EARLY_ACCESS } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";
import { WaitlistForm } from "./WaitlistForm";

export function EarlyAccess() {
  return (
    <section id="early-access" className="scroll-mt-24 py-28">
      <Container>
        <SectionHead n={11} label={EARLY_ACCESS.label} title={<WordsIn text={EARLY_ACCESS.title} className="headline max-w-[16ch]" />} sub={EARLY_ACCESS.sub} />

        <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="rounded-[2.5rem] bg-tile p-7 text-chalk sm:p-9">
            <p className="eyebrow text-chalk-muted">From this page to your first delivery</p>
            <ol className="mt-6 flex flex-col">
              {EARLY_ACCESS.path.map((p, i) => (
                <li key={p.step} className="grid grid-cols-[2.25rem_1fr] gap-4 border-t border-white/8 py-4 first:border-t-0 first:pt-0">
                  <span className="font-mono text-sm text-chalk-muted">0{i + 1}</span>
                  <div>
                    <p className="font-medium text-white">{p.step}</p>
                    <p className="mt-0.5 text-sm text-chalk-muted">{p.happens}</p>
                    <p className="mt-1.5 font-mono text-xs text-[#b9c4ff]">You · {p.you}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="bezel !rounded-[2.5rem]">
            <div className="bezel-inner h-full !rounded-[2.1rem] p-6 sm:p-9">
              <WaitlistForm />
              <div className="mt-8 rounded-2xl bg-canvas p-5">
                <p className="eyebrow text-ink">{EARLY_ACCESS.ready.title}</p>
                <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted">
                  {EARLY_ACCESS.ready.items.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span aria-hidden="true">·</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-medium text-ink">{EARLY_ACCESS.ready.note}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
