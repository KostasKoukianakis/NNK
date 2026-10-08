"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HOSPITAL } from "@/lib/constants";
import { FULL_BLEED } from "@/components/ui/glass";
import { cn } from "@/lib/utils";

/** Same staggered slots as Cantor8 `.grid_partners` (6 cols × 3 rows). */
const GRID_SLOTS = [
  { col: 1, row: 2 },
  { col: 2, row: 2 },
  { col: 3, row: 1 },
  { col: 4, row: 2 },
  { col: 5, row: 2 },
  { col: 6, row: 2 },
  { col: 3, row: 3 },
  { col: 5, row: 3 },
] as const;

function formatElNumber(n: number) {
  return new Intl.NumberFormat("el-GR").format(n);
}

const STATS = [
  {
    value: formatElNumber(HOSPITAL.annualOutpatientVisits),
    suffix: "+",
    label: "Ραντεβού εξωτερικών / έτος",
  },
  {
    value: formatElNumber(HOSPITAL.annualAdmissions),
    suffix: "+",
    label: "Εισαγωγές ασθενών / έτος",
  },
  {
    value: String(HOSPITAL.beds),
    label: "Κλίνες εν καιρώ ειρήνης",
  },
  {
    value: String(HOSPITAL.bedsSurge),
    label: "Κλίνες σε κινητοποίηση",
  },
  {
    value: String(HOSPITAL.operatingRooms),
    label: "Χειρουργικές αίθουσες",
  },
  {
    value: "24ωρο",
    label: "Ιατρείο επειγόντων",
  },
  {
    value: "Δίμηνο",
    label: "Κλιμάκια σε κέντρα υγείας Κρήτης",
  },
  {
    value: "ΣΞ·ΠΝ·ΠΑ",
    label: "Διακλαδική κάλυψη ΕΔ & ΣΑ",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

function GridCard({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const slot = GRID_SLOTS[index % GRID_SLOTS.length]!;

  if (reduce) {
    return (
      <li
        className={cn("partners-grid-item min-h-[10rem] sm:min-h-[12.5rem] lg:min-h-[14.5rem]", className)}
        style={
          {
            "--partner-col": slot.col,
            "--partner-row": slot.row,
          } as CSSProperties
        }
      >
        {children}
      </li>
    );
  }

  return (
    <motion.li
      className={cn("partners-grid-item min-h-[10rem] sm:min-h-[12.5rem] lg:min-h-[14.5rem]", className)}
      style={
        {
          "--partner-col": slot.col,
          "--partner-row": slot.row,
        } as CSSProperties
      }
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
    >
      {children}
    </motion.li>
  );
}

export function HomePartners() {
  const reduce = useReducedMotion();

  const headingMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10% 0px" },
        transition: { duration: 0.55, ease },
      };

  return (
    <section id="partners" className="relative overflow-hidden">
      <div className={`${FULL_BLEED} py-24 sm:py-28 lg:py-[11em] lg:pb-[10.35em]`}>
        <motion.div
          className="mx-auto flex max-w-[58rem] flex-col items-center gap-6 text-center"
          {...headingMotion}
        >
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-white/65">
            Το ΝΝΚ σε αριθμούς
          </p>
          <h2 className="text-[clamp(3rem,5vw,6.25rem)] font-normal leading-none tracking-normal text-white">
            <span className="block sm:whitespace-nowrap">Παραγόμενο έργο</span>
            <span className="block sm:whitespace-nowrap">νοσοκομείου</span>
          </h2>
          <p className="w-full max-w-[46rem] text-[clamp(1.2rem,1.55vw,1.5rem)] font-medium leading-[1.35] tracking-[-0.01em] text-white">
            Το Ναυτικό Νοσοκομείο Κρήτης αποτελεί πυλώνα του στρατιωτικού συστήματος υγείας στη Σούδα,
            παρέχοντας ιατρικές και νοσηλευτικές υπηρεσίες στο προσωπικό των Ενόπλων Δυνάμεων, στα
            Σώματα Ασφαλείας, στους απόστρατους και στις οικογένειές τους, καθώς και σε συμμάχους και
            συνεργαζόμενους φορείς της Κρήτης.
          </p>
        </motion.div>

        <ul className="partners-grid mt-14 list-none sm:mt-16 lg:mt-20">
          {STATS.map((stat, index) => (
            <GridCard key={stat.label} index={index}>
              <div className="flex size-full flex-col justify-between rounded-[4px] bg-white/[0.15] px-5 py-6 sm:px-6 sm:py-8">
                <p className="font-mono text-[0.65rem] uppercase leading-snug tracking-[0.06em] text-white/55">
                  {stat.label}
                </p>
                <p className="mt-6 text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-none tracking-[-0.03em] text-white">
                  {stat.value}
                  {"suffix" in stat && stat.suffix ? (
                    <span className="text-[0.42em] font-medium tracking-normal text-white/70">
                      {stat.suffix}
                    </span>
                  ) : null}
                </p>
              </div>
            </GridCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
