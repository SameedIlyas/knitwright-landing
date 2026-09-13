"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SPEC_LIVE } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";
import { Flat, flatMeasures, type FlatStyle } from "@/components/visuals/Flat";

const TINTS: Record<FlatStyle, string | undefined> = { crew: undefined, raglan: "#2b46f0", polo: undefined };
const PROMPTS: Record<FlatStyle, string> = {
  crew: "crew neck, short sleeves",
  raglan: SPEC_LIVE.prompt,
  polo: "polo collar, short sleeves",
};

/** One spec, three views: switch the style and the flat and the graded table move together. */
export function SpecLive() {
  const [style, setStyle] = useState<FlatStyle>("raglan");
  const [hover, setHover] = useState<string | null>("C");
  const rows = flatMeasures(style).slice(0, 6);

  return (
    <section id="spec-live" className="bg-canvas py-28">
      <Container>
        <SectionHead
          n={5}
          label={SPEC_LIVE.label}
          title={<WordsIn text={SPEC_LIVE.title} className="headline max-w-[18ch]" />}
          sub={SPEC_LIVE.body}
        />

        <Reveal className="mt-14">
          <div className="bezel mx-auto max-w-[72rem] !rounded-[2.75rem] !p-2.5">
            <div className="bezel-inner overflow-hidden !rounded-[2.3rem]">
              {/* Assistant prompt bar */}
              <div className="flex flex-col gap-3 border-b border-hairline p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex min-w-0 items-center gap-3 rounded-full bg-canvas py-2 pl-2 pr-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white">
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
                      <path d="M8 1.5v13M1.5 8h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={style}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="truncate font-mono text-sm text-ink-2"
                    >
                      “{PROMPTS[style]}”
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div role="radiogroup" aria-label="Garment style" className="flex gap-1 self-start rounded-full bg-canvas p-1 sm:self-auto">
                  {SPEC_LIVE.styles.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={style === s}
                      onClick={() => setStyle(s)}
                      className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${style === s ? "text-white" : "text-muted hover:text-ink"}`}
                    >
                      {style === s ? (
                        <motion.span layoutId="style-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} />
                      ) : null}
                      <span className="relative">{SPEC_LIVE.styleLabels[s]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-[1.1fr_1fr] [&>*]:min-w-0">
                <div className="eng-grid relative border-b border-hairline p-6 lg:border-b-0 lg:border-r">
                  <span className="eyebrow absolute left-5 top-5 text-muted">Technical flat · front</span>
                  <Flat key={style} style={style} highlight={hover} tint={TINTS[style]} className="mx-auto mt-6 aspect-square w-full max-w-[30rem]" />
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-muted">Graded size run · cm</span>
                    <span className="eyebrow rounded-full bg-ok-wash px-2.5 py-1 text-ok">Derived, not typed</span>
                  </div>
                  <div className="relative mt-4 overflow-x-auto">
                    <table className="w-full min-w-[26rem] border-collapse font-mono text-sm tabular-nums">
                      <caption className="sr-only">Graded measurements for the selected style</caption>
                      <thead>
                        <tr className="text-left text-muted">
                          <th scope="col" className="py-2 pr-3 font-normal">POM</th>
                          <th scope="col" className="py-2 font-normal">S</th>
                          <th scope="col" className="py-2 font-normal">M</th>
                          <th scope="col" className="py-2 font-normal">L</th>
                          <th scope="col" className="py-2 font-normal">Tol</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => {
                          const on = hover === r.marker;
                          return (
                            <tr
                              key={r.id}
                              tabIndex={0}
                              onMouseEnter={() => setHover(r.marker)}
                              onFocus={() => setHover(r.marker)}
                              className={`cursor-default border-t border-hairline transition-colors duration-200 ${on ? "bg-cobalt-wash" : ""}`}
                            >
                              <th scope="row" className="py-2.5 pr-3 text-left font-sans font-medium">
                                <span className={`mr-2 inline-grid size-5 place-items-center rounded font-mono text-[0.7rem] ${on ? "bg-cobalt text-white" : "bg-shell text-ink"}`}>
                                  {r.marker}
                                </span>
                                {r.point.replace(/ [A-Z]$/, "")}
                              </th>
                              {(["s", "m", "l"] as const).map((k) => (
                                <td key={k} className="py-2.5">
                                  <AnimatePresence mode="popLayout">
                                    <motion.span
                                      key={`${style}-${r.id}-${k}-${r.sizes[k]}`}
                                      initial={{ opacity: 0, y: -8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 8 }}
                                      transition={{ duration: 0.3 }}
                                      className="inline-block"
                                    >
                                      {r.sizes[k].toFixed(1)}
                                    </motion.span>
                                  </AnimatePresence>
                                </td>
                              ))}
                              <td className="py-2.5 text-muted">±{r.tol.plus}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-6 rounded-2xl bg-canvas p-4 text-sm leading-relaxed text-muted">
                    <span className="eyebrow mb-1 block text-ink">It tells you what can&apos;t be built</span>
                    {SPEC_LIVE.refusal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
