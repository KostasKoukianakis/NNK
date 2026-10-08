"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  { value: "", label: "— Επιλέξτε —" },
  { value: "info", label: "Γενικές πληροφορίες" },
  { value: "appointments", label: "Ραντεβού εξωτερικών" },
  { value: "hyperbaric", label: "Υπερβαρική" },
  { value: "other", label: "Άλλο" },
] as const;

const fieldClass =
  "flex min-h-11 w-full rounded-[3px] border border-[var(--blue)]/25 bg-white px-3 py-2 text-base text-[var(--blue)] placeholder:text-[var(--blue)]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-50";

const labelClass =
  "font-mono text-[0.7rem] font-normal uppercase tracking-[0.06em] text-[var(--blue)]/70";

type ContactFormProps = {
  className?: string;
  idPrefix?: string;
};

export function ContactForm({ className, idPrefix = "cta" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // General enquiries only — no health data. Wire to backend when ready.
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p
        className={cn(
          "max-w-[28rem] text-[0.95em] font-medium leading-[1.35] text-[var(--blue)]",
          className,
        )}
        role="status"
      >
        Ευχαριστούμε. Θα επικοινωνήσουμε για γενικές πληροφορίες — όχι για δεδομένα υγείας.
      </p>
    );
  }

  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <form
      className={cn("cta-contact-form grid w-full max-w-[28rem] gap-3", className)}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label className={labelClass} htmlFor={id("firstName")}>
            Όνομα
          </label>
          <input
            id={id("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            placeholder="Όνομα"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-1.5">
          <label className={labelClass} htmlFor={id("lastName")}>
            Επίθετο
          </label>
          <input
            id={id("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            placeholder="Επίθετο"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label className={labelClass} htmlFor={id("email")}>
          Email
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email Address"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-1.5">
        <label className={labelClass} htmlFor={id("subject")}>
          Επιλέξτε το θέμα του μηνύματός σας
        </label>
        <select id={id("subject")} name="subject" required defaultValue="" className={fieldClass}>
          {SUBJECTS.map((s) => (
            <option key={s.value || "empty"} value={s.value} disabled={s.value === ""}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1.5">
        <label className={labelClass} htmlFor={id("message")}>
          Το μήνυμά σας
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={4}
          placeholder="Το μήνυμά σας — χωρίς διαγνώσεις ή δεδομένα υγείας"
          className={cn(fieldClass, "min-h-[6.5rem] resize-y py-2.5")}
        />
      </div>

      <label className="flex items-start gap-2.5 text-[0.78em] font-medium leading-[1.35] text-[var(--blue)]/85">
        <input
          type="checkbox"
          name="privacy"
          required
          className="mt-0.5 size-4 shrink-0 accent-[var(--blue)]"
        />
        <span>
          Έχω διαβάσει και συμφωνώ με την{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--blue)]">
            Πολιτική Απορρήτου
          </Link>{" "}
          και τα{" "}
          <Link href="/rights" className="underline underline-offset-2 hover:text-[var(--blue)]">
            Δικαιώματα ασθενών
          </Link>
          .
        </span>
      </label>

      <div className="pt-1">
        <Button type="submit" variant="default" arrow className="cta-btn-blue">
          Αποστολή
        </Button>
      </div>
    </form>
  );
}
