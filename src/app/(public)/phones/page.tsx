import type { Metadata } from "next";
import { HOSPITAL } from "@/lib/constants";
import { formatPhoneHref } from "@/lib/utils";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Τηλεφωνικός κατάλογος",
};

const ROWS = [
  { label: "Γραμματεία διευθυντή", value: HOSPITAL.phones.directorate },
  { label: "Γραμματεία ΝΝΚ", value: HOSPITAL.phones.secretariat },
  { label: "Ραντεβού εξωτερικών", value: HOSPITAL.phones.appointments.join(" · ") },
  { label: "ΤΕΠ", value: HOSPITAL.phones.emergency.join(" · ") },
  { label: "Υπερβαρική", value: HOSPITAL.phones.hyperbaric },
  { label: "Διακομιδή", value: HOSPITAL.phones.patientTransport },
];

export default function PhonesPage() {
  return (
    <PageShell wide>
      <h1 className="text-5xl">Τηλεφωνικός κατάλογος</h1>
      <p className="mt-4 max-w-prose text-lg">
        Γραμματεία {HOSPITAL.secretariatHours}. Το ΤΕΠ και η υπερβαρική απαντούν όλο το εικοσιτετράωρο.
      </p>
      <dl className="mt-10 grid gap-3 md:grid-cols-2">
        {ROWS.map((row) => (
          <div key={row.label} className="rounded-2xl bg-white/30 px-4 py-4">
            <dt className="text-sm text-[var(--muted)]">{row.label}</dt>
            <dd className="mt-1 text-xl font-semibold">
              <a href={formatPhoneHref(row.value.split(" · ")[0])}>{row.value}</a>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 max-w-prose text-sm text-[var(--muted)]">
        Email γραμματείας: {HOSPITAL.email}. Αιτήματα δεδομένων υγείας δεν στέλνονται με email.
      </p>
    </PageShell>
  );
}
