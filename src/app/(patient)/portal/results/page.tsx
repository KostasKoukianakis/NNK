import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Αποτελέσματα εξετάσεων",
};

export default function ResultsPage() {
  return (
    <div className="glass rounded-[1.75rem] p-8">
      <h1 className="text-4xl">Αποτελέσματα εξετάσεων</h1>
      <p className="mt-3 max-w-prose text-[var(--muted)]">
        Τα αρχεία αποδεσμεύονται από το εργαστήριο και τη γραμματεία. Η λήψη γίνεται από ιδιωτικό bucket του Supabase Storage.
      </p>
    </div>
  );
}
