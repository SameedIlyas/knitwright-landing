import { WHY } from "@/lib/content";
import { HoverFill } from "./HoverFill";
import { Display, Frame } from "./ui";

/**
 * Six reasons as white cards: a large title at the top, the explanation settled
 * at the bottom, close enough that the card reads as one piece. Hovering floods a card with cobalt from the pointer.
 */
export function Why() {
  return (
    <section data-nav-theme="light" className="bg-canvas pb-28 sm:pb-32">
      <Frame>
        <Display className="max-w-[20ch] text-[clamp(2.4rem,1.3rem+3.6vw,4.8rem)] leading-[1.02] tracking-[-0.05em] text-ink-2">{WHY.title}</Display>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {WHY.reasons.map((r) => (
            <HoverFill key={r.title} className="min-h-[17rem] rounded-[2.5rem] bg-white p-8 sm:p-9">
              <h3 className="max-w-[18ch] text-[clamp(1.9rem,1.35rem+1.1vw,2.5rem)] font-light leading-[1.08] tracking-[-0.035em] text-ink-2 transition-colors duration-500 group-hover/fill:text-white">
                {r.title}
              </h3>
              <p className="max-w-[34ch] leading-relaxed text-muted transition-colors duration-500 group-hover/fill:text-white/85">{r.body}</p>
            </HoverFill>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
