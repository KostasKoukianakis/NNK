import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Portal ασθενούς",
};

export default function PortalHomePage() {
  return (
    <div>
      <h1 className="text-4xl">Ο φάκελός σας</h1>
      <p className="mt-2 max-w-prose text-[var(--muted)]">
        Επερχόμενα ραντεβού, ιστορικό επισκέψεων και αποτελέσματα εξετάσεων.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <section className="glass rounded-[1.5rem] p-5 backdrop-blur-[22px]">
          <h2 className="text-2xl">Επόμενο ραντεβού</h2>
          <p className="mt-2 text-[var(--muted)]">Δεν υπάρχει προγραμματισμένη επίσκεψη.</p>
          <Button asChild className="mt-4">
            <Link href="/portal/book">Κλείσιμο ραντεβού</Link>
          </Button>
        </section>
        <section className="glass rounded-[1.5rem] p-5 backdrop-blur-[22px]">
          <h2 className="text-2xl">Ιστορικό</h2>
          <p className="mt-2 text-[var(--muted)]">Οι ολοκληρωμένες επισκέψεις θα εμφανιστούν εδώ.</p>
          <Link className="mt-4 inline-block font-semibold underline-offset-4 hover:underline" href="/portal/history">
            Προβολή ιστορικού
          </Link>
        </section>
        <section className="glass rounded-[1.5rem] p-5 backdrop-blur-[22px]">
          <h2 className="text-2xl">Αποτελέσματα</h2>
          <p className="mt-2 text-[var(--muted)]">Τα αποδεσμευμένα αρχεία είναι διαθέσιμα για λήψη.</p>
          <Link className="mt-4 inline-block font-semibold underline-offset-4 hover:underline" href="/portal/results">
            Λήψη αποτελεσμάτων
          </Link>
        </section>
      </div>
    </div>
  );
}
