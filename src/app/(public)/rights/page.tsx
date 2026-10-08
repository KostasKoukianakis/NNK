import type { Metadata } from "next";
import Link from "next/link";
import { HOSPITAL } from "@/lib/constants";
import { formatPhoneHref } from "@/lib/utils";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Δικαιώματα ασθενών",
};

export default function RightsPage() {
  return (
    <PageShell>
      <h1 className="text-5xl">Δικαιώματα ασθενών</h1>
      <p className="mt-4 max-w-prose text-lg">
        Νοσηλευόμενοι, εξωτερικοί ασθενείς, συνοδοί και επισκέπτες μπορούν να ζητήσουν ενημέρωση, να υποβάλουν πρόταση ή να αναφέρουν πρόβλημα στην παροχή φροντίδας.
      </p>
      <p className="mt-4 max-w-prose">
        Απευθυνθείτε στη γραμματεία, {HOSPITAL.secretariatHours}, στο{" "}
        <a href={formatPhoneHref(HOSPITAL.phones.secretariat)}>{HOSPITAL.phones.secretariat}</a>.
        Δεν υπάρχει φόρμα στον ιστότοπο για καταγγελίες που περιέχουν δεδομένα υγείας.
      </p>
      <ul className="mt-8 list-disc space-y-2 pl-5">
        <li>Ενημέρωση για τη διάγνωση και τη θεραπεία, σε γλώσσα που καταλαβαίνετε.</li>
        <li>Συναίνεση πριν από πράξη, εκτός επείγοντος.</li>
        <li>Απόρρητο του φακέλου. Αντίγραφα μόνο με τη διαδικασία της γραμματείας.</li>
        <li>Σεβασμός κατά την εξέταση και τη νοσηλεία.</li>
      </ul>
      <Link className="mt-8 inline-block font-semibold underline-offset-4 hover:underline" href="/faq">
        Συχνές ερωτήσεις
      </Link>
    </PageShell>
  );
}
