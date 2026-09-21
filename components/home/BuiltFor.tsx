"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BUILT_FOR } from "@/lib/content";
import { KnitMark } from "@/components/ui/logo";
import { Display, Frame } from "./ui";
import performance from "@/public/images/s-performance.jpg";
import activewear from "@/public/images/s-activewear.jpg";
import teamkit from "@/public/images/s-teamkit.jpg";
import creator from "@/public/images/s-creator.jpg";

const SEGMENT_MEDIA: { short: string; src: StaticImageData; alt: string }[] = [
  { short: "New brands", src: performance, alt: "A runner in black training kit on a city street" },
  { short: "Designers", src: activewear, alt: "A woman running on a trail in a light tank top" },
  { short: "Team kit", src: teamkit, alt: "A football team walking out in matching green kit" },
  { short: "Creator brands", src: creator, alt: "A man in a black crew-neck tee" },
];

const STEP_MS = 3000;
/** Distance between chips. Tighter on phones so the neighbours stay in view. */
const SPACING_WIDE = 220;
const SPACING_NARROW = 132;
/** How many items to render either side of the centre. */
const REACH = 4;
const EASE = [0.25, 0.1, 0.25, 1] as const;

const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * A coverflow strip of segments that steps along every three seconds. The
 * centred segment sits on a tinted pill in full colour; the rest shrink, go grey
 * and fade. The photo and statement below follow the centred segment.
 */
export function BuiltFor() {
  const n = BUILT_FOR.segments.length;
  const [pos, setPos] = useState(0);
  const [paused, setPaused] = useState(false);
  const [spacing, setSpacing] = useState(SPACING_WIDE);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const i = mod(pos, n);
  const seg = BUILT_FOR.segments[i];
  const media = SEGMENT_MEDIA[i];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setSpacing(mq.matches ? SPACING_NARROW : SPACING_WIDE);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused || reduce || !inView) return;
    const id = window.setInterval(() => setPos((p) => p + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, inView]);

  const slots = Array.from({ length: REACH * 2 + 1 }, (_, k) => pos - REACH + k);

  return (
    <section data-nav-theme="light" className="bg-canvas pb-6 sm:pb-32">
      <Frame>
        <Display className="max-w-[22ch] text-[clamp(2.2rem,1.3rem+3vw,4.2rem)] leading-[1.04] text-ink-2">
          Built for people launching sportswear, and people who already make it.
        </Display>

        {/* Keyboard focus holds the strip still so a tabbed-to segment stays put. */}
        <div ref={ref} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div
            role="group"
            aria-label="Who Knitwright is for"
            className="relative mt-8 h-[8.5rem] overflow-hidden rounded-[2rem] bg-white sm:mt-12 sm:h-[9.5rem] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
          >
            {slots.map((k) => {
              const offset = k - pos;
              const centre = offset === 0;
              const idx = mod(k, n);
              return (
                <motion.button
                  key={k}
                  type="button"
                  aria-pressed={centre}
                  aria-label={BUILT_FOR.segments[idx].name}
                  tabIndex={Math.abs(offset) <= 1 ? 0 : -1}
                  onClick={() => setPos(k)}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${offset * spacing}px)`,
                    scale: centre ? 1 : 0.8,
                    opacity: centre ? 1 : 0.6,
                    filter: centre ? "grayscale(0)" : "grayscale(1)",
                  }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                  style={{ width: spacing, zIndex: centre ? 2 : 1 }}
                  className="absolute left-1/2 top-1/2 flex h-[6.5rem] -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-[1.6rem] sm:h-[7.5rem] sm:gap-2.5"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-[1.6rem] transition-colors duration-[600ms] ${centre ? "bg-cobalt-wash" : "bg-transparent"}`}
                  />
                  <KnitMark className={`relative size-6 ${centre ? "text-cobalt" : "text-ink"}`} />
                  <span className="relative whitespace-nowrap text-[0.95rem] font-medium tracking-tight text-ink sm:text-[1.05rem]">{SEGMENT_MEDIA[idx].short}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2" aria-live="polite">
            <div className="rounded-[2rem] bg-white p-3 sm:rounded-[2.5rem] sm:p-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-canvas">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image src={media.src} alt={media.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex items-end justify-between gap-6 px-3 pb-2 pt-5 sm:px-4 sm:pb-3 sm:pt-6">
                <div>
                  <p className="text-lg font-medium tracking-tight">{seg.name}</p>
                  <p className="mt-1 text-muted">{seg.makes}</p>
                </div>
                <KnitMark className="size-7 shrink-0 text-ink" />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 rounded-[2rem] bg-white p-6 sm:min-h-[24rem] sm:gap-10 sm:rounded-[2.5rem] sm:p-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="text-[clamp(1.8rem,1.3rem+1.6vw,2.8rem)] font-light leading-[1.15] tracking-[-0.03em] text-cobalt"
                >
                  {seg.why}
                </motion.p>
              </AnimatePresence>
              <div className="grid gap-6 border-t border-hairline pt-6 sm:grid-cols-2">
                <div>
                  <p className="font-medium">{BUILT_FOR.productPerson.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{BUILT_FOR.productPerson.body}</p>
                </div>
                <div>
                  <p className="font-medium">{BUILT_FOR.notFor.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{BUILT_FOR.notFor.body}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>
    </section>
  );
}
