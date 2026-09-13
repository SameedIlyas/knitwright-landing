import { WHY } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";

function Mark({ v, kw }: { v: number; kw: boolean }) {
  if (v === 2)
    return (
      <span className={`inline-block size-3 rounded-full ${kw ? "bg-cobalt" : "bg-ink"}`}>
        <span className="sr-only">Yes</span>
      </span>
    );
  if (v === 1)
    return (
      <span className="inline-block size-3 rounded-full border-[1.5px] border-muted bg-[linear-gradient(90deg,var(--muted)_50%,transparent_50%)]">
        <span className="sr-only">Partly</span>
      </span>
    );
  return (
    <span className="text-faint">
      —<span className="sr-only">No</span>
    </span>
  );
}

export function WhyKnitwright() {
  return (
    <section id="why" className="py-28">
      <Container>
        <SectionHead n={9} label={WHY.label} title={<WordsIn text={WHY.title} className="headline max-w-[20ch]" />} />

        <ol className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={(i % 3) * 0.08} className="group rounded-[2rem] bg-shell p-2">
              <div className="flex h-full flex-col rounded-[1.6rem] bg-surface p-7 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <span className="grid size-11 place-items-center rounded-2xl bg-ink font-mono text-sm text-white">0{i + 1}</span>
                <h3 className="mt-8 text-xl font-medium tracking-tight">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-28">
          <div className="flex flex-col items-center text-center">
            <span className="eyebrow text-muted">{WHY.landscape.label}</span>
            <h3 className="mt-4 max-w-[22ch] text-[clamp(1.75rem,1rem+2.4vw,2.75rem)] font-medium leading-tight tracking-[-0.04em]">
              {WHY.landscape.title}
            </h3>
          </div>
          {/* relative: the sr-only labels in cells are absolutely positioned and would
              otherwise escape this scroll container and widen the page on mobile. */}
          <div className="relative mt-10 overflow-x-auto rounded-[2rem] border border-hairline">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <caption className="sr-only">Capabilities by category of tool</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[30%] bg-shell px-5 py-4 text-left font-normal">
                    <span className="sr-only">Capability</span>
                  </th>
                  {WHY.landscape.columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`px-3 py-4 text-center font-medium ${i === 0 ? "bg-cobalt-wash text-cobalt" : "bg-shell text-ink-2"}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WHY.landscape.rows.map((r) => (
                  <tr key={r.cap} className="border-t border-hairline">
                    <th scope="row" className="px-5 py-3.5 text-left font-normal text-ink-2">{r.cap}</th>
                    {r.v.map((v, i) => (
                      <td key={i} className={`px-3 py-3.5 text-center ${i === 0 ? "bg-cobalt-wash/60" : ""}`}>
                        <Mark v={v} kw={i === 0} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="eyebrow mt-4 text-center text-muted">● yes · ◐ partly · — no · by category, not by company</p>
        </Reveal>
      </Container>
    </section>
  );
}
