"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { CtaLink } from "@/components/ui/button";
import { FULL_BLEED } from "@/components/ui/glass";
import { cn } from "@/lib/utils";

type StructureItem = {
  label: string;
  title: string;
  body: string;
  href: string;
  visual:
    | "outpatient"
    | "surgery"
    | "map"
    | "eligibility"
    | "pharmacy"
    | "education"
    | "complaints"
    | "survey"
    | "rights"
    | "dental"
    | "hyperbaric"
    | "emergency";
};

/**
 * NNA homepage “βασικές δομές” mapped to what NNK actually offers in Souda.
 * Skips Athens-only units (ΝΝΠ, ΚΕΦΠ).
 */
const STRUCTURES: StructureItem[] = [
  {
    label: "Εξωτερικά",
    title: "Πρόγραμμα εξωτερικών ιατρείων",
    body: "Ραντεβού μόνο κατόπιν προγραμματισμού. Τέσσερις τομείς και μικτή πτέρυγα στη Σούδα.",
    href: "/outpatient",
    visual: "outpatient",
  },
  {
    label: "Χειρουργείο",
    title: "Λίστα χειρουργείου",
    body: "Δύο χειρουργικές αίθουσες. Το πρόγραμμα ορίζεται από την κλινική· ο ασθενής ενημερώνεται από τη γραμματεία.",
    href: "/p/asthenis/lista-cheirourgeiou",
    visual: "surgery",
  },
  {
    label: "Πρόσβαση",
    title: "Χάρτης νοσοκομείου",
    body: "Κτίριο τριών ορόφων στη Σούδα. Στην είσοδο η γραμματεία κατευθύνει· δεν δημοσιεύεται εσωτερικός χάρτης ορόφων.",
    href: "/access",
    visual: "map",
  },
  {
    label: "Δικαιούχοι",
    title: "Δικαιούχοι νοσηλείας",
    body: "Ενεργό και απόστρατο προσωπικό ΕΔ και Σωμάτων Ασφαλείας, οικογένειες, σύμμαχοι Σούδας και ειδικές κατηγορίες.",
    href: "/eligibility",
    visual: "eligibility",
  },
  {
    label: "Φαρμακείο",
    title: "Στρατιωτικό φαρμακείο",
    body: "Χορήγηση σε νοσηλευόμενους από το νοσοκομείο. Για εξωτερική συνταγή, η γραμματεία ενημερώνει για υποκατάστημα και ωράριο.",
    href: "/p/farmakeio",
    visual: "pharmacy",
  },
  {
    label: "Εκπαίδευση",
    title: "Εκπαίδευση προσωπικού",
    body: "Η εκπαίδευση ιατρικού και νοσηλευτικού προσωπικού είναι μέρος της αποστολής του ΝΝΚ στη Σούδα.",
    href: "/p/organosi/iatrikh/ekpaidefsi",
    visual: "education",
  },
  {
    label: "Παράπονα",
    title: "Παράπονα και υποδείξεις",
    body: "Κατατίθενται στη γραμματεία. Δεν υπάρχει ηλεκτρονική φόρμα για ιατρικά παράπονα ή δεδομένα υγείας.",
    href: "/p/asthenis/parapona",
    visual: "complaints",
  },
  {
    label: "Ικανοποίηση",
    title: "Ερωτηματολόγιο ικανοποίησης",
    body: "Συμπληρώνεται στο νοσοκομείο μετά την εξέταση ή το εξιτήριο. Δεν υποβάλλεται online με δεδομένα υγείας.",
    href: "/p/asthenis/erotimatologia",
    visual: "survey",
  },
  {
    label: "Δικαιώματα",
    title: "Δικαιώματα και υποχρεώσεις",
    body: "Γραφείο προστασίας δικαιωμάτων ασθενών. Αιτήματα φακέλου μόνο μέσω γραμματείας.",
    href: "/rights",
    visual: "rights",
  },
  {
    label: "Οδοντιατρική",
    title: "Οδοντιατρικό ιατρείο",
    body: "Γενική οδοντιατρική στη Σούδα κατόπιν ραντεβού. Εξειδικευμένα τμήματα Αθήνας επιβεβαιώνονται χωριστά.",
    href: "/departments/odontiatriko",
    visual: "dental",
  },
  {
    label: "Επείγοντα",
    title: "24ωρο ΤΕΠ",
    body: "Ιατρείο επειγόντων χωρίς ραντεβού. Τηλέφωνα 28210 82538 και 28210 82414.",
    href: "/emergency",
    visual: "emergency",
  },
  {
    label: "Υπερβαρική",
    title: "Υπερβαρική κάλυψη",
    body: "Καταδυτική ετοιμότητα νότιου ελλαδικού χώρου και νοτιοανατολικού Αιγαίου. Όχι ΜΕΘ με μηχανικό αερισμό.",
    href: "/departments/ypervariki",
    visual: "hyperbaric",
  },
];

