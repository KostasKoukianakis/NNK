import type { Metadata } from "next";
import Link from "next/link";
import { OrgBoard } from "@/components/organization/org-board";
import { PixelTransition } from "@/components/visual/pixel-transition";
import { StringsNet } from "@/components/visual/strings-net";
import { buildOrganogram } from "@/lib/content/organogram";

export const metadata: Metadata = {
  title: "Οργανόγραμμα",
};

const INFRASTRUCTURE = [
  {
    title: "Νοσηλευτική πτέρυγα",
    body: "Μικτή νοσηλευτική πτέρυγα 54 κλινών, από τις οποίες 9 για λοιμώδη νοσήματα.",
    graph: "/images/card-graph-1.avif",
  },
  {
    title: "Χειρουργείο και επείγοντα",
    body: "Χειρουργείο με δύο αίθουσες. Ιατρείο επειγόντων περιστατικών, 24 ώρες.",
    graph: "/images/card-graph-2.avif",
  },
  {
    title: "Υπερβαρική ιατρική",
    body: "Υπερβαρική ιατρική σε 24ωρη βάση για τον νότιο ελλαδικό χώρο, και παραπομπές κατόπιν έγκρισης ΓΕΝ.",
    graph: "/images/card-graph-3.avif",
  },
  {
    title: "Εργαστήριο και διακομιδή",
    body: "Ακτινολογικό εργαστήριο: ένα σταθερό μηχάνημα, δύο φορητά και ένας υπερηχογράφος. Δύο ασθενοφόρα, κινητές μονάδες.",
    graph: "/images/card-graph-4.avif",
  },
] as const;

export default function OrganizationPage() {
  const tree = buildOrganogram();

  return (
    <>
      <section id="organogram-stage" className="relative overflow-x-clip bg-[var(--blue)]">
        <StringsNet />
        <div className="relative z-10 mx-auto w-full max-w-[92rem] overflow-x-clip px-5 pb-16 pt-36 sm:px-8 sm:pt-40 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/55">Οργάνωση</p>
          <h1 className="mt-3 text-5xl">Οργανόγραμμα</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Διευθυντής, υποδιευθυντής και διευθύνσεις του νοσοκομείου. Πάτησε μια κάρτα
            και το προφίλ αλλάζει δίπλα, στην ίδια σελίδα.
          </p>

          <div className="mt-10">
            <OrgBoard root={tree} />
          </div>
        </div>
      </section>

      <div className="transition-cubes">
        <PixelTransition
          from="#044AB3"
          to="#FFFFFF"
          accent="#6FE3FF"
          triggerId="organogram-stage"
          targetId="infrastructure"
          seed={480}
        />
      </div>

      <section id="infrastructure" className="infra-cards">
        <div className="infra-wrap">
          <h2 className="infra-heading">Υποδομή</h2>
          <ul className="infra-grid">
            {INFRASTRUCTURE.map((item, index) => (
              <li key={item.title} className="infra-card">
                <img className="infra-graph" src={item.graph} alt="" />
                <div className="infra-card-body">
                  <div className="infra-number">{index + 1}</div>
                  <h3 className="infra-title">{item.title}</h3>
                  <p className="infra-desc">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="infra-more">
            <Link href="/departments">Αναλυτικές κλινικές</Link>
          </p>
        </div>
      </section>
    </>
  );
}
