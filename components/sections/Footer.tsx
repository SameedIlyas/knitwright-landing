import { FOOTER, NAV_LINKS, SITE } from "@/lib/content";
import { Container, KnitMark, PrimaryButton } from "@/components/ui/primitives";
import { Reveal, WordsIn } from "@/components/ui/motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-surface pt-28">
      <Container className="flex flex-col items-center text-center">
        <WordsIn as="h2" text={FOOTER.cta} className="display max-w-[16ch] text-[clamp(2.5rem,1.2rem+5vw,5.5rem)]" />
        <Reveal delay={0.35}>
          <p className="display mt-1 text-[clamp(2.5rem,1.2rem+5vw,5.5rem)] text-faint">{FOOTER.ctaAccent}</p>
        </Reveal>
        <Reveal delay={0.5} className="mt-10">
          <PrimaryButton href="#early-access">Join the waitlist</PrimaryButton>
        </Reveal>
      </Container>

      <Container className="mt-28">
        <div className="flex flex-col gap-10 border-t border-hairline py-10 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-[22rem] flex-col gap-3">
            <a href="#top" className="flex items-center gap-2.5 text-ink">
              <span className="grid size-9 place-items-center rounded-full bg-ink text-white">
                <KnitMark className="size-4.5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">{SITE.name}</span>
            </a>
            <p className="text-muted">{FOOTER.line}</p>
            <p className="eyebrow text-faint">{SITE.lockup}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-ink-2 transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
            {FOOTER.links.map((l) => (
              <a key={l.href} href={l.href} className="text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-hairline py-6 sm:flex-row sm:justify-between">
          <p className="eyebrow text-muted">© 2026 {SITE.name}</p>
          <p className="eyebrow text-muted">Studio and production lines · Sialkot, Pakistan</p>
        </div>
      </Container>

      {/* Oversized wordmark, cropped by the page edge. */}
      <p aria-hidden="true" className="display pointer-events-none -mb-[0.2em] select-none text-center text-[clamp(4rem,1rem+17vw,17rem)] leading-none text-shell">
        {SITE.name}
      </p>
    </footer>
  );
}
