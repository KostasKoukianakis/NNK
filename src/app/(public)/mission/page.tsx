import type { Metadata } from "next";
import Link from "next/link";
import { CtaLink } from "@/components/ui/button";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Αποστολή",
};

const MISSION_POINTS = [
  "Να παρέχει υπηρεσίες υγείας στις προβλεπόμενες, από το εκάστοτε ισχύον ρυθμιστικό πλαίσιο, κατηγορίες δικαιούχων.",
  "Η εκπαίδευση του ιατρικού, νοσηλευτικού και λοιπού υγειονομικού προσωπικού.",
  "Η υλοποίηση των ανατιθέμενων έργων που προβλέπονται στην επιχειρησιακή σχεδίαση, σε ειρήνη και σε κινητοποίηση.",
  "Η διεξαγωγή επιστημονικής έρευνας, με σκοπό τη σχεδίαση, οργάνωση, προπαρασκευή και παροχή της απαραίτητης υγειονομικής υποστήριξης στις Διοικήσεις, Υπηρεσίες και Μονάδες του ΠΝ στην Κρήτη, σε συνεργασία με τους λοιπούς Κλάδους των ΕΔ, ώστε να εξασφαλιστεί η απρόσκοπτη διεξαγωγή των επιχειρήσεων.",
] as const;

const PILLARS = [
  {
    title: "Συνεχής εκπαίδευση",
    body: "Διαρκής εκπαίδευση, καινοτομία και χρήση σύγχρονων μεθόδων και τεχνολογίας.",
  },
  {
    title: "Άριστη ποιότητα υπηρεσιών",
    body: "Υπηρεσίες με έμφαση στην ποιότητα και στην ασφάλεια των ασθενών.",
  },
  {
    title: "Σεβασμός στον άνθρωπο",
    body: "Απόλυτη προτεραιότητα στην υγεία και την αξιοπρέπεια κάθε ασθενούς.",
  },
] as const;

export default function MissionPage() {
  return (
    <PageShell wide>
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/55">
        Λίγα λόγια για το νοσοκομείο
      </p>
      <h1 className="mt-3 text-5xl">Αποστολή</h1>
      <p className="mt-6 max-w-3xl text-xl text-white/85">
        Η αποστολή του Ναυτικού Νοσοκομείου Κρήτης είναι:
      </p>

      <ul className="mt-8 max-w-3xl space-y-4 text-lg text-white/90">
        {MISSION_POINTS.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-[1px] bg-white" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-white/75">
        Το ΝΝΚ είναι ανεξάρτητη ναυτική υπηρεσία με πλήρη διοίκηση στον Α/ΓΕΝ. Είναι το μόνο
        νοσοκομείο των ΕΔ με διακλαδική στελέχωση και καλύπτει τους σχηματισμούς ΣΞ, ΠΝ και ΠΑ στην
        Κρήτη. Εν καιρώ ειρήνης συνδράμει στο σχέδιο «Ξενοκράτης».
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {PILLARS.map((item) => (
          <article key={item.title} className="border-t border-white/20 pt-5">
            <h2 className="text-xl font-medium">{item.title}</h2>
            <p className="mt-3 text-white/70">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-10 border-t border-white/15 pt-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl">Καταδυτική και υπερβαρική ιατρική</h2>
          <p className="mt-4 max-w-prose text-lg text-white/85">
            Η μονάδα καλύπτει καταδυτικά ατυχήματα όλο τον χρόνο για το προσωπικό ΕΔ και ΣΑ, καθώς και
            για Έλληνες και αλλοδαπούς πολίτες, από την Κρήτη και το νοτιοανατολικό Αιγαίο. Δεν
            αναλαμβάνει περιστατικά που χρειάζονται εντατική νοσηλεία και μηχανική υποστήριξη
            αναπνοής.
          </p>
          <p className="mt-4 max-w-prose text-white/75">
            Κάνει υπερβαρική οξυγονοθεραπεία σε προσωπικό των ΕΔ και προστατευόμενα μέλη, και σε
            ασθενείς κατόπιν παραπομπής από νοσοκομεία της Κρήτης. Διενεργεί εξετάσεις καταδυτικής
            ικανότητας. Συμμετέχει σε ασκήσεις και στο ΚΕΝΑΠ (NMIOTC).
          </p>
          <Link
            className="mt-6 inline-block font-semibold underline-offset-4 hover:underline"
            href="/departments/ypervariki"
          >
            Τμήμα υπερβαρικής
          </Link>
        </div>
        <div>
          <h2 className="text-3xl">Οργανόγραμμα</h2>
          <p className="mt-4 max-w-prose text-lg text-white/85">
            Η δομή του νοσοκομείου περιλαμβάνει ιατρική, νοσηλευτική, διοικητική και οικονομική
            υπηρεσία, με τις κλινικές και τα εξωτερικά ιατρεία στη Σούδα.
          </p>
          <div className="mt-6">
            <CtaLink href="/organization">Οργάνωση ΝΝΚ</CtaLink>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
