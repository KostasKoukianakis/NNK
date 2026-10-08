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
 * Φωτογραφίες, βαθμός και ονοματεπώνυμο.
 * Βάλε το αρχείο στο public/organogram/ και συμπλήρωσε τη διαδρομή εδώ.
 *
 * diefthyntis: {
 *   image: "/organogram/diefthyntis.jpg",
 *   imageAlt: "Ο διευθυντής του ΝΝΚ",
 *   subtitle: "Πλοίαρχος (ΥΙ)\nΟΝΟΜΑΤΕΠΩΝΥΜΟ ΠΝ",
 * },
 */
export const ORGANOGRAM_MEDIA: Record<
  string,
  { image?: string; imageAlt?: string; subtitle?: string }
> = {};

const LEADERSHIP: OrgNode = {
  id: "diefthyntis",
  title: "Διευθυντής ΝΝΚ",
  subtitle: "Υπάγεται στον Αρχηγό ΓΕΝ",
  portrait: true,
  children: [
    {
      id: "ypodiefthyntis",
      title: "Υποδιευθυντής",
      subtitle: "Συντονιστής διοικητικού",
      portrait: true,
      children: [
        {
          id: "ddy",
          title: "ΔΔΥ",
          subtitle: "Διεύθυνση Διοικητικής Υπηρεσίας",
          portrait: true,
        },
        {
          id: "dou",
          title: "ΔΟΥ",
          subtitle: "Διεύθυνση Οικονομικής Υπηρεσίας",
          portrait: true,
        },
        {
          id: "dfy",
          title: "ΔΦΥ",
          subtitle: "Διεύθυνση Φαρμακευτικής Υπηρεσίας",
          portrait: true,
        },
      ],
    },
    {
      id: "diy",
      title: "ΔΙΥ",
      subtitle: "Διεύθυνση Ιατρικής Υπηρεσίας",
      portrait: true,
    },
    {
      id: "dny",
      title: "ΔΝΥ",
      subtitle: "Διεύθυνση Νοσηλευτικής Υπηρεσίας",
      portrait: true,
    },
  ],
};

function withMedia(node: OrgNode): OrgNode {
  const media = ORGANOGRAM_MEDIA[node.id];
  return {
    ...node,
    image: media?.image ?? node.image,
    imageAlt: media?.imageAlt ?? node.imageAlt,
    subtitle: media?.subtitle ?? node.subtitle,
    portrait: true,
    children: node.children?.map(withMedia),
  };
}

export function buildOrganogram(): OrgNode {
  return withMedia(LEADERSHIP);
}
