import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/glass";
import { listDepartments, listPublishedDoctors } from "@/lib/queries/catalog";

export const metadata: Metadata = {
  title: "Ιατροί",
};

export default async function DoctorsPage() {
  const [doctors, departments] = await Promise.all([
    listPublishedDoctors(),
    listDepartments(),
  ]);
  const departmentName = new Map(departments.map((item) => [item.id, item.name]));

  return (
    <PageShell wide>
      <h1 className="text-5xl">Ιατροί</h1>
      <p className="mt-3 max-w-prose text-lg text-[var(--muted)]">
        Δημόσιο μητρώο ιατρών εξωτερικών ιατρείων. Για ραντεβού χρησιμοποιήστε το portal ή καλέστε τη γραμματεία.
      </p>
      {doctors.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-white/30 p-6">
          Το μητρώο θα εμφανιστεί μετά τη σύνδεση με τη βάση. Μέχρι τότε καλέστε 28210 82628.
        </p>
      ) : (
        <ul className="mt-10 grid gap-3 lg:grid-cols-2">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="grid gap-1 rounded-2xl bg-white/30 px-4 py-4 md:grid-cols-3">
              <p className="font-semibold">{doctor.full_name}</p>
              <p>{doctor.specialty}</p>
              <p className="text-[var(--muted)]">
                {departmentName.get(doctor.department_id) ?? ""}
              </p>
            </li>
          ))}
        </ul>
      )}
      <Link className="mt-8 inline-block font-semibold underline-offset-4 hover:underline" href="/portal/book">
        Κλείσιμο ραντεβού
      </Link>
    </PageShell>
  );
}
