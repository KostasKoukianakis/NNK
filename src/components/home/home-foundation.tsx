"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { CtaLink } from "@/components/ui/button";
import { FULL_BLEED } from "@/components/ui/glass";
import { Reveal } from "@/components/visual/reveal";
import {
  CIRCUIT_ECG_MAIN,
  CIRCUIT_ECG_SUB,
  CIRCUIT_ECG_VIEWBOX,
} from "@/lib/circuit-ecg-path";

const PATH_MAIN = CIRCUIT_ECG_MAIN;
const PATH_SUB = CIRCUIT_ECG_SUB;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/** Circuit silhouette + ECG curves; bright beep travels with scroll. */
function FoundationCircuit({
  sectionRef,
  reduceMotion,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean | null;
}) {
  const pulseMainRef = useRef<SVGPathElement>(null);
  const pulseSubRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    const pulseMain = pulseMainRef.current;
    const pulseSub = pulseSubRef.current;
    if (!section || !pulseMain || !pulseSub) return;

    let rafId = 0;

    const getProgress = () => {
      const rect = section.getBoundingClientRect();
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (isMobile) {
        const vh = window.innerHeight;
        const startY = vh * 1.05;
        const endY = vh * 0.12;
        return clamp((startY - rect.top) / (startY - endY), 0, 1);
      }

      const start = window.innerHeight;
      const end = -rect.height;
      return clamp((start - rect.top) / (start - end), 0, 1);
    };

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -80 || rect.top > vh + 80) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const progress = getProgress();
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const mainTravel = isMobile ? 1050 : 1000;
      const subTravel = isMobile ? 1020 : 980;

      pulseMain.style.strokeDashoffset = String(-1000 + progress * mainTravel);
      pulseSub.style.strokeDashoffset = String(-1040 + progress * subTravel);

      const fade = progress > 0.9 ? String(1 - (progress - 0.9) / 0.1) : "1";
      pulseMain.style.opacity = fade;
      pulseSub.style.opacity = fade;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [sectionRef, reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
    >
      <svg
        className="absolute left-1/2 top-0 block w-full max-w-none -translate-x-1/2 translate-y-[205px] overflow-visible"
        viewBox={CIRCUIT_ECG_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient
            id="nnkCircuitGradSub"
            x1="1926"
            y1="-47.5"
            x2="43.5"
            y2="937"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.12" stopColor="white" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.55" />
            <stop offset="0.88" stopColor="white" stopOpacity="0.45" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={PATH_SUB}
          stroke="url(#nnkCircuitGradSub)"
          strokeOpacity="0.35"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={pulseSubRef}
          d={PATH_SUB}
          stroke="white"
          fill="none"
          pathLength={1000}
          strokeDasharray="90 910"
          strokeDashoffset={1040}
          strokeOpacity={0.55}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDashoffset: -1040 }}
        />
      </svg>

      <svg
        className="absolute left-1/2 top-0 block w-full max-w-none -translate-x-1/2 translate-y-[220px] overflow-visible"
        viewBox={CIRCUIT_ECG_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient
            id="nnkCircuitGradMain"
            x1="1896"
            y1="-47"
            x2="13.5"
            y2="937.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.12" stopColor="white" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.75" />
            <stop offset="0.88" stopColor="white" stopOpacity="0.55" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={PATH_MAIN}
          stroke="url(#nnkCircuitGradMain)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={pulseMainRef}
          d={PATH_MAIN}
          stroke="white"
          fill="none"
          pathLength={1000}
          strokeDasharray="120 880"
          strokeDashoffset={1000}
          strokeOpacity={0.95}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDashoffset: -1000 }}
        />
      </svg>
    </div>
  );
}

export function HomeFoundation() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <Reveal id="apostoli" className="relative overflow-visible">
      <section ref={sectionRef} className="relative overflow-visible">
        <FoundationCircuit sectionRef={sectionRef} reduceMotion={reduceMotion} />

        <div className={`${FULL_BLEED} relative py-24 sm:py-32 lg:py-[13.25em]`}>
          <div className="flex flex-col items-start gap-8">
            <p className="inline-flex items-center gap-4 font-mono text-[0.75rem] uppercase tracking-[-0.02em] text-white">
              <span
                aria-hidden="true"
                className="foundation-cube mb-px size-[0.375em] shrink-0 rounded-[1px] bg-white"
              />
              Λίγα λόγια για το νοσοκομείο
            </p>

            <h2 className="max-w-[min(100%,18ch)] text-[clamp(2.75rem,5.5vw,6rem)] font-normal leading-none tracking-[-0.02em] text-white lg:max-w-[min(100%,52rem)]">
              Αποστολή
            </h2>
          </div>

          <div className="mt-16 w-full sm:mt-24 lg:mt-[10em] lg:ml-auto lg:mr-[15%] lg:w-[32%] lg:min-w-[28rem]">
            <p className="text-[clamp(1.65rem,2.6vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white">
              Η αποστολή του Ναυτικού Νοσοκομείου Κρήτης είναι:
            </p>

            <ul className="mt-6 space-y-4 text-[clamp(1.125rem,1.35vw,1.35rem)] font-medium leading-[1.35] text-white/90">
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-[1px] bg-white" />
                <span>
                  Να παρέχει υπηρεσίες υγείας στις προβλεπόμενες, από το εκάστοτε ισχύον ρυθμιστικό
                  πλαίσιο, κατηγορίες δικαιούχων.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-[1px] bg-white" />
                <span>Η εκπαίδευση του ιατρικού, νοσηλευτικού και λοιπού υγειονομικού προσωπικού.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-[1px] bg-white" />
                <span>
                  Η υλοποίηση των ανατιθέμενων έργων που προβλέπονται στην επιχειρησιακή σχεδίαση, σε
                  ειρήνη και σε κινητοποίηση.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-[1px] bg-white" />
                <span>
                  Η διεξαγωγή επιστημονικής έρευνας, με σκοπό τη σχεδίαση, οργάνωση, προπαρασκευή και
                  παροχή της απαραίτητης υγειονομικής υποστήριξης στις Διοικήσεις, Υπηρεσίες και
                  Μονάδες του ΠΝ στην Κρήτη, σε συνεργασία με τους λοιπούς Κλάδους των ΕΔ.
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/organization" size="lg" className="min-h-[3.25rem] text-lg">
                Οργανόγραμμα
              </CtaLink>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
