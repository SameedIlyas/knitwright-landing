"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { VERIFICATION } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Verification() {
  return (
    <section id="verification" className="scroll-mt-24 py-32">
      <Container>
        <SectionHead
          n={6}
          label={VERIFICATION.label}
          title={<WordsIn text={VERIFICATION.title} className="headline max-w-[14ch] text-[clamp(2.75rem,1.2rem+5.6vw,5.5rem)]" />}
          sub={VERIFICATION.body}
        />

        <div className="mx-auto mt-16 grid max-w-[64rem] gap-4 md:grid-cols-2">
          <Reveal className="bezel !rounded-[2.5rem]">
            <BadgeCard tone="ok" />
          </Reveal>
          <Reveal delay={0.1} className="bezel !rounded-[2.5rem]">
            <BadgeCard tone="warn" />
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 max-w-[44rem] text-center">
          <p className="text-[clamp(1.25rem,1rem+0.8vw,1.6rem)] font-medium leading-snug tracking-tight">{VERIFICATION.caption}</p>
          <p className="eyebrow mt-4 text-faint">{VERIFICATION.nameNote}</p>
        </Reveal>

        <LiveBadge />
      </Container>
    </section>
  );
}

function BadgeCard({ tone }: { tone: "ok" | "warn" }) {
  const ok = tone === "ok";
  const data = ok ? VERIFICATION.verified : VERIFICATION.unverified;
  return (
    <div className={`flex h-full flex-col gap-8 rounded-[2.1rem] border p-7 sm:p-9 ${ok ? "border-ok/20 bg-ok-wash" : "border-warn/20 bg-warn-wash"}`}>
      <div className="flex items-center justify-between">
        <span className="eyebrow text-muted">{ok ? "State A · as signed" : "State B · after an edit"}</span>
        <span className="font-mono text-xs text-muted">v{ok ? "4" : "5"}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${ok ? "bg-ok text-white" : "bg-warn text-white"}`}>
          {ok ? (
            <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
              <path d="M12 7v6M12 16.5v.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <div>
          <p className={`eyebrow !text-sm ${ok ? "text-ok" : "text-warn"}`}>{data.state}</p>
          <p className="mt-1 font-mono text-sm text-ink-2">{data.line}</p>
        </div>
      </div>
    </div>
  );
}

/** A single badge that flips between the two states as if someone edited the spec. */
function LiveBadge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduce = useReducedMotion();
  const [signed, setSigned] = useState(true);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setSigned((s) => !s), 2600);
    return () => clearInterval(t);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="mt-14 flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 rounded-full bg-shell p-1.5 pr-2">
        <span className="rounded-full bg-surface px-4 py-2 font-mono text-sm">
          SLV <span className="tabular-nums">{signed ? "21.0" : "22.5"}</span>
        </span>
        <motion.span
          layout
          transition={{ duration: 0.4, ease: EASE }}
          className={`eyebrow flex items-center gap-2 rounded-full px-4 py-2 ${signed ? "bg-ok text-white" : "bg-warn text-white"}`}
          aria-live="polite"
        >
          <span className="size-1.5 rounded-full bg-white" />
          {signed ? "Verified for production" : "Unverified draft"}
        </motion.span>
      </div>
      <p className="eyebrow text-muted">Edit a number after sign-off, and the badge says so.</p>
    </div>
  );
}
