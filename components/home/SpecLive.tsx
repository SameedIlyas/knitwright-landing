"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SPEC_LIVE, VERIFICATION } from "@/lib/content";
import { Flat, flatMeasures, type FlatStyle } from "@/components/visuals/Flat";
import { Display, Frame, PillLink } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Big two-line headline on the left; on the right a tilted spec window with
 * glass cards pinned around it. The style switch is real: the flat redraws,
 * the measurement card follows it, and the badge drops to unverified.
 */
export function SpecLive() {
  const [style, setStyle] = useState<FlatStyle>("crew");
  const changed = style !== "crew";

  return (
    <section id="spec-live" data-nav-theme="light" className="scroll-mt-24 overflow-hidden bg-[#f7f8fb] py-28 sm:py-32">
      <Frame className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Display className="text-[clamp(3rem,1.6rem+5vw,6.2rem)] leading-[0.98] tracking-[-0.05em] text-ink-2">Change the sleeve.</Display>
          <p className="mt-8 max-w-[27rem] text-[clamp(1.2rem,1rem+0.6vw,1.7rem)] font-light leading-snug tracking-[-0.01em] text-ink-2">
            <span className="text-cobalt">Every number moves with it.</span> The flat, the graded table and the pattern pieces are views of one spec.
          </p>
          <div role="radiogroup" aria-label="Garment style" className="mt-10 inline-flex rounded-full bg-white p-1 shadow-[0_10px_30px_-18px_rgba(15,16,18,0.4)]">
            {SPEC_LIVE.styles.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={style === s}
                onClick={() => setStyle(s)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${style === s ? "text-white" : "text-muted hover:text-ink"}`}
              >
                {style === s ? <motion.span layoutId="style-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.35, ease: EASE }} /> : null}
                <span className="relative">{SPEC_LIVE.styleLabels[s]}</span>
              </button>
            ))}
          </div>
          <div className="mt-8">
            <PillLink href="#early-access" tone="outline">
              Try it with your design
            </PillLink>
          </div>
        </div>

        <div className="relative mx-auto h-[34rem] w-full max-w-[40rem] [perspective:1600px] sm:h-[40rem]">
          <div className="absolute inset-x-[8%] bottom-[4%] top-[6%] rounded-[2.5rem] bg-white p-6 shadow-[0_60px_120px_-50px_rgba(15,16,18,0.55)] [transform:rotateX(12deg)_rotateZ(-7deg)] sm:p-8">
            <div className="eng-grid flex h-full items-center justify-center rounded-[1.75rem] bg-canvas">
              <Flat key={style} style={style} tint={changed ? "var(--cobalt)" : undefined} className="h-auto w-[80%]" />
            </div>
          </div>

          <div className="absolute right-0 top-2 w-[15rem] [transform:rotate(-7deg)] sm:w-[17rem]">
            <MeasureCard style={style} />
          </div>

          <div className="absolute bottom-[10%] left-0 w-[15rem] [transform:rotate(-7deg)] sm:w-[16rem]">
            <div className="rounded-[1.6rem] border border-white bg-white/75 p-5 shadow-[0_30px_60px_-30px_rgba(15,16,18,0.5)] backdrop-blur-xl">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors duration-500 ${
                  changed ? "bg-warn-wash text-warn" : "bg-ok-wash text-ok"
                }`}
              >
                <span className={`size-2 rounded-full ${changed ? "bg-warn" : "bg-ok"}`} />
                {changed ? VERIFICATION.unverified.state : VERIFICATION.verified.state}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted">{changed ? VERIFICATION.unverified.line : VERIFICATION.verified.line}</p>
            </div>
          </div>
        </div>
      </Frame>
    </section>
  );
}

function MeasureCard({ style }: { style: FlatStyle }) {
  const rows = flatMeasures(style).slice(0, 4);
  return (
    <div className="rounded-[1.6rem] border border-white bg-white/80 p-5 shadow-[0_30px_60px_-30px_rgba(15,16,18,0.5)] backdrop-blur-xl">
      <p className="text-sm font-medium">Size M · cm</p>
      <ul className="mt-3 flex flex-col gap-2">
        {rows.map((r) => (
          <li key={`${style}-${r.id}`} className="flex items-center justify-between text-sm">
            <span className="text-muted">{r.point}</span>
            <span className="tabular-nums">{r.sizes.m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
