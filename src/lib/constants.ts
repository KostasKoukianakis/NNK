export const HOSPITAL = {
  shortName: "ΝΝΚ",
  name: "Ναυτικό Νοσοκομείο Κρήτης",
  localName: "Ναυτικό Νοσοκομείο Χανίων",
  affiliation: "Πολεμικό Ναυτικό",
  addressLine: "Σούδα, Χανιά",
  postalCode: "73200",
  email: "nnkygch1@gmail.com",
  founded: "1969",
  beds: 53,
  bedsSurge: 116,
  /** Indicative annual volume published on the public site (history). */
  annualOutpatientVisits: 30000,
  annualAdmissions: 2500,
  operatingRooms: 2,
  phones: {
    directorate: "28210 82510",
    secretariat: "28210 82543",
    appointments: ["28210 82628", "28210 82720"],
    emergency: ["28210 82538", "28210 82414"],
    hyperbaric: "28210 82759",
    patientTransport: "28210 85536",
  },
  secretariatHours: "Δευτέρα–Παρασκευή, 08:00–14:00",
} as const;

export const SECTOR_LABELS: Record<string, string> = {
  surgical: "Χειρουργικός τομέας",
  pathology: "Παθολογικός τομέας",
  laboratory: "Εργαστηριακός τομέας",
  dental: "Οδοντιατρικός τομέας",
  emergency: "Επείγοντα",
  outpatient: "Εξωτερικά ιατρεία",
};

export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Σε εκκρεμότητα",
  confirmed: "Επιβεβαιωμένο",
  cancelled: "Ακυρωμένο",
  completed: "Ολοκληρωμένο",
};
