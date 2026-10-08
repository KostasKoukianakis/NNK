"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const WORKFLOWS = [
  {
    title: "Εξωτερικά ιατρεία",
    body: "Προγραμματισμένη περίθαλψη σε τέσσερις τομείς, με μικτή πτέρυγα και δύο χειρουργικές αίθουσες. Ραντεβού μόνο κατόπιν προγραμματισμού, με σαφή ροή από την παραπομπή έως την εξέταση.",
    align: "is-first" as const,
  },
  {
    title: "Επείγοντα 24ωρο",
    body: "Ιατρείο επειγόντων χωρίς ραντεβού, με συνεχή ετοιμότητα για συμβάντα στη Σούδα και τον ΒΟΑΚ. Τηλέφωνα 28210 82538 και 28210 82414 για άμεση επικοινωνία.",
    align: "is-second" as const,
  },
  {
    title: "Υπερβαρική",
    body: "Καταδυτική και υπερβαρική κάλυψη του νότιου ελλαδικού χώρου και του νοτιοανατολικού Αιγαίου. Επιχειρησιακή ετοιμότητα με σαφή όρια αρμοδιότητας και πρωτοκόλλων.",
    align: "is-third" as const,
  },
  {
    title: "Νοσηλεία & Portal",
    body: "Προγραμματισμένη εισαγωγή, νοσηλεία και εξιτήριο μέσω γραμματείας, με portal για ιστορικό και αποτελέσματα. Ελεγχόμενη πρόσβαση για δικαιούχους μετά τη σύνδεση.",
    align: "is-fourth" as const,
  },
] as const;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/** Soft ECG run — same curves as foundation (top) section */
function ecgRun(x0: number, x1: number, y: number, amp: number, period = 220) {
  const dir = x1 >= x0 ? 1 : -1;
  const span = Math.abs(x1 - x0);
  let d = "";
  let traveled = 0;
  let x = x0;

  while (traveled < span - 12) {
    const remain = span - traveled;
    const p = Math.min(period, remain);
    if (p < 40) break;
    const s = dir;

    d += ` L${x + s * p * 0.18} ${y}`;
    d += ` C${x + s * p * 0.22} ${y} ${x + s * p * 0.24} ${y - amp * 0.22} ${x + s * p * 0.28} ${y - amp * 0.22}`;
    d += ` C${x + s * p * 0.32} ${y - amp * 0.22} ${x + s * p * 0.34} ${y} ${x + s * p * 0.38} ${y}`;
    d += ` L${x + s * p * 0.44} ${y}`;
    d += ` C${x + s * p * 0.46} ${y} ${x + s * p * 0.47} ${y + amp * 0.14} ${x + s * p * 0.49} ${y + amp * 0.12}`;
    d += ` C${x + s * p * 0.51} ${y + amp * 0.08} ${x + s * p * 0.52} ${y - amp * 0.85} ${x + s * p * 0.55} ${y - amp}`;
    d += ` C${x + s * p * 0.58} ${y - amp * 0.85} ${x + s * p * 0.59} ${y + amp * 0.22} ${x + s * p * 0.62} ${y + amp * 0.28}`;
    d += ` C${x + s * p * 0.64} ${y + amp * 0.18} ${x + s * p * 0.66} ${y} ${x + s * p * 0.68} ${y}`;
    d += ` L${x + s * p * 0.74} ${y}`;
    d += ` C${x + s * p * 0.78} ${y} ${x + s * p * 0.8} ${y - amp * 0.32} ${x + s * p * 0.85} ${y - amp * 0.34}`;
    d += ` C${x + s * p * 0.9} ${y - amp * 0.32} ${x + s * p * 0.92} ${y} ${x + s * p * 0.96} ${y}`;
    d += ` L${x + s * p} ${y}`;

    x += s * p;
    traveled += p;
  }

  d += ` L${x1} ${y}`;
  return d;
}

/**
 * Cutting-edge top flow — Cantor right→left stepped route + foundation ECG style.
 * Geometry mirrors original c8-flow--top corridors.
 */
