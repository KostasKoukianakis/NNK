import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Σύνδεση",
};

export default function LoginPage() {
  return (
    <div className="w-full">
      <h1 className="text-4xl">Σύνδεση στο portal</h1>
      <p className="mt-2 text-[var(--muted)]">
        Για δικαιούχους, ιατρούς και προσωπικό γραμματείας.
      </p>
      <Suspense fallback={<p className="mt-8">Φόρτωση φόρμας…</p>}>
        <LoginForm />
      </Suspense>
      <p className="mt-6 text-sm">
        Δεν έχετε λογαριασμό;{" "}
        <Link className="font-semibold underline-offset-2 hover:underline" href="/register">
          Εγγραφή ασθενούς
        </Link>
      </p>
    </div>
  );
}