function StructureVisual({ kind }: { kind: StructureItem["visual"] }) {
  const stroke = "rgba(255,255,255,0.88)";
  const common = {
    fill: "none" as const,
    stroke,
    strokeWidth: 1.25,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
  };

  return (
    <svg viewBox="0 0 320 320" className="size-full" aria-hidden="true">
      {kind === "outpatient" && (
        <>
          <rect x="118" y="118" width="84" height="84" {...common} />
          <path d="M160 40v78M160 202v78M40 160h78M202 160h78" {...common} />
          <path d="M90 90h40M190 90h40M90 230h40M190 230h40" {...common} />
          <rect x="148" y="148" width="24" height="24" {...common} />
        </>
      )}
      {kind === "surgery" && (
        <>
          <rect x="70" y="90" width="180" height="140" {...common} />
          <path d="M110 160h100M160 110v100" {...common} />
          <path d="M90 70h40M190 250h40" {...common} />
          <rect x="232" y="148" width="24" height="24" {...common} />
        </>
      )}
      {kind === "map" && (
        <>
          <rect x="60" y="60" width="200" height="200" {...common} />
          <path d="M60 120h200M60 180h200M120 60v200M180 60v200" {...common} />
          <rect x="148" y="148" width="24" height="24" {...common} />
        </>
      )}
      {kind === "eligibility" && (
        <>
          <path d="M60 80h80v40H60zM180 80h80v40h-80zM60 160h80v40H60zM180 160h80v40h-80zM120 220h80v40h-80z" {...common} />
          <path d="M100 120v40M220 120v40M160 200v20" {...common} />
          <rect x="148" y="148" width="24" height="24" {...common} />
        </>
      )}
      {kind === "pharmacy" && (
        <>
          <rect x="90" y="70" width="140" height="180" {...common} />
          <path d="M160 110v100M110 160h100" {...common} />
          <path d="M70 100h20M230 100h20" {...common} />
        </>
      )}
      {kind === "education" && (
        <>
          <path d="M60 120h200v100H60z" {...common} />
          <path d="M100 120V90h120v30M130 150h60M130 175h40" {...common} />
          <rect x="220" y="200" width="24" height="24" {...common} />
        </>
      )}
      {kind === "complaints" && (
        <>
          <rect x="80" y="70" width="160" height="180" {...common} />
          <path d="M110 120h100M110 150h80M110 180h60" {...common} />
          <rect x="200" y="210" width="22" height="22" {...common} />
        </>
      )}
      {kind === "survey" && (
        <>
          <rect x="70" y="80" width="180" height="160" {...common} />
          <path d="M100 120h40M100 150h80M100 180h60" {...common} />
          <rect x="210" y="110" width="20" height="20" {...common} />
          <rect x="210" y="145" width="20" height="20" {...common} />
        </>
      )}
      {kind === "rights" && (
        <>
          <path d="M160 50l90 40v70c0 50-40 90-90 110-50-20-90-60-90-110V90z" {...common} />
          <path d="M130 150h60M160 130v60" {...common} />
        </>
      )}
      {kind === "dental" && (
        <>
          <path d="M100 90c20-30 100-30 120 0 10 20 10 60-10 90-20 30-40 50-50 70-10-20-30-40-50-70-20-30-20-70-10-90z" {...common} />
          <path d="M140 140h40M160 120v50" {...common} />
        </>
      )}
      {kind === "emergency" && (
        <>
          <path d="M40 160h48l18-42 28 84 22-56 16 28h108" {...common} />
          <rect x="236" y="148" width="24" height="24" {...common} />
          <path d="M60 120v80M260 120v80" {...common} />
        </>
      )}
      {kind === "hyperbaric" && (
        <>
          <rect x="70" y="70" width="180" height="180" {...common} />
          <rect x="100" y="100" width="120" height="120" {...common} />
          <rect x="128" y="128" width="64" height="64" {...common} />
          <path d="M40 160h30M250 160h30" {...common} />
        </>
      )}
    </svg>
  );
}

