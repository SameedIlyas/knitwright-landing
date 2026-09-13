"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { FAQ } from "@/lib/content";
import { Container, SectionHead } from "@/components/ui/primitives";
import { WordsIn } from "@/components/ui/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const [group, setGroup] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const items = FAQ.groups[group].items;

  return (
    <section id="faq" className="scroll-mt-24 bg-canvas py-28">
      <Container>
        <SectionHead n={12} label={FAQ.label} title={<WordsIn text={FAQ.title} className="headline" />}>
          <div role="tablist" aria-label="FAQ topics" className="mt-2 flex flex-wrap justify-center gap-1 rounded-full bg-shell p-1">
            {FAQ.groups.map((g, i) => (
              <button
                key={g.name}
                role="tab"
                type="button"
                aria-selected={group === i}
                onClick={() => {
                  setGroup(i);
                  setOpen(0);
                }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${group === i ? "text-white" : "text-muted hover:text-ink"}`}
              >
                {group === i ? <motion.span layoutId="faq-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.3, ease: EASE }} /> : null}
                <span className="relative">{g.name}</span>
              </button>
            ))}
          </div>
        </SectionHead>

        <ul className="mx-auto mt-12 flex max-w-[52rem] flex-col gap-2.5" role="tabpanel">
          {items.map((it, i) => (
            <FaqItem
              key={`${group}-${it.q}`}
              n={i + 1}
              q={it.q}
              a={it.a}
              placeholder={"placeholder" in it && Boolean(it.placeholder)}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function FaqItem({
  n,
  q,
  a,
  placeholder,
  open,
  onToggle,
}: {
  n: number;
  q: string;
  a: string;
  placeholder: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <li className={`rounded-[1.6rem] transition-colors duration-300 ${open ? "bg-surface shadow-[0_1px_3px_rgba(15,16,18,0.06)]" : "bg-shell/70 hover:bg-shell"}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
        >
          <span className={`grid size-8 shrink-0 place-items-center rounded-lg font-mono text-xs transition-colors ${open ? "bg-ink text-white" : "bg-surface text-ink"}`}>{n}</span>
          <span className="flex-1 text-[1.0625rem] font-medium tracking-tight">{q}</span>
          <span aria-hidden="true" className="relative grid size-8 shrink-0 place-items-center rounded-full bg-canvas">
            <span className="absolute h-[1.5px] w-3 bg-ink" />
            <motion.span animate={{ rotate: open ? 0 : 90 }} transition={{ duration: 0.3, ease: EASE }} className="absolute h-[1.5px] w-3 bg-ink" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 pl-[4.25rem] leading-relaxed text-muted sm:px-6 sm:pl-[4.5rem]">
              {a}
              {placeholder ? <span className="eyebrow ml-2 rounded-full bg-warn-wash px-2 py-0.5 text-warn">To confirm</span> : null}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
