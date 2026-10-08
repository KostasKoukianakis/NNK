import type { Metadata } from "next";

export const metadata: Metadata = { title: "Έγκριση ραντεβού" };

export default function AdminAppointmentsPage() {
  return (
    <div>
      <h1 className="text-3xl">Ραντεβού προς έγκριση</h1>
      <p className="mt-2 text-[var(--muted)]">
        Τα αιτήματα με κατάσταση pending εμφανίζονται εδώ για επιβεβαίωση ή απόρριψη.
      </p>
    </div>
  );
}
