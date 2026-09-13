"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef } from "react";
import { HERO } from "@/lib/content";
import { GlassButton, PrimaryButton } from "@/components/ui/primitives";
import { HeroBackdrop } from "@/components/visuals/HeroBackdrop";

const EASE = [0.22, 1, 0.36, 1] as const;

const CHIPS = [
  { text: "Spec drafted", pos: "left-[6%] top-[30%]", delay: 1.5 },
  { text: "Verified · Studio", pos: "right-[7%] top-[40%]", delay: 1.7 },
  { text: "Escrow · held for you", pos: "left-[12%] bottom-[18%]", delay: 1.9 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <HeroBackdrop />

      {CHIPS.map((c) => (
        <motion.span
          key={c.text}
          aria-hidden="true"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: c.delay, ease: EASE }}
          className={`glass eyebrow absolute hidden items-center gap-2 rounded-full px-3.5 py-2 text-white lg:inline-flex ${c.pos}`}
        >
          <span className="size-1.5 rounded-full bg-[#b8f0d9]" />
          {c.text}
        </motion.span>
      ))}

      <motion.div style={{ y, opacity: fade }} className="relative z-10 flex flex-col items-center px-5 pb-16 pt-32 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink/70 px-3.5 py-2 text-white"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
            <path d="M8 1.5v13M1.5 8h13M3.4 3.4l9.2 9.2M12.6 3.4l-9.2 9.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {HERO.badge}
        </motion.span>

        <h1 className="display mt-7 max-w-[15ch] text-[clamp(2.75rem,1.2rem+6.4vw,6rem)] text-white">
          {HERO.headline.map((line, li) => (
            <span key={line} className="block">
              {line.split(" ").map((w, i, all) => (
                <Fragment key={`${w}-${i}`}>
                  <motion.span
                    className={`inline-block ${li === 1 ? "thread-text" : ""}`}
                    initial={{ opacity: 0, y: reduce ? 0 : "0.4em", filter: reduce ? "none" : "blur(14px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.1, delay: 0.5 + li * 0.25 + i * 0.07, ease: EASE }}
                  >
                    {w}
                  </motion.span>
                  {i < all.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          className="mt-7 max-w-[40rem] text-[1.0625rem] font-medium leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.25)]"
        >
          {HERO.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <PrimaryButton href="#early-access">{HERO.primary}</PrimaryButton>
          <GlassButton href="#how-it-works">{HERO.secondary}</GlassButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.5 }}
          className="eyebrow mt-6 text-white/70"
        >
          {HERO.microcopy}
        </motion.p>
      </motion.div>
    </section>
  );
}
