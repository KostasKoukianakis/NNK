import type { Metadata } from "next";
import Link from "next/link";
import { OrgTree } from "@/components/organization/org-tree";
import { StringsNet } from "@/components/visual/strings-net";
import { buildOrganogram } from "@/lib/content/organogram";

export const metadata: Metadata = {
  title: "Οργανόγραμμα",
};

const INFRASTRUCTURE = [
  "Μικτή νοσηλευτική πτέρυγα 54 κλινών, από τις οποίες 9 για λοιμώδη νοσήματα.",
  "Χειρουργείο με δύο αίθουσες.",
  "Ιατρείο επειγόντων περιστατικών, 24 ώρες.",
  "Υπερβαρική ιατρική σε 24ωρη βάση για τον νότιο ελλαδικό χώρο, και παραπομπές κατόπιν έγκρισης ΓΕΝ.",
  "Ακτινολογικό εργαστήριο: ένα σταθερό μηχάνημα, δύο φορητά και ένας υπερηχογράφος.",
  "Δύο ασθενοφόρα, κινητές μονάδες.",
] as const;

export default function OrganizationPage() {
  const tree = buildOrganogram();

  return (
    <div className="relative overflow-x-clip">
      <StringsNet />
      <div className="relative z-10 mx-auto w-full max-w-[92rem] overflow-x-clip px-5 pb-12 pt-36 sm:px-8 sm:pb-16 sm:pt-40 lg:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/55">Οργάνωση</p>
      <h1 className="mt-3 text-5xl">Οργανόγραμμα</h1>
      <p className="mt-4 max-w-2xl text-lg text-white/80">
        Διευθυντής, υποδιευθυντής και διευθύνσεις του νοσοκομείου. Ο βαθμός, το
        ονοματεπώνυμο και η φωτογραφία κάθε θέσης συμπληρώνονται στο οργανόγραμμα.
      </p>

      <div className="mt-10 overflow-x-clip rounded-2xl bg-[#f3f6fb] px-3 py-8 sm:px-6">
        <OrgTree root={tree} />
      </div>

      <section className="mt-16 border-t border-white/15 pt-10">
        <h2 className="text-3xl">Υποδομή</h2>
        <ul className="mt-6 grid gap-3 lg:grid-cols-2">
          {INFRASTRUCTURE.map((item) => (
            <li key={item} className="rounded-2xl bg-white/10 p-4 text-white/90">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link className="font-semibold underline-offset-4 hover:underline" href="/departments">
            Αναλυτικές κλινικές
          </Link>
        </p>
      </section>
      </div>
    </div>
  );
}
