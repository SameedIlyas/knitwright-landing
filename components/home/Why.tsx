import { WHY } from "@/lib/content";
import { Display, Frame } from "./ui";

/** Six reasons as tall white cards: title at the top, the explanation settled at the bottom. */
export function Why() {
  return (
    <section data-nav-theme="light" className="bg-canvas pb-28 sm:pb-32">
      <Frame>
        <Display className="max-w-[20ch] text-[clamp(2.4rem,1.3rem+3.6vw,4.8rem)] leading-[1.02] tracking-[-0.05em] text-ink-2">{WHY.title}</Display>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {WHY.reasons.map((r) => (
            <li key={r.title} className="flex min-h-[21rem] flex-col justify-between rounded-[2.5rem] bg-white p-8 sm:p-10">
              <h3 className="max-w-[16ch] text-[1.9rem] font-light leading-[1.1] tracking-[-0.03em] text-ink-2">{r.title}</h3>
              <p className="max-w-[34ch] leading-relaxed text-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
