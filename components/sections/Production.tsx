"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PRODUCTION } from "@/lib/content";
import { Container, PrimaryButton, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Illustrative quote: a relative index, not a price. Unit cost falls as quantity
 * rises; each line keeps its share so the parts always sum to the whole.
 */
const INDEX: Record<number, number> = { 100: 100, 300: 84, 500: 77, 1000: 69 };

export function Production() {
  const [qty, setQty] = useState<number>(300);
  const total = INDEX[qty];
  const lines = PRODUCTION.costing.lines.map((l) => ({ ...l, value: Math.round(total * l.weight * 10) / 10 }));
  const sum = Math.round(lines.reduce((a, l) => a + l.value, 0) * 10) / 10;

  return (
    <section id="production" className="scroll-mt-24 bg-canvas py-28">
      <Container>
        <SectionHead
          n={7}
          label={PRODUCTION.label}
          title={<WordsIn text={PRODUCTION.title} className="headline max-w-[16ch]" />}
          sub={PRODUCTION.body}
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
          <Reveal className="bezel !rounded-[2.5rem]">
            <div className="bezel-inner flex h-full flex-col !rounded-[2.1rem] p-7 sm:p-9">
              <h3 className="text-xl font-medium tracking-tight">{PRODUCTION.costing.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{PRODUCTION.costing.body}</p>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                <div role="radiogroup" aria-label="Quantity tier" className="flex gap-1 rounded-full bg-canvas p-1">
                  {PRODUCTION.costing.tiers.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={qty === t}
                      onClick={() => setQty(t)}
                      className={`relative rounded-full px-3.5 py-1.5 font-mono text-sm transition-colors ${qty === t ? "text-white" : "text-muted hover:text-ink"}`}
                    >
                      {qty === t ? <motion.span layoutId="qty-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.3, ease: EASE }} /> : null}
                      <span className="relative">{t}</span>
                    </button>
                  ))}
                </div>
                <span className="eyebrow rounded-full bg-warn-wash px-2.5 py-1 text-warn">Illustrative</span>
              </div>

              <table className="mt-6 w-full border-collapse font-mono text-sm tabular-nums">
                <caption className="sr-only">Illustrative cost breakdown, as a relative index</caption>
                <tbody>
                  {lines.map((l) => (
                    <tr key={l.name} className="border-t border-hairline">
                      <th scope="row" className="py-3 pr-3 text-left font-sans font-normal text-ink-2">{l.name}</th>
                      <td className="w-[40%] py-3">
                        <div className="h-1.5 overflow-hidden rounded-full bg-canvas">
                          <motion.div
                            className="h-full rounded-full bg-ink"
                            initial={false}
                            animate={{ width: `${(l.value / INDEX[100]) * 100 * 2}%` }}
                            transition={{ duration: 0.6, ease: EASE }}
                          />
                        </div>
                      </td>
                      <td className="py-3 pl-4 text-right">
                        <AnimatePresence mode="popLayout">
                          <motion.span key={`${l.name}-${qty}`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="inline-block">
                            {l.value.toFixed(1)}
                          </motion.span>
                        </AnimatePresence>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-ink">
                    <th scope="row" className="py-3 text-left font-sans font-medium">Unit price index</th>
                    <td />
                    <td className="py-3 pl-4 text-right font-medium">{sum.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-xs text-muted">A shape, not a price list. Real quotes are itemised per style inside the product.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="bezel !rounded-[2.5rem]">
            <div className="flex h-full flex-col rounded-[2.1rem] bg-tile p-7 text-chalk sm:p-9">
              <h3 className="text-xl font-medium tracking-tight">{PRODUCTION.escrow.title}</h3>
              <p className="mt-2 leading-relaxed text-chalk-muted">{PRODUCTION.escrow.body}</p>
              <ol className="relative mt-8 flex flex-col gap-3">
                <span aria-hidden="true" className="absolute bottom-6 left-[1.1rem] top-6 w-px bg-white/12" />
                {PRODUCTION.escrow.milestones.map((m, i) => (
                  <motion.li
                    key={m.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: EASE }}
                    className="relative flex items-center gap-4"
                  >
                    <span className={`relative z-10 grid size-9 place-items-center rounded-full font-mono text-xs ${i === 3 ? "bg-white text-ink" : "bg-tile-2 text-chalk"}`}>
                      0{i + 1}
                    </span>
                    <span className={`flex flex-1 items-center justify-between rounded-2xl px-4 py-3 ${i === 3 ? "thread-ring bg-tile-2" : "bg-white/5"}`}>
                      <span className="font-medium">{m.label}</span>
                      <span className="font-mono text-xs uppercase text-chalk-muted">{m.state}</span>
                    </span>
                  </motion.li>
                ))}
              </ol>
              <p className="mt-auto pt-8 text-sm leading-relaxed text-chalk-muted">{PRODUCTION.why}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 flex justify-center">
          <PrimaryButton href="#early-access">Request early access</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
