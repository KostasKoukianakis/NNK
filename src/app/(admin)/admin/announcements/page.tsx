import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ανακοινώσεις" };

export default function AdminAnnouncementsPage() {
  return (
    <div>
      <h1 className="text-3xl">Ανακοινώσεις</h1>
      <p className="mt-2 text-[var(--muted)]">
        Οι ανακοινώσεις γίνονται δημόσιες όταν οριστεί published_at.
      </p>
    </div>
  );
}
