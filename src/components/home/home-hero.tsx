import { ArrowDown } from "lucide-react";
import { CtaLink } from "@/components/ui/button";
import { FULL_BLEED } from "@/components/ui/glass";
import { AnatomicalHeart } from "@/components/visual/anatomical-heart";

export function HomeHero() {
  return (
    <section className="hero-fluid relative min-h-[100dvh] w-full overflow-hidden bg-[var(--blue)]">
      <div className="pointer-events-auto absolute inset-0 z-0">
        <AnatomicalHeart className="absolute inset-0 size-full" />
      </div>

      <div
        className={`${FULL_BLEED} pointer-events-none relative z-10 flex min-h-[100dvh] items-end pb-[3em] pt-[7em]`}
      >
        <div className="pointer-events-auto max-w-[min(100%,40em)]">
          <h1 className="hero-h1 text-white">
            <span className="block">Ναυτικό</span>
            <span className="block">Νοσοκομείο Κρήτης</span>
          </h1>
          <CtaLink href="/portal/book" className="hero-cta">
            Κλείσιμο ραντεβού
          </CtaLink>
        </div>
      </div>

      <a
        href="#apostoli"
        className="hero-scroll absolute bottom-[3em] right-[1.75rem] z-10 inline-flex items-center gap-[0.5em] font-mono uppercase text-white/80 transition hover:text-white"
      >
        Scroll down
        <ArrowDown className="size-[1em]" strokeWidth={2.25} aria-hidden="true" />
      </a>
    </section>
  );
}
