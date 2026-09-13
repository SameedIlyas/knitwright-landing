"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PRODUCTION, WHAT_WE_DO } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";
import { Flat } from "@/components/visuals/Flat";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhatWeDo() {
  const [a, b, c, d] = WHAT_WE_DO.cards;
  return (
    <section id="what-we-do" className="py-28">
      <Container>
        <SectionHead n={3} label={WHAT_WE_DO.label} title={<WordsIn text={WHAT_WE_DO.title} className="headline max-w-[18ch]" />} />

        <div className="mt-16 grid gap-4 lg:grid-cols-[1.35fr_1fr_1fr] lg:grid-rows-2">
          <Card className="lg:row-span-2" delay={0}>
            <CardText title={a.title} body={a.body} />
            <ul className="mt-5 flex flex-col gap-2 px-7 sm:px-9">
              {a.points?.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[0.95rem] text-muted">
                  <Check /> {p}
                </li>
              ))}
            </ul>
            <div className="eng-grid relative mx-3 mb-3 mt-8 grid min-h-[16rem] flex-1 place-items-center overflow-hidden rounded-[1.75rem] bg-canvas p-4">
              <Flat style="raglan" className="mx-auto max-h-[20rem] w-full" />
            </div>
          </Card>

          <Card delay={0.08} className="lg:col-span-2">
            <div className="grid h-full gap-4 md:grid-cols-2">
              <CardText title={b.title} body={b.body} />
              <div className="flex items-center px-7 pb-7 md:px-0 md:pb-0 md:pr-7">
                <SignOffDemo />
              </div>
            </div>
          </Card>

          <Card delay={0.14}>
            <CardText title={c.title} body={c.body} />
            <div className="mt-auto px-7 pb-7 pt-6 sm:px-9">
              <StageTracker />
            </div>
          </Card>

          <Card delay={0.2}>
            <CardText title={d.title} body={d.body} />
            <div className="mt-auto px-7 pb-7 pt-6 sm:px-9">
              <EscrowMini />
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function Card({ children, className = "", delay }: { children: React.ReactNode; className?: string; delay: number }) {
  return (
    <Reveal delay={delay} className={`bezel !rounded-[2.5rem] ${className}`}>
      <article className="bezel-inner flex h-full flex-col !rounded-[2.1rem]">{children}</article>
    </Reveal>
  );
}

function CardText({ title, body }: { title: string; body: string }) {
  return (
    <p className="px-7 pt-7 text-[1.0625rem] leading-relaxed text-muted sm:px-9 sm:pt-9">
      <strong className="font-medium text-ink">{title}</strong> {body}
    </p>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-ink" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A sign-off stamp that lands on the spec: checks tick, then the name appears. */
function SignOffDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const checks = ["Seam allowances", "Grading logic", "Buildability"];
  return (
    <div ref={ref} className="w-full rounded-3xl border border-hairline bg-canvas p-5">
      <p className="eyebrow text-muted">Studio review · SP-2291</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {checks.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0.35 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ delay: 0.3 + i * 0.35, duration: 0.4 }}
            className="flex items-center justify-between rounded-xl bg-surface px-3.5 py-2.5 text-sm"
          >
            {c}
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : undefined}
              transition={{ delay: 0.45 + i * 0.35, duration: 0.4, ease: EASE }}
              className="grid size-5 place-items-center rounded-full bg-ok text-white"
            >
              <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden="true">
                <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </motion.li>
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
        className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-ok/25 bg-ok-wash px-3.5 py-3"
      >
        <span className="eyebrow text-ok">Verified for production</span>
        <span className="font-mono text-xs text-ok">A. R. · signed</span>
      </motion.div>
    </div>
  );
}

/** Production stage tracker that walks through the stages on loop. */
function StageTracker() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10%" });
  const [step, setStep] = useState(2);
  const stages = PRODUCTION.stages;

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => setStep((s) => (s + 1) % stages.length), 1600);
    return () => clearInterval(t);
  }, [reduce, inView, stages.length]);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between">
        <span className="eyebrow text-muted">Knitwright Verified Production</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={stages[step]}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="eyebrow text-ink"
          >
            {stages[step]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex gap-1.5" role="img" aria-label="Production stages: sample, sample approved, bulk, final QC, shipped">
        {stages.map((s, i) => (
          <div key={s} className="h-2 flex-1 overflow-hidden rounded-full bg-shell">
            <motion.div
              className="h-full rounded-full bg-ink"
              initial={false}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function EscrowMini() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div ref={ref} className="flex flex-col gap-2">
      {PRODUCTION.escrow.milestones.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: EASE }}
          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm ${
            i === 3 ? "bg-ink text-white" : "bg-shell text-ink-2"
          }`}
        >
          <span className="font-medium">{m.label}</span>
          <span className={`font-mono text-xs ${i === 3 ? "text-white/70" : "text-muted"}`}>{m.state}</span>
        </motion.div>
      ))}
    </div>
  );
}
