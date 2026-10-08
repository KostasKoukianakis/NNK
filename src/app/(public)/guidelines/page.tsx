import type { Metadata } from "next";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Οδηγίες ασθενών",
};

const GUIDELINES = [
  {
    title: "Ωράριο επισκεπτηρίου",
    body: "Το επισκεπτήριο στη μικτή νοσηλευτική πτέρυγα γίνεται καθημερινά 17:00–19:00. Έως δύο επισκέπτες ανά ασθενή. Σε λοιμώδη περιστατικά ισχύουν οδηγίες της νοσηλευτικής υπηρεσίας.",
  },
  {
    title: "Δικαιολογητικά εξωτερικών ιατρείων",
    body: "Προσκομίστε ταυτότητα ή στρατιωτική ταυτότητα, ΑΜΚΑ, και όπου απαιτείται βεβαίωση δικαιούχου. Για παρακλινικές εξετάσεις χρειάζεται παραπεμπτικό.",
  },
  {
    title: "Δεδομένα υγείας",
    body: "Αιτήματα χορήγησης δεδομένων υγείας δεν υποβάλλονται από φόρμα επικοινωνίας. Απευθυνθείτε στη γραμματεία για την προβλεπόμενη διαδικασία.",
  },
];

export default function GuidelinesPage() {
  return (
    <PageShell>
      <h1 className="text-5xl">Οδηγίες ασθενών</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {GUIDELINES.map((item) => (
          <section key={item.title}>
            <h2 className="text-3xl">{item.title}</h2>
            <p className="mt-3 max-w-prose text-lg">{item.body}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
