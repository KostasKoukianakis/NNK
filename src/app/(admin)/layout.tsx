import type { ReactNode } from "react";
import Link from "next/link";
import { SkipLink } from "@/components/layout/skip-link";

const LINKS = [
  { href: "/admin", label: "Επισκόπηση" },
  { href: "/admin/appointments", label: "Ραντεβού" },
  { href: "/admin/doctors", label: "Ιατροί" },
  { href: "/admin/announcements", label: "Ανακοινώσεις" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 bg-[var(--blue)]">
      <SkipLink />
      <aside className="hidden w-56 shrink-0 border-r border-white/10 bg-[var(--black)] text-white md:block">
        <p className="px-4 py-5 text-lg tracking-[0.04em]">ΝΝΚ Admin</p>
        <nav aria-label="Διαχείριση" className="grid px-2">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="min-h-11 px-2 py-2 text-sm text-white/80 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-white/10 px-4 py-3 md:hidden">
          <p className="font-medium">ΝΝΚ Admin</p>
        </header>
        <main id="main-content" className="flex-1 px-4 py-8">
          <div className="glass rounded-2xl p-6 sm:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
