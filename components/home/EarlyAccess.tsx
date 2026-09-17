import Image from "next/image";
import { EARLY_ACCESS } from "@/lib/content";
import { WaitlistForm } from "@/components/sections/WaitlistForm";
import { Display, Frame } from "./ui";
import { InViewPill } from "./InViewPill";
import threads from "@/public/images/cta-thread.jpg";

/** Closing band over a photograph, then the form in a white card that overlaps it. */
export function EarlyAccess() {
  return (
    <section id="early-access" className="scroll-mt-24 bg-canvas pb-24">
      <div data-nav-theme="dark" className="relative isolate overflow-hidden bg-tile pb-40 pt-32 text-white">
        <Image src={threads} alt="" fill sizes="100vw" placeholder="blur" className="-z-10 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,16,18,0.72),rgba(15,16,18,0.82))]" />
        <Frame className="flex flex-col items-center text-center">
          <Display className="max-w-[20ch] text-[clamp(2.2rem,1.3rem+3vw,4.2rem)] leading-[1.04]">{EARLY_ACCESS.title}</Display>
          <p className="mt-6 max-w-[40rem] text-[1.08rem] leading-relaxed text-white/80">{EARLY_ACCESS.sub}</p>
          <div className="mt-10">
            <InViewPill href="#waitlist-form">Request early access</InViewPill>
          </div>
        </Frame>
      </div>

      <div data-nav-theme="light">
        <Frame className="-mt-24 flex flex-col items-center">
          <div id="waitlist-form" className="w-full max-w-[52rem] scroll-mt-28 rounded-[2.5rem] bg-white p-6 shadow-[0_40px_90px_-50px_rgba(15,16,18,0.45)] sm:p-10">
            <WaitlistForm />
          </div>
          <div className="mt-10 w-full max-w-[52rem]">
            <p className="font-medium">{EARLY_ACCESS.ready.title}</p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3">
              {EARLY_ACCESS.ready.items.map((it) => (
                <li key={it} className="rounded-3xl bg-white p-5 text-sm leading-relaxed text-ink-2">
                  {it}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">{EARLY_ACCESS.ready.note}</p>
          </div>
        </Frame>
      </div>
    </section>
  );
}
