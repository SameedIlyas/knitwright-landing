import { FOOTER, NAV_LINKS, SITE } from "@/lib/content";
import { KnitLogo } from "@/components/ui/logo";
import { Frame } from "./ui";

export function Footer() {
  return (
    <footer data-nav-theme="light" className="bg-canvas">
      <Frame>
        <div className="grid gap-12 border-t border-hairline py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex max-w-[24rem] flex-col gap-4">
            <a href="#top" aria-label={`${SITE.name} home`} className="w-fit text-ink">
              <KnitLogo className="h-7 w-auto" />
            </a>
            <p className="leading-relaxed text-muted">{FOOTER.line}</p>
            <p className="text-sm text-ink-2">
              {FOOTER.cta} {FOOTER.ctaAccent}
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="font-medium">Product</p>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="w-fit text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <p className="font-medium">Company</p>
            {FOOTER.links.map((l) => (
              <a key={l.href} href={l.href} className="w-fit text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-hairline py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© 2026 {SITE.name}</p>
          <p>Studio and production lines in Sialkot, Pakistan</p>
        </div>
      </Frame>
    </footer>
  );
}