function StructureCard({ item }: { item: StructureItem }) {
  return (
    <Link
      href={item.href}
      className="structure-card group relative flex h-full w-full flex-col overflow-hidden rounded-[0.375em] bg-[var(--blue)] text-white no-underline"
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-between p-[0.5em_0.5em_1em_1.25em]">
        <span className="mt-[0.375em] rounded-[0.1875em] bg-white/15 px-[0.8em] py-[0.55em] font-mono text-[0.6em] uppercase tracking-[0.01em]">
          {item.label}
        </span>
        <span
          aria-hidden="true"
          className="flex size-[2.25em] items-center justify-center rounded-[3px] bg-white text-[var(--blue)]"
        >
          <ArrowUpRight className="size-[0.9em]" strokeWidth={2.4} />
        </span>
      </div>

      <div className="structure-visual w-full shrink-0">
        <StructureVisual kind={item.visual} />
      </div>

      <div className="mt-[1.5em] flex flex-col gap-3 px-[1.25em] pb-[1.25em] pt-[0.5em]">
        <h3 className="text-[1.45em] font-normal leading-none tracking-[-0.02em] whitespace-normal">
          {item.title}
        </h3>
        <p className="text-[1em] font-medium leading-[1.3] tracking-[-0.005em] whitespace-normal text-white/90">
          {item.body}
        </p>
      </div>
    </Link>
  );
}

function useStructuresCarousel(
  wrapperRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  boxRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const wrapper = wrapperRef.current;
    const cardsBox = boxRef.current;
    const track = trackRef.current;
    if (!wrapper || !cardsBox || !track) return;

    const items = Array.from(track.querySelectorAll<HTMLElement>(".structure-item"));
    if (!items.length) return;

    let currentX = 0;
    let targetX = 0;
    let startX = 0;
    let endX = 0;
    let moveX = 0;
    let raf = 0;
    let ticking = false;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const getAutoY = (i: number) => [0, 100, 0, -120][i % 4]!;

    const getCardScale = (vx: number, cardW: number, vw: number) => {
      const center = vx + cardW * 0.5;
      const fromX = vw + cardW * 0.35;
      const toX = Math.max(80, vw * 0.18);
      const t = clamp((fromX - center) / (fromX - toX), 0, 1);
      // Keep on-screen cards closer in size to Cantor (less aggressive shrink)
      return 0.82 + 0.26 * t;
    };

    const measure = () => {
      if (!window.matchMedia("(min-width: 992px)").matches) {
        items.forEach((el) => {
          el.style.transform = "";
        });
        return false;
      }

      const third = items[2] || items[items.length - 1];
      const last = items[items.length - 1];
      if (!third || !last) return false;

      const rightPad = 16;
      const thirdRight = third.offsetLeft + third.offsetWidth;
      startX = cardsBox.clientWidth - thirdRight - rightPad;

      const lastRight = last.offsetLeft + last.offsetWidth;
      const rightInset = cardsBox.clientWidth * 0.15;
      endX = cardsBox.clientWidth - rightInset - lastRight;
      moveX = Math.max(1, startX - endX);

      currentX = startX;
      targetX = startX;
      return true;
    };

    const updateTargetFromScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const maxScroll = Math.max(1, wrapper.offsetHeight - window.innerHeight);
      const passed = clamp(-rect.top, 0, maxScroll);
      const progress = clamp(passed / maxScroll, 0, 1);
      targetX = startX - moveX * progress;
    };

    const render = () => {
      ticking = false;
      currentX = lerp(currentX, targetX, 0.14);

      const boxLeft = cardsBox.getBoundingClientRect().left;
      const vw = window.innerWidth;

      items.forEach((el, i) => {
        const y = getAutoY(i);
        const vx = boxLeft + el.offsetLeft + currentX;
        const s = getCardScale(vx, el.offsetWidth, vw);
        el.style.transform = `translate3d(${currentX.toFixed(2)}px,${y}px,0) scale(${s.toFixed(3)})`;
      });

      if (Math.abs(currentX - targetX) > 0.2) {
        raf = requestAnimationFrame(render);
        ticking = true;
      } else {
        raf = 0;
      }
    };

    const requestRender = () => {
      updateTargetFromScroll();
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(render);
      }
    };

    if (!measure()) return;
    requestRender();

    const onScroll = () => requestRender();
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measure();
        requestRender();
      }, 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (raf) cancelAnimationFrame(raf);
      items.forEach((el) => {
        el.style.transform = "";
      });
    };
  }, [wrapperRef, trackRef, boxRef, enabled]);
}

