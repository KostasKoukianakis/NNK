import type { Metadata } from "next";
import { HOSPITAL } from "@/lib/constants";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Πρόσβαση",
};

export default function AccessPage() {
  const query = encodeURIComponent(`${HOSPITAL.name} ${HOSPITAL.addressLine}`);

  return (
    <PageShell wide>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-5xl">Πρόσβαση</h1>
          <p className="mt-4 max-w-prose text-lg">
            Το νοσοκομείο στεγάζεται σε κτίριο τριών ορόφων στη Σούδα Χανίων, εντός της περιοχής της ναυτικής βάσης.
          </p>
          <p className="mt-4 text-lg font-semibold">
            {HOSPITAL.addressLine}, {HOSPITAL.postalCode}
          </p>
          <p className="mt-4 max-w-prose">
            Για επείγοντα ακολουθήστε τη σήμανση ΤΕΠ. Για εξωτερικά ιατρεία δηλώστε το ραντεβού στη γραμματεία. Τα ωράρια γραμματείας είναι {HOSPITAL.secretariatHours}. Σαββατοκύριακο και αργίες η γραμματεία είναι κλειστή. Το ΤΕΠ λειτουργεί όλο το εικοσιτετράωρο.
          </p>
          <a
            className="mt-6 inline-block font-semibold underline-offset-4 hover:underline"
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          >
            Άνοιγμα χάρτη
          </a>
        </div>
        <div className="rounded-2xl bg-white/30 p-6">
          <h2 className="text-2xl">Πριν ξεκινήσετε</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Έχετε ταυτότητα ή στρατιωτική ταυτότητα και ΑΜΚΑ.</li>
            <li>Για εξετάσεις, το παραπεμπτικό.</li>
            <li>Για ραντεβού, την ώρα που κλείσατε. Δεν υπάρχει ανοιχτή προσέλευση στα εξωτερικά ιατρεία.</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
