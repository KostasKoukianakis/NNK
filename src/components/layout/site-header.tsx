"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HOSPITAL } from "@/lib/constants";
import { MENU, type MenuNode } from "@/lib/content/site-map";
import { cn, formatPhoneHref } from "@/lib/utils";
import { CtaLink } from "@/components/ui/button";
import { FULL_BLEED, PAGE_WIDTH } from "@/components/ui/glass";
import { SiteMark } from "@/components/layout/site-mark";
import { GatherPanel } from "@/components/visual/reveal";

const PILL = [
  { href: "/", label: "Αρχική", match: (path: string) => path === "/" },
  { href: "/departments", label: "Κλινικές", match: (path: string) => path.startsWith("/departments") },
  {
    href: "/p/asthenis",
    label: "Ασθενής",
    match: (path: string) =>
      path.startsWith("/p/asthenis") || path.startsWith("/eligibility") || path.startsWith("/guidelines"),
  },
  { href: "/announcements", label: "Ανακοινώσεις", match: (path: string) => path.startsWith("/announcements") },
  { href: "/faq", label: "FAQ", match: (path: string) => path.startsWith("/faq") },
] as const;

function BranchList({ nodes }: { nodes: MenuNode[] }) {
  return (
    <ul className="space-y-2 text-sm text-white/80">
      {nodes.map((node) => (
        <li key={node.path.join("/")}>
          <Link className="hover:text-white" href={node.url}>
            {node.title}
          </Link>
          {node.children.length > 0 ? (
            <div className="mt-1 border-l border-white/20 pl-3">
              <BranchList nodes={node.children} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function MobileBranch({ node }: { node: MenuNode }) {
  if (node.children.length === 0) {
    return (
      <Link className="flex min-h-11 items-center px-2" href={node.url}>
        {node.title}
      </Link>
    );
  }

  return (
    <details className="rounded-xl">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-2">
        <span>{node.title}</span>
        <span aria-hidden="true">+</span>
      </summary>
      <div className="space-y-1 border-l border-white/20 pb-2 pl-3">
        <Link className="flex min-h-11 items-center px-2 text-white/60" href={node.url}>
          Άνοιγμα ενότητας
        </Link>
        {node.children.map((child) => (
          <MobileBranch key={child.path.join("/")} node={child} />
        ))}
      </div>
    </details>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const emergency = HOSPITAL.phones.emergency[0];
  const organosi = MENU.find((item) => item.slug === "organosi");
  const isHome = pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={cn("site-chrome z-40 text-white", isHome ? "absolute inset-x-0 top-0" : "sticky top-0")}>
      {!isHome ? (
        <div className="border-b border-white/10 bg-[var(--blue)]/70 backdrop-blur-md">
          <div className={cn(PAGE_WIDTH, "flex flex-wrap items-center justify-between gap-2 py-[0.5em] text-[0.7em]")}>
            <p className="font-mono uppercase tracking-[0.08em] text-white/65">
              {HOSPITAL.addressLine} · {HOSPITAL.secretariatHours}
            </p>
            <a
              className="font-mono font-medium tracking-wide text-[var(--emergency)]"
              href={formatPhoneHref(emergency)}
            >
              Επείγοντα {emergency}
            </a>
          </div>
        </div>
      ) : null}

      <div className={cn("relative", !isHome && "bg-[var(--blue)]/50 backdrop-blur-md")}>
        <div
          className={cn(
            FULL_BLEED,
            "site-chrome-inner flex items-center justify-between gap-x-[0.75em]",
            "xl:grid xl:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] xl:items-center",
          )}
        >
          <Link href="/" className="min-w-0 justify-self-start">
            <SiteMark />
          </Link>

          <nav
            aria-label="Κύρια πλοήγηση"
            className="nav-pill hidden min-w-0 justify-self-center xl:flex"
          >
            {PILL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-pill-link"
                data-active={item.match(pathname) ? "true" : "false"}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="nav-pill-link"
              data-active={menuOpen ? "true" : "false"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              Οργάνωση
            </button>
          </nav>

          <div className="nav-pill nav-pill-right hidden justify-self-end xl:flex">
            <Link className="nav-pill-link" href="/contact">
              Επικοινωνία
            </Link>
            <Link className="nav-pill-link" href="/phones">
              Τηλέφωνα
            </Link>
            <CtaLink href="/portal/book" className="nav-cta">
              Ραντεβού
            </CtaLink>
          </div>

          <button
            type="button"
            className="min-h-11 justify-self-end rounded-md border border-white/25 px-3 xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? "Κλείσιμο" : "Μενού"}
          </button>
        </div>

        <div className={cn(FULL_BLEED, "absolute inset-x-0 top-full z-50 hidden xl:block")}>
          <GatherPanel open={menuOpen} className="pt-3">
            {organosi ? (
              <div className="rounded-2xl border border-white/15 bg-[#033a8f]/95 p-6 shadow-2xl backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <Link className="text-lg font-medium" href={organosi.url}>
                    {organosi.title}
                  </Link>
                  <button
                    type="button"
                    className="min-h-11 px-3 text-sm text-white/70"
                    onClick={() => setMenuOpen(false)}
                  >
                    Κλείσιμο
                  </button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {organosi.children.map((child) => (
                    <div key={child.path.join("/")}>
                      <Link className="font-medium hover:underline" href={child.url}>
                        {child.title}
                      </Link>
                      {child.children.length > 0 ? (
                        <div className="mt-2">
                          <BranchList nodes={child.children} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </GatherPanel>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className={cn(PAGE_WIDTH, "max-h-[70vh] overflow-auto border-t border-white/15 bg-[#033a8f] py-4 xl:hidden")}
        >
          <nav aria-label="Κινητή πλοήγηση" className="flex flex-col">
            <a className="flex min-h-11 items-center px-2 text-[var(--emergency)]" href={formatPhoneHref(emergency)}>
              Επείγοντα {emergency}
            </a>
            {PILL.map((item) => (
              <Link key={item.href} className="flex min-h-11 items-center px-2" href={item.href}>
                {item.label}
              </Link>
            ))}
            {MENU.map((item) => (
              <MobileBranch key={item.slug} node={item} />
            ))}
            <CtaLink href="/portal/book" className="mt-3">
              Κλείσιμο ραντεβού
            </CtaLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