export function HomeStructures() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useStructuresCarousel(wrapperRef, trackRef, boxRef, ready && !reduceMotion);

  return (
    <section id="structures" className="relative z-[2] bg-[var(--black)] text-white">
      <div ref={wrapperRef} className="structures-wrapper py-[8em] lg:py-[13em]">
        <div className={cn(FULL_BLEED, "flex flex-col gap-10 min-[992px]:flex-row min-[992px]:items-end min-[992px]:justify-between min-[992px]:gap-16")}>
          <h2 className="structures-heading text-[clamp(3.5rem,8vw,7.2rem)] font-normal leading-none tracking-[-0.02em]">
            Βασικές δομές
            <br />
            και υπηρεσίες
          </h2>
          <div className="flex w-full max-w-[36rem] flex-col gap-6 min-[992px]:pb-1">
            <p className="text-[clamp(1.35rem,1.85vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.01em] text-white">
              Στο Ναυτικό Νοσοκομείο Κρήτης η φροντίδα συνδυάζει τη στρατιωτική ιατρική με σύγχρονη
              γνώση και τεχνολογία. Με σεβασμό και σαφή πρωτόκολλα, στεκόμαστε δίπλα σε κάθε
              δικαιούχο στη Σούδα και την Κρήτη.
            </p>
            <div>
              <CtaLink href="/eligibility" variant="accent" size="lg">
                Δικαιούχοι
              </CtaLink>
            </div>
          </div>
        </div>

        {/* Desktop sticky horizontal carousel */}
        <div
          ref={boxRef}
          className="structures-cms mt-[3em] hidden min-[992px]:mt-[5em] min-[992px]:flex min-[992px]:h-screen min-[992px]:min-h-screen min-[992px]:items-center min-[992px]:overflow-hidden"
        >
          <div className="structures-collection h-full w-full overflow-visible pl-[clamp(4rem,6vw,12rem)]">
            <div ref={trackRef} className="structures-list relative flex h-full w-max items-center gap-[clamp(2.5rem,4vw,4.5rem)]">
              {STRUCTURES.map((item) => (
                <div
                  key={item.href}
                  className="structure-item w-[clamp(22rem,30vw,36rem)] shrink-0 origin-left will-change-transform"
                >
                  <StructureCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet stack */}
        <div className={`${FULL_BLEED} mt-12 grid gap-5 sm:grid-cols-2 min-[992px]:hidden`}>
          {STRUCTURES.map((item) => (
            <div key={`m-${item.href}`} className="min-h-[30rem]">
              <StructureCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
