import type { Metadata } from "next";
import { HOSPITAL } from "@/lib/constants";
import { formatPhoneHref } from "@/lib/utils";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Επικοινωνία",
};

export default function ContactPage() {
  return (
    <PageShell>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-5xl">Επικοινωνία</h1>
          <p className="mt-4 max-w-prose text-lg">
            {HOSPITAL.addressLine}, {HOSPITAL.postalCode}. Γραμματεία {HOSPITAL.secretariatHours}.
          </p>
          <p className="mt-8 max-w-prose rounded-2xl bg-white/30 p-4">
            Η φόρμα επικοινωνίας δεν χρησιμοποιείται για αιτήματα χορήγησης δεδομένων υγείας. Ακολουθείται η διαδικασία του νοσοκομείου μέσω γραμματείας.
          </p>
        </div>
        <ul className="space-y-4 text-lg">
          <li>
            Γραμματεία διευθυντή:{" "}
            <a href={formatPhoneHref(HOSPITAL.phones.directorate)}>{HOSPITAL.phones.directorate}</a>
          </li>
          <li>
            Γραμματεία ΝΝΚ:{" "}
            <a href={formatPhoneHref(HOSPITAL.phones.secretariat)}>{HOSPITAL.phones.secretariat}</a>
          </li>
          <li>
            Ραντεβού:{" "}
            <a href={formatPhoneHref(HOSPITAL.phones.appointments[0])}>
              {HOSPITAL.phones.appointments.join(" · ")}
            </a>
          </li>
          <li>
            Επείγοντα:{" "}
            <a href={formatPhoneHref(HOSPITAL.phones.emergency[0])}>
              {HOSPITAL.phones.emergency.join(" · ")}
            </a>
          </li>
          <li>
            Υπερβαρική:{" "}
            <a href={formatPhoneHref(HOSPITAL.phones.hyperbaric)}>{HOSPITAL.phones.hyperbaric}</a>
          </li>
        </ul>
      </div>
    </PageShell>
  );
}
