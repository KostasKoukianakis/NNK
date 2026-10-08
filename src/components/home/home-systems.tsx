import Image from "next/image";
import { CtaLink } from "@/components/ui/button";
import { FULL_BLEED } from "@/components/ui/glass";

export function HomeSystems() {
  return (
    <section id="systems" className="bg-[var(--black)] text-white">
      <div className={`${FULL_BLEED} py-[5em] sm:py-[6em] lg:py-[7em]`}>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-0">
          <div className="systems-left relative w-full overflow-hidden rounded-[4px] lg:h-[min(62rem,90vh)] lg:w-3/5">
            <div className="relative aspect-[4/3] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <Image
                src="/images/systems-side.jpg"
                alt="Ψηλά σύγχρονα κτίρια από χαμηλή γωνία, υπό νεφελώδη ουρανό"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          <div className="flex w-full flex-col px-0 lg:min-h-[min(62rem,90vh)] lg:w-2/5 lg:pl-[2.25em] lg:pr-0">
            <h2 className="max-w-[22ch] text-[clamp(2.75rem,4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white">
              Έτοιμο για πραγματικές συνθήκες περίθαλψης
            </h2>

            <div className="mt-10 flex w-full max-w-[36rem] flex-col gap-6 lg:mt-auto">
              <p className="text-[clamp(1.25rem,1.55vw,1.6rem)] font-medium leading-[1.3] tracking-[-0.01em] text-white">
                Το ΝΝΚ καλύπτει τους δικαιούχους σε δομημένο επιχειρησιακό πλαίσιο. Από τα εξωτερικά
                ιατρεία έως την υπερβαρική και τη νοσηλεία, κάθε δομή εντάσσεται στις ανάγκες των
                σχηματισμών στη Σούδα και την Κρήτη.
              </p>
              <div>
                <CtaLink href="#partners" variant="accent" size="lg">
                  Συνεργάτες
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
