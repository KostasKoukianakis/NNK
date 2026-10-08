import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/glass";
import { SECTOR_LABELS } from "@/lib/constants";
import { listDepartments } from "@/lib/queries/catalog";

export const metadata: Metadata = {
  title: "Κλινικές και τμήματα",
};

const ORDER = ["emergency", "surgical", "pathology", "laboratory", "dental"] as const;

export default async function DepartmentsPage() {
  const departments = await listDepartments();

  return (
    <PageShell wide>
      <h1 className="text-5xl">Κλινικές και τμήματα</h1>
      <p className="mt-3 max-w-prose text-lg text-[var(--muted)]">
        Τέσσερις τομείς, μικτή πτέρυγα, χειρουργείο και εξωτερικά ιατρεία κατόπιν ραντεβού.
      </p>
      <div className="mt-10 space-y-10">
        {ORDER.map((sector) => {
          const items = departments.filter((department) => department.sector === sector);
          if (items.length === 0) {
            return null;
          }
          return (
            <section key={sector}>
              <h2 className="text-3xl">{SECTOR_LABELS[sector]}</h2>
              <ul className="mt-4 grid gap-3 lg:grid-cols-2">
                {items.map((department) => (
                  <li key={department.id}>
                    <Link
                      href={`/departments/${department.slug}`}
                      className="grid gap-1 rounded-2xl bg-white/25 px-4 py-4 hover:bg-white/40"
                    >
                      <span className="text-xl font-semibold">{department.name}</span>
                      <span className="text-[var(--muted)]">
                        {department.location_floor ? `${department.location_floor} · ` : ""}
                        {department.is_bookable ? "Ραντεβού" : "Πληροφορίες"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
