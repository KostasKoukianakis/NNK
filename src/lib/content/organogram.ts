export type OrgNode = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  /** Βαθμός, π.χ. «Πλοίαρχος (ΥΙ)». */
  rank?: string;
  /** Ονοματεπώνυμο, χωρίς να επινοείται όταν δεν έχει δημοσιευτεί. */
  name?: string;
  /** Κείμενο προφίλ που ανοίγει από την κάρτα. */
  bio?: string;
  /** Δείξε κάδρο φωτογραφίας ακόμη κι αν δεν έχει οριστεί αρχείο. */
  portrait?: boolean;
  children?: OrgNode[];
};

export type OrgMedia = {
  image?: string;
  imageAlt?: string;
  subtitle?: string;
  rank?: string;
  name?: string;
  bio?: string;
};

/**
 * Φωτογραφία, βαθμός, όνομα και κείμενο προφίλ.
 * Βάλε το αρχείο στο public/organogram/ και συμπλήρωσε τη διαδρομή εδώ.
 *
 * diefthyntis: {
 *   image: "/organogram/diefthyntis.jpg",
 *   imageAlt: "Ο διευθυντής του ΝΝΚ",
 *   rank: "Πλοίαρχος (ΥΙ)",
 *   name: "ΟΝΟΜΑΤΕΠΩΝΥΜΟ ΠΝ",
 * },
 */
export const ORGANOGRAM_MEDIA: Record<string, OrgMedia> = {};

const LEADERSHIP: OrgNode = {
  id: "diefthyntis",
  title: "Διευθυντής ΝΝΚ",
  subtitle: "Υπάγεται στον Αρχηγό ΓΕΝ",
  bio: "Προΐσταται του Ναυτικού Νοσοκομείου Κρήτης και υπάγεται στον Αρχηγό ΓΕΝ. Έχει τη γενική διεύθυνση της λειτουργίας, της ετοιμότητας και του συντονισμού των υπηρεσιών του νοσοκομείου.",
  portrait: true,
  children: [
    {
      id: "ypodiefthyntis",
      title: "Υποδιευθυντής",
      subtitle: "Συντονιστής διοικητικού",
      bio: "Συντονίζει το διοικητικό έργο του νοσοκομείου. Σε αυτόν υπάγονται η Διοικητική, η Οικονομική και η Φαρμακευτική Υπηρεσία.",
      portrait: true,
      children: [
        {
          id: "ddy",
          title: "ΔΔΥ",
          subtitle: "Διεύθυνση Διοικητικής Υπηρεσίας",
          bio: "Καλύπτει τη διοικητική υποστήριξη του νοσοκομείου: το προσωπικό, το πρωτόκολλο και την καθημερινή διοικητική λειτουργία.",
          portrait: true,
        },
        {
          id: "dou",
          title: "ΔΟΥ",
          subtitle: "Διεύθυνση Οικονομικής Υπηρεσίας",
          bio: "Διαχειρίζεται τον προϋπολογισμό, τις δαπάνες και την οικονομική παρακολούθηση του νοσοκομείου.",
          portrait: true,
        },
        {
          id: "dfy",
          title: "ΔΦΥ",
          subtitle: "Διεύθυνση Φαρμακευτικής Υπηρεσίας",
          bio: "Εξασφαλίζει τον εφοδιασμό, τη διακίνηση και τη διάθεση φαρμάκων και υγειονομικού υλικού.",
          portrait: true,
        },
      ],
    },
    {
      id: "diy",
      title: "ΔΙΥ",
      subtitle: "Διεύθυνση Ιατρικής Υπηρεσίας",
      bio: "Διευθύνει την ιατρική υπηρεσία: τις κλινικές, τα εξωτερικά ιατρεία και την ιατρική ετοιμότητα του νοσοκομείου.",
      portrait: true,
    },
    {
      id: "dny",
      title: "ΔΝΥ",
      subtitle: "Διεύθυνση Νοσηλευτικής Υπηρεσίας",
      bio: "Διευθύνει τη νοσηλευτική υπηρεσία και την οργάνωση της νοσηλευτικής φροντίδας στις πτέρυγες και στα ιατρεία.",
      portrait: true,
    },
  ],
};

function withMedia(node: OrgNode): OrgNode {
  const media = ORGANOGRAM_MEDIA[node.id];
  const rank = media?.rank ?? node.rank;
  const name = media?.name ?? node.name;
  const subtitle =
    media?.subtitle ??
    node.subtitle ??
    ([rank, name].filter(Boolean).join("\n") || undefined);

  return {
    ...node,
    image: media?.image ?? node.image,
    imageAlt: media?.imageAlt ?? node.imageAlt,
    rank,
    name,
    subtitle,
    bio: media?.bio ?? node.bio,
    portrait: true,
    children: node.children?.map(withMedia),
  };
}

export function buildOrganogram(): OrgNode {
  return withMedia(LEADERSHIP);
}

export function listOrgIds(node: OrgNode = LEADERSHIP): string[] {
  return [node.id, ...(node.children ?? []).flatMap((child) => listOrgIds(child))];
}

export function findOrgNode(id: string, node: OrgNode = buildOrganogram()): OrgNode | null {
  if (node.id === id) return node;
  for (const child of node.children ?? []) {
    const found = findOrgNode(id, child);
    if (found) return found;
  }
  return null;
}

export function orgPath(id: string, node: OrgNode = buildOrganogram()): string[] {
  if (node.id === id) return [node.id];
  for (const child of node.children ?? []) {
    const below = orgPath(id, child);
    if (below.length > 0) return [node.id, ...below];
  }
  return [];
}
