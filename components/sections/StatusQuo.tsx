import { STATUS_QUO } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";

const ICONS = [
  // Months — a calendar page
  <svg key="m" viewBox="0 0 24 24" fill="none" className="size-8" aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8 14h2M14 14h2M8 17h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  // Rounds — a looping arrow
  <svg key="r" viewBox="0 0 24 24" fill="none" className="size-8" aria-hidden="true">
    <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M19.5 4.5v3.8h-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Last — a sealed carton
  <svg key="l" viewBox="0 0 24 24" fill="none" className="size-8" aria-hidden="true">
    <path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>,
];

export function StatusQuo() {
  return (
    <section id="status-quo" className="bg-surface py-28">
      <Container>
        <SectionHead
          n={2}
          label={STATUS_QUO.label}
          title={<WordsIn text={STATUS_QUO.title} className="headline max-w-[16ch]" />}
          sub={STATUS_QUO.sub}
        />

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {STATUS_QUO.items.map((it, i) => (
            <Reveal as="li" key={it.word} delay={i * 0.1} className="bezel !rounded-[2.5rem]">
              <div className="tile-dots relative grid aspect-[4/3.3] place-items-center overflow-hidden rounded-[2.1rem]">
                <div className="disc grid size-28 place-items-center rounded-full text-ink">{ICONS[i]}</div>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-xl bg-shell px-3 pb-1 pt-1.5 font-mono text-sm text-ink">
                  0{i + 1}
                </span>
              </div>
              <div className="px-6 pb-7 pt-6 text-center">
                <h3 className="text-2xl font-medium tracking-tight">{it.word}</h3>
                <p className="mx-auto mt-2 max-w-[30ch] leading-relaxed text-muted">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Quotes />

      <Container className="mt-24">
        <Reveal className="mx-auto max-w-[62rem]">
          <h3 className="text-center text-[clamp(1.6rem,1rem+2vw,2.4rem)] font-medium leading-tight tracking-[-0.035em]">
            {STATUS_QUO.slices.title}
          </h3>
          <div className="relative mt-10 overflow-x-auto rounded-[2rem] border border-hairline">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">What each existing option gives you, and where it stops</caption>
              <thead>
                <tr className="bg-shell">
                  {["If you use…", "You get…", "But…"].map((h) => (
                    <th key={h} scope="col" className="eyebrow px-5 py-4 font-normal text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STATUS_QUO.slices.rows.map((r) => (
                  <tr key={r.use} className="border-t border-hairline align-top">
                    <th scope="row" className="px-5 py-4 font-medium">{r.use}</th>
                    <td className="px-5 py-4 text-ink-2">{r.get}</td>
                    <td className="px-5 py-4 text-muted">{r.but}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Two opposing rows of founder pains, unattributed — the brief's own words, not testimonials. */
function Quotes() {
  const rows = [STATUS_QUO.quotes, [...STATUS_QUO.quotes].reverse()];
  return (
    <div className="mt-24">
      <p className="eyebrow text-center text-muted">{STATUS_QUO.quotesLabel}</p>
      <div className="mt-8 flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div
              className="marquee-track flex w-max gap-4"
              style={{ ["--marquee-duration" as string]: r === 0 ? "60s" : "70s", animationDirection: r === 0 ? "normal" : "reverse" }}
            >
              {[...row, ...row].map((q, i) => (
                <figure
                  key={`${r}-${i}`}
                  aria-hidden={i >= row.length}
                  className="flex max-w-[26rem] shrink-0 items-start gap-3 rounded-3xl bg-shell px-6 py-5"
                >
                  <span className="mt-1 font-mono text-lg leading-none text-faint">“</span>
                  <blockquote className="text-[1.0625rem] leading-snug tracking-tight text-ink-2">{q}</blockquote>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
