import Image from "next/image";
import { HOME_HERO } from "@/lib/content";
import { KnitMark } from "@/components/ui/logo";
import { ArrowDisc, Display, PillLink } from "./ui";
import heroFloor from "@/public/images/hero-floor.jpg";

/**
 * Full-bleed photographic stage. The only load motion is the second headline
 * line unfolding once; the style strip below runs continuously.
 */
export function Hero() {
  return (
    <section
      id="top"
      data-nav-theme="dark"
      className="relative isolate flex min-h-[max(100svh,760px)] flex-col overflow-hidden bg-tile text-white"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <Image src={heroFloor} alt="" fill priority sizes="100vw" placeholder="blur" className="hero-drift object-cover" />
        <div className="absolute inset-0 bg-[rgba(15,16,18,0.68)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(15,16,18,0.35),transparent_75%),linear-gradient(180deg,rgba(15,16,18,0.45)_0%,transparent_35%,transparent_60%,rgba(15,16,18,0.85)_100%)]" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-5 pb-44 pt-36 text-center">
        <Display as="h1" className="text-[clamp(2.6rem,1.2rem+4.6vw,5rem)] leading-[1.06]">
          <span className="block">{HOME_HERO.headline[0]}</span>
          <span className="morph-reveal thread-text pb-[0.08em]">{HOME_HERO.headline[1]}</span>
        </Display>
        <p className="mt-7 max-w-[36rem] text-[clamp(1rem,0.9rem+0.35vw,1.2rem)] leading-relaxed text-white/85">{HOME_HERO.sub}</p>
        <PillLink href="#early-access" tone="outline-light" className="mt-10">
          Join the waitlist
        </PillLink>
      </div>

      <SignOffCard />
      <StyleStrip />
    </section>
  );
}

/** Glass card: the named sign-off, with a disc that jumps down to the gallery. */
function SignOffCard() {
  const c = HOME_HERO.card;
  return (
    <aside className="absolute bottom-[7.5rem] right-[2.8vw] hidden w-[23rem] xl:block">
      <div className="relative rounded-[2rem] border border-white/12 bg-white/10 p-6 pr-14 backdrop-blur-xl">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className="grid size-5 place-items-center rounded-full bg-ok">
            <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden="true">
              <path d="m4 8.5 2.5 2.5L12 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {c.title}
        </p>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/85">{c.body}</p>
        <div className="mt-4 flex items-center gap-3.5">
          <span className="grid size-12 place-items-center rounded-full bg-[image:var(--thread)] text-ink">
            <KnitMark className="size-5" />
          </span>
          <span>
            <span className="block font-medium">{c.who}</span>
            <span className="block text-sm text-white/65">{c.role}</span>
          </span>
        </div>
        <p className="mt-3 text-xs text-white/45">{c.note}</p>
        <ArrowDisc
          href="#gallery"
          label="See what Knitwright does"
          down
          className="absolute -right-5 -top-5 border border-white/15 bg-tile/70 text-white backdrop-blur-xl"
        />
      </div>
    </aside>
  );
}

/** Garment styles in an endless strip along the bottom edge. */
function StyleStrip() {
  const items = HOME_HERO.marquee;
  return (
    <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 py-7 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <span className="sr-only">Styles we make: {items.join(", ")}</span>
      <div aria-hidden="true" className="marquee-track flex w-max items-center [--marquee-duration:60s]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {items.map((s) => (
              <span key={`${copy}-${s}`} className="flex items-center gap-[clamp(2.5rem,5vw,5rem)] pr-[clamp(2.5rem,5vw,5rem)]">
                <span className="text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] font-light tracking-[-0.02em] text-white/60">{s}</span>
                <KnitMark className="size-3.5 text-white/30" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
