import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { isSupabaseConfigured } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Η βάση δεν είναι συνδεδεμένη. Καλέστε 28210 82628." },
      { status: 503 },
    );
  }

  const json = await request.json();
  const parsed = bookingSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Μη έγκυρα στοιχεία κράτησης." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Απαιτείται σύνδεση." }, { status: 401 });
  }

  const { error } = await supabase.from("appointments").insert({
    patient_id: user.id,
    doctor_id: parsed.data.doctorId,
    department_id: parsed.data.departmentId,
    appointment_date: parsed.data.appointmentDate,
    notes: parsed.data.notes || null,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: "Το ραντεβού δεν καταχωρίστηκε." }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
