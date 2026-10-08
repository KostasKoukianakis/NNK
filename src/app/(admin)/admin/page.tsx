import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Διαχείριση",
};

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-3xl">Γραμματεία</h1>
      <p className="mt-2 max-w-prose text-[var(--muted)]">
        Έγκριση ραντεβού, μητρώο ιατρών και ανακοινώσεις. Οι εγγραφές ελέγχονται από RLS: μόνο ρόλος admin ή doctor.
      </p>
    </div>
  );
}
