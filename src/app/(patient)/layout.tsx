import type { ReactNode } from "react";
import Link from "next/link";
import { SkipLink } from "@/components/layout/skip-link";
import { HOSPITAL } from "@/lib/constants";
import { PAGE_WIDTH } from "@/components/ui/glass";
import { CtaLink } from "@/components/ui/button";

const LINKS = [
  { href: "/portal", label: "Επισκόπηση" },
  { href: "/portal/book", label: "Νέο ραντεβού" },
  { href: "/portal/appointments", label: "Ραντεβού" },
  { href: "/portal/history", label: "Ιστορικό" },
  { href: "/portal/results", label: "Αποτελέσματα" },
];

export default function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-[var(--blue)]">
      <SkipLink />
      <header className="border-b border-white/10 bg-[var(--blue)]/70 backdrop-blur-md">
        <div className={`${PAGE_WIDTH} flex items-center justify-between gap-4 py-4`}>
          <Link href="/portal" className="text-lg tracking-[0.04em]">
            {HOSPITAL.shortName} Portal
          </Link>
          <nav aria-label="Portal" className="nav-pill hidden md:flex">
            {LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="nav-pill-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <CtaLink href="/" size="sm" variant="outline">
            Ιστότοπος
          </CtaLink>
        </div>
      </header>
      <main id="main-content" className={`${PAGE_WIDTH} flex-1 py-10`}>
        {children}
      </main>
    </div>
  );
}
