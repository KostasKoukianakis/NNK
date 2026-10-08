import Link from "next/link";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PAGE_WIDTH } from "@/components/ui/glass";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" className={`${PAGE_WIDTH} flex-1 py-16`}>
        <div className="glass rounded-[2rem] p-8">
          <h1 className="text-4xl">Η σελίδα δεν βρέθηκε</h1>
          <p className="mt-3 max-w-prose">Ελέγξτε τη διεύθυνση ή επιστρέψτε στην αρχική.</p>
          <Link className="mt-6 inline-block font-semibold underline-offset-4 hover:underline" href="/">
            Αρχική ΝΝΚ
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
