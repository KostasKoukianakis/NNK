import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Εγγραφή",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-4xl">Εγγραφή ασθενούς</h1>
      <p className="mt-3 max-w-prose">
        Η εγγραφή θα ενεργοποιηθεί μαζί με το Supabase Auth. Μέχρι τότε, η γραμματεία εκδίδει πρόσβαση κατόπιν ταυτοποίησης δικαιούχου.
      </p>
      <Link className="mt-6 inline-block font-semibold underline-offset-4 hover:underline" href="/login">
        Επιστροφή στη σύνδεση
      </Link>
    </div>
  );
}
