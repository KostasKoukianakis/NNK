"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SECTOR_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  bookingSchema,
  type BookingFormValues,
} from "@/lib/validations/booking";
import type { Department, Doctor } from "@/types/database";

const STEPS = [
  { id: 0, label: "Κλινική" },
  { id: 1, label: "Ιατρός" },
  { id: 2, label: "Ώρα" },
  { id: 3, label: "Επιβεβαίωση" },
] as const;

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AppointmentWizardProps {
  departments: Department[];
  doctors: Doctor[];
  onSubmit?: (values: BookingFormValues) => Promise<void> | void;
}

function buildSlots(daysAhead = 5) {
  const slots: string[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  for (let day = 1; day <= daysAhead; day += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + day);
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }

    for (const hour of [9, 10, 11, 12]) {
      for (const minute of [0, 20, 40]) {
        if (hour === 12 && minute > 0) {
          continue;
        }
        const slot = new Date(date);
        slot.setHours(hour, minute, 0, 0);
        slots.push(slot.toISOString());
      }
    }
  }

  return slots;
}

function formatSlot(iso: string) {
  return new Intl.DateTimeFormat("el-GR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function AppointmentWizard({
  departments,
  doctors,
  onSubmit,
}: AppointmentWizardProps) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const bookableDepartments = departments.filter((department) => department.is_bookable);

  useEffect(() => {
    setSlots(buildSlots());
  }, []);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      departmentId: "",
      doctorId: "",
      appointmentDate: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const departmentId = form.watch("departmentId");
  const doctorId = form.watch("doctorId");
  const appointmentDate = form.watch("appointmentDate");
  const selectedDepartment = bookableDepartments.find((item) => item.id === departmentId);
  const selectedDoctor = doctors.find((item) => item.id === doctorId);
  const doctorsInDepartment = doctors.filter((doctor) => doctor.department_id === departmentId);

  function goNext() {
    if (step === 0 && !departmentId) {
      form.setError("departmentId", { message: "Επιλέξτε κλινική." });
      return;
    }

    if (step === 1 && !doctorId) {
      form.setError("doctorId", { message: "Επιλέξτε ιατρό." });
      return;
    }

    if (step === 2 && !appointmentDate) {
      form.setError("appointmentDate", { message: "Επιλέξτε ώρα." });
      return;
    }

    setSubmitError(null);
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  function goBack() {
    setSubmitError(null);
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit(values: BookingFormValues) {
    setSubmitError(null);

    try {
      if (onSubmit) {
        await onSubmit(values);
        return;
      }

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Η κράτηση δεν ολοκληρώθηκε. Δοκιμάστε ξανά.");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Η κράτηση δεν ολοκληρώθηκε.";
      setSubmitError(message);
    }
  }

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -8 },
        transition: { duration: 0.22, ease: easeOutExpo },
      };

  return (
    <form
      className="glass w-full rounded-[2rem] p-6 sm:p-10 lg:p-12 backdrop-blur-[22px] backdrop-saturate-150"
      noValidate
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <ol className="mb-8 flex gap-2" aria-label="Βήματα κράτησης">
        {STEPS.map((item) => {
          const current = item.id === step;
          const done = item.id < step;
          return (
            <li key={item.id} className="flex-1">
              <p
                className={cn(
                  "border-b-2 pb-2 text-sm font-semibold",
                  current
                    ? "border-[var(--primary)] text-[var(--ink)]"
                    : done
                      ? "border-[var(--accent)] text-[var(--ink)]"
                      : "border-[var(--border)] text-[var(--muted)]",
                )}
                aria-current={current ? "step" : undefined}
              >
                {item.label}
              </p>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} {...motionProps}>
          {step === 0 ? (
            <fieldset>
              <legend className="font-[family-name:var(--font-display)] text-3xl">
                Ποια κλινική χρειάζεστε;
              </legend>
              <p className="mt-2 max-w-prose text-[var(--muted)]">
                Εξωτερικά ιατρεία κατόπιν ραντεβού. Για επείγοντα καλέστε το ΤΕΠ.
              </p>
              <Controller
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <div className="mt-6 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Κλινικές">
                    {bookableDepartments.map((department) => {
                      const selected = field.value === department.id;
                      return (
                        <label
                          key={department.id}
                          className={cn(
                            "flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 backdrop-blur-md",
                            selected
                              ? "border-white/80 bg-white/50"
                              : "border-white/40 bg-white/20",
                          )}
                        >
                          <span>
                            <span className="block font-semibold">{department.name}</span>
                            <span className="text-sm text-[var(--muted)]">
                              {SECTOR_LABELS[department.sector]} · {department.location_floor}
                            </span>
                          </span>
                          <input
                            type="radio"
                            className="mt-1 size-4 accent-[var(--primary)]"
                            name={field.name}
                            value={department.id}
                            checked={selected}
                            onChange={() => {
                              field.onChange(department.id);
                              form.setValue("doctorId", "");
                              form.clearErrors("departmentId");
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>
                )}
              />
              {form.formState.errors.departmentId ? (
                <p className="mt-3 text-sm text-[var(--emergency)]" role="alert">
                  {form.formState.errors.departmentId.message}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset>
              <legend className="font-[family-name:var(--font-display)] text-3xl">
                Επιλέξτε ιατρό
              </legend>
              <p className="mt-2 text-[var(--muted)]">{selectedDepartment?.name}</p>
              {doctorsInDepartment.length === 0 ? (
                <p className="mt-6 rounded-2xl bg-white/35 p-4">
                  Δεν υπάρχουν δημοσιευμένοι ιατροί για αυτή την κλινική. Καλέστε 28210 82628.
                </p>
              ) : (
                <Controller
                  control={form.control}
                  name="doctorId"
                  render={({ field }) => (
                    <div className="mt-6 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Ιατροί">
                      {doctorsInDepartment.map((doctor) => {
                        const selected = field.value === doctor.id;
                        return (
                          <label
                            key={doctor.id}
                            className={cn(
                            "flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 backdrop-blur-md",
                            selected
                              ? "border-white/80 bg-white/50"
                              : "border-white/40 bg-white/20",
                            )}
                          >
                            <span>
                              <span className="block font-semibold">{doctor.full_name}</span>
                              <span className="text-sm text-[var(--muted)]">
                                {doctor.rank_title ? `${doctor.rank_title} · ` : ""}
                                {doctor.specialty}
                              </span>
                            </span>
                            <input
                              type="radio"
                              className="mt-1 size-4 accent-[var(--primary)]"
                              name={field.name}
                              value={doctor.id}
                              checked={selected}
                              onChange={() => {
                                field.onChange(doctor.id);
                                form.clearErrors("doctorId");
                              }}
                            />
                          </label>
                        );
                      })}
                    </div>
                  )}
                />
              )}
              {form.formState.errors.doctorId ? (
                <p className="mt-3 text-sm text-[var(--emergency)]" role="alert">
                  {form.formState.errors.doctorId.message}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset>
              <legend className="font-[family-name:var(--font-display)] text-3xl">
                Διαθέσιμες ώρες
              </legend>
              <p className="mt-2 text-[var(--muted)]">
                {selectedDoctor?.full_name}. Τα ραντεβού εξωτερικών ιατρείων είναι Δευτέρα–Παρασκευή.
              </p>
              <Controller
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {slots.map((slot) => {
                      const selected = field.value === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          className={cn(
                            "min-h-11 rounded-xl border px-3 py-2 text-left text-sm backdrop-blur-md",
                            selected
                              ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                              : "border-white/40 bg-white/25 hover:bg-white/45",
                          )}
                          aria-pressed={selected}
                          onClick={() => {
                            field.onChange(slot);
                            form.clearErrors("appointmentDate");
                          }}
                        >
                          {formatSlot(slot)}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {form.formState.errors.appointmentDate ? (
                <p className="mt-3 text-sm text-[var(--emergency)]" role="alert">
                  {form.formState.errors.appointmentDate.message}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 3 ? (
            <fieldset>
              <legend className="font-[family-name:var(--font-display)] text-3xl">
                Επιβεβαίωση
              </legend>
              <dl className="mt-6 grid gap-3 rounded-2xl bg-white/35 p-4">
                <div>
                  <dt className="text-sm text-[var(--muted)]">Κλινική</dt>
                  <dd className="font-semibold">{selectedDepartment?.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--muted)]">Ιατρός</dt>
                  <dd className="font-semibold">{selectedDoctor?.full_name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--muted)]">Ημερομηνία</dt>
                  <dd className="font-semibold">
                    {appointmentDate ? formatSlot(appointmentDate) : "—"}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 grid gap-2">
                <Label htmlFor="notes">Σημείωμα προς τη γραμματεία (προαιρετικό)</Label>
                <textarea
                  id="notes"
                  rows={4}
                  className="w-full rounded-xl border border-white/55 bg-white/35 p-3 text-base backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                  {...form.register("notes")}
                />
              </div>
              {submitError ? (
                <p className="mt-3 text-sm text-[var(--emergency)]" role="alert">
                  {submitError}
                </p>
              ) : null}
            </fieldset>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={goBack}>
            Πίσω
          </Button>
        ) : null}
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={goNext}>
            Συνέχεια
          </Button>
        ) : (
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Αποστολή…" : "Υποβολή αιτήματος"}
          </Button>
        )}
      </div>
    </form>
  );
}
