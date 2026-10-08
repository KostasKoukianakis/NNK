import { z } from "zod";

export const bookingSchema = z.object({
  departmentId: z.string().uuid("Επιλέξτε κλινική."),
  doctorId: z.string().uuid("Επιλέξτε ιατρό."),
  appointmentDate: z
    .string()
    .min(1, "Επιλέξτε διαθέσιμη ώρα."),
  notes: z
    .string()
    .max(500, "Το σημείωμα δεν μπορεί να ξεπερνά τους 500 χαρακτήρες.")
    .optional()
    .or(z.literal("")),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const profileSchema = z.object({
  full_name: z.string().min(2, "Συμπληρώστε ονοματεπώνυμο."),
  amka: z
    .string()
    .regex(/^\d{11}$/, "Το ΑΜΚΑ είναι 11 ψηφία.")
    .optional()
    .or(z.literal("")),
  phone: z.string().min(10, "Συμπληρώστε έγκυρο τηλέφωνο.").optional().or(z.literal("")),
  dob: z.string().optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().email("Συμπληρώστε έγκυρο email."),
  password: z.string().min(8, "Τουλάχιστον 8 χαρακτήρες."),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, "Συμπληρώστε ονοματεπώνυμο."),
  amka: z.string().regex(/^\d{11}$/, "Το ΑΜΚΑ είναι 11 ψηφία."),
});
