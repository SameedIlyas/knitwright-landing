"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FLOW } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEP_ICONS = [
  <path key="0" d="M12 16V5m0 0-4 4m4-4 4 4M5 19h14" />,
  <path key="1" d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5A.5.5 0 0 1 6.5 20V4a.5.5 0 0 1 .5-.5ZM9.5 11h5M9.5 14.5h5M9.5 18h3" />,
  <path key="2" d="M12 3.5 19 6v5.5c0 4.2-3 7.5-7 9-4-1.5-7-4.8-7-9V6l7-2.5Zm-3 8.5 2.2 2.2L15.5 10" />,
  <path key="3" d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4v-9ZM3.5 7.5 12 11.5l8.5-4M12 11.5v9" />,
];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="scroll-mt-24 py-28">
      <Container>
        <SectionHead n={4} label={FLOW.label} title={<WordsIn text={FLOW.title} className="headline max-w-[16ch]" />} sub={FLOW.sub} />

        <ol ref={ref} className="relative mx-auto mt-20 flex max-w-[66rem] flex-col gap-6">
          {/* The spine, filled as you scroll. */}
          <div aria-hidden="true" className="absolute bottom-10 left-7 top-10 w-px bg-hairline md:left-1/2">
            <motion.div style={{ height: lineH }} className="w-px bg-gradient-to-b from-[#9fb0ff] via-[#ffd3e6] to-ink" />
          </div>
          {FLOW.steps.map((s, i) => (
            <Step key={s.title} i={i} step={s} />
          ))}
        </ol>

        <Reveal className="mx-auto mt-24 max-w-[70rem]">
          <p className="eyebrow text-center text-muted">The full route, idea to reorder</p>
          <ol className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {FLOW.route.map((r, i) => (
              <li key={r.stage} className="flex items-center gap-2">
                <span className={`flex flex-col rounded-2xl px-4 py-2.5 text-left ${r.who.startsWith("us") && !r.who.includes("+") ? "bg-ink text-white" : "bg-shell text-ink"}`}>
                  <span className="text-sm font-medium">{r.stage}</span>
                  <span className={`font-mono text-[0.68rem] uppercase ${r.who.startsWith("us") && !r.who.includes("+") ? "text-white/60" : "text-muted"}`}>{r.who}</span>
                </span>
                {i < FLOW.route.length - 1 ? <span aria-hidden="true" className="text-faint">→</span> : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}

function Step({ i, step }: { i: number; step: (typeof FLOW.steps)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const left = i % 2 === 0;
  const you = step.who === "YOU";

  const icon = (
    <div className={`flex items-center gap-3 ${left ? "md:justify-end" : ""}`}>
      <span
        className={`grid size-16 place-items-center rounded-[1.4rem] transition-colors duration-500 ${
          active ? "bg-ink text-white shadow-[0_18px_30px_-12px_rgba(15,16,18,0.5)]" : "bg-shell text-ink"
        } ${left ? "md:order-2" : ""}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
          {STEP_ICONS[i]}
        </svg>
      </span>
      <span className={`rounded-lg bg-surface px-2 py-1 font-mono text-sm shadow-[0_1px_2px_rgba(15,16,18,0.08)] ${left ? "md:order-1" : ""}`}>
        0{i + 1}
      </span>
    </div>
  );

  const text = (
    <div className={left ? "" : "md:text-right"}>
      <span className={`eyebrow inline-block rounded-full px-2.5 py-1 ${you ? "bg-cobalt-wash text-cobalt" : "bg-ink text-white"}`}>{step.who}</span>
      <h3 className="mt-3 text-xl font-medium tracking-tight">{step.title}</h3>
      <p className="mt-1.5 max-w-[34ch] leading-relaxed text-muted md:inline-block">{step.body}</p>
    </div>
  );

  return (
    <li ref={ref} className="relative">
      <motion.div
        animate={{ backgroundColor: active ? "rgba(237,237,238,1)" : "rgba(237,237,238,0)" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="grid grid-cols-[3.5rem_1fr] items-center gap-6 rounded-[2.25rem] py-7 pl-0 pr-4 md:grid-cols-[1fr_4rem_1fr] md:px-10"
      >
        <div className="hidden md:block">{left ? icon : text}</div>
        <div className="relative z-10 flex justify-center">
          <span className={`relative grid size-5 place-items-center rounded-md border transition-colors duration-500 ${active ? "border-transparent" : "border-hairline bg-surface"}`}>
            {active ? (
              <>
                <span className="thread-ring absolute inset-[-3px] rounded-lg bg-surface" />
                <span className="relative size-2.5 rounded-full bg-ink" />
                <span className="pulse-ring absolute inset-0 rounded-md border border-[#9fb0ff]" />
              </>
            ) : null}
          </span>
        </div>
        <div className="md:hidden">
          <div className="mb-4">{icon}</div>
          {text}
        </div>
        <div className="hidden md:block">{left ? text : icon}</div>
      </motion.div>
    </li>
  );
}
