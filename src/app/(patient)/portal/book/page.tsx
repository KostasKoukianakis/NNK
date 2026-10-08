import type { Metadata } from "next";
import { AppointmentWizard } from "@/components/booking/AppointmentWizard";
import { listDepartments, listPublishedDoctors } from "@/lib/queries/catalog";

export const metadata: Metadata = {
  title: "Κλείσιμο ραντεβού",
};

export default async function BookAppointmentPage() {
  const [departments, doctors] = await Promise.all([
    listDepartments(),
    listPublishedDoctors(),
  ]);

  return (
    <div>
      <h1 className="sr-only">Κλείσιμο ραντεβού εξωτερικών ιατρείων</h1>
      <AppointmentWizard departments={departments} doctors={doctors} />
    </div>
  );
}
