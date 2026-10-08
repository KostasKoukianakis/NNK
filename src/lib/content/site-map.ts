export type SiteNode = {
  slug: string;
  title: string;
  href?: string;
  body?: string[];
  children?: SiteNode[];
};

export type MenuNode = {
  slug: string;
  title: string;
  url: string;
  body: string[];
  path: string[];
  children: MenuNode[];
};

const localClinic =
  "Το ιατρείο λειτουργεί στο Ναυτικό Νοσοκομείο Κρήτης κατόπιν ραντεβού. Δηλωθείτε στη γραμματεία με ταυτότητα και ΑΜΚΑ.";

const confirmClinic =
  "Η ενότητα υπάρχει στο δημόσιο οργανόγραμμα ναυτικού νοσοκομείου. Στη Σούδα, η γραμματεία επιβεβαιώνει αν το ιατρείο δέχεται πριν κλείσετε ραντεβού.";

const athensUnit =
  "Η ενότητα ανήκει στο δημόσιο μενού του Ναυτικού Νοσοκομείου Αθηνών και δεν λειτουργεί ως υπηρεσία του Ναυτικού Νοσοκομείου Κρήτης στη Σούδα.";

const MIYA = "/p/organosi/iatrikh/cheirourgikos/miya";
const NEPHRO = "/p/organosi/iatrikh/pathologikos/nefrologiki";
const REHAB = "/p/organosi/iatrikh/pathologikos/fysiki-iatriki";