function buildTopEcg(offset = 0, amp = 34) {
  const yA = 943.5 + offset;
  const yB = 513 + offset * 0.3;
  const yC = 258 + offset * 0.15;
  const yD = 376 + offset * 0.1;
  const yE = 31 + offset * 0.05;

  const x0 = 2010 + offset * 0.4;
  const x1 = 1366;
  const x2 = 1346;
  const x3 = 1065;
  const x4 = 1045;
  const x5 = 427;
  const x6 = 407;
  const x7 = 266;
  const x8 = 246;
  const x9 = -92 - offset * 0.3;

  let d = `M${x0} ${yA}`;
  d += ecgRun(x0, x1, yA, amp, 230);
  d += ` C${x1 - 11} ${yA} ${x2} ${yA - 9} ${x2} ${yA - 20}`;
  d += ` L${x2} ${yB + 11}`;
  d += ` C${x2} ${yB} ${x2 - 9} ${yB - 9} ${x2 - 20} ${yB - 9}`;
  d += ecgRun(x2 - 20, x3, yB - 9, amp * 0.75, 210);
  d += ` C${x3 - 11} ${yB - 9} ${x4} ${yB - 18} ${x4} ${yB - 29}`;
  d += ` L${x4} ${yC + 11}`;
  d += ` C${x4} ${yC} ${x4 - 9} ${yC - 9} ${x4 - 20} ${yC - 9}`;
  d += ecgRun(x4 - 20, x5, yC - 9, amp * 0.65, 220);
  d += ` C${x5 - 11} ${yC - 9} ${x6} ${yC} ${x6} ${yC + 11}`;
  d += ` L${x6} ${yD - 11}`;
  d += ` C${x6} ${yD} ${x6 - 9} ${yD + 9} ${x6 - 20} ${yD + 9}`;
  d += ecgRun(x6 - 20, x7, yD + 9, amp * 0.4, 180);
  d += ` C${x7 - 11} ${yD + 9} ${x8} ${yD} ${x8} ${yD - 11}`;
  d += ` L${x8} ${yE + 11}`;
  d += ` C${x8} ${yE} ${x8 - 9} ${yE - 9} ${x8 - 20} ${yE - 9}`;
  d += ecgRun(x8 - 20, x9, yE - 9, amp * 0.35, 200);
  return d;
}

/**
 * Cutting-edge bottom flow — Cantor right→left stepping down + foundation ECG.
 */
function buildBottomEcg(offset = 0, amp = 34) {
  const yA = 20 + offset;
  const yB = 450.5 + offset * 0.3;
  const yC = 705.5 + offset * 0.15;
  const yD = 587.5 + offset * 0.1;
  const yE = 932.5 + offset * 0.05;

  const x0 = 2010 + offset * 0.4;
  const x1 = 1366;
  const x2 = 1346;
  const x3 = 1065;
  const x4 = 1045;
  const x5 = 427;
  const x6 = 407;
  const x7 = 266;
  const x8 = 246;
  const x9 = -92 - offset * 0.3;

  let d = `M${x0} ${yA}`;
  d += ecgRun(x0, x1, yA, amp, 230);
  d += ` C${x1 - 11} ${yA} ${x2} ${yA + 9} ${x2} ${yA + 20}`;
  d += ` L${x2} ${yB - 11}`;
  d += ` C${x2} ${yB} ${x2 - 9} ${yB + 9} ${x2 - 20} ${yB + 9}`;
  d += ecgRun(x2 - 20, x3, yB + 9, amp * 0.75, 210);
  d += ` C${x3 - 11} ${yB + 9} ${x4} ${yB + 18} ${x4} ${yB + 29}`;
  d += ` L${x4} ${yC - 11}`;
  d += ` C${x4} ${yC} ${x4 - 9} ${yC + 9} ${x4 - 20} ${yC + 9}`;
  d += ecgRun(x4 - 20, x5, yC + 9, amp * 0.65, 220);
  d += ` C${x5 - 11} ${yC + 9} ${x6} ${yC} ${x6} ${yC - 11}`;
  d += ` L${x6} ${yD + 11}`;
  d += ` C${x6} ${yD} ${x6 - 9} ${yD - 9} ${x6 - 20} ${yD - 9}`;
  d += ecgRun(x6 - 20, x7, yD - 9, amp * 0.4, 180);
  d += ` C${x7 - 11} ${yD - 9} ${x8} ${yD} ${x8} ${yD + 11}`;
  d += ` L${x8} ${yE - 11}`;
  d += ` C${x8} ${yE} ${x8 - 9} ${yE + 9} ${x8 - 20} ${yE + 9}`;
  d += ecgRun(x8 - 20, x9, yE + 9, amp * 0.35, 200);
  return d;
}

const TOP_MAIN = buildTopEcg(0, 34);
const TOP_SUB = buildTopEcg(24, 26);
const BOTTOM_MAIN = buildBottomEcg(0, 34);
const BOTTOM_SUB = buildBottomEcg(24, 26);

function setPulseRef(
  pulseRefs: React.MutableRefObject<SVGPathElement[]>,
  el: SVGPathElement | null,
) {
  if (!el) return;
  if (!pulseRefs.current.includes(el)) pulseRefs.current.push(el);
}

