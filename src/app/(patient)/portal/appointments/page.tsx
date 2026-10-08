import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ραντεβού",
};

export default function AppointmentsPage() {
  return (
    <div className="glass rounded-[1.75rem] p-8">
      <h1 className="text-4xl">Ραντεβού</h1>
      <p className="mt-3 max-w-prose text-[var(--muted)]">
        Όταν συνδεθεί η βάση, εδώ εμφανίζονται τα αιτήματα σε εκκρεμότητα και τα επιβεβαιωμένα ραντεβού.
      </p>
    </div>
  );
}
