"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupabaseConfigured } from "@/lib/utils";
import { loginSchema } from "@/lib/validations/booking";
import { createClient } from "@/utils/supabase/client";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setFormError(null);

    if (!isSupabaseConfigured()) {
      setFormError("Η σύνδεση με το Supabase δεν έχει ρυθμιστεί ακόμα.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      setFormError("Τα στοιχεία σύνδεσης δεν επαληθεύτηκαν.");
      return;
    }

    router.push(searchParams.get("next") ?? "/portal");
    router.refresh();
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Κωδικός</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...form.register("password")}
        />
      </div>
      {formError ? (
        <p className="text-sm text-[var(--emergency)]" role="alert">
          {formError}
        </p>
      ) : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Σύνδεση…" : "Σύνδεση"}
      </Button>
    </form>
  );
}
