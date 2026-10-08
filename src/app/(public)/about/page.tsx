import type { Metadata } from "next";
import Link from "next/link";
import { HOSPITAL } from "@/lib/constants";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Το νοσοκομείο",
};

export default function AboutPage() {
  return (
    <PageShell>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h1 className="text-5xl">Το νοσοκομείο</h1>
          <p className="mt-4 max-w-prose text-lg">
            Το {HOSPITAL.name} είναι Ανεξάρτητη Ναυτική Υπηρεσία με πλήρη διοίκηση στον Α/ΓΕΝ. Είναι το μόνο νοσοκομείο των Ενόπλων Δυνάμεων με διακλαδική στελέχωση και καλύπτει τους σχηματισμούς ΣΞ, ΠΝ και ΠΑ στην Κρήτη.
          </p>
          <p className="mt-4 max-w-prose">
            Θεμελιώθηκε στις 30 Δεκεμβρίου 1964 και λειτούργησε στις 6 Φεβρουαρίου 1969. Στεγάζεται σε κτίριο τριών ορόφων στη Σούδα. Διαθέτει {HOSPITAL.beds} κλίνες, έως {HOSPITAL.bedsSurge} σε κινητοποίηση, δύο χειρουργικές αίθουσες και 24ωρο ιατρείο επειγόντων.
          </p>
        </div>
        <div>
      <h2 className="mt-10 text-3xl">Ενότητες</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {[
          ["/mission", "Αποστολή"],
          ["/organization", "Οργάνωση"],
          ["/history", "Ιστορικό"],
          ["/contribution", "Κοινωνική προσφορά"],
          ["/access", "Πρόσβαση"],
          ["/phones", "Τηλέφωνα"],
        ].map(([href, label]) => (
          <li key={href}>
            <Link className="font-semibold underline-offset-4 hover:underline" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </PageShell>
  );
}
