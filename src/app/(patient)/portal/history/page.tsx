import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ιστορικό επισκέψεων",
};

export default function HistoryPage() {
  return (
    <div className="glass rounded-[1.75rem] p-8">
      <h1 className="text-4xl">Ιστορικό επισκέψεων</h1>
      <p className="mt-3 max-w-prose text-[var(--muted)]">
        Οι επισκέψεις με κατάσταση «ολοκληρωμένο» αποτελούν το ιστορικό σας. Δεν εμφανίζονται ακυρωμένα ραντεβού.
      </p>
    </div>
  );
}
