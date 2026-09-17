"use client";

import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ASSISTANT, VERIFICATION } from "@/lib/content";
import { KnitMark } from "@/components/ui/logo";
import { Display, Frame } from "./ui";

const KnotScene = dynamic(() => import("@/components/visuals/KnotScene"), { ssr: false });

/** One turn every four seconds; the reply types a word every 80ms. */
const TURN_MS = 4000;
const WORD_MS = 80;

/**
 * Dark stage for verification: the knit knot as the object, a signed-spec card,
 * an assistant reply that types out, and a phone whose suggestion chips light
 * up in step with the reply being typed.
 */
export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setTurn((t) => (t + 1) % ASSISTANT.turns.length), TURN_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <section id="verification" ref={ref} data-nav-theme="dark" className="relative isolate scroll-mt-24 overflow-hidden bg-black py-10 sm:py-16">
      {/* The iridescent thread sweeping under the panel. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[60%]">
        <div className="absolute -left-[10%] bottom-[-30%] h-[90%] w-[70%] rounded-[50%] bg-[#2b46f0] opacity-70 blur-[90px]" />
        <div className="absolute -right-[5%] bottom-[-20%] h-[80%] w-[55%] rounded-[50%] bg-[#ffd3e6] opacity-40 blur-[110px]" />
        <div className="absolute bottom-[-35%] left-[30%] h-[70%] w-[45%] rounded-[50%] bg-[#9fb0ff] opacity-45 blur-[100px]" />
      </div>

      <Frame>
        <div className="grid gap-5 rounded-[2.5rem] border border-white/10 bg-black/85 p-5 sm:p-10 lg:grid-cols-[1.25fr_1fr_0.95fr] lg:gap-6 lg:p-14">
          <div className="flex flex-col justify-between gap-6">
            <div aria-hidden="true" className="relative aspect-square w-full max-w-[30rem] self-center lg:flex-1">
              <div className="absolute inset-[18%] rounded-full bg-[image:var(--thread)] opacity-30 blur-[70px]" />
              <div className="absolute inset-0">
                <KnotScene still={Boolean(reduce)} color="#4a4d5c" />
              </div>
            </div>
            <div>
              <Display className="text-[clamp(2.2rem,1.3rem+2.4vw,3.4rem)] leading-[1.05] text-white">{VERIFICATION.title}</Display>
              <p className="mt-4 max-w-[30rem] text-[1.08rem] leading-relaxed text-white/70">{VERIFICATION.caption}</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-[2rem] border border-white/12 p-8">
              <p className="thread-text text-[clamp(1.6rem,1.2rem+1vw,2.1rem)] font-light leading-tight tracking-[-0.02em]">
                Five checks before anything is cut
              </p>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-white/85">{VERIFICATION.body}</p>
            </div>
            <div className="flex-1 rounded-[2rem] border border-white/12 p-3">
              <ReplyCard key={turn} text={ASSISTANT.turns[turn].reply} run={inView && !reduce} />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Phone active={turn} />
          </div>
        </div>
      </Frame>
    </section>
  );
}

/** Types the reply one word at a time. Remounted per turn, so it always starts empty. */
function ReplyCard({ text, run }: { text: string; run: boolean }) {
  const words = text.split(" ");
  const [count, setCount] = useState(run ? 0 : words.length);

  useEffect(() => {
    if (!run || count >= words.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), WORD_MS);
    return () => window.clearTimeout(t);
  }, [run, count, words.length]);

  return (
    <div className="flex h-full min-h-[17rem] flex-col rounded-[1.6rem] bg-[linear-gradient(145deg,#2b46f0_0%,#6a5bd8_55%,#c7a6e6_100%)] p-7 text-white">
      <p className="flex items-center gap-2.5 border-b border-white/25 pb-4 text-sm font-medium">
        <span className="size-2.5 rounded-full bg-white" />
        Knitwright spec assistant
      </p>
      <p className="mt-5 text-[1.12rem] leading-relaxed">
        <span aria-hidden="true">{words.slice(0, count).join(" ")}</span>
        <span className="sr-only">{text}</span>
      </p>
    </div>
  );
}

function Phone({ active }: { active: number }) {
  return (
    <div className="relative w-[18.5rem] rounded-[3rem] bg-[linear-gradient(145deg,#d9dbe2,#5c5e66_40%,#1a1b1f)] p-[5px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="rounded-[2.75rem] bg-black p-2">
        <div className="relative flex h-[36rem] flex-col overflow-hidden rounded-[2.35rem] bg-white px-4 pb-4 pt-3 text-ink">
          <div className="flex items-center justify-between px-2 text-[0.7rem] font-semibold">
            <span>9:41</span>
            <span className="h-5 w-20 rounded-full bg-black" />
            <span className="flex gap-1">
              <span className="h-2 w-3 rounded-sm bg-ink" />
              <span className="h-2 w-4 rounded-sm bg-ink" />
            </span>
          </div>
          <div className="mt-10 flex flex-col items-center text-center">
            <span className="grid size-20 place-items-center rounded-full bg-[image:var(--thread)] shadow-[0_12px_30px_-10px_rgba(43,70,240,0.6)]">
              <KnitMark className="size-8 text-ink" />
            </span>
            <p className="mt-4 text-xl font-medium tracking-tight text-cobalt">{ASSISTANT.greeting}</p>
            <p className="mt-1 text-xs text-muted">{ASSISTANT.hint}</p>
          </div>
          <ul className="mt-auto grid grid-cols-2 gap-2">
            {ASSISTANT.turns.map((t, i) => (
              <li
                key={t.chip}
                className={`rounded-2xl p-3 text-[0.72rem] font-medium leading-snug transition-colors duration-300 ${
                  i === active ? "bg-cobalt text-white" : "bg-canvas text-ink"
                }`}
              >
                {t.chip}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between rounded-2xl bg-canvas py-2.5 pl-3 pr-2 text-[0.7rem] text-muted">
            {ASSISTANT.input}
            <span className="grid size-6 place-items-center rounded-full bg-ink text-white">
              <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden="true">
                <path d="M8 12.5v-9M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
