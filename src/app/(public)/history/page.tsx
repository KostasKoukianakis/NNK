import type { Metadata } from "next";
import { HOSPITAL } from "@/lib/constants";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Ιστορικό",
};

export default function HistoryPage() {
  return (
    <PageShell>
      <h1 className="text-5xl">Ιστορικό</h1>
      <ol className="mt-8 max-w-prose space-y-6 text-lg">
        <li>
          <p className="font-semibold">30 Δεκεμβρίου 1964</p>
          <p>Θεμελίωση στη Σούδα.</p>
        </li>
        <li>
          <p className="font-semibold">6 Φεβρουαρίου 1969</p>
          <p>Έναρξη λειτουργίας σε κτίριο τριών ορόφων.</p>
        </li>
        <li>
          <p className="font-semibold">Σήμερα</p>
          <p>
            {HOSPITAL.beds} κλίνες εν καιρώ ειρήνης, έως {HOSPITAL.bedsSurge} σε κινητοποίηση. Μικτή πτέρυγα, δύο χειρουργικές αίθουσες, 24ωρο ΤΕΠ και τμήμα καταδυτικής και υπερβαρικής ιατρικής. Περίπου 2.500 εισαγωγές και 30.000 ραντεβού εξωτερικών ιατρείων τον χρόνο.
          </p>
        </li>
      </ol>
    </PageShell>
  );
}