export const SITE_MENU: SiteNode[] = [
  {
    slug: "nosokomeio",
    title: "Νοσοκομείο",
    body: [
      "Στοιχεία διοίκησης και ιστορικού του Ναυτικού Νοσοκομείου Κρήτης.",
    ],
    children: [
      {
        slug: "istoriko",
        title: "Ιστορικό",
        href: "/history",
      },
      {
        slug: "dioikitis",
        title: "Διοικητής",
        body: [
          "Το νοσοκομείο είναι Ανεξάρτητη Ναυτική Υπηρεσία και υπάγεται στον Αρχηγό ΓΕΝ.",
          "Ονομαστικά βιογραφικά δεν αναρτώνται. Για υπηρεσιακά θέματα καλέστε τη διεύθυνση στο 28210 82510.",
        ],
      },
      {
        slug: "geniki-grammateia",
        title: "Γενική γραμματεία",
        body: [
          "Η γραμματεία εξυπηρετεί Δευτέρα έως Παρασκευή, 08:00 με 14:00. Σαββατοκύριακα και αργίες μένει κλειστή.",
          "Τηλέφωνο 28210 82543. Από εδώ κλείνονται ραντεβού, δηλώσεις προσέλευσης και αιτήματα φακέλου. Δεν στέλνονται δεδομένα υγείας με email.",
        ],
      },
      {
        slug: "diatelesantes",
        title: "Διατελέσαντες διοικητές",
        body: [
          "Η σελίδα αντιστοιχεί στον κατάλογο διατελεσάντων διοικητών που δημοσιεύει το Ναυτικό Νοσοκομείο Αθηνών.",
          "Για το Ναυτικό Νοσοκομείο Κρήτης δεν αναρτάται ονομαστικός κατάλογος. Ιστορικά ορόσημα της μονάδας είναι στη σελίδα ιστορικού.",
        ],
      },
    ],
  },
  {
    slug: "organosi",
    title: "Οργάνωση",
    href: "/organization",
    children: [
      {
        slug: "iatrikh",
        title: "Ιατρική υπηρεσία",
        body: [
          "Οι κλινικές έχουν την ευθύνη διάγνωσης και θεραπείας. Τα εξωτερικά ιατρεία δέχονται κατόπιν ραντεβού.",
        ],
        children: [
          {
            slug: "cheirourgikos",
            title: "Χειρουργικός τομέας",
            body: ["Κλινικές χειρουργικού ενδιαφέροντος και αναισθησιολογικό τμήμα."],
            children: [
              { slug: "angeiocheirourgiki", title: "Αγγειοχειρουργική", body: [confirmClinic] },
              { slug: "anaisthisiologiko", title: "Αναισθησιολογικό", href: "/departments/anaisthisiologiko" },
              { slug: "gynaikologiki", title: "Γυναικολογική", body: [confirmClinic] },
              { slug: "miya", title: "Μονάδα ιατρικώς υποβοηθούμενης αναπαραγωγής", body: [athensUnit] },
              { slug: "nevrocheirourgiki", title: "Νευροχειρουργική", body: [confirmClinic] },
              { slug: "orthopaidiki", title: "Ορθοπαιδική", href: "/departments/orthopediki" },
              { slug: "ourologiki", title: "Ουρολογική", href: "/departments/ourologiki" },
              { slug: "ofthalmologiki", title: "Οφθαλμολογική", href: "/departments/ofthalmologiki" },
              { slug: "plastiki", title: "Πλαστική χειρουργική", href: "/departments/plastiki" },
              { slug: "stomatiki", title: "Στοματική και γναθοπροσωπική χειρουργική", body: [confirmClinic] },
              { slug: "cheirourgiki", title: "Χειρουργική", href: "/departments/cheirourgiki" },
              { slug: "thorakos", title: "Χειρουργική θώρακος και καρδιάς", body: [confirmClinic] },
              { slug: "orl", title: "ΩΡΛ", href: "/departments/orl" },
            ],
          },
          {
            slug: "pathologikos",
            title: "Παθολογικός τομέας",
            body: ["Παθολογικές κλινικές, υπερβαρική ιατρική και συναφή ιατρεία."],
            children: [
              { slug: "a-kardiologiki", title: "Α΄ καρδιολογική", href: "/departments/kardiologiki" },
              { slug: "b-kardiologiki", title: "Β΄ καρδιολογική", body: [confirmClinic, "Στη Σούδα λειτουργεί καρδιολογικό ιατρείο. Δεύτερη καρδιολογική κλινική δεν τεκμηριώνεται ως χωριστή μονάδα."] },
              { slug: "a-pathologiki", title: "Α΄ παθολογική", href: "/departments/pathologiki" },
              { slug: "b-pathologiki", title: "Β΄ παθολογική", body: [confirmClinic, "Στη Σούδα λειτουργεί παθολογική κλινική. Δεύτερη παθολογική κλινική δεν τεκμηριώνεται ως χωριστή μονάδα."] },
              { slug: "aimatologiki", title: "Αιματολογική", body: [confirmClinic] },
              { slug: "allergiologiki", title: "Αλλεργιολογική", body: [confirmClinic] },
              { slug: "gastrenterologiki", title: "Γαστρεντερολογική", href: "/departments/gastrenterologiko" },
              { slug: "dermatologiki", title: "Δερματολογική", href: "/departments/dermatologiki" },
              { slug: "endokrinologiki", title: "Ενδοκρινολογική", body: [confirmClinic] },
              { slug: "ypervariki", title: "Υπερβαρική ιατρική", href: "/departments/ypervariki" },
              { slug: "nevrologiki", title: "Νευρολογική", body: [confirmClinic] },
              { slug: "nefrologiki", title: "Νεφρολογική", body: [confirmClinic, "Μονάδα τεχνητού νεφρού δημοσιεύεται στο μενού του Ναυτικού Νοσοκομείου Αθηνών. Στη Σούδα η παραπομπή γίνεται μέσω της γραμματείας."] },
              { slug: "ogkologiki", title: "Ογκολογική", body: [confirmClinic] },
              { slug: "paidiatriki", title: "Παιδιατρικό τμήμα", body: [confirmClinic] },
              { slug: "pneumonologiki", title: "Πνευμονολογική", href: "/departments/pneumonologiko" },
              { slug: "revmatologiki", title: "Ρευματολογική", body: [confirmClinic] },
              { slug: "fysiki-iatriki", title: "Φυσική ιατρική και αποκατάσταση", body: [confirmClinic] },
              { slug: "psychiatriki", title: "Ψυχιατρική", href: "/departments/psychiatriki" },
            ],
          },
          {
            slug: "ergastiriakos",
            title: "Εργαστηριακός τομέας",
            body: ["Εργαστήρια για νοσηλευόμενους και εξωτερικούς ασθενείς, με παραπεμπτικό."],
            children: [
              {
                slug: "aktinodiagnostiko",
                title: "Ακτινοδιαγνωστικό εργαστήριο",
                href: "/departments/aktinologiko",
                children: [
                  { slug: "epemvatiki", title: "Επεμβατική ακτινολογία", body: [confirmClinic] },
                ],
              },
              { slug: "viopathologiko", title: "Βιοπαθολογικό εργαστήριο", href: "/departments/viopathologiko" },
              { slug: "iatriki-fysiki", title: "Εργαστήριο ιατρικής φυσικής", body: [confirmClinic] },
              { slug: "pyriniki", title: "Εργαστήριο πυρηνικής ιατρικής", body: [athensUnit, "Θεραπεία με ραδιενεργό ιώδιο αναφέρεται στο Ναυτικό Νοσοκομείο Αθηνών, όχι στη Σούδα."] },
              { slug: "kyttarologiko", title: "Κυτταρολογικό εργαστήριο", body: [confirmClinic] },
              { slug: "pathologoanatomiko", title: "Παθολογοανατομικό εργαστήριο", body: [confirmClinic] },
              { slug: "aimodosia", title: "Τμήμα αιμοδοσίας", body: [confirmClinic, "Αιμοδοσία εκτός νοσοκομείου διοργανώνεται όταν το ανακοινώνει η υπηρεσία. Δεν κλείνεται από τη φόρμα επικοινωνίας."] },
              { slug: "ktiniatriki", title: "Κτηνιατρική, υγιεινή ύδατος και τροφίμων", body: [confirmClinic] },
            ],
          },
          {
            slug: "ekpaidefsi",
            title: "Τομέας εκπαίδευσης",
            body: [
              "Η εκπαίδευση υγειονομικού προσωπικού είναι μέρος της αποστολής του νοσοκομείου.",
              "Περιλαμβάνει στελέχη του Πολεμικού Ναυτικού και, όπου ορίζεται, σπουδαστές επιστημών υγείας.",
            ],
          },
        ],
      },
      {
        slug: "nosileftiki",
        title: "Νοσηλευτική υπηρεσία",
        body: [
          "Η μικτή νοσηλευτική πτέρυγα έχει 54 κλίνες, από τις οποίες 9 για λοιμώδη νοσήματα.",
          "Το επισκεπτήριο είναι καθημερινά 17:00 με 19:00, έως δύο επισκέπτες. Η παραμονή συνοδού ορίζεται από τη νοσηλευτική υπηρεσία.",
        ],
      },
      {
        slug: "dioikitiki",
        title: "Διοικητική υπηρεσία",
        body: ["Η διοικητική υπηρεσία υποστηρίζει τη λειτουργία του νοσοκομείου και την εξυπηρέτηση δικαιούχων."],
        children: [
          { slug: "dioikisi", title: "Διοίκηση, οργάνωση και εκπαίδευση", body: ["Γραφείο διοικητικής οργάνωσης και εκπαίδευσης προσωπικού. Τηλέφωνο διεύθυνσης 28210 82510."] },
          { slug: "merimna", title: "Μέριμνα υποστήριξης", body: ["Υποστήριξη σίτισης, ιματισμού και καθημερινής λειτουργίας των πτερύγων."] },
          { slug: "techniki", title: "Τεχνική υποστήριξη", body: ["Συντήρηση κτιρίου, εγκαταστάσεων και ιατροτεχνολογικού εξοπλισμού."] },
          { slug: "pliroforiki", title: "Τμήμα πληροφορικής", body: ["Υποστήριξη των πληροφοριακών συστημάτων του νοσοκομείου και του portal ραντεβού. Αιτήματα ασθενών για φάκελο δεν υποβάλλονται εδώ."] },
        ],
      },
      {
        slug: "oikonomiki",
        title: "Οικονομική υπηρεσία",
        body: [
          "Η οικονομική υπηρεσία χειρίζεται τη δαπάνη νοσηλείας σύμφωνα με τον ασφαλιστικό φορέα του δικαιούχου.",
          "Θέματα χρέωσης επιβεβαιώνονται στη γραμματεία, τηλέφωνο 28210 82543.",
        ],
      },
      {
        slug: "pteryges",
        title: "Πτέρυγες και τμήματα",
        body: ["Αυτοτελή γραφεία και μονάδες που δεν ανήκουν σε έναν μόνο τομέα."],
        children: [
          { slug: "loimoxeis", title: "Γραφείο ελέγχου λοιμώξεων", body: ["Παρακολούθηση λοιμώξεων και κανόνες επισκεπτηρίου στη μικτή πτέρυγα, συμπεριλαμβανομένων των 9 κλινών λοιμωδών."] },
          { slug: "exoterika", title: "Εξωτερικά ιατρεία", href: "/outpatient" },
          { slug: "epeigonta", title: "Επειγόντων περιστατικών", href: "/emergency" },
          { slug: "diatrofi", title: "Κλινική διατροφή και διαιτολογία", body: [confirmClinic] },
          { slug: "koinoniki", title: "Κοινωνική υπηρεσία", body: ["Η κοινωνική υπηρεσία υποστηρίζει νοσηλευόμενους σε πρακτικά θέματα παραμονής και εξιτηρίου. Δεν υποδέχεται αιτήματα δεδομένων υγείας από φόρμα."] },
          { slug: "miya", title: "ΜΙΥΑ", href: MIYA },
          { slug: "meth", title: "Μονάδα εντατικής θεραπείας", body: ["Το τμήμα καταδυτικής και υπερβαρικής ιατρικής δεν αναλαμβάνει περιστατικά που χρειάζονται εντατική και μηχανικό αερισμό. Για ΜΕΘ η διακομιδή συντονίζεται με το ΕΚΑΒ."] },
          { slug: "technitos-nefros", title: "Μονάδα τεχνητού νεφρού", href: NEPHRO },
          { slug: "iatriki-ergasias", title: "Τμήμα ιατρικής εργασίας", body: ["Περιοδική υγειονομική εξέταση στελεχών, όταν ορίζεται από την υπηρεσία. Το ραντεβού κλείνεται από τη γραμματεία."] },
          { slug: "fysikotherapeftirio", title: "Φυσικοθεραπευτήριο", href: REHAB },
          { slug: "psychologia", title: "Ψυχολογία και ψυχική υγεία", body: ["Ψυχολογική υποστήριξη νοσηλευομένων γίνεται σε συνεννόηση με την ψυχιατρική κλινική. Δεν λειτουργεί ανοιχτό ιατρείο χωρίς ραντεβού."] },
        ],
      },
      {
        slug: "politiko-prosopiko",
        title: "Διεύθυνση πολιτικού προσωπικού",
        body: [
          "Αφορά το πολιτικό προσωπικό του νοσοκομείου, όχι τα ραντεβού ασθενών.",
          "Οι δικαιούχοι πολιτικοί υπάλληλοι του ΥΠΕΘΑ εξυπηρετούνται ως λήπτες υγείας από τη γραμματεία.",
        ],
      },
    ],
  },
  {
    slug: "parartima-nnp",
    title: "Παράρτημα ΝΝΠ",
    body: [athensUnit, "Το παράρτημα του Ναυτικού Νοσοκομείου Πειραιά υπάγεται στο Ναυτικό Νοσοκομείο Αθηνών."],
    children: [
      { slug: "exoterika-nnp", title: "Εξωτερικά ιατρεία ΝΝΠ", body: [athensUnit] },
      { slug: "noitiki-endynamosi", title: "Τμήμα νοητικής ενδυνάμωσης", body: [athensUnit] },
      { slug: "pye", title: "ΠΥΕ", body: ["Η περιοδική υγειονομική εξέταση στελεχών στη Σούδα κλείνεται από τη γραμματεία. Το παράρτημα ΠΥΕ του ΝΝΠ είναι υπηρεσία του Ναυτικού Νοσοκομείου Αθηνών."] },
      { slug: "kefp", title: "ΚΕΦΠ", body: [athensUnit, "Το Κέντρο Ειδικής Φροντίδας Παιδιών δεν λειτουργεί στη Σούδα."] },
    ],
  },
  {
    slug: "odontiatriko-kentro",
    title: "Οδοντιατρικό κέντρο",
    body: [
      localClinic,
      "Στη Σούδα λειτουργεί τμήμα γενικής οδοντιατρικής. Τα εξειδικευμένα τμήματα του Οδοντιατρικού Κέντρου του Πολεμικού Ναυτικού στην Αθήνα επιβεβαιώνονται χωριστά.",
    ],
    children: [
      { slug: "geniki", title: "Γενική οδοντιατρική", href: "/departments/odontiatriko" },
      { slug: "orthodontiko", title: "Ορθοδοντικό τμήμα", body: [confirmClinic] },
      { slug: "endodontologiko", title: "Ενδοδοντολογικό τμήμα", body: [confirmClinic] },
      { slug: "periodontologiko", title: "Περιοδοντολογικό τμήμα", body: [confirmClinic] },
    ],
  },
  {
    slug: "farmakeio",
    title: "Στρατιωτικό φαρμακείο",
    body: [
      "Η χορήγηση φαρμάκων σε νοσηλευόμενους γίνεται από το νοσοκομείο.",
      "Για εξωτερική εκτέλεση συνταγής, η γραμματεία ενημερώνει για το υποκατάστημα στρατιωτικού φαρμακείου και το ωράριο.",
    ],
  },
  {
    slug: "asthenis",
    title: "Για τον ασθενή",
    body: ["Πρακτικές πληροφορίες πριν την επίσκεψη, τη νοσηλεία και το εξιτήριο."],
    children: [
      { slug: "eisagogi", title: "Διαδικασία εισαγωγής και εξιτηρίου", href: "/admission" },
      { slug: "exoterika-iatreia", title: "Εξωτερικά ιατρεία", href: "/outpatient" },
      {
        slug: "lista-cheirourgeiou",
        title: "Λίστα χειρουργείου",
        body: [
          "Το νοσοκομείο έχει δύο χειρουργικές αίθουσες. Το πρόγραμμα ορίζεται από την κλινική που χειρουργεί.",
          "Ονομαστική λίστα χειρουργείων δεν αναρτάται δημόσια. Ο ασθενής ενημερώνεται από τη γραμματεία της κλινικής.",
        ],
      },
      { slug: "dikaiomata", title: "Γραφείο προστασίας δικαιωμάτων", href: "/rights" },
      { slug: "dikaiouchoi", title: "Δικαιούχοι", href: "/eligibility" },
      {
        slug: "kentriki-grammateia",
        title: "Κεντρική γραμματεία",
        body: [
          "Δευτέρα έως Παρασκευή, 08:00 με 14:00. Τηλέφωνο 28210 82543.",
          "Ραντεβού και στα 28210 82628 και 28210 82720. Φέρτε ταυτότητα και ΑΜΚΑ.",
        ],
      },
      { slug: "prosvasi", title: "Πρόσβαση στο νοσοκομείο", href: "/access" },
      { slug: "tilefonikos-katalogos", title: "Τηλεφωνικός κατάλογος", href: "/phones" },
      {
        slug: "chartis",
        title: "Χάρτης νοσοκομείου",
        body: [
          "Το κτίριο είναι τριών ορόφων στη Σούδα. Τα επείγοντα και η οδοντιατρική είναι στο ισόγειο, όπου αυτό αναγράφεται στην κλινική.",
          "Δεν δημοσιεύεται εσωτερικός χάρτης ορόφων. Στην είσοδο, η γραμματεία κατευθύνει τον ασθενή.",
        ],
      },
      {
        slug: "chrisimes-plirofories",
        title: "Χρήσιμες πληροφορίες",
        body: [
          "Εξωτερικά ιατρεία μόνο με ραντεβού. Επείγοντα όλο το εικοσιτετράωρο, χωρίς ραντεβού.",
          "Επισκεπτήριο 17:00 με 19:00. Υπερβαρική 28210 82759. Διακομιδή 28210 85536.",
        ],
      },
      {
        slug: "erotimatologia",
        title: "Ερωτηματολόγια ικανοποίησης",
        body: ["Τα ερωτηματολόγια συμπληρώνονται στο νοσοκομείο. Δεν υποβάλλονται από τη φόρμα επικοινωνίας και δεν ζητούν δεδομένα υγείας online."],
        children: [
          { slug: "esoterikon", title: "Εσωτερικών ασθενών", body: ["Δίνεται στη νοσηλευτική πτέρυγα κατά το εξιτήριο."] },
          { slug: "exoterikon", title: "Εξωτερικών ασθενών", body: ["Δίνεται στη γραμματεία των εξωτερικών ιατρείων μετά την εξέταση."] },
          { slug: "aimodoton", title: "Αιμοδοτών", body: ["Δίνεται στο σημείο αιμοληψίας, όταν οργανώνεται αιμοδοσία."] },
        ],
      },
      {
        slug: "efcharistia",
        title: "Ευχαριστήρια επιστολή",
        body: [
          "Ευχαριστίες κατατίθενται στη γραμματεία, τηλέφωνο 28210 82543, ή στο email nnkygch1@gmail.com.",
          "Μην περιλαμβάνετε διαγνώσεις, εξετάσεις ή αριθμό μητρώου στο μήνυμα.",
        ],
      },
      {
        slug: "parapona",
        title: "Επιστολή παραπόνων και υποδείξεων",
        body: [
          "Παράπονα και υποδείξεις κατατίθενται στη γραμματεία. Δεν υπάρχει ηλεκτρονική φόρμα για ιατρικά παράπονα.",
          "Αίτημα αντιγράφου φακέλου γίνεται μόνο μέσω της γραμματείας, όχι από αυτή τη σελίδα.",
        ],
      },
    ],
  },
  { slug: "anakoinoseis", title: "Ανακοινώσεις", href: "/announcements" },
  { slug: "faq", title: "Συχνές ερωτήσεις", href: "/faq" },
  { slug: "epikoinonia", title: "Επικοινωνία", href: "/contact" },
];

function decorate(nodes: SiteNode[], parentPath: string[] = []): MenuNode[] {
  return nodes.map((node) => {
    const path = [...parentPath, node.slug];
    const children = node.children ? decorate(node.children, path) : [];
    return {
      slug: node.slug,
      title: node.title,
      url: node.href ?? `/p/${path.join("/")}`,
      body: node.body ?? [],
      path,
      children,
    };
  });
}

export const MENU: MenuNode[] = decorate(SITE_MENU);

export function flattenMenu(nodes: MenuNode[] = MENU): MenuNode[] {
  return nodes.flatMap((node) => [node, ...flattenMenu(node.children)]);
}

export function findPage(slug: string[]): MenuNode | undefined {
  return flattenMenu().find((node) => node.path.join("/") === slug.join("/"));
}
