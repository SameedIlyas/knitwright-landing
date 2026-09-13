import { PROTECTION, REORDER } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";

export function Protection() {
  return (
    <section id="protection" className="bg-canvas py-28">
      <Container>
        <SectionHead n={10} label={PROTECTION.label} title={<WordsIn text={PROTECTION.title} className="headline max-w-[16ch]" />} sub={PROTECTION.sub} />

        <ul className="mx-auto mt-16 grid max-w-[64rem] gap-3 sm:grid-cols-2">
          {PROTECTION.items.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={(i % 2) * 0.08}
              className={`flex items-start gap-5 rounded-[1.75rem] bg-surface p-6 shadow-[0_1px_2px_rgba(15,16,18,0.05)] ${
                i === PROTECTION.items.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink text-white">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                  <path d="M12 3.5 19 6v5.5c0 4.2-3 7.5-7 9-4-1.5-7-4.8-7-9V6l7-2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="m9 12 2.2 2.2L15.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Reorder() {
  return (
    <section id="reorder" className="border-y border-hairline py-24">
      <Container className="flex flex-col items-center text-center">
        <WordsIn as="h2" text={REORDER.title} className="display text-[clamp(2.5rem,1.2rem+5vw,5.25rem)]" />
        <Reveal delay={0.3}>
          <p className="mt-6 text-lg text-muted">{REORDER.sub}</p>
        </Reveal>
        <Reveal delay={0.45}>
          <span className="mt-10 inline-flex items-center gap-3 rounded-full bg-shell p-1.5 pr-5">
            <span className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">Reorder</span>
            <span className="font-mono text-sm text-muted">Crew · training tee · v4 · same line</span>
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
