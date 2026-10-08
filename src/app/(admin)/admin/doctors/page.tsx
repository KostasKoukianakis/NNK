import type { Metadata } from "next";

export const metadata: Metadata = { title: "Διαχείριση ιατρών" };

export default function AdminDoctorsPage() {
  return (
    <div>
      <h1 className="text-3xl">Μητρώο ιατρών</h1>
      <p className="mt-2 text-[var(--muted)]">
        Δημοσίευση βιογραφικού, ειδικότητας και ωραρίου εξωτερικού ιατρείου.
      </p>
    </div>
  );
}
