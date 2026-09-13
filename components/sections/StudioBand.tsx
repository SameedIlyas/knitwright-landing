"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { STUDIO } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The one dark band: the studio console the brand never sees. */
export function StudioBand() {
  return (
    <section id="studio" className="relative overflow-hidden bg-[#0e1015] py-28 text-chalk">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(130,150,255,0.14),transparent_70%)]" />
      <Container className="relative">
        <SectionHead
          n={8}
          dark
          label={STUDIO.label}
          title={<WordsIn text={STUDIO.title} className="headline max-w-[14ch] text-white" />}
          sub={STUDIO.body}
        />

        <Reveal className="mx-auto mt-16 max-w-[68rem]">
          <Console />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-[48rem] text-center">
          <p className="leading-relaxed text-chalk-muted">{STUDIO.place}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Console() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const reduce = useReducedMotion();
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setCursor((c) => (c + 1) % STUDIO.queue.length), 1400);
    return () => clearInterval(t);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="rounded-[2.5rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
      <div className="overflow-hidden rounded-[2.1rem] bg-[#15181f] ring-1 ring-white/5">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="eyebrow ml-3 text-chalk-muted">Studio · review queue</span>
          </div>
          <span className="eyebrow hidden text-chalk-muted sm:inline">J / K move · ⏎ open · V verify</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_17rem] [&>*]:min-w-0">
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse font-mono text-[0.8rem]">
              <caption className="sr-only">Illustrative studio review queue</caption>
              <thead>
                <tr className="text-left text-chalk-muted">
                  {["ID", "Style", "Brand", "Reviewer", "SLA"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-3 font-normal uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STUDIO.queue.map((r, i) => {
                  const on = i === cursor;
                  return (
                    <tr
                      key={r.id}
                      aria-current={on ? "true" : undefined}
                      className={`h-10 border-t border-white/5 transition-colors duration-300 ${on ? "bg-[#8296ff]/12" : ""}`}
                    >
                      <td className="relative px-5">
                        <span className={`absolute inset-y-1 left-0 w-0.5 rounded-full bg-[#8296ff] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`} />
                        <span className={`relative ${on ? "text-white" : "text-chalk"}`}>{r.id}</span>
                      </td>
                      <td className={`relative px-5 ${on ? "text-white" : "text-chalk"}`}>{r.style}</td>
                      <td className="relative px-5 text-chalk-muted">{r.brand}</td>
                      <td className="relative px-5 text-chalk-muted">{r.reviewer}</td>
                      <td className={`relative px-5 tabular-nums ${on ? "text-[#8296ff]" : "text-chalk-muted"}`}>{r.sla}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-white/8 p-5 lg:border-l lg:border-t-0">
            <p className="eyebrow text-chalk-muted">Capacity · our lines</p>
            <ul className="mt-5 flex flex-col gap-5">
              {STUDIO.lines.map((l, i) => (
                <li key={l.name}>
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-chalk">{l.name}</span>
                    <span className="text-chalk-muted tabular-nums">{Math.round(l.load * 100)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-[#8296ff]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.load * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: EASE }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[0.7rem] leading-relaxed text-chalk-muted">
              Illustrative data. Lines are Knitwright&apos;s own — no third-party factory is ever named or exposed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
