import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/glass";
import { HOSPITAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Εξωτερικά ιατρεία",
};

const CLINICS = [
  "Χειρουργικό",
  "Ορθοπεδικό",
  "ΩΡΛ",
  "Οφθαλμολογικό",
  "Πλαστικής χειρουργικής",
  "Παθολογικό",
  "Καρδιολογικό",
  "Δερματολογικό",
  "Ψυχιατρικό, ψυχοθεραπείας και ψυχομετρίας",
  "Οδοντιατρικό",
  "Πνευμονολογικό",
  "Γαστρεντερολογικό",
  "Ουρολογικό",
];

export default function OutpatientPage() {
  return (
    <PageShell wide>
      <h1 className="text-5xl">Εξωτερικά ιατρεία</h1>
      <p className="mt-4 max-w-prose text-lg">
        Λειτουργούν μόνο κατόπιν ραντεβού. Περί τις 30.000 επισκέψεις τον χρόνο, συμπεριλαμβανομένων περίπου 7.000 εξετάσεων του ακτινολογικού.
      </p>
      <ol className="mt-8 max-w-prose list-decimal space-y-3 pl-5 text-lg">
        <li>
          Κλείστε ώρα από το portal ή τηλεφωνικά στα {HOSPITAL.phones.appointments.join(" και ")}, {HOSPITAL.secretariatHours}.
        </li>
        <li>Προσκομίστε ταυτότητα ή στρατιωτική ταυτότητα, ΑΜΚΑ και, όπου χρειάζεται, παραπεμπτικό.</li>
        <li>Δηλωθείτε στη γραμματεία πριν την εξέταση.</li>
      </ol>
      <h2 className="mt-12 text-3xl">Ιατρεία με ραντεβού</h2>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CLINICS.map((clinic) => (
          <li key={clinic} className="rounded-2xl bg-white/30 px-4 py-3">
            {clinic}
          </li>
        ))}
      </ul>
      <Link className="mt-8 inline-block font-semibold underline-offset-4 hover:underline" href="/portal/book">
        Κλείσιμο ραντεβού
      </Link>
    </PageShell>
  );
}
