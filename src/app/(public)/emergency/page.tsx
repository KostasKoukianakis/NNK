import type { Metadata } from "next";
import { HOSPITAL } from "@/lib/constants";
import { formatPhoneHref } from "@/lib/utils";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Επείγοντα",
};

export default function EmergencyPage() {
  return (
    <PageShell>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-semibold text-[var(--emergency)]">ΤΕΠ · 24 ώρες</p>
          <h1 className="mt-2 text-5xl">Επείγοντα περιστατικά</h1>
          <p className="mt-4 max-w-prose text-lg">
            Το ιατρείο επειγόντων λειτουργεί συνεχώς. Καλέστε πριν την άφιξη όταν είναι ασφαλές.
          </p>
          <p className="mt-8 font-[family-name:var(--font-display)] text-4xl">
            <a href={formatPhoneHref(HOSPITAL.phones.emergency[0])}>
              {HOSPITAL.phones.emergency[0]}
            </a>
          </p>
          <p className="mt-2 text-lg">
            Εναλλακτικά{" "}
            <a href={formatPhoneHref(HOSPITAL.phones.emergency[1])}>
              {HOSPITAL.phones.emergency[1]}
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-3xl">Καταδυτικά ατυχήματα</h2>
          <p className="mt-3 max-w-prose text-lg">
            Το τμήμα καταδυτικής και υπερβαρικής ιατρικής δέχεται περιστατικά στον νότιο ελλαδικό χώρο όλο το εικοσιτετράωρο. Τηλέφωνο τμήματος{" "}
            <a href={formatPhoneHref(HOSPITAL.phones.hyperbaric)}>{HOSPITAL.phones.hyperbaric}</a>.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
