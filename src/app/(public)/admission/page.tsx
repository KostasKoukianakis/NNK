import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Εισαγωγή και εξιτήριο",
};

export default function AdmissionPage() {
  return (
    <PageShell wide>
      <h1 className="text-5xl">Εισαγωγή και εξιτήριο</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-3xl">Προγραμματισμένη εισαγωγή</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-lg">
            <li>Ραντεβού εξωτερικού ιατρείου ή παραπομπή της κλινικής.</li>
            <li>Ταυτότητα ή στρατιωτική ταυτότητα και ΑΜΚΑ.</li>
            <li>Παραπεμπτικό όπου το ζητά η εξέταση ή η επέμβαση.</li>
            <li>Καταχώριση στη γραμματεία πριν την εισαγωγή στη μικτή πτέρυγα.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-3xl">Επείγουσα εισαγωγή</h2>
          <p className="mt-4 max-w-prose text-lg">
            Το ΤΕΠ δέχεται χωρίς ραντεβού. Καλέστε πριν την άφιξη όταν είναι ασφαλές. Τα δύο ασθενοφόρα του νοσοκομείου είναι κινητές μονάδες. Για διακομιδή χρησιμοποιήστε τον αριθμό της σελίδας τηλεφώνων.
          </p>
          <Link className="mt-4 inline-block font-semibold underline-offset-4 hover:underline" href="/emergency">
            Επείγοντα
          </Link>
        </section>
      </div>
      <section className="mt-12">
        <h2 className="text-3xl">Εξιτήριο και επισκεπτήριο</h2>
        <p className="mt-4 max-w-prose text-lg">
          Το εξιτήριο το ορίζει η κλινική. Τα έγγραφα παραλαμβάνονται από τη γραμματεία. Επισκεπτήριο στη μικτή πτέρυγα καθημερινά 17:00–19:00, έως δύο επισκέπτες. Σε λοιμώδη ισχύουν οι οδηγίες της νοσηλευτικής υπηρεσίας.
        </p>
      </section>
    </PageShell>
  );
}
