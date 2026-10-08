import type { Metadata } from "next";
import Link from "next/link";
import { OrgTree, type OrgNode } from "@/components/organization/org-tree";
import { MENU, type MenuNode } from "@/lib/content/site-map";

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

function fromMenu(node: MenuNode): OrgNode {
  const children = node.children.map(fromMenu);
  return {
    id: node.path.join("/"),
    title: node.title,
    href: node.url,
    children: children.length > 0 ? children : undefined,
  };
}

function buildTree(): OrgNode {
  const organosi = MENU.find((item) => item.slug === "organosi");
  return {
    id: "nnk",
    title: "Ναυτικό Νοσοκομείο Κρήτης",
    subtitle: "Σούδα, Χανιά",
    children: [
      {
        id: "dioikitis",
        title: "Διοικητής",
        subtitle: "Υπάγεται στον Αρχηγό ΓΕΝ",
        children: organosi?.children.map(fromMenu) ?? [],
      },
    ],
  };
}

export default function OrganizationPage() {
  const tree = buildTree();

  return (
    <div className="mx-auto w-full max-w-[92rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/55">Οργάνωση</p>
      <h1 className="mt-3 text-5xl">Οργανόγραμμα</h1>
      <p className="mt-4 max-w-2xl text-lg text-white/80">
        Η δομή του νοσοκομείου, από τον διοικητή προς τις διευθύνσεις. Η οργάνωση κάθε
        διεύθυνσης ανοίγει με κλικ στο εικονίδιο.
      </p>

      <div className="mt-10 overflow-x-auto pb-2">
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
  );
}