function FlowTop({ pulseRefs }: { pulseRefs: React.MutableRefObject<SVGPathElement[]> }) {
  const setPulse = (el: SVGPathElement | null) => setPulseRef(pulseRefs, el);

  return (
    <div className="flow2-wrap" aria-hidden="true">
      <svg
        className="c8-flow c8-flow--top"
        width="100%"
        viewBox="-100 -40 2200 1040"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g clipPath="url(#nnkClipTop)">
          <path
            className="c8-flow-line c8-flow-line--sub"
            d={TOP_SUB}
            stroke="url(#nnkGradTopSub)"
            strokeOpacity="0.35"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="c8-flow-line c8-flow-line--main"
            d={TOP_MAIN}
            stroke="url(#nnkGradTopMain)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={setPulse}
            className="c8-flow-pulse c8-flow-pulse--sub"
            d={TOP_SUB}
            stroke="white"
            fill="none"
            pathLength={1000}
            strokeDasharray="90 910"
            strokeDashoffset={1040}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />
          <path
            ref={setPulse}
            className="c8-flow-pulse c8-flow-pulse--main"
            d={TOP_MAIN}
            stroke="white"
            fill="none"
            pathLength={1000}
            strokeDasharray="120 880"
            strokeDashoffset={1000}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />
        </g>
        <defs>
          <linearGradient id="nnkGradTopMain" x1="74.5" y1="-17" x2="1957" y2="967.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.15" />
            <stop offset="0.45" stopColor="white" stopOpacity="0.7" />
            <stop offset="1" stopColor="white" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="nnkGradTopSub" x1="101.5" y1="-34" x2="1984" y2="950.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.12" />
            <stop offset="0.45" stopColor="white" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" stopOpacity="0.22" />
          </linearGradient>
            <clipPath id="nnkClipTop">
              <rect x="-120" y="-40" width="2200" height="1040" fill="white" />
            </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FlowBottom({ pulseRefs }: { pulseRefs: React.MutableRefObject<SVGPathElement[]> }) {
  const setPulse = (el: SVGPathElement | null) => setPulseRef(pulseRefs, el);

  return (
    <div className="flow2-wrap flow2-wrap--bottom" aria-hidden="true">
      <svg
        className="c8-flow c8-flow--bottom"
        width="100%"
        viewBox="-100 -40 2200 1040"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g clipPath="url(#nnkClipBottom)">
          <path
            className="c8-flow-line c8-flow-line--sub"
            d={BOTTOM_SUB}
            stroke="url(#nnkGradBottomSub)"
            strokeOpacity="0.35"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="c8-flow-line c8-flow-line--main"
            d={BOTTOM_MAIN}
            stroke="url(#nnkGradBottomMain)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={setPulse}
            className="c8-flow-pulse c8-flow-pulse--sub"
            d={BOTTOM_SUB}
            stroke="white"
            fill="none"
            pathLength={1000}
            strokeDasharray="90 910"
            strokeDashoffset={1040}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />
          <path
            ref={setPulse}
            className="c8-flow-pulse c8-flow-pulse--main"
            d={BOTTOM_MAIN}
            stroke="white"
            fill="none"
            pathLength={1000}
            strokeDasharray="120 880"
            strokeDashoffset={1000}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />
        </g>
        <defs>
          <linearGradient id="nnkGradBottomMain" x1="74.5" y1="980.5" x2="1957" y2="-4" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.15" />
            <stop offset="0.45" stopColor="white" stopOpacity="0.7" />
            <stop offset="1" stopColor="white" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="nnkGradBottomSub" x1="47.5" y1="997.5" x2="1930" y2="13" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.12" />
            <stop offset="0.45" stopColor="white" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" stopOpacity="0.22" />
          </linearGradient>
            <clipPath id="nnkClipBottom">
              <rect x="-120" y="-40" width="2200" height="1100" fill="white" />
            </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function HomeCuttingEdge() {
  const sectionRef = useRef<HTMLElement>(null);
  const pulseRefs = useRef<SVGPathElement[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;

    const tick = () => {
      const pulses = pulseRefs.current.filter(Boolean);
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -80 || rect.top > vh + 80 || !pulses.length) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const start = vh;
      const end = -rect.height;
      const progress = clamp((start - rect.top) / (start - end), 0, 1);
      const fade = progress > 0.9 ? String(1 - (progress - 0.9) / 0.1) : "1";

      for (const pulse of pulses) {
        const isSub = pulse.classList.contains("c8-flow-pulse--sub");
        const travel = isSub ? 980 : 1000;
        const base = isSub ? -1040 : -1000;
        pulse.style.strokeDashoffset = String(base + progress * travel);
        pulse.style.opacity = fade;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduceMotion]);

  return (
    <section
      id="cutting-edge"
      ref={sectionRef}
      className="cutting-edge relative overflow-hidden bg-[var(--blue)] text-white"
    >
      <div className="cutting-edge-wrap relative px-7 pt-[13.25em] pb-[52em] lg:pb-[58em]">
        <div className="heading-cutting relative z-[2]">
          <h2 className="cutting-edge-h2 font-normal text-white">
            Στην αιχμή
            <br />
            της επιχειρησιακής φροντίδας
          </h2>
        </div>

        <FlowTop pulseRefs={pulseRefs} />

        <div className="content-ed relative z-[2] mt-[13.2em]">
          {WORKFLOWS.map((item) => (
            <div key={item.title} className={`box-align ${item.align}`}>
              <div className="content-box flex gap-x-[1em]">
                <span aria-hidden="true" className="cube-tag mt-px shrink-0" />
                <div className="flex-content flex w-[34rem] max-w-full flex-col gap-[0.625em]">
                  <h3 className="txt-title font-normal text-white">{item.title}</h3>
                  <p className="p-gen-smaller font-medium text-white">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <FlowBottom pulseRefs={pulseRefs} />
      </div>
    </section>
  );
}
