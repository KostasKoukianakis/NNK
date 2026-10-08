import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/glass";
import { SECTOR_LABELS } from "@/lib/constants";
import { getDepartmentBySlug, listDepartments } from "@/lib/queries/catalog";
import { formatPhoneHref } from "@/lib/utils";

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const departments = await listDepartments();
  return departments.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({
  params,
}: DepartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department) {
    return { title: "Κλινική" };
  }

  return {
    title: department.name,
    description: department.description,
  };
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department) {
    notFound();
  }

  const doctors = department.doctors.filter((doctor) => doctor.is_published);

  return (
    <PageShell wide className="sm:p-12">
      <p className="text-sm font-semibold text-[var(--muted)]">
        <Link href="/departments" className="underline-offset-2 hover:underline">
          Κλινικές
        </Link>
        {" / "}
        {SECTOR_LABELS[department.sector]}
      </p>
      <h1 className="mt-3 max-w-[18ch] text-[clamp(2rem,4vw,3.75rem)] leading-[1.08]">
        {department.name}
      </h1>
      <p className="mt-4 max-w-prose text-lg">{department.description}</p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/30 p-4">
          <dt className="text-sm text-[var(--muted)]">Όροφος</dt>
          <dd className="text-lg font-semibold">{department.location_floor ?? "—"}</dd>
        </div>
        <div className="rounded-2xl bg-white/30 p-4">
          <dt className="text-sm text-[var(--muted)]">Τηλέφωνο</dt>
          <dd className="text-lg font-semibold">
            {department.phone ? (
              <a href={formatPhoneHref(department.phone)}>{department.phone}</a>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div className="rounded-2xl bg-white/30 p-4">
          <dt className="text-sm text-[var(--muted)]">Ραντεβού</dt>
          <dd className="text-lg font-semibold">
            {department.is_bookable ? "Διαθέσιμο online" : "Μόνο με παραπομπή / ΤΕΠ"}
          </dd>
        </div>
      </dl>

      {department.visiting_notes ? (
        <p className="mt-6 max-w-prose rounded-2xl bg-white/30 p-4">
          {department.visiting_notes}
        </p>
      ) : null}

      <section className="mt-12">
        <h2 className="text-3xl">Ιατροί της κλινικής</h2>
        {doctors.length === 0 ? (
          <p className="mt-4 max-w-prose text-[var(--muted)]">
            Το δημόσιο μητρώο ιατρών για αυτή την κλινική ενημερώνεται. Για ραντεβού καλέστε 28210 82628.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4">
            {doctors.map((doctor) => (
              <li key={doctor.id}>
                <div className="rounded-2xl bg-white/30 p-4">
                  <p className="text-lg font-semibold">{doctor.full_name}</p>
                  <p className="text-[var(--muted)]">
                    {doctor.rank_title ? `${doctor.rank_title} · ` : null}
                    {doctor.specialty}
                  </p>
                  {doctor.bio ? <p className="mt-2 max-w-prose">{doctor.bio}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        {department.is_bookable ? (
          <Button asChild>
            <Link href={`/portal/book?department=${department.slug}`}>
              Κλείσιμο ραντεβού
            </Link>
          </Button>
        ) : (
          <Badge>Χωρίς online ραντεβού</Badge>
        )}
        <Button asChild variant="outline">
          <Link href="/contact">Επικοινωνία</Link>
        </Button>
      </div>
    </PageShell>
  );
}
