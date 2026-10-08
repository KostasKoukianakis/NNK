import type { ReactNode } from "react";
import Link from "next/link";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteMark } from "@/components/layout/site-mark";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-[var(--blue)]">
      <SkipLink />
      <header className="border-b border-white/10 py-4">
        <div className="mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16">
          <Link href="/" className="inline-flex">
            <SiteMark />
          </Link>
        </div>
      </header>
      <main id="main-content" className="mx-auto flex w-full max-w-lg flex-1 items-center px-5 py-12 sm:px-8">
        <div className="glass w-full rounded-2xl p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
