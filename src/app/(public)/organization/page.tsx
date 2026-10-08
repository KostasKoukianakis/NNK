import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Οργάνωση",
};

const SECTORS = [
  {
    title: "Χειρουργικός τομέας",
    items: [
      "Αναισθησιολογικό τμήμα και ανάνηψη",
      "Χειρουργείο και αποστείρωση",
      "Κλινική γενικής χειρουργικής",
      "Ορθοπεδική κλινική",
      "ΩΡΛ κλινική",
      "Οφθαλμολογική κλινική",
      "Κλινική πλαστικής χειρουργικής",
      "Ουρολογική κλινική",
    ],
  },
  {
    title: "Παθολογικός τομέας",
    items: [
      "Παθολογική κλινική",
      "Καρδιολογική κλινική",
      "Ψυχιατρική κλινική",
      "Δερματολογική κλινική",
      "Πνευμονολογικό ιατρείο",
      "Γαστρεντερολογικό ιατρείο",
      "Τμήμα καταδυτικής και υπερβαρικής ιατρικής",
    ],
  },
  {
    title: "Εργαστηριακός τομέας",
    items: ["Ακτινολογικό τμήμα και υπέρηχοι", "Βιοπαθολογικό τμήμα"],
  },
  {
    title: "Οδοντιατρικός τομέας",
    items: ["Τμήμα γενικής οδοντιατρικής"],
  },
];

export default function OrganizationPage() {
  return (
    <PageShell wide>
      <h1 className="text-5xl">Οργάνωση</h1>
      <p className="mt-4 max-w-prose text-lg">
        Οι κλινικές έχουν την ευθύνη διάγνωσης και θεραπείας των νοσηλευομένων. Τα τμήματα εξυπηρετούν νοσηλευόμενους και εξωτερικούς ασθενείς. Οργανώνονται σε τέσσερις τομείς.
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {SECTORS.map((sector) => (
          <section key={sector.title}>
            <h2 className="text-2xl">{sector.title}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {sector.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <h2 className="mt-12 text-3xl">Υποδομή</h2>
      <ul className="mt-4 grid gap-3 lg:grid-cols-2">
        <li className="rounded-2xl bg-white/30 p-4">Μικτή νοσηλευτική πτέρυγα 54 κλινών, από τις οποίες 9 για λοιμώδη νοσήματα.</li>
        <li className="rounded-2xl bg-white/30 p-4">Χειρουργείο με δύο αίθουσες.</li>
        <li className="rounded-2xl bg-white/30 p-4">Ιατρείο επειγόντων περιστατικών, 24 ώρες.</li>
        <li className="rounded-2xl bg-white/30 p-4">Υπερβαρική ιατρική σε 24ωρη βάση για τον νότιο ελλαδικό χώρο, και παραπομπές κατόπιν έγκρισης ΓΕΝ.</li>
        <li className="rounded-2xl bg-white/30 p-4">Ακτινολογικό εργαστήριο: ένα σταθερό μηχάνημα, δύο φορητά και ένας υπερηχογράφος.</li>
        <li className="rounded-2xl bg-white/30 p-4">Δύο ασθενοφόρα, κινητές μονάδες.</li>
      </ul>
      <p className="mt-8">
        <Link className="font-semibold underline-offset-4 hover:underline" href="/departments">
          Αναλυτικές κλινικές
        </Link>
      </p>
    </PageShell>
  );
}
