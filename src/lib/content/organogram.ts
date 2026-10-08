import { MENU, type MenuNode } from "@/lib/content/site-map";

export type OrgNode = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  /** Δείξε κάδρο φωτογραφίας ακόμη κι αν δεν έχει οριστεί αρχείο. */
  portrait?: boolean;
  children?: OrgNode[];
};

/**
 * Φωτογραφίες και στοιχεία προσώπων.
 * Βάλε το αρχείο στο public/organogram/ και συμπλήρωσε τη διαδρομή εδώ.
 * Το id είναι το μονοπάτι του κόμβου (π.χ. "organosi/iatrikh") ή "nnk" / "dioikitis".
 *
 * dioikitis: {
 *   image: "/organogram/dioikitis.jpg",
 *   imageAlt: "Ο διοικητής του ΝΝΚ",
 *   subtitle: "Πλοίαρχος (ΥΙ)\nΟΝΟΜΑΤΕΠΩΝΥΜΟ ΠΝ",
 * },
 */
export const ORGANOGRAM_MEDIA: Record<
  string,
  { image?: string; imageAlt?: string; subtitle?: string }
> = {
  nnk: { subtitle: "Σούδα, Χανιά" },
  dioikitis: { subtitle: "Υπάγεται στον Αρχηγό ΓΕΝ" },
};

function fromMenu(node: MenuNode, depth: number): OrgNode {
  const id = node.path.join("/");
  const media = ORGANOGRAM_MEDIA[id];
  const children = node.children.map((child) => fromMenu(child, depth + 1));
  const image = media?.image;

  return {
    id,
    title: node.title,
    subtitle: media?.subtitle,
    image,
    imageAlt: media?.imageAlt,
    href: node.url,
    portrait: Boolean(image) || depth <= 2,
    children: children.length > 0 ? children : undefined,
  };
}

export function buildOrganogram(): OrgNode {
  const organosi = MENU.find((item) => item.slug === "organosi");
  const media = ORGANOGRAM_MEDIA.dioikitis;

  return {
    id: "nnk",
    title: "Ναυτικό Νοσοκομείο Κρήτης",
    subtitle: ORGANOGRAM_MEDIA.nnk?.subtitle,
    image: ORGANOGRAM_MEDIA.nnk?.image,
    imageAlt: ORGANOGRAM_MEDIA.nnk?.imageAlt,
    portrait: true,
    children: [
      {
        id: "dioikitis",
        title: "Διοικητής",
        subtitle: media?.subtitle,
        image: media?.image,
        imageAlt: media?.imageAlt,
        portrait: true,
        children: organosi?.children.map((child) => fromMenu(child, 2)) ?? [],
      },
    ],
  };
}
