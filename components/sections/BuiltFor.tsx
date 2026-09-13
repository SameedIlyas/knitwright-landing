"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BUILT_FOR } from "@/lib/content";
import { Container, SectionLabel } from "@/components/ui/primitives";
import { Reveal, ScrollWords } from "@/components/ui/motion";
import { Flat, type FlatStyle } from "@/components/visuals/Flat";

const CYCLE: FlatStyle[] = ["crew", "raglan", "polo"];

export function BuiltFor() {
  return (
    <section id="built-for" className="relative pt-20 pb-28 sm:pt-28">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <SectionLabel n={1}>{BUILT_FOR.label}</SectionLabel>
        </Reveal>
        <ScrollWords
          text={BUILT_FOR.statement}
          className="mt-8 max-w-[22ch] text-[clamp(1.9rem,1rem+3.1vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.035em] sm:max-w-[26ch]"
        />
      </Container>

      <MarqueeWithCard />

      <Container className="mt-24">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BUILT_FOR.segments.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.08} className="bezel">
              <div className="bezel-inner flex h-full flex-col gap-4 p-6">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h3 className="text-lg font-medium leading-snug tracking-tight">{s.name}</h3>
                <p className="eyebrow text-muted">{s.makes}</p>
                <p className="mt-auto text-[0.95rem] leading-relaxed text-ink-2">{s.why}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <Reveal className="rounded-[2.25rem] bg-shell p-8 sm:p-10">
            <p className="eyebrow text-muted">The daily user</p>
            <h3 className="mt-4 text-2xl font-medium tracking-tight">{BUILT_FOR.productPerson.title}</h3>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-muted">{BUILT_FOR.productPerson.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[2.25rem] bg-tile p-8 text-chalk sm:p-10">
            <p className="eyebrow text-chalk-muted">Who it isn&apos;t for</p>
            <h3 className="mt-4 text-2xl font-medium tracking-tight">{BUILT_FOR.notFor.title}</h3>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-chalk-muted">{BUILT_FOR.notFor.body}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Giant scrolling words behind a rounded card holding a live, cycling technical flat. */
function MarqueeWithCard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45], [reduce ? 1 : 0.86, 1]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % CYCLE.length), 4200);
    return () => clearInterval(t);
  }, [reduce]);

  const words = [...BUILT_FOR.marquee, ...BUILT_FOR.marquee];

  return (
    <div ref={ref} className="relative mt-20 flex items-center justify-center py-6">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max gap-16 whitespace-nowrap [--marquee-duration:48s]">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-16">
              {words.map((w, i) => (
                <span
                  key={`${k}-${i}`}
                  className={`display text-[clamp(4.5rem,2rem+9vw,10rem)] ${i % 2 === 0 ? "text-ink" : "text-[#c9cacf]"}`}
                >
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div style={{ scale }} className="relative z-10 w-[min(36rem,calc(100vw-2.5rem))]">
        <div className="bezel !rounded-[3rem] !p-2.5 shadow-[0_40px_80px_-30px_rgba(15,16,18,0.35)]">
          <div className="eng-grid relative aspect-[5/4] overflow-hidden rounded-[2.5rem] bg-surface">
            <motion.div
              key={CYCLE[idx]}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 grid place-items-center px-6 pb-10 pt-16"
            >
              <Flat style={CYCLE[idx]} className="h-full w-full" />
            </motion.div>
            <div className="absolute left-5 top-5 flex items-center gap-2">
              <span className="eyebrow rounded-full bg-ink px-2.5 py-1 text-white">Spec · live</span>
              <span className="eyebrow rounded-full bg-shell px-2.5 py-1 text-muted">{CYCLE[idx]} · front</span>
            </div>
            <span className="eyebrow absolute bottom-5 right-5 text-muted">Size M · cm</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
